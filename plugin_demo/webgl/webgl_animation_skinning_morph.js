import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import Stats from './jsm/libs/stats.module.js';
import {
	GUI
} from './jsm/libs/lil-gui.module.min.js';

import {
	GLTFLoader
} from './jsm/loaders/GLTFLoader.js';
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
            var that = this

        let container, stats, clock, gui, mixer, actions, activeAction, previousAction;
			let camera, scene, renderer, model, face;

			const api = { state: 'Walking' };

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 100 );
				camera.position.set( - 5, 3, 10 );
				camera.lookAt( new THREE.Vector3( 0, 2, 0 ) );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xe0e0e0 );
				scene.fog = new THREE.Fog( 0xe0e0e0, 20, 100 );

				clock = new THREE.Clock();

				// lights

				const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
				hemiLight.position.set( 0, 20, 0 );
				scene.add( hemiLight );

				const dirLight = new THREE.DirectionalLight( 0xffffff );
				dirLight.position.set( 0, 20, 10 );
				scene.add( dirLight );

				// ground

				const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
				mesh.rotation.x = - Math.PI / 2;
				scene.add( mesh );

				const grid = new THREE.GridHelper( 200, 40, 0x000000, 0x000000 );
				grid.material.opacity = 0.2;
				grid.material.transparent = true;
				scene.add( grid );

				// model

				const loader = new GLTFLoader();
				loader.load( 'models/gltf/RobotExpressive/RobotExpressive.glb', function ( gltf ) {

					model = gltf.scene;
					scene.add( model );

					createGUI( model, gltf.animations );

				}, undefined, function ( e ) {

					console.error( e );

				} );

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.outputEncoding = THREE.sRGBEncoding;
				container.appendChild( renderer.domElement );

				window.addEventListener( 'resize', onWindowResize );

				// stats
				stats = new Stats();
				container.appendChild( stats.dom );

			}

			function createGUI( model, animations ) {

				const states = [ 'Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing' ];
				const emotes = [ 'Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp' ];

				gui = new GUI();

				mixer = new THREE.AnimationMixer( model );

				actions = {};

				for ( let i = 0; i < animations.length; i ++ ) {

					const clip = animations[ i ];
					const action = mixer.clipAction( clip );
					actions[ clip.name ] = action;

					if ( emotes.indexOf( clip.name ) >= 0 || states.indexOf( clip.name ) >= 4 ) {

						action.clampWhenFinished = true;
						action.loop = THREE.LoopOnce;

					}

				}

				// states

				const statesFolder = gui.addFolder( 'States' );

				const clipCtrl = statesFolder.add( api, 'state' ).options( states );

				clipCtrl.onChange( function () {

					fadeToAction( api.state, 0.5 );

				} );

				statesFolder.open();

				// emotes

				const emoteFolder = gui.addFolder( 'Emotes' );

				function createEmoteCallback( name ) {

					api[ name ] = function () {

						fadeToAction( name, 0.2 );

						mixer.addEventListener( 'finished', restoreState );

					};

					emoteFolder.add( api, name );

				}

				function restoreState() {

					mixer.removeEventListener( 'finished', restoreState );

					fadeToAction( api.state, 0.2 );

				}

				for ( let i = 0; i < emotes.length; i ++ ) {

					createEmoteCallback( emotes[ i ] );

				}

				emoteFolder.open();

				// expressions

				face = model.getObjectByName( 'Head_4' );

				const expressions = Object.keys( face.morphTargetDictionary );
				const expressionFolder = gui.addFolder( 'Expressions' );

				for ( let i = 0; i < expressions.length; i ++ ) {

					expressionFolder.add( face.morphTargetInfluences, i, 0, 1, 0.01 ).name( expressions[ i ] );

				}

				activeAction = actions[ 'Walking' ];
				activeAction.play();

				expressionFolder.open();

			}

			function fadeToAction( name, duration ) {

				previousAction = activeAction;
				activeAction = actions[ name ];

				if ( previousAction !== activeAction ) {

					previousAction.fadeOut( duration );

				}

				activeAction
					.reset()
					.setEffectiveTimeScale( 1 )
					.setEffectiveWeight( 1 )
					.fadeIn( duration )
					.play();

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				const dt = clock.getDelta();

				if ( mixer ) mixer.update( dt );

				requestAnimationFrame(animate);

				renderer.render( scene, camera );

			//	//stats.update();

			}

	}
})
