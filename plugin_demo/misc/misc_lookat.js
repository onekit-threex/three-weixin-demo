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

    let camera, scene, renderer, stats;

    let sphere;

    let mouseX = 0, mouseY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    document.addEventListener( 'mousemove', onDocumentMouseMove );

    init();
    animate();


    function init() {

      camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 15000 );
      camera.position.z = 3200;

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xffffff );

      sphere = new THREE.Mesh( new THREE.SphereGeometry( 100, 20, 20 ), new THREE.MeshNormalMaterial() );
      scene.add( sphere );

      const geometry = new THREE.CylinderGeometry( 0, 10, 100, 12 );
      geometry.rotateX( Math.PI / 2 );

      const material = new THREE.MeshNormalMaterial();

      for ( let i = 0; i < 1000; i ++ ) {

        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = Math.random() * 4000 - 2000;
        mesh.position.y = Math.random() * 4000 - 2000;
        mesh.position.z = Math.random() * 4000 - 2000;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 4 + 2;
        scene.add( mesh );

      }

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      stats = new Stats();
      document.body.appendChild( stats.dom );

      //

      window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function onDocumentMouseMove( event ) {

      mouseX = ( event.clientX - windowHalfX ) * 10;
      mouseY = ( event.clientY - windowHalfY ) * 10;

    }

    //

    function animate() {

      requestId = requestAnimationFrame( animate );

      render();
      stats.update();

    }

    function render() {

      const time = Date.now() * 0.0005;

      sphere.position.x = Math.sin( time * 0.7 ) * 2000;
      sphere.position.y = Math.cos( time * 0.5 ) * 2000;
      sphere.position.z = Math.cos( time * 0.3 ) * 2000;

      for ( let i = 1, l = scene.children.length; i < l; i ++ ) {

        scene.children[ i ].lookAt( sphere.position );

      }

      camera.position.x += ( mouseX - camera.position.x ) * .05;
      camera.position.y += ( - mouseY - camera.position.y ) * .05;
      camera.lookAt( scene.position );

      renderer.render( scene, camera );

    }
  }
})