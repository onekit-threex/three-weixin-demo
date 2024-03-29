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

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { NRRDLoader } from './three/addons/loaders/NRRDLoader.js';
import { VTKLoader } from 'three/addons/loaders/VTKLoader.js';

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
   
    let stats,
    camera,
    controls,
    scene,
    renderer;

  init();
  animate();

  function init() {

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1e10 );
    camera.position.z = 300;

    scene = new THREE.Scene();

    scene.add( camera );

    // light

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x000000, 3 );
    scene.add( hemiLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff, 1.5 );
    dirLight.position.set( 200, 200, 200 );
    scene.add( dirLight );

    const loader = new NRRDLoader();
    loader.load( 'models/nrrd/I.nrrd',async function ( volume ) {

      //box helper to see the extend of the volume
      const geometry = new THREE.BoxGeometry( volume.xLength, volume.yLength, volume.zLength );
      const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube = new THREE.Mesh( geometry, material );
      cube.visible = false;
      const box = new THREE.BoxHelper( cube );
      scene.add( box );
      box.applyMatrix4( volume.matrix );
      scene.add( cube );

      //z plane
      const sliceZ =await volume.extractSlice( 'z', Math.floor( volume.RASDimensions[ 2 ] / 4 ) );
      scene.add( sliceZ.mesh );

      //y plane
      const sliceY = await volume.extractSlice( 'y', Math.floor( volume.RASDimensions[ 1 ] / 2 ) );
      scene.add( sliceY.mesh );

      //x plane
      const sliceX = await volume.extractSlice( 'x', Math.floor( volume.RASDimensions[ 0 ] / 2 ) );
      scene.add( sliceX.mesh );
      gui.add( sliceX, 'index', 0, volume.RASDimensions[ 0 ], 1 ).name( 'indexX' ).onChange( function () {

        sliceX.repaint.call( sliceX ).then();

      } );
      gui.add( sliceY, 'index', 0, volume.RASDimensions[ 1 ], 1 ).name( 'indexY' ).onChange( function () {

        sliceY.repaint.call( sliceY ).then();

      } );
      gui.add( sliceZ, 'index', 0, volume.RASDimensions[ 2 ], 1 ).name( 'indexZ' ).onChange( function () {

        sliceZ.repaint.call( sliceZ ).then();

      } );

      gui.add( volume, 'lowerThreshold', volume.min, volume.max, 1 ).name( 'Lower Threshold' ).onChange( function () {

        volume.repaintAllSlices().then();

      } );
      gui.add( volume, 'upperThreshold', volume.min, volume.max, 1 ).name( 'Upper Threshold' ).onChange( function () {

        volume.repaintAllSlices().then();

      } );
      gui.add( volume, 'windowLow', volume.min, volume.max, 1 ).name( 'Window Low' ).onChange( function () {

        volume.repaintAllSlices().then();

      } );
      gui.add( volume, 'windowHigh', volume.min, volume.max, 1 ).name( 'Window High' ).onChange( function () {

        volume.repaintAllSlices().then();

      } );

    } );

    const vtkmaterial = new THREE.MeshLambertMaterial( { wireframe: false, side: THREE.DoubleSide, color: 0xff0000 } );

    const vtkloader = new VTKLoader();
    vtkloader.load( 'models/vtk/liver.vtk', function ( geometry ) {

      geometry.computeVertexNormals();

      const mesh = new THREE.Mesh( geometry, vtkmaterial );
      scene.add( mesh );
      const visibilityControl = {
        visible: true
      };
      gui.add( visibilityControl, 'visible' ).name( 'Model Visible' ).onChange( function () {

        mesh.visible = visibilityControl.visible;
        renderer.render( scene, camera );

      } );

    } );
    // renderer

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new TrackballControls( camera, renderer.domElement );
    controls.minDistance = 100;
    controls.maxDistance = 500;
    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 5;
    controls.panSpeed = 2;

    stats = new Stats();
    document.body.appendChild( stats.dom );

    const gui = new GUI();

    window.addEventListener( 'resize', onWindowResize );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    controls.handleResize();

  }

  function animate() {

    requestAnimationFrame( animate );

    controls.update();

    renderer.render( scene, camera );

    stats.update();

  }
  }
})