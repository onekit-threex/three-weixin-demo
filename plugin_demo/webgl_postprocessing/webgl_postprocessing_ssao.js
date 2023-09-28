// webgl_postprocessing/webgl_postprocessing_ssao.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import Stats from './jsm/libs/stats.module.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';

import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { SSAOPass } from './jsm/postprocessing/SSAOPass.js';


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
let container, stats;
			let camera, scene, renderer;
			let composer;
			let group;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 100, 700 );
				camera.position.z = 500;

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xaaaaaa );

				scene.add( new THREE.DirectionalLight() );
				scene.add( new THREE.HemisphereLight() );

				group = new THREE.Group();
				scene.add( group );

				const geometry = new THREE.BoxGeometry( 10, 10, 10 );

				for ( let i = 0; i < 100; i ++ ) {

					const material = new THREE.MeshLambertMaterial( {
						color: Math.random() * 0xffffff
					} );

					const mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = Math.random() * 400 - 200;
					mesh.position.y = Math.random() * 400 - 200;
					mesh.position.z = Math.random() * 400 - 200;
					mesh.rotation.x = Math.random();
					mesh.rotation.y = Math.random();
					mesh.rotation.z = Math.random();

					mesh.scale.setScalar( Math.random() * 10 + 2 );
					group.add( mesh );

				}

				stats = new Stats();
				container.appendChild( stats.dom );

				const width = window.innerWidth;
				const height = window.innerHeight;

				composer = new EffectComposer( renderer );

				const ssaoPass = new SSAOPass( scene, camera, width, height );
				ssaoPass.kernelRadius = 16;
				composer.addPass( ssaoPass );

				// Init gui
				const gui = new GUI();

				gui.add( ssaoPass, 'output', {
					'Default': SSAOPass.OUTPUT.Default,
					'SSAO Only': SSAOPass.OUTPUT.SSAO,
					'SSAO Only + Blur': SSAOPass.OUTPUT.Blur,
					'Beauty': SSAOPass.OUTPUT.Beauty,
					'Depth': SSAOPass.OUTPUT.Depth,
					'Normal': SSAOPass.OUTPUT.Normal
				} ).onChange( function ( value ) {

					ssaoPass.output = parseInt( value );

				} );
				gui.add( ssaoPass, 'kernelRadius' ).min( 0 ).max( 32 );
				gui.add( ssaoPass, 'minDistance' ).min( 0.001 ).max( 0.02 );
				gui.add( ssaoPass, 'maxDistance' ).min( 0.01 ).max( 0.3 );

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				const width = window.innerWidth;
				const height = window.innerHeight;

				camera.aspect = width / height;
				camera.updateProjectionMatrix();

				renderer.setSize( width, height );
				composer.setSize( width, height );

			}

			function animate() {

				requestId = requestAnimationFrame(animate);

				stats.begin();
				render();
				stats.end();

			}

			function render() {

				const timer = performance.now();
				group.rotation.x = timer * 0.0002;
				group.rotation.y = timer * 0.0001;

				composer.render();

			}


}
})