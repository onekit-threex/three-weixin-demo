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
import WebGL from './three/addons/capabilities/WebGL.js';


const vertexShader1 = `

uniform ViewData {
  mat4 projectionMatrix;
  mat4 viewMatrix;
};

uniform mat4 modelMatrix;
uniform mat3 normalMatrix;

in vec3 position;
in vec3 normal;

out vec3 vPositionEye;
out vec3 vNormalEye;

void main()	{

  vec4 vertexPositionEye = viewMatrix * modelMatrix * vec4( position, 1.0 );

  vPositionEye = vertexPositionEye.xyz;
  vNormalEye = normalMatrix * normal;

  gl_Position = projectionMatrix * vertexPositionEye;

}
`

const fragmentShader1 = `

precision highp float;

vec4 LinearTosRGB( in vec4 value ) {
  return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

uniform LightingData {
  vec3 position;
  vec3 ambientColor;
  vec3 diffuseColor;
  vec3 specularColor;
  float shininess;
} Light;

uniform vec3 color;

in vec3 vPositionEye;
in vec3 vNormalEye;

out vec4 fragColor;

void main()	{

  // a very basic lighting equation (Phong reflection model) for testing

  vec3 l = normalize( Light.position - vPositionEye );
  vec3 n = normalize( vNormalEye );
  vec3 e = - normalize( vPositionEye );
  vec3 r = normalize( reflect( - l, n ) );

  float diffuseLightWeighting = max( dot( n, l ), 0.0 );
  float specularLightWeighting = max( dot( r, e ), 0.0 );

  specularLightWeighting = pow( specularLightWeighting, Light.shininess );

  vec3 lightWeighting = Light.ambientColor +
    Light.diffuseColor * diffuseLightWeighting +
    Light.specularColor * specularLightWeighting;

  fragColor = vec4( color.rgb * lightWeighting.rgb, 1.0 );

  fragColor = LinearTosRGB( fragColor );

}
`

const vertexShader2 = `

layout(std140) uniform ViewData {
  mat4 projectionMatrix;
  mat4 viewMatrix;
};

uniform mat4 modelMatrix;
uniform mat3 normalMatrix;

in vec3 position;
in vec3 normal;
in vec2 uv;

out vec3 vPositionEye;
out vec3 vNormalEye;
out vec2 vUv;

void main()	{

  vec4 vertexPositionEye = viewMatrix * modelMatrix * vec4( position, 1.0 );

  vPositionEye = vertexPositionEye.xyz;
  vNormalEye = normalMatrix * normal;
  vUv = uv;
  gl_Position = projectionMatrix * vertexPositionEye;

}
`

