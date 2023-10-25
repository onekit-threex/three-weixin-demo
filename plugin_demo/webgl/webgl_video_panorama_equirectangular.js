import {
  document,
  window,
  HTMLCanvasElement,
  HTMLVideoElement,
  requestAnimationFrame,
  cancelAnimationFrame,
  core,
  Event,
  Event0
} from "dhtml-weixin"
import * as THREE from './three/Three';
var requestId
Page({
  data: {
    onekit_path: getApp().onekit_path
  },
  onUnload() {
    cancelAnimationFrame(requestId, this.canvas)
    this.worker && this.worker.terminate()
    if (this.canvas) this.canvas = null
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
    const that = this
    let camera, scene, renderer;

    let isUserInteracting = false,
      lon = 0,
      lat = 0,
      phi = 0,
      theta = 0,
      onPointerDownPointerX = 0,
      onPointerDownPointerY = 0,
      onPointerDownLon = 0,
      onPointerDownLat = 0;

    const distance = .5;

    await init();
    animate();

    async function init() {

      const container = document.getElementById('container');

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .25, 10);

      scene = new THREE.Scene();

      const geometry = new THREE.SphereGeometry(5, 60, 40);
      // invert the geometry on the x-axis so that all of the faces point inward
      geometry.scale(-1, 1, 1);

      const video = new HTMLVideoElement(that.selectComponent("#video"))

      video.play() 
      const texture = new THREE.VideoTexture(video);
      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({
        map: texture
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      document.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);

      //

      window.addEventListener('resize', onWindowResize);

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function onPointerDown(event) {

      isUserInteracting = true;

      onPointerDownPointerX = event.clientX;
      onPointerDownPointerY = event.clientY;

      onPointerDownLon = lon;
      onPointerDownLat = lat;

    }

    function onPointerMove(event) {

      if (isUserInteracting === true) {

        lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (onPointerDownPointerY - event.clientY) * 0.1 + onPointerDownLat;

      }

    }

    function onPointerUp() {

      isUserInteracting = false;

    }

    function animate() {

      requestId = requestAnimationFrame(animate);
      update();

    }

    function update() {

      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
      camera.position.y = distance * Math.cos(phi);
      camera.position.z = distance * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

    }
  }
})