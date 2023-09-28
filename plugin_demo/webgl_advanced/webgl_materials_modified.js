// webgl_advanced/webgl_materials_modified.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls0.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

import { GUI } from './jsm/libs/lil-gui.module.min.js';

var requestId
Page({
	onUnload() {
		cancelAnimationFrame(requestId, this.canvas)
this.worker && this.worker.terminate()
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
	    webgl_touch(e) {
        const web_e = Event0.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this

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

  renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const controls = new OrbitControls( camera, renderer.domElement );
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

    return amount;

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

  requestAnimationFrame(animate);

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