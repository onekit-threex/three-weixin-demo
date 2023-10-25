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
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { SUBTRACTION, INTERSECTION, ADDITION, Brush, Evaluator } from 'three/3rd/three-bvh-csg';
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

  let stats;
  let camera, scene, renderer;
  let baseBrush, brush;
  let core;
  let result, evaluator, wireframe;

  const params = {

    operation: SUBTRACTION,
    useGroups: true,
    wireframe: false,

  };

  init();
  animate();

  function init() {

    // environment
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100 );
    camera.position.set( - 1, 1, 1 ).normalize().multiplyScalar( 10 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xfce4ec );

    // lights
    const ambient = new THREE.HemisphereLight( 0xffffff, 0xbfd4d2, 3 );
    scene.add( ambient );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.3 );
    directionalLight.position.set( 1, 4, 3 ).multiplyScalar( 3 );
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.setScalar( 2048 );
    directionalLight.shadow.bias = - 1e-4;
    directionalLight.shadow.normalBias = 1e-4;
    scene.add( directionalLight );

    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild( renderer.domElement );

    stats = new Stats();
    document.body.appendChild( stats.dom );

    // add shadow plane
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(),
      new THREE.ShadowMaterial( {
        color: 0xd81b60,
        transparent: true,
        opacity: 0.075,
        side: THREE.DoubleSide,
      } ),
    );
    plane.position.y = - 3;
    plane.rotation.x = - Math.PI / 2;
    plane.scale.setScalar( 10 );
    plane.receiveShadow = true;
    scene.add( plane );

    // create brushes
    evaluator = new Evaluator();

    baseBrush = new Brush(
      new THREE.IcosahedronGeometry( 2, 3 ),
      new THREE.MeshStandardMaterial( {
        flatShading: true,

        polygonOffset: true,
        polygonOffsetUnits: 1,
        polygonOffsetFactor: 1,
      } ),
    );

    brush = new Brush(
      new THREE.CylinderGeometry( 1, 1, 5, 45 ),
      new THREE.MeshStandardMaterial( {
        color: 0x80cbc4,

        polygonOffset: true,
        polygonOffsetUnits: 1,
        polygonOffsetFactor: 1,

      } ),
    );

    core = new Brush(
      new THREE.IcosahedronGeometry( 0.15, 1 ),
      new THREE.MeshStandardMaterial( {
        flatShading: true,
        color: 0xff9800,
        emissive: 0xff9800,
        emissiveIntensity: 0.35,

        polygonOffset: true,
        polygonOffsetUnits: 1,
        polygonOffsetFactor: 1,

      } ),
    );
    core.castShadow = true;
    scene.add( core );

    // create wireframe
    wireframe = new THREE.Mesh(
      undefined,
      new THREE.MeshBasicMaterial( { color: 0x009688, wireframe: true } ),
    );
    scene.add( wireframe );

    // controls
    const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    controls.minDistance = 5;
    controls.maxDistance = 75;

    // set up gui
    const gui = new GUI();
    gui.add( params, 'operation', { SUBTRACTION, INTERSECTION, ADDITION } );
    gui.add( params, 'wireframe' );
    gui.add( params, 'useGroups' );

    window.addEventListener( 'resize', onWindowResize );
    onWindowResize();

  }

  function updateCSG() {

    evaluator.useGroups = params.useGroups;
    result = evaluator.evaluate( baseBrush, brush, params.operation, result );

    result.castShadow = true;
    result.receiveShadow = true;
    scene.add( result );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function animate() {

    requestId = requestAnimationFrame( animate );

    // update the transforms
    const t = window.performance.now() + 9000;
    baseBrush.rotation.x = t * 0.0001;
    baseBrush.rotation.y = t * 0.00025;
    baseBrush.rotation.z = t * 0.0005;
    baseBrush.updateMatrixWorld();

    brush.rotation.x = t * - 0.0002;
    brush.rotation.y = t * - 0.0005;
    brush.rotation.z = t * - 0.001;

    const s = 0.5 + 0.5 * ( 1 + Math.sin( t * 0.001 ) );
    brush.scale.set( s, 1, s );
    brush.updateMatrixWorld();

    // update the csg
    updateCSG();

    wireframe.geometry = result.geometry;
    wireframe.visible = params.wireframe;

    renderer.render( scene, camera );
    stats.update();

  }

  }
})