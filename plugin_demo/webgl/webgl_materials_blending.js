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

    let camera, scene, renderer;
    let mapBg;

    const textureLoader = new THREE.TextureLoader();

    await init();
    animate();

    async function init() {

      // CAMERA

      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
      camera.position.z = 600;

      // SCENE

      scene = new THREE.Scene();

      // BACKGROUND

      const canvas = document.createElement( 'canvas' );
      const ctx = canvas.getContext( '2d' );
      canvas.width = canvas.height = 128;
      ctx.fillStyle = '#ddd';
      ctx.fillRect( 0, 0, 128, 128 );
      ctx.fillStyle = '#555';
      ctx.fillRect( 0, 0, 64, 64 );
      ctx.fillStyle = '#999';
      ctx.fillRect( 32, 32, 32, 32 );
      ctx.fillStyle = '#555';
      ctx.fillRect( 64, 64, 64, 64 );
      ctx.fillStyle = '#777';
      ctx.fillRect( 96, 96, 32, 32 );

      mapBg = new THREE.CanvasTexture(await core.Canvas.fix(canvas3d,canvas) );
      mapBg.colorSpace = THREE.SRGBColorSpace;
      mapBg.wrapS = mapBg.wrapT = THREE.RepeatWrapping;
      mapBg.repeat.set( 64, 32 );

      scene.background = mapBg;

      // OBJECTS

      const blendings = [
        { name: 'No', constant: THREE.NoBlending },
        { name: 'Normal', constant: THREE.NormalBlending },
        { name: 'Additive', constant: THREE.AdditiveBlending },
        { name: 'Subtractive', constant: THREE.SubtractiveBlending },
        { name: 'Multiply', constant: THREE.MultiplyBlending }
      ];

      const assignSRGB = ( texture ) => {

        texture.colorSpace = THREE.SRGBColorSpace;

      };

      const map0 = textureLoader.load( 'textures/uv_grid_opengl.jpg', assignSRGB );
      const map1 = textureLoader.load( 'textures/sprite0.jpg', assignSRGB );
      const map2 = textureLoader.load( 'textures/sprite0.png', assignSRGB );
      const map3 = textureLoader.load( 'textures/lensflare/lensflare0.png', assignSRGB );
      const map4 = textureLoader.load( 'textures/lensflare/lensflare0_alpha.png', assignSRGB );

      const geo1 = new THREE.PlaneGeometry( 100, 100 );
      const geo2 = new THREE.PlaneGeometry( 100, 25 );

      await   addImageRow( map0, 300 );
      await  addImageRow( map1, 150 );
      await  addImageRow( map2, 0 );
      await   addImageRow( map3, - 150 );
   await   addImageRow( map4, - 300 );

    async  function addImageRow( map, y ) {

        for ( let i = 0; i < blendings.length; i ++ ) {

          const blending = blendings[ i ];

          const material = new THREE.MeshBasicMaterial( { map: map } );
          material.transparent = true;
          material.blending = blending.constant;

          const x = ( i - blendings.length / 2 ) * 110;
          const z = 0;

          let mesh = new THREE.Mesh( geo1, material );
          mesh.position.set( x, y, z );
          scene.add( mesh );

          mesh = new THREE.Mesh( geo2, await generateLabelMaterial( blending.name ) );
          mesh.position.set( x, y - 75, z );
          scene.add( mesh );

        }

      }

      // RENDERER

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      // EVENTS

      window.addEventListener( 'resize', onWindowResize );

    }

    //

    function onWindowResize() {

      const SCREEN_WIDTH = window.innerWidth;
      const SCREEN_HEIGHT = window.innerHeight;

      renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

      camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
      camera.updateProjectionMatrix();

    }


   async function generateLabelMaterial( text ) {

      const canvas = document.createElement( 'canvas' );
      const ctx = canvas.getContext( '2d' );
      canvas.width = 128;
      canvas.height = 32;

      ctx.fillStyle = 'rgba( 0, 0, 0, 0.95 )';
      ctx.fillRect( 0, 0, 128, 32 );

      ctx.fillStyle = 'white';
      ctx.font = 'bold 12pt arial';
      ctx.fillText( text, 10, 22 );

      const map = new THREE.CanvasTexture(await core.Canvas.fix(canvas3d,canvas) );
      map.colorSpace = THREE.SRGBColorSpace;

      const material = new THREE.MeshBasicMaterial( { map: map, transparent: true } );

      return material;

    }

    function animate() {

      requestId = requestAnimationFrame( animate );

      const time = Date.now() * 0.00025;
      const ox = ( time * - 0.01 * mapBg.repeat.x ) % 1;
      const oy = ( time * - 0.01 * mapBg.repeat.y ) % 1;

      mapBg.offset.set( ox, oy );

      renderer.render( scene, camera );

    }

  }
})