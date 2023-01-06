// webgl/webgl_loader_3ds.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { TrackballControls } from './jsm/controls/TrackballControls.js';
import { TDSLoader } from './jsm/loaders/TDSLoader.js';

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
        let container, controls;
        let camera, scene, renderer;

        init();
        animate();

        function init() {

            container = document.createElement( 'div' );
            document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 10 );
            camera.position.z = 2;

            scene = new THREE.Scene();
            scene.add( new THREE.HemisphereLight() );

            const directionalLight = new THREE.DirectionalLight( 0xffeedd );
            directionalLight.position.set( 0, 0, 2 );
            scene.add( directionalLight );

            //3ds files dont store normal maps
            const normal = new THREE.TextureLoader( ).load( 'models/3ds/portalgun/textures/normal.jpg' );

            const loader = new TDSLoader( );
            loader.setResourcePath( 'models/3ds/portalgun/textures/' );
            loader.load( 'models/3ds/portalgun/portalgun.3ds', function ( object ) {

                object.traverse( function ( child ) {

                    if ( child.isMesh ) {

                        child.material.specular.setScalar( 0.1 );
                        child.material.normalMap = normal;

                    }

                } );

                scene.add( object );

            } );

            renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.outputEncoding = THREE.sRGBEncoding;
            container.appendChild( renderer.domElement );

            controls = new TrackballControls( camera, renderer.domElement );

            window.addEventListener( 'resize', resize );

        }

        function resize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function animate() {

            controls.update();
            renderer.render( scene, camera );

            requestId = requestAnimationFrame(animate);

        }
    }
})