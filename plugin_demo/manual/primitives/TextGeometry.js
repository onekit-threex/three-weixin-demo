import {
    document,
    window,
    Event0,
    requestAnimationFrame,
    cancelAnimationFrame
} from 'dhtml-weixin';
import * as THREE from '../../three/Three.js';
import {
    FontLoader
} from '../jsm/loaders/FontLoader.js';
import {
    TextGeometry
} from '../jsm/geometries/TextGeometry.js';
import {
    OrbitControls
} from '../jsm/controls/OrbitControls0.js';
var requestId
Page({
    setting: {
        color: "#00ff00",
        size: 3, // ui: size
        height: 0.2, // ui: height
        curveSegments: 12, // ui: curveSegments
        bevelEnabled: true, // ui: bevelEnabled
        bevelThickness: 0.15, // ui: bevelThickness
        bevelSize: 0.3, // ui: bevelSize
        bevelSegments: 5, // ui: bevelSegments
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
        const geometry = new TextGeometry("Hello,ThreeX", {
            font: this.font,
            size: this.setting.size, // ui: size
            height: this.setting.height, // ui: height
            curveSegments: this.setting.curveSegments, // ui: curveSegments
            bevelEnabled: this.setting.bevelEnabled, // ui: bevelEnabled
            bevelThickness: this.setting.bevelThickness, // ui: bevelThickness
            bevelSize: this.setting.bevelSize, // ui: bevelSize
            bevelSegments: this.setting.bevelSegments, // ui: bevelSegments
        });
        var material = new THREE.MeshLambertMaterial({
            color: this.setting.color,
            side: THREE.DoubleSide
        });
        var mesh = new THREE.Mesh(geometry, material);

        this.scene.add(mesh);
        this.mesh = mesh
    },
    async loadFont() {
        return new Promise((resolve) => {
            const loader = new FontLoader();
            loader.load('fonts/gentilis_regular.typeface.json', (font) => {
                this.font = font
                resolve()
            })
        })
    },
    async run(canvas) {
        await this.loadFont()
        /////////////////////
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
                name: "size",
                size: that.setting.size
            }, 'size', 0.0, 10, 0.01).onChange((value) => {
                that.setting.size = value;
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
                name: "bevelEnabled",
                bevelEnabled: that.setting.bevelEnabled
            }, 'bevelEnabled').onChange((value) => {
                that.setting.bevelEnabled = value;
                that.createMesh();
            });
            folder2.add({
                name: "bevelThickness",
                bevelThickness: that.setting.bevelThickness
            }, 'bevelThickness', 0.0, 10, 0.01).onChange((value) => {
                that.setting.bevelThickness = value;
                that.createMesh();
            });
            folder2.add({
                name: "bevelSize",
                bevelSize: that.setting.bevelSize
            }, 'bevelSize', 0.0, 10, 0.01).onChange((value) => {
                that.setting.bevelSize = value;
                that.createMesh();
            });
            //
            folder3.add({
                name: "curveSegments",
                curveSegments: that.setting.curveSegments
            }, 'curveSegments', 1, 10, 1).onChange((value) => {
                that.setting.curveSegments = value;
                that.createMesh();
            });
            folder3.add({
                name: "bevelSegments",
                bevelSegments: that.setting.bevelSegments
            }, 'bevelSegments', 1, 10, 1).onChange((value) => {
                that.setting.bevelSegments = value;
                that.createMesh();
            });
        }
        createPanel()
    }
})