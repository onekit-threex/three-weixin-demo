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

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { TDSLoader } from 'three/addons/loaders/TDSLoader.js';
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

  let container, controls;
  let camera, scene, renderer;

  init();
  animate();

  function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 10 );
    camera.position.z = 2;

    scene = new THREE.Scene();
    scene.add( new THREE.AmbientLight( 0xffffff, 3 ) );

    const directionalLight = new THREE.DirectionalLight( 0xffeedd, 3 );
    directionalLight.position.set( 0, 0, 2 );
    scene.add( directionalLight );

    //3ds files dont store normal maps
    const normal = new THREE.TextureLoader().load( 'models/3ds/portalgun/textures/normal.jpg' );

    const loader = new TDSLoader( );
    loader.setResourcePath( 'models/3ds/portalgun/textures/' );
    loader.load( 'models/3ds/portalgun/portalgun.3ds', function ( object ) {

      object.traverse( function ( child ) {

        if ( child.isMesh ) {

          child.material.specular.setScalar( 0.1 );
          child.material.normalMap = normal;

        }

      } );

      scene.add( object );

    } );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    controls = new TrackballControls( camera, renderer.domElement );

    window.addEventListener( 'resize', resize );

  }

  function resize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function animate() {

    controls.update();
    renderer.render( scene, camera );

    requestId = requestAnimationFrame( animate );

  }
  }
})