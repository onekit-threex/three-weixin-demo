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

import { MeshBasicNodeMaterial, vec4, color, positionLocal, mix } from './three/addons/nodes/Nodes.js';
import { nodeFrame } from 'three/addons/renderers/webgl-legacy/nodes/WebGLNodes.js';

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
  let container, stats;
  let camera, scene, renderer;

  init().then( animate );

  async function init() {

    const { innerWidth, innerHeight } = window;

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // CAMERA

    camera = new THREE.PerspectiveCamera( 40, innerWidth / innerHeight, 1, 10000 );
    camera.position.set( 700, 200, - 500 );

    // SCENE

    scene = new THREE.Scene();

    // LIGHTS

    const light = new THREE.DirectionalLight( 0xd5deff );
    light.position.x = 300;
    light.position.y = 250;
    light.position.z = - 500;
    scene.add( light );

    // SKYDOME

    const topColor = new THREE.Color().copy( light.color );
    const bottomColor = new THREE.Color( 0xffffff );
    const offset = 400;
    const exponent = 0.6;

    const h = positionLocal.add( offset ).normalize().y;

    const skyMat = new MeshBasicNodeMaterial();
    skyMat.colorNode = vec4( mix( color( bottomColor ), color( topColor ), h.max( 0.0 ).pow( exponent ) ), 1.0 );
    skyMat.side = THREE.BackSide;

    const sky = new THREE.Mesh( new THREE.SphereGeometry( 4000, 32, 15 ), skyMat );
    scene.add( sky );

    // RENDERER

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( innerWidth, innerHeight );
    container.appendChild( renderer.domElement );

    // CONTROLS

    const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    controls.maxPolarAngle = 0.9 * Math.PI / 2;
    controls.enableZoom = false;

    // STATS

    stats = new Stats();
    container.appendChild( stats.dom );

    // MODEL

    const loader = new THREE.ObjectLoader();
    const object = await loader.loadAsync( 'models/json/lightmap/lightmap.json' );
    scene.add( object );

    //

    window.addEventListener( 'resize', onWindowResize );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  //

  function animate() {

    requestId = requestAnimationFrame( animate );

    nodeFrame.update();

    renderer.render( scene, camera );
    stats.update();

  }

  }
})