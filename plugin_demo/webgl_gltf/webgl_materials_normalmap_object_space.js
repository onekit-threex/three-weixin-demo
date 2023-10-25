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
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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
    let renderer, scene, camera;

    init();

    function init() {

      // renderer
      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );


      // scene
      scene = new THREE.Scene();

      // camera
      camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
      camera.position.set( - 10, 0, 23 );
      scene.add( camera );

      // controls
      const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.addEventListener( 'change', render );
      controls.minDistance = 10;
      controls.maxDistance = 50;
      controls.enablePan = false;

      // ambient
      scene.add( new THREE.AmbientLight( 0xffffff, 0.6 ) );

      // light
      const light = new THREE.PointLight( 0xffffff, 4.5, 0, 0 );
      camera.add( light );

      // model
      new GLTFLoader().load( 'models/gltf/Nefertiti/Nefertiti.glb', function ( gltf ) {

        gltf.scene.traverse( function ( child ) {

          if ( child.isMesh ) {

            // glTF currently supports only tangent-space normal maps.
            // this model has been modified to demonstrate the use of an object-space normal map.

            child.material.normalMapType = THREE.ObjectSpaceNormalMap;

            // attribute normals are not required with an object-space normal map. remove them.

            child.geometry.deleteAttribute( 'normal' );

            //

            child.material.side = THREE.DoubleSide;

            child.scale.multiplyScalar( 0.5 );

            // recenter

            new THREE.Box3().setFromObject( child ).getCenter( child.position ).multiplyScalar( - 1 );

            scene.add( child );

          }

        } );

        render();

      } );


      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      renderer.setSize( window.innerWidth, window.innerHeight );

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      render();

    }

    function render() {

      renderer.render( scene, camera );

    }
  }
})