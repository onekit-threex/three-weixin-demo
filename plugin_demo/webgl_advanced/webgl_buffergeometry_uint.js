// webgl_advanced/webgl_buffergeometry_uint.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import Stats from './jsm/libs/stats.module.js';

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

let camera, scene, renderer;

let mesh;

init();
animate();

function init() {

    container = document.getElementById( 'container' );

    //

    camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
    camera.position.z = 2750;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x050505 );
    scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

    //

    scene.add( new THREE.AmbientLight( 0x444444 ) );

    const light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light1.position.set( 1, 1, 1 );
    scene.add( light1 );

    const light2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light2.position.set( 0, - 1, 0 );
    scene.add( light2 );

    //

    const triangles = 500000;

    const geometry = new THREE.BufferGeometry();

    const positions = [];
    const normals = [];
    const colors = [];

    const color = new THREE.Color();

    const n = 800, n2 = n / 2;	// triangles spread in the cube
    const d = 12, d2 = d / 2;	// individual triangle size

    const pA = new THREE.Vector3();
    const pB = new THREE.Vector3();
    const pC = new THREE.Vector3();

    const cb = new THREE.Vector3();
    const ab = new THREE.Vector3();

    for ( let i = 0; i < triangles; i ++ ) {

        // positions

        const x = Math.random() * n - n2;
        const y = Math.random() * n - n2;
        const z = Math.random() * n - n2;

        const ax = x + Math.random() * d - d2;
        const ay = y + Math.random() * d - d2;
        const az = z + Math.random() * d - d2;

        const bx = x + Math.random() * d - d2;
        const by = y + Math.random() * d - d2;
        const bz = z + Math.random() * d - d2;

        const cx = x + Math.random() * d - d2;
        const cy = y + Math.random() * d - d2;
        const cz = z + Math.random() * d - d2;

        positions.push( ax, ay, az );
        positions.push( bx, by, bz );
        positions.push( cx, cy, cz );

        // flat face normals

        pA.set( ax, ay, az );
        pB.set( bx, by, bz );
        pC.set( cx, cy, cz );

        cb.subVectors( pC, pB );
        ab.subVectors( pA, pB );
        cb.cross( ab );

        cb.normalize();

        const nx = cb.x;
        const ny = cb.y;
        const nz = cb.z;

        normals.push( nx * 32767, ny * 32767, nz * 32767 );
        normals.push( nx * 32767, ny * 32767, nz * 32767 );
        normals.push( nx * 32767, ny * 32767, nz * 32767 );

        // colors

        const vx = ( x / n ) + 0.5;
        const vy = ( y / n ) + 0.5;
        const vz = ( z / n ) + 0.5;

        color.setRGB( vx, vy, vz );

        colors.push( color.r * 255, color.g * 255, color.b * 255 );
        colors.push( color.r * 255, color.g * 255, color.b * 255 );
        colors.push( color.r * 255, color.g * 255, color.b * 255 );

    }

    const positionAttribute = new THREE.Float32BufferAttribute( positions, 3 );
    const normalAttribute = new THREE.Int16BufferAttribute( normals, 3 );
    const colorAttribute = new THREE.Uint8BufferAttribute( colors, 3 );

    normalAttribute.normalized = true; // this will map the buffer values to 0.0f - +1.0f in the shader
    colorAttribute.normalized = true;

    geometry.setAttribute( 'position', positionAttribute );
    geometry.setAttribute( 'normal', normalAttribute );
    geometry.setAttribute( 'color', colorAttribute );

    geometry.computeBoundingSphere();

    const material = new THREE.MeshPhongMaterial( {
        color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
        side: THREE.DoubleSide, vertexColors: true
    } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    //

    renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;

    container.appendChild( renderer.domElement );

    //

    stats = new Stats();
    container.appendChild( stats.dom );

    //

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

    render();
    stats.update();

}

function render() {

    const time = Date.now() * 0.001;

    mesh.rotation.x = time * 0.25;
    mesh.rotation.y = time * 0.5;

    renderer.render( scene, camera );

}
}
})