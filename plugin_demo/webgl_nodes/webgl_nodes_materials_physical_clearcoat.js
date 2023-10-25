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
import { color, float, vec2, texture, normalMap, uv, MeshPhysicalNodeMaterial } from './three/addons/nodes/Nodes.js';

import { nodeFrame } from 'three/addons/renderers/webgl-legacy/nodes/WebGLNodes.js';

import Stats from 'three/addons/libs/stats.module.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';
import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js';

import { FlakesTexture } from 'three/addons/textures/FlakesTexture.js';

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
  let container, stats;

  let camera, scene, renderer;

  let particleLight;
  let group;

  init();
  animate();

  function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 0.25, 50 );
    camera.position.z = 10;

    scene = new THREE.Scene();

    group = new THREE.Group();
    scene.add( group );

    new HDRCubeTextureLoader()
      .setPath( 'textures/cube/pisaHDR/' )
      .load( [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ],
        async  function ( hdrTexture ) {

          const geometry = new THREE.SphereGeometry( .8, 64, 32 );

          const textureLoader = new THREE.TextureLoader();

          const diffuse = textureLoader.load( 'textures/carbon/Carbon.png' );
          diffuse.colorSpace = THREE.SRGBColorSpace;
          diffuse.wrapS = THREE.RepeatWrapping;
          diffuse.wrapT = THREE.RepeatWrapping;

          const normalMap1 = textureLoader.load( 'textures/carbon/Carbon_Normal.png' );
          normalMap1.wrapS = THREE.RepeatWrapping;
          normalMap1.wrapT = THREE.RepeatWrapping;

          const normalMap2 = textureLoader.load( 'textures/water/Water_1_M_Normal.jpg' );

          const normalMap3 = new THREE.CanvasTexture(await core.Canvas.fix(canvas3d,new FlakesTexture() ));
          normalMap3.wrapS = THREE.RepeatWrapping;
          normalMap3.wrapT = THREE.RepeatWrapping;
          normalMap3.anisotropy = 16;

          const normalMap4 = textureLoader.load( 'textures/golfball.jpg' );

          const clearcoatNormalMap = textureLoader.load( 'textures/pbr/Scratched_gold/Scratched_gold_01_1K_Normal.png' );

          // car paint

          const carPaintUV = uv().mul( vec2( 10, 6 ) );
          const carPaintNormalScale = vec2( 0.15 );

          let material = new MeshPhysicalNodeMaterial();
          material.clearcoatNode = float( 1 );
          material.clearcoatRoughnessNode = float( 0.1 );
          material.metalnessNode = float( 0.9 );
          material.roughnessNode = float( 0.5 );
          material.colorNode = color( 0x0000ff );
          material.normalNode = normalMap( texture( normalMap3, carPaintUV ), carPaintNormalScale );

          let mesh = new THREE.Mesh( geometry, material );
          mesh.position.x = - 1;
          mesh.position.y = 1;
          group.add( mesh );

          // fibers

          const fibersUV = uv().mul( 10 );

          material = new MeshPhysicalNodeMaterial();
          material.roughnessNode = float( 0.5 );
          material.clearcoatNode = float( 1 );
          material.clearcoatRoughnessNode = float( 0.1 );
          material.colorNode = texture( diffuse, fibersUV );
          material.normalNode = normalMap( texture( normalMap1, fibersUV ) );

          mesh = new THREE.Mesh( geometry, material );
          mesh.position.x = 1;
          mesh.position.y = 1;
          group.add( mesh );

          // golf

          material = new MeshPhysicalNodeMaterial();
          material.clearcoatNode = float( 1 );
          material.roughnessNode = float( 0.1 );
          material.metalnessNode = float( 0 );
          material.colorNode = color( 0xffffff );
          material.normalNode = normalMap( texture( normalMap4 ) );
          // y scale is negated to compensate for normal map handedness.
          material.clearcoatNormalNode = normalMap( texture( clearcoatNormalMap ), vec2( 2.0, - 2.0 ) );

          mesh = new THREE.Mesh( geometry, material );
          mesh.position.x = - 1;
          mesh.position.y = - 1;
          group.add( mesh );

          // clearcoat + normalmap

          material = new MeshPhysicalNodeMaterial();
          material.clearcoatNode = float( 1 );
          material.roughnessNode = float( 1 );
          material.metalnessNode = float( 1 );
          material.colorNode = color( 0xff0000 );
          material.normalNode = normalMap( texture( normalMap2 ), vec2( 0.15, 0.15 ) );
          // y scale is negated to compensate for normal map handedness.
          material.clearcoatNormalNode = normalMap( texture( clearcoatNormalMap ), vec2( 2.0, - 2.0 ) );

          mesh = new THREE.Mesh( geometry, material );
          mesh.position.x = 1;
          mesh.position.y = - 1;
          group.add( mesh );

          //

          scene.background = hdrTexture;
          scene.environment = hdrTexture;

        }

         );

    // LIGHTS

    particleLight = new THREE.Mesh(
      new THREE.SphereGeometry( .05, 8, 8 ),
      new THREE.MeshBasicMaterial( { color: 0xffffff } )
    );
    scene.add( particleLight );

    particleLight.add( new THREE.PointLight( 0xffffff, 30 ) );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    //


    //

    stats = new Stats();
    container.appendChild( stats.dom );

    // EVENTS

    new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );

    window.addEventListener( 'resize', onWindowResize );

  }

  //

  function onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );

  }

  //

  function animate() {

    requestId = requestAnimationFrame( animate );

    nodeFrame.update();

    render();

    stats.update();

  }

  function render() {

    const timer = Date.now() * 0.00025;

    particleLight.position.x = Math.sin( timer * 7 ) * 3;
    particleLight.position.y = Math.cos( timer * 5 ) * 4;
    particleLight.position.z = Math.cos( timer * 3 ) * 3;

    for ( let i = 0; i < group.children.length; i ++ ) {

      const child = group.children[ i ];
      child.rotation.y += 0.005;

    }

    renderer.render( scene, camera );

  }
  }
})