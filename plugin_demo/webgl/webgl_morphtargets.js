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

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';

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
    let container, camera, scene, renderer, mesh;

    init();

    function init() {

      container = document.getElementById( 'container' );

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0x8FBCD4 );

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 20 );
      camera.position.z = 10;
      scene.add( camera );

      scene.add( new THREE.AmbientLight( 0x8FBCD4, 1.5 ) );

      const pointLight = new THREE.PointLight( 0xffffff, 200 );
      camera.add( pointLight );

      const geometry = createGeometry();

      const material = new THREE.MeshPhongMaterial( {
        color: 0xff0000,
        flatShading: true
      } );

      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      initGUI();

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setAnimationLoop( function () {

        renderer.render( scene, camera );

      } );
      container.appendChild( renderer.domElement );

      const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.enableZoom = false;

      window.addEventListener( 'resize', onWindowResize );

    }

    function createGeometry() {

      const geometry = new THREE.BoxGeometry( 2, 2, 2, 32, 32, 32 );

      // create an empty array to  hold targets for the attribute we want to morph
      // morphing positions and normals is supported
      geometry.morphAttributes.position = [];

      // the original positions of the cube's vertices
      const positionAttribute = geometry.attributes.position;

      // for the first morph target we'll move the cube's vertices onto the surface of a sphere
      const spherePositions = [];

      // for the second morph target, we'll twist the cubes vertices
      const twistPositions = [];
      const direction = new THREE.Vector3( 1, 0, 0 );
      const vertex = new THREE.Vector3();

      for ( let i = 0; i < positionAttribute.count; i ++ ) {

        const x = positionAttribute.getX( i );
        const y = positionAttribute.getY( i );
        const z = positionAttribute.getZ( i );

        spherePositions.push(

          x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
          y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
          z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) )

        );

        // stretch along the x-axis so we can see the twist better
        vertex.set( x * 2, y, z );

        vertex.applyAxisAngle( direction, Math.PI * x / 2 ).toArray( twistPositions, twistPositions.length );

      }

      // add the spherical positions as the first morph target
      geometry.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( spherePositions, 3 );

      // add the twisted positions as the second morph target
      geometry.morphAttributes.position[ 1 ] = new THREE.Float32BufferAttribute( twistPositions, 3 );

      return geometry;

    }

    function initGUI() {

      // Set up dat.GUI to control targets
      const params = {
        Spherify: 0,
        Twist: 0,
      };
      const gui = new GUI( { title: 'Morph Targets' } );

      gui.add( params, 'Spherify', 0, 1 ).step( 0.01 ).onChange( function ( value ) {

        mesh.morphTargetInfluences[ 0 ] = value;

      } );
      gui.add( params, 'Twist', 0, 1 ).step( 0.01 ).onChange( function ( value ) {

        mesh.morphTargetInfluences[ 1 ] = value;

      } );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }
  }
})