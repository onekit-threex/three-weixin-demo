// webgl_postprocessing/webgl_postprocessing_masking.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from './jsm/postprocessing/ShaderPass.js';
import { TexturePass } from './jsm/postprocessing/TexturePass.js';
import { ClearPass } from './jsm/postprocessing/ClearPass.js';
import { MaskPass, ClearMaskPass } from './jsm/postprocessing/MaskPass.js';
import { CopyShader } from './jsm/shaders/CopyShader.js';

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
let camera, composer, renderer;
			let box, torus;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 10;

				const scene1 = new THREE.Scene();
				const scene2 = new THREE.Scene();

				box = new THREE.Mesh( new THREE.BoxGeometry( 4, 4, 4 ) );
				scene1.add( box );

				torus = new THREE.Mesh( new THREE.TorusGeometry( 3, 1, 16, 32 ) );
				scene2.add( torus );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setClearColor( 0xe0e0e0 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.autoClear = false;
				document.body.appendChild( renderer.domElement );

				//

				const clearPass = new ClearPass();

				const clearMaskPass = new ClearMaskPass();

				const maskPass1 = new MaskPass( scene1, camera );
				const maskPass2 = new MaskPass( scene2, camera );

				const texture1 = new THREE.TextureLoader( ).load( 'textures/758px-Canestra_di_frutta_(Caravaggio).jpg' );
				texture1.minFilter = THREE.LinearFilter;
				const texture2 = new THREE.TextureLoader( ).load( 'textures/2294472375_24a3b8ef46_o.jpg' );

				const texturePass1 = new TexturePass( texture1 );
				const texturePass2 = new TexturePass( texture2 );

				const outputPass = new ShaderPass( CopyShader );

				const parameters = {
					stencilBuffer: true
				};

				const renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, parameters );

				composer = new EffectComposer( renderer, renderTarget );
				composer.addPass( clearPass );
				composer.addPass( maskPass1 );
				composer.addPass( texturePass1 );
				composer.addPass( clearMaskPass );
				composer.addPass( maskPass2 );
				composer.addPass( texturePass2 );
				composer.addPass( clearMaskPass );
				composer.addPass( outputPass );

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

				const time = performance.now() * 0.001 + 6000;

				box.position.x = Math.cos( time / 1.5 ) * 2;
				box.position.y = Math.sin( time ) * 2;
				box.rotation.x = time;
				box.rotation.y = time / 2;

				torus.position.x = Math.cos( time ) * 2;
				torus.position.y = Math.sin( time / 1.5 ) * 2;
				torus.rotation.x = time;
				torus.rotation.y = time / 2;

				renderer.clear();
				composer.render( time );

			}

}
})