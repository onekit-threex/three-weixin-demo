import {
  document,
	window,
	HTMLCanvasElement,
	requestAnimationFrame,
  cancelAnimationFrame,
  performance,
	Event,
  Event0
} from "dhtml-weixin"
import * as THREE from './three/Three';
//import Stats from './three/addons/libs/stats.module.js';
import { KTX2Loader } from './three/addons/loaders/KTX2Loader.js';

import WebGL from './three/addons/capabilities/WebGL.js';
const vs = `
	uniform vec2 size;
	out vec2 vUv;

	void main() {

		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		// Convert position.xy to 1.0-0.0

		vUv.xy = position.xy / size + 0.5;
		vUv.y = 1.0 - vUv.y; // original data is upside down

	}
`

const fs = `
	precision highp float;
	precision highp int;
	precision highp sampler2DArray;

	uniform sampler2DArray diffuse;
	in vec2 vUv;
	uniform int depth;

	out vec4 outColor;

	void main() {

		vec4 color = texture( diffuse, vec3( vUv, depth ) );

		// lighten a bit
		outColor = vec4( color.rgb + .2, 1.0 );

	}`
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


    if ( WebGL.isWebGL2Available() === false ) {

      document.body.appendChild( WebGL.getWebGL2ErrorMessage() );

    }

    let camera, scene, mesh, renderer, stats, clock;

    const planeWidth = 50;
    const planeHeight = 25;

    let depthStep = 1;

    init();
    animate();

    function init() {

      const container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
      camera.position.z = 70;

      scene = new THREE.Scene();

      //
      clock = new THREE.Clock();

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );

      //

      const ktx2Loader = new KTX2Loader();
      ktx2Loader.setTranscoderPath( './three/addons/libs/basis/' );
      ktx2Loader.detectSupport( renderer );

      ktx2Loader.load( 'textures/spiritedaway.ktx2', function ( texturearray ) {

        const material = new THREE.ShaderMaterial( {
          uniforms: {
            diffuse: { value: texturearray },
            depth: { value: 55 },
            size: { value: new THREE.Vector2( planeWidth, planeHeight ) }
          },
          vertexShader:vs,
          fragmentShader: fs,
          glslVersion: THREE.GLSL3
        } );

        const geometry = new THREE.PlaneGeometry( planeWidth, planeHeight );

        mesh = new THREE.Mesh( geometry, material );

        scene.add( mesh );

      } );


      //stats = new Stats();
      //container.appendChild( stats.dom );

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      requestId = requestAnimationFrame( animate );

      if ( mesh ) {

        const delta = clock.getDelta() * 10;

        depthStep += delta;

        const value = depthStep % 5;

        mesh.material.uniforms[ 'depth' ].value = value;

      }

      render();
      //stats.update();

    }

    function render() {

      renderer.render( scene, camera );

    }
  }
})