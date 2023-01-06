// webgl/webgl_modifier_edgesplit.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import { EdgeSplitModifier } from './jsm/modifiers/EdgeSplitModifier.js';
import * as BufferGeometryUtils from './jsm/utils/BufferGeometryUtils.js';

import { GUI } from './jsm/libs/lil-gui.module.min.js';
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

        let renderer, scene, camera;
			let modifier, mesh, baseGeometry;
			let map;

			const params = {
				smoothShading: true,
				edgeSplit: true,
				cutOffAngle: 20,
				showMap: false,
				tryKeepNormals: true,
			};

			init();

			function init() {

				const info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.innerHTML = '<a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> - Edge Split modifier';
				document.body.appendChild( info );

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				controls.rotateSpeed = 0.35;
				controls.minZoom = 1;
				camera.position.set( 0, 0, 4 );

				scene.add( new THREE.HemisphereLight( 0xffffff, 0x444444 ) );

				new OBJLoader().load(
					'./models/obj/cerberus/Cerberus.obj',
					function ( group ) {

						const cerberus = group.children[ 0 ];
						const modelGeometry = cerberus.geometry;

						modifier = new EdgeSplitModifier();
						baseGeometry = BufferGeometryUtils.mergeVertices( modelGeometry );

						mesh = new THREE.Mesh( getGeometry(), new THREE.MeshStandardMaterial() );
						mesh.material.flatShading = ! params.smoothShading;
						mesh.rotateY( - Math.PI / 2 );
						mesh.scale.set( 3.5, 3.5, 3.5 );
						mesh.translateZ( 1.5 );
						scene.add( mesh );

						if ( map !== undefined && params.showMap ) {

							mesh.material.map = map;
							mesh.material.needsUpdate = true;

						}

						render();

					}
				);

				window.addEventListener( 'resize', onWindowResize );

				new THREE.TextureLoader( ).load( './models/obj/cerberus/Cerberus_A.jpg', function ( texture ) {

					map = texture;

					if ( mesh !== undefined && params.showMap ) {

						mesh.material.map = map;
						mesh.material.needsUpdate = true;

					}

				} );


				const gui = new GUI( { name: 'Edge split modifier parameters' } );

				gui.add( params, 'showMap' ).onFinishChange( updateMesh );
				gui.add( params, 'smoothShading' ).onFinishChange( updateMesh );
				gui.add( params, 'edgeSplit' ).onFinishChange( updateMesh );
				gui.add( params, 'cutOffAngle' ).min( 0 ).max( 180 ).onFinishChange( updateMesh );
				gui.add( params, 'tryKeepNormals' ).onFinishChange( updateMesh );

			}

			function onWindowResize() {

				renderer.setSize( window.innerWidth, window.innerHeight );

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				render();

			}


			function getGeometry() {

				let geometry;

				if ( params.edgeSplit ) {

					geometry = modifier.modify(
						baseGeometry,
						params.cutOffAngle * Math.PI / 180,
						params.tryKeepNormals
					);

				} else {

					geometry = baseGeometry;

				}

				return geometry;

			}


			function updateMesh() {

				if ( mesh !== undefined ) {

					mesh.geometry = getGeometry();

					let needsUpdate = mesh.material.flatShading === params.smoothShading;
					mesh.material.flatShading = params.smoothShading === false;

					if ( map !== undefined ) {

						needsUpdate = needsUpdate || mesh.material.map !== ( params.showMap ? map : null );
						mesh.material.map = params.showMap ? map : null;

					}

					mesh.material.needsUpdate = needsUpdate;

					render();

				}

			}


			function render() {

				renderer.render( scene, camera );

			}
    }
})