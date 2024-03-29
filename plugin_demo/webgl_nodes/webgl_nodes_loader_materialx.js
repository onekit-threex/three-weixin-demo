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

import { MaterialXLoader } from './three/addons/loaders/MaterialXLoader.js';
import { OrbitControls } from './three/addons/controls/OrbitControls.js';
import { RGBELoader } from './three/addons/loaders/RGBELoader.js';
import { GLTFLoader } from './three/addons/loaders/GLTFLoader.js';

import { nodeFrame } from './three/addons/renderers/webgl-legacy/nodes/WebGLNodes.js';

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
    const SAMPLE_PATH = 'https://raw.githubusercontent.com/materialx/MaterialX/main/resources/Materials/Examples/StandardSurface/';

    const samples = [
      'standard_surface_brass_tiled.mtlx',
      //'standard_surface_brick_procedural.mtlx',
      'standard_surface_carpaint.mtlx',
      //'standard_surface_chess_set.mtlx',
      'standard_surface_chrome.mtlx',
      'standard_surface_copper.mtlx',
      //'standard_surface_default.mtlx',
      //'standard_surface_glass.mtlx',
      //'standard_surface_glass_tinted.mtlx',
      'standard_surface_gold.mtlx',
      'standard_surface_greysphere.mtlx',
      //'standard_surface_greysphere_calibration.mtlx',
      'standard_surface_jade.mtlx',
      //'standard_surface_look_brass_tiled.mtlx',
      //'standard_surface_look_wood_tiled.mtlx',
      'standard_surface_marble_solid.mtlx',
      'standard_surface_metal_brushed.mtlx',
      'standard_surface_plastic.mtlx',
      //'standard_surface_thin_film.mtlx',
      'standard_surface_velvet.mtlx',
      'standard_surface_wood_tiled.mtlx'
    ];

    let camera, scene, renderer, prefab;
    const models = [];

    init();

    function init() {

      const container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 50 );
      camera.position.set( 0, 3, 20 );

      scene = new THREE.Scene();

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.toneMapping = THREE.LinearToneMapping;
      renderer.toneMappingExposure = .5;
      renderer.setAnimationLoop( render );
      container.appendChild( renderer.domElement );

      //

      const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.minDistance = 2;
      controls.maxDistance = 40;

      //

      new RGBELoader()
        .setPath( 'textures/equirectangular/' )
        .load( 'san_giuseppe_bridge_2k.hdr', async ( texture ) => {

          texture.mapping = THREE.EquirectangularReflectionMapping;

          scene.background = texture;
          scene.environment = texture;

          prefab = ( await new GLTFLoader().loadAsync( './models/gltf/ShaderBall.glb' ) ).scene;

          for ( const sample of samples ) {

            addSample( sample );

          }

        } );

      window.addEventListener( 'resize', onWindowResize );

    }

    function updateModelsAlign() {

      const COLUMN_COUNT = 6;
      const DIST_X = 3;
      const DIST_Y = 4;

      const lineCount = Math.floor( models.length / COLUMN_COUNT ) - 1.5;

      const offsetX = ( DIST_X * ( COLUMN_COUNT - 1 ) ) * - .5;
      const offsetY = ( DIST_Y * lineCount ) * .5;

      for ( let i = 0; i < models.length; i ++ ) {

        const model = models[ i ];

        model.position.x = ( ( i % COLUMN_COUNT ) * DIST_X ) + offsetX;
        model.position.y = ( Math.floor( i / COLUMN_COUNT ) * - DIST_Y ) + offsetY;

      }

    }

    async function addSample( sample ) {

      const model = prefab.clone();

      models.push( model );

      scene.add( model );

      updateModelsAlign();

      //

      const material = await new MaterialXLoader()
        .setPath( SAMPLE_PATH )
        .loadAsync( sample )
        .then( ( { materials } ) => Object.values( materials ).pop() );

      const calibrationMesh = model.getObjectByName( 'Calibration_Mesh' );
      calibrationMesh.material = material;

      const Preview_Mesh = model.getObjectByName( 'Preview_Mesh' );
      Preview_Mesh.material = material;

    }

    //

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