// webgl/webgl_loader_vrml.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls0.js';
import { VRMLLoader } from './jsm/loaders/VRMLLoader.js';
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

        
			let camera, scene, renderer, stats, controls, loader;

			const params = {
				asset: 'house'
			};

			const assets = [
				'creaseAngle',
				'crystal',
				'house',
				'elevationGrid1',
				'elevationGrid2',
				'extrusion1',
				'extrusion2',
				'extrusion3',
				'lines',
				'meshWithLines',
				'meshWithTexture',
				'pixelTexture',
				'points',
			];

			let vrmlScene;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1e10 );
				camera.position.set( - 10, 5, 10 );

				scene = new THREE.Scene();
				scene.add( camera );

				// light

				const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x000000, 1 );
				scene.add( hemiLight );

				const dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
				dirLight.position.set( 200, 200, 200 );
				scene.add( dirLight );

				loader = new VRMLLoader();
				loadAsset( params.asset );

				// renderer

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				// controls

				controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 1;
				controls.maxDistance = 200;
				controls.enableDamping = true;

				//

				stats = new Stats();
				document.body.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize );

				//

				const gui = new GUI();
				gui.add( params, 'asset', assets ).onChange( function ( value ) {

					if ( vrmlScene ) {

						vrmlScene.traverse( function ( object ) {

							if ( object.material ) object.material.dispose();
							if ( object.material && object.material.map ) object.material.map.dispose();
							if ( object.geometry ) object.geometry.dispose();

						} );

						scene.remove( vrmlScene );

					}

					loadAsset( value );

				} );

			}

			function loadAsset( asset ) {

				loader.load( 'models/vrml/' + asset + '.wrl', function ( object ) {

					vrmlScene = object;
					scene.add( object );
					controls.reset();

				} );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestId = requestAnimationFrame(animate);

				controls.update(); // to support damping

				renderer.render( scene, camera );

				//stats.update();

			}

    }
})