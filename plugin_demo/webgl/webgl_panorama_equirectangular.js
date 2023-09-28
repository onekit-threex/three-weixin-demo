// webgl/webgl_panorama_equirectangular.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
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

			let isUserInteracting = false,
				onPointerDownMouseX = 0, onPointerDownMouseY = 0,
				lon = 0, onPointerDownLon = 0,
				lat = 0, onPointerDownLat = 0,
				phi = 0, theta = 0;

			init();
			animate();

			function init() {

				const container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

				scene = new THREE.Scene();

				const geometry = new THREE.SphereGeometry( 500, 60, 40 );
				// invert the geometry on the x-axis so that all of the faces point inward
				geometry.scale( - 1, 1, 1 );

				const texture = new THREE.TextureLoader( ).load( 'textures/2294472375_24a3b8ef46_o.jpg' );
				const material = new THREE.MeshBasicMaterial( { map: texture } );

				const mesh = new THREE.Mesh( geometry, material );

				scene.add( mesh );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				container.style.touchAction = 'none';
				container.addEventListener( 'pointerdown', onPointerDown );

				document.addEventListener( 'wheel', onDocumentMouseWheel );

				//

				document.addEventListener( 'dragover', function ( event ) {

					event.preventDefault();
					event.dataTransfer.dropEffect = 'copy';

				} );

				document.addEventListener( 'dragenter', function () {

					document.body.style.opacity = 0.5;

				} );

				document.addEventListener( 'dragleave', function () {

					document.body.style.opacity = 1;

				} );

				document.addEventListener( 'drop', function ( event ) {

					event.preventDefault();

					const reader = new FileReader();
					reader.addEventListener( 'load', function ( event ) {

						material.map.image.src = event.target.result;
						material.map.needsUpdate = true;

					} );
					reader.readAsDataURL( event.dataTransfer.files[ 0 ] );

					document.body.style.opacity = 1;

				} );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onPointerDown( event ) {

				if ( event.isPrimary === false ) return;

				isUserInteracting = true;

				onPointerDownMouseX = event.clientX;
				onPointerDownMouseY = event.clientY;

				onPointerDownLon = lon;
				onPointerDownLat = lat;

				document.addEventListener( 'pointermove', onPointerMove );
				document.addEventListener( 'pointerup', onPointerUp );

			}

			function onPointerMove( event ) {

				if ( event.isPrimary === false ) return;

				lon = ( onPointerDownMouseX - event.clientX ) * 0.1 + onPointerDownLon;
				lat = ( event.clientY - onPointerDownMouseY ) * 0.1 + onPointerDownLat;

			}

			function onPointerUp() {

				if ( event.isPrimary === false ) return;

				isUserInteracting = false;

				document.removeEventListener( 'pointermove', onPointerMove );
				document.removeEventListener( 'pointerup', onPointerUp );

			}

			function onDocumentMouseWheel( event ) {

				const fov = camera.fov + event.deltaY * 0.05;

				camera.fov = THREE.MathUtils.clamp( fov, 10, 75 );

				camera.updateProjectionMatrix();

			}

			function animate() {

				requestId = requestAnimationFrame(animate);
				update();

			}

			function update() {

				if ( isUserInteracting === false ) {

					lon += 0.1;

				}

				lat = Math.max( - 85, Math.min( 85, lat ) );
				phi = THREE.MathUtils.degToRad( 90 - lat );
				theta = THREE.MathUtils.degToRad( lon );

				const x = 500 * Math.sin( phi ) * Math.cos( theta );
				const y = 500 * Math.cos( phi );
				const z = 500 * Math.sin( phi ) * Math.sin( theta );

				camera.lookAt( x, y, z );

				renderer.render( scene, camera );

			}

    }
})