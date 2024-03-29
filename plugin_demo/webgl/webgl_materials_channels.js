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

import Stats from 'three/addons/libs/stats.module.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';
import { VelocityShader } from 'three/addons/shaders/VelocityShader.js';
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


  let stats;

  let camera, scene, renderer;

  const params = {
    material: 'normal',
    camera: 'perspective',
    side: 'double'
  };

  const sides = {
    'front': THREE.FrontSide,
    'back': THREE.BackSide,
    'double': THREE.DoubleSide
  };

  let cameraOrtho, cameraPerspective;
  let controlsOrtho, controlsPerspective;

  let mesh, materialStandard, materialDepthBasic, materialDepthRGBA, materialNormal, materialVelocity;

  const SCALE = 2.436143; // from original model
  const BIAS = - 0.428408; // from original model

  init();
  animate();
  initGui();

  // Init gui
  function initGui() {

    const gui = new GUI();
    gui.add( params, 'material', [ 'standard', 'normal', 'velocity', 'depthBasic', 'depthRGBA' ] );
    gui.add( params, 'camera', [ 'perspective', 'ortho' ] );
    gui.add( params, 'side', [ 'front', 'back', 'double' ] );

  }

  function init() {

    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //

    scene = new THREE.Scene();

    const aspect = window.innerWidth / window.innerHeight;
    cameraPerspective = new THREE.PerspectiveCamera( 45, aspect, 500, 3000 );
    cameraPerspective.position.z = 1500;
    scene.add( cameraPerspective );

    const height = 500;
    cameraOrtho = new THREE.OrthographicCamera( - height * aspect, height * aspect, height, - height, 1000, 2500 );
    cameraOrtho.position.z = 1500;
    scene.add( cameraOrtho );

    camera = cameraPerspective;

    controlsPerspective = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( cameraPerspective, renderer.domElement );
    controlsPerspective.minDistance = 1000;
    controlsPerspective.maxDistance = 2400;
    controlsPerspective.enablePan = false;
    controlsPerspective.enableDamping = true;

    controlsOrtho = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( cameraOrtho, renderer.domElement );
    controlsOrtho.minZoom = 0.5;
    controlsOrtho.maxZoom = 1.5;
    controlsOrtho.enablePan = false;
    controlsOrtho.enableDamping = true;

    // lights

    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.3 );
    scene.add( ambientLight );

    const pointLight = new THREE.PointLight( 0xff0000, 1.5, 0, 0 );
    pointLight.position.z = 2500;
    scene.add( pointLight );

    const pointLight2 = new THREE.PointLight( 0xff6666, 3, 0, 0 );
    camera.add( pointLight2 );

    const pointLight3 = new THREE.PointLight( 0x0000ff, 1.5, 0, 0 );
    pointLight3.position.x = - 1000;
    pointLight3.position.z = 1000;
    scene.add( pointLight3 );

    // textures

    const textureLoader = new THREE.TextureLoader();
    const normalMap = textureLoader.load( 'models/obj/ninja/normal.png' );
    const aoMap = textureLoader.load( 'models/obj/ninja/ao.jpg' );
    const displacementMap = textureLoader.load( 'models/obj/ninja/displacement.jpg' );

    // material

    materialStandard = new THREE.MeshStandardMaterial( {
      color: 0xffffff,

      metalness: 0.5,
      roughness: 0.6,

      displacementMap: displacementMap,
      displacementScale: SCALE,
      displacementBias: BIAS,

      aoMap: aoMap,

      normalMap: normalMap,
      normalScale: new THREE.Vector2( 1, - 1 ),

      //flatShading: true,

      side: THREE.DoubleSide
    } );

    materialDepthBasic = new THREE.MeshDepthMaterial( {
      depthPacking: THREE.BasicDepthPacking,

      displacementMap: displacementMap,
      displacementScale: SCALE,
      displacementBias: BIAS,

      side: THREE.DoubleSide
    } );

    materialDepthRGBA = new THREE.MeshDepthMaterial( {
      depthPacking: THREE.RGBADepthPacking,

      displacementMap: displacementMap,
      displacementScale: SCALE,
      displacementBias: BIAS,

      side: THREE.DoubleSide
    } );

    materialNormal = new THREE.MeshNormalMaterial( {
      displacementMap: displacementMap,
      displacementScale: SCALE,
      displacementBias: BIAS,

      normalMap: normalMap,
      normalScale: new THREE.Vector2( 1, - 1 ),

      //flatShading: true,

      side: THREE.DoubleSide
    } );

    materialVelocity = new THREE.ShaderMaterial( {
      uniforms: THREE.UniformsUtils.clone( VelocityShader.uniforms ),
      vertexShader: VelocityShader.vertexShader,
      fragmentShader: VelocityShader.fragmentShader,
      side: THREE.DoubleSide
    } );
    materialVelocity.displacementMap = displacementMap; // required for defines
    materialVelocity.uniforms.displacementMap.value = displacementMap;
    materialVelocity.uniforms.displacementScale.value = SCALE;
    materialVelocity.uniforms.displacementBias.value = BIAS;
    materialVelocity.extensions.derivatives = true;

    //

    const loader = new OBJLoader();
    loader.load( 'models/obj/ninja/ninjaHead_Low.obj', function ( group ) {

      const geometry = group.children[ 0 ].geometry;
      geometry.center();

      mesh = new THREE.Mesh( geometry, materialNormal );
      mesh.scale.multiplyScalar( 25 );
      mesh.userData.matrixWorldPrevious = new THREE.Matrix4(); // for velocity
      scene.add( mesh );

    } );


    //

    stats = new Stats();
    container.appendChild( stats.dom );

    //

    window.addEventListener( 'resize', onWindowResize );

  }

  function onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = window.innerWidth / window.innerHeight;

    camera.aspect = aspect;

    camera.left = - height * aspect;
    camera.right = height * aspect;
    camera.top = height;
    camera.bottom = - height;

    camera.updateProjectionMatrix();

    renderer.setSize( width, height );

  }

  //

  function animate() {

    requestId = requestAnimationFrame( animate );

    stats.begin();
    render();
    stats.end();

  }

  function render() {

    if ( mesh ) {

      let material = mesh.material;

      switch ( params.material ) {

        case 'standard': material = materialStandard; break;
        case 'depthBasic': material = materialDepthBasic; break;
        case 'depthRGBA': material = materialDepthRGBA; break;
        case 'normal': material = materialNormal; break;
        case 'velocity': material = materialVelocity; break;

      }

      if ( sides[ params.side ] !== material.side ) {

        switch ( params.side ) {

          case 'front': material.side = THREE.FrontSide; break;
          case 'back': material.side = THREE.BackSide; break;
          case 'double': material.side = THREE.DoubleSide; break;

        }

        material.needsUpdate = true;

      }

      mesh.material = material;

    }

    switch ( params.camera ) {

      case 'perspective':
        camera = cameraPerspective;
        break;
      case 'ortho':
        camera = cameraOrtho;
        break;

    }

    controlsPerspective.update();
    controlsOrtho.update(); // must update both controls for damping to complete

    // remember camera projection changes

    materialVelocity.uniforms.previousProjectionViewMatrix.value.copy( materialVelocity.uniforms.currentProjectionViewMatrix.value );
    materialVelocity.uniforms.currentProjectionViewMatrix.value.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );

    if ( mesh && mesh.userData.matrixWorldPrevious ) {

      materialVelocity.uniforms.modelMatrixPrev.value.copy( mesh.userData.matrixWorldPrevious );

    }

    renderer.render( scene, camera );

    scene.traverse( function ( object ) {

      if ( object.isMesh ) {

        object.userData.matrixWorldPrevious.copy( object.matrixWorld );

      }

    } );

  }
  }
})