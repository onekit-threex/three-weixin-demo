// webgl_postprocessing/webgl_postprocessing_glitch.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { GlitchPass } from './jsm/postprocessing/GlitchPass.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';

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
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
let camera, scene, renderer, composer;
			let object, light;

			let glitchPass;

			const button = document.querySelector( '#startButton' );
		//	button.addEventListener( 'click', function () {

				const overlay = document.getElementById( 'overlay' );
				overlay.remove();

				init();
				animate();

		//	} );

			function updateOptions() {

				const wildGlitch = document.getElementById( 'wildGlitch' );
				glitchPass.goWild = wildGlitch.checked;

			}

			function init() {

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 400;

				scene = new THREE.Scene();
				scene.fog = new THREE.Fog( 0x000000, 1, 1000 );

				object = new THREE.Object3D();
				scene.add( object );

				const geometry = new THREE.SphereGeometry( 1, 4, 4 );

				for ( let i = 0; i < 100; i ++ ) {

					const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), flatShading: true } );

					const mesh = new THREE.Mesh( geometry, material );
					mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
					mesh.position.multiplyScalar( Math.random() * 400 );
					mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
					mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
					object.add( mesh );

				}

				scene.add( new THREE.AmbientLight( 0x222222 ) );

				light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 1, 1, 1 );
				scene.add( light );

				// postprocessing

				composer = new EffectComposer( renderer );
				composer.addPass( new RenderPass( scene, camera ) );

				glitchPass = new GlitchPass();
				composer.addPass( glitchPass );


				//

				window.addEventListener( 'resize', onWindowResize );

				const wildGlitchOption = document.getElementById( 'wildGlitch' );
				wildGlitchOption.addEventListener( 'change', updateOptions );

				updateOptions();

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );
				composer.setSize( window.innerWidth, window.innerHeight );


			}

			function animate() {

				requestId = requestAnimationFrame(animate);

				object.rotation.x += 0.005;
				object.rotation.y += 0.01;

				composer.render();

			}
}
})