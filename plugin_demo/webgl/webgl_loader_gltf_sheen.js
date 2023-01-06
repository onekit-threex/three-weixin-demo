// webgl/webgl_loader_gltf_sheen.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from './jsm/environments/RoomEnvironment.js';

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
onLoad() {
    document.createElementAsync("canvas", "webgl").then(canvas=>this.run(canvas).then())
},
async run(canvas3d){
this.canvas = canvas3d
var that = this

        
			let camera, scene, renderer, controls;

			init();
			animate();

			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 20 );
				camera.position.set( - 0.75, 0.7, 1.25 );

				scene = new THREE.Scene();

				// model

				new GLTFLoader()
					.setPath( 'models/gltf/' )
					.load( 'SheenChair.glb', function ( gltf ) {

						scene.add( gltf.scene );

						const object = gltf.scene.getObjectByName( 'SheenChair_fabric' );

						const gui = new GUI();

						gui.add( object.material, 'sheen', 0, 1 );
						gui.open();

					} );

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 1;
				renderer.outputEncoding = THREE.sRGBEncoding;
				container.appendChild( renderer.domElement );

				const environment = new RoomEnvironment();
				const pmremGenerator = new THREE.PMREMGenerator( renderer );

				scene.background = new THREE.Color( 0xbbbbbb );
				scene.environment = pmremGenerator.fromScene( environment ).texture;

				controls = new OrbitControls( camera, renderer.domElement );
				controls.enableDamping = true;
				controls.minDistance = 1;
				controls.maxDistance = 10;
				controls.target.set( 0, 0.35, 0 );
				controls.update();

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestId = requestAnimationFrame(animate);

				controls.update(); // required if damping enabled

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}

    }
})