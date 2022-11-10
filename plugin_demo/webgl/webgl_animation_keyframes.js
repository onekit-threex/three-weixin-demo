import {
	document,
	window,
	requestAnimationFrame,
	cancelAnimationFrame,
	Event
} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import Stats from './jsm/libs/stats.module.js';

import {
	OrbitControls
} from './jsm/controls/OrbitControls.js';
import {
	RoomEnvironment
} from './jsm/environments/RoomEnvironment.js';

import {
	GLTFLoader
} from './jsm/loaders/GLTFLoader.js';
import {
	DRACOLoader
} from './jsm/loaders/DRACOLoader.js';
var requestId
Page({
	onUnload() {

		cancelAnimationFrame(requestId, this.canvas)
this.worker && this.worker.terminate()
		setTimeout(() => {
			if (this.renderer instanceof THREE.WebGLRenderer) {
				this.renderer.dispose()
				this.renderer.forceContextLoss()
				this.renderer.context = null
				this.renderer.domElement = null
				this.renderer = null
			}
		}, 0)
        
        this.dracoLoader.dispose()
	},
	    webgl_touch(e) {
        const web_e = Event.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
async onLoad() {
		const canvas3d = this.canvas =await document.createElementAsync("canvas", "webgl")
		var that = this
		let mixer, renderer;

		const clock = new THREE.Clock();
		const container = document.getElementById('container');

		const stats = new Stats();
		container.appendChild(stats.dom);
		this.renderer = renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d,			antialias: true
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.outputEncoding = THREE.sRGBEncoding;
		container.appendChild(renderer.domElement);

		const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const scene = new THREE.Scene();
  /////////////////////////////////
    var AmbientLight = new THREE.AmbientLight(0xffffff,1)
    AmbientLight.position.set(0, 0, 100)
    scene.add(AmbientLight)
    ///////////////////
/*
      var spotLight = new THREE.SpotLight(0xffffff, 1) //聚光灯
    spotLight.position.set(0, 0, 10)
    spotLight.lookAt(scene.position)
    scene.add(spotLight)
    //   
    
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1) //方向光
    directionalLight.position.set(0, 0, 10)
    directionalLight.lookAt(scene.position)
    scene.add(directionalLight)*/
/*
    var point = new THREE.PointLight(0xffffff, 1) //光源设置
    point.position.set(0, 0, 100) //点光源位置
    point.opacity = 1
    scene.add(point) //将光源添加到场景中*/
    //////////////////////
		scene.background = new THREE.Color(0xbfe3dd);
		scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

		const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
		camera.position.set(5, 2, 8);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.target.set(0, 0.5, 0);
		controls.update();
		controls.enablePan = false;
		controls.enableDamping = true;

		const dracoLoader = this.dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('js/libs/draco/gltf/');

		const loader = new GLTFLoader();
		loader.setDRACOLoader(dracoLoader);

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
		/*

        window.onresize = function () {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        };

*/
		function animate() {

		//	requestId = requestAnimationFrame(animate);

			const delta = clock.getDelta();

			mixer.update(delta);

			controls.update();

			// //stats.update();

			renderer.render(scene, camera);

		}

	}
})
