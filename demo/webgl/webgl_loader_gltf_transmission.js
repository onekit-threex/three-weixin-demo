// webgl/webgl_loader_gltf_transmission.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { RGBELoader } from './jsm/loaders/RGBELoader.js';

import { DRACOLoader } from './jsm/loaders/DRACOLoader.js';
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
        let camera, scene, renderer, controls, clock, mixer;

        init();
        animate();

        function init() {

            clock = new THREE.Clock();

            const container = document.createElement( 'div' );
            document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
            camera.position.set( 0, 0.4, 0.7 );

            scene = new THREE.Scene();

            new RGBELoader()
                .setPath( 'textures/equirectangular/' )
                .load( 'royal_esplanade_1k.hdr', function ( texture ) {

                    texture.mapping = THREE.EquirectangularReflectionMapping;

                    scene.background = texture;
                    scene.environment = texture;

                    // model

                    new GLTFLoader()
                        .setPath( 'models/gltf/' )
                        .setDRACOLoader( new DRACOLoader().setDecoderPath( 'js/libs/draco/gltf/' ) )
                        .load( 'IridescentDishWithOlives.glb', function ( gltf ) {

                            mixer = new THREE.AnimationMixer( gltf.scene );
                            mixer.clipAction( gltf.animations[ 0 ] ).play();
                            scene.add( gltf.scene );

                        } );

                } );

            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1;
            renderer.outputEncoding = THREE.sRGBEncoding;
            container.appendChild( renderer.domElement );

            controls = new OrbitControls( camera, renderer.domElement );
            controls.enableDamping = true;
            controls.minDistance = 0.5;
            controls.maxDistance = 1;
            controls.target.set( 0, 0.1, 0 );
            controls.update();

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        //

        function animate() {

            requestId = requestAnimationFrame(animate);

            if ( mixer ) mixer.update( clock.getDelta() );

            controls.update(); // required if damping enabled

            render();

        }

        function render() {

            renderer.render( scene, camera );

        }
    }
})