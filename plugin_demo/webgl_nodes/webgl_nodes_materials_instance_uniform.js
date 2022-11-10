// webgl_nodes/webgl_nodes_materials_instance_uniform.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import { MeshStandardNodeMaterial, Node, NodeUpdateType, uniform, cubeTexture, add, mul } from './jsm/nodes/Nodes.js';

import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';

import { nodeFrame } from './jsm/renderers/webgl/nodes/WebGLNodes.js';
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
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
class InstanceUniformNode extends Node {

    constructor() {

        super( 'vec3' );

        this.updateType = NodeUpdateType.Object;

        this.uniformNode = uniform( new THREE.Color() );

    }

    update( frame ) {

        this.uniformNode.value.copy( frame.object.color );

    }

    generate( builder, output ) {

        return this.uniformNode.build( builder, output );

    }

}

let stats;

let camera, scene, renderer;
let controls;
let pointLight;

const objects = [];

init();
animate();

function init() {

    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.set( 0, 200, 1200 );

    scene = new THREE.Scene();

    // Grid

    const helper = new THREE.GridHelper( 1000, 40, 0x303030, 0x303030 );
    helper.position.y = - 75;
    scene.add( helper );

    // CubeMap

    const path = 'textures/cube/SwedishRoyalCastle/';
    const format = '.jpg';
    const urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];

    const cubeMap = new THREE.CubeTextureLoader().load( urls );

    // Material

    const instanceUniform = new InstanceUniformNode();
    const cubeTextureNode = cubeTexture( cubeMap );

    const material = new MeshStandardNodeMaterial();
    material.colorNode = add( instanceUniform, cubeTextureNode );
    material.emissiveNode = mul( instanceUniform, cubeTextureNode );

    // Spheres geometry

    const geometry = new THREE.SphereGeometry( 70, 32, 16 );

    for ( let i = 0, l = 12; i < l; i ++ ) {

        addMesh( geometry, material );

    }

    // Lights

    scene.add( new THREE.AmbientLight( 0x111111 ) );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.125 );

    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();

    scene.add( directionalLight );

    pointLight = new THREE.PointLight( 0xffffff, 1 );
    scene.add( pointLight );

    pointLight.add( new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );

    //

    renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //

    controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 400;
    controls.maxDistance = 2000;

    //

    stats = new Stats();
    container.appendChild( stats.dom );

    //

    window.addEventListener( 'resize', onWindowResize );

}

function addMesh( geometry, material ) {

    const mesh = new THREE.Mesh( geometry, material );

    mesh.color = new THREE.Color( Math.random() * 0xffffff );

    mesh.position.x = ( objects.length % 4 ) * 200 - 300;
    mesh.position.z = Math.floor( objects.length / 4 ) * 200 - 200;

    mesh.rotation.x = Math.random() * 200 - 100;
    mesh.rotation.y = Math.random() * 200 - 100;
    mesh.rotation.z = Math.random() * 200 - 100;

    objects.push( mesh );

    scene.add( mesh );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestId = requestAnimationFrame(animate);

    nodeFrame.update();

    render();
    stats.update();

}

function render() {

    const timer = 0.0001 * Date.now();

    for ( let i = 0, l = objects.length; i < l; i ++ ) {

        const object = objects[ i ];

        object.rotation.x += 0.01;
        object.rotation.y += 0.005;

    }

    pointLight.position.x = Math.sin( timer * 7 ) * 300;
    pointLight.position.y = Math.cos( timer * 5 ) * 400;
    pointLight.position.z = Math.cos( timer * 3 ) * 300;

    renderer.render( scene, camera );

}

}
})