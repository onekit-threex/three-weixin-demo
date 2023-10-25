import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from './three/Three.js';
import  { GUI } from './three/addons/libs/lil-gui.module.min.js';

import { OrbitControls } from './three/addons/controls/OrbitControls.js';
import { Lut } from './three/addons/math/Lut.js';

var requestId
Page({
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
         webgl_touch(e) {
        const web_e = (window.platform=="devtools"?Event:Event0).fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
 onLoad() {
        document.createElementAsync("canvas","webgl2").then(canvas=>{
this.canvas = canvas
this.body_load(canvas).then()
        })
      },
      async body_load(canvas3d){
  
        let container;
  
        let perpCamera, orthoCamera, renderer, lut;
  
        let mesh, sprite;
        let scene, uiScene;
  
        let params;
  
     await   init();
  
        async function init() {
  
          container = document.getElementById( 'container' );
  
          scene = new THREE.Scene();
          scene.background = new THREE.Color( 0xffffff );
  
          uiScene = new THREE.Scene();
  
          lut = new Lut();
  
          const width = window.innerWidth;
          const height = window.innerHeight;
  
          perpCamera = new THREE.PerspectiveCamera( 60, width / height, 1, 100 );
          perpCamera.position.set( 0, 0, 10 );
          scene.add( perpCamera );
  
          orthoCamera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 1, 2 );
          orthoCamera.position.set( 0.5, 0, 1 );
  
          const cv =  lut.createCanvas()
          sprite = new THREE.Sprite( new THREE.SpriteMaterial( {
            map: new THREE.CanvasTexture(await core.Canvas.fix(canvas3d,cv) )
          } ) );
          sprite.material.map.colorSpace = THREE.SRGBColorSpace;
          sprite.scale.x = 0.125;
          uiScene.add( sprite );
  
          mesh = new THREE.Mesh( undefined, new THREE.MeshLambertMaterial( {
            side: THREE.DoubleSide,
            color: 0xF5F5F5,
            vertexColors: true
          } ) );
          scene.add( mesh );
  
          params	= {
            colorMap: 'rainbow',
          };
          loadModel( );
  
          const pointLight = new THREE.PointLight( 0xffffff, 3, 0, 0 );
          perpCamera.add( pointLight );
  
          renderer = new THREE.WebGLRenderer( { antialias: true } );
          renderer.autoClear = false;
          renderer.setPixelRatio( window.devicePixelRatio );
          renderer.setSize( width, height );
          container.appendChild( renderer.domElement );
  
          window.addEventListener( 'resize', onWindowResize );
  
          const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( perpCamera, renderer.domElement );
          controls.addEventListener( 'change', render );
  
          const gui = new GUI();
  
          gui.add( params, 'colorMap', [ 'rainbow', 'cooltowarm', 'blackbody', 'grayscale' ] ).onChange( function () {
  
            updateColors();
            render();
  
          } );
  
        }
  
        function onWindowResize() {
  
          const width = window.innerWidth;
          const height = window.innerHeight;
  
          perpCamera.aspect = width / height;
          perpCamera.updateProjectionMatrix();
  
          renderer.setSize( width, height );
          render();
  
        }
  
        function render() {
  
          renderer.clear();
          renderer.render( scene, perpCamera );
          renderer.render( uiScene, orthoCamera );
  
        }
  
        function loadModel( ) {
  
          const loader = new THREE.BufferGeometryLoader();
          loader.load( 'models/json/pressure.json', function ( geometry ) {
  
            geometry.center();
            geometry.computeVertexNormals();
  
            // default color attribute
            const colors = [];
  
            for ( let i = 0, n = geometry.attributes.position.count; i < n; ++ i ) {
  
              colors.push( 1, 1, 1 );
  
            }
  
            geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
  
            mesh.geometry = geometry;
            updateColors();
  
            render();
  
          } );
  
        }
  
        function updateColors() {
  
          lut.setColorMap( params.colorMap );
  
          lut.setMax( 2000 );
          lut.setMin( 0 );
  
          const geometry = mesh.geometry;
          const pressures = geometry.attributes.pressure;
          const colors = geometry.attributes.color;
          const color = new THREE.Color();
  
          for ( let i = 0; i < pressures.array.length; i ++ ) {
  
            const colorValue = pressures.array[ i ];
  
            color.copy( lut.getColor( colorValue ) ).convertSRGBToLinear();
  
            colors.setXYZ( i, color.r, color.g, color.b );
  
          }
  
          colors.needsUpdate = true;
  //
          const map = sprite.material.map;
          lut.updateCanvas( map.image );
          map.needsUpdate = true;
  
        }
    }
})