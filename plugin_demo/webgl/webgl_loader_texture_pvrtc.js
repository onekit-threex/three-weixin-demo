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
import { PVRLoader } from 'three/addons/loaders/PVRLoader.js';
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
  const meshes = [];

  init();
  animate();

  function init() {

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 200, 200, 200 );

    //

    const onCube1Loaded = function ( texture ) {

      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;
      texture.mapping = THREE.CubeReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      material6.needsUpdate = true;

    };

    const onCube2Loaded = function ( texture ) {

      texture.magFilter = THREE.LinearFilter;
      // texture.minFilter = LinearMipmapNearestFilter;
      texture.minFilter = THREE.LinearFilter;
      texture.mapping = THREE.CubeReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      material8.needsUpdate = true;

    };

    //

    const loader = new PVRLoader();

    const disturb_4bpp_rgb = loader.load( 'textures/compressed/disturb_4bpp_rgb.pvr' );
    const disturb_4bpp_rgb_v3 = loader.load( 'textures/compressed/disturb_4bpp_rgb_v3.pvr' );
    const disturb_4bpp_rgb_mips = loader.load( 'textures/compressed/disturb_4bpp_rgb_mips.pvr' );
    const disturb_2bpp_rgb = loader.load( 'textures/compressed/disturb_2bpp_rgb.pvr' );
    const flare_4bpp_rgba = loader.load( 'textures/compressed/flare_4bpp_rgba.pvr' );
    const flare_2bpp_rgba = loader.load( 'textures/compressed/flare_2bpp_rgba.pvr' );
    const park3_cube_nomip_4bpp_rgb = loader.load( 'textures/compressed/park3_cube_nomip_4bpp_rgb.pvr', onCube1Loaded );
    const park3_cube_mip_2bpp_rgb_v3 = loader.load( 'textures/compressed/park3_cube_mip_2bpp_rgb_v3.pvr', onCube2Loaded );

    disturb_2bpp_rgb.minFilter =
    disturb_2bpp_rgb.magFilter =
    flare_4bpp_rgba.minFilter =
    flare_4bpp_rgba.magFilter =
    disturb_4bpp_rgb.minFilter =
    disturb_4bpp_rgb.magFilter =
    disturb_4bpp_rgb_v3.minFilter =
    disturb_4bpp_rgb_v3.magFilter =
    flare_2bpp_rgba.minFilter =
    flare_2bpp_rgba.magFilter = THREE.LinearFilter;

    disturb_2bpp_rgb.encoding =
    flare_4bpp_rgba.encoding =
    disturb_4bpp_rgb.encoding =
    disturb_4bpp_rgb_v3.encoding =
    flare_2bpp_rgba.colorSpace = THREE.SRGBColorSpace;

    const material1 = new THREE.MeshBasicMaterial( { map: disturb_4bpp_rgb } );
    const material2 = new THREE.MeshBasicMaterial( { map: disturb_4bpp_rgb_mips } );
    const material3 = new THREE.MeshBasicMaterial( { map: disturb_2bpp_rgb } );
    const material4 = new THREE.MeshBasicMaterial( { map: flare_4bpp_rgba, side: THREE.DoubleSide, depthTest: false, transparent: true } );
    const material5 = new THREE.MeshBasicMaterial( { map: flare_2bpp_rgba, side: THREE.DoubleSide, depthTest: false, transparent: true } );
    const material6 = new THREE.MeshBasicMaterial( { envMap: park3_cube_nomip_4bpp_rgb } );
    const material8 = new THREE.MeshBasicMaterial( { envMap: park3_cube_mip_2bpp_rgb_v3 } );

    const material7 = new THREE.MeshBasicMaterial( { map: disturb_4bpp_rgb_v3 } );

    //

    let mesh = new THREE.Mesh( geometry, material1 );
    mesh.position.x = - 500;
    mesh.position.y = 200;
    scene.add( mesh );
    meshes.push( mesh );

    mesh = new THREE.Mesh( geometry, material2 );
    mesh.position.x = - 166;
    mesh.position.y = 200;
    scene.add( mesh );
    meshes.push( mesh );

    mesh = new THREE.Mesh( geometry, material3 );
    mesh.position.x = 166;
    mesh.position.y = 200;
    scene.add( mesh );
    meshes.push( mesh );

    mesh = new THREE.Mesh( geometry, material7 );
    mesh.position.x = 500;
    mesh.position.y = 200;
    scene.add( mesh );
    meshes.push( mesh );

    mesh = new THREE.Mesh( geometry, material4 );
    mesh.position.x = - 500;
    mesh.position.y = - 200;
    scene.add( mesh );
    meshes.push( mesh );

    mesh = new THREE.Mesh( geometry, material5 );
    mesh.position.x = - 166;
    mesh.position.y = - 200;
    scene.add( mesh );
    meshes.push( mesh );

    const torus = new THREE.TorusGeometry( 100, 50, 32, 24 );

    mesh = new THREE.Mesh( torus, material6 );
    mesh.position.x = 166;
    mesh.position.y = - 200;
    scene.add( mesh );
    meshes.push( mesh );

    mesh = new THREE.Mesh( torus, material8 );
    mesh.position.x = 500;
    mesh.position.y = - 200;
    scene.add( mesh );
    meshes.push( mesh );

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function animate() {

    requestId = requestAnimationFrame( animate );

    const time = Date.now() * 0.001;

    for ( let i = 0; i < meshes.length; i ++ ) {

      const mesh = meshes[ i ];
      mesh.rotation.x = time;
      mesh.rotation.y = time;

    }

    renderer.render( scene, camera );

  }
  }
})