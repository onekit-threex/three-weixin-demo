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

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

import { GLTFLoader } from './three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from './three/addons/loaders/DRACOLoader.js';
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
		let mixer;

		const clock = new THREE.Clock();
		const container = document.getElementById('container');

		const stats = new Stats();
    container.appendChild(stats.dom);
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    const scene = new THREE.Scene();
    		var AmbientLight = new THREE.AmbientLight(0xffffff,1)
		scene.add(AmbientLight)
		///////////////////
		/*
		      var spotLight = new THREE.SpotLight(0xaaaaaa, 1) //聚光灯
		    spotLight.position.set(0, 0, 10)
		    spotLight.lookAt(scene.position)
		    scene.add(spotLight)*/
		//   

		var directionalLight = new THREE.DirectionalLight(0xffffff, 1) //方向光
		directionalLight.position.set(0, 0, 10)
		directionalLight.lookAt(scene.position)
    scene.add(directionalLight)
    
    scene.background = new THREE.Color( 0xbfe3dd );
    scene.environment = pmremGenerator.fromScene( new RoomEnvironment( renderer ), 0.04 ).texture;


		const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
		camera.position.set(5, 2, 8);

		const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)(camera, renderer.domElement);
		controls.target.set(0, 0.5, 0);
		controls.update();
		controls.enablePan = true;
		controls.enableDamping = true;

		const dracoLoader = this.dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

		const loader = new GLTFLoader();
		loader.setDRACOLoader(dracoLoader);

		//loader.load('https://statics.jiuqianqu.com/btwc-file/20230222/1677055512471.glb', function (gltf) {
		loader.load('models/gltf/LittlestTokyo.glb', function (gltf) {
			//console.error("xxxxxxx",gltf)
			/*  gltf.scene.traverse(function (child) {
			      if (child.isMesh) {
			          child.frustumCulled = false;
			          //模型阴影
			          child.castShadow = true;
			          //模型自发光
			      	child.material.emissive = child.material.color;
			          child.material.emissiveMap = child.material.map;
			      }
			  })*/

			const model = gltf.scene;
			model.position.set(1, 1, 0);
			model.scale.set(0.01, 0.01, 0.01);
			scene.add(model);

			mixer = new THREE.AnimationMixer(model);
			mixer.clipAction(gltf.animations[0]).play();

			animate();

		}, undefined, function (e) {

			console.error(e);

		});


		window.onresize = function () {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);

		};


		function animate() {

			requestId = requestAnimationFrame(animate);

			const delta = clock.getDelta();

			mixer.update(delta);

			controls.update();

			// //stats.update();

			renderer.render(scene, camera);

		}
  }
})