// webgl/webgl_raycaster_sprite.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls0.js';
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
onLoad() {
    document.createElementAsync("canvas", "webgl").then(canvas=>this.run(canvas).then())
},
async run(canvas3d){
this.canvas = canvas3d
var that = this
        
		let renderer, scene, camera;
		let group;

		let selectedObject = null;
		const raycaster = new THREE.Raycaster();
		const pointer = new THREE.Vector2();

		init();
		animate();

		function init() {

			// init renderer
			renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
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

			const controls = new OrbitControls( camera, renderer.domElement );
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
			requestAnimationFrame(animate);

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