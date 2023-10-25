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

import { ColladaLoader } from 'three/addons/loaders/ColladaLoader.js';
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

    let container, stats, clock;
    let camera, scene, renderer, elf;

    init();
    animate();

    function init() {

      container = document.getElementById( 'container' );

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
      camera.position.set( 8, 10, 8 );
      camera.lookAt( 0, 3, 0 );

      scene = new THREE.Scene();

      clock = new THREE.Clock();

      // loading manager

      const loadingManager = new THREE.LoadingManager( function () {

        scene.add( elf );

      } );

      // collada

      const loader = new ColladaLoader( loadingManager );
      loader.load( './models/collada/elf/elf.dae', function ( collada ) {

        elf = collada.scene;

      } );

      //

      const ambientLight = new THREE.AmbientLight( 0xffffff );
      scene.add( ambientLight );

      const directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 );
      directionalLight.position.set( 1, 1, 0 ).normalize();
      scene.add( directionalLight );

      //

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );

      //

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

    function animate() {

      requestId = requestAnimationFrame( animate );

      render();
      stats.update();

    }

    function render() {

      const delta = clock.getDelta();

      if ( elf !== undefined ) {

        elf.rotation.z += delta * 0.5;

      }

      renderer.render( scene, camera );

    }
  }
})