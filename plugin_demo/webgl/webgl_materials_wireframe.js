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

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
const vertexShader = `

attribute vec3 center;
varying vec3 vCenter;

void main() {

  vCenter = center;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}
`
const fragmentShader = `

uniform float thickness;

varying vec3 vCenter;

void main() {

  vec3 afwidth = fwidth( vCenter.xyz );

  vec3 edge3 = smoothstep( ( thickness - 1.0 ) * afwidth, thickness * afwidth, vCenter.xyz );

  float edge = 1.0 - min( min( edge3.x, edge3.y ), edge3.z );

  gl_FragColor.rgb = gl_FrontFacing ? vec3( 0.9, 0.9, 1.0 ) : vec3( 0.4, 0.4, 0.5 );
  gl_FragColor.a = edge;

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

    const API = {
      thickness: 1
    };

    let renderer, scene, camera, mesh2;

    init();

    function init() {

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 500 );
      camera.position.z = 200;

      const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.addEventListener( 'change', render ); // use if there is no animation loop
      controls.enablePan = false;
      controls.enableZoom = false;

      new THREE.BufferGeometryLoader().load( 'models/json/WaltHeadLo_buffergeometry.json', function ( geometry ) {

        geometry.deleteAttribute( 'normal' );
        geometry.deleteAttribute( 'uv' );

        setupAttributes( geometry );

        // left

        const material1 = new THREE.MeshBasicMaterial( {

          color: 0xe0e0ff,
          wireframe: true

        } );

        const mesh1 = new THREE.Mesh( geometry, material1 );
        mesh1.position.set( - 40, 0, 0 );

        scene.add( mesh1 );

        // right

        const material2 = new THREE.ShaderMaterial( {

          uniforms: { 'thickness': { value: API.thickness } },
          vertexShader:vertexShader,
          fragmentShader:fragmentShader,
          side: THREE.DoubleSide,
          alphaToCoverage: true // only works when WebGLRenderer's "antialias" is set to "true"

        } );
        material2.extensions.derivatives = true;

        mesh2 = new THREE.Mesh( geometry, material2 );
        mesh2.position.set( 40, 0, 0 );

        scene.add( mesh2 );

        //

        render();

      } );

      //

      const gui = new GUI();

      gui.add( API, 'thickness', 0, 4 ).onChange( function () {

        mesh2.material.uniforms.thickness.value = API.thickness;
        render();

      } );

      gui.open();

      //

      window.addEventListener( 'resize', onWindowResize );

    }

    function setupAttributes( geometry ) {

      const vectors = [
        new THREE.Vector3( 1, 0, 0 ),
        new THREE.Vector3( 0, 1, 0 ),
        new THREE.Vector3( 0, 0, 1 )
      ];

      const position = geometry.attributes.position;
      const centers = new Float32Array( position.count * 3 );

      for ( let i = 0, l = position.count; i < l; i ++ ) {

        vectors[ i % 3 ].toArray( centers, i * 3 );

      }

      geometry.setAttribute( 'center', new THREE.BufferAttribute( centers, 3 ) );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function render() {

      renderer.render( scene, camera );

    }
  }
})