// webgl/webgl_morphtargets_horse.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';

import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
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
        
			let container, stats;
			let camera, scene, renderer;
			let mesh, mixer;

			const radius = 600;
			let theta = 0;
			let prevTime = Date.now();

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				//

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.y = 300;

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );

				//

				const light1 = new THREE.DirectionalLight( 0xefefff, 1.5 );
				light1.position.set( 1, 1, 1 ).normalize();
				scene.add( light1 );

				const light2 = new THREE.DirectionalLight( 0xffefef, 1.5 );
				light2.position.set( - 1, - 1, - 1 ).normalize();
				scene.add( light2 );

				const loader = new GLTFLoader();
				loader.load( 'models/gltf/Horse.glb', function ( gltf ) {

					mesh = gltf.scene.children[ 0 ];
					mesh.scale.set( 1.5, 1.5, 1.5 );
					scene.add( mesh );

					mixer = new THREE.AnimationMixer( mesh );

					mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();

				} );

				//

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );

				renderer.outputEncoding = THREE.sRGBEncoding;

				container.appendChild( renderer.domElement );

				//

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize );

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
				stats.update();

			}

			function render() {

				theta += 0.1;

				camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
				camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );

				camera.lookAt( 0, 150, 0 );

				if ( mixer ) {

					const time = Date.now();

					mixer.update( ( time - prevTime ) * 0.001 );

					prevTime = time;

				}

				renderer.render( scene, camera );

			}
    }
})