// webgl/webgl_instancing_scatter.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import { MeshSurfaceSampler } from './jsm/math/MeshSurfaceSampler.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import Stats from './jsm/libs/stats.module.js';
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

        let camera, scene, renderer, stats;

			const api = {

				count: 2000,
				distribution: 'random',
				resample: resample,
				surfaceColor: 0xFFF784,
				backgroundColor: 0xE39469,

			};

			let stemMesh, blossomMesh;
			let stemGeometry, blossomGeometry;
			let stemMaterial, blossomMaterial;

			let sampler;
			const count = api.count;
			const ages = new Float32Array( count );
			const scales = new Float32Array( count );
			const dummy = new THREE.Object3D();

			const _position = new THREE.Vector3();
			const _normal = new THREE.Vector3();
			const _scale = new THREE.Vector3();

			// let surfaceGeometry = new THREE.BoxGeometry( 10, 10, 10 ).toNonIndexed();
			const surfaceGeometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 ).toNonIndexed();
			const surfaceMaterial = new THREE.MeshLambertMaterial( { color: api.surfaceColor, wireframe: false } );
			const surface = new THREE.Mesh( surfaceGeometry, surfaceMaterial );

			// Source: https://gist.github.com/gre/1650294
			const easeOutCubic = function ( t ) {

				return ( -- t ) * t * t + 1;

			};

			// Scaling curve causes particles to grow quickly, ease gradually into full scale, then
			// disappear quickly. More of the particle's lifetime is spent around full scale.
			const scaleCurve = function ( t ) {

				return Math.abs( easeOutCubic( ( t > 0.5 ? 1 - t : t ) * 2 ) );

			};

			const loader = new GLTFLoader();

			loader.load( 'models/gltf/Flower/Flower.glb', function ( gltf ) {

				const _stemMesh = gltf.scene.getObjectByName( 'Stem' );
				const _blossomMesh = gltf.scene.getObjectByName( 'Blossom' );

				stemGeometry = _stemMesh.geometry.clone();
				blossomGeometry = _blossomMesh.geometry.clone();

				const defaultTransform = new THREE.Matrix4()
					.makeRotationX( Math.PI )
					.multiply( new THREE.Matrix4().makeScale( 7, 7, 7 ) );

				stemGeometry.applyMatrix4( defaultTransform );
				blossomGeometry.applyMatrix4( defaultTransform );

				stemMaterial = _stemMesh.material;
				blossomMaterial = _blossomMesh.material;

				stemMesh = new THREE.InstancedMesh( stemGeometry, stemMaterial, count );
				blossomMesh = new THREE.InstancedMesh( blossomGeometry, blossomMaterial, count );

				// Assign random colors to the blossoms.
				const color = new THREE.Color();
				const blossomPalette = [ 0xF20587, 0xF2D479, 0xF2C879, 0xF2B077, 0xF24405 ];

				for ( let i = 0; i < count; i ++ ) {

					color.setHex( blossomPalette[ Math.floor( Math.random() * blossomPalette.length ) ] );
					blossomMesh.setColorAt( i, color );

				}

				// Instance matrices will be updated every frame.
				stemMesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
				blossomMesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );

				resample();

				init();
				animate();

			} );

			function init() {

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
				camera.position.set( 25, 25, 25 );
				camera.lookAt( 0, 0, 0 );

				//

				scene = new THREE.Scene();
				scene.background = new THREE.Color( api.backgroundColor );

				const pointLight = new THREE.PointLight( 0xAA8899, 0.75 );
				pointLight.position.set( 50, - 25, 75 );
				scene.add( pointLight );

				scene.add( new THREE.HemisphereLight() );

				//

				scene.add( stemMesh );
				scene.add( blossomMesh );

				scene.add( surface );

				//

				const gui = new GUI();
				gui.add( api, 'count', 0, count ).onChange( function () {

					stemMesh.count = api.count;
					blossomMesh.count = api.count;

				} );

				// gui.addColor( api, 'backgroundColor' ).onChange( function () {

				// 	scene.background.setHex( api.backgroundColor );

				// } );

				// gui.addColor( api, 'surfaceColor' ).onChange( function () {

				// 	surfaceMaterial.color.setHex( api.surfaceColor );

				// } );

				gui.add( api, 'distribution' ).options( [ 'random', 'weighted' ] ).onChange( resample );
				gui.add( api, 'resample' );

				//

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//

				stats = new Stats();
				document.body.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function resample() {

				const vertexCount = surface.geometry.getAttribute( 'position' ).count;

				console.info( 'Sampling ' + count + ' points from a surface with ' + vertexCount + ' vertices...' );

				//

				console.time( '.build()' );

				sampler = new MeshSurfaceSampler( surface )
					.setWeightAttribute( api.distribution === 'weighted' ? 'uv' : null )
					.build();

				console.timeEnd( '.build()' );

				//

				console.time( '.sample()' );

				for ( let i = 0; i < count; i ++ ) {

					ages[ i ] = Math.random();
					scales[ i ] = scaleCurve( ages[ i ] );

					resampleParticle( i );

				}

				console.timeEnd( '.sample()' );

				stemMesh.instanceMatrix.needsUpdate = true;
				blossomMesh.instanceMatrix.needsUpdate = true;

			}

			function resampleParticle( i ) {

				sampler.sample( _position, _normal );
				_normal.add( _position );

				dummy.position.copy( _position );
				dummy.scale.set( scales[ i ], scales[ i ], scales[ i ] );
				dummy.lookAt( _normal );
				dummy.updateMatrix();

				stemMesh.setMatrixAt( i, dummy.matrix );
				blossomMesh.setMatrixAt( i, dummy.matrix );

			}

			function updateParticle( i ) {

				// Update lifecycle.

				ages[ i ] += 0.005;

				if ( ages[ i ] >= 1 ) {

					ages[ i ] = 0.001;
					scales[ i ] = scaleCurve( ages[ i ] );

					resampleParticle( i );

					return;

				}

				// Update scale.

				const prevScale = scales[ i ];
				scales[ i ] = scaleCurve( ages[ i ] );
				_scale.set( scales[ i ] / prevScale, scales[ i ] / prevScale, scales[ i ] / prevScale );

				// Update transform.

				stemMesh.getMatrixAt( i, dummy.matrix );
				dummy.matrix.scale( _scale );
				stemMesh.setMatrixAt( i, dummy.matrix );
				blossomMesh.setMatrixAt( i, dummy.matrix );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestId = requestAnimationFrame(animate);

				render();

			//	//stats.update();

			}

			function render() {

				if ( stemMesh && blossomMesh ) {

					const time = Date.now() * 0.001;

					scene.rotation.x = Math.sin( time / 4 );
					scene.rotation.y = Math.sin( time / 2 );

					for ( let i = 0; i < api.count; i ++ ) {

						updateParticle( i );

					}

					stemMesh.instanceMatrix.needsUpdate = true;
					blossomMesh.instanceMatrix.needsUpdate = true;

				}

				renderer.render( scene, camera );

			}

    }
})