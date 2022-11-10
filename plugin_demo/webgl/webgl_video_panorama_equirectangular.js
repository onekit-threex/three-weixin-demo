// webgl/webgl_video_panorama_equirectangular.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
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
        const web_e = Event.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
async onLoad() {
        const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
        
			let camera, scene, renderer;

			let isUserInteracting = false,
				lon = 0, lat = 0,
				phi = 0, theta = 0,
				onPointerDownPointerX = 0,
				onPointerDownPointerY = 0,
				onPointerDownLon = 0,
				onPointerDownLat = 0;

			const distance = 50;

			init();
			animate();

			function init() {

				const container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

				scene = new THREE.Scene();

				const geometry = new THREE.SphereGeometry( 500, 60, 40 );
				// invert the geometry on the x-axis so that all of the faces point inward
				geometry.scale( - 1, 1, 1 );

				const video = document.getElementById( 'video' );
			//	video.play();

				const texture = new THREE.VideoTexture( video );
				const material = new THREE.MeshBasicMaterial( { map: texture } );

				const mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				document.addEventListener( 'pointerdown', onPointerDown );
				document.addEventListener( 'pointermove', onPointerMove );
				document.addEventListener( 'pointerup', onPointerUp );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onPointerDown( event ) {

				isUserInteracting = true;

				onPointerDownPointerX = event.clientX;
				onPointerDownPointerY = event.clientY;

				onPointerDownLon = lon;
				onPointerDownLat = lat;

			}

			function onPointerMove( event ) {

				if ( isUserInteracting === true ) {

					lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
					lat = ( onPointerDownPointerY - event.clientY ) * 0.1 + onPointerDownLat;

				}

			}

			function onPointerUp() {

				isUserInteracting = false;

			}

			function animate() {

				requestId = requestAnimationFrame(animate);
				update();

			}

			function update() {

				lat = Math.max( - 85, Math.min( 85, lat ) );
				phi = THREE.MathUtils.degToRad( 90 - lat );
				theta = THREE.MathUtils.degToRad( lon );

				camera.position.x = distance * Math.sin( phi ) * Math.cos( theta );
				camera.position.y = distance * Math.cos( phi );
				camera.position.z = distance * Math.sin( phi ) * Math.sin( theta );

				camera.lookAt( 0, 0, 0 );

				renderer.render( scene, camera );

			}
    }
})