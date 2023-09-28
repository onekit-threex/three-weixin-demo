// webgl/webgl_loader_texture_dds.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { DDSLoader } from './jsm/loaders/DDSLoader.js';
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

        let camera, scene, renderer;
			const meshes = [];

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.z = 1000;

				scene = new THREE.Scene();

				const geometry = new THREE.BoxGeometry( 200, 200, 200 );

				/*
				This is how compressed textures are supposed to be used:

				DXT1 - RGB - opaque textures
				DXT3 - RGBA - transparent textures with sharp alpha transitions
				DXT5 - RGBA - transparent textures with full alpha range
				*/

				const loader = new DDSLoader();

				const map1 = loader.load( 'textures/compressed/disturb_dxt1_nomip.dds' );
				map1.minFilter = map1.magFilter = THREE.LinearFilter;
				map1.anisotropy = 4;

				const map2 = loader.load( 'textures/compressed/disturb_dxt1_mip.dds' );
				map2.anisotropy = 4;

				const map3 = loader.load( 'textures/compressed/hepatica_dxt3_mip.dds' );
				map3.anisotropy = 4;

				const map4 = loader.load( 'textures/compressed/explosion_dxt5_mip.dds' );
				map4.anisotropy = 4;

				const map5 = loader.load( 'textures/compressed/disturb_argb_nomip.dds' );
				map5.minFilter = map5.magFilter = THREE.LinearFilter;
				map5.anisotropy = 4;

				const map6 = loader.load( 'textures/compressed/disturb_argb_mip.dds' );
				map6.anisotropy = 4;

				const cubemap1 = loader.load( 'textures/compressed/Mountains.dds', function ( texture ) {

					texture.magFilter = THREE.LinearFilter;
					texture.minFilter = THREE.LinearFilter;
					texture.mapping = THREE.CubeReflectionMapping;
					material1.needsUpdate = true;

				} );

				const cubemap2 = loader.load( 'textures/compressed/Mountains_argb_mip.dds', function ( texture ) {

					texture.magFilter = THREE.LinearFilter;
					texture.minFilter = THREE.LinearFilter;
					texture.mapping = THREE.CubeReflectionMapping;
					material5.needsUpdate = true;

				} );

				const cubemap3 = loader.load( 'textures/compressed/Mountains_argb_nomip.dds', function ( texture ) {

					texture.magFilter = THREE.LinearFilter;
					texture.minFilter = THREE.LinearFilter;
					texture.mapping = THREE.CubeReflectionMapping;
					material6.needsUpdate = true;

				} );

				const material1 = new THREE.MeshBasicMaterial( { map: map1, envMap: cubemap1 } );
				const material2 = new THREE.MeshBasicMaterial( { map: map2 } );
				const material3 = new THREE.MeshBasicMaterial( { map: map3, alphaTest: 0.5, side: THREE.DoubleSide } );
				const material4 = new THREE.MeshBasicMaterial( { map: map4, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
				const material5 = new THREE.MeshBasicMaterial( { envMap: cubemap2 } );
				const material6 = new THREE.MeshBasicMaterial( { envMap: cubemap3 } );
				const material7 = new THREE.MeshBasicMaterial( { map: map5 } );
				const material8 = new THREE.MeshBasicMaterial( { map: map6 } );

				let mesh = new THREE.Mesh( new THREE.TorusGeometry( 100, 50, 32, 16 ), material1 );
				mesh.position.x = - 600;
				mesh.position.y = - 200;
				scene.add( mesh );
				meshes.push( mesh );

				mesh = new THREE.Mesh( geometry, material2 );
				mesh.position.x = - 200;
				mesh.position.y = - 200;
				scene.add( mesh );
				meshes.push( mesh );

				mesh = new THREE.Mesh( geometry, material3 );
				mesh.position.x = - 200;
				mesh.position.y = 200;
				scene.add( mesh );
				meshes.push( mesh );

				mesh = new THREE.Mesh( geometry, material4 );
				mesh.position.x = - 600;
				mesh.position.y = 200;
				scene.add( mesh );
				meshes.push( mesh );

				mesh = new THREE.Mesh( geometry, material5 );
				mesh.position.x = 200;
				mesh.position.y = 200;
				scene.add( mesh );
				meshes.push( mesh );

				mesh = new THREE.Mesh( geometry, material6 );
				mesh.position.x = 200;
				mesh.position.y = - 200;
				scene.add( mesh );
				meshes.push( mesh );

				mesh = new THREE.Mesh( geometry, material7 );
				mesh.position.x = 600;
				mesh.position.y = - 200;
				scene.add( mesh );
				meshes.push( mesh );

				mesh = new THREE.Mesh( geometry, material8 );
				mesh.position.x = 600;
				mesh.position.y = 200;
				scene.add( mesh );
				meshes.push( mesh );

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestId = requestAnimationFrame(animate);

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