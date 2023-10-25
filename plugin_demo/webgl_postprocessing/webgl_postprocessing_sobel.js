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

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

import { LuminosityShader } from 'three/addons/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/addons/shaders/SobelOperatorShader.js';

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
    let camera, scene, renderer, composer;

    let effectSobel;

    const params = {
      enable: true
    };

    init();
    animate();

    function init() {

      //

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );
      camera.position.set( 0, 1, 3 );
      camera.lookAt( scene.position );

      //

      const geometry = new THREE.TorusKnotGeometry( 1, 0.3, 256, 32 );
      const material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );

      const mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      //

      const ambientLight = new THREE.AmbientLight( 0xe7e7e7 );
      scene.add( ambientLight );

      const pointLight = new THREE.PointLight( 0xffffff, 20 );
      camera.add( pointLight );
      scene.add( camera );

      //

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      // postprocessing

      composer = new EffectComposer( renderer );
      const renderPass = new RenderPass( scene, camera );
      composer.addPass( renderPass );

      // color to grayscale conversion

      const effectGrayScale = new ShaderPass( LuminosityShader );
      composer.addPass( effectGrayScale );

      // you might want to use a gaussian blur filter before
      // the next pass to improve the result of the Sobel operator

      // Sobel operator

      effectSobel = new ShaderPass( SobelOperatorShader );
      effectSobel.uniforms[ 'resolution' ].value.x = window.innerWidth * window.devicePixelRatio;
      effectSobel.uniforms[ 'resolution' ].value.y = window.innerHeight * window.devicePixelRatio;
      composer.addPass( effectSobel );

      const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.enableZoom = false;

      //

      const gui = new GUI();

      gui.add( params, 'enable' );
      gui.open();

      //

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );
      composer.setSize( window.innerWidth, window.innerHeight );

      effectSobel.uniforms[ 'resolution' ].value.x = window.innerWidth * window.devicePixelRatio;
      effectSobel.uniforms[ 'resolution' ].value.y = window.innerHeight * window.devicePixelRatio;

    }

    function animate() {

      requestId = requestAnimationFrame( animate );

      if ( params.enable === true ) {

        composer.render();

      } else {

        renderer.render( scene, camera );

      }

    }

  }
})