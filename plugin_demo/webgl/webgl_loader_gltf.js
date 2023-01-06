// webgl/webgl_loader_gltf.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
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
onLoad() {
    document.createElementAsync("canvas", "webgl").then(canvas=>this.run(canvas).then())
},
async run(canvas3d){
this.canvas = canvas3d
var that = this

        let camera, scene, renderer;

			init();
			render();

			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
				camera.position.set( - 1.8, 0.6, 2.7 );

				scene = new THREE.Scene();

				new RGBELoader()
					.setPath( 'textures/equirectangular/' )
					.load( 'royal_esplanade_1k.hdr', function ( texture ) {
   
						texture.mapping = THREE.EquirectangularReflectionMapping;

						scene.background = texture;
						scene.environment = texture;

						render();

						// model
						const loader = new GLTFLoader().setPath( 'models/gltf/DamagedHelmet/glTF/' );
						loader.load( 'DamagedHelmet.gltf', function ( gltf ) {


							scene.add( gltf.scene );

							render();

						} );

					} );

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true,      } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 1;
				renderer.outputEncoding = THREE.sRGBEncoding;
				container.appendChild( renderer.domElement );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.minDistance = 2;
				controls.maxDistance = 10;
				controls.target.set( 0, 0, - 0.2 );
				controls.update();

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