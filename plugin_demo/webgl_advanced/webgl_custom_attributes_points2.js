import {
  document,
	window,
	HTMLCanvasElement,
	requestAnimationFrame,
	cancelAnimationFrame,
core,
	Event,
  Event0
} from "dhtml-weixin"
import * as THREE from './three/Three';

import Stats from 'three/addons/libs/stats.module.js';

import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
const vertexshader = `

attribute float size;
attribute vec3 ca;

varying vec3 vColor;

void main() {

  vColor = ca;

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

  gl_PointSize = size * ( 300.0 / -mvPosition.z );

  gl_Position = projectionMatrix * mvPosition;

}
`

const fragmentshader = `

uniform vec3 color;
uniform sampler2D pointTexture;

varying vec3 vColor;

void main() {

  vec4 color = vec4( color * vColor, 1.0 ) * texture2D( pointTexture, gl_PointCoord );

  gl_FragColor = color;

}
`
var requestId
Page({
  onShareAppMessage(){
    return getApp().onShare()
  },
  onShareTimeline(){
     return {title:"ThreeX 2.0"}
  },
	onUnload() {
		cancelAnimationFrame(requestId, this.canvas)
		this.worker && this.worker.terminate()
if(this.canvas) this.canvas = null
		setTimeout(() => {
			if (this.renderer instanceof THREE.WebGLRenderer) {
				this.renderer.dispose()
				this.renderer.forceContextLoss()
				this.renderer.context = null
				this.renderer.domElement = null
				this.renderer = null
			}
		}, 0)
	},
  webgl_touch(e){
		const web_e = (window.platform=="devtools"?Event:Event0).fix(e)
		this.canvas.dispatchEvent(web_e)
  },
  onLoad() {
		document.createElementAsync("canvas", "webgl2").then(canvas => {
      this.canvas = canvas
      this.body_load(canvas).then()
    })
  },
  async body_load(canvas3d) {
    

			let renderer, scene, camera, stats;
			let sphere, length1;

			const WIDTH = window.innerWidth;
			const HEIGHT = window.innerHeight;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 45, WIDTH / HEIGHT, 1, 10000 );
				camera.position.z = 300;

				scene = new THREE.Scene();

				const radius = 100, segments = 68, rings = 38;

				let sphereGeometry = new THREE.SphereGeometry( radius, segments, rings );
				let boxGeometry = new THREE.BoxGeometry( 0.8 * radius, 0.8 * radius, 0.8 * radius, 10, 10, 10 );

				// if normal and uv attributes are not removed, mergeVertices() can't consolidate identical vertices with different normal/uv data

				sphereGeometry.deleteAttribute( 'normal' );
				sphereGeometry.deleteAttribute( 'uv' );

				boxGeometry.deleteAttribute( 'normal' );
				boxGeometry.deleteAttribute( 'uv' );

				sphereGeometry = BufferGeometryUtils.mergeVertices( sphereGeometry );
				boxGeometry = BufferGeometryUtils.mergeVertices( boxGeometry );

				const combinedGeometry = BufferGeometryUtils.mergeGeometries( [ sphereGeometry, boxGeometry ] );
				const positionAttribute = combinedGeometry.getAttribute( 'position' );

				const colors = [];
				const sizes = [];

				const color = new THREE.Color();
				const vertex = new THREE.Vector3();

				length1 = sphereGeometry.getAttribute( 'position' ).count;

				for ( let i = 0, l = positionAttribute.count; i < l; i ++ ) {

					vertex.fromBufferAttribute( positionAttribute, i );

					if ( i < length1 ) {

						color.setHSL( 0.01 + 0.1 * ( i / length1 ), 0.99, ( vertex.y + radius ) / ( 4 * radius ) );

					} else {

						color.setHSL( 0.6, 0.75, 0.25 + vertex.y / ( 2 * radius ) );

					}

					color.toArray( colors, i * 3 );

					sizes[ i ] = i < length1 ? 10 : 40;

				}

				const geometry = new THREE.BufferGeometry();
				geometry.setAttribute( 'position', positionAttribute );
				geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ) );
				geometry.setAttribute( 'ca', new THREE.Float32BufferAttribute( colors, 3 ) );

				//

				const texture = new THREE.TextureLoader().load( 'textures/sprites/disc.png' );
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;

				const material = new THREE.ShaderMaterial( {

					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: texture }
					},
					vertexShader:vertexshader,
					fragmentShader:fragmentshader,
					transparent: true

				} );

				//

				sphere = new THREE.Points( geometry, material );
				scene.add( sphere );

				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( WIDTH, HEIGHT );

				const container = document.getElementById( 'container' );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function sortPoints() {

				const vector = new THREE.Vector3();

				// Model View Projection matrix

				const matrix = new THREE.Matrix4();
				matrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
				matrix.multiply( sphere.matrixWorld );

				//

				const geometry = sphere.geometry;

				let index = geometry.getIndex();
				const positions = geometry.getAttribute( 'position' ).array;
				const length = positions.length / 3;

				if ( index === null ) {

					const array = new Uint16Array( length );

					for ( let i = 0; i < length; i ++ ) {

						array[ i ] = i;

					}

					index = new THREE.BufferAttribute( array, 1 );

					geometry.setIndex( index );

				}

				const sortArray = [];

				for ( let i = 0; i < length; i ++ ) {

					vector.fromArray( positions, i * 3 );
					vector.applyMatrix4( matrix );

					sortArray.push( [ vector.z, i ] );

				}

				function numericalSort( a, b ) {

					return b[ 0 ] - a[ 0 ];

				}

				sortArray.sort( numericalSort );

				const indices = index.array;

				for ( let i = 0; i < length; i ++ ) {

					indices[ i ] = sortArray[ i ][ 1 ];

				}

				geometry.index.needsUpdate = true;

			}

			function animate() {

				requestId = requestAnimationFrame( animate );

				render();
				stats.update();

			}

			function render() {

				const time = Date.now() * 0.005;

				sphere.rotation.y = 0.02 * time;
				sphere.rotation.z = 0.02 * time;

				const geometry = sphere.geometry;
				const attributes = geometry.attributes;

				for ( let i = 0; i < attributes.size.array.length; i ++ ) {

					if ( i < length1 ) {

						attributes.size.array[ i ] = 16 + 12 * Math.sin( 0.1 * i + time );

					}

				}

				attributes.size.needsUpdate = true;

				sortPoints();

				renderer.render( scene, camera );

			}

  }
})