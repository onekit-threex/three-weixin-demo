// misc/misc_exporter_usdz.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,Blob,URL} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import { OrbitControls } from './jsm/controls/OrbitControls0.js';
import { RoomEnvironment } from './jsm/environments/RoomEnvironment.js';

import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { USDZExporter } from './jsm/exporters/USDZExporter.js';

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
let camera, scene, renderer;

init();
render();

function init() {

    renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
    camera.position.set( - 2.5, 0.6, 3.0 );

    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );
    scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

    const loader = new GLTFLoader().setPath( 'models/gltf/DamagedHelmet/glTF/' );
    loader.load( 'DamagedHelmet.gltf', async function ( gltf ) {

        scene.add( gltf.scene );

        const shadowMesh = createSpotShadowMesh();
        shadowMesh.position.y = - 1.1;
        shadowMesh.position.z = - 0.25;
        shadowMesh.scale.setScalar( 2 );
        scene.add( shadowMesh );

        render();

        // USDZ

        const exporter = new USDZExporter();
        const arraybuffer = await exporter.parse( gltf.scene );
        const blob = new Blob( [ arraybuffer ], { type: 'application/octet-stream' } );

        const link = document.getElementById( 'link' );
        link.href = URL.createObjectURL( blob );

    } );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set( 0, - 0.15, - 0.2 );
    controls.update();

    window.addEventListener( 'resize', onWindowResize );

}

function createSpotShadowMesh() {

    const canvas = document.createElement( 'canvas' );
    canvas.width = 128;
    canvas.height = 128;

    const context = canvas.getContext( '2d' );
    const gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
    gradient.addColorStop( 0.1, 'rgba(130,130,130,1)' );
    gradient.addColorStop( 1, 'rgba(255,255,255,1)' );

    context.fillStyle = gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );

    const shadowTexture = new THREE.CanvasTexture( canvas );

    const geometry = new THREE.PlaneGeometry();
    const material = new THREE.MeshBasicMaterial( {
        map: shadowTexture, blending: THREE.MultiplyBlending, toneMapped: false
    } );

    const mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.x = - Math.PI / 2;

    return mesh;

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

//

function render() {

    renderer.render( scene, camera );

}

}
})