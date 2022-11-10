import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,HTMLCanvasElement} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import { AsciiEffect } from './jsm/effects/AsciiEffect.js';
import { TrackballControls } from './jsm/controls/TrackballControls.js';
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
async onLoad() {
         const canvas3d = this.canvas= document.createElement("canvas","webgl")
        var that = this
        let camera, controls, scene, renderer, effect;

        let sphere, plane;

        const start = Date.now();

        init();
        animate();

        function init() {

            camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.position.y = 150;
            camera.position.z = 500;

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0, 0, 0 );

            const pointLight1 = new THREE.PointLight( 0xffffff );
            pointLight1.position.set( 500, 500, 500 );
            scene.add( pointLight1 );

            const pointLight2 = new THREE.PointLight( 0xffffff, 0.25 );
            pointLight2.position.set( - 500, - 500, - 500 );
            scene.add( pointLight2 );

            sphere = new THREE.Mesh( new THREE.SphereGeometry( 200, 20, 10 ), new THREE.MeshPhongMaterial( { flatShading: true } ) );
            scene.add( sphere );

            // Plane

            plane = new THREE.Mesh( new THREE.PlaneGeometry( 400, 400 ), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ) );
            plane.position.y = - 200;
            plane.rotation.x = - Math.PI / 2;
            scene.add( plane );

            renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
            renderer.setSize( window.innerWidth, window.innerHeight );

            effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
             effect.setSize( window.innerWidth, window.innerHeight );
            effect.domElement.style.color = 'white';
            effect.domElement.style.backgroundColor = 'black';

            document.body.appendChild( effect.domElement );
console.error(effect)
            controls = new TrackballControls( camera, effect.domElement );

            //

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );
            effect.setSize( window.innerWidth, window.innerHeight );

        }

        //

        function animate() {
        // requestId = requestAnimationFrame(animate);

            render();

        }

        function render() {

            const timer = Date.now() - start;

            sphere.position.y = Math.abs( Math.sin( timer * 0.002 ) ) * 150;
            sphere.rotation.x = timer * 0.0003;
            sphere.rotation.z = timer * 0.0002;

            controls.update();

            effect.render( scene, camera );

        }

    }
})