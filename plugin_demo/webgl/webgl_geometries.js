import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import Stats from './jsm/libs/stats.module.js';
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
        const web_e = Event.fix(e)
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
        
			let camera, scene, renderer, stats;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.y = 400;

				scene = new THREE.Scene();

				let object;

				const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
				scene.add( ambientLight );

				const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
				camera.add( pointLight );
				scene.add( camera );

				const map = new THREE.TextureLoader( ).load( 'textures/uv_grid_opengl.jpg' );
				map.wrapS = map.wrapT = THREE.RepeatWrapping;
				map.anisotropy = 16;

				const material = new THREE.MeshPhongMaterial( { map: map, side: THREE.DoubleSide } );

				//

				object = new THREE.Mesh( new THREE.SphereGeometry( 75, 20, 10 ), material );
				object.position.set( - 300, 0, 200 );
				scene.add( object );

				object = new THREE.Mesh( new THREE.IcosahedronGeometry( 75, 1 ), material );
				object.position.set( - 100, 0, 200 );
				scene.add( object );

				object = new THREE.Mesh( new THREE.OctahedronGeometry( 75, 2 ), material );
				object.position.set( 100, 0, 200 );
				scene.add( object );

				object = new THREE.Mesh( new THREE.TetrahedronGeometry( 75, 0 ), material );
				object.position.set( 300, 0, 200 );
				scene.add( object );

				//

				object = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100, 4, 4 ), material );
				object.position.set( - 300, 0, 0 );
				scene.add( object );

				object = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 ), material );
				object.position.set( - 100, 0, 0 );
				scene.add( object );

				object = new THREE.Mesh( new THREE.CircleGeometry( 50, 20, 0, Math.PI * 2 ), material );
				object.position.set( 100, 0, 0 );
				scene.add( object );

				object = new THREE.Mesh( new THREE.RingGeometry( 10, 50, 20, 5, 0, Math.PI * 2 ), material );
				object.position.set( 300, 0, 0 );
				scene.add( object );

				//

				object = new THREE.Mesh( new THREE.CylinderGeometry( 25, 75, 100, 40, 5 ), material );
				object.position.set( - 300, 0, - 200 );
				scene.add( object );

				const points = [];

				for ( let i = 0; i < 50; i ++ ) {

					points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * Math.sin( i * 0.1 ) * 15 + 50, ( i - 5 ) * 2 ) );

				}

				object = new THREE.Mesh( new THREE.LatheGeometry( points, 20 ), material );
				object.position.set( - 100, 0, - 200 );
				scene.add( object );

				object = new THREE.Mesh( new THREE.TorusGeometry( 50, 20, 20, 20 ), material );
				object.position.set( 100, 0, - 200 );
				scene.add( object );

				object = new THREE.Mesh( new THREE.TorusKnotGeometry( 50, 10, 50, 20 ), material );
				object.position.set( 300, 0, - 200 );
				scene.add( object );

				//

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

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

				requestId = requestAnimationFrame(animate);

				render();
			//	//stats.update();

			}

			function render() {

				const timer = Date.now() * 0.0001;

				camera.position.x = Math.cos( timer ) * 800;
				camera.position.z = Math.sin( timer ) * 800;

				camera.lookAt( scene.position );

				scene.traverse( function ( object ) {

					if ( object.isMesh === true ) {

						object.rotation.x = timer * 5;
						object.rotation.y = timer * 2.5;

					}

				} );

				renderer.render( scene, camera );

			}
    }
})