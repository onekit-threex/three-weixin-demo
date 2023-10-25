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
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

  let object;

  init();


  function init() {

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 20 );
    camera.position.z = 2.5;

    // scene

    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight( 0xffffff );
    scene.add( ambientLight );

    const pointLight = new THREE.PointLight( 0xffffff, 15 );
    camera.add( pointLight );
    scene.add( camera );

    // manager

    function loadModel() {

      object.traverse( function ( child ) {

        if ( child.isMesh ) child.material.map = texture;

      } );

      object.position.y = - 0.95;
      object.scale.setScalar( 0.01 );
      scene.add( object );

      render();

    }

    const manager = new THREE.LoadingManager( loadModel );

    // texture

    const textureLoader = new THREE.TextureLoader( manager );
    const texture = textureLoader.load( 'textures/uv_grid_opengl.jpg', render );
    texture.colorSpace = THREE.SRGBColorSpace;

    // model

    function onProgress( xhr ) {

      if ( xhr.lengthComputable ) {

        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log( 'model ' + percentComplete.toFixed( 2 ) + '% downloaded' );

      }

    }

    function onError() {}

    const loader = new OBJLoader( manager );
    loader.load( 'models/obj/male02/male02.obj', function ( obj ) {

      object = obj;

    }, onProgress, onError );

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //

    const controls = new  OrbitControls( camera, renderer.domElement );
    controls.minDistance = 2;
    controls.maxDistance = 5;
    controls.addEventListener( 'change', render );

    //

    window.addEventListener( 'resize', onWindowResize );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function render() {

    renderer.render( scene, camera );

  }
  }
})