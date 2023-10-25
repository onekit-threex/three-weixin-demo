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

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls0 } from 'three/addons/controls/OrbitControls0.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
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
 

    let camera, scene, renderer;

    init();

    function init( ) {

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
      camera.position.set( 0, - 400, 600 );

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xf0f0f0 );

      const loader = new FontLoader();
      loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

        const color = new THREE.Color( 0x006699 );

        const matDark = new THREE.MeshBasicMaterial( {
          color: color,
          side: THREE.DoubleSide
        } );

        const matLite = new THREE.MeshBasicMaterial( {
          color: color,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide
        } );

        const message = '   Three.js\nStroke text.';

        const shapes = font.generateShapes( message, 100 );

        const geometry = new THREE.ShapeGeometry( shapes );

        geometry.computeBoundingBox();

        const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

        geometry.translate( xMid, 0, 0 );

        // make shape ( N.B. edge view not visible )

        const text = new THREE.Mesh( geometry, matLite );
        text.position.z = - 150;
        scene.add( text );

        // make line shape ( N.B. edge view remains visible )

        const holeShapes = [];

        for ( let i = 0; i < shapes.length; i ++ ) {

          const shape = shapes[ i ];

          if ( shape.holes && shape.holes.length > 0 ) {

            for ( let j = 0; j < shape.holes.length; j ++ ) {

              const hole = shape.holes[ j ];
              holeShapes.push( hole );

            }

          }

        }

        shapes.push.apply( shapes, holeShapes );

        const style = SVGLoader.getStrokeStyle( 5, color.getStyle() );

        const strokeText = new THREE.Group();

        for ( let i = 0; i < shapes.length; i ++ ) {

          const shape = shapes[ i ];

          const points = shape.getPoints();

          const geometry = SVGLoader.pointsToStroke( points, style );

          geometry.translate( xMid, 0, 0 );

          const strokeMesh = new THREE.Mesh( geometry, matDark );
          strokeText.add( strokeMesh );

        }

        scene.add( strokeText );

        render();

      } ); //end load function

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      const controls = new (window.platform=="devtools"?OrbitControls:OrbitControls0)( camera, renderer.domElement );
      controls.target.set( 0, 0, 0 );
      controls.update();

      controls.addEventListener( 'change', render );

      window.addEventListener( 'resize', onWindowResize );

    } // end init

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

      render();

    }

    function render() {

      renderer.render( scene, camera );

    }
  }
})