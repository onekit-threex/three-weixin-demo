// webgl/webgl_loader_lwo.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls.js';
import { LWOLoader } from './jsm/loaders/LWOLoader.js';

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

			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 200 );
				camera.position.set( - 0.7, 14.6, 43.2 );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xa0a0a0 );

				const ambientLight = new THREE.AmbientLight( 0x222222 );
				scene.add( ambientLight );

				const light1 = new THREE.DirectionalLight( 0x888888 );
				light1.position.set( 0, 200, 100 );
				scene.add( light1 );

				const grid = new THREE.GridHelper( 200, 20, 0x000000, 0x000000 );
				grid.material.opacity = 0.3;
				grid.material.transparent = true;
				scene.add( grid );

				const loader = new LWOLoader();
				loader.load( 'models/lwo/Objects/LWO3/Demo.lwo', function ( object ) {

					const phong = object.meshes[ 0 ];
					phong.position.set( - 2, 12, 0 );

					const standard = object.meshes[ 1 ];
					standard.position.set( 2, 12, 0 );

					const rocket = object.meshes[ 2 ];
					rocket.position.set( 0, 10.5, - 1 );

					scene.add( phong, standard, rocket );

				} );

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setAnimationLoop( animation );
				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				container.appendChild( renderer.domElement );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.target.set( 1.33, 10, - 6.7 );
				controls.update();

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animation() {

				renderer.render( scene, camera );

			}

    }
})