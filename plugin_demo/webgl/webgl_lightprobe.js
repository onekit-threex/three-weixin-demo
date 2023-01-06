// webgl/webgl_lightprobe.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { GUI } from './jsm/libs/lil-gui.module.min.js';

			import { OrbitControls } from './jsm/controls/OrbitControls.js';
			import { LightProbeGenerator } from './jsm/lights/LightProbeGenerator.js';
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
        
        let mesh, renderer, scene, camera;

        let gui;

        let lightProbe;
        let directionalLight;

        // linear color space
        const API = {
            lightProbeIntensity: 1.0,
            directionalLightIntensity: 0.2,
            envMapIntensity: 1
        };

        init();

        function init() {

            // renderer
            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            // tone mapping
            renderer.toneMapping = THREE.NoToneMapping;

            renderer.outputEncoding = THREE.sRGBEncoding;

            // scene
            scene = new THREE.Scene();

            // camera
            camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.position.set( 0, 0, 30 );

            // controls
            const controls = new OrbitControls( camera, renderer.domElement );
            controls.addEventListener( 'change', render );
            controls.minDistance = 10;
            controls.maxDistance = 50;
            controls.enablePan = false;

            // probe
            lightProbe = new THREE.LightProbe();
            scene.add( lightProbe );

            // light
            directionalLight = new THREE.DirectionalLight( 0xffffff, API.directionalLightIntensity );
            directionalLight.position.set( 10, 10, 10 );
            scene.add( directionalLight );

            // envmap
            const genCubeUrls = function ( prefix, postfix ) {

                return [
                    prefix + 'px' + postfix, prefix + 'nx' + postfix,
                    prefix + 'py' + postfix, prefix + 'ny' + postfix,
                    prefix + 'pz' + postfix, prefix + 'nz' + postfix
                ];

            };

            const urls = genCubeUrls( 'textures/cube/pisa/', '.png' );

            new THREE.CubeTextureLoader().load( urls, function ( cubeTexture ) {

                cubeTexture.encoding = THREE.sRGBEncoding;

                scene.background = cubeTexture;

                lightProbe.copy( LightProbeGenerator.fromCubeTexture( cubeTexture ) );

                const geometry = new THREE.SphereGeometry( 5, 64, 32 );
                //const geometry = new THREE.TorusKnotGeometry( 4, 1.5, 256, 32, 2, 3 );

                const material = new THREE.MeshStandardMaterial( {
                    color: 0xffffff,
                    metalness: 0,
                    roughness: 0,
                    envMap: cubeTexture,
                    envMapIntensity: API.envMapIntensity,
                } );

                // mesh
                mesh = new THREE.Mesh( geometry, material );
                scene.add( mesh );

                render();

            } );


            // gui
            gui = new GUI( { title: 'Intensity' } );

            gui.add( API, 'lightProbeIntensity', 0, 1, 0.02 )
                .name( 'light probe' )
                .onChange( function () {

                    lightProbe.intensity = API.lightProbeIntensity; render();

                } );

            gui.add( API, 'directionalLightIntensity', 0, 1, 0.02 )
                .name( 'directional light' )
                .onChange( function () {

                    directionalLight.intensity = API.directionalLightIntensity; render();

                } );

            gui.add( API, 'envMapIntensity', 0, 1, 0.02 )
                .name( 'envMap' )
                .onChange( function () {

                    mesh.material.envMapIntensity = API.envMapIntensity; render();

                } );

            // listener
            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            renderer.setSize( window.innerWidth, window.innerHeight );

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            render();

        }

        function render() {

            renderer.render( scene, camera );

        }
    }
})