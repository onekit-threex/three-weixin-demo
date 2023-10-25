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

import { PeppersGhostEffect } from './three/addons/effects/PeppersGhostEffect.js';
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

    let container;

    let camera, scene, renderer, effect;
    let group;

    init();
    animate();

    function init() {

      container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );

      scene = new THREE.Scene();

      group = new THREE.Group();
      scene.add( group );

      // Cube

      const geometry = new THREE.BoxGeometry().toNonIndexed(); // ensure unique vertices for each triangle

      const position = geometry.attributes.position;
      const colors = [];
      const color = new THREE.Color();

      // generate for each side of the cube a different color

      for ( let i = 0; i < position.count; i += 6 ) {

        color.setHex( Math.random() * 0xffffff );

        // first face

        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );

        // second face

        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );

      }

      geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

      const material = new THREE.MeshBasicMaterial( { vertexColors: true } );

      for ( let i = 0; i < 10; i ++ ) {

        const cube = new THREE.Mesh( geometry, material );
        cube.position.x = Math.random() * 2 - 1;
        cube.position.y = Math.random() * 2 - 1;
        cube.position.z = Math.random() * 2 - 1;
        cube.scale.multiplyScalar( Math.random() + 0.5 );
        group.add( cube );

      }

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      container.appendChild( renderer.domElement );

      effect = new PeppersGhostEffect( renderer );
      effect.setSize( window.innerWidth, window.innerHeight );
      effect.cameraDistance = 5;

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      effect.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      requestId = requestAnimationFrame( animate );

      group.rotation.y += 0.01;

      effect.render( scene, camera );

    }

  }
})