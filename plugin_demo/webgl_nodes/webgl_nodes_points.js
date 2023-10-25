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
import { attribute, timerLocal, positionLocal, spritesheetUV, pointUV, vec2, texture, uniform, mix, PointsNodeMaterial } from './three/addons/nodes/Nodes.js';

import Stats from 'three/addons/libs/stats.module.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { TeapotGeometry } from './three/addons/geometries/TeapotGeometry.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';

import { nodeFrame } from 'three/addons/renderers/webgl-legacy/nodes/WebGLNodes.js';

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
  let camera, scene, renderer, stats;

  init();
  animate();

  function init() {

    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 2, 2000 );
    camera.position.x = 0;
    camera.position.y = 100;
    camera.position.z = - 300;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x000000, 0.001 );

    // geometries

    const teapotGeometry = new TeapotGeometry( 50, 7 );
    const sphereGeometry = new THREE.SphereGeometry( 50, 130, 16 );

    const geometry = new THREE.BufferGeometry();

    // buffers

    const speed = [];
    const intensity = [];
    const size = [];

    const positionAttribute = teapotGeometry.getAttribute( 'position' );
    const particleCount = positionAttribute.count;

    for ( let i = 0; i < particleCount; i ++ ) {

      speed.push( 20 + Math.random() * 50 );

      intensity.push( Math.random() * .04 );

      size.push( 30 + Math.random() * 230 );

    }

    geometry.setAttribute( 'position', positionAttribute );
    geometry.setAttribute( 'targetPosition', sphereGeometry.getAttribute( 'position' ) );
    geometry.setAttribute( 'particleSpeed', new THREE.Float32BufferAttribute( speed, 1 ) );
    geometry.setAttribute( 'particleIntensity', new THREE.Float32BufferAttribute( intensity, 1 ) );
    geometry.setAttribute( 'particleSize', new THREE.Float32BufferAttribute( size, 1 ) );

    // maps

    // Forked from: https://answers.unrealengine.com/questions/143267/emergency-need-help-with-fire-fx-weird-loop.html

    const fireMap = new THREE.TextureLoader().load( 'textures/sprites/firetorch_1.jpg' );
    fireMap.colorSpace = THREE.SRGBColorSpace;

    // nodes

    const targetPosition = attribute( 'targetPosition', 'vec3' );
    const particleSpeed = attribute( 'particleSpeed', 'float' );
    const particleIntensity = attribute( 'particleIntensity', 'float' );
    const particleSize = attribute( 'particleSize', 'float' );

    const time = timerLocal();

    const fireUV = spritesheetUV(
      vec2( 6, 6 ), // count
      pointUV, // uv
      time.mul( particleSpeed ) // current frame
    );

    const fireSprite = texture( fireMap, fireUV );
    const fire = fireSprite.mul( particleIntensity );

    const lerpPosition = uniform( 0 );

    const positionNode = mix( positionLocal, targetPosition, lerpPosition );

    // material

    const material = new PointsNodeMaterial( {
      depthWrite: false,
      transparent: true,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    } );

    material.colorNode = fire;
    material.sizeNode = particleSize;
    material.positionNode = positionNode;

    const particles = new THREE.Points( geometry, material );
    scene.add( particles );

    // renderer

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // stats

    stats = new Stats();
    document.body.appendChild( stats.dom );

    // gui

    const gui = new GUI();
    const guiNode = { lerpPosition: 0 };

    gui.add( material, 'sizeAttenuation' ).onChange( function () {

      material.needsUpdate = true;

    } );

    gui.add( guiNode, 'lerpPosition', 0, 1 ).onChange( function () {

      lerpPosition.value = guiNode.lerpPosition;

    } );

    gui.open();

    // controls

    const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    controls.maxDistance = 1000;
    controls.update();

    // events

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
    stats.update();

  }

  function render() {

    nodeFrame.update();

    renderer.render( scene, camera );

  }
  }
})