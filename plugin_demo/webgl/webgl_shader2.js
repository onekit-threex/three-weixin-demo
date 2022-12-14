// webgl/webgl_shader2.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';
const onekit= {
    fragment_shader4:`uniform float time;

    varying vec2 vUv;

    void main( void ) {

        vec2 position = - 1.0 + 2.0 * vUv;

        float red = abs( sin( position.x * position.y + time / 5.0 ) );
        float green = abs( sin( position.x * position.y + time / 4.0 ) );
        float blue = abs( sin( position.x * position.y + time / 3.0 ) );
        gl_FragColor = vec4( red, green, blue, 1.0 );

    }`,
    fragment_shader3:`	uniform float time;

    varying vec2 vUv;

    void main( void ) {

        vec2 position = vUv;

        float color = 0.0;
        color += sin( position.x * cos( time / 15.0 ) * 80.0 ) + cos( position.y * cos( time / 15.0 ) * 10.0 );
        color += sin( position.y * sin( time / 10.0 ) * 40.0 ) + cos( position.x * sin( time / 25.0 ) * 40.0 );
        color += sin( position.x * sin( time / 5.0 ) * 10.0 ) + sin( position.y * sin( time / 35.0 ) * 80.0 );
        color *= sin( time / 10.0 ) * 0.5;

        gl_FragColor = vec4( vec3( color, color * 0.5, sin( color + time / 3.0 ) * 0.75 ), 1.0 );

    }`,
    fragment_shader2:`uniform float time;

    uniform sampler2D colorTexture;

    varying vec2 vUv;

    void main( void ) {

        vec2 position = - 1.0 + 2.0 * vUv;

        float a = atan( position.y, position.x );
        float r = sqrt( dot( position, position ) );

        vec2 uv;
        uv.x = cos( a ) / r;
        uv.y = sin( a ) / r;
        uv /= 10.0;
        uv += time * 0.05;

        vec3 color = texture2D( colorTexture, uv ).rgb;

        gl_FragColor = vec4( color * r * 1.5, 1.0 );

    }`,
    fragment_shader1:`	uniform float time;

    varying vec2 vUv;

    void main(void) {

        vec2 p = - 1.0 + 2.0 * vUv;
        float a = time * 40.0;
        float d, e, f, g = 1.0 / 40.0 ,h ,i ,r ,q;

        e = 400.0 * ( p.x * 0.5 + 0.5 );
        f = 400.0 * ( p.y * 0.5 + 0.5 );
        i = 200.0 + sin( e * g + a / 150.0 ) * 20.0;
        d = 200.0 + cos( f * g / 2.0 ) * 18.0 + cos( e * g ) * 7.0;
        r = sqrt( pow( abs( i - e ), 2.0 ) + pow( abs( d - f ), 2.0 ) );
        q = f / r;
        e = ( r * cos( q ) ) - a / 2.0;
        f = ( r * sin( q ) ) - a / 2.0;
        d = sin( e * g ) * 176.0 + sin( e * g ) * 164.0 + r;
        h = ( ( f + d ) + a / 2.0 ) * g;
        i = cos( h + r * p.x / 1.3 ) * ( e + e + a ) + cos( q * g * 6.0 ) * ( r + h / 3.0 );
        h = sin( f * g ) * 144.0 - sin( e * g ) * 212.0 * p.x;
        h = ( h + ( f - e ) * q + sin( r - ( a + h ) / 7.0 ) * 10.0 + i / 4.0 ) * g;
        i += cos( h * 2.3 * sin( a / 350.0 - q ) ) * 184.0 * sin( q - ( r * 4.3 + a / 12.0 ) * g ) + tan( r * g + h ) * 184.0 * cos( r * g + h );
        i = mod( i / 5.6, 256.0 ) / 64.0;
        if ( i < 0.0 ) i += 4.0;
        if ( i >= 2.0 ) i = 4.0 - i;
        d = r / 350.0;
        d += sin( d * d * 8.0 ) * 0.52;
        f = ( sin( a * g ) + 1.0 ) / 2.0;
        gl_FragColor = vec4( vec3( f * i / 1.6, i / 2.0 + d / 13.0, i ) * d * p.x + vec3( i / 1.3 + d / 8.0, i / 2.0 + d / 18.0, i ) * d * ( 1.0 - p.x ), 1.0 );

    }`,
    vertexShader:`	varying vec2 vUv;

    void main()
    {
        vUv = uv;
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
onLoad() {
    document.createElementAsync("canvas", "webgl").then(canvas=>this.run(canvas).then())
},
async run(canvas3d){
this.canvas = canvas3d
var that = this
        let stats;

			let camera, scene, renderer, clock;

			let uniforms1, uniforms2;

			init();
			animate();

			function init() {

				const container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 3000 );
				camera.position.z = 4;

				scene = new THREE.Scene();

				clock = new THREE.Clock();

				const geometry = new THREE.BoxGeometry( 0.75, 0.75, 0.75 );

				uniforms1 = {
					'time': { value: 1.0 }
				};

				uniforms2 = {
					'time': { value: 1.0 },
					'colorTexture': { value: new THREE.TextureLoader( ).load( 'textures/disturb.jpg' ) }
				};

				uniforms2[ 'colorTexture' ].value.wrapS = uniforms2[ 'colorTexture' ].value.wrapT = THREE.RepeatWrapping;

				const params = [
					[ 'fragment_shader1', uniforms1 ],
					[ 'fragment_shader2', uniforms2 ],
					[ 'fragment_shader3', uniforms1 ],
					[ 'fragment_shader4', uniforms1 ]
				];

				for ( let i = 0; i < params.length; i ++ ) {

					const material = new THREE.ShaderMaterial( {

						uniforms: params[ i ][ 1 ],
						vertexShader: onekit['vertexShader'],
						fragmentShader: onekit[ params[ i ][ 0 ] ]

					} );

					const mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = i - ( params.length - 1 ) / 2;
					mesh.position.y = i % 2 - 0.5;
					scene.add( mesh );

				}

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

				onWindowResize();

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

				const delta = clock.getDelta();

				uniforms1[ 'time' ].value += delta * 5;
				uniforms2[ 'time' ].value = clock.elapsedTime;

				for ( let i = 0; i < scene.children.length; i ++ ) {

					const object = scene.children[ i ];

					object.rotation.y += delta * 0.5 * ( i % 2 ? 1 : - 1 );
					object.rotation.x += delta * 0.5 * ( i % 2 ? - 1 : 1 );

				}

				renderer.render( scene, camera );

			}
    }
})