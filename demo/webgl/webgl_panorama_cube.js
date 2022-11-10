// webgl/webgl_panorama_cube.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls.js';
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
    var canvas;
        const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
        
			let camera, controls;
			let renderer;
			let scene;

			init();
			animate();

			function init() {

				const container = document.getElementById( 'container' );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 100 );
				camera.position.z = 0.01;

				controls = new OrbitControls( camera, renderer.domElement );
				controls.enableZoom = false;
				controls.enablePan = false;
				controls.enableDamping = true;
				controls.rotateSpeed = - 0.25;

				const textures = getTexturesFromAtlasFile( 'textures/cube/sun_temple_stripe.jpg', 6 );

				const materials = [];

				for ( let i = 0; i < 6; i ++ ) {

					materials.push( new THREE.MeshBasicMaterial( { map: textures[ i ] } ) );

				}

				const skyBox = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), materials );
				skyBox.geometry.scale( 1, 1, - 1 );
				scene.add( skyBox );

				window.addEventListener( 'resize', onWindowResize );

			}

			function getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) {

				const textures = [];

				for ( let i = 0; i < tilesNum; i ++ ) {

					textures[ i ] = new THREE.Texture();

				}

				new THREE.ImageLoader( )
					.load( atlasImgUrl, ( image ) => {

						let  context;
						const tileWidth = image.height;

						for ( let i = 0; i < textures.length; i ++ ) {

							canvas = document.createElement( 'canvas' );
							context = canvas.getContext( '2d' );
							canvas.height = tileWidth;
                            canvas.width = tileWidth;
							context.drawImage( image.image, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
							textures[ i ].image = canvas;
							textures[ i ].needsUpdate = true;

						}

					} );

				return textures;

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestId = requestAnimationFrame(animate);

				controls.update(); // required when damping is enabled

				renderer.render( scene, camera );

			}
    }
})