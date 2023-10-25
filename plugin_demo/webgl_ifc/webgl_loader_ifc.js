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

import { IFCLoader } from 'three/3rd/web-ifc-three';
import { IFCSPACE } from 'three/3rd/web-ifc';
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

    let scene, camera, renderer;

    async function init() {

      //Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0x8cc7de );

      //Camera
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
      camera.position.z = - 70;
      camera.position.y = 25;
      camera.position.x = 90;

      //Initial cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
      const cube = new THREE.Mesh( geometry, material );
      scene.add( cube );

      //Lights
      const directionalLight1 = new THREE.DirectionalLight( 0xffeeff, 2.5 );
      directionalLight1.position.set( 1, 1, 1 );
      scene.add( directionalLight1 );

      const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 2.5 );
      directionalLight2.position.set( - 1, 0.5, - 1 );
      scene.add( directionalLight2 );

      const ambientLight = new THREE.AmbientLight( 0xffffee, 0.75 );
      scene.add( ambientLight );

      //Setup IFC Loader
      const ifcLoader = new IFCLoader();
      await ifcLoader.ifcManager.setWasmPath( 'https://unpkg.com/web-ifc@0.0.36/', true );

      await ifcLoader.ifcManager.parser.setupOptionalCategories( {
        [ IFCSPACE ]: false,
      } );

      await ifcLoader.ifcManager.applyWebIfcConfig( {
        USE_FAST_BOOLS: true
      } );

      ifcLoader.load( 'models/ifc/rac_advanced_sample_project.ifc', function ( model ) {

        scene.add( model.mesh );
        render();

      } );

      //Renderer
      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setPixelRatio( window.devicePixelRatio );
      document.body.appendChild( renderer.domElement );

      //Controls
      const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.addEventListener( 'change', render );

      window.addEventListener( 'resize', onWindowResize );

      render();

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );

      render();

    }

    function render() {

      renderer.render( scene, camera );

    }

    init();
  }
})