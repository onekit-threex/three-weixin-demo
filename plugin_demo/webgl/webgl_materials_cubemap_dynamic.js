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
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';
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

    let camera, scene, renderer, stats;
    let cube, sphere, torus, material;

    let cubeCamera, cubeRenderTarget;

    let controls;

    init();

    function init() {

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setAnimationLoop( animation );
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      document.body.appendChild( renderer.domElement );

      window.addEventListener( 'resize', onWindowResized );

      stats = new Stats();
      document.body.appendChild( stats.dom );

      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
      camera.position.z = 75;

      scene = new THREE.Scene();
      scene.rotation.y = 0.5; // avoid flying objects occluding the sun

      new RGBELoader()
        .setPath( 'textures/equirectangular/' )
        .load( 'quarry_01_1k.hdr', function ( texture ) {

          texture.mapping = THREE.EquirectangularReflectionMapping;

          scene.background = texture;
          scene.environment = texture;

        } );

      //

      cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 256 );
      cubeRenderTarget.texture.type = THREE.HalfFloatType;

      cubeCamera = new THREE.CubeCamera( 1, 1000, cubeRenderTarget );

      //

      material = new THREE.MeshStandardMaterial( {
        envMap: cubeRenderTarget.texture,
        roughness: 0.05,
        metalness: 1
      } );

      const gui = new GUI();
      gui.add( material, 'roughness', 0, 1 );
      gui.add( material, 'metalness', 0, 1 );
      gui.add( renderer, 'toneMappingExposure', 0, 2 ).name( 'exposure' );

      sphere = new THREE.Mesh( new THREE.IcosahedronGeometry( 15, 8 ), material );
      scene.add( sphere );

      const material2 = new THREE.MeshStandardMaterial( {
        roughness: 0.1,
        metalness: 0
      } );

      cube = new THREE.Mesh( new THREE.BoxGeometry( 15, 15, 15 ), material2 );
      scene.add( cube );

      torus = new THREE.Mesh( new THREE.TorusKnotGeometry( 8, 3, 128, 16 ), material2 );
      scene.add( torus );

      //

      controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.autoRotate = true;

    }

    function onWindowResized() {

      renderer.setSize( window.innerWidth, window.innerHeight );

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

    }

    function animation( msTime ) {

      const time = msTime / 1000;

      cube.position.x = Math.cos( time ) * 30;
      cube.position.y = Math.sin( time ) * 30;
      cube.position.z = Math.sin( time ) * 30;

      cube.rotation.x += 0.02;
      cube.rotation.y += 0.03;

      torus.position.x = Math.cos( time + 10 ) * 30;
      torus.position.y = Math.sin( time + 10 ) * 30;
      torus.position.z = Math.sin( time + 10 ) * 30;

      torus.rotation.x += 0.02;
      torus.rotation.y += 0.03;

      cubeCamera.update( renderer, scene );

      controls.update();

      renderer.render( scene, camera );

      stats.update();

    }

  }
})