
import {
	Blob,
	btoa,
	createImageBitmap,
	CSSStyleDeclaration,
	performance,
	document,
	DOMParser,
	EventTarget,
	fetch,
	Headers,
	HTMLCanvasElement,
	Image,
	HTMLImageElement,
	ImageBitmap,
	location,
	navigator,
	Request,
	requestAnimationFrame,
	cancelAnimationFrame,
	Response,
	URL,
	window,
	self,
	WebAssembly,
	Worker,
	XMLHttpRequest,
	ImageData,
	TextDecoder,
	core
	} from 'dhtml-weixin';
import NodeMaterial, { addNodeMaterial } from './NodeMaterial.js';
import { temp } from '../core/VarNode.js';
import { varying } from '../core/VaryingNode.js';
import { property } from '../core/PropertyNode.js';
import { attribute } from '../core/AttributeNode.js';
import { cameraProjectionMatrix } from '../accessors/CameraNode.js';
import { materialColor } from '../accessors/MaterialNode.js';
import { modelViewMatrix } from '../accessors/ModelNode.js';
import { positionGeometry } from '../accessors/PositionNode.js';
import { abs, mix, mod, dot, clamp, smoothstep } from '../math/MathNode.js';
import { tslFn, float, vec2, vec3, vec4, If } from '../shadernode/ShaderNode.js';
import { uv } from '../accessors/UVNode.js';
import { materialLineScale, materialLineDashSize, materialLineGapSize, materialLineDashOffset, materialLineWidth } from '../accessors/LineMaterialNode.js';
import { viewport } from '../display/ViewportNode.js';
import { dashSize, gapSize } from '../core/PropertyNode.js';

import { LineDashedMaterial } from '../../../Three';

const defaultValues = new LineDashedMaterial();

class Line2NodeMaterial extends NodeMaterial {

	constructor( params = {} ) {

		super();

		this.normals = false;
		this.lights = false;

		this.setDefaultValues( defaultValues );

		this.useAlphaToCoverage = true;
		this.useColor = params.vertexColors;
		this.useDash = params.dashed;
		this.useWorldUnits = false;

		this.dashOffset = 0;
		this.lineWidth = 1;

		this.lineColorNode = null;

		this.offsetNode = null;
		this.dashScaleNode = null;
		this.dashSizeNode = null;
		this.gapSizeNode = null;

		this.setupShaders();

		this.setValues( params );

	}

