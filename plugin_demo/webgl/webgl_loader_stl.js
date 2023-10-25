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

import { STLLoader } from './three/addons/loaders/STLLoader.js';
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

    let container, stats;

    let camera, cameraTarget, scene, renderer;

    init();
    animate();

    function init() {

      container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
      camera.position.set( 3, 0.15, 3 );

      cameraTarget = new THREE.Vector3( 0, - 0.25, 0 );

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0x72645b );
      scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

      // Ground

      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry( 40, 40 ),
        new THREE.MeshPhongMaterial( { color: 0xcbcbcb, specular: 0x474747 } )
      );
      plane.rotation.x = - Math.PI / 2;
      plane.position.y = - 0.5;
      scene.add( plane );

      plane.receiveShadow = true;


      // ASCII file

      const loader = new STLLoader();
      loader.load( './models/stl/ascii/slotted_disk.stl', function ( geometry ) {

        const material = new THREE.MeshPhongMaterial( { color: 0xff9c7c, specular: 0x494949, shininess: 200 } );
        const mesh = new THREE.Mesh( geometry, material );

        mesh.position.set( 0, - 0.25, 0.6 );
        mesh.rotation.set( 0, - Math.PI / 2, 0 );
        mesh.scale.set( 0.5, 0.5, 0.5 );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add( mesh );

      } );


      // Binary files

      const material = new THREE.MeshPhongMaterial( { color: 0xd5d5d5, specular: 0x494949, shininess: 200 } );

      loader.load( './models/stl/binary/pr2_head_pan.stl', function ( geometry ) {

        const mesh = new THREE.Mesh( geometry, material );

        mesh.position.set( 0, - 0.37, - 0.6 );
        mesh.rotation.set( - Math.PI / 2, 0, 0 );
        mesh.scale.set( 2, 2, 2 );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add( mesh );

      } );

      loader.load( './models/stl/binary/pr2_head_tilt.stl', function ( geometry ) {

        const mesh = new THREE.Mesh( geometry, material );

        mesh.position.set( 0.136, - 0.37, - 0.6 );
        mesh.rotation.set( - Math.PI / 2, 0.3, 0 );
        mesh.scale.set( 2, 2, 2 );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add( mesh );

      } );

      // Colored binary STL
      loader.load( './models/stl/binary/colored.stl', function ( geometry ) {

        let meshMaterial = material;

        if ( geometry.hasColors ) {

          meshMaterial = new THREE.MeshPhongMaterial( { opacity: geometry.alpha, vertexColors: true } );

        }

        const mesh = new THREE.Mesh( geometry, meshMaterial );

        mesh.position.set( 0.5, 0.2, 0 );
        mesh.rotation.set( - Math.PI / 2, Math.PI / 2, 0 );
        mesh.scale.set( 0.3, 0.3, 0.3 );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add( mesh );

      } );


      // Lights

      scene.add( new THREE.HemisphereLight( 0x8d7c7c, 0x494966, 3 ) );

      addShadowedLight( 1, 1, 1, 0xffffff, 3.5 );
      addShadowedLight( 0.5, 1, - 1, 0xffd500, 3 );
      // renderer

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );

      renderer.shadowMap.enabled = true;

      container.appendChild( renderer.domElement );

      // stats

      stats = new Stats();
      container.appendChild( stats.dom );

      //

      window.addEventListener( 'resize', onWindowResize );

    }

    function addShadowedLight( x, y, z, color, intensity ) {

      const directionalLight = new THREE.DirectionalLight( color, intensity );
      directionalLight.position.set( x, y, z );
      scene.add( directionalLight );

      directionalLight.castShadow = true;

      const d = 1;
      directionalLight.shadow.camera.left = - d;
      directionalLight.shadow.camera.right = d;
      directionalLight.shadow.camera.top = d;
      directionalLight.shadow.camera.bottom = - d;

      directionalLight.shadow.camera.near = 1;
      directionalLight.shadow.camera.far = 4;

      directionalLight.shadow.bias = - 0.002;

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

      const timer = Date.now() * 0.0005;

      camera.position.x = Math.cos( timer ) * 3;
      camera.position.z = Math.sin( timer ) * 3;

      camera.lookAt( cameraTarget );

      renderer.render( scene, camera );

    }
  }
})