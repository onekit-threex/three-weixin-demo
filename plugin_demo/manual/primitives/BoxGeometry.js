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
    setting: {
        width: 1,
        height: 1,
        depth: 1,
        color:"#00ff00"
    },
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
    createMesh() {
        if (this.mesh) {
            this.scene.remove(this.mesh)
        }
        var material = new THREE.MeshLambertMaterial({
            color:this.setting.color
        });
        var mesh = new THREE.Mesh(new THREE.BoxGeometry(
            this.setting.width, 
            this.setting.height, 
            this.setting.depth), material);

        this.scene.add(mesh);
        this.mesh = mesh
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

        var scene = this.scene = new THREE.Scene()
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
        that.createMesh()

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
            const folder3 = panel.addFolder('高级');
            //
            folder1.add({
                name: "width",
                width: 1
            }, 'width', 0.0, 10, 0.01).onChange((value) => {
                that.setting.width = value;
                that.createMesh();
            });
            folder1.add({
                name: "height",
                height: 1
            }, 'height', 0.0, 10, 0.01).onChange((value) => {
                that.setting.height = value;
                that.createMesh();
            });
            folder1.add({
                name: "depth",
                depth: 1
            }, 'depth', 0.0, 10, 0.01).onChange((value) => {
                that.setting.depth = value;
                that.createMesh();
            });
            //
            folder2.addColor({
                name: "color",
                color: "#0f0"
            }, 'color').onChange(color => {
                that.setting.color = color;
                that.createMesh();
            })
            //
        }
        createPanel()
    }
})