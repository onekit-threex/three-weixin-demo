// webgl/webgl_materials_lightmap.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';

const onekit = {
    "vertexShader":`	varying vec3 vWorldPosition;

    void main() {

        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }`,
    "fragmentShader":`	uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;

    varying vec3 vWorldPosition;

    void main() {

        float h = normalize( vWorldPosition + offset ).y;
        gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );

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
onLoad() {
    document.createElementAsync("canvas", "webgl").then(canvas=>this.run(canvas).then())
},
async run(canvas3d){
this.canvas = canvas3d
var that = this

        
			const SCREEN_WIDTH = window.innerWidth;
			const SCREEN_HEIGHT = window.innerHeight;

			let container, stats;
			let camera, scene, renderer;

			await init();
			animate();

			async function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				// CAMERA

				camera = new THREE.PerspectiveCamera( 40, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				camera.position.set( 700, 200, - 500 );

				// SCENE

				scene = new THREE.Scene();

				// LIGHTS

				const light = new THREE.DirectionalLight( 0xaabbff, 0.3 );
				light.position.x = 300;
				light.position.y = 250;
				light.position.z = - 500;
				scene.add( light );

				// SKYDOME

				const vertexShader = onekit['vertexShader'];
				const fragmentShader = onekit[ 'fragmentShader' ];
				const uniforms = {
					topColor: { value: new THREE.Color( 0x0077ff ) },
					bottomColor: { value: new THREE.Color( 0xffffff ) },
					offset: { value: 400 },
					exponent: { value: 0.6 }
				};
				uniforms.topColor.value.copy( light.color );

				const skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
				const skyMat = new THREE.ShaderMaterial( {
					uniforms: uniforms,
					vertexShader: vertexShader,
					fragmentShader: fragmentShader,
					side: THREE.BackSide
				} );

				const sky = new THREE.Mesh( skyGeo, skyMat );
				scene.add( sky );

				// RENDERER

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				container.appendChild( renderer.domElement );
				renderer.outputEncoding = THREE.sRGBEncoding;

				// CONTROLS

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.maxPolarAngle = 0.9 * Math.PI / 2;
				controls.enableZoom = false;

				// STATS

				stats = new Stats();
				container.appendChild( stats.dom );

				// MODEL

				const loader = new THREE.ObjectLoader();
				const object = await loader.loadAsync( 'models/json/lightmap/lightmap.json' );
				scene.add( object );

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

				renderer.render( scene, camera );
				stats.update();

			}

    }
})