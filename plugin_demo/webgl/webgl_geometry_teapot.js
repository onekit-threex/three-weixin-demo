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
import { TeapotGeometry } from './three/addons/geometries/TeapotGeometry.js';
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
  let cameraControls;
  let effectController;
  const teapotSize = 300;
  let ambientLight, light;

  let tess = - 1;	// force initialization
  let bBottom;
  let bLid;
  let bBody;
  let bFitLid;
  let bNonBlinn;
  let shading;

  let teapot, textureCube;
  const materials = {};

  init();
  render();

  function init() {

    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    // CAMERA
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 80000 );
    camera.position.set( - 600, 550, 1300 );

    // LIGHTS
    ambientLight = new THREE.AmbientLight( 0x7c7c7c, 3.0 );

    light = new THREE.DirectionalLight( 0xFFFFFF, 3.0 );
    light.position.set( 0.32, 0.39, 0.7 );

    // RENDERER
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( canvasWidth, canvasHeight );
    container.appendChild( renderer.domElement );

    // EVENTS
    window.addEventListener( 'resize', onWindowResize );

    // CONTROLS
    cameraControls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    cameraControls.addEventListener( 'change', render );

    // TEXTURE MAP
    const textureMap = new THREE.TextureLoader().load( 'textures/uv_grid_opengl.jpg' );
    textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping;
    textureMap.anisotropy = 16;
    textureMap.colorSpace = THREE.SRGBColorSpace;

    // REFLECTION MAP
    const path = 'textures/cube/pisa/';
    const urls = [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ];

    textureCube = new THREE.CubeTextureLoader().setPath( path ).load( urls );

    materials[ 'wireframe' ] = new THREE.MeshBasicMaterial( { wireframe: true } );
    materials[ 'flat' ] = new THREE.MeshPhongMaterial( { specular: 0x000000, flatShading: true, side: THREE.DoubleSide } );
    materials[ 'smooth' ] = new THREE.MeshLambertMaterial( { side: THREE.DoubleSide } );
    materials[ 'glossy' ] = new THREE.MeshPhongMaterial( { side: THREE.DoubleSide } );
    materials[ 'textured' ] = new THREE.MeshPhongMaterial( { map: textureMap, side: THREE.DoubleSide } );
    materials[ 'reflective' ] = new THREE.MeshPhongMaterial( { envMap: textureCube, side: THREE.DoubleSide } );

    // scene itself
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xAAAAAA );

    scene.add( ambientLight );
    scene.add( light );

    // GUI
    setupGui();

  }

  // EVENT HANDLERS

  function onWindowResize() {

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    renderer.setSize( canvasWidth, canvasHeight );

    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();

    render();

  }

  function setupGui() {

    effectController = {
      newTess: 15,
      bottom: true,
      lid: true,
      body: true,
      fitLid: false,
      nonblinn: false,
      newShading: 'glossy'
    };

    const gui = new GUI();
    gui.add( effectController, 'newTess', [ 2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 40, 50 ] ).name( 'Tessellation Level' ).onChange( render );
    gui.add( effectController, 'lid' ).name( 'display lid' ).onChange( render );
    gui.add( effectController, 'body' ).name( 'display body' ).onChange( render );
    gui.add( effectController, 'bottom' ).name( 'display bottom' ).onChange( render );
    gui.add( effectController, 'fitLid' ).name( 'snug lid' ).onChange( render );
    gui.add( effectController, 'nonblinn' ).name( 'original scale' ).onChange( render );
    gui.add( effectController, 'newShading', [ 'wireframe', 'flat', 'smooth', 'glossy', 'textured', 'reflective' ] ).name( 'Shading' ).onChange( render );

  }


  //

  function render() {

    if ( effectController.newTess !== tess ||
      effectController.bottom !== bBottom ||
      effectController.lid !== bLid ||
      effectController.body !== bBody ||
      effectController.fitLid !== bFitLid ||
      effectController.nonblinn !== bNonBlinn ||
      effectController.newShading !== shading ) {

      tess = effectController.newTess;
      bBottom = effectController.bottom;
      bLid = effectController.lid;
      bBody = effectController.body;
      bFitLid = effectController.fitLid;
      bNonBlinn = effectController.nonblinn;
      shading = effectController.newShading;

      createNewTeapot();

    }

    // skybox is rendered separately, so that it is always behind the teapot.
    if ( shading === 'reflective' ) {

      scene.background = textureCube;

    } else {

      scene.background = null;

    }

    renderer.render( scene, camera );

  }

  // Whenever the teapot changes, the scene is rebuilt from scratch (not much to it).
  function createNewTeapot() {

    if ( teapot !== undefined ) {

      teapot.geometry.dispose();
      scene.remove( teapot );

    }

    const geometry = new TeapotGeometry( teapotSize,
      tess,
      effectController.bottom,
      effectController.lid,
      effectController.body,
      effectController.fitLid,
      ! effectController.nonblinn );

    teapot = new THREE.Mesh( geometry, materials[ shading ] );

    scene.add( teapot );

  }
  }
})