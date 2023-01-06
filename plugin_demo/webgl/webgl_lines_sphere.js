// webgl/webgl_lines_sphere.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
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

        const SCREEN_WIDTH = window.innerWidth,
        SCREEN_HEIGHT = window.innerHeight,

        r = 450;

    let mouseY = 0,

        windowHalfY = window.innerHeight / 2,

        camera, scene, renderer;

    init();
    animate();

    function init() {

        camera = new THREE.PerspectiveCamera( 80, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000 );
        camera.position.z = 1000;

        scene = new THREE.Scene();

        const parameters = [[ 0.25, 0xff7700, 1 ], [ 0.5, 0xff9900, 1 ], [ 0.75, 0xffaa00, 0.75 ], [ 1, 0xffaa00, 0.5 ], [ 1.25, 0x000833, 0.8 ],
            [ 3.0, 0xaaaaaa, 0.75 ], [ 3.5, 0xffffff, 0.5 ], [ 4.5, 0xffffff, 0.25 ], [ 5.5, 0xffffff, 0.125 ]];

        const geometry = createGeometry();

        for ( let i = 0; i < parameters.length; ++ i ) {

            const p = parameters[ i ];

            const material = new THREE.LineBasicMaterial( { color: p[ 1 ], opacity: p[ 2 ] } );

            const line = new THREE.LineSegments( geometry, material );
            line.scale.x = line.scale.y = line.scale.z = p[ 0 ];
            line.userData.originalScale = p[ 0 ];
            line.rotation.y = Math.random() * Math.PI;
            line.updateMatrix();
            scene.add( line );

        }

        renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        document.body.appendChild( renderer.domElement );

        document.body.style.touchAction = 'none';
        document.body.addEventListener( 'pointermove', onPointerMove );

        //

        window.addEventListener( 'resize', onWindowResize );

        // test geometry swapability

        setInterval( function () {

            const geometry = createGeometry();

            scene.traverse( function ( object ) {

                if ( object.isLine ) {

                    object.geometry.dispose();
                    object.geometry = geometry;

                }

            } );

        }, 1000 );

    }

    function createGeometry() {

        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        const vertex = new THREE.Vector3();

        for ( let i = 0; i < 1500; i ++ ) {

            vertex.x = Math.random() * 2 - 1;
            vertex.y = Math.random() * 2 - 1;
            vertex.z = Math.random() * 2 - 1;
            vertex.normalize();
            vertex.multiplyScalar( r );

            vertices.push( vertex.x, vertex.y, vertex.z );

            vertex.multiplyScalar( Math.random() * 0.09 + 1 );

            vertices.push( vertex.x, vertex.y, vertex.z );

        }

        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

        return geometry;

    }

    function onWindowResize() {

        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function onPointerMove( event ) {

        if ( event.isPrimary === false ) return;

        mouseY = event.clientY - windowHalfY;

    }

    //

    function animate() {

        requestId = requestAnimationFrame(animate);

        render();

    }

    function render() {

        camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
        camera.lookAt( scene.position );

        renderer.render( scene, camera );

        const time = Date.now() * 0.0001;

        for ( let i = 0; i < scene.children.length; i ++ ) {

            const object = scene.children[ i ];

            if ( object.isLine ) {

                object.rotation.y = time * ( i < 4 ? ( i + 1 ) : - ( i + 1 ) );

                if ( i < 5 ) {

                    const scale = object.userData.originalScale * ( i / 5 + 1 ) * ( 1 + 0.5 * Math.sin( 7 * time ) );

                    object.scale.x = object.scale.y = object.scale.z = scale;

                }

            }

        }

    }
    }
})