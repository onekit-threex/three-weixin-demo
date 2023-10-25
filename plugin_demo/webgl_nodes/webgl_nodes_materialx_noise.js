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
import { MeshPhysicalNodeMaterial, normalWorld, timerLocal, mx_noise_vec3, mx_worley_noise_vec3, mx_cell_noise_float, mx_fractal_noise_vec3 } from './three/addons/nodes/Nodes.js';

import { nodeFrame } from 'three/addons/renderers/webgl-legacy/nodes/WebGLNodes.js';

import Stats from 'three/addons/libs/stats.module.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';
import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js';

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

    let camera, scene, renderer;

    let particleLight;
    let group;

    init();
    animate();

    function init() {

      container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 1000 );
      camera.position.z = 100;

      scene = new THREE.Scene();

      group = new THREE.Group();
      scene.add( group );

      new HDRCubeTextureLoader()
        .setPath( 'textures/cube/pisaHDR/' )
        .load( [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ],
          function ( hdrTexture ) {

            const geometry = new THREE.SphereGeometry( 8, 64, 32 );

            const offsetNode = timerLocal();
            const customUV = normalWorld.mul( 10 ).add( offsetNode );

            // left top

            let material = new MeshPhysicalNodeMaterial();
            material.colorNode = mx_noise_vec3( customUV );

            let mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = - 10;
            mesh.position.y = 10;
            group.add( mesh );

            // right top

            material = new MeshPhysicalNodeMaterial();
            material.colorNode = mx_cell_noise_float( customUV );

            mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = 10;
            mesh.position.y = 10;
            group.add( mesh );

            // left bottom

            material = new MeshPhysicalNodeMaterial();
            material.colorNode = mx_worley_noise_vec3( customUV );

            mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = - 10;
            mesh.position.y = - 10;
            group.add( mesh );

            // right bottom

            material = new MeshPhysicalNodeMaterial();
            material.colorNode = mx_fractal_noise_vec3( customUV.mul( .2 ) );

            mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = 10;
            mesh.position.y = - 10;
            group.add( mesh );

            //

            scene.background = hdrTexture;
            scene.environment = hdrTexture;

          }

        );

      // LIGHTS

      particleLight = new THREE.Mesh(
        new THREE.SphereGeometry( 0.4, 8, 8 ),
        new THREE.MeshBasicMaterial( { color: 0xffffff } )
      );
      scene.add( particleLight );

      particleLight.add( new THREE.PointLight( 0xffffff, 1000 ) );

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );

      //

      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;

      //


      //

      stats = new Stats();
      container.appendChild( stats.dom );

      // EVENTS

      new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );

      window.addEventListener( 'resize', onWindowResize );

    }

    //

    function onWindowResize() {

      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize( width, height );

    }

    //

    function animate() {

      requestId = requestAnimationFrame( animate );

      nodeFrame.update();

      render();

      stats.update();

    }

    function render() {

      const timer = Date.now() * 0.00025;

      particleLight.position.x = Math.sin( timer * 7 ) * 30;
      particleLight.position.y = Math.cos( timer * 5 ) * 40;
      particleLight.position.z = Math.cos( timer * 3 ) * 30;

      for ( let i = 0; i < group.children.length; i ++ ) {

        const child = group.children[ i ];
        child.rotation.y += 0.005;

      }

      renderer.render( scene, camera );

    }

  }
})