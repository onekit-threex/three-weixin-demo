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
import { NodeMaterial, float, texture } from './three/addons/nodes/Nodes.js';

import { nodeFrame } from 'three/addons/renderers/webgl-legacy/nodes/WebGLNodes.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

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
    let camera, scene, renderer, controls, clock, mixer;

    init();
    animate();

    function init() {

      clock = new THREE.Clock();

      const container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
      camera.position.set( 0, 0.4, 0.7 );

      scene = new THREE.Scene();

      new RGBELoader()
        .setPath( 'textures/equirectangular/' )
        .load( 'royal_esplanade_1k.hdr', function ( envMap ) {

          envMap.mapping = THREE.EquirectangularReflectionMapping;

          scene.background = envMap;
          scene.environment = envMap;

          // model

          new GLTFLoader()
            .setPath( 'models/gltf/' )
            .setDRACOLoader( new DRACOLoader().setDecoderPath( 'jsm/libs/draco/gltf/' ) )
            .load( 'IridescentDishWithOlives.glb', function ( gltf ) {

              // nodes

              const glassMesh = gltf.scene.getObjectByName( 'glassCover' );

              const material = glassMesh.material;

              if ( material && material.transmission > 0 ) {

                const nodeMaterial = NodeMaterial.fromMaterial( material ); // @TODO: NodeMaterial.fromMaterial can be removed if WebGLNodes will apply it by default (as in WebGPURenderer)
                nodeMaterial.transmissionNode = float( 1 );
                nodeMaterial.iorNode = float( 1.5 );
                nodeMaterial.thicknessNode = texture( material.thicknessMap ).g.mul( 0.1 );
                //nodeMaterial.attenuationDistanceNode;
                //nodeMaterial.attenuationColorNode;

                // ignore traditional maps
                nodeMaterial.transmissionMap = null;
                nodeMaterial.thicknessMap = null;

                glassMesh.material = nodeMaterial;

              }

              mixer = new THREE.AnimationMixer( gltf.scene );
              mixer.clipAction( gltf.animations[ 0 ] ).play();
              scene.add( gltf.scene );

            } );

        } );

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      container.appendChild( renderer.domElement );

      controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.enableDamping = true;
      controls.minDistance = 0.5;
      controls.maxDistance = 1;
      controls.target.set( 0, 0.1, 0 );
      controls.update();

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    //

    function animate() {

      requestId = requestAnimationFrame( animate );

      if ( mixer ) mixer.update( clock.getDelta() );

      controls.update(); // required if damping enabled

      render();

    }

    function render() {

      nodeFrame.update();

      renderer.render( scene, camera );

    }
  }
})