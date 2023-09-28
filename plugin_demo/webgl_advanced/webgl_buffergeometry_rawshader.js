// webgl_advanced/webgl_buffergeometry_rawshader.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import Stats from './jsm/libs/stats.module.js';
const onekit = {
   "vertexShader":`

    precision mediump float;
    precision mediump int;

    uniform mat4 modelViewMatrix; // optional
    uniform mat4 projectionMatrix; // optional

    attribute vec3 position;
    attribute vec4 color;

    varying vec3 vPosition;
    varying vec4 vColor;

    void main()	{

        vPosition = position;
        vColor = color;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
 `,
 "fragmentShader":`

    precision mediump float;
    precision mediump int;

    uniform float time;

    varying vec3 vPosition;
    varying vec4 vColor;

    void main()	{

        vec4 color = vec4( vColor );
        color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

        gl_FragColor = color;

    }
`
}

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

let container, stats;

let camera, scene, renderer;

init();
animate();

function init() {

    container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10 );
    camera.position.z = 2;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x101010 );

    // geometry
    // nr of triangles with 3 vertices per triangle
    const vertexCount = 200 * 3;

    const geometry = new THREE.BufferGeometry();

    const positions = [];
    const colors = [];

    for ( let i = 0; i < vertexCount; i ++ ) {

        // adding x,y,z
        positions.push( Math.random() - 0.5 );
        positions.push( Math.random() - 0.5 );
        positions.push( Math.random() - 0.5 );

        // adding r,g,b,a
        colors.push( Math.random() * 255 );
        colors.push( Math.random() * 255 );
        colors.push( Math.random() * 255 );
        colors.push( Math.random() * 255 );

    }

    const positionAttribute = new THREE.Float32BufferAttribute( positions, 3 );
    const colorAttribute = new THREE.Uint8BufferAttribute( colors, 4 );

    colorAttribute.normalized = true; // this will map the buffer values to 0.0f - +1.0f in the shader

    geometry.setAttribute( 'position', positionAttribute );
    geometry.setAttribute( 'color', colorAttribute );

    // material

    const material = new THREE.RawShaderMaterial( {

        uniforms: {
            time: { value: 1.0 }
        },
        vertexShader: onekit['vertexShader' ],
        fragmentShader: onekit[ 'fragmentShader' ],
        side: THREE.DoubleSide,
        transparent: true

    } );

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    stats = new Stats();
    container.appendChild( stats.dom );

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

    const time = performance.now();

    const object = scene.children[ 0 ];

    object.rotation.y = time * 0.0005;
    object.material.uniforms.time.value = time * 0.005;

    renderer.render( scene, camera );

}
}
})