import {
    document,
    window,
    Event0,
    requestAnimationFrame,
    cancelAnimationFrame
} from 'dhtml-weixin';
import * as THREE from '../../three/Three.js';

import {
    OrbitControls
} from '../jsm/controls/OrbitControls0.js';
var requestId
Page({
    setting: {
        color: "#00ff00",
        width: 1,
        height: 1,
        depth: 1,
        widthSegments:2,
        heightSegments :2,
        depthSegments :2,
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
        const web_e = Event0.fix(e)
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
            color: this.setting.color
        });
        var mesh = new THREE.Mesh(new THREE.WireframeGeometry(new THREE.BoxGeometry(
            this.setting.width,
            this.setting.height,
            this.setting.depth,
            this.setting.widthSegments,
            this.setting.heightSegments,
            this.setting.depthSegments,
            )), material);

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
            const folder1 = panel.addFolder('颜色');
            const folder2 = panel.addFolder('尺寸');
            const folder3 = panel.addFolder('优化');
            //
            folder1.addColor({
                name: "color",
                color: that.setting.color
            }, 'color').onChange(color => {
                that.setting.color = color;
                that.createMesh();
            })
            //
            folder2.add({
                name: "width",
                width: that.setting.width
            }, 'width', 0.0, 10, 0.01).onChange((value) => {
                that.setting.width = value;
                that.createMesh();
            });
            folder2.add({
                name: "height",
                height: that.setting.height
            }, 'height', 0.0, 10, 0.01).onChange((value) => {
                that.setting.height = value;
                that.createMesh();
            });
            folder2.add({
                name: "depth",
                depth: that.setting.depth
            }, 'depth', 0.0, 10, 0.01).onChange((value) => {
                that.setting.depth = value;
                that.createMesh();
            });
             //
             folder3.add({
                name: "widthSegments",
                widthSegments: that.setting.widthSegments
            }, 'widthSegments', 1, 10, 1).onChange((value) => {
                that.setting.widthSegments = value;
                that.createMesh();
            });
            folder3.add({
                name: "heightSegments",
                heightSegments: that.setting.heightSegments
            }, 'heightSegments', 1, 10, 1).onChange((value) => {
                that.setting.heightSegments = value;
                that.createMesh();
            });
            folder3.add({
                name: "depthSegments",
                depthSegments: that.setting.depthSegments
            }, 'depthSegments', 1, 10, 1).onChange((value) => {
                that.setting.depthSegments = value;
                that.createMesh();
            });
        }
        createPanel()
    }
})