// webgl/webgl_loader_tilt.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls.js';
import { TiltLoader } from './jsm/loaders/TiltLoader.js';
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
async onLoad() {
        const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this

        let camera, scene, renderer;

        init();

        function init() {

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );

            camera.position.y = 43;
            camera.position.z = 100;

            scene.add( camera );

            const grid = new THREE.GridHelper( 50, 50, 0xffffff, 0x555555 );
            scene.add( grid );

            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            const loader = new TiltLoader();
            loader.load( 'models/tilt/BRUSH_DOME.tilt', function ( object ) {

                // console.log( object.children.length );
                scene.add( object );
                render();

            } );

            const controls = new OrbitControls( camera, renderer.domElement );
            controls.addEventListener( 'change', render );
            controls.target.y = camera.position.y;
            controls.update();

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

            render();

        }

        function render() {

            renderer.render( scene, camera );

        }

    }
})