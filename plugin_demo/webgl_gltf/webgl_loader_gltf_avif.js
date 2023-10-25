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
import { GLTFLoader } from './three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from './three/addons/loaders/DRACOLoader.js';
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
  render();

  function init() {

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set( 1.5, 4, 9 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf6eedc );

    //

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( 'jsm/libs/draco/gltf/' );

    const loader = new GLTFLoader();
    loader.setDRACOLoader( dracoLoader );
    loader.setPath( 'models/gltf/AVIFTest/' );
    loader.load( 'forest_house.glb', function ( gltf ) {

      scene.add( gltf.scene );

      render();

    } );

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.target.set( 0, 2, 0 );
    controls.update();

    window.addEventListener( 'resize', onWindowResize );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

  }

  //

  function render() {

    renderer.render( scene, camera );

  }
  }
})