import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { GUI } from './jsm/libs/lil-gui.module.min.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { Lut } from './jsm/math/Lut.js';

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
        
        let container;

        let perpCamera, orthoCamera, renderer, lut;

        let mesh, sprite;
        let scene, uiScene;

        let params;

        await init();

     async   function init() {

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

           // console.error("ok?")
            const cv =  lut.createCanvas() 
            sprite = new THREE.Sprite( new THREE.SpriteMaterial( {
                map: new THREE.CanvasTexture(await core.Canvas.fix(canvas3d,cv))
            } ) );
          //  console.error("ok!")
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

            const pointLight = new THREE.PointLight( 0xffffff, 1 );
            perpCamera.add( pointLight );

            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
            renderer.autoClear = false;
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( width, height );
            container.appendChild( renderer.domElement );

            window.addEventListener( 'resize', onWindowResize );

            const controls = new OrbitControls( perpCamera, renderer.domElement );
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

            for ( let i = 0; i < pressures.array.length; i ++ ) {

                const colorValue = pressures.array[ i ];

                const color = lut.getColor( colorValue );

                if ( color === undefined ) {

                    console.log( 'Unable to determine color for value:', colorValue );

                } else {

                    colors.setXYZ( i, color.r, color.g, color.b );

                }

            }

            colors.needsUpdate = true;

            const map = sprite.material.map;
            lut.updateCanvas( map.image );
            map.needsUpdate = true;

        }
    }
})