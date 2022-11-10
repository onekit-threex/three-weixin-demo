// webgl_postprocessing/webgl_postprocessing_smaa.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import Stats from './jsm/libs/stats.module.js';

import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { SMAAPass } from './jsm/postprocessing/SMAAPass.js';
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
let camera, scene, renderer, composer, stats,canvas;

			init();
			animate();

			function init() {

				const container = document.getElementById( 'container' );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 300;

				scene = new THREE.Scene();

				const geometry = new THREE.BoxGeometry( 120, 120, 120 );
				const material1 = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );

				const mesh1 = new THREE.Mesh( geometry, material1 );
				mesh1.position.x = - 100;
				scene.add( mesh1 );

				const texture = new THREE.TextureLoader( ).load( 'textures/brick_diffuse.jpg' );
				texture.anisotropy = 4;

				const material2 = new THREE.MeshBasicMaterial( { map: texture } );

				const mesh2 = new THREE.Mesh( geometry, material2 );
				mesh2.position.x = 100;
				scene.add( mesh2 );

				// postprocessing

				composer = new EffectComposer( renderer );
				composer.addPass( new RenderPass( scene, camera ) );

				const pass = new SMAAPass( window.innerWidth * renderer.getPixelRatio(), window.innerHeight * renderer.getPixelRatio() ,canvas);
				composer.addPass( pass );

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

				for ( let i = 0; i < scene.children.length; i ++ ) {

					const child = scene.children[ i ];

					child.rotation.x += 0.005;
					child.rotation.y += 0.01;

				}

				composer.render();

				stats.end();

			}
}
})