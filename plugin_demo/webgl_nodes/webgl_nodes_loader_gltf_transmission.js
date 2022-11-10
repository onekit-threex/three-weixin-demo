// webgl_nodes/webgl_nodes_loader_gltf_transmission.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import { NodeMaterial, float, texture, mul } from './jsm/nodes/Nodes.js';

import { nodeFrame } from './jsm/renderers/webgl/nodes/WebGLNodes.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { RGBELoader } from './jsm/loaders/RGBELoader.js';

import { DRACOLoader } from './jsm/loaders/DRACOLoader.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';

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
  async onLoad(){
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
        .load( 'royal_esplanade_1k.hdr', function ( envMap ) {

            envMap.mapping = THREE.EquirectangularReflectionMapping;

            scene.background = envMap;
            scene.environment = envMap;

            // model

            new GLTFLoader()
                .setPath( 'models/gltf/' )
                .setDRACOLoader( new DRACOLoader().setDecoderPath( 'js/libs/draco/gltf/' ) )
                .load( 'IridescentDishWithOlives.glb', function ( gltf ) {

                    // nodes

                    const glassMesh = gltf.scene.getObjectByName( 'glassCover' );

                    const material = glassMesh.material;

                    if ( material && material.transmission > 0 ) {

                        const nodeMaterial = NodeMaterial.fromMaterial( material );
                        nodeMaterial.transmissionNode = float( 1 );
                        nodeMaterial.iorNode = float( 1.5 );
                        nodeMaterial.thicknessNode = mul( texture( material.thicknessMap ).g, 0.1 );
                        //nodeMaterial.attenuationDistanceNode;
                        //nodeMaterial.attenuationColorNode;

                        // ignore traditional maps
                        nodeMaterial.transmissionMap = null;
                        nodeMaterial.thicknessMap = null;

                        glassMesh.material = nodeMaterial;

                    }

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

    nodeFrame.update();

    renderer.render( scene, camera );

}
}
})