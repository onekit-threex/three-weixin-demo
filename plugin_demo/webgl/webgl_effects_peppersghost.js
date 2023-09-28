import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { PeppersGhostEffect } from './jsm/effects/PeppersGhostEffect.js';
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
onLoad() {
    document.createElementAsync("canvas", "webgl").then(canvas=>this.run(canvas).then())
},
async run(canvas3d){
this.canvas = canvas3d
var that = this

        let container;

        let camera, scene, renderer, effect;
        let group;

        init();
        animate();

        function init() {

            container = document.createElement( 'div' );
            document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );

            scene = new THREE.Scene();

            group = new THREE.Group();
            scene.add( group );

            // Cube

            const geometry = new THREE.BoxGeometry().toNonIndexed(); // ensure unique vertices for each triangle

            const position = geometry.attributes.position;
            const colors = [];
            const color = new THREE.Color();

            // generate for each side of the cube a different color

            for ( let i = 0; i < position.count; i += 6 ) {

                color.setHex( Math.random() * 0xffffff );

                // first face

                colors.push( color.r, color.g, color.b );
                colors.push( color.r, color.g, color.b );
                colors.push( color.r, color.g, color.b );

                // second face

                colors.push( color.r, color.g, color.b );
                colors.push( color.r, color.g, color.b );
                colors.push( color.r, color.g, color.b );

            }

            geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

            const material = new THREE.MeshBasicMaterial( { vertexColors: true } );

            for ( let i = 0; i < 10; i ++ ) {

                const cube = new THREE.Mesh( geometry, material );
                cube.position.x = Math.random() * 2 - 1;
                cube.position.y = Math.random() * 2 - 1;
                cube.position.z = Math.random() * 2 - 1;
                cube.scale.multiplyScalar( Math.random() + 0.5 );
                group.add( cube );

            }

            renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
            renderer.setPixelRatio( window.devicePixelRatio );
            container.appendChild( renderer.domElement );

            effect = new PeppersGhostEffect( renderer );
            effect.setSize( window.innerWidth, window.innerHeight );
            effect.cameraDistance = 5;

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            effect.setSize( window.innerWidth, window.innerHeight );

        }

        function animate() {

            requestId = requestAnimationFrame(animate);

            group.rotation.y += 0.01;

            effect.render( scene, camera );

        }
    }
})