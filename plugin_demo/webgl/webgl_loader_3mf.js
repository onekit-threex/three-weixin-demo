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
import { ThreeMFLoader } from 'three/addons/loaders/3MFLoader.js';
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

  let camera, scene, renderer, object, loader, controls;

  const params = {
    asset: 'cube_gears'
  };

  const assets = [
    'cube_gears',
    'facecolors',
    'multipletextures',
    'vertexcolors'
  ];

  init();

  function init() {

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x333333 );

    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );

    // Z is up for objects intended to be 3D printed.

    camera.up.set( 0, 0, 1 );
    camera.position.set( - 100, - 250, 100 );
    scene.add( camera );

    controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.minDistance = 50;
    controls.maxDistance = 400;
    controls.enablePan = false;
    controls.update();

    scene.add( new THREE.AmbientLight( 0xffffff, 0.6 ) );

    const light = new THREE.DirectionalLight( 0xffffff, 2 );
    light.position.set( - 1, - 2.5, 1 );
    scene.add( light );

    const manager = new THREE.LoadingManager();

    manager.onLoad = function () {

      const aabb = new THREE.Box3().setFromObject( object );
      const center = aabb.getCenter( new THREE.Vector3() );

      object.position.x += ( object.position.x - center.x );
      object.position.y += ( object.position.y - center.y );
      object.position.z += ( object.position.z - center.z );

      controls.reset();

      scene.add( object );
      render();

    };

    loader = new ThreeMFLoader( manager );
    loadAsset( params.asset );

    window.addEventListener( 'resize', onWindowResize );

    //

    const gui = new GUI();
    gui.add( params, 'asset', assets ).onChange( function ( value ) {

      loadAsset( value );

    } );

  }

  function loadAsset( asset ) {

    loader.load( 'models/3mf/' + asset + '.3mf', function ( group ) {

      if ( object ) {

        object.traverse( function ( child ) {

          if ( child.material ) child.material.dispose();
          if ( child.material && child.material.map ) child.material.map.dispose();
          if ( child.geometry ) child.geometry.dispose();

        } );

        scene.remove( object );

      }

      //

      object = group;

    } );

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
  }
})