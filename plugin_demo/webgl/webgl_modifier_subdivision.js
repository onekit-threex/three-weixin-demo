// webgl/webgl_modifier_simplifier.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import { LoopSubdivision } from '../threex/three-subdivide/index';
import { OrbitControls } from './jsm/controls/OrbitControls0.js';
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
        
			let renderer, scene, camera;
			let texture;
			let meshMaterial, meshNormal, meshSmooth;
			let wireMaterial, wireNormal, wireSmooth;

			const params = {
				geometry: 'Box',
				iterations: 3,
				split: true,
				uvSmooth: false,
				flatOnly: false,
				maxTriangles: 25000,
				wireframe: false
			};

			init();

			function init() {

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight );
				camera.position.set( 0, 0.7, 2.1 );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.rotateSpeed = 0.5;
				controls.minZoom = 1;
				controls.target.set( 0, 0, 0 );
				controls.update();

				texture = new THREE.TextureLoader( ).load( './textures/uv_grid_opengl.jpg', () => {

					texture.wrapS = THREE.RepeatWrapping;
					texture.wrapT = THREE.RepeatWrapping;

					render();

				} );

				meshMaterial = new THREE.MeshBasicMaterial( {
					map: texture,
					polygonOffset: true,
					polygonOffsetFactor: 1, // positive value pushes polygon further away
					polygonOffsetUnits: 1,
					side: THREE.DoubleSide
				} );
				meshNormal = new THREE.Mesh( new THREE.BufferGeometry(), meshMaterial );
				meshSmooth = new THREE.Mesh( new THREE.BufferGeometry(), meshMaterial );
				meshNormal.position.set( - 0.7, 0, 0 );
				meshSmooth.position.set( 0.7, 0, 0 );
				scene.add( meshNormal, meshSmooth );

				wireMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, depthTest: true, wireframe: true } );
				wireNormal = new THREE.Mesh( new THREE.BufferGeometry(), wireMaterial );
				wireSmooth = new THREE.Mesh( new THREE.BufferGeometry(), wireMaterial );
				wireNormal.visible = false;
				wireSmooth.visible = false;
				wireNormal.position.copy( meshNormal.position );
				wireSmooth.position.copy( meshSmooth.position );
				scene.add( wireNormal, wireSmooth );

				updateMeshes();

				window.addEventListener( 'resize', onWindowResize );

				const geomTypes = [ 'Box', 'Capsule', 'Circle', 'Cone', 'Cylinder', 'Dodecahedron', 'Icosahedron', 'Lathe', 'Octahedron', 'Plane', 'Ring', 'Sphere', 'Tetrahedron', 'Torus', 'TorusKnot' ];

				const gui = new GUI();

				const folder1 = gui.addFolder( 'Subdivide Params' );
				const geomController = folder1.add( params, 'geometry', geomTypes ).onFinishChange( () => {

					const geom = params.geometry.toLowerCase();

					params.split = geom === 'box' || geom === 'ring';
					params.uvSmooth = geom === 'circle' || geom === 'plane' || geom === 'ring';

					refreshDisplay();

				} );

				folder1.add( params, 'iterations' ).min( 0 ).max( 5 ).step( 1 ).onFinishChange( updateMeshes );
				const splitController = folder1.add( params, 'split' ).onFinishChange( updateMeshes );
				const smoothController = folder1.add( params, 'uvSmooth' ).onFinishChange( updateMeshes );
				folder1.add( params, 'flatOnly' ).onFinishChange ( updateMeshes );
				folder1.add( params, 'maxTriangles' ).onFinishChange( updateMeshes );

				const folder2 = gui.addFolder( 'View' );
				folder2.add( params, 'wireframe' ).onFinishChange( updateMeshes );

				function refreshDisplay() {

					geomController.updateDisplay();
					splitController.updateDisplay();
					smoothController.updateDisplay();

					updateMeshes();

				}

			}

			function getGeometry() {

				switch ( params.geometry.toLowerCase() ) {

					case 'box':
						return new THREE.BoxGeometry();

					case 'capsule':
						return new THREE.CapsuleGeometry( 0.5, 0.5, 3, 5 );

					case 'circle':
						return new THREE.CircleGeometry( 0.6, 10 );

					case 'cone':
						return new THREE.ConeGeometry( 0.6, 1.5, 5, 3 );

					case 'cylinder':
						return new THREE.CylinderGeometry( 0.5, 0.5, 1, 5, 5 );

					case 'dodecahedron':
						return new THREE.DodecahedronGeometry( 0.6 );

					case 'icosahedron':
						return new THREE.IcosahedronGeometry( 0.6 );

					case 'lathe':

						// Sine Wave

						const points = [];

						for ( let i = 0; i < 65; i += 5 ) {

							let x = ( Math.sin( i * 0.2 ) * Math.sin( i * 0.1 ) * 15 + 50 ) * 1.2;
							let y = ( i - 5 ) * 3;
							points.push( new THREE.Vector2( x * 0.0075, y * 0.005 ) );

						}

						const latheGeometry = new THREE.LatheGeometry( points, 4 );
						latheGeometry.center();

						return latheGeometry;

					case 'octahedron':
						return new THREE.OctahedronGeometry( 0.7 );

					case 'plane':
						return new THREE.PlaneGeometry();

					case 'ring':
						return new THREE.RingGeometry( 0.3, 0.6, 10 );

					case 'sphere':
						return new THREE.SphereGeometry( 0.6, 8, 4 );

					case 'tetrahedron':
						return new THREE.TetrahedronGeometry( 0.8 );

					case 'torus':
						return new THREE.TorusGeometry( 0.48, 0.24, 4, 6 );

					case 'torusknot':
						return new THREE.TorusKnotGeometry( 0.38, 0.18, 20, 4 );

				}

			}

			function updateMeshes() {

				const normalGeometry = getGeometry();
				const smoothGeometry = LoopSubdivision.modify(
					normalGeometry,
					params.iterations,
					params.split,
					params.uvSmooth,
					params.flatOnly,
					params.maxTriangles
				);

				meshNormal.geometry.dispose();
				meshSmooth.geometry.dispose();
				meshNormal.geometry = normalGeometry;
				meshSmooth.geometry = smoothGeometry;

				wireNormal.geometry.dispose();
				wireSmooth.geometry.dispose();
				wireNormal.geometry = normalGeometry.clone();
				wireSmooth.geometry = smoothGeometry.clone();

				wireNormal.visible = wireSmooth.visible = params.wireframe;

				render();

			}

			function onWindowResize() {

				renderer.setSize( window.innerWidth, window.innerHeight );

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}

    }
})