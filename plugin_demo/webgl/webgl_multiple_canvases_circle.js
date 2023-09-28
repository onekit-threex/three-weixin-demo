// webgl/webgl_multiple_canvases_circle.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
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
onLoad() {
    document.createElementAsync("canvas", "webgl").then(canvas=>this.run(canvas).then())
},
async run(canvas3d){
this.canvas = canvas3d
var that = this
        const views = [];

		let scene, renderer;

		let mouseX = 0, mouseY = 0;

		const windowHalfX = window.innerWidth / 2;
		const windowHalfY = window.innerHeight / 2;

	await	init();
		animate();

		//

		function View( canvas, rotateY ) {

			canvas.width = canvas.clientWidth * window.devicePixelRatio;
			canvas.height = canvas.clientHeight * window.devicePixelRatio;

			const context = canvas.getContext( '2d' );

			const camera = new THREE.PerspectiveCamera( 20, canvas.clientWidth / canvas.clientHeight, 1, 20000 );
			camera.rotation.y = rotateY;

			// Think of the virtual camera as a post with 5 cameras on it (even though those cameras happen to live in difference scenes)
			// You need to move the post (ie, the virtualCamera) to move all 5 cameras together.

			const virtualCamera = new THREE.Camera();
			virtualCamera.add( camera );

			this.render = function () {

				virtualCamera.position.x = - mouseX * 4;
				virtualCamera.position.y = - mouseY * 4;
				virtualCamera.position.z = 1800;

				virtualCamera.lookAt( scene.position );
				virtualCamera.updateMatrixWorld( true );

				renderer.render( scene, camera );

			//	context.drawImage( renderer.domElement, 0, 0 );

			};

		}

	async	function init() {

			const canvas1 =await document.getElementByIdAsync( 'canvas1' );
			const canvas2 = await document.getElementByIdAsync( 'canvas2' );
			const canvas3 = await document.getElementByIdAsync( 'canvas3' );
			const canvas4 = await document.getElementByIdAsync( 'canvas4' );
			const canvas5 = await document.getElementByIdAsync( 'canvas5' );

			const fudge = 0.45; // I don't know why this is needed :-(
			const rot = 30 * THREE.MathUtils.DEG2RAD;

			views.push( new View( canvas1, rot * - 2 * fudge ) );
			views.push( new View( canvas2, rot * - 1 * fudge ) );
			views.push( new View( canvas3, rot *	0 * fudge ) );
			views.push( new View( canvas4, rot *	1 * fudge ) );
			views.push( new View( canvas5, rot *	2 * fudge ) );

			//

			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0xffffff );

			const light = new THREE.DirectionalLight( 0xffffff );
			light.position.set( 0, 0, 1 ).normalize();
			scene.add( light );

			const noof_balls = 51;

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

			const shadowTexture = new THREE.CanvasTexture(await core.Canvas.fix(canvas3d, canvas) );

			const shadowMaterial = new THREE.MeshBasicMaterial( { map: shadowTexture } );
			const shadowGeo = new THREE.PlaneGeometry( 300, 300, 1, 1 );

			for ( let i = 0; i < noof_balls; i ++ ) { // create shadows

				const shadowMesh = new THREE.Mesh( shadowGeo, shadowMaterial );
				shadowMesh.position.x = - ( noof_balls - 1 ) / 2 * 400 + i * 400;
				shadowMesh.position.y = - 250;
				shadowMesh.rotation.x = - Math.PI / 2;
				scene.add( shadowMesh );

			}

			const radius = 200;

			const geometry1 = new THREE.IcosahedronGeometry( radius, 1 );

			const count = geometry1.attributes.position.count;
			geometry1.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );

			const color = new THREE.Color();
			const positions = geometry1.attributes.position;
			const colors = geometry1.attributes.color;

			for ( let i = 0; i < count; i ++ ) {

				color.setHSL( ( positions.getY( i ) / radius + 1 ) / 2, 1.0, 0.5 );

				colors.setXYZ( i, color.r, color.g, color.b );

			}

			const material = new THREE.MeshPhongMaterial( {
				color: 0xffffff,
				flatShading: true,
				vertexColors: true,
				shininess: 0
			} );

			const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } );

			for ( let i = 0; i < noof_balls; i ++ ) { // create balls

				const mesh = new THREE.Mesh( geometry1, material );
				const wireframe = new THREE.Mesh( geometry1, wireframeMaterial );
				mesh.add( wireframe );

				mesh.position.x = - ( noof_balls - 1 ) / 2 * 400 + i * 400;
				mesh.rotation.x = i * 0.5;
				scene.add( mesh );

			}

			renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( 200, 300 );

			document.addEventListener( 'mousemove', onDocumentMouseMove );

		}

		function onDocumentMouseMove( event ) {

			mouseX = event.clientX - windowHalfX;
			mouseY = event.clientY - windowHalfY;

		}

		function animate() {

			for ( let i = 0; i < views.length; ++ i ) {

				views[ i ].render();

			}

			requestAnimationFrame(animate);

		}

    }
})