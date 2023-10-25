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
import { BVHLoader } from './three/addons/loaders/BVHLoader.js';
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

  const clock = new THREE.Clock();

  let camera, controls, scene, renderer;
  let mixer;

  init();
  animate();

  const loader = new BVHLoader();
  loader.load( 'models/bvh/pirouette.bvh', function ( result ) {

    const skeletonHelper = new THREE.SkeletonHelper( result.skeleton.bones[ 0 ] );

    scene.add( result.skeleton.bones[ 0 ] );
    scene.add( skeletonHelper );

    // play animation
    mixer = new THREE.AnimationMixer( result.skeleton.bones[ 0 ] );
    mixer.clipAction( result.clip ).play();

  } );

  function init() {

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 200, 300 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xeeeeee );

    scene.add( new THREE.GridHelper( 400, 10 ) );

    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    controls.minDistance = 300;
    controls.maxDistance = 700;

    window.addEventListener( 'resize', onWindowResize );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function animate() {

    requestId = requestAnimationFrame( animate );

    const delta = clock.getDelta();

    if ( mixer ) mixer.update( delta );

    renderer.render( scene, camera );

  }
  }
})