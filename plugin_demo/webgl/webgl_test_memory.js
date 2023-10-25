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

    init();
    animate();

    function init() {

      const container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
      camera.position.z = 200;

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xffffff );

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );

    }

    function createImage() {

      const canvas = document.createElement( 'canvas' );
      canvas.width = 256;
      canvas.height = 256;

      const context = canvas.getContext( '2d' );
      context.fillStyle = 'rgb(' + Math.floor( Math.random() * 256 ) + ',' + Math.floor( Math.random() * 256 ) + ',' + Math.floor( Math.random() * 256 ) + ')';
      context.fillRect( 0, 0, 256, 256 );

      return canvas;

    }

    //

    function animate() {

      requestId = requestAnimationFrame( animate );

      render().then();

    }

    async function render() {

      const geometry = new THREE.SphereGeometry( 50, Math.random() * 64, Math.random() * 32 );

      const texture = new THREE.CanvasTexture(await core.Canvas.fix(canvas3d,createImage()) );

      const material = new THREE.MeshBasicMaterial( { map: texture, wireframe: true } );

      const mesh = new THREE.Mesh( geometry, material );

      scene.add( mesh );

      renderer.render( scene, camera );

      scene.remove( mesh );

      // clean up

      geometry.dispose();
      material.dispose();
      texture.dispose();

    }

  }
})