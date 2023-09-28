// webgl_postprocessing/webgl_postprocessing_afterimage.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';

import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from './jsm/postprocessing/AfterimagePass.js';


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
        const web_e = Event0.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
let camera, scene, renderer, composer;
			let mesh;

			let afterimagePass;

			const params = {

				enable: true

			};

			init();
			createGUI();
			animate();

			function init() {

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 400;

				scene = new THREE.Scene();
				scene.fog = new THREE.Fog( 0x000000, 1, 1000 );

				const geometry = new THREE.BoxGeometry( 150, 150, 150, 2, 2, 2 );
				const material = new THREE.MeshNormalMaterial();
				mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );

				// postprocessing

				composer = new EffectComposer( renderer );
				composer.addPass( new RenderPass( scene, camera ) );

				afterimagePass = new AfterimagePass();
				composer.addPass( afterimagePass );

				window.addEventListener( 'resize', onWindowResize );

				if ( typeof TESTING !== 'undefined' ) {

					for ( let i = 0; i < 45; i ++ ) {

						render();

					}



				}

			}

			function createGUI() {

				const gui = new GUI( { name: 'Damp setting' } );
				gui.add( afterimagePass.uniforms[ 'damp' ], 'value', 0, 1 ).step( 0.001 );
				gui.add( params, 'enable' );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );
				composer.setSize( window.innerWidth, window.innerHeight );

			}

			function render() {

				mesh.rotation.x += 0.005;
				mesh.rotation.y += 0.01;

				if ( params.enable ) {

					composer.render();

				} else {

					renderer.render( scene, camera );

				}

			}

			function animate() {

				requestId = requestAnimationFrame(animate);
				render();

			}

}
})