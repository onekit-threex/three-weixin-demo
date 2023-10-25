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
import { TIFFLoader } from './three/addons/loaders/TIFFLoader.js';

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
  let renderer, scene, camera;

  init();

  function init() {

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.set( 0, 0, 4 );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    const loader = new TIFFLoader();

    const geometry = new THREE.PlaneGeometry();

    // uncompressed

    loader.load( 'textures/tiff/crate_uncompressed.tif', function ( texture ) {

      texture.colorSpace = THREE.SRGBColorSpace;

      const material = new THREE.MeshBasicMaterial( { map: texture } );

      const mesh = new THREE.Mesh( geometry, material );
      mesh.position.set( - 1.5, 0, 0 );

      scene.add( mesh );

      render();

    } );

    // LZW

    loader.load( 'textures/tiff/crate_lzw.tif', function ( texture ) {

      texture.colorSpace = THREE.SRGBColorSpace;

      const material = new THREE.MeshBasicMaterial( { map: texture } );

      const mesh = new THREE.Mesh( geometry, material );
      mesh.position.set( 0, 0, 0 );

      scene.add( mesh );

      render();

    } );

    // JPEG

    loader.load( 'textures/tiff/crate_jpeg.tif', function ( texture ) {

      texture.colorSpace = THREE.SRGBColorSpace;

      const material = new THREE.MeshBasicMaterial( { map: texture } );

      const mesh = new THREE.Mesh( geometry, material );
      mesh.position.set( 1.5, 0, 0 );

      scene.add( mesh );

      render();

    } );

    //

    window.addEventListener( 'resize', onWindowResize );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

  }


  //

  function render() {

    renderer.render( scene, camera );

  }
  }
})