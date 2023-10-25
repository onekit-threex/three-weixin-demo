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

//import Stats from './three/addons/libs/stats.module.js';

import { FirstPersonControls } from './three/addons/controls/FirstPersonControls.js';
import { ImprovedNoise } from './three/addons/math/ImprovedNoise.js';
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
var that = this
    let container, stats;
    let camera, controls, scene, renderer;
    let mesh, texture;

    const worldWidth = 256, worldDepth = 256;
    const clock = new THREE.Clock();

  await	init();
    animate();

  async	function  init() {

      container = document.getElementById( 'container' );

      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xefd1b5 );
      scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );

      const data = generateHeight( worldWidth, worldDepth );

      camera.position.set( 100, 800, - 800 );
      camera.lookAt( - 100, 810, - 800 );

      const geometry = new THREE.PlaneGeometry( 7500, 7500, worldWidth - 1, worldDepth - 1 );
      geometry.rotateX( - Math.PI / 2 );

      const vertices = geometry.attributes.position.array;

      for ( let i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {

        vertices[ j + 1 ] = data[ i ] * 10;

      }

      texture = new THREE.CanvasTexture(await core.Canvas.fix(canvas3d,await generateTexture( data, worldWidth, worldDepth ) ));
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { map: texture } ) );
      scene.add( mesh );

      renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );

      controls = new FirstPersonControls( camera, renderer.domElement );
      controls.movementSpeed = 150;
      controls.lookSpeed = 0.1;

      //stats = new Stats();
     // container.appendChild( stats.dom );


      //

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

      controls.handleResize();

    }

    function generateHeight( width, height ) {

      let seed = Math.PI / 4;
      Math.random = function () {

        const x = Math.sin( seed ++ ) * 10000;
        return x - Math.floor( x );

      };

      const size = width * height, data = new Uint8Array( size );
      const perlin = new ImprovedNoise(), z = Math.random() * 100;

      let quality = 1;

      for ( let j = 0; j < 4; j ++ ) {

        for ( let i = 0; i < size; i ++ ) {

          const x = i % width, y = ~ ~ ( i / width );
          data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );

        }

        quality *= 5;

      }

      return data;

    }
    
   async	function generateTexture( data, width, height ) {

      let context, image, imageData, shade;

      const vector3 = new THREE.Vector3( 0, 0, 0 );

      const sun = new THREE.Vector3( 1, 1, 1 );
      sun.normalize();
const canvas =  document.createElement("canvas")
      canvas.width = width;
      canvas.height = height;

      context = canvas.getContext( '2d' );
      context.fillStyle = '#000';
      context.fillRect( 0, 0, width, height );

      image = context.getImageData( 0, 0, canvas.width, canvas.height );
      imageData = image.data;

      for ( let i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {

        vector3.x = data[ j - 2 ] - data[ j + 2 ];
        vector3.y = 2;
        vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
        vector3.normalize();

        shade = vector3.dot( sun );

        imageData[ i ] = ( 96 + shade * 128 ) * ( 0.5 + data[ j ] * 0.007 );
        imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
        imageData[ i + 2 ] = ( shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );

      }

      context.putImageData( image, 0, 0 );

      // Scaled 4x

      const canvasScaled = document.createElement( 'canvas' );
      canvasScaled.width = width * 4;
      canvasScaled.height = height * 4;

      context = canvasScaled.getContext( '2d' );
      context.scale( 4, 4 );
      context.drawImage(await core.Canvas.toImage( canvasScaled,canvas), 0, 0 );

      image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
      imageData = image.data;

      for ( let i = 0, l = imageData.length; i < l; i += 4 ) {

        const v = ~ ~ ( Math.random() * 5 );

        imageData[ i ] += v;
        imageData[ i + 1 ] += v;
        imageData[ i + 2 ] += v;

      }

      context.putImageData( image, 0, 0 );

      return canvasScaled;

    }

    //

    function animate() {

      requestId = requestAnimationFrame(animate);

      render();
      //stats.update();

    }


    function render() {

      controls.update( clock.getDelta() );
      renderer.render( scene, camera );

    }
  }
})