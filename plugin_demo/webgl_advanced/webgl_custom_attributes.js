// webgl_advanced/webgl_custom_attributes.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import Stats from './jsm/libs/stats.module.js';
const onekit = {
    
	"vertexshader":`

        uniform float amplitude;

        attribute float displacement;

        varying vec3 vNormal;
        varying vec2 vUv;

        void main() {

            vNormal = normal;
            vUv = ( 0.5 + amplitude ) * uv + vec2( amplitude );

            vec3 newPosition = position + amplitude * normal * vec3( displacement );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

        }
`,
"fragmentshader":`

        varying vec3 vNormal;
        varying vec2 vUv;

        uniform vec3 color;
        uniform sampler2D colorTexture;

        void main() {

            vec3 light = vec3( 0.5, 0.2, 1.0 );
            light = normalize( light );

            float dProd = dot( vNormal, light ) * 0.5 + 0.5;

            vec4 tcolor = texture2D( colorTexture, vUv );
            vec4 gray = vec4( vec3( tcolor.r * 0.3 + tcolor.g * 0.59 + tcolor.b * 0.11 ), 1.0 );

            gl_FragColor = gray * vec4( vec3( dProd ) * vec3( color ), 1.0 );

        }
`}

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
let renderer, scene, camera, stats;

let sphere, uniforms;

let displacement, noise;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 300;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x050505 );

    uniforms = {

        'amplitude': { value: 1.0 },
        'color': { value: new THREE.Color( 0xff2200 ) },
        'colorTexture': { value: new THREE.TextureLoader( ).load( 'textures/water.jpg' ) }

    };

    uniforms[ 'colorTexture' ].value.wrapS = uniforms[ 'colorTexture' ].value.wrapT = THREE.RepeatWrapping;

    const shaderMaterial = new THREE.ShaderMaterial( {

        uniforms: uniforms,
        vertexShader:onekit['vertexshader' ],
        fragmentShader: onekit[ 'fragmentshader' ]

    } );


    const radius = 50, segments = 128, rings = 64;

    const geometry = new THREE.SphereGeometry( radius, segments, rings );

    displacement = new Float32Array( geometry.attributes.position.count );
    noise = new Float32Array( geometry.attributes.position.count );

    for ( let i = 0; i < displacement.length; i ++ ) {

        noise[ i ] = Math.random() * 5;

    }

    geometry.setAttribute( 'displacement', new THREE.BufferAttribute( displacement, 1 ) );

    sphere = new THREE.Mesh( geometry, shaderMaterial );
    scene.add( sphere );

    renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    const container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );

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

function animate() {

    requestId = requestAnimationFrame(animate);

    render();
    stats.update();

}

function render() {

    const time = Date.now() * 0.01;

    sphere.rotation.y = sphere.rotation.z = 0.01 * time;

    uniforms[ 'amplitude' ].value = 2.5 * Math.sin( sphere.rotation.y * 0.125 );
    uniforms[ 'color' ].value.offsetHSL( 0.0005, 0, 0 );

    for ( let i = 0; i < displacement.length; i ++ ) {

        displacement[ i ] = Math.sin( 0.1 * i + time );

        noise[ i ] += 0.5 * ( 0.5 - Math.random() );
        noise[ i ] = THREE.MathUtils.clamp( noise[ i ], - 5, 5 );

        displacement[ i ] += noise[ i ];

    }

    sphere.geometry.attributes.displacement.needsUpdate = true;

    renderer.render( scene, camera );

}
}
})