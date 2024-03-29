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
    let camera, scene, renderer, stats;

    init();
    animate();

    function init() {

      camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 0.1, 100 );
      camera.position.z = 20;

      scene = new THREE.Scene();

      const loader = new GLTFLoader();
      loader.load( 'models/gltf/LeePerrySmith/LeePerrySmith.glb', function ( gltf ) {

        const geometry = gltf.scene.children[ 0 ].geometry;

        let mesh = new THREE.Mesh( geometry, buildTwistMaterial( 2.0 ) );
        mesh.position.x = - 3.5;
        mesh.position.y = - 0.5;
        scene.add( mesh );

        mesh = new THREE.Mesh( geometry, buildTwistMaterial( - 2.0 ) );
        mesh.position.x = 3.5;
        mesh.position.y = - 0.5;
        scene.add( mesh );

      } );

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.minDistance = 10;
      controls.maxDistance = 50;

      //

      stats = new Stats();
      document.body.appendChild( stats.dom );

      // EVENTS

      window.addEventListener( 'resize', onWindowResize );

    }

    function buildTwistMaterial( amount ) {

      const material = new THREE.MeshNormalMaterial();
      material.onBeforeCompile = function ( shader ) {

        shader.uniforms.time = { value: 0 };

        shader.vertexShader = 'uniform float time;\n' + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          [
            `float theta = sin( time + position.y ) / ${ amount.toFixed( 1 ) };`,
            'float c = cos( theta );',
            'float s = sin( theta );',
            'mat3 m = mat3( c, 0, s, 0, 1, 0, -s, 0, c );',
            'vec3 transformed = vec3( position ) * m;',
            'vNormal = vNormal * m;'
          ].join( '\n' )
        );

        material.userData.shader = shader;

      };

      // Make sure WebGLRenderer doesnt reuse a single program

      material.customProgramCacheKey = function () {

        return amount.toFixed( 1 );

      };

      return material;

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

      render();

      stats.update();

    }

    function render() {

      scene.traverse( function ( child ) {

        if ( child.isMesh ) {

          const shader = child.material.userData.shader;

          if ( shader ) {

            shader.uniforms.time.value = performance.now() / 1000;

          }

        }

      } );

      renderer.render( scene, camera );

    }
  }
})