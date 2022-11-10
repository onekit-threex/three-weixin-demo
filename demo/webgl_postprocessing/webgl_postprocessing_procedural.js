// webgl_postprocessing/webgl_postprocessing_procedural.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import Stats from './jsm/libs/stats.module.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';
const onekit = {
    "procedural-vert":`	varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
    "noiseRandom1D-frag":`
			#include <common>

			varying vec2 vUv;

			void main() {
				gl_FragColor.xyz = vec3( rand( vUv ) );
				gl_FragColor.w = 1.0;
			}
	`,
		"noiseRandom2D-frag":`
			#include <common>

			varying vec2 vUv;

			void main() {
				vec2 rand2 = vec2( rand( vUv ), rand( vUv + vec2( 0.4, 0.6 ) ) );
				gl_FragColor.xyz = mix( mix( vec3( 1.0, 1.0, 1.0 ), vec3( 0.0, 0.0, 1.0 ), rand2.x ), vec3( 0.0 ), rand2.y );
				gl_FragColor.w = 1.0;
			}
`,
		"noiseRandom3D-frag":`
			#include <common>

			varying vec2 vUv;

			void main() {
				vec3 rand3 = vec3( rand( vUv ), rand( vUv + vec2( 0.4, 0.6 ) ), rand( vUv + vec2( 0.6, 0.4 ) ) );
				gl_FragColor.xyz = rand3;
				gl_FragColor.w = 1.0;
			}`
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
        const web_e = Event.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this

let postCamera, postScene, renderer;
			let postMaterial, noiseRandom1DMaterial, noiseRandom2DMaterial, noiseRandom3DMaterial, postQuad;
			let stats;

			const params = { procedure: 'noiseRandom3D' };

			init();
			animate();
			initGui();

			// Init gui
			function initGui() {

				const gui = new GUI();
				gui.add( params, 'procedure', [ 'noiseRandom1D', 'noiseRandom2D', 'noiseRandom3D' ] );

			}

			function init() {

				const container = document.getElementById( 'container' );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

				// Setup post processing stage
				postCamera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
				noiseRandom1DMaterial = new THREE.ShaderMaterial( {
					vertexShader: onekit[ '#procedural-vert' ],
					fragmentShader: onekit[ '#noiseRandom1D-frag' ]
				} );
				noiseRandom2DMaterial = new THREE.ShaderMaterial( {
					vertexShader: onekit[ '#procedural-vert'],
					fragmentShader: onekit[  '#noiseRandom2D-frag']
				} );
				noiseRandom3DMaterial = new THREE.ShaderMaterial( {
					vertexShader:onekit[ '#procedural-vert'],
					fragmentShader: onekit[  '#noiseRandom3D-frag']
				} );
				postMaterial = noiseRandom3DMaterial;
				const postPlane = new THREE.PlaneGeometry( 2, 2 );
				postQuad = new THREE.Mesh( postPlane, postMaterial );
				postScene = new THREE.Scene();
				postScene.add( postQuad );

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				const width = window.innerWidth;
				const height = window.innerHeight;

				postCamera.aspect = width / height;
				postCamera.updateProjectionMatrix();

				renderer.setSize( width, height );

			}

			function animate() {

				requestId = requestAnimationFrame(animate);

				switch ( params.procedure ) {

					case 'noiseRandom1D': postMaterial = noiseRandom1DMaterial; break;
					case 'noiseRandom2D': postMaterial = noiseRandom2DMaterial; break;
					case 'noiseRandom3D': postMaterial = noiseRandom3DMaterial; break;

				}

				postQuad.material = postMaterial;

				// render post FX
				renderer.render( postScene, postCamera );

				stats.update();

			}
}
})