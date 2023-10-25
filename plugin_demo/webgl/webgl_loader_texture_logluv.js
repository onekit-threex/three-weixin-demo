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

import { LogLuvLoader } from 'three/addons/loaders/LogLuvLoader.js';
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

    const params = {
      exposure: 2.0
    };

    let renderer, scene, camera;

    init();

    function init() {

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      renderer.toneMapping = THREE.ReinhardToneMapping;
      renderer.toneMappingExposure = params.exposure;


      scene = new THREE.Scene();

      const aspect = window.innerWidth / window.innerHeight;

      camera = new THREE.OrthographicCamera( - aspect, aspect, 1, - 1, 0, 1 );

      new LogLuvLoader().load( 'textures/memorial.tif', function ( texture ) {

        const material = new THREE.MeshBasicMaterial( { map: texture } );

        const quad = new THREE.PlaneGeometry( 1, 1.5 );

        const mesh = new THREE.Mesh( quad, material );

        scene.add( mesh );

        render();

      } );

      //

      const gui = new GUI();

      gui.add( params, 'exposure', 0, 4, 0.01 ).onChange( render );
      gui.open();

      //

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      const aspect = window.innerWidth / window.innerHeight;

      const frustumHeight = camera.top - camera.bottom;

      camera.left = - frustumHeight * aspect / 2;
      camera.right = frustumHeight * aspect / 2;

      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

      render();

    }

    //

    function render() {

      renderer.toneMappingExposure = params.exposure;

      renderer.render( scene, camera );

    }

  }
})