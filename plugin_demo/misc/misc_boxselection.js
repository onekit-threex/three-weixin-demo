// misc/misc_boxselection.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import Stats from './jsm/libs/stats.module.js';

import { SelectionBox } from './jsm/interactive/SelectionBox.js';
import { SelectionHelper } from './jsm/interactive/SelectionHelper.js';

var requestId
Page({
    webgl_touch(e){
        const web_e = Event0.fix(e)
        document.dispatchEvent(web_e)
        window.dispatchEvent(web_e)
       this.canvas.dispatchEvent(web_e)
    },
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
let container, stats,renderer ;
let camera, scene;

init();
animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    scene.add( new THREE.AmbientLight( 0x505050 ) );

    const light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, 500, 2000 );
    light.angle = Math.PI / 9;

    light.castShadow = true;
    light.shadow.camera.near = 1000;
    light.shadow.camera.far = 4000;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    scene.add( light );

    const geometry = new THREE.BoxGeometry( 20, 20, 20 );

    for ( let i = 0; i < 200; i ++ ) {

        const object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

        object.position.x = Math.random() * 1600 - 800;
        object.position.y = Math.random() * 900 - 450;
        object.position.z = Math.random() * 900 - 500;

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;

        object.scale.x = Math.random() * 2 + 1;
        object.scale.y = Math.random() * 2 + 1;
        object.scale.z = Math.random() * 2 + 1;

        object.castShadow = true;
        object.receiveShadow = true;

        scene.add( object );

    }

    renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild( renderer.domElement );

    stats = new Stats();
    container.appendChild( stats.dom );

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

    renderer.render( scene, camera );

}

const selectionBox = new SelectionBox( camera, scene );
const helper = new SelectionHelper( renderer, 'selectBox' );

document.addEventListener( 'pointerdown', function ( event ) {

    for ( const item of selectionBox.collection ) {

        item.material.emissive.set( 0x000000 );

    }

    selectionBox.startPoint.set(
        ( event.clientX / window.innerWidth ) * 2 - 1,
        - ( event.clientY / window.innerHeight ) * 2 + 1,
        0.5 );

} );

document.addEventListener( 'pointermove', function ( event ) {

    if ( helper.isDown ) {

        for ( let i = 0; i < selectionBox.collection.length; i ++ ) {

            selectionBox.collection[ i ].material.emissive.set( 0x000000 );

        }

        selectionBox.endPoint.set(
            ( event.clientX / window.innerWidth ) * 2 - 1,
            - ( event.clientY / window.innerHeight ) * 2 + 1,
            0.5 );

        const allSelected = selectionBox.select();

        for ( let i = 0; i < allSelected.length; i ++ ) {

            allSelected[ i ].material.emissive.set( 0xffffff );

        }

    }

} );

document.addEventListener( 'pointerup', function ( event ) {

    selectionBox.endPoint.set(
        ( event.clientX / window.innerWidth ) * 2 - 1,
        - ( event.clientY / window.innerHeight ) * 2 + 1,
        0.5 );

    const allSelected = selectionBox.select();

    for ( let i = 0; i < allSelected.length; i ++ ) {

        allSelected[ i ].material.emissive.set( 0xffffff );

    }

} );
}
})