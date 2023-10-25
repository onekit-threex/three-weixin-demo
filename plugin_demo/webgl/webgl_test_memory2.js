import {
  document,
	window,
	HTMLCanvasElement,
	requestAnimationFrame,
	cancelAnimationFrame,
core,
	Event,
  Event0
} from "dhtml-weixin"
import * as THREE from './three/Three';
const fragmentShader = `

  void main() {

    if ( mod ( gl_FragCoord.x, 4.0001 ) < 1.0 || mod ( gl_FragCoord.y, 4.0001 ) < 1.0 )

      gl_FragColor = vec4( XXX, 1.0 );

    else

      gl_FragColor = vec4( 1.0 );

  }
`
const vertexShader = `

  void main() {

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;

  }
`

var requestId
Page({
  onShareAppMessage(){
    return getApp().onShare()
  },
  onShareTimeline(){
     return {title:"ThreeX 2.0"}
  },
	onUnload() {
		cancelAnimationFrame(requestId, this.canvas)
		this.worker && this.worker.terminate()
if(this.canvas) this.canvas = null
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
  webgl_touch(e){
		const web_e = (window.platform=="devtools"?Event:Event0).fix(e)
		this.canvas.dispatchEvent(web_e)
  },
  onLoad() {
		document.createElementAsync("canvas", "webgl2").then(canvas => {
      this.canvas = canvas
      this.body_load(canvas).then()
    })
  },
  async body_load(canvas3d) {

  const N = 100;

  let container;

  let camera, scene, renderer;

  let geometry;

  const meshes = [];


  init();
  setInterval( render, 1000 / 60 );

  function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );


    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 2000;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    geometry = new THREE.SphereGeometry( 15, 64, 32 );

    for ( let i = 0; i < N; i ++ ) {

      const material = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: generateFragmentShader() } );

      const mesh = new THREE.Mesh( geometry, material );

      mesh.position.x = ( 0.5 - Math.random() ) * 1000;
      mesh.position.y = ( 0.5 - Math.random() ) * 1000;
      mesh.position.z = ( 0.5 - Math.random() ) * 1000;

      scene.add( mesh );

      meshes.push( mesh );

    }

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

  }

  //

  function generateFragmentShader() {

    return fragmentShader.replace( 'XXX', Math.random() + ',' + Math.random() + ',' + Math.random() );

  }

  function render() {

    for ( let i = 0; i < N; i ++ ) {

      const mesh = meshes[ i ];
      mesh.material = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: generateFragmentShader() } );
    }

    renderer.render( scene, camera );

    console.log( 'before', renderer.info.programs.length );

    for ( let i = 0; i < N; i ++ ) {

      const mesh = meshes[ i ];
      mesh.material.dispose();
    }

    console.log( 'after', renderer.info.programs.length );

  }
  }
})