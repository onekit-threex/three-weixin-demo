import {
  document
} from "dhtml-weixin"
import {
  Data3DTexture
} from "../../Three"
class VideoDecoder {
  on(eventName, callback) {
    this.timer = setInterval(() => {
      wx.request({
        responseType: "arraybuffer",
        url: 'https://three-x.cn/examples/textures/uv_grid_directx.jpg',
        success: (res) => {
          this._frameData = {
            width: 1024,
            height: 1024,
            data: res.data
          }
          callback()
        }
      })
    }, 1000)
  }
  getFrameData() {
    return this._frameData
  }
  off(eventName) {
    clearInterval(this.timer)
  }
  start() {
    return new Promise(resolve => {
      resolve()
    })
  }
  stop() {

  }
  remove() {

  }
}
var cnv = document.createElement("canvas");
Component({
  properties: {
    src: String
  },
  lifetimes: {
    attached() {
      this.HAVE_NOTHING = 0
      this.HAVE_METADATA = 1
      this.HAVE_CURRENT_DATA = 2
      this.HAVE_FUTURE_DATA = 3
      this.HAVE_ENOUGH_DATA = 4
      this.decoder = wx.createVideoDecoder()
      //this.decoder = new VideoDecoder()
      var isNew = true
      const animate = () => {
        //  if (!isNew) {
        //    return
        //  }
        const frameData = this.decoder.getFrameData()
        if (frameData == null) {
          return
        }
        //  isNew = false
        const {
          data,
          width,
          height
        } = frameData
        const typedArray = new Uint8Array(data)
        this.frameData = {
          width,
          height,
          data: typedArray
        };
        this._requestVideoFrameCallback()

      }
      var timer
      this.decoder.on("ended", async () => {
        this.decoder.seek(0)
      })
      this.decoder.on("stop", async () => {
        clearInterval(timer)
      })
      this.decoder.on("start", async () => {
        this._readyState = this.HAVE_CURRENT_DATA
        animate()
        timer = setInterval(() => {
          animate()
        }, 20)
      })
    },
    detached() {
      this.decoder.stop()
      this.decoder.remove()
      //this.decoder.off("bufferchange")
    }
  },
  methods: {
    get readyState() {
      return this._readyState
    },
    get isHTMLVideoElement() {
      return true
    },
    play() {
      this._readyState = this.HAVE_NOTHING
      this.decoder.start({
        mode: 1,
        abortAudio: true,
        source: this.data.src
      })
    },
    stop() {
      this.decoder.stop()
      this.decoder.remove()
      //this.decoder.off("bufferchange")
    },
    requestVideoFrameCallback(requestVideoFrameCallback) {
      this._requestVideoFrameCallback = requestVideoFrameCallback
    }
  }
})