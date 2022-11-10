// webgl/webgl_loader_gltf_iridescence.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { RGBELoader } from './jsm/loaders/RGBELoader.js';
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

        let renderer, scene, camera, controls;

			init().catch( function ( err ) {

				console.error( err );

			} );

			async function init() {

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				document.body.appendChild( renderer.domElement );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.25, 20 );
				camera.position.set( 0.35, 0.05, 0.35 );

				controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render );
				controls.target.set( 0, 0.2, 0 );
				controls.update();

				const rgbeLoader = new RGBELoader()
					.setPath( 'textures/equirectangular/' );

				const gltfLoader = new GLTFLoader().setPath( 'models/gltf/' );

				const [ texture, gltf ] = await Promise.all( [
					rgbeLoader.loadAsync( 'venice_sunset_1k.hdr' ),
					gltfLoader.loadAsync( 'IridescenceLamp.glb' ),
				] );

				// environment

				texture.mapping = THREE.EquirectangularReflectionMapping;

				scene.background = texture;
				scene.environment = texture;

				// model

				scene.add( gltf.scene );

				render();

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;

				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}
    }
})