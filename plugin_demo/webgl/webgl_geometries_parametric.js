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

import * as Curves from 'three/addons/curves/CurveExtras.js';
import { ParametricGeometry } from './three/addons/geometries/ParametricGeometry.js';
import { ParametricGeometries } from './three/addons/geometries/ParametricGeometries.js';
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

      const container = document.getElementById( 'container' );

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
      camera.position.y = 400;

      scene = new THREE.Scene();

      //

      const ambientLight = new THREE.AmbientLight( 0xcccccc, 1.5 );
      scene.add( ambientLight );

      const pointLight = new THREE.PointLight( 0xffffff, 2.5, 0, 0 );
      camera.add( pointLight );
      scene.add( camera );

      //

      const map = new THREE.TextureLoader().load( 'textures/uv_grid_opengl.jpg' );
      map.wrapS = map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 16;
      map.colorSpace = THREE.SRGBColorSpace;

      const material = new THREE.MeshPhongMaterial( { map: map, side: THREE.DoubleSide } );

      //

      let geometry, object;

      geometry = new ParametricGeometry( ParametricGeometries.plane( 100, 100 ), 10, 10 );
      geometry.center();
      object = new THREE.Mesh( geometry, material );
      object.position.set( - 200, 0, 200 );
      scene.add( object );

      geometry = new ParametricGeometry( ParametricGeometries.klein, 20, 20 );
      object = new THREE.Mesh( geometry, material );
      object.position.set( 0, 0, 200 );
      object.scale.multiplyScalar( 5 );
      scene.add( object );

      geometry = new ParametricGeometry( ParametricGeometries.mobius, 20, 20 );
      object = new THREE.Mesh( geometry, material );
      object.position.set( 200, 0, 200 );
      object.scale.multiplyScalar( 30 );
      scene.add( object );

      //

      const GrannyKnot = new Curves.GrannyKnot();

      const torus = new ParametricGeometries.TorusKnotGeometry( 50, 10, 50, 20, 2, 3 );
      const sphere = new ParametricGeometries.SphereGeometry( 50, 20, 10 );
      const tube = new ParametricGeometries.TubeGeometry( GrannyKnot, 100, 3, 8, true );

      object = new THREE.Mesh( torus, material );
      object.position.set( - 200, 0, - 200 );
      scene.add( object );

      object = new THREE.Mesh( sphere, material );
      object.position.set( 0, 0, - 200 );
      scene.add( object );

      object = new THREE.Mesh( tube, material );
      object.position.set( 200, 0, - 200 );
      object.scale.multiplyScalar( 2 );
      scene.add( object );

      //

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );

      stats = new Stats();
      container.appendChild( stats.dom );

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      requestId = requestAnimationFrame( animate );

      render();
      stats.update();

    }

    function render() {

      const timer = Date.now() * 0.0001;

      camera.position.x = Math.cos( timer ) * 800;
      camera.position.z = Math.sin( timer ) * 800;

      camera.lookAt( scene.position );

      scene.traverse( function ( object ) {

        if ( object.isMesh === true ) {

          object.rotation.x = timer * 5;
          object.rotation.y = timer * 2.5;

        }

      } );

      renderer.render( scene, camera );

    }
  }
})