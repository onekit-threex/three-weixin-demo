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

import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
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

  let camera, controls, scene, renderer, stats;

  let mesh, geometry, material, clock;

  const worldWidth = 128, worldDepth = 128;

  init();
  animate();

  function init() {

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.y = 200;

    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xaaccff );
    scene.fog = new THREE.FogExp2( 0xaaccff, 0.0007 );

    geometry = new THREE.PlaneGeometry( 20000, 20000, worldWidth - 1, worldDepth - 1 );
    geometry.rotateX( - Math.PI / 2 );

    const position = geometry.attributes.position;
    position.usage = THREE.DynamicDrawUsage;

    for ( let i = 0; i < position.count; i ++ ) {

      const y = 35 * Math.sin( i / 2 );
      position.setY( i, y );

    }

    const texture = new THREE.TextureLoader().load( 'textures/water.jpg' );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 5, 5 );
    texture.colorSpace = THREE.SRGBColorSpace;

    material = new THREE.MeshBasicMaterial( { color: 0x0044ff, map: texture } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new FirstPersonControls( camera, renderer.domElement );

    controls.movementSpeed = 500;
    controls.lookSpeed = 0.1;

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

  //

  function animate() {

    requestId = requestAnimationFrame( animate );

    render();
    stats.update();

  }

  function render() {

    const delta = clock.getDelta();
    const time = clock.getElapsedTime() * 10;

    const position = geometry.attributes.position;

    for ( let i = 0; i < position.count; i ++ ) {

      const y = 35 * Math.sin( i / 5 + ( time + i ) / 7 );
      position.setY( i, y );

    }

    position.needsUpdate = true;

    controls.update( delta );
    renderer.render( scene, camera );

  }
  }
})