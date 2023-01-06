// webgl/webgl_materials_envmaps_exr.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';

import { GUI } from './jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { EXRLoader } from './jsm/loaders/EXRLoader.js';
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
        const params = {
            envMap: 'EXR',
            roughness: 0.0,
            metalness: 0.0,
            exposure: 1.0,
            debug: false,
        };

        let container, stats;
        let camera, scene, renderer, controls;
        let torusMesh, planeMesh;
        let pngCubeRenderTarget, exrCubeRenderTarget;
        let pngBackground, exrBackground;

        init();
        animate();

        function init() {

            container = document.createElement( 'div' );
            document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.position.set( 0, 0, 120 );

            scene = new THREE.Scene();

            renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});

            //

            let geometry = new THREE.TorusKnotGeometry( 18, 8, 150, 20 );
            let material = new THREE.MeshStandardMaterial( {
                metalness: params.metalness,
                roughness: params.roughness,
                envMapIntensity: 1.0
            } );

            torusMesh = new THREE.Mesh( geometry, material );
            scene.add( torusMesh );

            geometry = new THREE.PlaneGeometry( 200, 200 );
            material = new THREE.MeshBasicMaterial();

            planeMesh = new THREE.Mesh( geometry, material );
            planeMesh.position.y = - 50;
            planeMesh.rotation.x = - Math.PI * 0.5;
            scene.add( planeMesh );

            THREE.DefaultLoadingManager.onLoad = function ( ) {

                pmremGenerator.dispose();

            };

            new EXRLoader()
                .load( 'textures/piz_compressed.exr', function ( texture ) {

                    exrCubeRenderTarget = pmremGenerator.fromEquirectangular( texture );
                    exrBackground = exrCubeRenderTarget.texture;

                    texture.dispose();

                } );

            new THREE.TextureLoader( ).load( 'textures/equirectangular.png', function ( texture ) {

                texture.encoding = THREE.sRGBEncoding;

                pngCubeRenderTarget = pmremGenerator.fromEquirectangular( texture );

                pngBackground = pngCubeRenderTarget.texture;

                texture.dispose();

            } );

            const pmremGenerator = new THREE.PMREMGenerator( renderer );
            pmremGenerator.compileEquirectangularShader();

            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );

            container.appendChild( renderer.domElement );

            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.outputEncoding = THREE.sRGBEncoding;

            stats = new Stats();
            container.appendChild( stats.dom );

            controls = new OrbitControls( camera, renderer.domElement );
            controls.minDistance = 50;
            controls.maxDistance = 300;

            window.addEventListener( 'resize', onWindowResize );

            const gui = new GUI();

            gui.add( params, 'envMap', [ 'EXR', 'PNG' ] );
            gui.add( params, 'roughness', 0, 1, 0.01 );
            gui.add( params, 'metalness', 0, 1, 0.01 );
            gui.add( params, 'exposure', 0, 2, 0.01 );
            gui.add( params, 'debug', false );
            gui.open();

        }

        function onWindowResize() {

            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize( width, height );

        }

        function animate() {

            requestId = requestAnimationFrame(animate);

            stats.begin();
            render();
            stats.end();

        }

        function render() {

            torusMesh.material.roughness = params.roughness;
            torusMesh.material.metalness = params.metalness;

            let newEnvMap = torusMesh.material.envMap;
            let background = scene.background;

            switch ( params.envMap ) {

                case 'EXR':
                    newEnvMap = exrCubeRenderTarget ? exrCubeRenderTarget.texture : null;
                    background = exrBackground;
                    break;
                case 'PNG':
                    newEnvMap = pngCubeRenderTarget ? pngCubeRenderTarget.texture : null;
                    background = pngBackground;
                    break;

            }

            if ( newEnvMap !== torusMesh.material.envMap ) {

                torusMesh.material.envMap = newEnvMap;
                torusMesh.material.needsUpdate = true;

                planeMesh.material.map = newEnvMap;
                planeMesh.material.needsUpdate = true;

            }

            torusMesh.rotation.y += 0.005;
            planeMesh.visible = params.debug;

            scene.background = background;
            renderer.toneMappingExposure = params.exposure;

            renderer.render( scene, camera );

        }
    }
})