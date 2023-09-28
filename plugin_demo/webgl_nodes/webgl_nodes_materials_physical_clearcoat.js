// webgl_nodes/webgl_nodes_materials_physical_clearcoat.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import * as Nodes from './jsm/nodes/Nodes.js';

import { color, float, vec2, texture, normalMap, uv, mul } from './jsm/nodes/Nodes.js';

import { nodeFrame } from './jsm/renderers/webgl/nodes/WebGLNodes.js';

import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls0.js';
import { HDRCubeTextureLoader } from './jsm/loaders/HDRCubeTextureLoader.js';

import { FlakesTexture } from './jsm/textures/FlakesTexture.js';
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
        const web_e = Event0.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
let container, stats;

			let camera, scene, renderer;

			let particleLight;
			let group;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 1000;

				scene = new THREE.Scene();

				group = new THREE.Group();
				scene.add( group );

				new HDRCubeTextureLoader()
					.setPath( 'textures/cube/pisaHDR/' )
					.load( [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ],
						  function ( hdrTexture ) {

							const geometry = new THREE.SphereGeometry( 80, 64, 32 );

							const textureLoader = new THREE.TextureLoader( );

							const diffuse = textureLoader.load( 'textures/carbon/Carbon.png' );
							diffuse.encoding = THREE.sRGBEncoding;
							diffuse.wrapS = THREE.RepeatWrapping;
							diffuse.wrapT = THREE.RepeatWrapping;

							const normalMap1 = textureLoader.load( 'textures/carbon/Carbon_Normal.png' );
							normalMap1.wrapS = THREE.RepeatWrapping;
							normalMap1.wrapT = THREE.RepeatWrapping;

							const normalMap2 = textureLoader.load( 'textures/water/Water_1_M_Normal.jpg' );

							const normalMap3 = new THREE.CanvasTexture( new FlakesTexture() );
							normalMap3.wrapS = THREE.RepeatWrapping;
							normalMap3.wrapT = THREE.RepeatWrapping;
							normalMap3.anisotropy = 16;

							const normalMap4 = textureLoader.load( 'textures/golfball.jpg' );

							const clearcoatNormalMap = textureLoader.load( 'textures/pbr/Scratched_gold/Scratched_gold_01_1K_Normal.png' );

							// car paint

							const carPaintUV = mul( uv(), vec2( 10, 6 ) );
							const carPaintNormalScale = vec2( 0.15 );

							let material = new Nodes.MeshPhysicalNodeMaterial();
							material.clearcoatNode = float( 1 );
							material.clearcoatRoughnessNode = float( 0.1 );
							material.metalnessNode = float( 0.9 );
							material.roughnessNode = float( 0.5 );
							material.colorNode = color( 0x0000ff );
							material.normalNode = normalMap( texture( normalMap3, carPaintUV ), carPaintNormalScale );

							let mesh = new THREE.Mesh( geometry, material );
							mesh.position.x = - 100;
							mesh.position.y = 100;
							group.add( mesh );

							// fibers

							const fibersUV = mul( uv(), 10 );

							material = new Nodes.MeshPhysicalNodeMaterial();
							material.roughnessNode = float( 0.5 );
							material.clearcoatNode = float( 1 );
							material.clearcoatRoughnessNode = float( 0.1 );
							material.colorNode = texture( diffuse, fibersUV );
							material.normalNode = normalMap( texture( normalMap1, fibersUV ) );

							mesh = new THREE.Mesh( geometry, material );
							mesh.position.x = 100;
							mesh.position.y = 100;
							group.add( mesh );

							// golf

							material = new Nodes.MeshPhysicalNodeMaterial();
							material.clearcoatNode = float( 1 );
							material.roughnessNode = float( 0.1 );
							material.metalnessNode = float( 0 );
							material.colorNode = color( 0xffffff );
							material.normalNode = normalMap( texture( normalMap4 ) );
							// y scale is negated to compensate for normal map handedness.
							material.clearcoatNormalNode = normalMap( texture( clearcoatNormalMap ), vec2( 2.0, - 2.0 ) );

							mesh = new THREE.Mesh( geometry, material );
							mesh.position.x = - 100;
							mesh.position.y = - 100;
							group.add( mesh );

							// clearcoat + normalmap

							material = new Nodes.MeshPhysicalNodeMaterial();
							material.clearcoatNode = float( 1 );
							material.roughnessNode = float( 1 );
							material.metalnessNode = float( 1 );
							material.colorNode = color( 0xff0000 );
							material.normalNode = normalMap( texture( normalMap2 ), vec2( 0.15, 0.15 ) );
							// y scale is negated to compensate for normal map handedness.
							material.clearcoatNormalNode = normalMap( texture( clearcoatNormalMap ), vec2( 2.0, - 2.0 ) );

							mesh = new THREE.Mesh( geometry, material );
							mesh.position.x = 100;
							mesh.position.y = - 100;
							group.add( mesh );

							//

							scene.background = hdrTexture;
							scene.environment = hdrTexture;

						}

						 );

				// LIGHTS

				particleLight = new THREE.Mesh(
					new THREE.SphereGeometry( 4, 8, 8 ),
					new THREE.MeshBasicMaterial( { color: 0xffffff } )
				);
				scene.add( particleLight );

				particleLight.add( new THREE.PointLight( 0xffffff, 1 ) );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//

				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 1.25;

				//

				renderer.outputEncoding = THREE.sRGBEncoding;

				//

				stats = new Stats();
				container.appendChild( stats.dom );

				// EVENTS

				new OrbitControls( camera, renderer.domElement );

				window.addEventListener( 'resize', onWindowResize );

			}

			//

			function onWindowResize() {

				const width = window.innerWidth;
				const height = window.innerHeight;

				camera.aspect = width / height;
				camera.updateProjectionMatrix();

				renderer.setSize( width, height );

			}

			//
var count = 0
			function animate() {
if(count++>=10){
    return
}
				requestAnimationFrame(animate);

				nodeFrame.update();

				render();

				stats.update();

			}

			function render() {

				const timer = Date.now() * 0.00025;

				particleLight.position.x = Math.sin( timer * 7 ) * 300;
				particleLight.position.y = Math.cos( timer * 5 ) * 400;
				particleLight.position.z = Math.cos( timer * 3 ) * 300;

				for ( let i = 0; i < group.children.length; i ++ ) {

					const child = group.children[ i ];
					child.rotation.y += 0.005;

				}

				renderer.render( scene, camera );

			}

}
})