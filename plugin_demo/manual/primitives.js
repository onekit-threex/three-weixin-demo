import {
	document,
	window,
	requestAnimationFrame,
	cancelAnimationFrame,
	Event0
} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import Stats from './jsm/libs/stats.module.js';

import {
	OrbitControls
} from './jsm/controls/OrbitControls0.js';
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
        const web_e = Event0.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
onLoad() {
    document.createElementAsync("canvas", "webgl").then(canvas=>this.run(canvas).then())
},
async run(canvas3d){
	/*
this.canvas = canvas3d
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


			animate();

		}, undefined, function (e) {

			console.error(e);

		});
		function animate() {


			const delta = clock.getDelta();

			mixer.update(delta);

			controls.update();

			// //stats.update();

			renderer.render(scene, camera);

		}
*/
	}
})
