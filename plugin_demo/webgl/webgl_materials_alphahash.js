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
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { TAARenderPass } from 'three/addons/postprocessing/TAARenderPass.js';
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

  let camera, scene, renderer, controls, stats, mesh, material;

  let composer, renderPass, taaRenderPass, outputPass;

  let needsUpdate = false;

  const amount = parseInt( window.location.search.slice( 1 ) ) || 3;
  const count = Math.pow( amount, 3 );

  const color = new THREE.Color();

  const params = {
    alpha: 0.5,
    alphaHash: true,
    taa: true,
    sampleLevel: 2,
  };

  init();
  animate();

  function init() {

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set( amount, amount, amount );
    camera.lookAt( 0, 0, 0 );

    scene = new THREE.Scene();

    const geometry = new THREE.IcosahedronGeometry( 0.5, 3 );

    material = new THREE.MeshStandardMaterial( {
      color: 0xffffff,
      alphaHash: params.alphaHash,
      opacity: params.alpha
    } );

    mesh = new THREE.InstancedMesh( geometry, material, count );

    let i = 0;
    const offset = ( amount - 1 ) / 2;

    const matrix = new THREE.Matrix4();

    for ( let x = 0; x < amount; x ++ ) {

      for ( let y = 0; y < amount; y ++ ) {

        for ( let z = 0; z < amount; z ++ ) {

          matrix.setPosition( offset - x, offset - y, offset - z );

          mesh.setMatrixAt( i, matrix );
          mesh.setColorAt( i, color.setHex( Math.random() * 0xffffff ) );

          i ++;

        }

      }

    }

    scene.add( mesh );

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //

    const environment = new RoomEnvironment( renderer );
    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    scene.environment = pmremGenerator.fromScene( environment ).texture;
    environment.dispose();

    //

    composer = new EffectComposer( renderer );

    renderPass = new RenderPass( scene, camera );
    renderPass.enabled = false;

    taaRenderPass = new TAARenderPass( scene, camera );

    outputPass = new OutputPass();

    composer.addPass( renderPass );
    composer.addPass( taaRenderPass );
    composer.addPass( outputPass );

    //

    controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    controls.enableZoom = false;
    controls.enablePan = false;

    controls.addEventListener( 'change', () => ( needsUpdate = true ) );

    //

    const gui = new GUI();

    gui.add( params, 'alpha', 0, 1 ).onChange( onMaterialUpdate );
    gui.add( params, 'alphaHash' ).onChange( onMaterialUpdate );

    const taaFolder = gui.addFolder( 'Temporal Anti-Aliasing' );

    taaFolder.add( params, 'taa' ).name( 'enabled' ).onChange( () => {

      renderPass.enabled = ! params.taa;
      taaRenderPass.enabled = params.taa;

      sampleLevelCtrl.enable( params.taa );

      needsUpdate = true;

    } );

    const sampleLevelCtrl = taaFolder.add( params, 'sampleLevel', 0, 6, 1 ).onChange( () => ( needsUpdate = true ) );

    //

    stats = new Stats();
    document.body.appendChild( stats.dom );

    window.addEventListener( 'resize', onWindowResize );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize( window.innerWidth, window.innerHeight );

    needsUpdate = true;

  }

  function onMaterialUpdate() {

    material.opacity = params.alpha;
    material.alphaHash = params.alphaHash;
    material.transparent = ! params.alphaHash;
    material.depthWrite = params.alphaHash;

    material.needsUpdate = true;
    needsUpdate = true;

  }

  function animate() {

    requestId = requestAnimationFrame( animate );

    render();

    stats.update();

  }

  function render() {

    if ( needsUpdate ) {

      taaRenderPass.accumulate = false;
      taaRenderPass.sampleLevel = 0;

      needsUpdate = false;

    } else {

      taaRenderPass.accumulate = true;
      taaRenderPass.sampleLevel = params.sampleLevel;

    }

    composer.render();

  }

  }
})