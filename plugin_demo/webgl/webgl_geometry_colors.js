// webgl/webgl_geometry_colors.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import Stats from './jsm/libs/stats.module.js';
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

        
			let container, stats;

			let camera, scene, renderer;

			let mouseX = 0, mouseY = 0;

			let windowHalfX = window.innerWidth / 2;
			let windowHalfY = window.innerHeight / 2;

		await	init();
			animate();

		async	function init() {

				container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 1800;

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xffffff );

				const light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 0, 1 );
				scene.add( light );

				// shadow

				const canvas = document.createElement( 'canvas' );
				canvas.width = 128;
				canvas.height = 128;

				const context = canvas.getContext( '2d' );
				const gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
				gradient.addColorStop( 0.1, 'rgba(210,210,210,1)' );
				gradient.addColorStop( 1, 'rgba(255,255,255,1)' );

				context.fillStyle = gradient;
				context.fillRect( 0, 0, canvas.width, canvas.height );

				const shadowTexture = new THREE.CanvasTexture(await core.Canvas.fix(canvas3d, canvas ));

				const shadowMaterial = new THREE.MeshBasicMaterial( { map: shadowTexture } );
				const shadowGeo = new THREE.PlaneGeometry( 300, 300, 1, 1 );

				let shadowMesh;

				shadowMesh = new THREE.Mesh( shadowGeo, shadowMaterial );
				shadowMesh.position.y = - 250;
				shadowMesh.rotation.x = - Math.PI / 2;
				scene.add( shadowMesh );

				shadowMesh = new THREE.Mesh( shadowGeo, shadowMaterial );
				shadowMesh.position.y = - 250;
				shadowMesh.position.x = - 400;
				shadowMesh.rotation.x = - Math.PI / 2;
				scene.add( shadowMesh );

				shadowMesh = new THREE.Mesh( shadowGeo, shadowMaterial );
				shadowMesh.position.y = - 250;
				shadowMesh.position.x = 400;
				shadowMesh.rotation.x = - Math.PI / 2;
				scene.add( shadowMesh );

				const radius = 200;

				const geometry1 = new THREE.IcosahedronGeometry( radius, 1 );

				const count = geometry1.attributes.position.count;
				geometry1.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );

				const geometry2 = geometry1.clone();
				const geometry3 = geometry1.clone();

				const color = new THREE.Color();
				const positions1 = geometry1.attributes.position;
				const positions2 = geometry2.attributes.position;
				const positions3 = geometry3.attributes.position;
				const colors1 = geometry1.attributes.color;
				const colors2 = geometry2.attributes.color;
				const colors3 = geometry3.attributes.color;

				for ( let i = 0; i < count; i ++ ) {

					color.setHSL( ( positions1.getY( i ) / radius + 1 ) / 2, 1.0, 0.5 );
					colors1.setXYZ( i, color.r, color.g, color.b );

					color.setHSL( 0, ( positions2.getY( i ) / radius + 1 ) / 2, 0.5 );
					colors2.setXYZ( i, color.r, color.g, color.b );

					color.setRGB( 1, 0.8 - ( positions3.getY( i ) / radius + 1 ) / 2, 0 );
					colors3.setXYZ( i, color.r, color.g, color.b );

				}

				const material = new THREE.MeshPhongMaterial( {
					color: 0xffffff,
					flatShading: true,
					vertexColors: true,
					shininess: 0
				} );

				const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } );

				let mesh = new THREE.Mesh( geometry1, material );
				let wireframe = new THREE.Mesh( geometry1, wireframeMaterial );
				mesh.add( wireframe );
				mesh.position.x = - 400;
				mesh.rotation.x = - 1.87;
				scene.add( mesh );

				mesh = new THREE.Mesh( geometry2, material );
				wireframe = new THREE.Mesh( geometry2, wireframeMaterial );
				mesh.add( wireframe );
				mesh.position.x = 400;
				scene.add( mesh );

				mesh = new THREE.Mesh( geometry3, material );
				wireframe = new THREE.Mesh( geometry3, wireframeMaterial );
				mesh.add( wireframe );
				scene.add( mesh );

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

				document.addEventListener( 'mousemove', onDocumentMouseMove );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX );
				mouseY = ( event.clientY - windowHalfY );

			}

			//

			function animate() {

			//	requestAnimationFrame(animate);

				render();
			//	//stats.update();

			}

			function render() {

				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}

    }
})