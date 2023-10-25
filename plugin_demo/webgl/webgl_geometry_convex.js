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
import { ConvexGeometry } from './three/addons/geometries/ConvexGeometry.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
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

  let group, camera, scene, renderer;

  init();
  animate();

  function init() {

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // camera

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 15, 20, 30 );
    scene.add( camera );

    // controls

    const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    // ambient light

    scene.add( new THREE.AmbientLight( 0x666666 ) );

    // point light

    const light = new THREE.PointLight( 0xffffff, 3, 0, 0 );
    camera.add( light );

    // helper

    scene.add( new THREE.AxesHelper( 20 ) );

    // textures

    const loader = new THREE.TextureLoader();
    const texture = loader.load( 'textures/sprites/disc.png' );
    texture.colorSpace = THREE.SRGBColorSpace;

    group = new THREE.Group();
    scene.add( group );

    // points

    let dodecahedronGeometry = new THREE.DodecahedronGeometry( 10 );

    // if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data

    dodecahedronGeometry.deleteAttribute( 'normal' );
    dodecahedronGeometry.deleteAttribute( 'uv' );

    dodecahedronGeometry = BufferGeometryUtils.mergeVertices( dodecahedronGeometry );

    const vertices = [];
    const positionAttribute = dodecahedronGeometry.getAttribute( 'position' );

    for ( let i = 0; i < positionAttribute.count; i ++ ) {

      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute( positionAttribute, i );
      vertices.push( vertex );

    }

    const pointsMaterial = new THREE.PointsMaterial( {
      color: 0x0080ff,
      map: texture,
      size: 1,
      alphaTest: 0.5
    } );

    const pointsGeometry = new THREE.BufferGeometry().setFromPoints( vertices );

    const points = new THREE.Points( pointsGeometry, pointsMaterial );
    group.add( points );

    // convex hull

    const meshMaterial = new THREE.MeshLambertMaterial( {
      color: 0xffffff,
      opacity: 0.5,
      side: THREE.DoubleSide,
      transparent: true
    } );

    const meshGeometry = new ConvexGeometry( vertices );

    const mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    group.add( mesh );

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

    group.rotation.y += 0.005;

    render();

  }

  function render() {

    renderer.render( scene, camera );

  }
  }
})