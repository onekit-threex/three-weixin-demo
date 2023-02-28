// webgl/webgl_materials_car.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,performance,Event,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';

import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from './jsm/loaders/DRACOLoader.js';
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
			let stats;

			let grid;
			let controls;

			const wheels = [];

			var init=()=> {

				const container = document.getElementById( 'container' );

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setAnimationLoop( render );
				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 0.85;
				container.appendChild( renderer.domElement );

				window.addEventListener( 'resize', onWindowResize );

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 100 );
				camera.position.set( 4.25, 1.4, - 4.5 );

				controls = new OrbitControls( camera, container );
				controls.enableDamping = true;
				controls.maxDistance = 9;
				controls.target.set( 0, 0.5, 0 );
				controls.update();

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x333333 );
				scene.environment = new RGBELoader().load( 'textures/equirectangular/venice_sunset_1k.hdr' );
				scene.environment.mapping = THREE.EquirectangularReflectionMapping;
				scene.fog = new THREE.Fog( 0x333333, 10, 15 );
				//////////////////////
				var spotLight = new THREE.SpotLight(0xffffff, 1) //聚光灯
				spotLight.position.set(0, 0, 10)
				spotLight.lookAt(scene.position)
				scene.add(spotLight)
				//   
				
				var directionalLight = new THREE.DirectionalLight(0xffffff, 1) //方向光
				directionalLight.position.set(0, 0, 10)
				directionalLight.lookAt(scene.position)
				scene.add(directionalLight)
				////////////////////////////

				grid = new THREE.GridHelper( 20, 40, 0xffffff, 0xffffff );
				grid.material.opacity = 0.2;
				grid.material.depthWrite = false;
				grid.material.transparent = true;
				scene.add( grid );

				// materials

				const bodyMaterial = new THREE.MeshPhysicalMaterial( {
					color: 0xff0000, metalness: 1.0, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03, sheen: 0.5
				} );

				const detailsMaterial = new THREE.MeshStandardMaterial( {
					color: 0xffffff, metalness: 1.0, roughness: 0.5
				} );

				const glassMaterial = new THREE.MeshPhysicalMaterial( {
					color: 0xffffff, metalness: 0.25, roughness: 0, transmission: 1.0
				} );

				const bodyColorInput = document.getElementById( 'body-color' );
				bodyColorInput.addEventListener( 'input', function () {

					bodyMaterial.color.set( this.value );

				} );

				const detailsColorInput = document.getElementById( 'details-color' );
				detailsColorInput.addEventListener( 'input', function () {

					detailsMaterial.color.set( this.value );

				} );

				const glassColorInput = document.getElementById( 'glass-color' );
				glassColorInput.addEventListener( 'input', function () {

					glassMaterial.color.set( this.value );

				} );

				// Car

				const shadow = new THREE.TextureLoader( ).load( 'models/gltf/ferrari_ao.png' );

				const dracoLoader = this.dracoLoader=new DRACOLoader();
				dracoLoader.setDecoderPath( 'js/libs/draco/gltf/' );

				const loader = new GLTFLoader();
				loader.setDRACOLoader( dracoLoader );

				loader.load( 'models/gltf/ferrari.glb', function ( gltf ) {

					const carModel = gltf.scene.children[ 0 ];

					carModel.getObjectByName( 'body' ).material = bodyMaterial;

					carModel.getObjectByName( 'rim_fl' ).material = detailsMaterial;
					carModel.getObjectByName( 'rim_fr' ).material = detailsMaterial;
					carModel.getObjectByName( 'rim_rr' ).material = detailsMaterial;
					carModel.getObjectByName( 'rim_rl' ).material = detailsMaterial;
					carModel.getObjectByName( 'trim' ).material = detailsMaterial;

					carModel.getObjectByName( 'glass' ).material = glassMaterial;

					wheels.push(
						carModel.getObjectByName( 'wheel_fl' ),
						carModel.getObjectByName( 'wheel_fr' ),
						carModel.getObjectByName( 'wheel_rl' ),
						carModel.getObjectByName( 'wheel_rr' )
					);

					// shadow
					const mesh = new THREE.Mesh(
						new THREE.PlaneGeometry( 0.655 * 4, 1.3 * 4 ),
						new THREE.MeshBasicMaterial( {
							map: shadow, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
						} )
					);
					mesh.rotation.x = - Math.PI / 2;
					mesh.renderOrder = 2;
					carModel.add( mesh );

					scene.add( carModel );

				} );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function render() {
				controls.update();

				const time = - performance.now() / 1000;

				for ( let i = 0; i < wheels.length; i ++ ) {

					wheels[ i ].rotation.x = time * Math.PI * 2;

				}

				grid.position.z = - ( time ) % 1;

				renderer.render( scene, camera );

				//stats.update();

			}

			init();

    }
})