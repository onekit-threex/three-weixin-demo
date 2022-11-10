// webgl_nodes/webgl_nodes_materials_standard.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import * as Nodes from './jsm/nodes/Nodes.js';

import Stats from './jsm/libs/stats.module.js';

import { GUI } from './jsm/libs/lil-gui.module.min.js';
import { TrackballControls } from './jsm/controls/TrackballControls.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import { RGBELoader } from './jsm/loaders/RGBELoader.js';

import { nodeFrame } from './jsm/renderers/webgl/nodes/WebGLNodes.js';

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
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
let container, stats;

let camera, scene, renderer, controls;

init();
animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 3;

    //

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.z = 2;

    controls = new TrackballControls( camera, renderer.domElement );

    //

    scene.add( new THREE.HemisphereLight( 0x443333, 0x222233, 4 ) );

    //

    const material = new Nodes.MeshStandardNodeMaterial();

    new OBJLoader()
        .setPath( 'models/obj/cerberus/' )
        .load( 'Cerberus.obj', function ( group ) { 
            const loaderManager = new THREE.LoadingManager();

            const loader = new THREE.TextureLoader( loaderManager )
                .setPath( 'models/obj/cerberus/' );

            const diffuseMap = loader.load( 'Cerberus_A.jpg' );
            diffuseMap.wrapS = THREE.RepeatWrapping;
            diffuseMap.encoding = THREE.sRGBEncoding;

            const rmMap = loader.load( 'Cerberus_RM.jpg' );
            rmMap.wrapS = THREE.RepeatWrapping;

            const normalMap = loader.load( 'Cerberus_N.jpg' );
            normalMap.wrapS = THREE.RepeatWrapping;

            const mpMapNode = new Nodes.TextureNode( rmMap );

            material.colorNode = new Nodes.OperatorNode( '*', new Nodes.TextureNode( diffuseMap ), new Nodes.UniformNode( material.color ) );

            // roughness is in G channel, metalness is in B channel
            material.roughnessNode = new Nodes.SplitNode( mpMapNode, 'g' );
            material.metalnessNode = new Nodes.SplitNode( mpMapNode, 'b' );

            material.normalNode = new Nodes.NormalMapNode( new Nodes.TextureNode( normalMap ) );
            group.traverse( function ( child ) {

                if ( child.isMesh ) {

                    child.material = material;

                }

            } );
            group.position.x = - 0.45;
            group.rotation.y = - Math.PI / 2;
            //scene.add( group );

            // TODO: Serialization test

            loaderManager.onLoad = () => {	
                const groupJSON = JSON.stringify( group.toJSON() );
          


                const objectLoader = new Nodes.NodeObjectLoader();
                objectLoader.parse( JSON.parse( groupJSON ), ( newGroup ) => {

                    //scene.remove( group );

                    newGroup.position.copy( group.position );
                    newGroup.rotation.copy( group.rotation );

                    scene.add( newGroup );

                    console.log( 'Serialized!' );

                } );

            };

        } );

    const environments = {

        'Venice Sunset': { filename: 'venice_sunset_1k.hdr' },
        'Overpass': { filename: 'pedestrian_overpass_1k.hdr' }

    };

    function loadEnvironment( name ) {

        if ( environments[ name ].texture !== undefined ) {

            scene.background = environments[ name ].texture;
            scene.environment = environments[ name ].texture;
            return;

        }

        const filename = environments[ name ].filename;
        new RGBELoader()
            .setPath( 'textures/equirectangular/' )
            .load( filename, function ( hdrEquirect ) {

                const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular( hdrEquirect );
                hdrEquirect.dispose();

                scene.background = hdrCubeRenderTarget.texture;
                scene.environment = hdrCubeRenderTarget.texture;
                environments[ name ].texture = hdrCubeRenderTarget.texture;

            } );

    }

    const params = {

        environment: Object.keys( environments )[ 0 ]

    };
    loadEnvironment( params.environment );

    const gui = new GUI();
    gui.add( params, 'environment', Object.keys( environments ) ).onChange( function ( value ) {

        loadEnvironment( value );

    } );
    gui.open();

    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    pmremGenerator.compileEquirectangularShader();

    //

    stats = new Stats();
    container.appendChild( stats.dom );

    window.addEventListener( 'resize', onWindowResize );

}

//

function onWindowResize() {

    renderer.setSize( window.innerWidth, window.innerHeight );

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

}

//

function animate() {

    requestId = requestAnimationFrame(animate);

    nodeFrame.update();

    controls.update();
    renderer.render( scene, camera );

    stats.update();

}

}
})