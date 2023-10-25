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

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';

const post_vert = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
const post_frag = `
#include <packing>

varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform float cameraNear;
uniform float cameraFar;


float readDepth( sampler2D depthSampler, vec2 coord ) {
  float fragCoordZ = texture2D( depthSampler, coord ).x;
  float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
  return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
}

void main() {
  //vec3 diffuse = texture2D( tDiffuse, vUv ).rgb;
  float depth = readDepth( tDepth, vUv );

  gl_FragColor.rgb = 1.0 - vec3( depth );
  gl_FragColor.a = 1.0;
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

    let camera, scene, renderer, controls, stats;
    let target;
    let postScene, postCamera, postMaterial;
    let supportsExtension = true;

    const params = {
      format: THREE.DepthFormat,
      type: THREE.UnsignedShortType
    };

    const formats = { DepthFormat: THREE.DepthFormat, DepthStencilFormat: THREE.DepthStencilFormat };
    const types = { UnsignedShortType: THREE.UnsignedShortType, UnsignedIntType: THREE.UnsignedIntType, UnsignedInt248Type: THREE.UnsignedInt248Type };

    init();
    animate();

    function init() {

      renderer = new THREE.WebGLRenderer();

      if ( renderer.capabilities.isWebGL2 === false && renderer.extensions.has( 'WEBGL_depth_texture' ) === false ) {

        supportsExtension = false;
        document.querySelector( '#error' ).style.display = 'block';
        return;

      }

      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      //

      stats = new Stats();
      document.body.appendChild( stats.dom );

      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 50 );
      camera.position.z = 4;

      controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.enableDamping = true;

      // Create a render target with depth texture
      setupRenderTarget();

      // Our scene
      setupScene();

      // Setup post-processing step
      setupPost();

      onWindowResize();
      window.addEventListener( 'resize', onWindowResize );

      //
      const gui = new GUI( { width: 300 } );

      gui.add( params, 'format', formats ).onChange( setupRenderTarget );
      gui.add( params, 'type', types ).onChange( setupRenderTarget );
      gui.open();

    }

    function setupRenderTarget() {

      if ( target ) target.dispose();

      const format = parseFloat( params.format );
      const type = parseFloat( params.type );

      target = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
      target.texture.minFilter = THREE.NearestFilter;
      target.texture.magFilter = THREE.NearestFilter;
      target.stencilBuffer = ( format === THREE.DepthStencilFormat ) ? true : false;
      target.depthTexture = new THREE.DepthTexture();
      target.depthTexture.format = format;
      target.depthTexture.type = type;

    }

    function setupPost() {

      // Setup post processing stage
      postCamera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
      postMaterial = new THREE.ShaderMaterial( {
        vertexShader:post_vert,
        fragmentShader: post_frag,
        uniforms: {
          cameraNear: { value: camera.near },
          cameraFar: { value: camera.far },
          tDiffuse: { value: null },
          tDepth: { value: null }
        }
      } );
      const postPlane = new THREE.PlaneGeometry( 2, 2 );
      const postQuad = new THREE.Mesh( postPlane, postMaterial );
      postScene = new THREE.Scene();
      postScene.add( postQuad );

    }

    function setupScene() {

      scene = new THREE.Scene();

      const geometry = new THREE.TorusKnotGeometry( 1, 0.3, 128, 64 );
      const material = new THREE.MeshBasicMaterial( { color: 'blue' } );

      const count = 50;
      const scale = 5;

      for ( let i = 0; i < count; i ++ ) {

        const r = Math.random() * 2.0 * Math.PI;
        const z = ( Math.random() * 2.0 ) - 1.0;
        const zScale = Math.sqrt( 1.0 - z * z ) * scale;

        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(
          Math.cos( r ) * zScale,
          Math.sin( r ) * zScale,
          z * scale
        );
        mesh.rotation.set( Math.random(), Math.random(), Math.random() );
        scene.add( mesh );

      }

    }

    function onWindowResize() {

      const aspect = window.innerWidth / window.innerHeight;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      const dpr = renderer.getPixelRatio();
      target.setSize( window.innerWidth * dpr, window.innerHeight * dpr );
      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      if ( ! supportsExtension ) return;

      requestId = requestAnimationFrame( animate );

      // render scene into target
      renderer.setRenderTarget( target );
      renderer.render( scene, camera );

      // render post FX
      postMaterial.uniforms.tDiffuse.value = target.texture;
      postMaterial.uniforms.tDepth.value = target.depthTexture;

      renderer.setRenderTarget( null );
      renderer.render( postScene, postCamera );

      controls.update(); // required because damping is enabled

      stats.update();

    }
  }
})