// webgl_postprocessing/webgl_postprocessing_3dlut.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
			import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
			import { RGBELoader } from './jsm/loaders/RGBELoader.js';
			import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
			import { RenderPass } from './jsm/postprocessing/RenderPass.js';
			import { ShaderPass } from './jsm/postprocessing/ShaderPass.js';
			import { LUTPass } from './jsm/postprocessing/LUTPass.js';
			import { LUTCubeLoader } from './jsm/loaders/LUTCubeLoader.js';
			import { LUT3dlLoader } from './jsm/loaders/LUT3dlLoader.js';
			import { GammaCorrectionShader } from './jsm/shaders/GammaCorrectionShader.js';
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
	    webgl_touch(e) {
        const web_e = Event.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this

const params = {
    enabled: true,
    lut: 'Bourbon 64.CUBE',
    intensity: 1,
    use2DLut: false,
};

const lutMap = {
    'Bourbon 64.CUBE': null,
    'Chemical 168.CUBE': null,
    'Clayton 33.CUBE': null,
    'Cubicle 99.CUBE': null,
    'Remy 24.CUBE': null,
    'Presetpro-Cinematic.3dl': null
};

let gui;
let camera, scene, renderer;
let composer, lutPass;

init();
render();

function init() {

    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
    camera.position.set( - 1.8, 0.6, 2.7 );

    scene = new THREE.Scene();

    new RGBELoader()
        .setPath( 'textures/equirectangular/' )
        .load( 'royal_esplanade_1k.hdr', function ( texture ) {

            texture.mapping = THREE.EquirectangularReflectionMapping;

            scene.background = texture;
            scene.environment = texture;

            // model

            const loader = new GLTFLoader().setPath( 'models/gltf/DamagedHelmet/glTF/' );
            loader.load( 'DamagedHelmet.gltf', function ( gltf ) {

                scene.add( gltf.scene );

            } );

        } );

    Object.keys( lutMap ).forEach( name => {

        if ( /\.CUBE$/i.test( name ) ) {

            new LUTCubeLoader()
                .load( 'luts/' + name, function ( result ) {

                    lutMap[ name ] = result;

                } );

        } else {

            new LUT3dlLoader()
                .load( 'luts/' + name, function ( result ) {

                    lutMap[ name ] = result;

                } );

        }

    } );

    renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild( renderer.domElement );

    const target = new THREE.WebGLRenderTarget( {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        encoding: THREE.sRGBEncoding
    } );

    composer = new EffectComposer( renderer, target );
    composer.setPixelRatio( window.devicePixelRatio );
    composer.setSize( window.innerWidth, window.innerHeight );
    composer.addPass( new RenderPass( scene, camera ) );
    composer.addPass( new ShaderPass( GammaCorrectionShader ) );

    lutPass = new LUTPass();
    composer.addPass( lutPass );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set( 0, 0, - 0.2 );
    controls.update();

    gui = new GUI();
    gui.width = 350;
    gui.add( params, 'enabled' );
    gui.add( params, 'lut', Object.keys( lutMap ) );
    gui.add( params, 'intensity' ).min( 0 ).max( 1 );

    if ( renderer.capabilities.isWebGL2 ) {

        gui.add( params, 'use2DLut' );

    } else {

        params.use2DLut = true;

    }

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize( window.innerWidth, window.innerHeight );

    render();

}

//

function render() {

    requestId = requestAnimationFrame( render );

    lutPass.enabled = params.enabled && Boolean( lutMap[ params.lut ] );
    lutPass.intensity = params.intensity;
    if ( lutMap[ params.lut ] ) {

        const lut = lutMap[ params.lut ];
        lutPass.lut = params.use2DLut ? lut.texture : lut.texture3D;

    }

    composer.render();

}

}
})