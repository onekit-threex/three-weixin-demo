// webgl/webgl_points_billboards.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';

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
async onLoad() {
        const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
        let camera, scene, renderer, stats, material;
			let mouseX = 0, mouseY = 0;

			let windowHalfX = window.innerWidth / 2;
			let windowHalfY = window.innerHeight / 2;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 2, 2000 );
				camera.position.z = 1000;

				scene = new THREE.Scene();
				scene.fog = new THREE.FogExp2( 0x000000, 0.001 );

				const geometry = new THREE.BufferGeometry();
				const vertices = [];

				const sprite = new THREE.TextureLoader( ).load( 'textures/sprites/disc.png' );

				for ( let i = 0; i < 10000; i ++ ) {

					const x = 2000 * Math.random() - 1000;
					const y = 2000 * Math.random() - 1000;
					const z = 2000 * Math.random() - 1000;

					vertices.push( x, y, z );

				}

				geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

				material = new THREE.PointsMaterial( { size: 35, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true } );
				material.color.setHSL( 1.0, 0.3, 0.7 );

				const particles = new THREE.Points( geometry, material );
				scene.add( particles );

				//

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//

				stats = new Stats();
				document.body.appendChild( stats.dom );

				//

				const gui = new GUI();

				gui.add( material, 'sizeAttenuation' ).onChange( function () {

					material.needsUpdate = true;

				} );

				gui.open();

				//

				document.body.style.touchAction = 'none';
				document.body.addEventListener( 'pointermove', onPointerMove );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onPointerMove( event ) {

				if ( event.isPrimary === false ) return;

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;

			}

			//

			function animate() {

				requestId = requestAnimationFrame(animate);

				render();
				stats.update();

			}

			function render() {

				const time = Date.now() * 0.00005;

				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

				camera.lookAt( scene.position );

				const h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
				material.color.setHSL( h, 0.5, 0.5 );

				renderer.render( scene, camera );

			}
    }
})