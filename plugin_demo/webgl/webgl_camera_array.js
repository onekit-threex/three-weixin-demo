import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';
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
        let mesh;
        const AMOUNT = 6;

        init();
        animate();

        function init() {

            const ASPECT_RATIO = window.innerWidth / window.innerHeight;

            const WIDTH = ( window.innerWidth / AMOUNT ) * window.devicePixelRatio;
            const HEIGHT = ( window.innerHeight / AMOUNT ) * window.devicePixelRatio;

            const cameras = [];

            for ( let y = 0; y < AMOUNT; y ++ ) {

                for ( let x = 0; x < AMOUNT; x ++ ) {

                    const subcamera = new THREE.PerspectiveCamera( 40, ASPECT_RATIO, 0.1, 10 );
                    subcamera.viewport = new THREE.Vector4( Math.floor( x * WIDTH ), Math.floor( y * HEIGHT ), Math.ceil( WIDTH ), Math.ceil( HEIGHT ) );
                    subcamera.position.x = ( x / AMOUNT ) - 0.5;
                    subcamera.position.y = 0.5 - ( y / AMOUNT );
                    subcamera.position.z = 1.5;
                    subcamera.position.multiplyScalar( 2 );
                    subcamera.lookAt( 0, 0, 0 );
                    subcamera.updateMatrixWorld();
                    cameras.push( subcamera );

                }

            }

            camera = new THREE.ArrayCamera( cameras );
            camera.position.z = 3;

            scene = new THREE.Scene();

            scene.add( new THREE.AmbientLight( 0x222244 ) );

            const light = new THREE.DirectionalLight();
            light.position.set( 0.5, 0.5, 1 );
            light.castShadow = true;
            light.shadow.camera.zoom = 4; // tighter shadow map
            scene.add( light );

            const geometryBackground = new THREE.PlaneGeometry( 100, 100 );
            const materialBackground = new THREE.MeshPhongMaterial( { color: 0x000066 } );

            const background = new THREE.Mesh( geometryBackground, materialBackground );
            background.receiveShadow = true;
            background.position.set( 0, 0, - 1 );
            scene.add( background );

            const geometryCylinder = new THREE.CylinderGeometry( 0.5, 0.5, 1, 32 );
            const materialCylinder = new THREE.MeshPhongMaterial( { color: 0xff0000 } );

            mesh = new THREE.Mesh( geometryCylinder, materialCylinder );
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add( mesh );

            renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.shadowMap.enabled = true;
            document.body.appendChild( renderer.domElement );

            //

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            const ASPECT_RATIO = window.innerWidth / window.innerHeight;
            const WIDTH = ( window.innerWidth / AMOUNT ) * window.devicePixelRatio;
            const HEIGHT = ( window.innerHeight / AMOUNT ) * window.devicePixelRatio;

            camera.aspect = ASPECT_RATIO;
            camera.updateProjectionMatrix();

            for ( let y = 0; y < AMOUNT; y ++ ) {

                for ( let x = 0; x < AMOUNT; x ++ ) {

                    const subcamera = camera.cameras[ AMOUNT * y + x ];

                    subcamera.viewport.set(
                        Math.floor( x * WIDTH ),
                        Math.floor( y * HEIGHT ),
                        Math.ceil( WIDTH ),
                        Math.ceil( HEIGHT ) );

                    subcamera.aspect = ASPECT_RATIO;
                    subcamera.updateProjectionMatrix();

                }

            }

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function animate() {

            mesh.rotation.x += 0.005;
            mesh.rotation.z += 0.01;

            renderer.render( scene, camera );

            requestId = requestAnimationFrame(animate);

        }

    }
})
