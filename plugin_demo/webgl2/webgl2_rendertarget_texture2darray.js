import {
  document,
	window,
	HTMLCanvasElement,
	requestAnimationFrame,
  cancelAnimationFrame,
  performance,
	Event,
  Event0
} from "dhtml-weixin"
import * as THREE from './three/Three';

//import Stats from './three/addons/libs/stats.module.js';
import { unzipSync } from './three/addons/libs/fflate.module.js';
import { GUI } from './three/addons/libs/lil-gui.module.min.js';

import WebGL from './three/addons/capabilities/WebGL.js';
const vertex_postprocess = `

out vec2 vUv;

void main()
{
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fragment_postprocess = `

precision highp sampler2DArray;
precision mediump float;

in vec2 vUv;

uniform sampler2DArray uTexture;
uniform int uDepth;
uniform float uIntensity;

void main()
{
  float voxel = texture(uTexture, vec3( vUv, uDepth )).r;
  gl_FragColor.r = voxel * uIntensity;
}
`
const vs = `
uniform vec2 size;
out vec2 vUv;

void main() {

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

  // Convert position.xy to 1.0-0.0

  vUv.xy = position.xy / size + 0.5;
  vUv.y = 1.0 - vUv.y; // original data is upside down

}
`
const fs = `
precision highp float;
precision highp int;
precision highp sampler2DArray;

uniform sampler2DArray diffuse;
in vec2 vUv;
uniform int depth;

void main() {

  vec4 color = texture( diffuse, vec3( vUv, depth ) );

  // lighten a bit
  gl_FragColor = vec4( color.rrr * 1.5, 1.0 );
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

    const DIMENSIONS = {
      width: 256,
      height: 256,
      depth: 109
    };

    const params = {
      intensity: 1
    };

    /** Post-processing objects */

    const postProcessScene = new THREE.Scene();
    const postProcessCamera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

    const renderTarget = new THREE.WebGLArrayRenderTarget( DIMENSIONS.width, DIMENSIONS.height, DIMENSIONS.depth );
    renderTarget.texture.format = THREE.RedFormat;

    const postProcessMaterial = new THREE.ShaderMaterial( {
      uniforms: {
        uTexture: { value: null },
        uDepth: { value: 55 },
        uIntensity: { value: 1.0 }
      },
      vertexShader:vertex_postprocess,
      fragmentShader:fragment_postprocess
    } );

    let depthStep = 0.4;

    let camera, scene, mesh, renderer, stats;

    const planeWidth = 50;
    const planeHeight = 50;

    init();

    function init() {

      const container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
      camera.position.z = 70;

      scene = new THREE.Scene();

      /** Post-processing scene */

      const planeGeometry = new THREE.PlaneGeometry( 2, 2 );
      const screenQuad = new THREE.Mesh( planeGeometry, postProcessMaterial );
      postProcessScene.add( screenQuad );

      // 2D Texture array is available on WebGL 2.0

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );

      //stats = new Stats();
      //container.appendChild( stats.dom );

      window.addEventListener( 'resize', onWindowResize );

      const gui = new GUI();

      gui.add( params, 'intensity', 0, 1 ).step( 0.01 ).onChange( value => postProcessMaterial.uniforms.uIntensity.value = value );
      gui.open();

      // width 256, height 256, depth 109, 8-bit, zip archived raw data

      new THREE.FileLoader()
        .setResponseType( 'arraybuffer' )
        .load( 'textures/3d/head256x256x109.zip', function ( data ) {

          const zip = unzipSync( new Uint8Array( data ) );
          const array = new Uint8Array( zip[ 'head256x256x109' ].buffer );

          const texture = new THREE.DataArrayTexture( array, DIMENSIONS.width, DIMENSIONS.height, DIMENSIONS.depth );
          texture.format = THREE.RedFormat;
          texture.needsUpdate = true;

          const material = new THREE.ShaderMaterial( {
            uniforms: {
              diffuse: { value: renderTarget.texture },
              depth: { value: 55 },
              size: { value: new THREE.Vector2( planeWidth, planeHeight ) }
            },
            vertexShader: vs,
            fragmentShader:fs
          } );

          const geometry = new THREE.PlaneGeometry( planeWidth, planeHeight );

          mesh = new THREE.Mesh( geometry, material );

          scene.add( mesh );

          postProcessMaterial.uniforms.uTexture.value = texture;

          animate();

        } );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      requestId = requestAnimationFrame( animate );

      let value = mesh.material.uniforms[ 'depth' ].value;

      value += depthStep;

      if ( value > 109.0 || value < 0.0 ) {

        if ( value > 1.0 ) value = 109.0 * 2.0 - value;
        if ( value < 0.0 ) value = - value;

        depthStep = - depthStep;

      }

      mesh.material.uniforms[ 'depth' ].value = value;

      render();

    }

    /**
     * Renders the 2D array into the render target `renderTarget`.
     */
    function renderTo2DArray() {

      const layer = Math.floor( mesh.material.uniforms[ 'depth' ].value );
      postProcessMaterial.uniforms.uDepth.value = layer;
      renderer.setRenderTarget( renderTarget, layer );
      renderer.render( postProcessScene, postProcessCamera );
      renderer.setRenderTarget( null );

    }

    function render() {

      // Step 1 - Render the input DataArrayTexture into render target
      renderTo2DArray();

      // Step 2 - Renders the scene containing the plane with a material
      // sampling the render target texture.
      renderer.render( scene, camera );

    }
  }
})