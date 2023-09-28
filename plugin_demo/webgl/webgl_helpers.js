// webgl/webgl_helpers.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,performance,Event0,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

import { VertexNormalsHelper } from './jsm/helpers/VertexNormalsHelper.js';
import { VertexTangentsHelper } from './jsm/helpers/VertexTangentsHelper.js';
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

        
			let scene, renderer;
			let camera, light;
			let vnh;
			let vth;

			init();
			animate();

			function init() {

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 400;

				scene = new THREE.Scene();

				light = new THREE.PointLight();
				light.position.set( 200, 100, 150 );
				scene.add( light );

				scene.add( new THREE.PointLightHelper( light, 15 ) );

				const gridHelper = new THREE.GridHelper( 400, 40, 0x0000ff, 0x808080 );
				gridHelper.position.y = - 150;
				gridHelper.position.x = - 150;
				scene.add( gridHelper );

				const polarGridHelper = new THREE.PolarGridHelper( 200, 16, 8, 64, 0x0000ff, 0x808080 );
				polarGridHelper.position.y = - 150;
				polarGridHelper.position.x = 200;
				scene.add( polarGridHelper );

				const loader = new GLTFLoader();
				loader.load( 'models/gltf/LeePerrySmith/LeePerrySmith.glb', function ( gltf ) {

					const mesh = gltf.scene.children[ 0 ];

					mesh.geometry.computeTangents(); // generates bad data due to degenerate UVs

					const group = new THREE.Group();
					group.scale.multiplyScalar( 50 );
					scene.add( group );

					// To make sure that the matrixWorld is up to date for the boxhelpers
					group.updateMatrixWorld( true );

					group.add( mesh );

					vnh = new VertexNormalsHelper( mesh, 5 );
					scene.add( vnh );

					vth = new VertexTangentsHelper( mesh, 5 );
					scene.add( vth );

					scene.add( new THREE.BoxHelper( mesh ) );

					const wireframe = new THREE.WireframeGeometry( mesh.geometry );
					let line = new THREE.LineSegments( wireframe );
					line.material.depthTest = false;
					line.material.opacity = 0.25;
					line.material.transparent = true;
					line.position.x = 4;
					group.add( line );
					scene.add( new THREE.BoxHelper( line ) );

					const edges = new THREE.EdgesGeometry( mesh.geometry );
					line = new THREE.LineSegments( edges );
					line.material.depthTest = false;
					line.material.opacity = 0.25;
					line.material.transparent = true;
					line.position.x = - 4;
					group.add( line );
					scene.add( new THREE.BoxHelper( line ) );

					scene.add( new THREE.BoxHelper( group ) );
					scene.add( new THREE.BoxHelper( scene ) );


				} );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestId = requestAnimationFrame(animate);

				const time = - performance.now() * 0.0003;

				camera.position.x = 400 * Math.cos( time );
				camera.position.z = 400 * Math.sin( time );
				camera.lookAt( scene.position );

				light.position.x = Math.sin( time * 1.7 ) * 300;
				light.position.y = Math.cos( time * 1.5 ) * 400;
				light.position.z = Math.cos( time * 1.3 ) * 300;

				if ( vnh ) vnh.update();
				if ( vth ) vth.update();

				renderer.render( scene, camera );

			}
    }
})