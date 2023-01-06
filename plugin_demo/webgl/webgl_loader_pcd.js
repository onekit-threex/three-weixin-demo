// webgl/webgl_loader_pcd.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls.js';
import { PCDLoader } from './jsm/loaders/PCDLoader.js';

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

        let camera, scene, renderer;

        init();
        render();

        function init() {

            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.01, 40 );
            camera.position.set( 0, 0, 1 );
            scene.add( camera );

            const controls = new OrbitControls( camera, renderer.domElement );
            controls.addEventListener( 'change', render ); // use if there is no animation loop
            controls.minDistance = 0.5;
            controls.maxDistance = 10;

            //scene.add( new THREE.AxesHelper( 1 ) );

            const loader = new PCDLoader();
            loader.load( 'models/pcd/binary/Zaghetto.pcd', function ( points ) {

                points.geometry.center();
                points.geometry.rotateX( Math.PI );
                points.name = 'Zaghetto.pcd';
                scene.add( points );

                render();

            } );

            window.addEventListener( 'resize', onWindowResize );

            window.addEventListener( 'keypress', keyboard );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function keyboard( ev ) {

            const points = scene.getObjectByName( 'Zaghetto.pcd' );

            switch ( ev.key || String.fromCharCode( ev.keyCode || ev.charCode ) ) {

                case '+':
                    points.material.size *= 1.2;
                    break;

                case '-':
                    points.material.size /= 1.2;
                    break;

                case 'c':
                    points.material.color.setHex( Math.random() * 0xffffff );
                    break;

            }

            render();

        }

        function render() {

            renderer.render( scene, camera );

        }

    }
})