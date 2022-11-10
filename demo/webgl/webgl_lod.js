// webgl/webgl_lod.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { FlyControls } from './jsm/controls/FlyControls.js';
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
        const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this

        let container;

        let camera, scene, renderer, controls;

        const clock = new THREE.Clock();

        init();
        animate();

        function init() {

            container = document.createElement( 'div' );
            document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 15000 );
            camera.position.z = 1000;

            scene = new THREE.Scene();
            scene.fog = new THREE.Fog( 0x000000, 1, 15000 );

            const pointLight = new THREE.PointLight( 0xff2200 );
            pointLight.position.set( 0, 0, 0 );
            scene.add( pointLight );

            const dirLight = new THREE.DirectionalLight( 0xffffff );
            dirLight.position.set( 0, 0, 1 ).normalize();
            scene.add( dirLight );

            const geometry = [

                [ new THREE.IcosahedronGeometry( 100, 16 ), 50 ],
                [ new THREE.IcosahedronGeometry( 100, 8 ), 300 ],
                [ new THREE.IcosahedronGeometry( 100, 4 ), 1000 ],
                [ new THREE.IcosahedronGeometry( 100, 2 ), 2000 ],
                [ new THREE.IcosahedronGeometry( 100, 1 ), 8000 ]

            ];

            const material = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: true } );

            for ( let j = 0; j < 1000; j ++ ) {

                const lod = new THREE.LOD();

                for ( let i = 0; i < geometry.length; i ++ ) {

                    const mesh = new THREE.Mesh( geometry[ i ][ 0 ], material );
                    mesh.scale.set( 1.5, 1.5, 1.5 );
                    mesh.updateMatrix();
                    mesh.matrixAutoUpdate = false;
                    lod.addLevel( mesh, geometry[ i ][ 1 ] );

                }

                lod.position.x = 10000 * ( 0.5 - Math.random() );
                lod.position.y = 7500 * ( 0.5 - Math.random() );
                lod.position.z = 10000 * ( 0.5 - Math.random() );
                lod.updateMatrix();
                lod.matrixAutoUpdate = false;
                scene.add( lod );

            }


            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            container.appendChild( renderer.domElement );

            //

            controls = new FlyControls( camera, renderer.domElement );
            controls.movementSpeed = 1000;
            controls.rollSpeed = Math.PI / 10;

            //

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function animate() {

            requestId = requestAnimationFrame(animate);
            render();

        }

        function render() {

            controls.update( clock.getDelta() );

            renderer.render( scene, camera );

        }
    }
})