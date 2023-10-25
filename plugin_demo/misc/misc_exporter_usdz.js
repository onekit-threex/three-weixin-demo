import {
  document,
  window,
  navigator,
	HTMLCanvasElement,
	requestAnimationFrame,
  cancelAnimationFrame,
  core,
	Event,
  Event0
} from "dhtml-weixin"
import * as THREE from './three/Three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { USDZExporter } from './three/addons/exporters/USDZExporter.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
var requestId
Page({
  onShareAppMessage(){
    return getApp().onShare()
  },
  onShareTimeline(){
     return {title:"ThreeX 2.0"}
  },
	onUnload() {
		cancelAnimationFrame(requestId, this.canvas)
		this.worker && this.worker.terminate()
if(this.canvas) this.canvas = null
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
  webgl_touch(e){
		const web_e = (window.platform=="devtools"?Event:Event0).fix(e)
		this.canvas.dispatchEvent(web_e)
  },
  onLoad() {
		document.createElementAsync("canvas", "webgl2").then(canvas => {
      this.canvas = canvas
      this.body_load(canvas).then()
    })
  },
  async body_load(canvas3d) {
    

			let camera, scene, renderer;

			const params = {
				exportUSDZ: exportUSDZ
			};

			init();
			render();

			function init() {

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				document.body.appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
				camera.position.set( - 2.5, 0.6, 3.0 );

				const pmremGenerator = new THREE.PMREMGenerator( renderer );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );
				scene.environment = pmremGenerator.fromScene( new RoomEnvironment( renderer ), 0.04 ).texture;

				const loader = new GLTFLoader().setPath( 'models/gltf/DamagedHelmet/glTF/' );
				loader.load( 'DamagedHelmet.gltf', async function ( gltf ) {

					scene.add( gltf.scene );

					const shadowMesh = await createSpotShadowMesh();
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

				const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.minDistance = 2;
				controls.maxDistance = 10;
				controls.target.set( 0, - 0.15, - 0.2 );
				controls.update();

				window.addEventListener( 'resize', onWindowResize );

				const isIOS = /iPad|iPhone|iPod/.test( navigator.userAgent );

				if ( isIOS === false ) {

					const gui = new GUI();

					gui.add( params, 'exportUSDZ' ).name( 'Export USDZ' );
					gui.open();

				}

			}

	async		function createSpotShadowMesh() {

				const canvas = document.createElement( 'canvas' );
				canvas.width = 128;
				canvas.height = 128;

				const context = canvas.getContext( '2d' );
				const gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
				gradient.addColorStop( 0.1, 'rgba(130,130,130,1)' );
				gradient.addColorStop( 1, 'rgba(255,255,255,1)' );

				context.fillStyle = gradient;
				context.fillRect( 0, 0, canvas.width, canvas.height );

				const shadowTexture = new THREE.CanvasTexture(await core.Canvas.fix(canvas3d,canvas ));

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

			function exportUSDZ() {

				const link = document.getElementById( 'link' );
				link.click();

			}

			//

			function render() {

				renderer.render( scene, camera );

			}
  }
})