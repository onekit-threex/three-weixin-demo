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
import { Refractor } from 'three/addons/objects/Refractor.js';
import { WaterRefractionShader } from 'three/addons/shaders/WaterRefractionShader.js';

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
    let camera, scene, renderer, clock;

    let refractor, smallSphere;

    init();

    function init() {

      const container = document.getElementById( 'container' );

      clock = new THREE.Clock();

      // renderer
      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );

      // scene
      scene = new THREE.Scene();

      // camera
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
      camera.position.set( 0, 75, 160 );

      const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.target.set( 0, 40, 0 );
      controls.maxDistance = 400;
      controls.minDistance = 10;
      controls.update();

      // refractor

      const refractorGeometry = new THREE.PlaneGeometry( 90, 90 );

      refractor = new Refractor( refractorGeometry, {
        color: 0xcbcbcb,
        textureWidth: 1024,
        textureHeight: 1024,
        shader: WaterRefractionShader
      } );

      refractor.position.set( 0, 50, 0 );

      scene.add( refractor );

      // load dudv map for distortion effect

      const dudvMap = new THREE.TextureLoader().load( 'textures/waterdudv.jpg', function () {

        animate();

      } );

      dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;
      refractor.material.uniforms.tDudv.value = dudvMap;

      //

      const geometry = new THREE.IcosahedronGeometry( 5, 0 );
      const material = new THREE.MeshPhongMaterial( { color: 0xffffff, emissive: 0x333333, flatShading: true } );
      smallSphere = new THREE.Mesh( geometry, material );
      scene.add( smallSphere );

      // walls
      const planeGeo = new THREE.PlaneGeometry( 100.1, 100.1 );

      const planeTop = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
      planeTop.position.y = 100;
      planeTop.rotateX( Math.PI / 2 );
      scene.add( planeTop );

      const planeBottom = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
      planeBottom.rotateX( - Math.PI / 2 );
      scene.add( planeBottom );

      const planeBack = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x7f7fff } ) );
      planeBack.position.z = - 50;
      planeBack.position.y = 50;
      scene.add( planeBack );

      const planeRight = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x00ff00 } ) );
      planeRight.position.x = 50;
      planeRight.position.y = 50;
      planeRight.rotateY( - Math.PI / 2 );
      scene.add( planeRight );

      const planeLeft = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xff0000 } ) );
      planeLeft.position.x = - 50;
      planeLeft.position.y = 50;
      planeLeft.rotateY( Math.PI / 2 );
      scene.add( planeLeft );

      // lights
      const mainLight = new THREE.PointLight( 0xe7e7e7, 2.5, 250, 0 );
      mainLight.position.y = 60;
      scene.add( mainLight );

      const greenLight = new THREE.PointLight( 0x00ff00, 0.5, 1000, 0 );
      greenLight.position.set( 550, 50, 0 );
      scene.add( greenLight );

      const redLight = new THREE.PointLight( 0xff0000, 0.5, 1000, 0 );
      redLight.position.set( - 550, 50, 0 );
      scene.add( redLight );

      const blueLight = new THREE.PointLight( 0xbbbbfe, 0.5, 1000, 0 );
      blueLight.position.set( 0, 50, 550 );
      scene.add( blueLight );

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      requestId = requestAnimationFrame( animate );

      const time = clock.getElapsedTime();

      refractor.material.uniforms.time.value = time;

      smallSphere.position.set(
        Math.cos( time ) * 30,
        Math.abs( Math.cos( time * 2 ) ) * 20 + 5,
        Math.sin( time ) * 30
      );
      smallSphere.rotation.y = ( Math.PI / 2 ) - time;
      smallSphere.rotation.z = time * 8;

      renderer.render( scene, camera );

    }
  }
})