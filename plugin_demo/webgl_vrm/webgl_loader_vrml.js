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

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';
import { VRMLLoader } from 'three/addons/loaders/VRMLLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
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

  let camera, scene, renderer, stats, controls, loader;

  const params = {
    asset: 'house'
  };

  const assets = [
    'creaseAngle',
    'crystal',
    'house',
    'elevationGrid1',
    'elevationGrid2',
    'extrusion1',
    'extrusion2',
    'extrusion3',
    'lines',
    'meshWithLines',
    'meshWithTexture',
    'pixelTexture',
    'points',
  ];

  let vrmlScene;

  init();
  animate();

  function init() {

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1e10 );
    camera.position.set( - 10, 5, 10 );

    scene = new THREE.Scene();
    scene.add( camera );

    // light

    const ambientLight = new THREE.AmbientLight( 0xffffff, 1.2 );
    scene.add( ambientLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff, 2.0 );
    dirLight.position.set( 200, 200, 200 );
    scene.add( dirLight );

    loader = new VRMLLoader();
    loadAsset( params.asset );

    // renderer

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // controls

    controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    controls.minDistance = 1;
    controls.maxDistance = 200;
    controls.enableDamping = true;

    //

    stats = new Stats();
    document.body.appendChild( stats.dom );

    //

    window.addEventListener( 'resize', onWindowResize );

    //

    const gui = new GUI();
    gui.add( params, 'asset', assets ).onChange( function ( value ) {

      if ( vrmlScene ) {

        vrmlScene.traverse( function ( object ) {

          if ( object.material ) object.material.dispose();
          if ( object.material && object.material.map ) object.material.map.dispose();
          if ( object.geometry ) object.geometry.dispose();

        } );

        scene.remove( vrmlScene );

      }

      loadAsset( value );

    } );

  }

  function loadAsset( asset ) {

    loader.load( 'models/vrml/' + asset + '.wrl', function ( object ) {

      vrmlScene = object;
      scene.add( object );
      controls.reset();

    } );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function animate() {

    requestId = requestAnimationFrame( animate );

    controls.update(); // to support damping

    renderer.render( scene, camera );

    stats.update();

  }
  }
})