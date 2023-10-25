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
import { PLYExporter } from 'three/addons/exporters/PLYExporter.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

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
    let scene, camera, renderer, exporter, mesh;

    const params = {
      exportASCII: exportASCII,
      exportBinaryBigEndian: exportBinaryBigEndian,
      exportBinaryLittleEndian: exportBinaryLittleEndian
    };

    init();
    animate();

    function init() {

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
      camera.position.set( 4, 2, 4 );

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xa0a0a0 );
      scene.fog = new THREE.Fog( 0xa0a0a0, 4, 20 );

      exporter = new PLYExporter();

      //

      const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 3 );
      hemiLight.position.set( 0, 20, 0 );
      scene.add( hemiLight );

      const directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
      directionalLight.position.set( 0, 20, 10 );
      directionalLight.castShadow = true;
      directionalLight.shadow.camera.top = 2;
      directionalLight.shadow.camera.bottom = - 2;
      directionalLight.shadow.camera.left = - 2;
      directionalLight.shadow.camera.right = 2;
      scene.add( directionalLight );

      // ground

      const ground = new THREE.Mesh( new THREE.PlaneGeometry( 40, 40 ), new THREE.MeshPhongMaterial( { color: 0xcbcbcb, depthWrite: false } ) );
      ground.rotation.x = - Math.PI / 2;
      ground.receiveShadow = true;
      scene.add( ground );

      const grid = new THREE.GridHelper( 40, 20, 0x000000, 0x000000 );
      grid.material.opacity = 0.2;
      grid.material.transparent = true;
      scene.add( grid );

      // export mesh

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshPhongMaterial( { vertexColors: true } );

      // color vertices based on vertex positions
      const colors = geometry.getAttribute( 'position' ).array.slice();
      for ( let i = 0, l = colors.length; i < l; i ++ ) {

        if ( colors[ i ] > 0 ) colors[ i ] = 0.5;
        else colors[ i ] = 0;

      }

      geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3, false ) );

      mesh = new THREE.Mesh( geometry, material );
      mesh.castShadow = true;
      mesh.position.y = 0.5;
      scene.add( mesh );

      //

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.shadowMap.enabled = true;
      document.body.appendChild( renderer.domElement );

      //

      const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.target.set( 0, 0.5, 0 );
      controls.update();

      //

      window.addEventListener( 'resize', onWindowResize );

      const gui = new GUI();

      gui.add( params, 'exportASCII' ).name( 'Export PLY (ASCII)' );
      gui.add( params, 'exportBinaryBigEndian' ).name( 'Export PLY (Binary BE)' );
      gui.add( params, 'exportBinaryLittleEndian' ).name( 'Export PLY (Binary LE)' );
      gui.open();

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      requestId = requestAnimationFrame( animate );
      renderer.render( scene, camera );

    }

    function exportASCII() {

      exporter.parse( mesh, function ( result ) {

        saveString( result, 'box.ply' );

      } );

    }

    function exportBinaryBigEndian() {

      exporter.parse( mesh, function ( result ) {

        saveArrayBuffer( result, 'box.ply' );

      }, { binary: true } );

    }

    function exportBinaryLittleEndian() {

      exporter.parse( mesh, function ( result ) {

        saveArrayBuffer( result, 'box.ply' );

      }, { binary: true, littleEndian: true } );

    }

    const link = document.createElement( 'a' );
    link.style.display = 'none';
    document.body.appendChild( link );

    function save( blob, filename ) {

      link.href = URL.createObjectURL( blob );
      link.download = filename;
      link.click();

    }

    function saveString( text, filename ) {

      save( new Blob( [ text ], { type: 'text/plain' } ), filename );

    }

    function saveArrayBuffer( buffer, filename ) {

      save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );

    }
  }
})