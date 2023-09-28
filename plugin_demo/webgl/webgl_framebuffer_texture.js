import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls0.js';
import * as GeometryUtils from './jsm/utils/GeometryUtils.js';
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
        window.dispatchEvent(web_e)
        document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
onLoad() {
    document.createElementAsync("canvas", "webgl").then(canvas=>this.run(canvas).then())
},
async run(canvas3d){
this.canvas = canvas3d
var that = this
        let camera, scene, renderer;
        let line, sprite, texture;

        let cameraOrtho, sceneOrtho;

        let offset = 0;

        const dpr = window.devicePixelRatio;

        const textureSize = 128 * dpr;
        const vector = new THREE.Vector2();
        const color = new THREE.Color();

        init();
        animate();

        function init() {

            //

            const width = window.innerWidth;
            const height = window.innerHeight;

            camera = new THREE.PerspectiveCamera( 70, width / height, 1, 1000 );
            camera.position.z = 20;

            cameraOrtho = new THREE.OrthographicCamera( - width / 2, width / 2, height / 2, - height / 2, 1, 10 );
            cameraOrtho.position.z = 10;

            scene = new THREE.Scene();
            sceneOrtho = new THREE.Scene();

            //

            const points = GeometryUtils.gosper( 8 );

            const geometry = new THREE.BufferGeometry();
            const positionAttribute = new THREE.Float32BufferAttribute( points, 3 );
            geometry.setAttribute( 'position', positionAttribute );
            geometry.center();

            const colorAttribute = new THREE.BufferAttribute( new Float32Array( positionAttribute.array.length ), 3 );
            colorAttribute.setUsage( THREE.DynamicDrawUsage );
            geometry.setAttribute( 'color', colorAttribute );

            const material = new THREE.LineBasicMaterial( { vertexColors: true } );

            line = new THREE.Line( geometry, material );
            line.scale.setScalar( 0.05 );
            scene.add( line );

            //

            texture = new THREE.FramebufferTexture( textureSize, textureSize, THREE.RGBAFormat );
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;

            //

            const spriteMaterial = new THREE.SpriteMaterial( { map: texture } );
            sprite = new THREE.Sprite( spriteMaterial );
            sprite.scale.set( textureSize, textureSize, 1 );
            sceneOrtho.add( sprite );

            updateSpritePosition();

            //

            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.autoClear = false;
            document.body.appendChild( renderer.domElement );

            //

            const selection = document.getElementById( 'selection' );
            const controls = new OrbitControls( camera, selection );
            controls.enablePan = false;

            //

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            cameraOrtho.left = - width / 2;
            cameraOrtho.right = width / 2;
            cameraOrtho.top = height / 2;
            cameraOrtho.bottom = - height / 2;
            cameraOrtho.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

            updateSpritePosition();

        }

        function updateSpritePosition() {

            const halfWidth = window.innerWidth / 2;
            const halfHeight = window.innerHeight / 2;

            const halfImageWidth = textureSize / 2;
            const halfImageHeight = textureSize / 2;

            sprite.position.set( - halfWidth + halfImageWidth, halfHeight - halfImageHeight, 1 );

        }

        function animate() {

            requestId = requestAnimationFrame(animate);

            const colorAttribute = line.geometry.getAttribute( 'color' );
            updateColors( colorAttribute );

            // scene rendering

            renderer.clear();
            renderer.render( scene, camera );

            // calculate start position for copying data

            vector.x = ( window.innerWidth * dpr / 2 ) - ( textureSize / 2 );
            vector.y = ( window.innerHeight * dpr / 2 ) - ( textureSize / 2 );

            renderer.copyFramebufferToTexture( vector, texture );

            renderer.clearDepth();
            renderer.render( sceneOrtho, cameraOrtho );

        }

        function updateColors( colorAttribute ) {

            const l = colorAttribute.count;

            for ( let i = 0; i < l; i ++ ) {

                const h = ( ( offset + i ) % l ) / l;

                color.setHSL( h, 1, 0.5 );
                colorAttribute.setX( i, color.r );
                colorAttribute.setY( i, color.g );
                colorAttribute.setZ( i, color.b );

            }

            colorAttribute.needsUpdate = true;

            offset -= 25;

        }

    }
})