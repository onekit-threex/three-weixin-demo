
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
import AnalyticLightNode from './AnalyticLightNode.js';
import LightsNode from './LightsNode.js';
import Object3DNode from '../accessors/Object3DNode.js';
import { uniform, add, mul, dot, mix, normalize, normalView } from '../shadernode/ShaderNodeElements.js';

import { Color, HemisphereLight } from '../../../../three/Three';

class HemisphereLightNode extends AnalyticLightNode {

	constructor( light = null ) {

		super( light );

		this.lightPositionNode = new Object3DNode( Object3DNode.POSITION );
		this.lightDirectionNode = normalize( this.lightPositionNode );

		this.groundColorNode = uniform( new Color() );

	}

	update( frame ) {

		const { light } = this;

		super.update( frame );

		this.lightPositionNode.object3d = light;

		this.groundColorNode.value.copy( light.groundColor ).multiplyScalar( light.intensity );

	}

	generate( builder ) {

		const { colorNode, groundColorNode, lightDirectionNode } = this;

		const dotNL = dot( normalView, lightDirectionNode );
		const hemiDiffuseWeight = add( mul( 0.5, dotNL ), 0.5 );

		const irradiance = mix( groundColorNode, colorNode, hemiDiffuseWeight );

		builder.context.irradiance.add( irradiance );

	}

}

LightsNode.setReference( HemisphereLight, HemisphereLightNode );

export default HemisphereLightNode;
