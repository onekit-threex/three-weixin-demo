// webgl/webgl_materials_cubemap_mipmaps.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls0.js';

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

        
			let container;

			let camera, scene, renderer;

			init();
			animate();

			//load customized cube texture
			async function loadCubeTextureWithMipmaps() {

				const path = 'textures/cube/angus/';
				const format = '.jpg';
				const mipmaps = [];
				const maxLevel = 8;

				async function loadCubeTexture( urls ) {

					return new Promise( function ( resolve ) {

						new THREE.CubeTextureLoader().load( urls, function ( cubeTexture ) {

							resolve( cubeTexture );

						} );


					} );

				}

				// load mipmaps
				const pendings = [];

				for ( let level = 0; level <= maxLevel; ++ level ) {

					const urls = [];

					for ( let face = 0; face < 6; ++ face ) {

						urls.push( path + 'cube_m0' + level + '_c0' + face + format );

					}

					const mipmapLevel = level;

					pendings.push( loadCubeTexture( urls ).then( function ( cubeTexture ) {

						mipmaps[ mipmapLevel ] = cubeTexture;

					} ) );

				}

				await Promise.all( pendings );

				const customizedCubeTexture = mipmaps.shift();
				customizedCubeTexture.mipmaps = mipmaps;
				customizedCubeTexture.minFilter = THREE.LinearMipMapLinearFilter;
				customizedCubeTexture.magFilter = THREE.LinearFilter;
				customizedCubeTexture.generateMipmaps = false;
				customizedCubeTexture.needsUpdate = true;

				return customizedCubeTexture;

			}

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 500;

				scene = new THREE.Scene();

				loadCubeTextureWithMipmaps().then( function ( cubeTexture ) {

					//model
					const sphere = new THREE.SphereGeometry( 100, 128, 128 );

					//manual mipmaps
					let material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: cubeTexture } );
					material.name = 'manual mipmaps';

					let mesh = new THREE.Mesh( sphere, material );
					mesh.position.set( 100, 0, 0 );
					scene.add( mesh );


					//webgl mipmaps
					material = material.clone();
					material.name = 'auto mipmaps';

					const autoCubeTexture = cubeTexture.clone();
					autoCubeTexture.mipmaps = [];
					autoCubeTexture.generateMipmaps = true;
					autoCubeTexture.needsUpdate = true;

					material.envMap = autoCubeTexture;

					mesh = new THREE.Mesh( sphere, material );
					mesh.position.set( - 100, 0, 0 );
					scene.add( mesh );

				} );

				//renderer
				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//controls
				const controls = new OrbitControls( camera, renderer.domElement );
				controls.minPolarAngle = Math.PI / 4;
				controls.maxPolarAngle = Math.PI / 1.5;

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestId = requestAnimationFrame(animate);
				renderer.render( scene, camera );

			}

    }
})