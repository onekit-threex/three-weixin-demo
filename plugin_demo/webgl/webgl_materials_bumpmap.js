// webgl/webgl_materials_bumpmap.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';

import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
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

        
			const statsEnabled = true;

			let container, stats, loader;

			let camera, scene, renderer;

			let mesh;

			let spotLight;

			let mouseX = 0;
			let mouseY = 0;

			let targetX = 0;
			let targetY = 0;

			const windowHalfX = window.innerWidth / 2;
			const windowHalfY = window.innerHeight / 2;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				//

				camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 1200;

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x060708 );

				// LIGHTS

				scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );

				spotLight = new THREE.SpotLight( 0xffffbb, 2 );
				spotLight.position.set( 0.5, 0, 1 );
				spotLight.position.multiplyScalar( 700 );
				scene.add( spotLight );

				spotLight.castShadow = true;

				spotLight.shadow.mapSize.width = 2048;
				spotLight.shadow.mapSize.height = 2048;

				spotLight.shadow.camera.near = 200;
				spotLight.shadow.camera.far = 1500;

				spotLight.shadow.camera.fov = 40;

				spotLight.shadow.bias = - 0.005;

				//

				const mapHeight = new THREE.TextureLoader( ).load( 'models/gltf/LeePerrySmith/Infinite-Level_02_Disp_NoSmoothUV-4096.jpg' );

				const material = new THREE.MeshPhongMaterial( {
					color: 0x552811,
					specular: 0x222222,
					shininess: 25,
					bumpMap: mapHeight,
					bumpScale: 12
				} );

				loader = new GLTFLoader();
				loader.load( 'models/gltf/LeePerrySmith/LeePerrySmith.glb', function ( gltf ) {

					createScene( gltf.scene.children[ 0 ].geometry, 100, material );

				} );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				renderer.shadowMap.enabled = true;
				renderer.outputEncoding = THREE.sRGBEncoding;

				//

				if ( statsEnabled ) {

					stats = new Stats();
					container.appendChild( stats.dom );

				}

				// EVENTS

				document.addEventListener( 'mousemove', onDocumentMouseMove );
				window.addEventListener( 'resize', onWindowResize );

			}

			function createScene( geometry, scale, material ) {

				mesh = new THREE.Mesh( geometry, material );

				mesh.position.y = - 50;
				mesh.scale.set( scale, scale, scale );

				mesh.castShadow = true;
				mesh.receiveShadow = true;

				scene.add( mesh );

			}

			//

			function onWindowResize() {

				renderer.setSize( window.innerWidth, window.innerHeight );

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX );
				mouseY = ( event.clientY - windowHalfY );

			}

			//

			function animate() {

				requestId = requestAnimationFrame(animate);

				render();
				if ( statsEnabled ) stats.update();

			}

			function render() {

				targetX = mouseX * .001;
				targetY = mouseY * .001;

				if ( mesh ) {

					mesh.rotation.y += 0.05 * ( targetX - mesh.rotation.y );
					mesh.rotation.x += 0.05 * ( targetY - mesh.rotation.x );

				}

				renderer.render( scene, camera );

			}
    }
})