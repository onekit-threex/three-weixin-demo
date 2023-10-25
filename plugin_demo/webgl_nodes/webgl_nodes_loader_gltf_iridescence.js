import {
  document,
	window,
	HTMLCanvasElement,
	requestAnimationFrame,
	cancelAnimationFrame,
core,
	Event,
  Event0
} from "dhtml-weixin"
import * as THREE from './three/Three';	
import { NodeMaterial, uv, vec2, checker, float, timerLocal } from './three/addons/nodes/Nodes.js';

import { nodeFrame } from 'three/addons/renderers/webgl-legacy/nodes/WebGLNodes.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

var requestId
Page({
  onShareAppMessage(){
    return getApp().onShare()
  },
  onShareTimeline(){
     return {title:"ThreeX 2.0"}
  },
	onUnload() {
		cancelAnimationFrame(requestId, this.canvas)
		this.worker && this.worker.terminate()
if(this.canvas) this.canvas = null
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
  webgl_touch(e){
		const web_e = (window.platform=="devtools"?Event:Event0).fix(e)
		this.canvas.dispatchEvent(web_e)
  },
  onLoad() {
		document.createElementAsync("canvas", "webgl2").then(canvas => {
      this.canvas = canvas
      this.body_load(canvas).then()
    })
  },
  async body_load(canvas3d) {
  let renderer, scene, camera, controls;

  init().catch( function ( err ) {

    console.error( err );

  } );

  async function init() {

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setAnimationLoop( render );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.25, 20 );
    camera.position.set( 0.35, 0.05, 0.35 );

    controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    controls.target.set( 0, 0.2, 0 );
    controls.update();

    const rgbeLoader = new RGBELoader()
      .setPath( 'textures/equirectangular/' );

    const gltfLoader = new GLTFLoader().setPath( 'models/gltf/' );

    const [ texture, gltf ] = await Promise.all( [
      rgbeLoader.loadAsync( 'venice_sunset_1k.hdr' ),
      gltfLoader.loadAsync( 'IridescenceLamp.glb' ),
    ] );

    // nodes

    gltf.scene.traverse( mesh => {

      const material = mesh.material;

      if ( material && material.iridescence > 0 ) {

        const iridescenceFactorNode = checker( uv().add( vec2( timerLocal( - .05 ), 0 ) ).mul( 20 ) );

        const nodeMaterial = NodeMaterial.fromMaterial( material ); // @TODO: NodeMaterial.fromMaterial can be removed if WebGLNodes will apply it by default (as in WebGPURenderer)
        nodeMaterial.iridescenceNode = iridescenceFactorNode;
        nodeMaterial.iridescenceIORNode = float( 1.3 );
        nodeMaterial.iridescenceThicknessNode = float( 400 );

        mesh.material = nodeMaterial;

      }

    } );

    // environment

    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = texture;
    scene.environment = texture;

    // model

    scene.add( gltf.scene );

    window.addEventListener( 'resize', onWindowResize );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function render() {

    nodeFrame.update();

    renderer.render( scene, camera );

  }
  }
})