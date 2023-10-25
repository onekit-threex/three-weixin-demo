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
import { unzipSync } from 'three/addons/libs/fflate.module.js';

import WebGL from 'three/addons/capabilities/WebGL.js';
const  vs = ` 
uniform vec2 size;
out vec2 vUv;

void main() {

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

  // Convert position.xy to 1.0-0.0

  vUv.xy = position.xy / size + 0.5;
  vUv.y = 1.0 - vUv.y; // original data is upside down

}`

const fs = `
precision highp float;
precision highp int;
precision highp sampler2DArray;

uniform sampler2DArray diffuse;
in vec2 vUv;
uniform int depth;

out vec4 outColor;

void main() {

  vec4 color = texture( diffuse, vec3( vUv, depth ) );

  // lighten a bit
  outColor = vec4( color.rrr * 1.5, 1.0 );

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

  if ( WebGL.isWebGL2Available() === false ) {

    document.body.appendChild( WebGL.getWebGL2ErrorMessage() );

  }

  let camera, scene, mesh, renderer, stats;

  const planeWidth = 50;
  const planeHeight = 50;

  let depthStep = 0.4;

  init();
  animate();

  function init() {

    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
    camera.position.z = 70;

    scene = new THREE.Scene();

    // width 256, height 256, depth 109, 8-bit, zip archived raw data

    new THREE.FileLoader()
      .setResponseType( 'arraybuffer' )
      .load( 'textures/3d/head256x256x109.zip', function ( data ) {

        const zip = unzipSync( new Uint8Array( data ) );
        const array = new Uint8Array( zip[ 'head256x256x109' ].buffer );

        const texture = new THREE.DataArrayTexture( array, 256, 256, 109 );
        texture.format = THREE.RedFormat;
        texture.needsUpdate = true;

        const material = new THREE.ShaderMaterial( {
          uniforms: {
            diffuse: { value: texture },
            depth: { value: 55 },
            size: { value: new THREE.Vector2( planeWidth, planeHeight ) }
          },
          vertexShader:vs.trim(),
          fragmentShader:fs.trim(),
          glslVersion: THREE.GLSL3
        } );

        const geometry = new THREE.PlaneGeometry( planeWidth, planeHeight );

        mesh = new THREE.Mesh( geometry, material );

        scene.add( mesh );

      } );

    // 2D Texture array is available on WebGL 2.0

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    stats = new Stats();
    container.appendChild( stats.dom );

    window.addEventListener( 'resize', onWindowResize );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function animate() {

    requestId = requestAnimationFrame( animate );

    if ( mesh ) {

      let value = mesh.material.uniforms[ 'depth' ].value;

      value += depthStep;

      if ( value > 109.0 || value < 0.0 ) {

        if ( value > 1.0 ) value = 109.0 * 2.0 - value;
        if ( value < 0.0 ) value = - value;

        depthStep = - depthStep;

      }

      mesh.material.uniforms[ 'depth' ].value = value;

    }

    render();
    stats.update();

  }

  function render() {

    renderer.render( scene, camera );

  }

  }
})