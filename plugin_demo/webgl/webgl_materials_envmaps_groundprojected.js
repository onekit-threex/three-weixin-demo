// webgl/webgl_materials_envmaps_groundprojected.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { GUI } from './jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from './jsm/controls/OrbitControls0.js';
import { GroundProjectedEnv } from './jsm/objects/GroundProjectedEnv.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from './jsm/loaders/DRACOLoader.js';
import { RGBELoader } from './jsm/loaders/RGBELoader.js';
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

        const params = {
            height: 20,
            radius: 440
        };

        let camera, scene, renderer, env;

        init().then( render );

        async function init() {

            camera = new THREE.PerspectiveCamera(
                40,
                window.innerWidth / window.innerHeight,
                1,
                1000
            );
            camera.position.set( - 20, 7, 20 );
            camera.lookAt( 0, 4, 0 );

            scene = new THREE.Scene();

            const hdrLoader = new RGBELoader();
            const envMap = await hdrLoader.loadAsync( 'textures/equirectangular/blouberg_sunrise_2_1k.hdr' );
            envMap.mapping = THREE.EquirectangularReflectionMapping;

            env = new GroundProjectedEnv( envMap );
            env.scale.setScalar( 100 );
            scene.add( env );

            scene.environment = envMap;

            const dracoLoader = this.dracoLoader=new DRACOLoader();
            dracoLoader.setDecoderPath( 'js/libs/draco/gltf/' );

            const loader = new GLTFLoader();
            loader.setDRACOLoader( dracoLoader );

            const shadow = new THREE.TextureLoader( ).load( 'models/gltf/ferrari_ao.png' );

            loader.load( 'models/gltf/ferrari.glb', function ( gltf ) {

                const bodyMaterial = new THREE.MeshPhysicalMaterial( {
                    color: 0x000000, metalness: 1.0, roughness: 0.8,
                    clearcoat: 1.0, clearcoatRoughness: 0.2
                } );

                const detailsMaterial = new THREE.MeshStandardMaterial( {
                    color: 0xffffff, metalness: 1.0, roughness: 0.5
                } );

                const glassMaterial = new THREE.MeshPhysicalMaterial( {
                    color: 0xffffff, metalness: 0.25, roughness: 0, transmission: 1.0
                } );

                const carModel = gltf.scene.children[ 0 ];
                carModel.scale.multiplyScalar( 4 );
                carModel.rotation.y = Math.PI;

                carModel.getObjectByName( 'body' ).material = bodyMaterial;

                carModel.getObjectByName( 'rim_fl' ).material = detailsMaterial;
                carModel.getObjectByName( 'rim_fr' ).material = detailsMaterial;
                carModel.getObjectByName( 'rim_rr' ).material = detailsMaterial;
                carModel.getObjectByName( 'rim_rl' ).material = detailsMaterial;
                carModel.getObjectByName( 'trim' ).material = detailsMaterial;

                carModel.getObjectByName( 'glass' ).material = glassMaterial;

                // shadow
                const mesh = new THREE.Mesh(
                    new THREE.PlaneGeometry( 0.655 * 4, 1.3 * 4 ),
                    new THREE.MeshBasicMaterial( {
                        map: shadow, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
                    } )
                );
                mesh.rotation.x = - Math.PI / 2;
                mesh.renderOrder = 2;
                carModel.add( mesh );

                scene.add( carModel );

                render();

            } );

            //

            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;

            //

            const controls = new OrbitControls( camera, renderer.domElement );
            controls.addEventListener( 'change', render );
            controls.target.set( 0, 2, 0 );
            controls.maxPolarAngle = THREE.MathUtils.degToRad( 90 );
            controls.maxDistance = 80;
            controls.minDistance = 20;
            controls.enablePan = false;
            controls.update();

            const gui = new GUI();
            gui.add( params, 'height', 20, 50, 0.1 ).onChange( render );
            gui.add( params, 'radius', 200, 600, 0.1 ).onChange( render );

            //

            document.body.appendChild( renderer.domElement );
            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function render() {

            renderer.render( scene, camera );

            env.radius = params.radius;
            env.height = params.height;

        }
    }
})