	setupShaders() {

		const useAlphaToCoverage = this.alphaToCoverage;
		const useColor = this.useColor;
		const useDash = this.dashed;
		const useWorldUnits = this.worldUnits;

		const trimSegment = tslFn( ( { start, end } ) => {

			const a = cameraProjectionMatrix.element( 2 ).element( 2 ); // 3nd entry in 3th column
			const b = cameraProjectionMatrix.element( 3 ).element( 2 ); // 3nd entry in 4th column
			const nearEstimate = b.mul( -0.5 ).div( a );

			const alpha = nearEstimate.sub( start.z ).div( end.z.sub( start.z ) );

			return vec4( mix( start.xyz, end.xyz, alpha ), end.w );

		} );

		this.vertexNode = tslFn( () => {

			varying( vec2(), 'vUv' ).assign( uv() ); // @TODO: Analyze other way to do this

			const instanceStart = attribute( 'instanceStart' );
			const instanceEnd = attribute( 'instanceEnd' );

			// camera space

			const start = property( 'vec4', 'start' );
			const end = property( 'vec4', 'end' );

			start.assign( modelViewMatrix.mul( vec4( instanceStart, 1.0 ) ) ); // force assignment into correct place in flow
			end.assign( modelViewMatrix.mul( vec4( instanceEnd, 1.0 ) ) );

			if ( useWorldUnits ) {

				varying( vec3(), 'worldStart' ).assign( start.xyz );
				varying( vec3(), 'worldEnd' ).assign( end.xyz );

			}

			const aspect = viewport.z.div( viewport.w );

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			const perspective = cameraProjectionMatrix.element( 2 ).element( 3 ).equal( -1.0 ); // 4th entry in the 3rd column

			If( perspective, () => {

				If( start.z.lessThan( 0.0 ).and( end.z.greaterThan( 0.0 ) ), () => {

					end.assign( trimSegment( { start: start, end: end } ) );

				} ).elseif( end.z.lessThan( 0.0 ).and( start.z.greaterThanEqual( 0.0 ) ), () => {

					start.assign( trimSegment( { start: end, end: start } ) );

			 	} );

			} );

			// clip space
			const clipStart = cameraProjectionMatrix.mul( start );
			const clipEnd = cameraProjectionMatrix.mul( end );

			// ndc space
			const ndcStart = clipStart.xyz.div( clipStart.w );
			const ndcEnd = clipEnd.xyz.div( clipEnd.w );

			// direction
			const dir = ndcEnd.xy.sub( ndcStart.xy ).temp();

			// account for clip-space aspect ratio
			dir.x.assign( dir.x.mul( aspect ) );
			dir.assign( dir.normalize() );

			const clip = temp( vec4() );

			if ( useWorldUnits ) {

				// get the offset direction as perpendicular to the view vector
				const worldDir = end.xyz.sub( start.xyz ).normalize();

				const offset = positionGeometry.y.lessThan( 0.5 ).cond(
					start.xyz.cross( worldDir ).normalize(),
					end.xyz.cross( worldDir ).normalize()

				);

				// sign flip
				offset.assign( positionGeometry.x.lessThan( 0.0 ).cond( offset.negate(), offset ) );

				const forwardOffset = worldDir.dot( vec3( 0.0, 0.0, 1.0 ) );

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				if ( ! useDash ) {

					// extend the line bounds to encompass endcaps
					start.assign( start.sub( vec4( worldDir.mul( materialLineWidth ).mul( 0.5 ), 0 ) ) );
					end.assign( end.add( vec4( worldDir.mul( materialLineWidth ).mul( 0.5 ), 0 ) ) );

					// shift the position of the quad so it hugs the forward edge of the line
					offset.assign( offset.sub( vec3( dir.mul( forwardOffset ), 0 ) ) );
					offset.z.assign( offset.z.add( 0.5 ) );

				}

				// endcaps

				If( positionGeometry.y.greaterThan( 1.0 ).or( positionGeometry.y.lessThan( 0.0 ) ), () => {

					offset.assign( offset.add( vec3( dir.mul( 2.0 ).mul( forwardOffset ), 0 ) ) );

				} );

				// adjust for linewidth
				offset.assign( offset.mul( materialLineWidth ).mul( 0.5 ) );

				// set the world position

				const worldPos = varying( vec4(), 'worldPos' );

				worldPos.assign( positionGeometry.y.lessThan( 0.5 ).cond( start, end ) );
				worldPos.assign( worldPos.add( vec4( offset, 0 ) ) );

				// project the worldpos
				clip.assign( cameraProjectionMatrix.mul( worldPos ) );

				// shift the depth of the projected points so the line
				// segments overlap neatly
				const clipPose = temp( vec3() );

				clipPose.assign( positionGeometry.y.lessThan( 0.5 ).cond( ndcStart, ndcEnd ) );
				clip.z.assign( clipPose.z.mul( clip.w ) );

			} else {

				const offset = property( 'vec2', 'offset' );

				offset.assign( vec2( dir.y, dir.x.negate() ) );

				// undo aspect ratio adjustment
				dir.x.assign( dir.x.div( aspect ) );
				offset.x.assign( offset.x.div( aspect ) );

				// sign flip
				offset.assign( positionGeometry.x.lessThan( 0.0 ).cond( offset.negate(), offset ) );

				// endcaps
				If( positionGeometry.y.lessThan( 0.0 ), () => {

					offset.assign( offset.sub( dir ) );

				} ).elseif( positionGeometry.y.greaterThan( 1.0 ), () => {

					offset.assign( offset.add( dir ) );

				} );

				// adjust for linewidth
				offset.assign( offset.mul( materialLineWidth ) );

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset.assign( offset.div( viewport.w ) );

				// select end
				clip.assign( positionGeometry.y.lessThan( 0.5 ).cond( clipStart, clipEnd ) );

				// back to clip space
				offset.assign( offset.mul( clip.w ) );

				clip.assign( clip.add( vec4( offset, 0, 0 ) ) );

			}

			return clip;

		} )();

		const closestLineToLine = tslFn( ( { p1, p2, p3, p4 } ) => {

			const p13 = p1.sub( p3 );
			const p43 = p4.sub( p3 );

			const p21 = p2.sub( p1 );

			const d1343 = dot( p13, p43 );
			const d4321 = dot( p43, p21 );
			const d1321 = dot( p13, p21 );
			const d4343 = dot( p43, p43 );
			const d2121 = dot( p21, p21 );

			const denom = d2121.mul( d4343 ).sub( d4321.mul( d4321 ) );
			const numer = d1343.mul( d4321 ).sub( d1321.mul( d4343 ) );

			const mua = clamp( numer.div( denom ), 0, 1 );
			const mub = clamp( d1343.add( d4321.mul( mua ) ).div( d4343 ), 0, 1 );

			return vec2( mua, mub );

		} );

		this.colorNode = tslFn( () => {

			const vUv = varying( vec2(), 'vUv' );

			if ( useDash ) {

				const offsetNode = this.offsetNode ? float( this.offsetNodeNode ) : materialLineDashOffset;
				const dashScaleNode = this.dashScaleNode ? float( this.dashScaleNode ) : materialLineScale;
				const dashSizeNode = this.dashSizeNode ? float( this.dashSizeNode ) : materialLineDashSize;
				const gapSizeNode = this.dashSizeNode ? float( this.dashGapNode ) : materialLineGapSize;

				dashSize.assign( dashSizeNode );
				gapSize.assign( gapSizeNode );

				const instanceDistanceStart = attribute( 'instanceDistanceStart' );
				const instanceDistanceEnd = attribute( 'instanceDistanceEnd' );

				const lineDistance = positionGeometry.y.lessThan( 0.5 ).cond( dashScaleNode.mul( instanceDistanceStart ), materialLineScale.mul( instanceDistanceEnd ) );

				const vLineDistance = varying( lineDistance.add( materialLineDashOffset ) );
				const vLineDistanceOffset = offsetNode ? vLineDistance.add( offsetNode ) : vLineDistance;

				vUv.y.lessThan( - 1.0 ).or( vUv.y.greaterThan( 1.0 ) ).discard(); // discard endcaps
				mod( vLineDistanceOffset, dashSize.add( gapSize ) ).greaterThan( dashSize ).discard(); // todo - FIX

			}

			 // force assignment into correct place in flow
			const alpha = property( 'float', 'alpha' );
			alpha.assign( 1 );

			if ( useWorldUnits ) {

				const worldStart = varying( vec3(), 'worldStart' );
				const worldEnd = varying( vec3(), 'worldEnd' );

				// Find the closest points on the view ray and the line segment
				const rayEnd = varying( vec4(), 'worldPos' ).xyz.normalize().mul( 1e5 );
				const lineDir = worldEnd.sub( worldStart );
				const params = closestLineToLine( { p1: worldStart, p2: worldEnd, p3: vec3( 0.0, 0.0, 0.0 ), p4: rayEnd } );

				const p1 = worldStart.add( lineDir.mul( params.x ) );
				const p2 = rayEnd.mul( params.y );
				const delta = p1.sub( p2 );
				const len = delta.length();
				const norm = len.div( materialLineWidth );

				if ( ! useDash ) {

					if ( useAlphaToCoverage ) {

						const dnorm = norm.fwidth();
						alpha.assign( smoothstep( dnorm.negate().add( 0.5 ), dnorm.add( 0.5 ), norm ).oneMinus() );

					} else {

						norm.greaterThan( 0.5 ).discard();

					}

				}

			} else {

				// round endcaps

				if ( useAlphaToCoverage ) {

					const a = vUv.x;
					const b = vUv.y.greaterThan( 0.0 ).cond( vUv.y.sub( 1.0 ), vUv.y.add( 1.0 ) );

					const len2 = a.mul( a ).add( b.mul( b ) );

					// force assignment out of following 'if' statement - to avoid uniform control flow errors
					const dlen = property( 'float', 'dlen' );
					dlen.assign( len2.fwidth() );

					If( abs( vUv.y ).greaterThan( 1.0 ), () => {

						alpha.assign( smoothstep( dlen.oneMinus(), dlen.add( 1 ), len2 ).oneMinus() );

					} );

				} else {

					If( abs( vUv.y ).greaterThan( 1.0 ), () => {

						const a = vUv.x;
						const b = vUv.y.greaterThan( 0.0 ).cond( vUv.y.sub( 1.0 ), vUv.y.add( 1.0 ) );
						const len2 = a.mul( a ).add( b.mul( b ) );

						len2.greaterThan( 1.0 ).discard();

					} );

				}

			}

			let lineColorNode;

			if ( this.lineColorNode ) {

				lineColorNode = this.lineColorNode;

			} else {

				if ( useColor ) {

					const instanceColorStart = attribute( 'instanceColorStart' );
					const instanceColorEnd = attribute( 'instanceColorEnd' );

					lineColorNode = varying( positionGeometry.y.lessThan( 0.5 ).cond( instanceColorStart, instanceColorEnd ) );

				} else {

					lineColorNode = materialColor;

				}

			}

			return vec4( lineColorNode, alpha );

		} )();

		this.needsUpdate = true;

	}


	get worldUnits() {

		return this.useWorldUnits;

	}

	set worldUnits( value ) {

		if ( this.useWorldUnits !== value ) {

			this.useWorldUnits = value;
			this.setupShaders();

		}

	}


	get dashed() {

		return this.useDash;

	}

	set dashed( value ) {

		if ( this.useDash !== value ) {

			this.useDash = value;
			this.setupShaders();

		}

	}


	get alphaToCoverage() {

		return this.useAlphaToCoverage;

	}

	set alphaToCoverage( value ) {

		if ( this.useAlphaToCoverage !== value ) {

			this.useAlphaToCoverage = value;
			this.setupShaders();

		}

	}

}

export default Line2NodeMaterial;

addNodeMaterial( 'Line2NodeMaterial', Line2NodeMaterial );
