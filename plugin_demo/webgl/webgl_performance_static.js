// webgl/webgl_performance_static.js
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
        let stats;

        let camera, scene, renderer;

        let mouseX = 0, mouseY = 0;

        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        document.addEventListener( 'mousemove', onDocumentMouseMove );

        init();
        animate();


        function init() {

            const container = document.createElement( 'div' );
            document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
            camera.position.z = 3200;

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xffffff );
            scene.matrixAutoUpdate = false;

            const material = new THREE.MeshNormalMaterial();

            const loader = new THREE.BufferGeometryLoader();
            loader.load( 'models/json/suzanne_buffergeometry.json', function ( geometry ) {

                geometry.computeVertexNormals();

                for ( let i = 0; i < 7700; i ++ ) {

                    const mesh = new THREE.Mesh( geometry, material );

                    mesh.position.x = Math.random() * 10000 - 5000;
                    mesh.position.y = Math.random() * 10000 - 5000;
                    mesh.position.z = Math.random() * 10000 - 5000;
                    mesh.rotation.x = Math.random() * 2 * Math.PI;
                    mesh.rotation.y = Math.random() * 2 * Math.PI;
                    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50 + 100;
                    mesh.matrixAutoUpdate = false;
                    mesh.updateMatrix();

                    scene.add( mesh );

                }

            } );

            renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );

            container.appendChild( renderer.domElement );

            stats = new Stats();
            container.appendChild( stats.dom );

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

            requestId = requestAnimationFrame(animate);

            render();
            stats.update();

        }

        function render() {

            camera.position.x += ( mouseX - camera.position.x ) * .05;
            camera.position.y += ( - mouseY - camera.position.y ) * .05;

            camera.lookAt( scene.position );

            renderer.render( scene, camera );

        }
    }
})