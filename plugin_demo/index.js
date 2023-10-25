import files from './files.json'
var timer
Page({
  onAddToFavorites() {
    return {
    }
  },
  onShareTimeline(){
    return {
      title: '快来体验ThreeX的3D世界吧!'
    }
  },
  onShareAppMessage(){
    return getApp().onShare()
  },
  onLoad() {
    const sections = []
    const platform = wx.getSystemInfoSync().platform
    for (const sectionName of Object.keys(files)) {
      /*if (sectionName.startsWith("physics_")) {

        const type = platform != "android" ? "js" : "wasm"
        if (platform != "devtools" && !sectionName.endsWith("_" + type)) {
          continue
        }
      }*/
      sections.push({
        sectionName,
        demos: files[sectionName]
      })
    }
    const onekit_path = getApp().onekit_path
    this.setData({
      onekit_path,
      sections
    })
  },
  demo_tap(e) {
    const {
      sub,
      demo
    } = e.target.dataset
    wx.navigateTo({
      url: `${sub}/${demo}`,
    })
  },
  onHide() {
    clearInterval(timer)
  }
})