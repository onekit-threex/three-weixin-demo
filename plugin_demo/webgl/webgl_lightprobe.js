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
import { LightProbeGenerator } from './three/addons/lights/LightProbeGenerator.js';
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

  let mesh, renderer, scene, camera;

  let gui;

  let lightProbe;
  let directionalLight;

  // linear color space
  const API = {
    lightProbeIntensity: 1.0,
    directionalLightIntensity: 0.6,
    envMapIntensity: 1
  };

  init();

  function init() {

    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // tone mapping
    renderer.toneMapping = THREE.NoToneMapping;


    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 0, 30 );

    // controls
    const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.minDistance = 10;
    controls.maxDistance = 50;
    controls.enablePan = false;

    // probe
    lightProbe = new THREE.LightProbe();
    scene.add( lightProbe );

    // light
    directionalLight = new THREE.DirectionalLight( 0xffffff, API.directionalLightIntensity );
    directionalLight.position.set( 10, 10, 10 );
    scene.add( directionalLight );

    // envmap
    const genCubeUrls = function ( prefix, postfix ) {

      return [
        prefix + 'px' + postfix, prefix + 'nx' + postfix,
        prefix + 'py' + postfix, prefix + 'ny' + postfix,
        prefix + 'pz' + postfix, prefix + 'nz' + postfix
      ];

    };

    const urls = genCubeUrls( 'textures/cube/pisa/', '.png' );

    new THREE.CubeTextureLoader().load( urls, function ( cubeTexture ) {

      scene.background = cubeTexture;

      lightProbe.copy( LightProbeGenerator.fromCubeTexture( cubeTexture ) );

      const geometry = new THREE.SphereGeometry( 5, 64, 32 );
      //const geometry = new THREE.TorusKnotGeometry( 4, 1.5, 256, 32, 2, 3 );

      const material = new THREE.MeshStandardMaterial( {
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        envMap: cubeTexture,
        envMapIntensity: API.envMapIntensity,
      } );

      // mesh
      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      render();

    } );


    // gui
    gui = new GUI( { title: 'Intensity' } );

    gui.add( API, 'lightProbeIntensity', 0, 1, 0.02 )
      .name( 'light probe' )
      .onChange( function () {

        lightProbe.intensity = API.lightProbeIntensity; render();

      } );

    gui.add( API, 'directionalLightIntensity', 0, 1, 0.02 )
      .name( 'directional light' )
      .onChange( function () {

        directionalLight.intensity = API.directionalLightIntensity; render();

      } );

    gui.add( API, 'envMapIntensity', 0, 1, 0.02 )
      .name( 'envMap' )
      .onChange( function () {

        mesh.material.envMapIntensity = API.envMapIntensity; render();

      } );

    // listener
    window.addEventListener( 'resize', onWindowResize );

  }

  function onWindowResize() {

    renderer.setSize( window.innerWidth, window.innerHeight );

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    render();

  }

  function render() {

    renderer.render( scene, camera );

  }
  }
})