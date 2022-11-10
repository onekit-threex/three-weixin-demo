// webgl/webgl_materials_physical_reflectivity.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';

import { GUI } from './jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
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

        let container, stats;
			const params = {
				projection: 'normal',
				autoRotate: true,
				reflectivity: 1,
				background: false,
				exposure: 1,
				gemColor: 'Green'
			};
			let camera, scene, renderer;
			let gemBackMaterial, gemFrontMaterial;

			const objects = [];

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 0.0, - 10, 20 * 3.5 );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x000000 );

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );

				gemBackMaterial = new THREE.MeshPhysicalMaterial( {
					map: null,
					color: 0x0000ff,
					metalness: 1,
					roughness: 0,
					opacity: 0.5,
					side: THREE.BackSide,
					transparent: true,
					envMapIntensity: 5,
					premultipliedAlpha: true
					// TODO: Add custom blend mode that modulates background color by this materials color.
				} );

				gemFrontMaterial = new THREE.MeshPhysicalMaterial( {
					map: null,
					color: 0x0000ff,
					metalness: 0,
					roughness: 0,
					opacity: 0.25,
					side: THREE.FrontSide,
					transparent: true,
					envMapIntensity: 10,
					premultipliedAlpha: true
				} );

				const loader = new OBJLoader();
				loader.load( 'models/obj/emerald.obj', function ( object ) {

					object.traverse( function ( child ) {

						if ( child instanceof THREE.Mesh ) {

							child.material = gemBackMaterial;
							const second = child.clone();
							second.material = gemFrontMaterial;

							const parent = new THREE.Group();
							parent.add( second );
							parent.add( child );
							scene.add( parent );

							objects.push( parent );

						}

					} );


				} );

				new RGBELoader()
					.setPath( 'textures/equirectangular/' )
					.load( 'royal_esplanade_1k.hdr', function ( texture ) {

						texture.mapping = THREE.EquirectangularReflectionMapping;

						gemFrontMaterial.envMap = gemBackMaterial.envMap = texture;
						gemFrontMaterial.needsUpdate = gemBackMaterial.needsUpdate = true;

					} );

				// Lights

				scene.add( new THREE.AmbientLight( 0x222222 ) );

				const pointLight1 = new THREE.PointLight( 0xffffff );
				pointLight1.position.set( 150, 10, 0 );
				pointLight1.castShadow = false;
				scene.add( pointLight1 );

				const pointLight2 = new THREE.PointLight( 0xffffff );
				pointLight2.position.set( - 150, 0, 0 );
				scene.add( pointLight2 );

				const pointLight3 = new THREE.PointLight( 0xffffff );
				pointLight3.position.set( 0, - 10, - 150 );
				scene.add( pointLight3 );

				const pointLight4 = new THREE.PointLight( 0xffffff );
				pointLight4.position.set( 0, 0, 150 );
				scene.add( pointLight4 );

				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.shadowMap.enabled = true;
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				container.appendChild( renderer.domElement );

				renderer.outputEncoding = THREE.sRGBEncoding;

				stats = new Stats();
				container.appendChild( stats.dom );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 20;
				controls.maxDistance = 200;

				window.addEventListener( 'resize', onWindowResize );

				const gui = new GUI();

				gui.add( params, 'reflectivity', 0, 1 );
				gui.add( params, 'exposure', 0, 2 );
				gui.add( params, 'autoRotate' );
				gui.add( params, 'gemColor', [ 'Blue', 'Green', 'Red', 'White', 'Black' ] );
				gui.open();

			}

			function onWindowResize() {

				const width = window.innerWidth;
				const height = window.innerHeight;

				camera.aspect = width / height;
				camera.updateProjectionMatrix();

				renderer.setSize( width, height );

			}

			//

			function animate() {

				requestId = requestAnimationFrame(animate);

				stats.begin();
				render();
				stats.end();

			}

			function render() {

				if ( gemBackMaterial !== undefined && gemFrontMaterial !== undefined ) {

					gemFrontMaterial.reflectivity = gemBackMaterial.reflectivity = params.reflectivity;

					let newColor = gemBackMaterial.color;
					switch ( params.gemColor ) {

						case 'Blue': newColor = new THREE.Color( 0x000088 ); break;
						case 'Red': newColor = new THREE.Color( 0x880000 ); break;
						case 'Green': newColor = new THREE.Color( 0x008800 ); break;
						case 'White': newColor = new THREE.Color( 0x888888 ); break;
						case 'Black': newColor = new THREE.Color( 0x0f0f0f ); break;

					}

					gemBackMaterial.color = gemFrontMaterial.color = newColor;

				}

				renderer.toneMappingExposure = params.exposure;

				camera.lookAt( scene.position );

				if ( params.autoRotate ) {

					for ( let i = 0, l = objects.length; i < l; i ++ ) {

						const object = objects[ i ];
						object.rotation.y += 0.005;

					}

				}

				renderer.render( scene, camera );

			}
    }
})