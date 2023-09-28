// tests/webgl_furnace_test.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
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
        const web_e = Event0.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
let scene, camera, renderer, radianceMap;

const COLOR = 0xcccccc;

function init() {

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    // renderer

    renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
    renderer.setSize( width, height );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

    //renderer.outputEncoding = THREE.sRGBEncoding; // optional

    window.addEventListener( 'resize', onWindowResize );

    document.body.addEventListener( 'mouseover', function () {

        scene.traverse( function ( child ) {

            if ( child.isMesh ) child.material.color.setHex( 0xffffff );

        } );

        render();

    } );

    document.body.addEventListener( 'mouseout', function () {

        scene.traverse( function ( child ) {

            if ( child.isMesh ) child.material.color.setHex( 0xccccff ); // tinted for visibility

        } );

        render();

    } );

    // scene

    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera( 40, aspect, 1, 30 );
    camera.position.set( 0, 0, 18 );

}

function createObjects() {

    const geometry = new THREE.SphereGeometry( 0.4, 32, 16 );

    for ( let x = 0; x <= 10; x ++ ) {

        for ( let y = 0; y <= 10; y ++ ) {

            const material = new THREE.MeshPhysicalMaterial( {
                roughness: x / 10,
                metalness: y / 10,
                color: 0xffffff,
                envMap: radianceMap,
                envMapIntensity: 1,
                transmission: 0,
                ior: 1.5
            } );

            const mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = x - 5;
            mesh.position.y = 5 - y;
            scene.add( mesh );

        }

    }

}

function createEnvironment() {

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color( COLOR );
    if ( renderer.outputEncoding === THREE.sRGBEncoding ) envScene.background.convertSRGBToLinear();

    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    radianceMap = pmremGenerator.fromScene( envScene ).texture;
    pmremGenerator.dispose();

    scene.background = radianceMap;

}

function onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );

    render();

}

function render() {

    renderer.render( scene, camera );

}

Promise.resolve()
    .then( init )
    .then( createEnvironment )
    .then( createObjects )
    .then( render );
}
})