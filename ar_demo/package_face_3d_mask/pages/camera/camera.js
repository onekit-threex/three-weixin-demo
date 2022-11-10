import {
  document
} from "dhtml-weixin";
import ModelBusiness from '../../utils/modelBusiness.js';

Page({
  selected: 0,
  data: {
    glasses: ["1", "2", "3"],
  },
  wx.showShareImageMenu({
    path: res.tempFilePath
  }),
  error(e) {
    console.error(e)
  },
  onUnload: function () {
    this.ar = false
    this.model.stopAnimate();
    this.face = null
    this.face = null
    setTimeout(() => {
      this.stopTacking();
      this.model.dispose();
    }, 100)
  },
  async onLoad() {
    this.done = true
    this.face = require('../../utils/faceBusiness.js')
    this.model = new ModelBusiness();
    this.canvas = await document.createElementAsync("canvas", "webgl")
    /*    this.canvas2d.requestAnimationFrame(() => {
            this.drawFace()
        })*/
    this.run();
  },
  changeGlass(index) {
    if (!this.done) {
      return
    }
    if(!this.ar){
      return
    }
    this.done = false
    const glass = this.data.glasses[index]
    this.model.changeGlass(`${glass}/glass.glb`, () => {
      this.done = true
    });
    this.setData({
      selected: index
    })
  },
  run() {
    this.face.loadModel((flag) => {
      if (flag) {
        //this.face = require('../../utils/faceBusiness0.js')
        //this.run()
        //  return
      }
      this.ar = true
      this.model.initThree(this.canvas, () => {
        this.changeGlass(0)
        this.startTacking();
      });
    }, (anchors) => {
      if (anchors && anchors.length > 0) {
        this.model.change(true)
        var canvasWidth = this.width;
        var canvasHeight = this.height;
        const anchor = anchors[0]
        this.model.setModel(anchor,
          canvasWidth,
          canvasHeight, this.k);
        //  const angle = anchor.angle
        //   this.setData({angle})
      } else {
        var message = 'No results.';
        wx.showToast({
          title: message,
          icon: 'none'
        });
      }
    }, () => {
      this.model.change(false)
      wx.showToast({
        title: "请正面对准屏幕中央",
        icon: 'none',
        duration: 100
      });
    });
  },
  startTacking() {
    const context = wx.createCameraContext();

    this.listener = context.onCameraFrame((res) => {

      //////////////////////
      this.width = res.width
      this.height = res.height
      this.k = this.height / this.width
      return new this.face.detect(res.data, res.width, res.height);
    });
    this.listener.start();
  },
  stopTacking() {
    if (this.listener) {
      this.listener.stop();
    }
  },
  glass_tap(e) {
    if (!this.ar) {
      return
    }
    const index = e.currentTarget.dataset.index
    this.changeGlass(index)
  },
  back_tap() {
    wx.navigateBack()
  },
  take_tap() {
    wx.showToast({
      title: '拍照功能即将上线'
    })
  },
  screenshot() {
    return new Promise((resolve) => {})
  },
  cart_tap() {
    wx.showToast({
      title: '购物车功能稍后开放'
    })
  }
})