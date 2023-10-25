import {
  document,
	window,
	HTMLCanvasElement,
	requestAnimationFrame,
  cancelAnimationFrame,
  navigator,
core,
	Event,
  Event0
} from "dhtml-weixin"
import * as THREE from './three/Three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';

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
  let camera, scene, renderer, video;

  init();
  animate();

  function init() {

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.z = 0.01;

    scene = new THREE.Scene();

    video = document.getElementById( 'video' );

    const texture = new THREE.VideoTexture( video );
    texture.colorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.PlaneGeometry( 16, 9 );
    geometry.scale( 0.5, 0.5, 0.5 );
    const material = new THREE.MeshBasicMaterial( { map: texture } );

    const count = 128;
    const radius = 32;

    for ( let i = 1, l = count; i <= l; i ++ ) {

      const phi = Math.acos( - 1 + ( 2 * i ) / l );
      const theta = Math.sqrt( l * Math.PI ) * phi;

      const mesh = new THREE.Mesh( geometry, material );
      mesh.position.setFromSphericalCoords( radius, phi, theta );
      mesh.lookAt( camera.position );
      scene.add( mesh );

    }

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    controls.enableZoom = false;
    controls.enablePan = false;

    window.addEventListener( 'resize', onWindowResize );

    //

    if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {

      const constraints = { video: { width: 1280, height: 720, facingMode: 'user' } };

      navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {

        // apply the stream to the video element used in the texture

        video.srcObject = stream;
        video.play();

      } ).catch( function ( error ) {

        console.error( 'Unable to access the camera/webcam.', error );

      } );

    } else {

      console.error( 'MediaDevices interface not available.' );

    }

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function animate() {

    requestId = requestAnimationFrame( animate );
    renderer.render( scene, camera );

  }
  }
})