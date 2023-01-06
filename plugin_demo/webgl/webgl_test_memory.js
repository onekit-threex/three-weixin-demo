// webgl/webgl_test_memory.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
var requestId
Page({
	   
         onUnload() {
	   		cancelAnimationFrame(requestId, this.canvas)
this.worker && this.worker.terminate()
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
         webgl_touch(e) {
        const web_e = Event.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
onLoad() {
    document.createElementAsync("canvas", "webgl").then(canvas=>this.run(canvas).then())
},
async run(canvas3d){
this.canvas = canvas3d
var that = this


			let camera, scene, renderer;

			init();
		await	animate();

			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 200;

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xffffff );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
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

	async		function animate() {

				requestId = requestAnimationFrame(animate);

			await	render();

			}

	async		function render() {

				const geometry = new THREE.SphereGeometry( 50, Math.random() * 64, Math.random() * 32 );

				const texture = new THREE.CanvasTexture(await core.Canvas.fix(canvas3d, createImage() ));

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