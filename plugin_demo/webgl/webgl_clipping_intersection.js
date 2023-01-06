import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { GUI } from './jsm/libs/lil-gui.module.min.js';

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
        let camera, scene, renderer;

			const params = {
				clipIntersection: true,
				planeConstant: 0,
				showHelpers: false
			};

			const clipPlanes = [
				new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0 ),
				new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 0 ),
				new THREE.Plane( new THREE.Vector3( 0, 0, - 1 ), 0 )
			];

			init();
			render();

			function init() {

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.localClippingEnabled = true;
				document.body.appendChild( renderer.domElement );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 200 );

				camera.position.set( - 1.5, 2.5, 3.0 );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // use only if there is no animation loop
				controls.minDistance = 1;
				controls.maxDistance = 10;
				controls.enablePan = false;

				const light = new THREE.HemisphereLight( 0xffffff, 0x080808, 1.5 );
				light.position.set( - 1.25, 1, 1.25 );
				scene.add( light );

				// const helper = new THREE.CameraHelper( light.shadow.camera );
				// scene.add( helper );

				//

				const group = new THREE.Group();

				for ( let i = 1; i <= 30; i += 2 ) {

					const geometry = new THREE.SphereGeometry( i / 30, 48, 24 );

					const material = new THREE.MeshLambertMaterial( {

						color: new THREE.Color().setHSL( Math.random(), 0.5, 0.5 ),
						side: THREE.DoubleSide,
						clippingPlanes: clipPlanes,
						clipIntersection: params.clipIntersection

					} );

					group.add( new THREE.Mesh( geometry, material ) );

				}

				scene.add( group );

				// helpers

				const helpers = new THREE.Group();
				helpers.add( new THREE.PlaneHelper( clipPlanes[ 0 ], 2, 0xff0000 ) );
				helpers.add( new THREE.PlaneHelper( clipPlanes[ 1 ], 2, 0x00ff00 ) );
				helpers.add( new THREE.PlaneHelper( clipPlanes[ 2 ], 2, 0x0000ff ) );
				helpers.visible = false;
				scene.add( helpers );

				// gui

				const gui = new GUI();

				gui.add( params, 'clipIntersection' ).name( 'clip intersection' ).onChange( function ( value ) {

					const children = group.children;

					for ( let i = 0; i < children.length; i ++ ) {

						children[ i ].material.clipIntersection = value;

					}

					render();

				} );

				gui.add( params, 'planeConstant', - 1, 1 ).step( 0.01 ).name( 'plane constant' ).onChange( function ( value ) {

					for ( let j = 0; j < clipPlanes.length; j ++ ) {

						clipPlanes[ j ].constant = value;

					}

					render();

				} );

				gui.add( params, 'showHelpers' ).name( 'show helpers' ).onChange( function ( value ) {

					helpers.visible = value;

					render();

				} );

				//

				window.addEventListener( 'resize', onWindowResize );

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