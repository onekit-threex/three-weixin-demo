// webgl/webgl_loader_texture_ktx.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { KTXLoader } from './jsm/loaders/KTXLoader.js';
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
	const meshes = [];

	init();
	animate();

	function init() {

		renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		const formats = {
			astc: renderer.extensions.has( 'WEBGL_compressed_texture_astc' ),
			etc1: renderer.extensions.has( 'WEBGL_compressed_texture_etc1' ),
			s3tc: renderer.extensions.has( 'WEBGL_compressed_texture_s3tc' ),
			pvrtc: renderer.extensions.has( 'WEBGL_compressed_texture_pvrtc' )
		};

		camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
		camera.position.z = 1000;

		scene = new THREE.Scene();

		const geometry = new THREE.BoxGeometry( 200, 200, 200 );
		let material1, material2;

		// TODO: add cubemap support
		const loader = new KTXLoader();

		if ( formats.pvrtc ) {

			material1 = new THREE.MeshBasicMaterial( {
				map: loader.load( 'textures/compressed/disturb_PVR2bpp.ktx' )
			} );
			material2 = new THREE.MeshBasicMaterial( {
				map: loader.load( 'textures/compressed/lensflare_PVR4bpp.ktx' ),
				depthTest: false,
				transparent: true,
				side: THREE.DoubleSide
			} );

			meshes.push( new THREE.Mesh( geometry, material1 ) );
			meshes.push( new THREE.Mesh( geometry, material2 ) );

		}

		if ( formats.s3tc ) {

			material1 = new THREE.MeshBasicMaterial( {
				map: loader.load( 'textures/compressed/disturb_BC1.ktx' )
			} );
			material2 = new THREE.MeshBasicMaterial( {
				map: loader.load( 'textures/compressed/lensflare_BC3.ktx' ),
				depthTest: false,
				transparent: true,
				side: THREE.DoubleSide
			} );

			meshes.push( new THREE.Mesh( geometry, material1 ) );
			meshes.push( new THREE.Mesh( geometry, material2 ) );

		}

		if ( formats.etc1 ) {

			material1 = new THREE.MeshBasicMaterial( {
				map: loader.load( 'textures/compressed/disturb_ETC1.ktx' )
			} );

			meshes.push( new THREE.Mesh( geometry, material1 ) );

		}

		if ( formats.astc ) {

			material1 = new THREE.MeshBasicMaterial( {
				map: loader.load( 'textures/compressed/disturb_ASTC4x4.ktx' )
			} );
			material2 = new THREE.MeshBasicMaterial( {
				map: loader.load( 'textures/compressed/lensflare_ASTC8x8.ktx' ),
				depthTest: false,
				transparent: true,
				side: THREE.DoubleSide
			} );

			meshes.push( new THREE.Mesh( geometry, material1 ) );
			meshes.push( new THREE.Mesh( geometry, material2 ) );

		}

		let x = - meshes.length / 2 * 150;
		for ( let i = 0; i < meshes.length; ++ i, x += 300 ) {

			const mesh = meshes[ i ];
			mesh.position.x = x;
			mesh.position.y = 0;
			scene.add( mesh );

		}

		window.addEventListener( 'resize', onWindowResize );

	}

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	function animate() {

		requestAnimationFrame(animate);

		const time = Date.now() * 0.001;

		for ( let i = 0; i < meshes.length; i ++ ) {

			const mesh = meshes[ i ];
			mesh.rotation.x = time;
			mesh.rotation.y = time;

		}

		renderer.render( scene, camera );

	}

    }
})