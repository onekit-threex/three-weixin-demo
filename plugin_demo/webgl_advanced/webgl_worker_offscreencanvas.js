// webgl_advanced/webgl_worker_offscreencanvas.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import initJank from './jsm/offscreen/jank.js';
import init from './jsm/offscreen/scene.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';

var requestId
Page({
	onUnload() {
	//	cancelAnimationFrame(requestId, this.canvas)
this.worker && this.worker.terminate()
		setTimeout(() => {
			if (this.renderer instanceof THREE.WebGL1Renderer) {
				this.renderer.dispose()
				this.renderer.forceContextLoss()
				this.renderer.context = null
				this.renderer.domElement = null
				this.renderer = null
			}
		}, 200)
	},
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
const canvas1 = await document.getElementByIdAsync( 'canvas1' );
const canvas2 = await document.getElementByIdAsync( 'canvas2' );

const width = canvas1.clientWidth;
const height = canvas1.clientHeight;
const pixelRatio = window.devicePixelRatio;

init( canvas3d, width, height, pixelRatio, './' );
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