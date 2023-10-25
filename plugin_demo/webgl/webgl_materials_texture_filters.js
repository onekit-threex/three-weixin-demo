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

    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;

    let container;

    let camera, scene, scene2, renderer;

    let mouseX = 0, mouseY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    await init();
    animate();


async    function init() {

      container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 35, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 5000 );
      camera.position.z = 1500;

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0x000000 );
      scene.fog = new THREE.Fog( 0x000000, 1500, 4000 );

      scene2 = new THREE.Scene();
      scene2.background = new THREE.Color( 0x000000 );
      scene2.fog = new THREE.Fog( 0x000000, 1500, 4000 );

      // GROUND

      const imageCanvas = document.createElement( 'canvas' );
      const context = imageCanvas.getContext( '2d' );

      imageCanvas.width = imageCanvas.height = 128;

      context.fillStyle = '#444';
      context.fillRect( 0, 0, 128, 128 );

      context.fillStyle = '#fff';
      context.fillRect( 0, 0, 64, 64 );
      context.fillRect( 64, 64, 64, 64 );

      const textureCanvas = new THREE.CanvasTexture(await core.Canvas.fix(canvas3d,imageCanvas ));
      textureCanvas.colorSpace = THREE.SRGBColorSpace;
      textureCanvas.repeat.set( 1000, 1000 );
      textureCanvas.wrapS = THREE.RepeatWrapping;
      textureCanvas.wrapT = THREE.RepeatWrapping;

      const textureCanvas2 = textureCanvas.clone();
      textureCanvas2.magFilter = THREE.NearestFilter;
      textureCanvas2.minFilter = THREE.NearestFilter;

      const materialCanvas = new THREE.MeshBasicMaterial( { map: textureCanvas } );
      const materialCanvas2 = new THREE.MeshBasicMaterial( { color: 0xffccaa, map: textureCanvas2 } );

      const geometry = new THREE.PlaneGeometry( 100, 100 );

      const meshCanvas = new THREE.Mesh( geometry, materialCanvas );
      meshCanvas.rotation.x = - Math.PI / 2;
      meshCanvas.scale.set( 1000, 1000, 1000 );

      const meshCanvas2 = new THREE.Mesh( geometry, materialCanvas2 );
      meshCanvas2.rotation.x = - Math.PI / 2;
      meshCanvas2.scale.set( 1000, 1000, 1000 );


      // PAINTING

      const callbackPainting = function () {

        const image = texturePainting.image;

        texturePainting2.image = image;
        texturePainting2.needsUpdate = true;

        scene.add( meshCanvas );
        scene2.add( meshCanvas2 );

        const geometry = new THREE.PlaneGeometry( 100, 100 );
        const mesh = new THREE.Mesh( geometry, materialPainting );
        const mesh2 = new THREE.Mesh( geometry, materialPainting2 );

        addPainting( scene, mesh );
        addPainting( scene2, mesh2 );

        function addPainting( zscene, zmesh ) {

          zmesh.scale.x = image.width / 100;
          zmesh.scale.y = image.height / 100;

          zscene.add( zmesh );

          const meshFrame = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x000000 } ) );
          meshFrame.position.z = - 10.0;
          meshFrame.scale.x = 1.1 * image.width / 100;
          meshFrame.scale.y = 1.1 * image.height / 100;
          zscene.add( meshFrame );

          const meshShadow = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.75, transparent: true } ) );
          meshShadow.position.y = - 1.1 * image.height / 2;
          meshShadow.position.z = - 1.1 * image.height / 2;
          meshShadow.rotation.x = - Math.PI / 2;
          meshShadow.scale.x = 1.1 * image.width / 100;
          meshShadow.scale.y = 1.1 * image.height / 100;
          zscene.add( meshShadow );

          const floorHeight = - 1.117 * image.height / 2;
          meshCanvas.position.y = meshCanvas2.position.y = floorHeight;

        }


      };

      const texturePainting = new THREE.TextureLoader().load( 'textures/758px-Canestra_di_frutta_(Caravaggio).jpg', callbackPainting );
      const texturePainting2 = new THREE.Texture();

      const materialPainting = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texturePainting } );
      const materialPainting2 = new THREE.MeshBasicMaterial( { color: 0xffccaa, map: texturePainting2 } );

      texturePainting.colorSpace = THREE.SRGBColorSpace;
      texturePainting2.colorSpace = THREE.SRGBColorSpace;
      texturePainting2.minFilter = texturePainting2.magFilter = THREE.NearestFilter;
      texturePainting.minFilter = texturePainting.magFilter = THREE.LinearFilter;
      texturePainting.mapping = THREE.UVMapping;


      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
      renderer.autoClear = false;

      renderer.domElement.style.position = 'relative';
      container.appendChild( renderer.domElement );

      document.addEventListener( 'mousemove', onDocumentMouseMove );

    }


    function onDocumentMouseMove( event ) {

      mouseX = ( event.clientX - windowHalfX );
      mouseY = ( event.clientY - windowHalfY );

    }


    function animate() {

      requestId = requestAnimationFrame( animate );

      render();

    }

    function render() {

      camera.position.x += ( mouseX - camera.position.x ) * .05;
      camera.position.y += ( - ( mouseY - 200 ) - camera.position.y ) * .05;

      camera.lookAt( scene.position );

      renderer.clear();
      renderer.setScissorTest( true );

      renderer.setScissor( 0, 0, SCREEN_WIDTH / 2 - 2, SCREEN_HEIGHT );
      renderer.render( scene, camera );

      renderer.setScissor( SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2 - 2, SCREEN_HEIGHT );
      renderer.render( scene2, camera );

      renderer.setScissorTest( false );

    }
  }
})