import {
    document,
    window,
    Event,
    requestAnimationFrame,
    cancelAnimationFrame
} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import Stats from './jsm/libs/stats.module.js';
import {
    GUI
} from './jsm/libs/lil-gui.module.min.js';
import {
    OrbitControls
} from './jsm/controls/OrbitControls.js';
import {
    GLTFLoader
} from './jsm/loaders/GLTFLoader.js';

var requestId
Page({
   onUnload(){
    cancelAnimationFrame(requestId, this.canvas)
this.worker && this.worker.terminate()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    this.renderer.context = null
    this.renderer.domElement = null
    this.renderer = null
   },
       webgl_touch(e) {
        const web_e = Event.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
async onLoad() {
        const canvas3d = this.canvas =await document.createElementAsync("canvas", "webgl")
        var that = this
        let scene, camera, stats,renderer;
        let model, skeleton, mixer, clock;

        const crossFadeControls = [];

        let currentBaseAction = 'idle';
        const allActions = [];
        const baseActions = {
            idle: { weight: 1 },
            walk: { weight: 0 },
            run: { weight: 0 }
        };
        const additiveActions = {
            sneak_pose: { weight: 0 },
            sad_pose: { weight: 0 },
            agree: { weight: 0 },
            headShake: { weight: 0 }
        };
        let panelSettings, numAnimations;

        init();

        function init() {

            const container = document.getElementById( 'container' );
            clock = new THREE.Clock();

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xa0a0a0 );
            scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

            const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
            hemiLight.position.set( 0, 20, 0 );
            scene.add( hemiLight );

            const dirLight = new THREE.DirectionalLight( 0xffffff );
            dirLight.position.set( 3, 10, 10 );
            dirLight.castShadow = true;
            dirLight.shadow.camera.top = 2;
            dirLight.shadow.camera.bottom = - 2;
            dirLight.shadow.camera.left = - 2;
            dirLight.shadow.camera.right = 2;
            dirLight.shadow.camera.near = 0.1;
            dirLight.shadow.camera.far = 40;
            scene.add( dirLight );

            // ground

            const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
            mesh.rotation.x = - Math.PI / 2;
            mesh.receiveShadow = true;
            scene.add( mesh );

            const loader = new GLTFLoader();
            loader.load( 'models/gltf/Xbot.glb', function ( gltf ) {

                model = gltf.scene;
                scene.add( model );

                model.traverse( function ( object ) {

                    if ( object.isMesh ) object.castShadow = true;

                } );

                skeleton = new THREE.SkeletonHelper( model );
                skeleton.visible = false;
                scene.add( skeleton );

                const animations = gltf.animations;
                mixer = new THREE.AnimationMixer( model );

                numAnimations = animations.length;

                for ( let i = 0; i !== numAnimations; ++ i ) {

                    let clip = animations[ i ];
                    const name = clip.name;

                    if ( baseActions[ name ] ) {

                        const action = mixer.clipAction( clip );
                        activateAction( action );
                        baseActions[ name ].action = action;
                        allActions.push( action );

                    } else if ( additiveActions[ name ] ) {

                        // Make the clip additive and remove the reference frame

                        THREE.AnimationUtils.makeClipAdditive( clip );

                        if ( clip.name.endsWith( '_pose' ) ) {

                            clip = THREE.AnimationUtils.subclip( clip, clip.name, 2, 3, 30 );

                        }

                        const action = mixer.clipAction( clip );
                        activateAction( action );
                        additiveActions[ name ].action = action;
                        allActions.push( action );

                    }

                }

                createPanel();

                animate();

            } );

          renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
          that.renderer = renderer
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.shadowMap.enabled = true;
            container.appendChild( renderer.domElement );

            // camera
            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100 );
            camera.position.set( - 1, 2, 3 );
            const controls = new OrbitControls( camera, renderer.domElement );
            controls.enablePan = false;
            controls.enableZoom = true;
            controls.target.set( 0, 1, 0 );
            controls.update();

            stats = new Stats();
            container.appendChild( stats.dom );

            window.addEventListener( 'resize', onWindowResize );

        }

        function createPanel() {

            const panel = new GUI( { width: 310 } );

            const folder1 = panel.addFolder( 'Base Actions' );
            const folder2 = panel.addFolder( 'Additive Action Weights' );
            const folder3 = panel.addFolder( 'General Speed' );

            panelSettings = {
                'modify time scale': 1.0
            };

            const baseNames = [ 'None', ...Object.keys( baseActions ) ];

            for ( let i = 0, l = baseNames.length; i !== l; ++ i ) {

                const name = baseNames[ i ];
                const settings = baseActions[ name ];
                panelSettings[ name ] = function () {

                    const currentSettings = baseActions[ currentBaseAction ];
                    const currentAction = currentSettings ? currentSettings.action : null;
                    const action = settings ? settings.action : null;

                    if ( currentAction !== action ) {
        
                        prepareCrossFade( currentAction, action, 0.35 );
        
                    }

                };

                crossFadeControls.push( folder1.add( panelSettings, name ) );

            }

            for ( const name of Object.keys( additiveActions ) ) {

                const settings = additiveActions[ name ];

                panelSettings[ name ] = settings.weight;
                folder2.add( panelSettings, name, 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {

                    setWeight( settings.action, weight );
                    settings.weight = weight;

                } );

            }

            folder3.add( panelSettings, 'modify time scale', 0.0, 1.5, 0.01 ).onChange( modifyTimeScale );

            folder1.open();
            folder2.open();
            folder3.open();

            crossFadeControls.forEach( function ( control ) {

                control.setInactive = function () {

                    control.domElement.classList.add( 'control-inactive' );

                };

                control.setActive = function () {

                    control.domElement.classList.remove( 'control-inactive' );

                };

                const settings = baseActions[ control.property ];

                if ( ! settings || ! settings.weight ) {

                    control.setInactive();

                }

            } );

        }

        function activateAction( action ) {

            const clip = action.getClip();
            const settings = baseActions[ clip.name ] || additiveActions[ clip.name ];
            setWeight( action, settings.weight );
            action.play();

        }

        function modifyTimeScale( speed ) {

            mixer.timeScale = speed;

        }

        function prepareCrossFade( startAction, endAction, duration ) {

            // If the current action is 'idle', execute the crossfade immediately;
            // else wait until the current action has finished its current loop

            if ( currentBaseAction === 'idle' || ! startAction || ! endAction ) {

                executeCrossFade( startAction, endAction, duration );

            } else {

                synchronizeCrossFade( startAction, endAction, duration );

            }

            // Update control colors

            if ( endAction ) {

                const clip = endAction.getClip();
                currentBaseAction = clip.name;

            } else {

                currentBaseAction = 'None';

            }

            crossFadeControls.forEach( function ( control ) {

                const name = control.property;

                if ( name === currentBaseAction ) {

                    control.setActive();

                } else {

                    control.setInactive();

                }

            } );

        }

        function synchronizeCrossFade( startAction, endAction, duration ) {

            mixer.addEventListener( 'loop', onLoopFinished );

            function onLoopFinished( event ) {

                if ( event.action === startAction ) {

                    mixer.removeEventListener( 'loop', onLoopFinished );

                    executeCrossFade( startAction, endAction, duration );

                }

            }

        }

        function executeCrossFade( startAction, endAction, duration ) {

            // Not only the start action, but also the end action must get a weight of 1 before fading
            // (concerning the start action this is already guaranteed in this place)

            if ( endAction ) {

                setWeight( endAction, 1 );
                endAction.time = 0;

                if ( startAction ) {

                    // Crossfade with warping

                    startAction.crossFadeTo( endAction, duration, true );

                } else {

                    // Fade in

                    endAction.fadeIn( duration );

                }

            } else {

                // Fade out

                startAction.fadeOut( duration );

            }

        }

        // This function is needed, since animationAction.crossFadeTo() disables its start action and sets
        // the start action's timeScale to ((start animation's duration) / (end animation's duration))

        function setWeight( action, weight ) {

            action.enabled = true;
            action.setEffectiveTimeScale( 1 );
            action.setEffectiveWeight( weight );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function animate() {
            // Render loop

            requestId = requestAnimationFrame(animate);

            for ( let i = 0; i !== numAnimations; ++ i ) {

                const action = allActions[ i ];
                const clip = action.getClip();
                const settings = baseActions[ clip.name ] || additiveActions[ clip.name ];
                settings.weight = action.getEffectiveWeight();

            }

            // Get the time elapsed since the last frame, used for mixer update

            const mixerUpdateDelta = clock.getDelta();

            // Update the animation mixer, the stats panel, and render this frame

            mixer.update( mixerUpdateDelta );

            stats.update();

            renderer.render( scene, camera );

        }
        
    }
})