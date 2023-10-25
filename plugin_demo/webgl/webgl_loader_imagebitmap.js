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
    var that = this

    let camera, scene, renderer;
    let group, cubes;

    init();
    animate();

    function addImageBitmap() {

        new THREE.ImageBitmapLoader()
            .load( 'textures/planets/earth_atmos_2048.jpg?' + performance.now(),async function ( imageBitmap ) {

                const texture = new THREE.CanvasTexture( imageBitmap );
                const material = new THREE.MeshBasicMaterial( { map: texture } );

                /* ImageBitmap should be disposed when done with it
                   Can't be done until it's actually uploaded to WebGLTexture */

                // imageBitmap.close();

                addCube( material );

            }, function ( p ) {

                console.log( p );

            }, function ( e ) {

                console.log( e );

            } );

    }

 async   function addImage() {

        new THREE.ImageLoader( )
            .setCrossOrigin( '*' )
            .load( 'textures/planets/earth_atmos_2048.jpg?' + performance.now(), async function ( imageBitmap ) {
                const texture = new THREE.CanvasTexture( imageBitmap);
                const material = new THREE.MeshBasicMaterial( { color: 0xff8888, map: texture } );
                addCube( material );

            } );

    }

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );

    function addCube( material ) {

        const cube = new THREE.Mesh( geometry, material );
        cube.position.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
        cube.rotation.set( Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI );
        cubes.add( cube );

    }

    function init() {

        const container = document.createElement( 'div' );
        document.body.appendChild( container );

        // CAMERA

        camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1500 );
        camera.position.set( 0, 4, 7 );
        camera.lookAt( 0, 0, 0 );

        // SCENE

        scene = new THREE.Scene();

        //

        group = new THREE.Group();
        scene.add( group );

        group.add( new THREE.GridHelper( 4, 12, 0x888888, 0x444444 ) );

        cubes = new THREE.Group();
        group.add( cubes );

        // RENDERER

        renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        // TESTS

        setTimeout( addImage, 300 );
        setTimeout( addImage, 600 );
        setTimeout( addImage, 900 );
        setTimeout( addImageBitmap, 1300 );
        setTimeout( addImageBitmap, 1600 );
        setTimeout( addImageBitmap, 1900 );

        // EVENTS

        window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

        group.rotation.y = performance.now() / 3000;

        renderer.render( scene, camera );

        requestId = requestAnimationFrame(animate);

    }

  }
})