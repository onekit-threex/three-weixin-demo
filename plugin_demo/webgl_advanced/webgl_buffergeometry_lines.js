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

    let container, stats, clock;

    let camera, scene, renderer;

    let line;

    const segments = 10000;
    const r = 800;
    let t = 0;

    init();
    animate();

    function init() {

      container = document.getElementById( 'container' );

      //

      camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 4000 );
      camera.position.z = 2750;

      scene = new THREE.Scene();

      clock = new THREE.Clock();

      const geometry = new THREE.BufferGeometry();
      const material = new THREE.LineBasicMaterial( { vertexColors: true } );

      const positions = [];
      const colors = [];

      for ( let i = 0; i < segments; i ++ ) {

        const x = Math.random() * r - r / 2;
        const y = Math.random() * r - r / 2;
        const z = Math.random() * r - r / 2;

        // positions

        positions.push( x, y, z );

        // colors

        colors.push( ( x / r ) + 0.5 );
        colors.push( ( y / r ) + 0.5 );
        colors.push( ( z / r ) + 0.5 );

      }

      geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
      geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
      generateMorphTargets( geometry );

      geometry.computeBoundingSphere();

      line = new THREE.Line( geometry, material );
      scene.add( line );

      //

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );

      container.appendChild( renderer.domElement );

      //

      stats = new Stats();
      container.appendChild( stats.dom );

      //

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    //

    function animate() {

      requestId = requestAnimationFrame( animate );

      render();
      stats.update();

    }

    function render() {

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      line.rotation.x = time * 0.25;
      line.rotation.y = time * 0.5;

      t += delta * 0.5;
      line.morphTargetInfluences[ 0 ] = Math.abs( Math.sin( t ) );

      renderer.render( scene, camera );

    }

    function generateMorphTargets( geometry ) {

      const data = [];

      for ( let i = 0; i < segments; i ++ ) {

        const x = Math.random() * r - r / 2;
        const y = Math.random() * r - r / 2;
        const z = Math.random() * r - r / 2;

        data.push( x, y, z );

      }

      const morphTarget = new THREE.Float32BufferAttribute( data, 3 );
      morphTarget.name = 'target1';

      geometry.morphAttributes.position = [ morphTarget ];

    }

  }
})