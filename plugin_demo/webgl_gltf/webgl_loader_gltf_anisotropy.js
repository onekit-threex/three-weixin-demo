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

    init();

    async function init() {

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      document.body.appendChild( renderer.domElement );

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.01, 10 );
      camera.position.set( - 0.35, - 0.2, 0.35 );

      controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.target.set( 0, - 0.08, 0.11 );
      controls.minDistance = 0.1;
      controls.maxDistance = 2;
      controls.addEventListener( 'change', render );
      controls.update();

      const rgbeLoader = new RGBELoader().setPath( 'textures/equirectangular/' );
      const gltfLoader = new GLTFLoader().setPath( 'models/gltf/' );

      const [ texture, gltf ] = await Promise.all( [
        rgbeLoader.loadAsync( 'royal_esplanade_1k.hdr' ),
        gltfLoader.loadAsync( 'AnisotropyBarnLamp.glb' ),
      ] );

      // environment

      texture.mapping = THREE.EquirectangularReflectionMapping;

      scene.background = texture;
      scene.backgroundBlurriness = 0.5;
      scene.environment = texture;

      // model

      scene.add( gltf.scene );

      render();

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

      render();

    }

    function render() {

      renderer.render( scene, camera );

    }
  }
})