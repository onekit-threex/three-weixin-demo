// webgl/webgl_modifier_simplifier.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { SimplifyModifier } from './jsm/modifiers/SimplifyModifier.js';
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

				const info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.innerHTML = '<a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> - Vertex Reduction using SimplifyModifier';
				document.body.appendChild( info );

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 15;

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.enablePan = false;
				controls.enableZoom = false;

				scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );

				const light = new THREE.PointLight( 0xffffff, 0.7 );
				camera.add( light );
				scene.add( camera );

				new GLTFLoader().load( 'models/gltf/LeePerrySmith/LeePerrySmith.glb', function ( gltf ) {

					const mesh = gltf.scene.children[ 0 ];
					mesh.position.x = - 3;
					mesh.rotation.y = Math.PI / 2;
					scene.add( mesh );

					const modifier = new SimplifyModifier();

					const simplified = mesh.clone();
					simplified.material = simplified.material.clone();
					simplified.material.flatShading = true;
					const count = Math.floor( simplified.geometry.attributes.position.count * 0.875 ); // number of vertices to remove
					simplified.geometry = modifier.modify( simplified.geometry, count );

					simplified.position.x = 3;
					simplified.rotation.y = - Math.PI / 2;
					scene.add( simplified );

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