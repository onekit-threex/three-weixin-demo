// webgl/webgl_materials_normalmap.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';

import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './jsm/postprocessing/ShaderPass.js';
import { BleachBypassShader } from './jsm/shaders/BleachBypassShader.js';
import { ColorCorrectionShader } from './jsm/shaders/ColorCorrectionShader.js';
import { FXAAShader } from './jsm/shaders/FXAAShader.js';
import { GammaCorrectionShader } from './jsm/shaders/GammaCorrectionShader.js';

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

        
			let container, stats, loader;

			let camera, scene, renderer;

			let mesh;

			let directionalLight, pointLight, ambientLight;

			let mouseX = 0;
			let mouseY = 0;

			let targetX = 0;
			let targetY = 0;

			const windowHalfX = window.innerWidth / 2;
			const windowHalfY = window.innerHeight / 2;

			let composer, effectFXAA;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 1200;

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x111111 );

				// LIGHTS

				ambientLight = new THREE.AmbientLight( 0x444444 );
				scene.add( ambientLight );

				pointLight = new THREE.PointLight( 0xffffff, 1.25, 1000 );
				pointLight.position.set( 0, 0, 600 );

				scene.add( pointLight );

				directionalLight = new THREE.DirectionalLight( 0xffffff );
				directionalLight.position.set( 1, - 0.5, - 1 );
				scene.add( directionalLight );

				const textureLoader = new THREE.TextureLoader( );

				const diffuseMap = textureLoader.load( 'models/gltf/LeePerrySmith/Map-COL.jpg' );
				diffuseMap.encoding = THREE.sRGBEncoding;

				const specularMap = textureLoader.load( 'models/gltf/LeePerrySmith/Map-SPEC.jpg' );
				specularMap.encoding = THREE.sRGBEncoding;

				const normalMap = textureLoader.load( 'models/gltf/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg' );

				const material = new THREE.MeshPhongMaterial( {
					color: 0xdddddd,
					specular: 0x222222,
					shininess: 35,
					map: diffuseMap,
					specularMap: specularMap,
					normalMap: normalMap,
					normalScale: new THREE.Vector2( 0.8, 0.8 )
				} );

				loader = new GLTFLoader();
				loader.load( 'models/gltf/LeePerrySmith/LeePerrySmith.glb', function ( gltf ) {

					createScene( gltf.scene.children[ 0 ].geometry, 100, material );

				} );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//

				stats = new Stats();
				container.appendChild( stats.dom );


				// COMPOSER

				renderer.autoClear = false;

				const renderModel = new RenderPass( scene, camera );

				const effectBleach = new ShaderPass( BleachBypassShader );
				const effectColor = new ShaderPass( ColorCorrectionShader );
				effectFXAA = new ShaderPass( FXAAShader );
				const gammaCorrection = new ShaderPass( GammaCorrectionShader );

				effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );

				effectBleach.uniforms[ 'opacity' ].value = 0.2;

				effectColor.uniforms[ 'powRGB' ].value.set( 1.4, 1.45, 1.45 );
				effectColor.uniforms[ 'mulRGB' ].value.set( 1.1, 1.1, 1.1 );

				composer = new EffectComposer( renderer );

				composer.addPass( renderModel );
				composer.addPass( effectFXAA );
				composer.addPass( effectBleach );
				composer.addPass( effectColor );
				composer.addPass( gammaCorrection );

				// EVENTS

				document.addEventListener( 'mousemove', onDocumentMouseMove );
				window.addEventListener( 'resize', onWindowResize );

			}

			function createScene( geometry, scale, material ) {

				mesh = new THREE.Mesh( geometry, material );

				mesh.position.y = - 50;
				mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;

				scene.add( mesh );

			}

			//

			function onWindowResize() {

				const width = window.innerWidth;
				const height = window.innerHeight;

				camera.aspect = width / height;
				camera.updateProjectionMatrix();

				renderer.setSize( width, height );
				composer.setSize( width, height );

				effectFXAA.uniforms[ 'resolution' ].value.set( 1 / width, 1 / height );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX );
				mouseY = ( event.clientY - windowHalfY );

			}

			//

			function animate() {

				requestId = requestAnimationFrame(animate);

				render();

				stats.update();

			}

			function render() {

				targetX = mouseX * .001;
				targetY = mouseY * .001;

				if ( mesh ) {

					mesh.rotation.y += 0.05 * ( targetX - mesh.rotation.y );
					mesh.rotation.x += 0.05 * ( targetY - mesh.rotation.x );

				}

				composer.render();

			}
    }
})