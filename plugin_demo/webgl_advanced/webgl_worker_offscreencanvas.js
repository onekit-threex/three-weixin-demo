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
import initJank from 'three/addons/offscreen/jank.js';
import init from 'three/addons/offscreen/scene.js';
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

  // onscreen

  const canvas1 = canvas3d //await document.getElementById( 'canvas1' );
  const canvas2 = canvas3d //await document.getElementById( 'canvas2' );

  const width = canvas1.clientWidth;
  const height = canvas1.clientHeight;
  const pixelRatio = window.devicePixelRatio;

  init( canvas1, width, height, pixelRatio, './' );
  initJank();

  // offscreen

  if ( 'transferControlToOffscreen' in canvas2 ) {

    const offscreen = canvas2.transferControlToOffscreen();
    const worker = new Worker( 'jsm/offscreen/offscreen.js', { type: 'module' } );
    worker.postMessage( {
      drawingSurface: offscreen,
      width: canvas2.clientWidth,
      height: canvas2.clientHeight,
      pixelRatio: window.devicePixelRatio,
      path: '../../'
    }, [ offscreen ] );

  } else {

    document.getElementById( 'message' ).style.display = 'block';

  }
  }
})