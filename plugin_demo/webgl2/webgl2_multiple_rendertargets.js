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

import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const gbuffer_vert = `
in vec3 position;
in vec3 normal;
in vec2 uv;

out vec3 vNormal;
out vec2 vUv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

void main() {

  vUv = uv;

  // get smooth normals
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

  vec3 transformedNormal = normalMatrix * normal;
  vNormal = normalize( transformedNormal );

  gl_Position = projectionMatrix * mvPosition;

}
`
const gbuffer_frag = `
precision highp float;
precision highp int;

layout(location = 0) out vec4 gColor;
layout(location = 1) out vec4 gNormal;

uniform sampler2D tDiffuse;
uniform vec2 repeat;

in vec3 vNormal;
in vec2 vUv;

void main() {

  // write color to G-Buffer
  gColor = texture( tDiffuse, vUv * repeat );

  // write normals to G-Buffer
  gNormal = vec4( normalize( vNormal ), 0.0 );

}`
const render_vert = `
in vec3 position;
in vec2 uv;

out vec2 vUv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}
`
const render_frag = `
precision highp float;
precision highp int;

vec4 LinearTosRGB( in vec4 value ) {
  return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

layout(location = 0) out vec4 pc_FragColor;

in vec2 vUv;

uniform sampler2D tDiffuse;
uniform sampler2D tNormal;

void main() {

  vec4 diffuse = texture( tDiffuse, vUv );
  vec4 normal = texture( tNormal, vUv );

  pc_FragColor = mix( diffuse, normal, step( 0.5, vUv.x ) );
  pc_FragColor.a = 1.0;

  pc_FragColor = LinearTosRGB( pc_FragColor );

}
`
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
    let camera, scene, renderer, controls;
    let renderTarget;
    let postScene, postCamera;

    const parameters = {
      samples: 4,
      wireframe: false
    };

    const gui = new GUI();
    gui.add( parameters, 'samples', 0, 4 ).step( 1 );
    gui.add( parameters, 'wireframe' );
    gui.onChange( render );

    init();

    function init() {

      if ( WebGL.isWebGL2Available() === false ) {

        document.body.appendChild( WebGL.getWebGL2ErrorMessage() );
        return;

      }

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      // Create a multi render target with Float buffers

      renderTarget = new THREE.WebGLMultipleRenderTargets(
        window.innerWidth * window.devicePixelRatio,
        window.innerHeight * window.devicePixelRatio,
        2
      );

      for ( let i = 0, il = renderTarget.texture.length; i < il; i ++ ) {

        renderTarget.texture[ i ].minFilter = THREE.NearestFilter;
        renderTarget.texture[ i ].magFilter = THREE.NearestFilter;

      }

      // Name our G-Buffer attachments for debugging

      renderTarget.texture[ 0 ].name = 'diffuse';
      renderTarget.texture[ 1 ].name = 'normal';

      // Scene setup

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0x222222 );

      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 50 );
      camera.position.z = 4;

      const loader = new THREE.TextureLoader();

      const diffuse = loader.load( 'textures/hardwood2_diffuse.jpg', render );
      diffuse.wrapS = THREE.RepeatWrapping;
      diffuse.wrapT = THREE.RepeatWrapping;
      diffuse.colorSpace = THREE.SRGBColorSpace;

      scene.add( new THREE.Mesh(
        new THREE.TorusKnotGeometry( 1, 0.3, 128, 32 ),
        new THREE.RawShaderMaterial( {
          vertexShader:gbuffer_vert,
          fragmentShader:gbuffer_frag,
          uniforms: {
            tDiffuse: { value: diffuse },
            repeat: { value: new THREE.Vector2( 5, 0.5 ) }
          },
          glslVersion: THREE.GLSL3
        } )
      ) );

      // PostProcessing setup

      postScene = new THREE.Scene();
      postCamera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

      postScene.add( new THREE.Mesh(
        new THREE.PlaneGeometry( 2, 2 ),
        new THREE.RawShaderMaterial( {
          vertexShader: render_vert,
          fragmentShader: render_frag,
          uniforms: {
            tDiffuse: { value: renderTarget.texture[ 0 ] },
            tNormal: { value: renderTarget.texture[ 1 ] },
          },
          glslVersion: THREE.GLSL3
        } )
      ) );

      // Controls

      controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.addEventListener( 'change', render );
      //controls.enableZoom = false;

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

      const dpr = renderer.getPixelRatio();
      renderTarget.setSize( window.innerWidth * dpr, window.innerHeight * dpr );

      render();

    }

    function render() {

      renderTarget.samples = parameters.samples;

      scene.traverse( function ( child ) {

        if ( child.material !== undefined ) {

          child.material.wireframe = parameters.wireframe;

        }

      } );

      // render scene into target
      renderer.setRenderTarget( renderTarget );
      renderer.render( scene, camera );

      // render post FX
      renderer.setRenderTarget( null );
      renderer.render( postScene, postCamera );

    }
  }
})