// webgl_postprocessing/webgl_postprocessing_advanced.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';

import * as THREE from '../three/Three.js';
import Stats from './jsm/libs/stats.module.js';

import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './jsm/postprocessing/ShaderPass.js';
import { BloomPass } from './jsm/postprocessing/BloomPass.js';
import { FilmPass } from './jsm/postprocessing/FilmPass.js';
import { DotScreenPass } from './jsm/postprocessing/DotScreenPass.js';
import { MaskPass, ClearMaskPass } from './jsm/postprocessing/MaskPass.js';
import { TexturePass } from './jsm/postprocessing/TexturePass.js';

import { BleachBypassShader } from './jsm/shaders/BleachBypassShader.js';
import { ColorifyShader } from './jsm/shaders/ColorifyShader.js';
import { HorizontalBlurShader } from './jsm/shaders/HorizontalBlurShader.js';
import { VerticalBlurShader } from './jsm/shaders/VerticalBlurShader.js';
import { SepiaShader } from './jsm/shaders/SepiaShader.js';
import { VignetteShader } from './jsm/shaders/VignetteShader.js';
import { GammaCorrectionShader } from './jsm/shaders/GammaCorrectionShader.js';

import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
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


let container, stats;

let composerScene, composer1, composer2, composer3, composer4;

let cameraOrtho, cameraPerspective, sceneModel, sceneBG, renderer, mesh, directionalLight;

const width = window.innerWidth || 2;
const height = window.innerHeight || 2;

let halfWidth = width / 2;
let halfHeight = height / 2;

let quadBG, quadMask, renderScene;

const delta = 0.01;

init();
animate();

