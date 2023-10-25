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

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
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

    let camera, scene, renderer, composer;
    let mesh;

    let afterimagePass;

    const params = {

      enable: true

    };

    init();
    createGUI();
    animate();

    function init() {

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
      camera.position.z = 400;

      scene = new THREE.Scene();
      scene.fog = new THREE.Fog( 0x000000, 1, 1000 );

      const geometry = new THREE.BoxGeometry( 150, 150, 150, 2, 2, 2 );
      const material = new THREE.MeshNormalMaterial();
      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      // postprocessing

      composer = new EffectComposer( renderer );
      composer.addPass( new RenderPass( scene, camera ) );

      afterimagePass = new AfterimagePass();
      composer.addPass( afterimagePass );

      const outputPass = new OutputPass();
      composer.addPass( outputPass );

      window.addEventListener( 'resize', onWindowResize );

      if ( typeof TESTING !== 'undefined' ) {

        for ( let i = 0; i < 45; i ++ ) {

          render();

        }



      }

    }

    function createGUI() {

      const gui = new GUI( { title: 'Damp setting' } );
      gui.add( afterimagePass.uniforms[ 'damp' ], 'value', 0, 1 ).step( 0.001 );
      gui.add( params, 'enable' );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );
      composer.setSize( window.innerWidth, window.innerHeight );

    }

    function render() {

      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.01;

      afterimagePass.enabled = params.enable;

      composer.render();


    }

    function animate() {

      requestId = requestAnimationFrame( animate );
      render();

    }
  }
})