var session;

function loadModel(init, callback, fail) {
if(!wx.canIUse('isVKSupport') || !wx.isVKSupport("v1")){
  wx.showModal({
    showCancel: false,
    content: '请确定微信为最新版本！',
  })
  init(true)
  return
}
  session = wx.createVKSession({
    track: {
      plane: {
        mode: 1
      },
      face: {
        mode: 2
      }
    },
    version: 'v1'
  })
  session.start(err => {
    if (err) {
      wx.showModal({
        showCancel:false,
        content: '"AR初始化错误！"',
      })
      return console.error('VK error: ', err)
    }
    init();
  })
  session.on('updateAnchors', anchors => {
   // console.log("console.updateAnchors")
    callback(anchors)
  })

  session.on('removeAnchors', () => {
 //   console.log('removeAnchors')
    fail()
  })
}

function detect(frame, width, height) {
  session.detectFace({
    frameBuffer: frame,
    width: width,
    height: height,
    scoreThreshold: 0.5,
    sourceType: 0,
    modelMode: 1,
  })
}

module.exports = {
  loadModel,
  detect
};