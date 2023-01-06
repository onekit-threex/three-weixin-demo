// webgl/webgl_loader_3mf.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls.js';
import { ThreeMFLoader } from './jsm/loaders/3MFLoader.js';
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

        let camera, scene, renderer, object, loader, controls;

			const params = {
				asset: 'cube_gears'
			};

			const assets = [
				'cube_gears',
				'facecolors',
				'multipletextures',
				'vertexcolors'
			];

			init();

			function init() {

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x333333 );

				scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );

				camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );

				// Z is up for objects intended to be 3D printed.

				camera.up.set( 0, 0, 1 );
				camera.position.set( - 100, - 250, 100 );
				scene.add( camera );

				controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render );
				controls.minDistance = 50;
				controls.maxDistance = 400;
				controls.enablePan = false;
				controls.update();

				const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
				camera.add( pointLight );

				const manager = new THREE.LoadingManager();

				manager.onLoad = function () {

					const aabb = new THREE.Box3().setFromObject( object );
					const center = aabb.getCenter( new THREE.Vector3() );

					object.position.x += ( object.position.x - center.x );
					object.position.y += ( object.position.y - center.y );
					object.position.z += ( object.position.z - center.z );

					controls.reset();

					scene.add( object );
					render();

				};

				loader = new ThreeMFLoader( manager );
				loadAsset( params.asset );

				window.addEventListener( 'resize', onWindowResize );

				//

				const gui = new GUI();
				gui.add( params, 'asset', assets ).onChange( function ( value ) {

					loadAsset( value );

				} );

			}

			function loadAsset( asset ) {

				loader.load( 'models/3mf/' + asset + '.3mf', function ( group ) {
                  //  console.error( group );
					if ( object ) {

						object.traverse( function ( child ) {

							if ( child.material ) child.material.dispose();
							if ( child.material && child.material.map ) child.material.map.dispose();
							if ( child.geometry ) child.geometry.dispose();

						} );

						scene.remove( object );

					}

					//

					object = group;

				} );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}

			function render() {
               // console.error( scene, camera );
				renderer.render( scene, camera );

			}
    }
})