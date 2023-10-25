class Gain {
    constructor(mini_gain) {
        this.mini_gain = mini_gain
    }
    connect() {

    }
}
class BufferSource {
    constructor(mini_source) {
        this.mini_source = mini_source
    }
    get playbackRate(){
        return this.mini_source.playbackRate
    }
    set buffer(buffer){
        this.mini_source.buffer = buffer
    }
    set loop(loop){
        this.mini_source.loop = loop
    }
    set loopStart(loopStart){
        this.mini_source.loopStart = loopStart
    }
    set loopEnd(loopEnd){
        this.mini_source.loopEnd = loopEnd
    }
    set onended(onended){
        this.mini_source.onended = onended
    }
    start(when, offset, duration){
        this.mini_source.start(  when, offset, duration)
    }
    stop(){
        this.mini_source.stop( )
    }
    connect(data){
        this.mini_source.connect( data)
    }
}
class Panner {
    constructor(mini_panner) {
        this.mini_panner = mini_panner
    }
    set panningModel(panningModel) {
        this.mini_panner.panningModel = panningModel
    }
    connect(gain) {
      //  this.mini_panner.connct(gain.mini_gain)
    }
}
export default class AudioContext {
    constructor() {
        this.mini_context = wx.createWebAudioContext()
    }
    createBufferSource() {
        return new BufferSource(this.mini_context.createBufferSource())
    }
    createPanner() {
        return new Panner(this.mini_context.createPanner())
    }
    get currentTime() {
        return this.mini_context.currentTime
    }
    get destination() {
        return this.mini_context.destination
    }
    createGain() {
        return new Gain(this.mini_context.createGain())
    }
    createMediaElementSource(mediaElement) {

    }
    createMediaStreamSource(mediaStream) {

    }
    decodeAudioData(arrayBuffer, successCallback, errorCallback) {
        this.mini_context.decodeAudioData(arrayBuffer, buffer => {
            successCallback(buffer)
        }, err => {
            errorCallback(err)
        })
    }
}