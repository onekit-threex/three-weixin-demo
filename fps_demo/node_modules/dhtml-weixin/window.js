/* eslint-disable no-undef */
/* eslint-disable getter-return */

import HTMLElement from './HTMLElement'
import URL from './URL'
import Performance from './Performance'
import Location from './Location'
import requestAnimationFrame from './requestAnimationFrame'
import cancelAnimationFrame from './cancelAnimationFrame'
import createImageBitmap from './createImageBitmap'
import Image from "./Image";
import HTMLImageElement from "./HTMLImageElement";
import HTMLCanvasElement from "./HTMLCanvasElement"
import ImageBitmap from "./ImageBitmap"
import Worker from './Worker'
import btoa from "./btoa"
import AudioContext from "./AudioContext"
import ImageData from "./ImageData"
import Event from "./Event"
import TextDecoder from "./TextDecoder"
// ///////////////////////////////////////////////

export default class Window extends HTMLElement {
    get TextDecoder(){
        return TextDecoder
    }
  get Image () {
    return Image
  }
  get Event () {
    return Event
  }
  get ImageData () {
    return ImageData
  }
  get btoa () {
    return btoa
  }
  get Int8Array () {
    return Int8Array
  }

  get Uint8Array () {
    return Uint8Array
  }

  get Uint8ClampedArray () {
    return Uint8ClampedArray
  }

  get Int16Array () {
    return Int16Array
  }

  get Uint16Array () {
    return Uint16Array
  }

  get Int32Array () {
    return Int32Array
  }

  get Uint32Array () {
    return Uint32Array
  }

  get Float32Array () {
    return Float32Array
  }

  get Float64Array () {
    return Float64Array
  }

  get BigInt64Array () {
    return BigInt64Array
  }

  get BigUint64Array () {
    return BigUint64Array
  }
  // /////////////////

  _getSystemInfoSync () {
    if (!this.onekit_systemInfo) {
      this.onekit_systemInfo = wx.getSystemInfoSync()
    }
  }

  constructor() {
    super()
    this.URL = URL
    this.AudioContext = AudioContext
    this.performance = new Performance()

    this.setTimeout = setTimeout
    this.clearTimeout = clearTimeout
    this.setInterval = setInterval
    this.clearInterval = clearInterval
  }
  get HTMLImageElement () {
    return HTMLImageElement
  }
  get HTMLCanvasElement () {
    return HTMLCanvasElement
  }
  get ImageBitmap () {
    return ImageBitmap
  }
  get devicePixelRatio () {
    this._getSystemInfoSync()
    return this.onekit_systemInfo.pixelRatio
  }

  get innerWidth () {
    this._getSystemInfoSync()
    return this.onekit_systemInfo.windowWidth
  }

  get innerHeight () {
    this._getSystemInfoSync()
    return this.onekit_systemInfo.windowHeight
  }

  get Math () {
    return this.Math
  }

  get location () {
    return new Location()
  }

  get requestAnimationFrame () {
    return requestAnimationFrame
  }

  get cancelAnimationFrame () {
    return cancelAnimationFrame
  }

  get createImageBitmap () {
    return createImageBitmap
  }

  get localStorage () {
    return localStorage
  }

  postMessage (json) {
    return Worker.self_postMessage(json)
  }
  onmessage (msg) {
    return Worker.self_onmessage(msg)
  }
}
