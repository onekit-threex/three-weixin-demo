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

    let container, stats;

    let camera, scene, renderer;

    let points;

    const particles = 300000;
    let drawCount = 10000;

    init();
    animate();

    function init() {

      container = document.getElementById( 'container' );

      //

      renderer = new THREE.WebGLRenderer( { antialias: false } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );

      container.appendChild( renderer.domElement );

      //

      camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 5, 3500 );
      camera.position.z = 2750;

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0x050505 );
      scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

      //

      const geometry = new THREE.BufferGeometry();

      const positions = [];
      const positions2 = [];
      const colors = [];

      const color = new THREE.Color();

      const n = 1000, n2 = n / 2; // particles spread in the cube

      for ( let i = 0; i < particles; i ++ ) {

        // positions

        const x = Math.random() * n - n2;
        const y = Math.random() * n - n2;
        const z = Math.random() * n - n2;

        positions.push( x, y, z );
        positions2.push( z * 0.3, x * 0.3, y * 0.3 );

        // colors

        const vx = ( x / n ) + 0.5;
        const vy = ( y / n ) + 0.5;
        const vz = ( z / n ) + 0.5;

        color.setRGB( vx, vy, vz, THREE.SRGBColorSpace );

        colors.push( color.r, color.g, color.b );

      }

      const gl = renderer.getContext();

      const pos = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, pos );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( positions ), gl.STATIC_DRAW );

      const pos2 = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, pos2 );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( positions2 ), gl.STATIC_DRAW );

      const rgb = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, rgb );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( colors ), gl.STATIC_DRAW );

      const posAttr1 = new THREE.GLBufferAttribute( pos, gl.FLOAT, 3, 4, particles );
      const posAttr2 = new THREE.GLBufferAttribute( pos2, gl.FLOAT, 3, 4, particles );
      geometry.setAttribute( 'position', posAttr1 );

      setInterval( function () {

        const attr = geometry.getAttribute( 'position' );

        geometry.setAttribute( 'position', ( attr === posAttr1 ) ? posAttr2 : posAttr1 );

      }, 2000 );

      geometry.setAttribute( 'color', new THREE.GLBufferAttribute( rgb, gl.FLOAT, 3, 4, particles ) );

      //

      const material = new THREE.PointsMaterial( { size: 15, vertexColors: true } );

      points = new THREE.Points( geometry, material );

      // Choose one:
      // geometry.boundingSphere = ( new THREE.Sphere() ).set( new THREE.Vector3(), Infinity );
      points.frustumCulled = false;

      scene.add( points );

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

      drawCount = ( Math.max( 5000, drawCount ) + Math.floor( 500 * Math.random() ) ) % particles;
      points.geometry.setDrawRange( 0, drawCount );

      const time = Date.now() * 0.001;

      points.rotation.x = time * 0.1;
      points.rotation.y = time * 0.2;

      renderer.render( scene, camera );

    }
  }
})