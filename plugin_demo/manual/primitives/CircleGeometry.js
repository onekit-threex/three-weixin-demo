import {
    document,
    window,
    Event,
    requestAnimationFrame,
    cancelAnimationFrame
} from 'dhtml-weixin';
import * as THREE from '../../three/Three.js';

import {
    OrbitControls
} from '../jsm/controls/OrbitControls.js';
var requestId
Page({
    onUnload() {
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
    onLoad() {
        document.createElementAsync("canvas", "webgl").then(canvas => this.run(canvas).then())
    },
    async run(canvas) {
        var that = this
        this.canvas = canvas
        var renderer = this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputEncoding = THREE.sRGBEncoding;

        var scene = new THREE.Scene()
        scene.background = "#888888"
        var camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            100
        );
        camera.position.set(10, 5, 10);
        camera.lookAt(scene.position);
        //
        const controls = new OrbitControls(
            camera,
            renderer.domElement
        );
        controls.enablePan = true;
        controls.enableZoom = true;
        controls.update();
        /////////////////////////////////////////
        const light0 = new THREE.AmbientLight(0xFFFFFF, 0.5);
        scene.add(light0);
        //
        const light1 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
        light1.position.set(-5, 10, 5);
        scene.add(light1);
        //////////////////////////////////
        var geometry = new THREE.CircleGeometry(7, 1);
        var material = new THREE.MeshLambertMaterial({
            color: "#00ff00"
        });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        ////////////////////////////////
        function animate() {
            requestAnimationFrame(() => {
                animate()
            })
            renderer.render(scene, camera)
        }
        animate()

        function createPanel() {

            const panel = that.selectComponent("#gui")
            const folder1 = panel.addFolder('尺寸');
            const folder2 = panel.addFolder('颜色');

            folder1.add( {name:"width",width:1}, 'width', 0.0, 10, 0.01 ).onChange( (value)=>{
                mesh.scale.x = value;
            });
            folder1.add( {name:"height",height:1}, 'height', 0.0, 10, 0.01 ).onChange( (value)=>{
                mesh.scale.y = value;
            });
            folder1.add( {name:"depth",depth:1}, 'depth', 0.0, 10, 0.01 ).onChange( (value)=>{
                mesh.scale.z = value;
            });
            folder2.addColor( {name:"color",color:"#0f0"}, 'color').onChange(color=>{
               mesh.material = new THREE.MeshLambertMaterial({
                color
            });
            })
		
        }
        createPanel()
    }
})