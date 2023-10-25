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
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { USDZLoader } from 'three/addons/loaders/USDZLoader.js';
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

    let camera, scene, renderer;

    init();
    animate();

    async function init() {

      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
      camera.position.set( 0, 0.75, - 1.5 );

      scene = new THREE.Scene();

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 2.0;
      document.body.appendChild( renderer.domElement );

      const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.minDistance = 1;
      controls.maxDistance = 8;
      // controls.target.y = 15;
      // controls.update();

      const rgbeLoader = new RGBELoader()
        .setPath( 'textures/equirectangular/' );

      const usdzLoader = new USDZLoader()
        .setPath( 'models/usdz/' );

      const [ texture, model ] = await Promise.all( [
        rgbeLoader.loadAsync( 'venice_sunset_1k.hdr' ),
        usdzLoader.loadAsync( 'saeukkang.usdz' ),
      ] );

      // environment

      texture.mapping = THREE.EquirectangularReflectionMapping;

      scene.background = texture;
      scene.backgroundBlurriness = 0.5;
      scene.environment = texture;

      // model

      model.position.y = 0.25;
      model.position.z = - 0.25;
      scene.add( model );

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      requestId = requestAnimationFrame( animate );

      renderer.render( scene, camera );

    }
  }
})