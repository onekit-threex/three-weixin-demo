// webgl_postprocessing/webgl_postprocessing_pixel.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';

import { TrackballControls } from './jsm/controls/TrackballControls.js';
import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './jsm/postprocessing/ShaderPass.js';
import { PixelShader } from './jsm/shaders/PixelShader.js';

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
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this

let camera, scene, renderer, gui, composer, controls;
let pixelPass, params;

let group;

init();
animate();

function updateGUI() {

    pixelPass.uniforms[ 'pixelSize' ].value = params.pixelSize;

}

function init() {

    const container = document.getElementById( 'container' );
    renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 0, 0, 30 );
    controls = new TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 2.0;
    controls.panSpeed = 0.8;
    controls.zoomSpeed = 1.5;

    scene = new THREE.Scene();

    const hemisphereLight = new THREE.HemisphereLight( 0xfceafc, 0x000000, .8 );
    scene.add( hemisphereLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff, .5 );
    dirLight.position.set( 150, 75, 150 );
    scene.add( dirLight );

    const dirLight2 = new THREE.DirectionalLight( 0xffffff, .2 );
    dirLight2.position.set( - 150, 75, - 150 );
    scene.add( dirLight2 );

    const dirLight3 = new THREE.DirectionalLight( 0xffffff, .1 );
    dirLight3.position.set( 0, 125, 0 );
    scene.add( dirLight3 );

    const geometries = [
        new THREE.SphereGeometry( 1, 64, 64 ),
        new THREE.BoxGeometry( 1, 1, 1 ),
        new THREE.ConeGeometry( 1, 1, 32 ),
        new THREE.TetrahedronGeometry( 1 ),
        new THREE.TorusKnotGeometry( 1, .4 )
    ];

    group = new THREE.Group();

    for ( let i = 0; i < 25; i ++ ) {

        const geom = geometries[ Math.floor( Math.random() * geometries.length ) ];

        const color = new THREE.Color();
        color.setHSL( Math.random(), .7 + .2 * Math.random(), .5 + .1 * Math.random() );

        const mat = new THREE.MeshPhongMaterial( { color: color, shininess: 200 } );

        const mesh = new THREE.Mesh( geom, mat );

        const s = 4 + Math.random() * 10;
        mesh.scale.set( s, s, s );
        mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
        mesh.position.multiplyScalar( Math.random() * 200 );
        mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
        group.add( mesh );

    }

    scene.add( group );

    composer = new EffectComposer( renderer );
    composer.addPass( new RenderPass( scene, camera ) );

    pixelPass = new ShaderPass( PixelShader );
    pixelPass.uniforms[ 'resolution' ].value = new THREE.Vector2( window.innerWidth, window.innerHeight );
    pixelPass.uniforms[ 'resolution' ].value.multiplyScalar( window.devicePixelRatio );
    composer.addPass( pixelPass );

    window.addEventListener( 'resize', onWindowResize );

    params = {
        pixelSize: 16,
        postprocessing: true
    };
    gui = new GUI();
    gui.add( params, 'pixelSize' ).min( 2 ).max( 32 ).step( 2 );
    gui.add( params, 'postprocessing' );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

    pixelPass.uniforms[ 'resolution' ].value.set( window.innerWidth, window.innerHeight ).multiplyScalar( window.devicePixelRatio );

}

function update() {

    controls.update();
    updateGUI();

    group.rotation.y += .0015;
    group.rotation.z += .001;

}

function animate() {

    update();

    if ( params.postprocessing ) {

        composer.render();

    } else {

        renderer.render( scene, camera );

    }

    window.requestAnimationFrame(animate);

}
}
})