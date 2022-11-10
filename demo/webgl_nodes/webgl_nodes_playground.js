// webgl_nodes/webgl_nodes_playground.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import * as Nodes from './jsm/nodes/Nodes.js';

import { nodeFrame } from './jsm/renderers/webgl/nodes/WebGLNodes.js';

import { NodeEditor } from './jsm/node-editor/NodeEditor.js';
import { MeshEditor } from './jsm/node-editor/scene/MeshEditor.js';

import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { FBXLoader } from './jsm/loaders/FBXLoader.js';

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
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this

let stats;
		let camera, scene, renderer;
		let model;

		init();
		animate();

		function init() {

			camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 5000 );
			camera.position.set( 0.0, 300, 400 * 3 );

			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0x333333 );

			// Lights

			const topLight = new THREE.PointLight( 0xF4F6F0, 1 );
			topLight.position.set( 0, 1000, 1000 );
			scene.add( topLight );

			const backLight = new THREE.PointLight( 0x0c1445, 1 );
			backLight.position.set( - 100, 20, - 260 );
			scene.add( backLight );

			renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
			document.body.appendChild( renderer.domElement );
			renderer.outputEncoding = THREE.sRGBEncoding;
			renderer.toneMapping = THREE.LinearToneMapping;
			renderer.toneMappingExposure = 4000;
			renderer.physicallyCorrectLights = true;

			renderer.domElement.className = 'renderer';

			//

			stats = new Stats();
			document.body.appendChild( stats.dom );

			const controls = new OrbitControls( camera, renderer.domElement );
			controls.minDistance = 500;
			controls.maxDistance = 3000;

			window.addEventListener( 'resize', onWindowResize );

			onWindowResize();

			initEditor();

		}

		function initEditor() {

			const nodeEditor = new NodeEditor( scene );

			nodeEditor.addEventListener( 'new', () => {

				const materialEditor = new MeshEditor( model );

				nodeEditor.add( materialEditor );
				nodeEditor.centralizeNode( materialEditor );

			} );

			document.body.appendChild( nodeEditor.domElement );

			const loaderFBX = new FBXLoader();
			loaderFBX.load( 'models/fbx/stanford-bunny.fbx', ( object ) => {

				const defaultMaterial = new Nodes.MeshBasicNodeMaterial();
				defaultMaterial.colorNode = new Nodes.UniformNode( 0 );

				const sphere = new THREE.Mesh( new THREE.SphereGeometry( 200, 32, 16 ), defaultMaterial );
				sphere.name = 'Sphere';
				sphere.position.set( 500, 0, - 500 );
				scene.add( sphere );

				const box = new THREE.Mesh( new THREE.BoxGeometry( 200, 200, 200 ), defaultMaterial );
				box.name = 'Box';
				box.position.set( - 500, 0, - 500 );
				scene.add( box );

				const defaultPointsMaterial = new Nodes.PointsNodeMaterial();
				defaultPointsMaterial.colorNode = new Nodes.UniformNode( 0 );

				const torusKnot = new THREE.Points( new THREE.TorusKnotGeometry( 100, 30, 100, 16 ), defaultPointsMaterial );
				torusKnot.name = 'Torus Knot ( Points )';
				torusKnot.position.set( 0, 0, - 500 );
				scene.add( torusKnot );

				model = object.children[ 0 ];
				model.position.set( 0, 0, 10 );
				model.scale.setScalar( 1 );
				model.material = defaultMaterial;
				scene.add( model );

				const materialEditor = new MeshEditor( model );

				nodeEditor.add( materialEditor );
				nodeEditor.centralizeNode( materialEditor );

			} );

		}

		function onWindowResize() {

			const width = window.innerWidth;
			const height = window.innerHeight / 2;

			camera.aspect = width / height;
			camera.updateProjectionMatrix();

			renderer.setSize( width, height );

		}

		//

		function animate() {

			requestId = requestAnimationFrame(animate);

			nodeFrame.update();

			render();

			stats.update();

		}

		function render() {

			//if ( model ) model.rotation.y = performance.now() / 5000;

			renderer.render( scene, camera );

		}
}
})