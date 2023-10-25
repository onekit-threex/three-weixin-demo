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
import { Water } from 'three/addons/objects/Water2.js';
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

  let scene, camera, renderer, water;

  init();
  animate();

  function init() {

    // scene

    scene = new THREE.Scene();

    // camera

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 200 );
    camera.position.set( 0, 25, 0 );
    camera.lookAt( scene.position );

    // ground

    const groundGeometry = new THREE.PlaneGeometry( 20, 20, 10, 10 );
    const groundMaterial = new THREE.MeshBasicMaterial( { color: 0xe7e7e7 } );
    const ground = new THREE.Mesh( groundGeometry, groundMaterial );
    ground.rotation.x = Math.PI * - 0.5;
    scene.add( ground );

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load( 'textures/floors/FloorsCheckerboard_S_Diffuse.jpg', function ( map ) {

      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 16;
      map.repeat.set( 4, 4 );
      map.colorSpace = THREE.SRGBColorSpace;
      groundMaterial.map = map;
      groundMaterial.needsUpdate = true;

    } );

    // water

    const waterGeometry = new THREE.PlaneGeometry( 20, 20 );
    const flowMap = textureLoader.load( 'textures/water/Water_1_M_Flow.jpg' );

    water = new Water( waterGeometry, {
      scale: 2,
      textureWidth: 1024,
      textureHeight: 1024,
      flowMap: flowMap
    } );

    water.position.y = 1;
    water.rotation.x = Math.PI * - 0.5;
    scene.add( water );

    // flow map helper

    const helperGeometry = new THREE.PlaneGeometry( 20, 20 );
    const helperMaterial = new THREE.MeshBasicMaterial( { map: flowMap } );
    const helper = new THREE.Mesh( helperGeometry, helperMaterial );
    helper.position.y = 1.01;
    helper.rotation.x = Math.PI * - 0.5;
    helper.visible = false;
    scene.add( helper );

    // renderer

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

    //

    const gui = new GUI();
    gui.add( helper, 'visible' ).name( 'Show Flow Map' );
    gui.open();

    //

    const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    controls.minDistance = 5;
    controls.maxDistance = 50;

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

  }

  function render() {

    renderer.render( scene, camera );

  }
  }
})