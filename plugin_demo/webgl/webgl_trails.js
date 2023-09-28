// webgl/webgl_trails.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import Stats from './jsm/libs/stats.module.js';
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

        let stats;

        let camera, scene, renderer, clock;

        init();
        animate();

        function init() {

            const container = document.createElement( 'div' );
            document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 10 );
            camera.position.set( 0, 0, 1 );

            clock = new THREE.Clock();

            scene = new THREE.Scene();

            const colorArray = [ new THREE.Color( 0xff0080 ), new THREE.Color( 0xffffff ), new THREE.Color( 0x8000ff ) ];
            const positions = [];
            const colors = [];

            for ( let i = 0; i < 100; i ++ ) {

                positions.push( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );

                const clr = colorArray[ Math.floor( Math.random() * colorArray.length ) ];

                colors.push( clr.r, clr.g, clr.b );

            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
            geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

            const material = new THREE.PointsMaterial( { size: 4, vertexColors: true, depthTest: false, sizeAttenuation: false } );

            const mesh = new THREE.Points( geometry, material );
            scene.add( mesh );

            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,preserveDrawingBuffer: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.autoClearColor = false;
            container.appendChild( renderer.domElement );

            stats = new Stats();
            container.appendChild( stats.dom );

            //

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

            const elapsedTime = clock.getElapsedTime();

            scene.rotation.y = elapsedTime * 0.5;

            renderer.render( scene, camera );

        }
    }
})