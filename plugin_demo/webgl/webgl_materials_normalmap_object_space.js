// webgl/webgl_materials_normalmap_object_space.js
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

        
			let renderer, scene, camera;

			init();

			function init() {

				// renderer
				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				renderer.outputEncoding = THREE.sRGBEncoding;

				// scene
				scene = new THREE.Scene();

				// camera
				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( - 10, 0, 23 );
				scene.add( camera );

				// controls
				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render );
				controls.minDistance = 10;
				controls.maxDistance = 50;
				controls.enablePan = false;

				// ambient
				scene.add( new THREE.AmbientLight( 0xffffff, .2 ) );

				// light
				const light = new THREE.PointLight( 0xffffff, 1.5 );
				camera.add( light );

				// model
				new GLTFLoader().load( 'models/gltf/Nefertiti/Nefertiti.glb', function ( gltf ) {

					gltf.scene.traverse( function ( child ) {

						if ( child.isMesh ) {

							// glTF currently supports only tangent-space normal maps.
							// this model has been modified to demonstrate the use of an object-space normal map.

							child.material.normalMapType = THREE.ObjectSpaceNormalMap;

							// attribute normals are not required with an object-space normal map. remove them.

							child.geometry.deleteAttribute( 'normal' );

							//

							child.material.side = THREE.DoubleSide;

							child.scale.multiplyScalar( 0.5 );

							// recenter

							new THREE.Box3().setFromObject( child ).getCenter( child.position ).multiplyScalar( - 1 );

							scene.add( child );

						}

					} );

					render();

				} );


				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				renderer.setSize( window.innerWidth, window.innerHeight );

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}
    }
})