function init() {

    container = document.getElementById( 'container' );

    //

    cameraOrtho = new THREE.OrthographicCamera( - halfWidth, halfWidth, halfHeight, - halfHeight, - 10000, 10000 );
    cameraOrtho.position.z = 100;

    cameraPerspective = new THREE.PerspectiveCamera( 50, width / height, 1, 10000 );
    cameraPerspective.position.z = 900;

    //

    sceneModel = new THREE.Scene();
    sceneBG = new THREE.Scene();

    //

    directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 0, - 0.1, 1 ).normalize();
    sceneModel.add( directionalLight );

    const loader = new GLTFLoader();
    loader.load( 'models/gltf/LeePerrySmith/LeePerrySmith.glb', function ( gltf ) {

        createMesh( gltf.scene.children[ 0 ].geometry, sceneModel, 100 );

    } );

    //

    const diffuseMap = new THREE.TextureLoader( ).load( 'textures/cube/SwedishRoyalCastle/pz.jpg' );
    diffuseMap.encoding = THREE.sRGBEncoding;

    const materialColor = new THREE.MeshBasicMaterial( {
        map: diffuseMap,
        depthTest: false
    } );

    quadBG = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ), materialColor );
    quadBG.position.z = - 500;
    quadBG.scale.set( width, height, 1 );
    sceneBG.add( quadBG );

    //

    const sceneMask = new THREE.Scene();

    quadMask = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ), new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) );
    quadMask.position.z = - 300;
    quadMask.scale.set( width / 2, height / 2, 1 );
    sceneMask.add( quadMask );

    //

    renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    renderer.autoClear = false;

    //

    container.appendChild( renderer.domElement );

    //

    stats = new Stats();
    container.appendChild( stats.dom );

    //

    const shaderBleach = BleachBypassShader;
    const shaderSepia = SepiaShader;
    const shaderVignette = VignetteShader;

    const effectBleach = new ShaderPass( shaderBleach );
    const effectSepia = new ShaderPass( shaderSepia );
    const effectVignette = new ShaderPass( shaderVignette );
    const gammaCorrection = new ShaderPass( GammaCorrectionShader );

    effectBleach.uniforms[ 'opacity' ].value = 0.95;

    effectSepia.uniforms[ 'amount' ].value = 0.9;

    effectVignette.uniforms[ 'offset' ].value = 0.95;
    effectVignette.uniforms[ 'darkness' ].value = 1.6;

    const effectBloom = new BloomPass( 0.5 );
    const effectFilm = new FilmPass( 0.35, 0.025, 648, false );
    const effectFilmBW = new FilmPass( 0.35, 0.5, 2048, true );
    const effectDotScreen = new DotScreenPass( new THREE.Vector2( 0, 0 ), 0.5, 0.8 );

    const effectHBlur = new ShaderPass( HorizontalBlurShader );
    const effectVBlur = new ShaderPass( VerticalBlurShader );
    effectHBlur.uniforms[ 'h' ].value = 2 / ( width / 2 );
    effectVBlur.uniforms[ 'v' ].value = 2 / ( height / 2 );

    const effectColorify1 = new ShaderPass( ColorifyShader );
    const effectColorify2 = new ShaderPass( ColorifyShader );
    effectColorify1.uniforms[ 'color' ] = new THREE.Uniform( new THREE.Color( 1, 0.8, 0.8 ) );
    effectColorify2.uniforms[ 'color' ] = new THREE.Uniform( new THREE.Color( 1, 0.75, 0.5 ) );

    const clearMask = new ClearMaskPass();
    const renderMask = new MaskPass( sceneModel, cameraPerspective );
    const renderMaskInverse = new MaskPass( sceneModel, cameraPerspective );

    renderMaskInverse.inverse = true;

    //

    const rtParameters = {
        stencilBuffer: true
    };

    const rtWidth = width / 2;
    const rtHeight = height / 2;

    //

    const renderBackground = new RenderPass( sceneBG, cameraOrtho );
    const renderModel = new RenderPass( sceneModel, cameraPerspective );

    renderModel.clear = false;

    composerScene = new EffectComposer( renderer, new THREE.WebGLRenderTarget( rtWidth * 2, rtHeight * 2, rtParameters ) );

    composerScene.addPass( renderBackground );
    composerScene.addPass( renderModel );
    composerScene.addPass( renderMaskInverse );
    composerScene.addPass( effectHBlur );
    composerScene.addPass( effectVBlur );
    composerScene.addPass( clearMask );

    //

    renderScene = new TexturePass( composerScene.renderTarget2.texture );

    //

    composer1 = new EffectComposer( renderer, new THREE.WebGLRenderTarget( rtWidth, rtHeight, rtParameters ) );

    composer1.addPass( renderScene );
    composer1.addPass( gammaCorrection );
    composer1.addPass( effectFilmBW );
    composer1.addPass( effectVignette );

    //

    composer2 = new EffectComposer( renderer, new THREE.WebGLRenderTarget( rtWidth, rtHeight, rtParameters ) );

    composer2.addPass( renderScene );
    composer2.addPass( gammaCorrection );
    composer2.addPass( effectDotScreen );
    composer2.addPass( renderMask );
    composer2.addPass( effectColorify1 );
    composer2.addPass( clearMask );
    composer2.addPass( renderMaskInverse );
    composer2.addPass( effectColorify2 );
    composer2.addPass( clearMask );
    composer2.addPass( effectVignette );

    //

    composer3 = new EffectComposer( renderer, new THREE.WebGLRenderTarget( rtWidth, rtHeight, rtParameters ) );

    composer3.addPass( renderScene );
    composer3.addPass( gammaCorrection );
    composer3.addPass( effectSepia );
    composer3.addPass( effectFilm );
    composer3.addPass( effectVignette );

    //

    composer4 = new EffectComposer( renderer, new THREE.WebGLRenderTarget( rtWidth, rtHeight, rtParameters ) );

    composer4.addPass( renderScene );
    composer4.addPass( gammaCorrection );
    composer4.addPass( effectBloom );
    composer4.addPass( effectFilm );
    composer4.addPass( effectBleach );
    composer4.addPass( effectVignette );

    renderScene.uniforms[ 'tDiffuse' ].value = composerScene.renderTarget2.texture;

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    halfWidth = window.innerWidth / 2;
    halfHeight = window.innerHeight / 2;

    cameraPerspective.aspect = window.innerWidth / window.innerHeight;
    cameraPerspective.updateProjectionMatrix();

    cameraOrtho.left = - halfWidth;
    cameraOrtho.right = halfWidth;
    cameraOrtho.top = halfHeight;
    cameraOrtho.bottom = - halfHeight;

    cameraOrtho.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    composerScene.setSize( halfWidth * 2, halfHeight * 2 );

    composer1.setSize( halfWidth, halfHeight );
    composer2.setSize( halfWidth, halfHeight );
    composer3.setSize( halfWidth, halfHeight );
    composer4.setSize( halfWidth, halfHeight );

    renderScene.uniforms[ 'tDiffuse' ].value = composerScene.renderTarget2.texture;

    quadBG.scale.set( window.innerWidth, window.innerHeight, 1 );
    quadMask.scale.set( window.innerWidth / 2, window.innerHeight / 2, 1 );

}

function createMesh( geometry, scene, scale ) {

    const diffuseMap = new THREE.TextureLoader( ).load( 'models/gltf/LeePerrySmith/Map-COL.jpg' );
    diffuseMap.encoding = THREE.sRGBEncoding;

    const mat2 = new THREE.MeshPhongMaterial( {

        color: 0x999999,
        specular: 0x080808,
        shininess: 20,
        map: diffuseMap,
        normalMap: new THREE.TextureLoader( ).load( 'models/gltf/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg' ),
        normalScale: new THREE.Vector2( 0.75, 0.75 )

    } );

    mesh = new THREE.Mesh( geometry, mat2 );
    mesh.position.set( 0, - 50, 0 );
    mesh.scale.set( scale, scale, scale );

    scene.add( mesh );

}

//

function animate() {

    requestId = requestAnimationFrame(animate);

    stats.begin();
    render();
    stats.end();

}

function render() {

    const time = Date.now() * 0.0004;

    if ( mesh ) mesh.rotation.y = - time;

    renderer.setViewport( 0, 0, halfWidth, halfHeight );
    composerScene.render( delta );

    renderer.setViewport( 0, 0, halfWidth, halfHeight );
    composer1.render( delta );

    renderer.setViewport( halfWidth, 0, halfWidth, halfHeight );
    composer2.render( delta );

    renderer.setViewport( 0, halfHeight, halfWidth, halfHeight );
    composer3.render( delta );

    renderer.setViewport( halfWidth, halfHeight, halfWidth, halfHeight );
    composer4.render( delta );

}

}
})