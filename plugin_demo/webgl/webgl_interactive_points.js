// webgl/webgl_interactive_points.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import Stats from './jsm/libs/stats.module.js';

			import * as BufferGeometryUtils from './jsm/utils/BufferGeometryUtils.js';
const onekit = {
    "vertexshader":`
    attribute float size;
    attribute vec3 customColor;

    varying vec3 vColor;

    void main() {

        vColor = customColor;

        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

        gl_PointSize = size * ( 300.0 / -mvPosition.z );

        gl_Position = projectionMatrix * mvPosition;

    }
    `,
        "fragmentshader":`
        uniform vec3 color;
        uniform sampler2D pointTexture;
        uniform float alphaTest;

        varying vec3 vColor;

        void main() {

            gl_FragColor = vec4( color * vColor, 1.0 );

            gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

            if ( gl_FragColor.a < alphaTest ) discard;

        }
        `
}
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
        let renderer, scene, camera, stats;

			let particles;

			const PARTICLE_SIZE = 20;

			let raycaster, intersects;
			let pointer, INTERSECTED;

			init();
			animate();

			function init() {

				const container = document.getElementById( 'container' );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 250;

				//

				let boxGeometry = new THREE.BoxGeometry( 200, 200, 200, 16, 16, 16 );

				// if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data

				boxGeometry.deleteAttribute( 'normal' );
				boxGeometry.deleteAttribute( 'uv' );

				boxGeometry = BufferGeometryUtils.mergeVertices( boxGeometry );

				//

				const positionAttribute = boxGeometry.getAttribute( 'position' );

				const colors = [];
				const sizes = [];

				const color = new THREE.Color();

				for ( let i = 0, l = positionAttribute.count; i < l; i ++ ) {

					color.setHSL( 0.01 + 0.1 * ( i / l ), 1.0, 0.5 );
					color.toArray( colors, i * 3 );

					sizes[ i ] = PARTICLE_SIZE * 0.5;

				}

				const geometry = new THREE.BufferGeometry();
				geometry.setAttribute( 'position', positionAttribute );
				geometry.setAttribute( 'customColor', new THREE.Float32BufferAttribute( colors, 3 ) );
				geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ) );

				//

				const material = new THREE.ShaderMaterial( {

					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader( ).load( 'textures/sprites/disc.png' ) },
						alphaTest: { value: 0.9 }
					},
					vertexShader: onekit[ 'vertexshader' ],
					fragmentShader: onekit[ 'fragmentshader' ]

				} );

				//

				particles = new THREE.Points( geometry, material );
				scene.add( particles );

				//

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//

				raycaster = new THREE.Raycaster();
				pointer = new THREE.Vector2();

				//

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize );
				document.addEventListener( 'pointermove', onPointerMove );

			}

			function onPointerMove( event ) {

				pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestId = requestAnimationFrame(animate);

				render();
				////stats.update();

			}

			function render() {

				particles.rotation.x += 0.0005;
				particles.rotation.y += 0.001;

				const geometry = particles.geometry;
				const attributes = geometry.attributes;

				raycaster.setFromCamera( pointer, camera );

				intersects = raycaster.intersectObject( particles );

				if ( intersects.length > 0 ) {

					if ( INTERSECTED != intersects[ 0 ].index ) {

						attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE;

						INTERSECTED = intersects[ 0 ].index;

						attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE * 1.25;
						attributes.size.needsUpdate = true;

					}

				} else if ( INTERSECTED !== null ) {

					attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE;
					attributes.size.needsUpdate = true;
					INTERSECTED = null;

				}

				renderer.render( scene, camera );

			}

    }
})