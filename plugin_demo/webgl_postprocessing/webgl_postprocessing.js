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

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/addons/shaders/DotScreenShader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

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
    let camera, renderer, composer;
    let object;

    init();
    animate();

    function init() {

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      //

      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
      camera.position.z = 400;

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog( 0x000000, 1, 1000 );

      object = new THREE.Object3D();
      scene.add( object );

      const geometry = new THREE.SphereGeometry( 1, 4, 4 );
      const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

      for ( let i = 0; i < 100; i ++ ) {

        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
        mesh.position.multiplyScalar( Math.random() * 400 );
        mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
        object.add( mesh );

      }

      scene.add( new THREE.AmbientLight( 0xcccccc ) );

      const light = new THREE.DirectionalLight( 0xffffff, 3 );
      light.position.set( 1, 1, 1 );
      scene.add( light );

      // postprocessing

      composer = new EffectComposer( renderer );
      composer.addPass( new RenderPass( scene, camera ) );

      const effect1 = new ShaderPass( DotScreenShader );
      effect1.uniforms[ 'scale' ].value = 4;
      composer.addPass( effect1 );

      const effect2 = new ShaderPass( RGBShiftShader );
      effect2.uniforms[ 'amount' ].value = 0.0015;
      composer.addPass( effect2 );

      const effect3 = new OutputPass();
      composer.addPass( effect3 );

      //

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );
      composer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      requestId = requestAnimationFrame( animate );

      object.rotation.x += 0.005;
      object.rotation.y += 0.01;

      composer.render();

    }
  }
})