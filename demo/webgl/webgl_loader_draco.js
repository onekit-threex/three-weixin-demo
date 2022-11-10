// webgl/webgl_loader_draco.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import { DRACOLoader } from './jsm/loaders/DRACOLoader.js';
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

		const container = document.querySelector( '#container' );

		// Configure and create Draco decoder.
		const dracoLoader =  this.dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath( 'js/libs/draco/' );
		dracoLoader.setDecoderConfig( { type: 'js' } );

		init();
		animate();

		function init() {

			camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 15 );
			camera.position.set( 3, 0.25, 3 );

			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0x443333 );
			scene.fog = new THREE.Fog( 0x443333, 1, 4 );

			// Ground
			const plane = new THREE.Mesh(
				new THREE.PlaneGeometry( 8, 8 ),
				new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
			);
			plane.rotation.x = - Math.PI / 2;
			plane.position.y = 0.03;
			plane.receiveShadow = true;
			scene.add( plane );

			// Lights
			const hemiLight = new THREE.HemisphereLight( 0x443333, 0x111122 );
			scene.add( hemiLight );

			const spotLight = new THREE.SpotLight();
			spotLight.angle = Math.PI / 16;
			spotLight.penumbra = 0.5;
			spotLight.castShadow = true;
			spotLight.position.set( - 1, 1, 1 );
			scene.add( spotLight );

			dracoLoader.load( 'models/draco/bunny.drc', function ( geometry ) {

				geometry.computeVertexNormals();

				const material = new THREE.MeshStandardMaterial( { color: 0x606060 } );
				const mesh = new THREE.Mesh( geometry, material );
				mesh.castShadow = true;
				mesh.receiveShadow = true;
				scene.add( mesh );

				// Release decoder resources.
				dracoLoader.dispose();

			} );

			// renderer
			renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.outputEncoding = THREE.sRGBEncoding;
			renderer.shadowMap.enabled = true;
			container.appendChild( renderer.domElement );

			window.addEventListener( 'resize', onWindowResize );

		}

		function onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, window.innerHeight );

		}

		function animate() {

			render();
			requestAnimationFrame(animate);

		}

		function render() {

			const timer = Date.now() * 0.0003;

			camera.position.x = Math.sin( timer ) * 0.5;
			camera.position.z = Math.cos( timer ) * 0.5;
			camera.lookAt( 0, 0.1, 0 );

			renderer.render( scene, camera );

		}
    }
})