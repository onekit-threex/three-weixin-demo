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
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { LUTPass } from 'three/addons/postprocessing/LUTPass.js';
import { LUTCubeLoader } from 'three/addons/loaders/LUTCubeLoader.js';
import { LUT3dlLoader } from 'three/addons/loaders/LUT3dlLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
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
    const params = {
      enabled: true,
      lut: 'Bourbon 64.CUBE',
      intensity: 1,
      use2DLut: false,
    };

    const lutMap = {
      'Bourbon 64.CUBE': null,
      'Chemical 168.CUBE': null,
      'Clayton 33.CUBE': null,
      'Cubicle 99.CUBE': null,
      'Remy 24.CUBE': null,
      'Presetpro-Cinematic.3dl': null
    };

    let gui;
    let camera, scene, renderer;
    let composer, lutPass;

    init();
    render();

    function init() {

      const container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
      camera.position.set( - 1.8, 0.6, 2.7 );

      scene = new THREE.Scene();

      new RGBELoader()
        .setPath( 'textures/equirectangular/' )
        .load( 'royal_esplanade_1k.hdr', function ( texture ) {

          texture.mapping = THREE.EquirectangularReflectionMapping;

          scene.background = texture;
          scene.environment = texture;

          // model

          const loader = new GLTFLoader().setPath( 'models/gltf/DamagedHelmet/glTF/' );
          loader.load( 'DamagedHelmet.gltf', function ( gltf ) {

            scene.add( gltf.scene );

          } );

        } );

      Object.keys( lutMap ).forEach( name => {

        if ( /\.CUBE$/i.test( name ) ) {

          new LUTCubeLoader()
            .load( 'luts/' + name, function ( result ) {

              lutMap[ name ] = result;

            } );

        } else {

          new LUT3dlLoader()
            .load( 'luts/' + name, function ( result ) {

              lutMap[ name ] = result;

            } );

        }

      } );

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      container.appendChild( renderer.domElement );

      composer = new EffectComposer( renderer );
      composer.setPixelRatio( window.devicePixelRatio );
      composer.setSize( window.innerWidth, window.innerHeight );
      composer.addPass( new RenderPass( scene, camera ) );
      composer.addPass( new OutputPass() );

      lutPass = new LUTPass();
      composer.addPass( lutPass );

      const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.minDistance = 2;
      controls.maxDistance = 10;
      controls.target.set( 0, 0, - 0.2 );
      controls.update();

      gui = new GUI();
      gui.width = 350;
      gui.add( params, 'enabled' );
      gui.add( params, 'lut', Object.keys( lutMap ) );
      gui.add( params, 'intensity' ).min( 0 ).max( 1 );

      if ( renderer.capabilities.isWebGL2 ) {

        gui.add( params, 'use2DLut' );

      } else {

        params.use2DLut = true;

      }

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );
      composer.setSize( window.innerWidth, window.innerHeight );

      render();

    }

    //

    function render() {

      requestAnimationFrame( render );

      lutPass.enabled = params.enabled && Boolean( lutMap[ params.lut ] );
      lutPass.intensity = params.intensity;
      if ( lutMap[ params.lut ] ) {

        const lut = lutMap[ params.lut ];
        lutPass.lut = params.use2DLut ? lut.texture : lut.texture3D;

      }

      composer.render();

    }
  }
})