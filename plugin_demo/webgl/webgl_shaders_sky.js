// webgl/webgl_shaders_sky.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { GUI } from './jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from './jsm/controls/OrbitControls0.js';
import { Sky } from './jsm/objects/Sky.js';
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
        let camera, scene, renderer;

        let sky, sun;

        init();
        render();

        function initSky() {

            // Add Sky
            sky = new Sky();
            sky.scale.setScalar( 450000 );
            scene.add( sky );

            sun = new THREE.Vector3();

            /// GUI

            const effectController = {
                turbidity: 10,
                rayleigh: 3,
                mieCoefficient: 0.005,
                mieDirectionalG: 0.7,
                elevation: 2,
                azimuth: 180,
                exposure: renderer.toneMappingExposure
            };

            function guiChanged() {

                const uniforms = sky.material.uniforms;
                uniforms[ 'turbidity' ].value = effectController.turbidity;
                uniforms[ 'rayleigh' ].value = effectController.rayleigh;
                uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
                uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;

                const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
                const theta = THREE.MathUtils.degToRad( effectController.azimuth );

                sun.setFromSphericalCoords( 1, phi, theta );

                uniforms[ 'sunPosition' ].value.copy( sun );

                renderer.toneMappingExposure = effectController.exposure;
                renderer.render( scene, camera );

            }

            const gui = new GUI();

            gui.add( effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( guiChanged );
            gui.add( effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( guiChanged );
            gui.add( effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
            gui.add( effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
            gui.add( effectController, 'elevation', 0, 90, 0.1 ).onChange( guiChanged );
            gui.add( effectController, 'azimuth', - 180, 180, 0.1 ).onChange( guiChanged );
            gui.add( effectController, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );

            guiChanged();

        }

        function init() {

            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 100, 2000000 );
            camera.position.set( 0, 100, 2000 );

            scene = new THREE.Scene();

            const helper = new THREE.GridHelper( 10000, 2, 0xffffff, 0xffffff );
            scene.add( helper );

            renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 0.5;
            document.body.appendChild( renderer.domElement );

            const controls = new OrbitControls( camera, renderer.domElement );
            controls.addEventListener( 'change', render );
            //controls.maxPolarAngle = Math.PI / 2;
            controls.enableZoom = false;
            controls.enablePan = false;

            initSky();

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