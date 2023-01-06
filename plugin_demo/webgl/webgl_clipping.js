import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';

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
        
        
			let camera, scene, renderer, startTime, object, stats;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 36, window.innerWidth / window.innerHeight, 0.25, 16 );

				camera.position.set( 0, 1.3, 3 );

				scene = new THREE.Scene();

				// Lights

				scene.add( new THREE.AmbientLight( 0x505050 ) );

				const spotLight = new THREE.SpotLight( 0xffffff );
				spotLight.angle = Math.PI / 5;
				spotLight.penumbra = 0.2;
				spotLight.position.set( 2, 3, 3 );
				spotLight.castShadow = true;
				spotLight.shadow.camera.near = 3;
				spotLight.shadow.camera.far = 10;
				spotLight.shadow.mapSize.width = 1024;
				spotLight.shadow.mapSize.height = 1024;
				scene.add( spotLight );

				const dirLight = new THREE.DirectionalLight( 0x55505a, 1 );
				dirLight.position.set( 0, 3, 0 );
				dirLight.castShadow = true;
				dirLight.shadow.camera.near = 1;
				dirLight.shadow.camera.far = 10;

				dirLight.shadow.camera.right = 1;
				dirLight.shadow.camera.left = - 1;
				dirLight.shadow.camera.top	= 1;
				dirLight.shadow.camera.bottom = - 1;

				dirLight.shadow.mapSize.width = 1024;
				dirLight.shadow.mapSize.height = 1024;
				scene.add( dirLight );

				// ***** Clipping planes: *****

				const localPlane = new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 0.8 );
				const globalPlane = new THREE.Plane( new THREE.Vector3( - 1, 0, 0 ), 0.1 );

				// Geometry

				const material = new THREE.MeshPhongMaterial( {
					color: 0x80ee10,
					shininess: 100,
					side: THREE.DoubleSide,

					// ***** Clipping setup (material): *****
					clippingPlanes: [ localPlane ],
					clipShadows: true

				} );

				const geometry = new THREE.TorusKnotGeometry( 0.4, 0.08, 95, 20 );

				object = new THREE.Mesh( geometry, material );
				object.castShadow = true;
				scene.add( object );

				const ground = new THREE.Mesh(
					new THREE.PlaneGeometry( 9, 9, 1, 1 ),
					new THREE.MeshPhongMaterial( { color: 0xa0adaf, shininess: 150 } )
				);

				ground.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
				ground.receiveShadow = true;
				scene.add( ground );

				// Stats

				stats = new Stats();
				document.body.appendChild( stats.dom );

				// Renderer

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.shadowMap.enabled = true;
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				window.addEventListener( 'resize', onWindowResize );
				document.body.appendChild( renderer.domElement );

				// ***** Clipping setup (renderer): *****
				const globalPlanes = [ globalPlane ],
					Empty = Object.freeze( [] );
				renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
				renderer.localClippingEnabled = true;

				// Controls

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.target.set( 0, 1, 0 );
				controls.update();

				// GUI

				const gui = new GUI(),
					folderLocal = gui.addFolder( 'Local Clipping' ),
					propsLocal = {

						get 'Enabled'() {

							return renderer.localClippingEnabled;

						},
						set 'Enabled'( v ) {

							renderer.localClippingEnabled = v;

						},

						get 'Shadows'() {

							return material.clipShadows;

						},
						set 'Shadows'( v ) {

							material.clipShadows = v;

						},

						get 'Plane'() {

							return localPlane.constant;

						},
						set 'Plane'( v ) {

							localPlane.constant = v;

						}

					},

					folderGlobal = gui.addFolder( 'Global Clipping' ),
					propsGlobal = {

						get 'Enabled'() {

							return renderer.clippingPlanes !== Empty;

						},
						set 'Enabled'( v ) {

							renderer.clippingPlanes = v ? globalPlanes : Empty;

						},

						get 'Plane'() {

							return globalPlane.constant;

						},
						set 'Plane'( v ) {

							globalPlane.constant = v;

						}

					};

				folderLocal.add( propsLocal, 'Enabled' );
				folderLocal.add( propsLocal, 'Shadows' );
				folderLocal.add( propsLocal, 'Plane', 0.3, 1.25 );

				folderGlobal.add( propsGlobal, 'Enabled' );
				folderGlobal.add( propsGlobal, 'Plane', - 0.4, 3 );

				// Start

				startTime = Date.now();

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				const currentTime = Date.now();
				const time = ( currentTime - startTime ) / 1000;

				requestAnimationFrame(animate);

				object.position.y = 0.8;
				object.rotation.x = time * 0.5;
				object.rotation.y = time * 0.2;
				object.scale.setScalar( Math.cos( time ) * 0.125 + 0.875 );

			//	stats.begin();
				renderer.render( scene, camera );
			//	stats.end();

			}
    }
})