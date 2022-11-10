// webgl/webgl_performance_shader.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';
const onekit = {
    fragmentShader:`	uniform float time;

    uniform float fogDensity;
    uniform vec3 fogColor;

    uniform sampler2D texture1;
    uniform sampler2D texture2;

    varying vec2 vUv;

    void main( void ) {

        vec2 position = - 1.0 + 2.0 * vUv;

        vec4 noise = texture2D( texture1, vUv );
        vec2 T1 = vUv + vec2( 1.5, - 1.5 ) * time * 0.02;
        vec2 T2 = vUv + vec2( - 0.5, 2.0 ) * time * 0.01;

        T1.x += noise.x * 2.0;
        T1.y += noise.y * 2.0;
        T2.x -= noise.y * 0.2;
        T2.y += noise.z * 0.2;

        float p = texture2D( texture1, T1 * 2.0 ).a;

        vec4 color = texture2D( texture2, T2 * 2.0 );
        vec4 temp = color * ( vec4( p, p, p, p ) * 2.0 ) + ( color * color - 0.1 );

        if( temp.r > 1.0 ) { temp.bg += clamp( temp.r - 2.0, 0.0, 100.0 ); }
        if( temp.g > 1.0 ) { temp.rb += temp.g - 1.0; }
        if( temp.b > 1.0 ) { temp.rg += temp.b - 1.0; }

        gl_FragColor = temp;

        float depth = gl_FragCoord.z / gl_FragCoord.w;
        const float LOG2 = 1.442695;
        float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
        fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );

        gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

    }`,
    vertexShader:`	uniform vec2 uvScale;
    varying vec2 vUv;

    void main()
    {

        vUv = uvScale * uv;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;

    }`
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
        const web_e = Event.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
async onLoad() {
        const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
        
			let camera, renderer, clock, scene;

			let uniforms, stats;
			const materials = [];

			init();
			animate();

			function init() {

				const container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 3000 );
				camera.position.z = 7;

				scene = new THREE.Scene();

				clock = new THREE.Clock();

				const textureLoader = new THREE.TextureLoader( );

				uniforms = {

					'fogDensity': { value: 0.001 },
					'fogColor': { value: new THREE.Vector3( 0, 0, 0 ) },
					'time': { value: 1.0 },
					'uvScale': { value: new THREE.Vector2( 3.0, 1.0 ) },
					'texture1': { value: textureLoader.load( 'textures/lava/cloud.png' ) },
					'texture2': { value: textureLoader.load( 'textures/lava/lavatile.jpg' ) }

				};

				uniforms[ 'texture1' ].value.wrapS = uniforms[ 'texture1' ].value.wrapT = THREE.RepeatWrapping;
				uniforms[ 'texture2' ].value.wrapS = uniforms[ 'texture2' ].value.wrapT = THREE.RepeatWrapping;


				//

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				container.appendChild( renderer.domElement );

				//

				stats = new Stats();
				container.appendChild( stats.dom );

				onWindowResize();


				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );
				addMeshes();

			}

			function removeAllMeshes() {

				for ( var i = scene.children.length - 1; i >= 0; i -- ) {

					const obj = scene.children[ i ];
					scene.remove( obj );
					obj.geometry.dispose();
					obj.material.dispose();

				}

			}

			function addMeshes() {

				removeAllMeshes();
				//reset pseudorandom number
				THREE.MathUtils.seededRandom( 1 );

				const projScreenMatrix = new THREE.Matrix4();
				const frustum = new THREE.Frustum();
				camera.updateMatrixWorld();
				projScreenMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
				frustum.setFromProjectionMatrix( projScreenMatrix );

				const size = 0.65;
				let meshesCount = 0;
				while ( meshesCount < 2500 ) {

					const material = new THREE.ShaderMaterial( {

						uniforms: uniforms,
						vertexShader: onekit ['vertexShader' ],
						fragmentShader: onekit[ 'fragmentShader' ]

					} );


					const mesh = new THREE.Mesh( new THREE.TorusGeometry( size, 0.3, 30, 30 ), material );

					mesh.position.x = THREE.MathUtils.seededRandom() * 20 - 10;
					mesh.position.y = THREE.MathUtils.seededRandom() * 20 - 10;
					mesh.position.z = THREE.MathUtils.seededRandom() * 20 - 10;
					mesh.rotation.x = THREE.MathUtils.seededRandom() * 2 * Math.PI;
					mesh.rotation.y = THREE.MathUtils.seededRandom() * 2 * Math.PI;
					mesh.scale.x = mesh.scale.y = mesh.scale.z = THREE.MathUtils.seededRandom() * .2 + 0.1;

					mesh.updateMatrixWorld();

					if ( frustum.intersectsObject( mesh ) ) {

						// mesh.rotation.x = 0.3;
						materials.push( material );
						scene.add( mesh );
						meshesCount ++;

					}

				}

			}

			//

			function animate() {

				requestId = requestAnimationFrame(animate);

				render();
				stats.update();

			}

			function render() {

				materials.forEach( ( material ) => {

					material.needsUpdate = true;

				} );

				const delta = 5 * clock.getDelta();
				uniforms[ 'time' ].value += 0.2 * delta;

				renderer.render( scene, camera );

			}
    }
})