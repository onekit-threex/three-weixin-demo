// webgl/webgl_materials_texture_canvas.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
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

        
			let camera, scene, renderer, mesh, material;
			const drawStartPos = new THREE.Vector2();

			init();
			await setupCanvasDrawing();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.z = 500;

				scene = new THREE.Scene();

				material = new THREE.MeshBasicMaterial();

				mesh = new THREE.Mesh( new THREE.BoxGeometry( 200, 200, 200 ), material );
				scene.add( mesh );

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				window.addEventListener( 'resize', onWindowResize );

			}

			// Sets up the drawing canvas and adds it as the material map

			async function setupCanvasDrawing() {

				// get canvas and context

				const drawingCanvas = await document.getElementByIdAsync( 'drawing-canvas' );
				const drawingContext = drawingCanvas.getContext( '2d' );

				// draw white background

				drawingContext.fillStyle = '#FFFFFF';
				drawingContext.fillRect( 0, 0, 128, 128 );

				// set canvas as material.map (this could be done to any map, bump, displacement etc.)

				material.map = new THREE.CanvasTexture(await core.Canvas.fix(canvas3d, drawingCanvas ));

				// set the variable to keep track of when to draw

				let paint = false;

				// add canvas event listeners
				drawingCanvas.addEventListener( 'pointerdown', function ( e ) {

					paint = true;
					drawStartPos.set( e.offsetX, e.offsetY );

				} );

				drawingCanvas.addEventListener( 'pointermove', function ( e ) {

					if ( paint ) draw( drawingContext, e.offsetX, e.offsetY );

				} );

				drawingCanvas.addEventListener( 'pointerup', function () {

					paint = false;

				} );

				drawingCanvas.addEventListener( 'pointerleave', function () {

					paint = false;

				} );

			}

			function draw( drawContext, x, y ) {

				drawContext.moveTo( drawStartPos.x, drawStartPos.y );
				drawContext.strokeStyle = '#000000';
				drawContext.lineTo( x, y );
				drawContext.stroke();
				// reset drawing start position to current position.
				drawStartPos.set( x, y );
				// need to flag the map as needing updating.
				material.map.needsUpdate = true;

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

			//	requestAnimationFrame(animate);

				mesh.rotation.x += 0.01;
				mesh.rotation.y += 0.01;

				renderer.render( scene, camera );

			}
    }
})