// webgl/webgl_loader_bvh.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls0.js';
import { BVHLoader } from './jsm/loaders/BVHLoader.js';
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
        
			const clock = new THREE.Clock();

			let camera, controls, scene, renderer;
			let mixer, skeletonHelper;

			init();
			animate();

			const loader = new BVHLoader();
			loader.load( 'models/bvh/pirouette.bvh', function ( result ) {

				skeletonHelper = new THREE.SkeletonHelper( result.skeleton.bones[ 0 ] );
				skeletonHelper.skeleton = result.skeleton; // allow animation mixer to bind to THREE.SkeletonHelper directly

				const boneContainer = new THREE.Group();
				boneContainer.add( result.skeleton.bones[ 0 ] );

				scene.add( skeletonHelper );
				scene.add( boneContainer );

				// play animation
				mixer = new THREE.AnimationMixer( skeletonHelper );
				mixer.clipAction( result.clip ).setEffectiveWeight( 1.0 ).play();

			} );

			function init() {

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 0, 200, 300 );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xeeeeee );

				scene.add( new THREE.GridHelper( 400, 10 ) );

				// renderer
				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 300;
				controls.maxDistance = 700;

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestId = requestAnimationFrame(animate);

				const delta = clock.getDelta();

				if ( mixer ) mixer.update( delta );

				renderer.render( scene, camera );

			}

    }
})