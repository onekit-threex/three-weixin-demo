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

		let renderer, scene, camera;
		let group;

		let selectedObject = null;
		const raycaster = new THREE.Raycaster();
		const pointer = new THREE.Vector2();

		init();
		animate();

		function init() {

			// init renderer
			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			// init scene
			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0xffffff );

			group = new THREE.Group();
			scene.add( group );

			// init camera
			camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
			camera.position.set( 15, 15, 15 );
			camera.lookAt( scene.position );

			const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
			controls.minDistance = 15;
			controls.maxDistance = 250;

			// add sprites

			const sprite1 = new THREE.Sprite( new THREE.SpriteMaterial( { color: '#69f' } ) );
			sprite1.position.set( 6, 5, 5 );
			sprite1.scale.set( 2, 5, 1 );
			group.add( sprite1 );

			const sprite2 = new THREE.Sprite( new THREE.SpriteMaterial( { color: '#69f', sizeAttenuation: false } ) );
			sprite2.material.rotation = Math.PI / 3 * 4;
			sprite2.position.set( 8, - 2, 2 );
			sprite2.center.set( 0.5, 0 );
			sprite2.scale.set( .1, .5, .1 );
			group.add( sprite2 );

			const group2 = new THREE.Object3D();
			group2.scale.set( 1, 2, 1 );
			group2.position.set( - 5, 0, 0 );
			group2.rotation.set( Math.PI / 2, 0, 0 );
			group.add( group2 );

			const sprite3 = new THREE.Sprite( new THREE.SpriteMaterial( { color: '#69f' } ) );
			sprite3.position.set( 0, 2, 5 );
			sprite3.scale.set( 10, 2, 3 );
			sprite3.center.set( - 0.1, 0 );
			sprite3.material.rotation = Math.PI / 3;
			group2.add( sprite3 );

			window.addEventListener( 'resize', onWindowResize );
			document.addEventListener( 'pointermove', onPointerMove );

		}

		function animate() {

			renderer.render( scene, camera );
			requestId = requestAnimationFrame( animate );

		}

		function onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, window.innerHeight );

		}

		function onPointerMove( event ) {

			if ( selectedObject ) {

				selectedObject.material.color.set( '#69f' );
				selectedObject = null;

			}

			pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			raycaster.setFromCamera( pointer, camera );

			const intersects = raycaster.intersectObject( group, true );

			if ( intersects.length > 0 ) {

				const res = intersects.filter( function ( res ) {

					return res && res.object;

				} )[ 0 ];

				if ( res && res.object ) {

					selectedObject = res.object;
					selectedObject.material.color.set( '#f00' );

				}

			}

		}
  }
})