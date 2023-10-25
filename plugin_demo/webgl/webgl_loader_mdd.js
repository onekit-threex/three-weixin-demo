

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

    import { MDDLoader } from 'three/addons/loaders/MDDLoader.js';
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

    let camera, scene, renderer, mixer, clock;

    init();

    function init() {

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 100 );
      camera.position.set( 8, 8, 8 );
      camera.lookAt( scene.position );

      clock = new THREE.Clock();

      //

      const loader = new MDDLoader();
      loader.load( 'models/mdd/cube.mdd', function ( result ) {

        const morphTargets = result.morphTargets;
        const clip = result.clip;
        // clip.optimize(); // optional

        const geometry = new THREE.BoxGeometry();
        geometry.morphAttributes.position = morphTargets; // apply morph targets

        const material = new THREE.MeshNormalMaterial();

        const mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        mixer = new THREE.AnimationMixer( mesh );
        mixer.clipAction( clip ).play(); // use clip

        animate();

      } );

      //

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      requestId = requestAnimationFrame( animate );

      const delta = clock.getDelta();

      if ( mixer ) mixer.update( delta );

      renderer.render( scene, camera );

    }
  }
})