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
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';
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

    let controls, camera, scene, renderer;
    let textureEquirec, textureCube;
    let sphereMesh, sphereMaterial;

    init();
    animate();

    function init() {

      // CAMERAS

      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );
      camera.position.set( 0, 0, 2.5 );

      // SCENE

      scene = new THREE.Scene();

      // Textures

      const loader = new THREE.CubeTextureLoader();
      loader.setPath( 'textures/cube/Bridge2/' );

      textureCube = loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );

      const textureLoader = new THREE.TextureLoader();

      textureEquirec = textureLoader.load( 'textures/2294472375_24a3b8ef46_o.jpg' );
      textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
      textureEquirec.colorSpace = THREE.SRGBColorSpace;

      scene.background = textureCube;

      //

      const geometry = new THREE.IcosahedronGeometry( 1, 15 );
      sphereMaterial = new THREE.MeshBasicMaterial( { envMap: textureCube } );
      sphereMesh = new THREE.Mesh( geometry, sphereMaterial );
      scene.add( sphereMesh );

      //

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      //

      controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.minDistance = 1.5;
      controls.maxDistance = 6;

      //

      const params = {
        Cube: function () {

          scene.background = textureCube;

          sphereMaterial.envMap = textureCube;
          sphereMaterial.needsUpdate = true;

        },
        Equirectangular: function () {

          scene.background = textureEquirec;

          sphereMaterial.envMap = textureEquirec;
          sphereMaterial.needsUpdate = true;

        },
        Refraction: false
      };

      const gui = new GUI();
      gui.add( params, 'Cube' );
      gui.add( params, 'Equirectangular' );
      gui.add( params, 'Refraction' ).onChange( function ( value ) {

        if ( value ) {

          textureEquirec.mapping = THREE.EquirectangularRefractionMapping;
          textureCube.mapping = THREE.CubeRefractionMapping;

        } else {

          textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
          textureCube.mapping = THREE.CubeReflectionMapping;

        }

        sphereMaterial.needsUpdate = true;

      } );
      gui.open();

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

      render();

    }

    function render() {

      camera.lookAt( scene.position );
      renderer.render( scene, camera );

    }
  }
})