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

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';
import { LWOLoader } from 'three/addons/loaders/LWOLoader.js';
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

    let camera, scene, renderer;

    init();

    function init() {

      const container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 200 );
      camera.position.set( - 0.7, 14.6, 43.2 );

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xa0a0a0 );

      const ambientLight = new THREE.AmbientLight( 0xbbbbbb );
      scene.add( ambientLight );

      const light1 = new THREE.DirectionalLight( 0xc1c1c1, 3 );
      light1.position.set( 0, 200, 100 );
      scene.add( light1 );

      const grid = new THREE.GridHelper( 200, 20, 0x000000, 0x000000 );
      grid.material.opacity = 0.3;
      grid.material.transparent = true;
      scene.add( grid );

      const loader = new LWOLoader();
      loader.load( 'models/lwo/Objects/LWO3/Demo.lwo', function ( object ) {

        const phong = object.meshes[ 0 ];
        phong.position.set( - 2, 12, 0 );

        const standard = object.meshes[ 1 ];
        standard.position.set( 2, 12, 0 );

        const rocket = object.meshes[ 2 ];
        rocket.position.set( 0, 10.5, - 1 );

        scene.add( phong, standard, rocket );

      } );

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setAnimationLoop( animation );
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      container.appendChild( renderer.domElement );

      const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.target.set( 1.33, 10, - 6.7 );
      controls.update();

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animation() {

      renderer.render( scene, camera );

    }

  }
})