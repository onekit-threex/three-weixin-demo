import {
  document,
	window,
	HTMLCanvasElement,
	requestAnimationFrame,
	cancelAnimationFrame,
core,
	Event,
  Event0
} from "dhtml-weixin"
import * as THREE from './three/Three';
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

    renderer = new THREE.WebGLRenderer( { antialias: true } );
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

    material.map = new THREE.CanvasTexture(await core.Canvas.fix(canvas3d,drawingCanvas ));

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

    requestId = requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render( scene, camera );

  }
  }
})