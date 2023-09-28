// webgl_nodes/webgl_nodes_points.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import * as Nodes from './jsm/nodes/Nodes.js';

			import Stats from './jsm/libs/stats.module.js';

			import { GUI } from './jsm/libs/lil-gui.module.min.js';

			import { TeapotGeometry } from './jsm/geometries/TeapotGeometry.js';

			import { OrbitControls } from './jsm/controls/OrbitControls0.js';

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
        const web_e = Event0.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
let camera, scene, renderer, stats;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 2, 2000 );
    camera.position.x = 0;
    camera.position.y = 100;
    camera.position.z = - 300;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x000000, 0.001 );

    // geometries

    const teapotGeometry = new TeapotGeometry( 50, 7 );
    const sphereGeometry = new THREE.SphereGeometry( 50, 130, 16 );

    const geometry = new THREE.BufferGeometry();

    // buffers

    const speed = [];
    const intensity = [];
    const size = [];

    const positionAttribute = teapotGeometry.getAttribute( 'position' );
    const particleCount = positionAttribute.count;

    for ( let i = 0; i < particleCount; i ++ ) {

        speed.push( 20 + Math.random() * 50 );

        intensity.push( Math.random() * .15 );

        size.push( 30 + Math.random() * 230 );

    }

    geometry.setAttribute( 'position', positionAttribute );
    geometry.setAttribute( 'targetPosition', sphereGeometry.getAttribute( 'position' ) );
    geometry.setAttribute( 'particleSpeed', new THREE.Float32BufferAttribute( speed, 1 ) );
    geometry.setAttribute( 'particleIntensity', new THREE.Float32BufferAttribute( intensity, 1 ) );
    geometry.setAttribute( 'particleSize', new THREE.Float32BufferAttribute( size, 1 ) );

    // maps

    // Forked from: https://answers.unrealengine.com/questions/143267/emergency-need-help-with-fire-fx-weird-loop.html

    const fireMap = new THREE.TextureLoader( ).load( 'textures/sprites/firetorch_1.jpg' );

    // nodes

    const targetPosition = new Nodes.AttributeNode( 'targetPosition', 'vec3' );
    const particleSpeed = new Nodes.AttributeNode( 'particleSpeed', 'float' );
    const particleIntensity = new Nodes.AttributeNode( 'particleIntensity', 'float' );
    const particleSize = new Nodes.AttributeNode( 'particleSize', 'float' );

    const time = new Nodes.TimerNode();

    const spriteSheetCount = new Nodes.ConstNode( new THREE.Vector2( 6, 6 ) );

    const fireUV = new Nodes.SpriteSheetUVNode(
        spriteSheetCount, // count
        new Nodes.PointUVNode(), // uv
        new Nodes.OperatorNode( '*', time, particleSpeed ) // current frame
    );

    const fireSprite = new Nodes.TextureNode( fireMap, fireUV );
    const fire = new Nodes.OperatorNode( '*', fireSprite, particleIntensity );

    const lerpPosition = new Nodes.UniformNode( 0 );

    const positionNode = new Nodes.MathNode( Nodes.MathNode.MIX, new Nodes.PositionNode( Nodes.PositionNode.LOCAL ), targetPosition, lerpPosition );

    // material

    const material = new Nodes.PointsNodeMaterial( {
        depthWrite: false,
        transparent: true,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    } );

    material.colorNode = fire;
    material.sizeNode = particleSize;
    material.positionNode = positionNode;

    const particles = new THREE.Points( geometry, material );
    scene.add( particles );

    // renderer

    renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // stats

    stats = new Stats();
    document.body.appendChild( stats.dom );

    // gui

    const gui = new GUI();
    const guiNode = { lerpPosition: 0 };

    gui.add( material, 'sizeAttenuation' ).onChange( function () {

        material.needsUpdate = true;

    } );

    gui.add( guiNode, 'lerpPosition', 0, 1 ).onChange( function () {

        lerpPosition.value = guiNode.lerpPosition;

    } );

    gui.open();

    // controls

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.maxDistance = 1000;
    controls.update();

    // events

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestId = requestAnimationFrame(animate);

    render();
    stats.update();

}

function render() {

    nodeFrame.update();

    renderer.render( scene, camera );

}
}
})