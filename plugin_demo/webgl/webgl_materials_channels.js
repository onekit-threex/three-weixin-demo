// webgl/webgl_materials_channels.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';

import { GUI } from './jsm/libs/lil-gui.module.min.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
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

        let stats;

			let camera, scene, renderer;

			const params = {
				material: 'normal',
				camera: 'perspective',
				side: 'double'
			};

			const sides = {
				'front': THREE.FrontSide,
				'back': THREE.BackSide,
				'double': THREE.DoubleSide
			};

			let cameraOrtho, cameraPerspective;
			let controlsOrtho, controlsPerspective;

			let mesh, materialStandard, materialDepthBasic, materialDepthRGBA, materialNormal;

			const SCALE = 2.436143; // from original model
			const BIAS = - 0.428408; // from original model

			init();
			animate();
			initGui();

			// Init gui
			function initGui() {

				const gui = new GUI();
				gui.add( params, 'material', [ 'standard', 'normal', 'depthBasic', 'depthRGBA' ] );
				gui.add( params, 'camera', [ 'perspective', 'ortho' ] );
				gui.add( params, 'side', [ 'front', 'back', 'double' ] );

			}

			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//

				scene = new THREE.Scene();

				const aspect = window.innerWidth / window.innerHeight;
				cameraPerspective = new THREE.PerspectiveCamera( 45, aspect, 500, 3000 );
				cameraPerspective.position.z = 1500;
				scene.add( cameraPerspective );

				const height = 500;
				cameraOrtho = new THREE.OrthographicCamera( - height * aspect, height * aspect, height, - height, 1000, 2500 );
				cameraOrtho.position.z = 1500;
				scene.add( cameraOrtho );

				camera = cameraPerspective;

				controlsPerspective = new OrbitControls( cameraPerspective, renderer.domElement );
				controlsPerspective.minDistance = 1000;
				controlsPerspective.maxDistance = 2400;
				controlsPerspective.enablePan = false;
				controlsPerspective.enableDamping = true;

				controlsOrtho = new OrbitControls( cameraOrtho, renderer.domElement );
				controlsOrtho.minZoom = 0.5;
				controlsOrtho.maxZoom = 1.5;
				controlsOrtho.enablePan = false;
				controlsOrtho.enableDamping = true;

				// lights

				const ambientLight = new THREE.AmbientLight( 0xffffff, 0.1 );
				scene.add( ambientLight );

				const pointLight = new THREE.PointLight( 0xff0000, 0.5 );
				pointLight.position.z = 2500;
				scene.add( pointLight );

				const pointLight2 = new THREE.PointLight( 0xff6666, 1 );
				camera.add( pointLight2 );

				const pointLight3 = new THREE.PointLight( 0x0000ff, 0.5 );
				pointLight3.position.x = - 1000;
				pointLight3.position.z = 1000;
				scene.add( pointLight3 );

				// textures

				const textureLoader = new THREE.TextureLoader( );
				const normalMap = textureLoader.load( 'models/obj/ninja/normal.png' );
				const aoMap = textureLoader.load( 'models/obj/ninja/ao.jpg' );
				const displacementMap = textureLoader.load( 'models/obj/ninja/displacement.jpg' );

				// material

				materialStandard = new THREE.MeshStandardMaterial( {
					color: 0xffffff,

					metalness: 0.5,
					roughness: 0.6,

					displacementMap: displacementMap,
					displacementScale: SCALE,
					displacementBias: BIAS,

					aoMap: aoMap,

					normalMap: normalMap,
					normalScale: new THREE.Vector2( 1, - 1 ),

					//flatShading: true,

					side: THREE.DoubleSide
				} );

				materialDepthBasic = new THREE.MeshDepthMaterial( {
					depthPacking: THREE.BasicDepthPacking,

					displacementMap: displacementMap,
					displacementScale: SCALE,
					displacementBias: BIAS,

					side: THREE.DoubleSide
				} );

				materialDepthRGBA = new THREE.MeshDepthMaterial( {
					depthPacking: THREE.RGBADepthPacking,

					displacementMap: displacementMap,
					displacementScale: SCALE,
					displacementBias: BIAS,

					side: THREE.DoubleSide
				} );

				materialNormal = new THREE.MeshNormalMaterial( {
					displacementMap: displacementMap,
					displacementScale: SCALE,
					displacementBias: BIAS,

					normalMap: normalMap,
					normalScale: new THREE.Vector2( 1, - 1 ),

					//flatShading: true,

					side: THREE.DoubleSide
				} );

				//

				const loader = new OBJLoader();
				loader.load( 'models/obj/ninja/ninjaHead_Low.obj', function ( group ) {

					const geometry = group.children[ 0 ].geometry;
					geometry.attributes.uv2 = geometry.attributes.uv;
					geometry.center();

					mesh = new THREE.Mesh( geometry, materialNormal );
					mesh.scale.multiplyScalar( 25 );
					scene.add( mesh );

				} );


				//

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				const width = window.innerWidth;
				const height = window.innerHeight;
				const aspect = window.innerWidth / window.innerHeight;

				camera.aspect = aspect;

				camera.left = - height * aspect;
				camera.right = height * aspect;
				camera.top = height;
				camera.bottom = - height;

				camera.updateProjectionMatrix();

				renderer.setSize( width, height );

			}

			//

			function animate() {

				requestId = requestAnimationFrame(animate);

				//stats.begin();
				render();
			//	stats.end();

			}

			function render() {

				if ( mesh ) {

					let material = mesh.material;

					switch ( params.material ) {

						case 'standard': material = materialStandard; break;
						case 'depthBasic': material = materialDepthBasic; break;
						case 'depthRGBA': material = materialDepthRGBA; break;
						case 'normal': material = materialNormal; break;

					}

					if ( sides[ params.side ] !== material.side ) {

						switch ( params.side ) {

							case 'front': material.side = THREE.FrontSide; break;
							case 'back': material.side = THREE.BackSide; break;
							case 'double': material.side = THREE.DoubleSide; break;

						}

						material.needsUpdate = true;

					}

					mesh.material = material;

				}

				switch ( params.camera ) {

					case 'perspective':
						camera = cameraPerspective;
						break;
					case 'ortho':
						camera = cameraOrtho;
						break;

				}

				controlsPerspective.update();
				controlsOrtho.update(); // must update both controls for damping to complete

				renderer.render( scene, camera );

			}

    }
})