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

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';
import { NRRDLoader } from 'three/addons/loaders/NRRDLoader.js';
import { VolumeRenderShader1 } from 'three/addons/shaders/VolumeShader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
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

  if ( WebGL.isWebGL2Available() === false ) {

    document.body.appendChild( WebGL.getWebGL2ErrorMessage() );

  }

  let renderer,
    scene,
    camera,
    controls,
    material,
    volconfig,
    cmtextures;

  init();

  function init() {

    scene = new THREE.Scene();

    // Create renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Create camera (The volume renderer does not work very well with perspective yet)
    const h = 512; // frustum height
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera( - h * aspect / 2, h * aspect / 2, h / 2, - h / 2, 1, 1000 );
    camera.position.set( - 64, - 64, 128 );
    camera.up.set( 0, 0, 1 ); // In our data, z is up

    // Create controls
    controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.target.set( 64, 64, 128 );
    controls.minZoom = 0.5;
    controls.maxZoom = 4;
    controls.enablePan = false;
    controls.update();

    // scene.add( new AxesHelper( 128 ) );

    // Lighting is baked into the shader a.t.m.
    // let dirLight = new DirectionalLight( 0xffffff );

    // The gui for interaction
    volconfig = { clim1: 0, clim2: 1, renderstyle: 'iso', isothreshold: 0.15, colormap: 'viridis' };
    const gui = new GUI();
    gui.add( volconfig, 'clim1', 0, 1, 0.01 ).onChange( updateUniforms );
    gui.add( volconfig, 'clim2', 0, 1, 0.01 ).onChange( updateUniforms );
    gui.add( volconfig, 'colormap', { gray: 'gray', viridis: 'viridis' } ).onChange( updateUniforms );
    gui.add( volconfig, 'renderstyle', { mip: 'mip', iso: 'iso' } ).onChange( updateUniforms );
    gui.add( volconfig, 'isothreshold', 0, 1, 0.01 ).onChange( updateUniforms );

    // Load the data ...
    new NRRDLoader().load( 'models/nrrd/stent.nrrd', function ( volume ) {

      // Texture to hold the volume. We have scalars, so we put our data in the red channel.
      // THREEJS will select R32F (33326) based on the THREE.RedFormat and THREE.FloatType.
      // Also see https://www.khronos.org/registry/webgl/specs/latest/2.0/#TEXTURE_TYPES_FORMATS_FROM_DOM_ELEMENTS_TABLE
      // TODO: look the dtype up in the volume metadata
      const texture = new THREE.Data3DTexture( volume.data, volume.xLength, volume.yLength, volume.zLength );
      texture.format = THREE.RedFormat;
      texture.type = THREE.FloatType;
      texture.minFilter = texture.magFilter = THREE.LinearFilter;
      texture.unpackAlignment = 1;
      texture.needsUpdate = true;

      // Colormap textures
      cmtextures = {
        viridis: new THREE.TextureLoader().load( 'textures/cm_viridis.png', render ),
        gray: new THREE.TextureLoader().load( 'textures/cm_gray.png', render )
      };

      // Material
      const shader = VolumeRenderShader1;

      const uniforms = THREE.UniformsUtils.clone( shader.uniforms );

      uniforms[ 'u_data' ].value = texture;
      uniforms[ 'u_size' ].value.set( volume.xLength, volume.yLength, volume.zLength );
      uniforms[ 'u_clim' ].value.set( volconfig.clim1, volconfig.clim2 );
      uniforms[ 'u_renderstyle' ].value = volconfig.renderstyle == 'mip' ? 0 : 1; // 0: MIP, 1: ISO
      uniforms[ 'u_renderthreshold' ].value = volconfig.isothreshold; // For ISO renderstyle
      uniforms[ 'u_cmdata' ].value = cmtextures[ volconfig.colormap ];

      material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
        side: THREE.BackSide // The volume shader uses the backface as its "reference point"
      } );

      // THREE.Mesh
      const geometry = new THREE.BoxGeometry( volume.xLength, volume.yLength, volume.zLength );
      geometry.translate( volume.xLength / 2 - 0.5, volume.yLength / 2 - 0.5, volume.zLength / 2 - 0.5 );

      const mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      render();

    } );

    window.addEventListener( 'resize', onWindowResize );

  }

  function updateUniforms() {

    material.uniforms[ 'u_clim' ].value.set( volconfig.clim1, volconfig.clim2 );
    material.uniforms[ 'u_renderstyle' ].value = volconfig.renderstyle == 'mip' ? 0 : 1; // 0: MIP, 1: ISO
    material.uniforms[ 'u_renderthreshold' ].value = volconfig.isothreshold; // For ISO renderstyle
    material.uniforms[ 'u_cmdata' ].value = cmtextures[ volconfig.colormap ];

    render();

  }

  function onWindowResize() {

    renderer.setSize( window.innerWidth, window.innerHeight );

    const aspect = window.innerWidth / window.innerHeight;

    const frustumHeight = camera.top - camera.bottom;

    camera.left = - frustumHeight * aspect / 2;
    camera.right = frustumHeight * aspect / 2;

    camera.updateProjectionMatrix();

    render();

  }

  function render() {

    renderer.render( scene, camera );

  }
  }
})