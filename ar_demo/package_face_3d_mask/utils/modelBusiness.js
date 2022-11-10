import {
  GLTFLoader
} from '../../three/jsm/loaders/GLTFLoader.js';
import {
  RGBELoader
} from '../../three/jsm/loaders/RGBELoader.js';
import * as THREE from 'three-weixin';
import {
  requestAnimationFrame,
  cancelAnimationFrame,
  window
} from 'dhtml-weixin'
export default class modelBusiness {
  constructor() {
    this.dict = {}
  }
  initThree(canvas, callback) {
    this.canvas = canvas

    var init =()=>{
            this.scene = new THREE.Scene();
      ///////////////////
      this.camera = new THREE.OrthographicCamera(-0.5, 0.5,
        0.5, -0.5, -1000, 1000);
      this.camera.position.set(0, 0, 900);
      this.camera.lookAt(this.scene.position)
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.canvas.width / window.devicePixelRatio, this.canvas.height / window.devicePixelRatio);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      ////////////////////////////////////////////////////////////////
      var rgbeLoader = new RGBELoader()
      rgbeLoader.load('sky_box.hdr', hdr => {
        hdr.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.environment = hdr
        callback()
      }, undefined, function (e) {
        console.error(e);
      });
    }
    
    init();
  }

  changeGlass(url, callback) {
    if (this.mainModel) {
      this.mainModel.traverse((obj) => {
        if (obj.type === "Mesh") {
          obj.material.visible = false
        }
      })
    }
    if (this.head1) {
      this.head1.traverse(function (obj) {
        if (obj.type === 'Mesh') {
          obj.renderOrder = 0
          obj.material.colorWrite = false; // 重点是这段代码
          obj.material.side = THREE.DoubleSide; // 是否双面渲染看具体需求，加不加问题不大
        }
      })
    }
    this.mainModel = null
    this.loadGlass(url, callback)
  }

  loadGlass_done(glass) {
    this.mainModel = glass
    glass.traverse(function (obj) {
      if (obj.type === 'Mesh') {
        obj.renderOrder = 1;
      }
    })
  }

  loadGlass(url, callback) {
    const temp = this.dict[url]
    if (temp) {
      temp.traverse((obj) => {
        if (obj.type === "Mesh") {
          obj.material.visible = true
        }
      })
      this.loadGlass_done(temp);
      callback()
      return
    }
    const loader = new GLTFLoader();
    wx.showLoading({
      title: '加载眼镜..',
    })
    this.done = false
    loader.load(url,  (gltf) =>{
      wx.hideLoading()

      const glass = gltf.scene
      this.dict[url] = glass
      console.error(url)
      this.scene.add(glass);
      this.loadGlass_done(glass);
      this.animate()
      callback()
      this.done = true
    });
  }

  calcTriangle(prediction) {
    const pitch = -prediction.angle.pitch
    const yaw = -prediction.angle.yaw + 0.1
    const roll = -prediction.angle.roll
    const rotation = {
      x: pitch,
      y: yaw * 1.5,
      z: roll - yaw / 10
    };

    //var this.head1 = (prediction.points[32].x - prediction.points[0].x)* 
    var size = prediction.size.width * 5.6
    //var eyes =  (prediction.points[61].x - prediction.points[42].x)
    var scale = size
    // position

    const center = {
      //  x: ((prediction.points[104].x+prediction.points[105].x )/2- 0.5),
      x: (prediction.points[43].x - 0.5),
      y: -(prediction.points[43].y - 0.5) * this.k,
      z: 0
    }


    return {
      position: center,
      rotation: rotation,
      scale: scale,
    };
  }

  setModel(prediction,
    _canvasWidth,
    _canvasHeight, k_) {
    this.k = k_
    //if (_canvasWidth !== canvasWidth) {
    //canvasWidth = _canvasWidth;
    //   setSize();
    //}

    if (!this.mainModel) {
      return;
    }
    if (!this.head1) {
      /*
      this.scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 0.001, 0.001), new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide
      })));
      this.scene.add(new THREE.Mesh(new THREE.BoxGeometry(0.001, 1, 0.001), new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide
      })));
      this.scene.add(new THREE.Mesh(new THREE.BoxGeometry(0.001, 0.001, 1), new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide
      })));*/
      /////////////////////////////////////
      var material1 = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide
      });
      var geometry1 = new THREE.BoxGeometry(0.13, 0.5, 0.45); //new THREE.BoxGeometry(size,size,0.001);
      this.head1 = new THREE.Mesh(geometry1, material1);
      this.head1.position.set(0, 0, -0.25)
      this.scene.add(this.head1);
      this.head1.traverse(function (obj) {
        if (obj.type === 'Mesh') {
          obj.renderOrder = 0
          obj.material.colorWrite = false; // 重点是这段代码
          obj.material.side = THREE.DoubleSide; // 是否双面渲染看具体需求，加不加问题不大
        }
      })
      /*
      var material2 = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide
      });
      var geometry2 = new THREE.BoxGeometry(0.1, 0.2, 0.45); //new THREE.BoxGeometry(size,size,0.001);
      var head2 = new THREE.Mesh(geometry2, material2);
      head2.position.set(0.115, 0.115, -0.25)
      //this.scene.add(head2);
      head2.traverse(function (obj) {
        if (obj.type === 'Mesh') {
          obj.renderOrder = 0
         // obj.material.colorWrite = false; // 重点是这段代码
          obj.material.side = THREE.DoubleSide; // 是否双面渲染看具体需求，加不加问题不大
        }
      })
      var head3 = new THREE.Mesh(geometry2, material2);
      head3.position.set(-0.115, 0.115, -0.25)
      //this.scene.add(head3);
      head3.traverse(function (obj) {
        if (obj.type === 'Mesh') {
          obj.renderOrder = 0
       //   obj.material.colorWrite = false; // 重点是这段代码
          obj.material.side = THREE.DoubleSide; // 是否双面渲染看具体需求，加不加问题不大
        }
      })*/
      ////////////////////
    }
    const result = this.calcTriangle(prediction);
    this.scene.position.copy(result.position);
    this.scene.scale.setScalar(result.scale);
    this.scene.rotation.set(result.rotation.x, result.rotation.y, result.rotation.z);
  }



  animate() {
    var func=()=>{
      this.requestId = requestAnimationFrame(func);
      this.renderer.render(this.scene, this.camera);
    }
    func()
  }

  stopAnimate() {
    if (this.canvas && this.requestId) {
      this.canvas.cancelAnimationFrame(this.requestId);
    }
  }

  dispose() {
    cancelAnimationFrame()
    if (!this.renderer) {
      return
    }
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    this.renderer.context = null
    this.renderer.domElement = null
    this.renderer = null
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.canvas = null;
    this.mainModel = null;
    this.dict = {}
    this.requestId = null;
  }

  change(visible) {
    if (!this.done) {
      return
    }
    this.scene.visible = visible
  }
}