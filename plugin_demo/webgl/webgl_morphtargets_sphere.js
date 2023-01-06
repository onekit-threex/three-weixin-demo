// webgl/webgl_morphtargets_sphere.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls.js';
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
        const web_e = Event.fix(e)
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
        
			let camera, scene, renderer, clock;

			let mesh;

			let sign = 1;
			const speed = 0.5;

			init();
			animate();

			function init() {

				const container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.2, 100 );
				camera.position.set( 0, 5, 5 );

				scene = new THREE.Scene();

				clock = new THREE.Clock();

				const light1 = new THREE.PointLight( 0xff2200, 0.7 );
				light1.position.set( 100, 100, 100 );
				scene.add( light1 );

				const light2 = new THREE.PointLight( 0x22ff00, 0.7 );
				light2.position.set( - 100, - 100, - 100 );
				scene.add( light2 );

				scene.add( new THREE.AmbientLight( 0x111111 ) );

				const loader = new GLTFLoader();
				loader.load( 'models/gltf/AnimatedMorphSphere/glTF/AnimatedMorphSphere.gltf', function ( gltf ) {

					mesh = gltf.scene.getObjectByName( 'AnimatedMorphSphere' );
					mesh.rotation.z = Math.PI / 2;
					scene.add( mesh );

					//

					const pointsMaterial = new THREE.PointsMaterial( {
						size: 10,
						sizeAttenuation: false,
						map: new THREE.TextureLoader( ).load( 'textures/sprites/disc.png' ),
						alphaTest: 0.5
					} );

					const points = new THREE.Points( mesh.geometry, pointsMaterial );
					points.morphTargetInfluences = mesh.morphTargetInfluences;
					points.morphTargetDictionary = mesh.morphTargetDictionary;
					mesh.add( points );

				} );

				//

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 1;
				controls.maxDistance = 20;

				//

				window.addEventListener( 'resize', onWindowResize );

				document.addEventListener( 'visibilitychange', onVisibilityChange );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onVisibilityChange() {

				if ( document.hidden === true ) {

					clock.stop();

				} else {

					clock.start();

				}

			}

			function animate() {

				requestId = requestAnimationFrame(animate);
				render();

			}

			function render() {

				const delta = clock.getDelta();

				if ( mesh !== undefined ) {

					const step = delta * speed;

					mesh.rotation.y += step;

					mesh.morphTargetInfluences[ 1 ] = mesh.morphTargetInfluences[ 1 ] + step * sign;

					if ( mesh.morphTargetInfluences[ 1 ] <= 0 || mesh.morphTargetInfluences[ 1 ] >= 1 ) {

						sign *= - 1;

					}

				}

				renderer.render( scene, camera );

			}

    }
})