// webgl/webgl_loader_texture_tga.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls0.js';
import { TGALoader } from './jsm/loaders/TGALoader.js';

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
onLoad() {
    document.createElementAsync("canvas", "webgl").then(canvas=>this.run(canvas).then())
},
async run(canvas3d){
this.canvas = canvas3d
var that = this

        let camera, scene, renderer, stats;

			init();
			animate();

			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
				camera.position.set( 0, 50, 250 );

				scene = new THREE.Scene();

				//

				const loader = new TGALoader();
				const geometry = new THREE.BoxGeometry( 50, 50, 50 );

				// add box 1 - grey8 texture

				const texture1 = loader.load( 'textures/crate_grey8.tga' );
				const material1 = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture1 } );

				const mesh1 = new THREE.Mesh( geometry, material1 );
				mesh1.position.x = - 50;

				scene.add( mesh1 );

				// add box 2 - tga texture

				const texture2 = loader.load( 'textures/crate_color8.tga' );
				const material2 = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture2 } );

				const mesh2 = new THREE.Mesh( geometry, material2 );
				mesh2.position.x = 50;

				scene.add( mesh2 );

				//

				const ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
				scene.add( ambientLight );

				const light = new THREE.DirectionalLight( 0xffffff, 1 );
				light.position.set( 1, 1, 1 );
				scene.add( light );

				//

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.enableZoom = false;

				//

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}


			function animate() {

				requestId = requestAnimationFrame(animate);

				render();
			//	stats.update();

			}

			function render() {

				renderer.render( scene, camera );

			}

    }
})