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
        color: "#00ff00",
        segments: 24,
        radius: 1,
        thetaStart: 0,
        thetaLength: Math.PI * 2
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
            color: this.setting.color,
            side: THREE.DoubleSide
        });
        var mesh = new THREE.Mesh(new THREE.CircleGeometry(
            this.setting.radius,
            this.setting.segments,
            this.setting.thetaStart,
            this.setting.thetaLength,
        ), material);

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
            const folder3 = panel.addFolder('细节');
            const folder4 = panel.addFolder('高级');
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
                name: "radius",
                radius: that.setting.radius
            }, 'radius', 0.0, 10, 0.01).onChange((value) => {
                that.setting.radius = value;
                that.createMesh();
            });
            //
            folder3.add({
                name: "thetaStart",
                thetaStart: that.setting.thetaStart
            }, 'thetaStart', 0.0, Math.PI * 2, 0.01).onChange((value) => {
                that.setting.thetaStart = value;
                that.createMesh();
            });
            folder3.add({
                name: "thetaLength",
                thetaLength: that.setting.thetaLength
            }, 'thetaLength', 0.0, Math.PI * 2, 0.01).onChange((value) => {
                that.setting.thetaLength = value;
                that.createMesh();
            });
            //
            folder4.add({
                name: "segments",
                segments: that.setting.segments
            }, 'segments', 1, 24, 1).onChange((value) => {
                that.setting.segments = value;
                that.createMesh();
            });
        }
        createPanel()
    }
})