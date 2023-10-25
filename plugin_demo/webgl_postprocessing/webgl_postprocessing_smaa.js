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

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
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
  let camera, scene, renderer, composer, stats, smaaPass;

  const params = {
    enabled: true,
    autoRotate: true

  };

  init();
  animate();

  function init() {

    const container = document.getElementById( 'container' );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    stats = new Stats();
    container.appendChild( stats.dom );

    //

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 300;

    scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 120, 120, 120 );
    const material1 = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );

    const mesh1 = new THREE.Mesh( geometry, material1 );
    mesh1.position.x = - 100;
    scene.add( mesh1 );

    const texture = new THREE.TextureLoader().load( 'textures/brick_diffuse.jpg' );
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.colorSpace = THREE.SRGBColorSpace;

    const material2 = new THREE.MeshBasicMaterial( { map: texture } );

    const mesh2 = new THREE.Mesh( geometry, material2 );
    mesh2.position.x = 100;
    scene.add( mesh2 );

    // postprocessing

    composer = new EffectComposer( renderer );
    composer.addPass( new RenderPass( scene, camera ) );

    smaaPass = new SMAAPass( window.innerWidth * renderer.getPixelRatio(), window.innerHeight * renderer.getPixelRatio() );
    composer.addPass( smaaPass );

    const outputPass = new OutputPass();
    composer.addPass( outputPass );

    window.addEventListener( 'resize', onWindowResize );

    const gui = new GUI();

    const smaaFolder = gui.addFolder( 'SMAA' );
    smaaFolder.add( params, 'enabled' );

    const sceneFolder = gui.addFolder( 'Scene' );
    sceneFolder.add( params, 'autoRotate' );

  }

  function onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );
    composer.setSize( width, height );

  }

  function animate() {

    requestId = requestAnimationFrame( animate );

    stats.begin();

    if ( params.autoRotate === true ) {

      for ( let i = 0; i < scene.children.length; i ++ ) {

        const child = scene.children[ i ];

        child.rotation.x += 0.005;
        child.rotation.y += 0.01;

      }

    }

    smaaPass.enabled = params.enabled;

    composer.render();

    stats.end();

  }
  }
})