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

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { VTKLoader } from './three/addons/loaders/VTKLoader.js';
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

    let stats;

    let camera, controls, scene, renderer;

    init();
    animate();

    function init() {

      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 100 );
      camera.position.z = 0.2;

      scene = new THREE.Scene();

      scene.add( camera );

      // light

      const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x000000, 3 );
      scene.add( hemiLight );

      const dirLight = new THREE.DirectionalLight( 0xffffff, 1.5 );
      dirLight.position.set( 2, 2, 2 );
      scene.add( dirLight );

      const loader = new VTKLoader();
      loader.load( 'models/vtk/bunny.vtk', function ( geometry ) {

        geometry.center();
        geometry.computeVertexNormals();

        const material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( - 0.075, 0.005, 0 );
        mesh.scale.multiplyScalar( 0.2 );
        scene.add( mesh );

      } );

      const loader1 = new VTKLoader();
      loader1.load( 'models/vtk/cube_ascii.vtp', function ( geometry ) {

        geometry.computeVertexNormals();
        geometry.center();

        const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        const mesh = new THREE.Mesh( geometry, material );

        mesh.position.set( - 0.025, 0, 0 );
        mesh.scale.multiplyScalar( 0.01 );


        scene.add( mesh );

      } );

      const loader2 = new VTKLoader();
      loader2.load( 'models/vtk/cube_binary.vtp', function ( geometry ) {

        geometry.computeVertexNormals();
        geometry.center();

        const material = new THREE.MeshLambertMaterial( { color: 0x0000ff } );
        const mesh = new THREE.Mesh( geometry, material );

        mesh.position.set( 0.025, 0, 0 );
        mesh.scale.multiplyScalar( 0.01 );


        scene.add( mesh );

      } );

      const loader3 = new VTKLoader();
      loader3.load( 'models/vtk/cube_no_compression.vtp', function ( geometry ) {

        geometry.computeVertexNormals();
        geometry.center();

        const material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
        const mesh = new THREE.Mesh( geometry, material );

        mesh.position.set( 0.075, 0, 0 );
        mesh.scale.multiplyScalar( 0.01 );


        scene.add( mesh );

      } );

      // renderer

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      // controls

      controls = new TrackballControls( camera, renderer.domElement );
      controls.minDistance = .1;
      controls.maxDistance = 0.5;
      controls.rotateSpeed = 5.0;

      stats = new Stats();
      document.body.appendChild( stats.dom );

      //

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

      controls.handleResize();

    }

    function animate() {

      requestId = requestAnimationFrame( animate );

      controls.update();

      renderer.render( scene, camera );

      stats.update();

    }
  }
})