// webgl_advanced/webgl_buffergeometry_instancing.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import Stats from './jsm/libs/stats.module.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';

const onekit = {
   "vertexShader":`
		precision highp float;

		uniform float sineTime;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec3 offset;
		attribute vec4 color;
		attribute vec4 orientationStart;
		attribute vec4 orientationEnd;

		varying vec3 vPosition;
		varying vec4 vColor;

		void main(){

			vPosition = offset * max( abs( sineTime * 2.0 + 1.0 ), 0.5 ) + position;
			vec4 orientation = normalize( mix( orientationStart, orientationEnd, sineTime ) );
			vec3 vcV = cross( orientation.xyz, vPosition );
			vPosition = vcV * ( 2.0 * orientation.w ) + ( cross( orientation.xyz, vcV ) * 2.0 + vPosition );

			vColor = color;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );

		}
`,
"fragmentShader":`

		precision highp float;

		uniform float time;

		varying vec3 vPosition;
		varying vec4 vColor;

		void main() {

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

    // geometry

    const vector = new THREE.Vector4();

    const instances = 50000;

    const positions = [];
    const offsets = [];
    const colors = [];
    const orientationsStart = [];
    const orientationsEnd = [];

    positions.push( 0.025, - 0.025, 0 );
    positions.push( - 0.025, 0.025, 0 );
    positions.push( 0, 0, 0.025 );

    // instanced attributes

    for ( let i = 0; i < instances; i ++ ) {

        // offsets

        offsets.push( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );

        // colors

        colors.push( Math.random(), Math.random(), Math.random(), Math.random() );

        // orientation start

        vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
        vector.normalize();

        orientationsStart.push( vector.x, vector.y, vector.z, vector.w );

        // orientation end

        vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
        vector.normalize();

        orientationsEnd.push( vector.x, vector.y, vector.z, vector.w );

    }

    const geometry = new THREE.InstancedBufferGeometry();
    geometry.instanceCount = instances; // set so its initalized for dat.GUI, will be set in first draw otherwise

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );

    geometry.setAttribute( 'offset', new THREE.InstancedBufferAttribute( new Float32Array( offsets ), 3 ) );
    geometry.setAttribute( 'color', new THREE.InstancedBufferAttribute( new Float32Array( colors ), 4 ) );
    geometry.setAttribute( 'orientationStart', new THREE.InstancedBufferAttribute( new Float32Array( orientationsStart ), 4 ) );
    geometry.setAttribute( 'orientationEnd', new THREE.InstancedBufferAttribute( new Float32Array( orientationsEnd ), 4 ) );

    // material

    const material = new THREE.RawShaderMaterial( {

        uniforms: {
            'time': { value: 1.0 },
            'sineTime': { value: 1.0 }
        },
        vertexShader:onekit['vertexShader' ],
        fragmentShader: onekit['fragmentShader' ],
        side: THREE.DoubleSide,
        transparent: true

    } );

    //

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    //

    renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    if ( renderer.capabilities.isWebGL2 === false && renderer.extensions.has( 'ANGLE_instanced_arrays' ) === false ) {

        document.getElementById( 'notSupported' ).style.display = '';
        return;

    }

    //

    const gui = new GUI( { width: 350 } );
    gui.add( geometry, 'instanceCount', 0, instances );

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

    const time = performance.now();

    const object = scene.children[ 0 ];

    object.rotation.y = time * 0.0005;
    object.material.uniforms[ 'time' ].value = time * 0.005;
    object.material.uniforms[ 'sineTime' ].value = Math.sin( object.material.uniforms[ 'time' ].value * 0.05 );

    renderer.render( scene, camera );

}
}
})