const fragmentShader2 = `

precision highp float;

vec4 LinearTosRGB( in vec4 value ) {
  return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

uniform sampler2D diffuseMap;

in vec2 vUv;
in vec3 vPositionEye;
in vec3 vNormalEye;
out vec4 fragColor;

uniform LightingData {
  vec3 position;
  vec3 ambientColor;
  vec3 diffuseColor;
  vec3 specularColor;
  float shininess;
} Light;

void main()	{


  // a very basic lighting equation (Phong reflection model) for testing

  vec3 l = normalize( Light.position - vPositionEye );
  vec3 n = normalize( vNormalEye );
  vec3 e = - normalize( vPositionEye );
  vec3 r = normalize( reflect( - l, n ) );

  float diffuseLightWeighting = max( dot( n, l ), 0.0 );
  float specularLightWeighting = max( dot( r, e ), 0.0 );

  specularLightWeighting = pow( specularLightWeighting, Light.shininess );

  vec3 lightWeighting = Light.ambientColor +
    Light.diffuseColor * diffuseLightWeighting +
    Light.specularColor * specularLightWeighting;

  fragColor = vec4( texture( diffuseMap, vUv ).rgb * lightWeighting.rgb, 1.0 );

  fragColor = LinearTosRGB( fragColor );

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


    let camera, scene, renderer, clock;

    init();
    animate();

    function init() {

      if ( WebGL.isWebGL2Available() === false ) {

        document.body.appendChild( WebGL.getWebGL2ErrorMessage() );
        return;

      }

      const container = document.getElementById( 'container' );

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
      camera.position.set( 0, 0, 25 );

      scene = new THREE.Scene();
      camera.lookAt( scene.position );

      clock = new THREE.Clock();

      // geometry

      const geometry1 = new THREE.TetrahedronGeometry();
      const geometry2 = new THREE.BoxGeometry();

      // texture

      const texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
      texture.colorSpace = THREE.SRGBColorSpace;

      // uniforms groups

      // Camera and lighting related data are perfect examples of using UBOs since you have to store these
      // data just once. They can be shared across all shader programs.

      const cameraUniformsGroup = new THREE.UniformsGroup();
      cameraUniformsGroup.setName( 'ViewData' );
      cameraUniformsGroup.add( new THREE.Uniform( camera.projectionMatrix ) ); // projection matrix
      cameraUniformsGroup.add( new THREE.Uniform( camera.matrixWorldInverse ) ); // view matrix

      const lightingUniformsGroup = new THREE.UniformsGroup();
      lightingUniformsGroup.setName( 'LightingData' );
      lightingUniformsGroup.add( new THREE.Uniform( new THREE.Vector3( 0, 0, 10 ) ) ); // light position
      lightingUniformsGroup.add( new THREE.Uniform( new THREE.Color( 0x7c7c7c ) ) ); // ambient color
      lightingUniformsGroup.add( new THREE.Uniform( new THREE.Color( 0xd5d5d5 ) ) ); // diffuse color
      lightingUniformsGroup.add( new THREE.Uniform( new THREE.Color( 0xe7e7e7 ) ) ); // specular color
      lightingUniformsGroup.add( new THREE.Uniform( 64 ) ); // shininess

      // materials

      const material1 = new THREE.RawShaderMaterial( {
        uniforms: {
          modelMatrix: { value: null },
          normalMatrix: { value: null },
          color: { value: null }
        },
        vertexShader: vertexShader1,
        fragmentShader: fragmentShader1,
        glslVersion: THREE.GLSL3
      } );

      const material2 = new THREE.RawShaderMaterial( {
        uniforms: {
          modelMatrix: { value: null },
          diffuseMap: { value: null },
        },
        vertexShader: vertexShader2,
        fragmentShader: fragmentShader2,
        glslVersion: THREE.GLSL3
      } );

      // meshes

      for ( let i = 0; i < 200; i ++ ) {

        let mesh;

        if ( i % 2 === 0 ) {

          mesh = new THREE.Mesh( geometry1, material1.clone() );

          mesh.material.uniformsGroups = [ cameraUniformsGroup, lightingUniformsGroup ];
          mesh.material.uniforms.modelMatrix.value = mesh.matrixWorld;
          mesh.material.uniforms.normalMatrix.value = mesh.normalMatrix;
          mesh.material.uniforms.color.value = new THREE.Color( 0xffffff * Math.random() );

        } else {

          mesh = new THREE.Mesh( geometry2, material2.clone() );

          mesh.material.uniformsGroups = [ cameraUniformsGroup, lightingUniformsGroup ];
          mesh.material.uniforms.modelMatrix.value = mesh.matrixWorld;
          mesh.material.uniforms.diffuseMap.value = texture;

        }

        scene.add( mesh );

        const s = 1 + Math.random() * 0.5;

        mesh.scale.x = s;
        mesh.scale.y = s;
        mesh.scale.z = s;

        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;

        mesh.position.x = Math.random() * 40 - 20;
        mesh.position.y = Math.random() * 40 - 20;
        mesh.position.z = Math.random() * 20 - 10;

      }

      //

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );

      window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    //

    function animate() {

      requestId = requestAnimationFrame( animate );

      const delta = clock.getDelta();

      scene.traverse( function ( child ) {

        if ( child.isMesh ) {

          child.rotation.x += delta * 0.5;
          child.rotation.y += delta * 0.3;

        }

      } );

      renderer.render( scene, camera );

    }
  },
})