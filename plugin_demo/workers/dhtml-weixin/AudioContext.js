class Gain {
    constructor(wx_gain) {
        this.wx_gain = wx_gain
    }
    connect() {

    }
}
class BufferSource {
    constructor(wx_source) {
        this.wx_source = wx_source
    }
    get playbackRate(){
        return this.wx_source.playbackRate
    }
    set buffer(buffer){
        this.wx_source.buffer = buffer
    }
    set loop(loop){
        this.wx_source.loop = loop
    }
    set loopStart(loopStart){
        this.wx_source.loopStart = loopStart
    }
    set loopEnd(loopEnd){
        this.wx_source.loopEnd = loopEnd
    }
    set onended(onended){
        this.wx_source.onended = onended
    }
    start(when, offset, duration){
        this.wx_source.start(  when, offset, duration)
    }
    stop(){
        this.wx_source.stop( )
    }
    connect(data){
        this.wx_source.connect( data)
    }
}
class Panner {
    constructor(wx_panner) {
        this.wx_panner = wx_panner
    }
    set panningModel(panningModel) {
        this.wx_panner.panningModel = panningModel
    }
    connect(gain) {
      //  this.wx_panner.connct(gain.wx_gain)
    }
}
export default class AudioContext {
    constructor() {
        this.wx_context = wx.createWebAudioContext()
    }
    createBufferSource() {
        return new BufferSource(this.wx_context.createBufferSource())
    }
    createPanner() {
        return new Panner(this.wx_context.createPanner())
    }
    get currentTime() {
        return this.wx_context.currentTime
    }
    get destination() {
        return this.wx_context.destination
    }
    createGain() {
        return new Gain(this.wx_context.createGain())
    }
    createMediaElementSource(mediaElement) {

    }
    createMediaStreamSource(mediaStream) {

    }
    decodeAudioData(arrayBuffer, successCallback, errorCallback) {
        this.wx_context.decodeAudioData(arrayBuffer, buffer => {
            successCallback(buffer)
        }, err => {
            errorCallback(err)
        })
    }
}