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
import { Water } from 'three/addons/objects/Water2.js';
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

    let scene, camera, clock, renderer, water;

    let torusKnot;

    const params = {
      color: '#ffffff',
      scale: 4,
      flowX: 1,
      flowY: 1
    };

    init();
    animate();

    function init() {

      // scene

      scene = new THREE.Scene();

      // camera

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 200 );
      camera.position.set( - 15, 7, 15 );
      camera.lookAt( scene.position );

      // clock

      clock = new THREE.Clock();

      // mesh

      const torusKnotGeometry = new THREE.TorusKnotGeometry( 3, 1, 256, 32 );
      const torusKnotMaterial = new THREE.MeshNormalMaterial();

      torusKnot = new THREE.Mesh( torusKnotGeometry, torusKnotMaterial );
      torusKnot.position.y = 4;
      torusKnot.scale.set( 0.5, 0.5, 0.5 );
      scene.add( torusKnot );

      // ground

      const groundGeometry = new THREE.PlaneGeometry( 20, 20 );
      const groundMaterial = new THREE.MeshStandardMaterial( { roughness: 0.8, metalness: 0.4 } );
      const ground = new THREE.Mesh( groundGeometry, groundMaterial );
      ground.rotation.x = Math.PI * - 0.5;
      scene.add( ground );

      const textureLoader = new THREE.TextureLoader();
      textureLoader.load( 'textures/hardwood2_diffuse.jpg', function ( map ) {

        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 16;
        map.repeat.set( 4, 4 );
        map.colorSpace = THREE.SRGBColorSpace;
        groundMaterial.map = map;
        groundMaterial.needsUpdate = true;

      } );

      // water

      const waterGeometry = new THREE.PlaneGeometry( 20, 20 );

      water = new Water( waterGeometry, {
        color: params.color,
        scale: params.scale,
        flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
        textureWidth: 1024,
        textureHeight: 1024
      } );

      water.position.y = 1;
      water.rotation.x = Math.PI * - 0.5;
      scene.add( water );

      // skybox

      const cubeTextureLoader = new THREE.CubeTextureLoader();
      cubeTextureLoader.setPath( 'textures/cube/Park2/' );

      const cubeTexture = cubeTextureLoader.load( [
        'posx.jpg', 'negx.jpg',
        'posy.jpg', 'negy.jpg',
        'posz.jpg', 'negz.jpg'
      ] );

      scene.background = cubeTexture;

      // light

      const ambientLight = new THREE.AmbientLight( 0xe7e7e7, 1.2 );
      scene.add( ambientLight );

      const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
      directionalLight.position.set( - 1, 1, 1 );
      scene.add( directionalLight );

      // renderer

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setPixelRatio( window.devicePixelRatio );
      document.body.appendChild( renderer.domElement );

      // gui

      const gui = new GUI();

      gui.addColor( params, 'color' ).onChange( function ( value ) {

        water.material.uniforms[ 'color' ].value.set( value );

      } );
      gui.add( params, 'scale', 1, 10 ).onChange( function ( value ) {

        water.material.uniforms[ 'config' ].value.w = value;

      } );
      gui.add( params, 'flowX', - 1, 1 ).step( 0.01 ).onChange( function ( value ) {

        water.material.uniforms[ 'flowDirection' ].value.x = value;
        water.material.uniforms[ 'flowDirection' ].value.normalize();

      } );
      gui.add( params, 'flowY', - 1, 1 ).step( 0.01 ).onChange( function ( value ) {

        water.material.uniforms[ 'flowDirection' ].value.y = value;
        water.material.uniforms[ 'flowDirection' ].value.normalize();

      } );

      gui.open();

      //

      const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.minDistance = 5;
      controls.maxDistance = 50;

      //

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      requestId = requestAnimationFrame( animate );

      render();

    }

    function render() {

      const delta = clock.getDelta();

      torusKnot.rotation.x += delta;
      torusKnot.rotation.y += delta * 0.5;

      renderer.render( scene, camera );

    }
  }
})