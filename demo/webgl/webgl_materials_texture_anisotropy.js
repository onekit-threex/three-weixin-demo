// webgl/webgl_materials_texture_anisotropy.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';
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

        const SCREEN_WIDTH = window.innerWidth;
        const SCREEN_HEIGHT = window.innerHeight;

        let container, stats;

        let camera, scene1, scene2, renderer;

        let mouseX = 0, mouseY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        init();
        animate();


        function init() {

            container = document.createElement( 'div' );
            document.body.appendChild( container );

            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );

            //

            camera = new THREE.PerspectiveCamera( 35, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 25000 );
            camera.position.z = 1500;

            scene1 = new THREE.Scene();
            scene1.background = new THREE.Color( 0xf2f7ff );
            scene1.fog = new THREE.Fog( 0xf2f7ff, 1, 25000 );

            scene2 = new THREE.Scene();
            scene2.background = new THREE.Color( 0xf2f7ff );
            scene2.fog = new THREE.Fog( 0xf2f7ff, 1, 25000 );

            scene1.add( new THREE.AmbientLight( 0xeef0ff ) );
            scene2.add( new THREE.AmbientLight( 0xeef0ff ) );

            const light1 = new THREE.DirectionalLight( 0xffffff, 2 );
            light1.position.set( 1, 1, 1 );
            scene1.add( light1 );

            const light2 = new THREE.DirectionalLight( 0xffffff, 2 );
            light2.position.set( 1, 1, 1 );
            scene2.add( light2 );

            // GROUND

            const textureLoader = new THREE.TextureLoader( );

            const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

            const texture1 = textureLoader.load( 'textures/crate.gif' );
            const material1 = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture1 } );

            texture1.anisotropy = maxAnisotropy;
            texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
            texture1.repeat.set( 512, 512 );

            const texture2 = textureLoader.load( 'textures/crate.gif' );
            const material2 = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture2 } );

            texture2.anisotropy = 1;
            texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
            texture2.repeat.set( 512, 512 );

            if ( maxAnisotropy > 0 ) {

                document.getElementById( 'val_left' ).innerHTML = texture1.anisotropy;
                document.getElementById( 'val_right' ).innerHTML = texture2.anisotropy;

            } else {

                document.getElementById( 'val_left' ).innerHTML = 'not supported';
                document.getElementById( 'val_right' ).innerHTML = 'not supported';

            }

            //

            const geometry = new THREE.PlaneGeometry( 100, 100 );

            const mesh1 = new THREE.Mesh( geometry, material1 );
            mesh1.rotation.x = - Math.PI / 2;
            mesh1.scale.set( 1000, 1000, 1000 );

            const mesh2 = new THREE.Mesh( geometry, material2 );
            mesh2.rotation.x = - Math.PI / 2;
            mesh2.scale.set( 1000, 1000, 1000 );

            scene1.add( mesh1 );
            scene2.add( mesh2 );

            // RENDERER

            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
            renderer.autoClear = false;

           // renderer.domElement.style.position = 'relative';
            container.appendChild( renderer.domElement );

            // STATS1

            stats = new Stats();
            container.appendChild( stats.dom );

            document.addEventListener( 'mousemove', onDocumentMouseMove );

        }


        function onDocumentMouseMove( event ) {

            mouseX = ( event.clientX - windowHalfX );
            mouseY = ( event.clientY - windowHalfY );

        }


        function animate() {

            requestId = requestAnimationFrame(animate);

            render();
            stats.update();

        }

        function render() {

            camera.position.x += ( mouseX - camera.position.x ) * .05;
            camera.position.y = THREE.MathUtils.clamp( camera.position.y + ( - ( mouseY - 200 ) - camera.position.y ) * .05, 50, 1000 );

            camera.lookAt( scene1.position );

            renderer.clear();
            renderer.setScissorTest( true );

            renderer.setScissor( 0, 0, SCREEN_WIDTH / 2 - 2, SCREEN_HEIGHT );
            renderer.render( scene1, camera );

            renderer.setScissor( SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2 - 2, SCREEN_HEIGHT );
            renderer.render( scene2, camera );

            renderer.setScissorTest( false );


        }
    }
})