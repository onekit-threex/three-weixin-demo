import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import Stats from './jsm/libs/stats.module.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { DecalGeometry } from './jsm/geometries/DecalGeometry.js';
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
        window.dispatchEvent(web_e)
        document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
onLoad() {
    document.createElementAsync("canvas", "webgl").then(canvas=>this.run(canvas).then())
},
async run(canvas3d){
this.canvas = canvas3d
var that = this
            var that = this

        const container = document.getElementById( 'container' );

			let renderer, scene, camera, stats;
			let mesh;
			let raycaster;
			let line;

			const intersection = {
				intersects: false,
				point: new THREE.Vector3(),
				normal: new THREE.Vector3()
			};
			const mouse = new THREE.Vector2();
			const intersects = [];

			const textureLoader = new THREE.TextureLoader( );
			const decalDiffuse = textureLoader.load( 'textures/decal/decal-diffuse.png' );
			const decalNormal = textureLoader.load( 'textures/decal/decal-normal.jpg' );

			const decalMaterial = new THREE.MeshPhongMaterial( {
				specular: 0x444444,
				map: decalDiffuse,
				normalMap: decalNormal,
				normalScale: new THREE.Vector2( 1, 1 ),
				shininess: 30,
				transparent: true,
				depthTest: true,
				depthWrite: false,
				polygonOffset: true,
				polygonOffsetFactor: - 4,
				wireframe: false
			} );

			const decals = [];
			let mouseHelper;
			const position = new THREE.Vector3();
			const orientation = new THREE.Euler();
			const size = new THREE.Vector3( 10, 10, 10 );

			const params = {
				minScale: 10,
				maxScale: 20,
				rotate: true,
				clear: function () {

					removeDecals();

				}
			};

			//window.addEventListener( 'load', init );
			function init() {

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 120;

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 50;
				controls.maxDistance = 200;

				scene.add( new THREE.AmbientLight( 0x443333 ) );

				const dirLight1 = new THREE.DirectionalLight( 0xffddcc, 1 );
				dirLight1.position.set( 1, 0.75, 0.5 );
				scene.add( dirLight1 );

				const dirLight2 = new THREE.DirectionalLight( 0xccccff, 1 );
				dirLight2.position.set( - 1, 0.75, - 0.5 );
				scene.add( dirLight2 );

				const geometry = new THREE.BufferGeometry();
				geometry.setFromPoints( [ new THREE.Vector3(), new THREE.Vector3() ] );

				line = new THREE.Line( geometry, new THREE.LineBasicMaterial() );
				scene.add( line );

				loadLeePerrySmith();

				raycaster = new THREE.Raycaster();

				mouseHelper = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 10 ), new THREE.MeshNormalMaterial() );
				mouseHelper.visible = false;
				scene.add( mouseHelper );

				window.addEventListener( 'resize', onWindowResize );

				let moved = false;

				controls.addEventListener( 'change', function () {

					moved = true;

				} );

				window.addEventListener( 'pointerdown', function () {

					moved = false;

				} );

				window.addEventListener( 'pointerup', function ( event ) {

					if ( moved === false ) {

						checkIntersection( event.clientX, event.clientY );

						if ( intersection.intersects ) shoot();

					}

				} );

				window.addEventListener( 'pointermove', onPointerMove );

				function onPointerMove( event ) {

					if ( event.isPrimary ) {

						checkIntersection( event.clientX, event.clientY );

					}

				}

				function checkIntersection( x, y ) {

					if ( mesh === undefined ) return;

					mouse.x = ( x / window.innerWidth ) * 2 - 1;
					mouse.y = - ( y / window.innerHeight ) * 2 + 1;

					raycaster.setFromCamera( mouse, camera );
					raycaster.intersectObject( mesh, false, intersects );

					if ( intersects.length > 0 ) {

						const p = intersects[ 0 ].point;
						mouseHelper.position.copy( p );
						intersection.point.copy( p );

						const n = intersects[ 0 ].face.normal.clone();
						n.transformDirection( mesh.matrixWorld );
						n.multiplyScalar( 10 );
						n.add( intersects[ 0 ].point );

						intersection.normal.copy( intersects[ 0 ].face.normal );
						mouseHelper.lookAt( n );

						const positions = line.geometry.attributes.position;
						positions.setXYZ( 0, p.x, p.y, p.z );
						positions.setXYZ( 1, n.x, n.y, n.z );
						positions.needsUpdate = true;

						intersection.intersects = true;

						intersects.length = 0;

					} else {

						intersection.intersects = false;

					}

				}

				const gui = new GUI();

				gui.add( params, 'minScale', 1, 30 );
				gui.add( params, 'maxScale', 1, 30 );
				gui.add( params, 'rotate' );
				gui.add( params, 'clear' );
				gui.open();

				onWindowResize();
				animate();

			}

            init.apply(this)
			function loadLeePerrySmith() {

				const loader = new GLTFLoader();

				loader.load( 'models/gltf/LeePerrySmith/LeePerrySmith.glb', function ( gltf ) {

					mesh = gltf.scene.children[ 0 ];
					mesh.material = new THREE.MeshPhongMaterial( {
						specular: 0x111111,
						map: textureLoader.load( 'models/gltf/LeePerrySmith/Map-COL.jpg' ),
						specularMap: textureLoader.load( 'models/gltf/LeePerrySmith/Map-SPEC.jpg' ),
						normalMap: textureLoader.load( 'models/gltf/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg' ),
						shininess: 25
					} );

					scene.add( mesh );
					mesh.scale.set( 10, 10, 10 );

				} );

			}

			function shoot() {

				position.copy( intersection.point );
				orientation.copy( mouseHelper.rotation );

				if ( params.rotate ) orientation.z = Math.random() * 2 * Math.PI;

				const scale = params.minScale + Math.random() * ( params.maxScale - params.minScale );
				size.set( scale, scale, scale );

				const material = decalMaterial.clone();
				material.color.setHex( Math.random() * 0xffffff );

				const m = new THREE.Mesh( new DecalGeometry( mesh, position, orientation, size ), material );

				decals.push( m );
				scene.add( m );

			}

			function removeDecals() {

				decals.forEach( function ( d ) {

					scene.remove( d );

				} );

				decals.length = 0;

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

      var count=0
			function animate() {
				requestId = requestAnimationFrame(animate);

				renderer.render( scene, camera );

				////stats.update();

			}

    }
})