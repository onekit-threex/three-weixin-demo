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

import TWEEN from './three/addons/libs/tween.module.js';
import {
  ColladaLoader
} from './three/addons/loaders/ColladaLoader.js';
var requestId
Page({
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
  webgl_touch(e) {
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

    let container, stats;

    let camera, scene, renderer;
    let dae;

    let kinematics;
    let kinematicsTween;
    const tweenParameters = {};

    const loader = new ColladaLoader();
    loader.load('./models/collada/abb_irb52_7_120.dae', function (collada) {

      dae = collada.scene;

      dae.traverse(function (child) {

        if (child.isMesh) {

          // model does not have normals
          child.material.flatShading = true;

        }

      });

      dae.scale.x = dae.scale.y = dae.scale.z = 10.0;
      dae.updateMatrix();

      kinematics = collada.kinematics;

      init();
      animate();

    });

    function init() {

      container = document.createElement('div');
      document.body.appendChild(container);

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
      camera.position.set(2, 2, 3);

      scene = new THREE.Scene();

      // Grid

      const grid = new THREE.GridHelper(20, 20, 0xc1c1c1, 0x8d8d8d);
      scene.add(grid);

      // Add the COLLADA

      scene.add(dae);

      // Lights

      const light = new THREE.HemisphereLight(0xfff7f7, 0x494966, 3);
      scene.add(light);

      renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      stats = new Stats();
      container.appendChild(stats.dom);

      setupTween();

      //

      window.addEventListener('resize', onWindowResize);

    }

    function setupTween() {

      const duration = THREE.MathUtils.randInt(1000, 5000);

      const target = {};

      for (const prop in kinematics.joints) {

        if (kinematics.joints.hasOwnProperty(prop)) {
          if (!kinematics.joints[prop].static) {

            const joint = kinematics.joints[prop];

            const old = tweenParameters[prop];

            const position = old ? old : joint.zeroPosition;

            tweenParameters[prop] = position;

            target[prop] = THREE.MathUtils.randInt(joint.limits.min, joint.limits.max);

          }

        }

      }

      kinematicsTween = new TWEEN.Tween(tweenParameters).to(target, duration).easing(TWEEN.Easing.Quadratic.Out);

      kinematicsTween.onUpdate(function (object) {

        for (const prop in kinematics.joints) {

          if (kinematics.joints.hasOwnProperty(prop)) {

            if (!kinematics.joints[prop].static) {
              kinematics.setJointValue(prop, object[prop]);


            }

          }

        }

      });

      kinematicsTween.start();

      setTimeout(setupTween, duration);

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

    }

    //

    function animate() {

      requestId = requestAnimationFrame(animate);

      render();
      stats.update();
      TWEEN.update();

    }

    function render() {

      const timer = Date.now() * 0.0001;

      camera.position.x = Math.cos(timer) * 20;
      camera.position.y = 10;
      camera.position.z = Math.sin(timer) * 20;

      camera.lookAt(0, 5, 0);

      renderer.render(scene, camera);

    }
  }
})