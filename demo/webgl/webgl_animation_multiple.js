import {
	document,
	window,
	requestAnimationFrame,
	cancelAnimationFrame,
	Event,
	core,
	performance
} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';


import {
	GLTFLoader
} from './jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from './jsm/utils/SkeletonUtils.js';

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
		},100)
	},
	webgl_touch(e) {
		const web_e = Event.fix(e)
		//window.dispatchEvent(web_e)
		//document.dispatchEvent(web_e)
		this.canvas.dispatchEvent(web_e)
	},
	async onLoad() {
		const canvas3d = this.canvas = await document.createElementAsync("canvas", "webgl")
		var that = this

		let camera, scene, renderer;
		let clock;

		const mixers = [];

		init();
		animate();

		function init() {

			camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
			camera.position.set(2, 3, -6);
			camera.lookAt(0, 1, 0);

			clock = new THREE.Clock();

			scene = new THREE.Scene();
			scene.background = new THREE.Color(0xa0a0a0);
			scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

			const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
			hemiLight.position.set(0, 20, 0);
			scene.add(hemiLight);

			const dirLight = new THREE.DirectionalLight(0xffffff);
			dirLight.position.set(-3, 10, -10);
			dirLight.castShadow = true;
			dirLight.shadow.camera.top = 4;
			dirLight.shadow.camera.bottom = -4;
			dirLight.shadow.camera.left = -4;
			dirLight.shadow.camera.right = 4;
			dirLight.shadow.camera.near = 0.1;
			dirLight.shadow.camera.far = 40;
			scene.add(dirLight);

			// scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

			// ground

			const mesh = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshPhongMaterial({
				color: 0x999999,
				depthWrite: false
			}));
			mesh.rotation.x = -Math.PI / 2;
			mesh.receiveShadow = true;
			scene.add(mesh);

			const loader = new GLTFLoader();
			loader.load('models/gltf/Soldier.glb', function (gltf) {

				gltf.scene.traverse(function (object) {

					if (object.isMesh) object.castShadow = true;

				});

				const model1 = SkeletonUtils.clone(gltf.scene);
				const model2 = SkeletonUtils.clone(gltf.scene);
				const model3 = SkeletonUtils.clone(gltf.scene);

				const mixer1 = new THREE.AnimationMixer(model1);
				const mixer2 = new THREE.AnimationMixer(model2);
				const mixer3 = new THREE.AnimationMixer(model3);

				mixer1.clipAction(gltf.animations[0]).play(); // idle
				mixer2.clipAction(gltf.animations[1]).play(); // run
				mixer3.clipAction(gltf.animations[3]).play(); // walk

				model1.position.x = -2;
				model2.position.x = 0;
				model3.position.x = 2;

				scene.add(model1, model2, model3);
				mixers.push(mixer1, mixer2, mixer3);

				animate();

			});

			renderer = that.renderer = new THREE.WebGLRenderer({
				canvas: canvas3d,
				antialias: true
			});
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.outputEncoding = THREE.sRGBEncoding;
			renderer.shadowMap.enabled = true;
			document.body.appendChild(renderer.domElement);

			window.addEventListener('resize', onWindowResize);

		}

		function onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);

		}

		function animate() {

			requestId = requestAnimationFrame(animate);

			const delta = clock.getDelta();

			for (const mixer of mixers) mixer.update(delta);

			renderer.render(scene, camera);

		}
	}
})
