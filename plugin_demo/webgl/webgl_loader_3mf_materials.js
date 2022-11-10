// webgl/webgl_loader_3mf_materials.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls.js';
import { ThreeMFLoader } from './jsm/loaders/3MFLoader.js';

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
        let camera, scene, renderer;

			init();

			function init() {

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xa0a0a0 );
				scene.fog = new THREE.Fog( 0xa0a0a0, 10, 500 );

				camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );
				camera.position.set( - 50, 40, 50 );
				scene.add( camera );

				//

				const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
				hemiLight.position.set( 0, 100, 0 );
				scene.add( hemiLight );

				const dirLight = new THREE.DirectionalLight( 0xffffff );
				dirLight.position.set( - 0, 40, 50 );
				dirLight.castShadow = true;
				dirLight.shadow.camera.top = 50;
				dirLight.shadow.camera.bottom = - 25;
				dirLight.shadow.camera.left = - 25;
				dirLight.shadow.camera.right = 25;
				dirLight.shadow.camera.near = 0.1;
				dirLight.shadow.camera.far = 200;
				dirLight.shadow.mapSize.set( 1024, 1024 );
				scene.add( dirLight );

				// scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

				//

				const manager = new THREE.LoadingManager();

				const loader = new ThreeMFLoader( manager );
				loader.load( 'models/3mf/truck.3mf', function ( object ) {
					object.quaternion.setFromEuler( new THREE.Euler( - Math.PI / 2, 0, 0 ) ); 	// z-up conversion

					object.traverse( function ( child ) {

						child.castShadow = true;

					} );

					scene.add( object );

				} );

				//

				manager.onLoad = function () {

					render();

				};

				//

				const ground = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
				ground.rotation.x = - Math.PI / 2;
				ground.position.y = 11;
				ground.receiveShadow = true;
				scene.add( ground );

				//

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.shadowMap.enabled = true;
				renderer.shadowMap.type = THREE.PCFSoftShadowMap;
				document.body.appendChild( renderer.domElement );

				//

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render );
				controls.minDistance = 50;
				controls.maxDistance = 200;
				controls.enablePan = false;
				controls.target.set( 0, 20, 0 );
				controls.update();

				window.addEventListener( 'resize', onWindowResize );

				render();

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}
    }
})