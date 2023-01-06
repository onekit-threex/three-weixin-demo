// webgl/webgl_materials_standard.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';

import { GUI } from './jsm/libs/lil-gui.module.min.js';
import { TrackballControls } from './jsm/controls/TrackballControls.js';
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
onLoad() {
    document.createElementAsync("canvas", "webgl").then(canvas=>this.run(canvas).then())
},
async run(canvas3d){
this.canvas = canvas3d
var that = this

        const statsEnabled = true;

			let container, stats;

			let camera, scene, renderer, controls;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.toneMapping = THREE.ReinhardToneMapping;
				renderer.toneMappingExposure = 3;

				//

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 1000 );
				camera.position.z = 2;

				controls = new TrackballControls( camera, renderer.domElement );

				//

				scene.add( new THREE.HemisphereLight( 0x443333, 0x222233, 4 ) );

				//

				const material = new THREE.MeshStandardMaterial();

				new OBJLoader()
					.setPath( 'models/obj/cerberus/' )
					.load( 'Cerberus.obj', function ( group ) {

						const loader = new THREE.TextureLoader( )
							.setPath( 'models/obj/cerberus/' );

						material.roughness = 1; // attenuates roughnessMap
						material.metalness = 1; // attenuates metalnessMap

						const diffuseMap = loader.load( 'Cerberus_A.jpg' );
						diffuseMap.encoding = THREE.sRGBEncoding;
						material.map = diffuseMap;
						// roughness is in G channel, metalness is in B channel
						material.metalnessMap = material.roughnessMap = loader.load( 'Cerberus_RM.jpg' );
						material.normalMap = loader.load( 'Cerberus_N.jpg' );

						material.map.wrapS = THREE.RepeatWrapping;
						material.roughnessMap.wrapS = THREE.RepeatWrapping;
						material.metalnessMap.wrapS = THREE.RepeatWrapping;
						material.normalMap.wrapS = THREE.RepeatWrapping;

						group.traverse( function ( child ) {

							if ( child.isMesh ) {

								child.material = material;

							}

						} );

						group.position.x = - 0.45;
						group.rotation.y = - Math.PI / 2;
						scene.add( group );

					} );

				const environments = {

					'Venice Sunset': { filename: 'venice_sunset_1k.hdr' },
					'Overpass': { filename: 'pedestrian_overpass_1k.hdr' }

				};

				function loadEnvironment( name ) {

					if ( environments[ name ].texture !== undefined ) {

						scene.background = environments[ name ].texture;
						scene.environment = environments[ name ].texture;
						return;

					}

					const filename = environments[ name ].filename;
					new RGBELoader()
						.setPath( 'textures/equirectangular/' )
						.load( filename, function ( hdrEquirect ) {

							hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;

							scene.background = hdrEquirect;
							scene.environment = hdrEquirect;
							environments[ name ].texture = hdrEquirect;

						} );

				}

				const params = {

					environment: Object.keys( environments )[ 0 ]

				};
				loadEnvironment( params.environment );

				const gui = new GUI();
				gui.add( params, 'environment', Object.keys( environments ) ).onChange( function ( value ) {

					loadEnvironment( value );

				} );
				gui.open();

				//

				if ( statsEnabled ) {

					stats = new Stats();
					container.appendChild( stats.dom );

				}

				window.addEventListener( 'resize', onWindowResize );

			}

			//

			function onWindowResize() {

				renderer.setSize( window.innerWidth, window.innerHeight );

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

			}

			//

			function animate() {

				requestId = requestAnimationFrame(animate);

				controls.update();
				renderer.render( scene, camera );

				if ( statsEnabled ) stats.update();

			}

    }
})