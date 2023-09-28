// webgl/webgl_loader_gltf_variants.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event0,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { GUI } from './jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from './jsm/controls/OrbitControls0.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { RGBELoader } from './jsm/loaders/RGBELoader.js';
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

        let camera, scene, renderer;
        let gui;

        const state = { variant: 'midnight' };

        init();
        render();

        function init() {

            const container = document.createElement( 'div' );
            document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
            camera.position.set( 2.5, 1.5, 3.0 );

            scene = new THREE.Scene();

            new RGBELoader()
                .setPath( 'textures/equirectangular/' )
                .load( 'quarry_01_1k.hdr', function ( texture ) {

                    texture.mapping = THREE.EquirectangularReflectionMapping;

                    scene.background = texture;
                    scene.environment = texture;

                    render();

                    // model

                    const loader = new GLTFLoader().setPath( 'models/gltf/MaterialsVariantsShoe/glTF/' );
                    loader.load( 'MaterialsVariantsShoe.gltf', function ( gltf ) {

                        gltf.scene.scale.set( 10.0, 10.0, 10.0 );

                        scene.add( gltf.scene );

                        // GUI
                        gui = new GUI();

                        // Details of the KHR_materials_variants extension used here can be found below
                        // https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_variants
                        const parser = gltf.parser;
                        const variantsExtension = gltf.userData.gltfExtensions[ 'KHR_materials_variants' ];
                        const variants = variantsExtension.variants.map( ( variant ) => variant.name );
                        const variantsCtrl = gui.add( state, 'variant', variants ).name( 'Variant' );

                        selectVariant( scene, parser, variantsExtension, state.variant );

                        variantsCtrl.onChange( ( value ) => selectVariant( scene, parser, variantsExtension, value ) );

                        render();

                    } );

                } );

            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1;
            renderer.outputEncoding = THREE.sRGBEncoding;
            container.appendChild( renderer.domElement );

            const controls = new OrbitControls( camera, renderer.domElement );
            controls.addEventListener( 'change', render ); // use if there is no animation loop
            controls.minDistance = 2;
            controls.maxDistance = 10;
            controls.target.set( 0, 0.5, - 0.2 );
            controls.update();

            window.addEventListener( 'resize', onWindowResize );

        }

        function selectVariant( scene, parser, extension, variantName ) {

            const variantIndex = extension.variants.findIndex( ( v ) => v.name.includes( variantName ) );

            scene.traverse( async ( object ) => {

                if ( ! object.isMesh || ! object.userData.gltfExtensions ) return;

                const meshVariantDef = object.userData.gltfExtensions[ 'KHR_materials_variants' ];

                if ( ! meshVariantDef ) return;

                if ( ! object.userData.originalMaterial ) {

                    object.userData.originalMaterial = object.material;

                }

                const mapping = meshVariantDef.mappings
                    .find( ( mapping ) => mapping.variants.includes( variantIndex ) );

                if ( mapping ) {

                    object.material = await parser.getDependency( 'material', mapping.material );
                    parser.assignFinalMaterial( object );

                } else {

                    object.material = object.userData.originalMaterial;

                }

                render();

            } );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

            render();

        }

        //

        function render() {

            renderer.render( scene, camera );

        }
    }
})