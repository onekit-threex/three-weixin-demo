// webgl/webgl_lights_rectarealight.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from './jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from './jsm/lights/RectAreaLightUniformsLib.js';

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

        
			let renderer, scene, camera;
			let stats;

			init();

			function init() {

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setAnimationLoop( animation );
				renderer.outputEncoding = THREE.sRGBEncoding;
				document.body.appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 0, 5, - 15 );

				scene = new THREE.Scene();

				RectAreaLightUniformsLib.init();

				const rectLight1 = new THREE.RectAreaLight( 0xff0000, 5, 4, 10 );
				rectLight1.position.set( - 5, 5, 5 );
				scene.add( rectLight1 );

				const rectLight2 = new THREE.RectAreaLight( 0x00ff00, 5, 4, 10 );
				rectLight2.position.set( 0, 5, 5 );
				scene.add( rectLight2 );

				const rectLight3 = new THREE.RectAreaLight( 0x0000ff, 5, 4, 10 );
				rectLight3.position.set( 5, 5, 5 );
				scene.add( rectLight3 );

				scene.add( new RectAreaLightHelper( rectLight1 ) );
				scene.add( new RectAreaLightHelper( rectLight2 ) );
				scene.add( new RectAreaLightHelper( rectLight3 ) );

				const geoFloor = new THREE.BoxGeometry( 2000, 0.1, 2000 );
				const matStdFloor = new THREE.MeshStandardMaterial( { color: 0x808080, roughness: 0.1, metalness: 0 } );
				const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
				scene.add( mshStdFloor );

				const geoKnot = new THREE.TorusKnotGeometry( 1.5, 0.5, 200, 16 );
				const matKnot = new THREE.MeshStandardMaterial( { color: 0xffffff, roughness: 0, metalness: 0 } );
				const meshKnot = new THREE.Mesh( geoKnot, matKnot );
				meshKnot.name = 'meshKnot';
				meshKnot.position.set( 0, 5, 0 );
				scene.add( meshKnot );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.target.copy( meshKnot.position );
				controls.update();

				//

				window.addEventListener( 'resize', onWindowResize );

				stats = new Stats();
				document.body.appendChild( stats.dom );

			}

			function onWindowResize() {

				renderer.setSize( window.innerWidth, window.innerHeight );
				camera.aspect = ( window.innerWidth / window.innerHeight );
				camera.updateProjectionMatrix();

			}

			function animation( time ) {

				const mesh = scene.getObjectByName( 'meshKnot' );
				mesh.rotation.y = time / 1000;

				renderer.render( scene, camera );

			//	//stats.update();

			}

    }
})