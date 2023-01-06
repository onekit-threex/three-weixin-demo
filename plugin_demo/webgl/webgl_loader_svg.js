// webgl/webgl_loader_svg.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { GUI } from './jsm/libs/lil-gui.module.min.js';
			import { OrbitControls } from './jsm/controls/OrbitControls.js';
			import { SVGLoader } from './jsm/loaders/SVGLoader.js';
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

        let renderer, scene, camera, gui, guiData;

			init();

			//

			function init() {

				const container = document.getElementById( 'container' );

				//

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 0, 0, 200 );

				//

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.outputEncoding = THREE.sRGBEncoding;
				container.appendChild( renderer.domElement );

				//

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render );
				controls.screenSpacePanning = true;

				//

				window.addEventListener( 'resize', onWindowResize );

				guiData = {
					currentURL: 'models/svg/tiger.svg',
					drawFillShapes: true,
					drawStrokes: true,
					fillShapesWireframe: false,
					strokesWireframe: false
				};

				loadSVG( guiData.currentURL );

				createGUI();

			}

			function createGUI() {

				if ( gui ) gui.destroy();

				gui = new GUI();

				gui.add( guiData, 'currentURL', {

					'Tiger': 'models/svg/tiger.svg',
					'Three.js': 'models/svg/threejs.svg',
					'Joins and caps': 'models/svg/lineJoinsAndCaps.svg',
					'Hexagon': 'models/svg/hexagon.svg',
					'Energy': 'models/svg/energy.svg',
					'Test 1': 'models/svg/tests/1.svg',
					'Test 2': 'models/svg/tests/2.svg',
					'Test 3': 'models/svg/tests/3.svg',
					'Test 4': 'models/svg/tests/4.svg',
					'Test 5': 'models/svg/tests/5.svg',
					'Test 6': 'models/svg/tests/6.svg',
					'Test 7': 'models/svg/tests/7.svg',
					'Test 8': 'models/svg/tests/8.svg',
					'Test 9': 'models/svg/tests/9.svg',
					'Units': 'models/svg/tests/units.svg',
					'Ordering': 'models/svg/tests/ordering.svg',
					'Defs': 'models/svg/tests/testDefs/Svg-defs.svg',
					'Defs2': 'models/svg/tests/testDefs/Svg-defs2.svg',
					'Defs3': 'models/svg/tests/testDefs/Wave-defs.svg',
					'Defs4': 'models/svg/tests/testDefs/defs4.svg',
					'Defs5': 'models/svg/tests/testDefs/defs5.svg',
					'Style CSS inside defs': 'models/svg/style-css-inside-defs.svg',
					'Multiple CSS classes': 'models/svg/multiple-css-classes.svg',
					'Zero Radius': 'models/svg/zero-radius.svg',
					'Styles in svg tag': 'models/svg/tests/styles.svg',
					'Round join': 'models/svg/tests/roundJoinPrecisionIssue.svg'


				} ).name( 'SVG File' ).onChange( update );

				gui.add( guiData, 'drawStrokes' ).name( 'Draw strokes' ).onChange( update );

				gui.add( guiData, 'drawFillShapes' ).name( 'Draw fill shapes' ).onChange( update );

				gui.add( guiData, 'strokesWireframe' ).name( 'Wireframe strokes' ).onChange( update );

				gui.add( guiData, 'fillShapesWireframe' ).name( 'Wireframe fill shapes' ).onChange( update );

				function update() {

					loadSVG( guiData.currentURL );

				}

			}

			function loadSVG( url ) {

				//

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xb0b0b0 );

				//

				const helper = new THREE.GridHelper( 160, 10 );
				helper.rotation.x = Math.PI / 2;
				scene.add( helper );

				//

				const loader = new SVGLoader();

				loader.load( url, function ( data ) {

					const paths = data.paths;

					const group = new THREE.Group();
					group.scale.multiplyScalar( 0.25 );
					group.position.x = - 70;
					group.position.y = 70;
					group.scale.y *= - 1;

					for ( let i = 0; i < paths.length; i ++ ) {

						const path = paths[ i ];

                        const fillColor = path.userData.style.fill;
						if ( guiData.drawFillShapes && fillColor !== undefined && fillColor !== 'none' ) {

							const material = new THREE.MeshBasicMaterial( {
								color: new THREE.Color().setStyle( fillColor ).convertSRGBToLinear(),
								opacity: path.userData.style.fillOpacity,
								transparent: true,
								side: THREE.DoubleSide,
								depthWrite: false,
								wireframe: guiData.fillShapesWireframe
							} );

							const shapes = SVGLoader.createShapes( path );

							for ( let j = 0; j < shapes.length; j ++ ) {

								const shape = shapes[ j ];

								const geometry = new THREE.ShapeGeometry( shape );
								const mesh = new THREE.Mesh( geometry, material );

								group.add( mesh );

							}

						}

						const strokeColor = path.userData.style.stroke;

						if ( guiData.drawStrokes && strokeColor !== undefined && strokeColor !== 'none' ) {

							const material = new THREE.MeshBasicMaterial( {
								color: new THREE.Color().setStyle( strokeColor ).convertSRGBToLinear(),
								opacity: path.userData.style.strokeOpacity,
								transparent: true,
								side: THREE.DoubleSide,
								depthWrite: false,
								wireframe: guiData.strokesWireframe
							} );

							for ( let j = 0, jl = path.subPaths.length; j < jl; j ++ ) {

								const subPath = path.subPaths[ j ];

								const geometry = SVGLoader.pointsToStroke( subPath.getPoints(), path.userData.style );

								if ( geometry ) {

									const mesh = new THREE.Mesh( geometry, material );

									group.add( mesh );

								}

							}

						}

					}

					scene.add( group );

					render();

				} );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function render() {

				renderer.render( scene, camera );

			}

    }
})