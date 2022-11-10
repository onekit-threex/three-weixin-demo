// webgl/webgl_loader_texture_tiff.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { TIFFLoader } from './jsm/loaders/TIFFLoader.js';
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
async onLoad() {
        const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this

        
			let renderer, scene, camera;

			init();

			function init() {

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 10 );
				camera.position.set( 0, 0, 4 );

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				scene = new THREE.Scene();

				const loader = new TIFFLoader();

				const geometry = new THREE.PlaneGeometry();

				// uncompressed

				loader.load( 'textures/tiff/crate_uncompressed.tif', function ( texture ) {

					const material = new THREE.MeshBasicMaterial( { map: texture } );

					const mesh = new THREE.Mesh( geometry, material );
					mesh.position.set( - 1.5, 0, 0 );

					scene.add( mesh );

					render();

				} );

				// LZW

				loader.load( 'textures/tiff/crate_lzw.tif', function ( texture ) {

					const material = new THREE.MeshBasicMaterial( { map: texture } );

					const mesh = new THREE.Mesh( geometry, material );
					mesh.position.set( 0, 0, 0 );

					scene.add( mesh );

					render();

				} );

				// JPEG

				loader.load( 'textures/tiff/crate_jpeg.tif', function ( texture ) {

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