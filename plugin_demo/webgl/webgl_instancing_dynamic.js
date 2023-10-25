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

  let camera, scene, renderer, stats;

  let mesh;
  const amount = parseInt( window.location.search.slice( 1 ) ) || 10;
  const count = Math.pow( amount, 3 );
  const dummy = new THREE.Object3D();

  init();
  animate();

  function init() {

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set( amount * 0.9, amount * 0.9, amount * 0.9 );
    camera.lookAt( 0, 0, 0 );

    scene = new THREE.Scene();

    const loader = new THREE.BufferGeometryLoader();
    loader.load( 'models/json/suzanne_buffergeometry.json', function ( geometry ) {

      geometry.computeVertexNormals();
      geometry.scale( 0.5, 0.5, 0.5 );

      const material = new THREE.MeshNormalMaterial();
      // check overdraw
      // let material = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.1, transparent: true } );

      mesh = new THREE.InstancedMesh( geometry, material, count );
      mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame
      scene.add( mesh );

      //

      const gui = new GUI();
      gui.add( mesh, 'count', 0, count );

    } );

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //

    stats = new Stats();
    document.body.appendChild( stats.dom );

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

    if ( mesh ) {

      const time = Date.now() * 0.001;

      mesh.rotation.x = Math.sin( time / 4 );
      mesh.rotation.y = Math.sin( time / 2 );

      let i = 0;
      const offset = ( amount - 1 ) / 2;

      for ( let x = 0; x < amount; x ++ ) {

        for ( let y = 0; y < amount; y ++ ) {

          for ( let z = 0; z < amount; z ++ ) {

            dummy.position.set( offset - x, offset - y, offset - z );
            dummy.rotation.y = ( Math.sin( x / 4 + time ) + Math.sin( y / 4 + time ) + Math.sin( z / 4 + time ) );
            dummy.rotation.z = dummy.rotation.y * 2;

            dummy.updateMatrix();

            mesh.setMatrixAt( i ++, dummy.matrix );

          }

        }

      }

      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();

    }

    renderer.render( scene, camera );

  }
  }
})