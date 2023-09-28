// webgl/webgl_skinning_simple.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls0.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
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
        let stats, mixer, camera, scene, renderer, clock;

        init();
        animate();

        function init() {

            const container = document.createElement( 'div' );
            document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.position.set( 18, 6, 18 );

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xa0a0a0 );
            scene.fog = new THREE.Fog( 0xa0a0a0, 70, 100 );

            clock = new THREE.Clock();

            // ground

            const geometry = new THREE.PlaneGeometry( 500, 500 );
            const material = new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } );

            const ground = new THREE.Mesh( geometry, material );
            ground.position.set( 0, - 5, 0 );
            ground.rotation.x = - Math.PI / 2;
            ground.receiveShadow = true;
            scene.add( ground );

            const grid = new THREE.GridHelper( 500, 100, 0x000000, 0x000000 );
            grid.position.y = - 5;
            grid.material.opacity = 0.2;
            grid.material.transparent = true;
            scene.add( grid );

            // lights

            const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.6 );
            hemiLight.position.set( 0, 200, 0 );
            scene.add( hemiLight );

            const dirLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
            dirLight.position.set( 0, 20, 10 );
            dirLight.castShadow = true;
            dirLight.shadow.camera.top = 18;
            dirLight.shadow.camera.bottom = - 10;
            dirLight.shadow.camera.left = - 12;
            dirLight.shadow.camera.right = 12;
            scene.add( dirLight );

            //

            const loader = new GLTFLoader();
            loader.load( './models/gltf/SimpleSkinning.gltf', function ( gltf ) {

                scene.add( gltf.scene );

                gltf.scene.traverse( function ( child ) {

                    if ( child.isSkinnedMesh ) child.castShadow = true;

                } );

                mixer = new THREE.AnimationMixer( gltf.scene );
                mixer.clipAction( gltf.animations[ 0 ] ).play();

            } );

            //

            renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.shadowMap.enabled = true;
            container.appendChild( renderer.domElement );

            //

            stats = new Stats();
            container.appendChild( stats.dom );

            const controls = new OrbitControls( camera, renderer.domElement );
            controls.enablePan = false;
            controls.minDistance = 5;
            controls.maxDistance = 50;

        }

        function animate() {

            requestId = requestAnimationFrame(animate);

            if ( mixer ) mixer.update( clock.getDelta() );

            render();
            stats.update();

        }

        function render() {

            renderer.render( scene, camera );

        }
    }
})