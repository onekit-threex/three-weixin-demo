module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1670917931001, function(require, module, exports) {
var __TEMP__ = require('./Blob');var Blob = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./createImageBitmap');var createImageBitmap = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./CSSStyleDeclaration');var CSSStyleDeclaration = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./document');var Document = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./fetch');var fetch = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Headers');var Headers = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Image');var Image = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./HTMLImageElement');var HTMLImageElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./HTMLCanvasElement');var HTMLCanvasElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./ImageBitmap');var ImageBitmap = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./navigator');var navigator = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Request');var Request = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./requestAnimationFrame');var requestAnimationFrame = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./cancelAnimationFrame');var cancelAnimationFrame = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Response');var Response = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./URL');var URL = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./window');var Window = __REQUIRE_DEFAULT__(__TEMP__);
const WebAssembly = require("./WebAssembly");
var __TEMP__ = require('./Worker');var Worker = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./XMLHttpRequest');var XMLHttpRequest = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Location');var Location = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/xmldom/dom-parser');var DOMParser = __TEMP__['DOMParser'];
var __TEMP__ = require('./core/index');var core = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./EventTarget');var EventTarget = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Element');var Element = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Node');var Node = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Event');var Event = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Event0');var Event0 = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Performance');var Performance = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./btoa');var btoa = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./ImageData');var ImageData = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./AudioContext');var AudioContext = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./TextDecoder');var TextDecoder = __REQUIRE_DEFAULT__(__TEMP__);
const performance = new Performance();
const document = new Document();
const window = new Window();
const self = window;
const location = new Location();
module.exports = {
  Image,
  TextDecoder,
  AudioContext,
  ImageData,
  Blob,
  btoa,
  createImageBitmap,
  CSSStyleDeclaration,
  performance,
  document,
  DOMParser,
  EventTarget,
  Element,
  fetch,
  Headers,
  HTMLCanvasElement,
  HTMLImageElement,
  ImageBitmap,
  location,
  navigator,
  Node,
  Event,
  Event0,
  Request,
  requestAnimationFrame,
  cancelAnimationFrame,
  Response,
  self,
  URL,
  window,
  WebAssembly,
  Worker,
  XMLHttpRequest,
  core,
};

}, function(modId) {var map = {"./Blob":1670917931002,"./createImageBitmap":1670917931003,"./CSSStyleDeclaration":1670917931017,"./document":1670917931018,"./fetch":1670917931035,"./Headers":1670917931037,"./Image":1670917931027,"./HTMLImageElement":1670917931004,"./HTMLCanvasElement":1670917931019,"./ImageBitmap":1670917931028,"./navigator":1670917931038,"./Request":1670917931039,"./requestAnimationFrame":1670917931025,"./cancelAnimationFrame":1670917931026,"./Response":1670917931036,"./URL":1670917931021,"./window":1670917931020,"./WebAssembly":1670917931040,"./Worker":1670917931029,"./XMLHttpRequest":1670917931041,"./Location":1670917931024,"./core/xmldom/dom-parser":1670917931042,"./core/index":1670917931046,"./EventTarget":1670917931013,"./Element":1670917931011,"./Node":1670917931012,"./Event":1670917931015,"./Event0":1670917931048,"./Performance":1670917931023,"./btoa":1670917931006,"./ImageData":1670917931031,"./AudioContext":1670917931030,"./TextDecoder":1670917931032}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931002, function(require, module, exports) {
/* eslint-disable camelcase */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Blob {
  constructor(array, options) {
    this.array = array
    this.options = options
  }
  get size(){
    return this.array[0].length
  }
  arrayBuffer(){
    return this.array[0]
  }
};exports.default = Blob

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931003, function(require, module, exports) {

var __TEMP__ = require('./HTMLImageElement');var HTMLImageElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Base64');var Base64 = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Blob');var Blob = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function createImageBitmap(src, options) {
  return new Promise((resolve, reject) => {
    try {
      const img = new HTMLImageElement( );
      img.onload = function () {
        resolve(img);
      };
      if (src instanceof Blob) {
        src =
          "data:image/png;base64," + Base64.arrayBufferToBase64(src.array[0]);
      }
      img.src = src;
    } catch (e) {
      console.error(e)
      reject(e);
    }
  });
};exports.default = createImageBitmap

}, function(modId) { var map = {"./HTMLImageElement":1670917931004,"./core/Base64":1670917931005,"./Blob":1670917931002}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931004, function(require, module, exports) {
var __TEMP__ = require('./core/Base64');var Base64 = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./HTMLElement');var HTMLElement = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class HTMLImageElement extends HTMLElement {
  constructor(canvas2d) {
    super();
    this.isOffscreen = canvas2d && canvas2d.isOffscreenCanvas
    var canvas = canvas2d
    if (!canvas && Page.current) {
      canvas = Page.current.canvas
    }
    if (!canvas && Page.getApp()) {
      canvas = Page.getApp().canvas
    }
    if (canvas && canvas.mini_element) {
      canvas = canvas.mini_element
    }
    this.image = canvas.createImage();
    this.image.onload = () => {
      if (this.onload) {
        this.onload.call(this);
      }
      if (this._all_event_handlers.load) {
        this._all_event_handlers.load.forEach((handler) => {
          handler.call(this);
        });
      }
    };
    this.image.onerror = (e) => {
      if (this.onerror) {
        this.onerror.call(this, e);
      }
      if (this._all_event_handlers.error) {
        this._all_event_handlers.error.forEach((handler) => {
          handler.call(this, e);
        });
      }
    };
  }
  get width() {
    return this.image.width;
  }
  get height() {
    return this.image.height;
  }
  get data() {
    return this.image.data;
  }
  get complete() {
    return this.image.complete;
  }
  set crossOrigin(crossOrigin) {
    this._crossOrigin = crossOrigin;
  }

  get crossOrigin() {
    return this._crossOrigin;
  }

  set src(url) {
    const onekit_debug = Page.getApp().onekit_debug
    if (onekit_debug) {
      if (url.startsWith("data:")) {
        console[onekit_debug]("[HTMLImageElement]", "blob", url);
      } else {
        console[onekit_debug]("[HTMLImageElement]", url);
      }
    }
    if (url.startsWith('data:')) {
      this._src = url;
      this.image.src = url
      return
    }
    if (url.startsWith("blob:")) {
      try {
        this._src = url;
        var global = Page.current
        if (!global) {
          global = Page.getApp()
        }
        const arrayBuffer = global.DataURL[url].array[0]
        const base64 = "data:image/png;base64," + Base64.arrayBufferToBase64(arrayBuffer)
        this.image.src = base64
      } catch (ex) {
        console.error(ex);
      }
      return
    }
    if (url.startsWith("./")) {
      url = url.substring(2)
    }
    if (!url.startsWith("blob:") &&
      !url.startsWith("data:") &&
      !url.startsWith("http://") &&
      !url.startsWith("https://")) {
      url = (Page.getApp().onekit_path || "") + url
    }
    this.image.src = url;
  }

  get src() {
    return this._src;
  }
};exports.default = HTMLImageElement

}, function(modId) { var map = {"./core/Base64":1670917931005,"./core/Page":1670917931007,"./HTMLElement":1670917931008}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931005, function(require, module, exports) {
/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-var */

/* eslint-disable vars-on-top */

var __TEMP__ = require('../btoa');var btoa = __REQUIRE_DEFAULT__(__TEMP__);
function b64ToUint6(nChr) {
  return nChr > 64 && nChr < 91
    ? nChr - 65
    : nChr > 96 && nChr < 123
      ? nChr - 71
      : nChr > 47 && nChr < 58
        ? nChr + 4
        : nChr === 43
          ? 62
          : nChr === 47
            ? 63
            : 0
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Base64 {
  static arrayBufferToBase64(array) {
  //  return String.fromCharCode.apply(null, new Int8Array(buffer))
  
      let binary = ''
      const bytes = new Uint8Array(array)
      const len = bytes.byteLength
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return btoa(binary)
  }

  static base64ToArrayBuffer(sBase64, nBlockSize) {
    const
      sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ''); const nInLen = sB64Enc.length
    const nOutLen = nBlockSize ? Math.ceil((nInLen * 3 + 1 >>> 2) / nBlockSize) * nBlockSize : nInLen * 3 + 1 >>> 2; const
      aBytes = new Int8Array(nOutLen)

    for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
      nMod4 = nInIdx & 3
      nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4
      if (nMod4 === 3 || nInLen - nInIdx === 1) {
        for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
          aBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255
        }
        nUint24 = 0
      }
    }

    return aBytes.buffer
  }
};exports.default = Base64

}, function(modId) { var map = {"../btoa":1670917931006}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931006, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function btoa(string) {
  const b64 =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  string = String(string);
  let bitmap;
  let a;
  let b;
  let c;
  let result = "";
  let i = 0;
  const rest = string.length % 3; // To determine the final padding

  for (; i < string.length; ) {
    if (
      (a = string.charCodeAt(i++)) > 255 ||
      (b = string.charCodeAt(i++)) > 255 ||
      (c = string.charCodeAt(i++)) > 255
    ) {
      throw new TypeError(
        "Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range."
      );
    }

    bitmap = (a << 16) | (b << 8) | c;
    result +=
      b64.charAt((bitmap >> 18) & 63) +
      b64.charAt((bitmap >> 12) & 63) +
      b64.charAt((bitmap >> 6) & 63) +
      b64.charAt(bitmap & 63);
  }

  // If there's need of padding, replace the last 'A's with equal signs
  return rest ? result.slice(0, rest - 3) + "===".substring(rest) : result;
};exports.default = btoa

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931007, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Page{
    static get current(){
        const pages = this.getCurrentPages()
        return pages[pages.length-1]
    }
    static getCurrentPages(){
        if(typeof requireMiniProgram =="undefined"){
            return getCurrentPages()
        }else{
            return requireMiniProgram().getCurrentPages()
        }
    }
    static getApp(){
        if(typeof requireMiniProgram =="undefined"){
            return getApp()
        }else{
            return requireMiniProgram().getApp()
        }
    }
    static get wx_request(){
        if(typeof requireMiniProgram =="undefined"){
            return wx.request
        }else{
            return requireMiniProgram().wx_request()
        }
    }
};exports.default = Page
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931008, function(require, module, exports) {
var __TEMP__ = require('./Style');var Style = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Element');var Element = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./ClassCollection');var ClassCollection = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class HTMLElement extends Element {
  constructor(mini_element) {
    super();
    this.mini_element = mini_element;
    this.style = new Style();
    this.classList = new ClassCollection();
    this._children = [];
    this._childNodes = [];
    this.textContent = "";
  }

  get ownerDocument() {
    var document = new HTMLElement()
    document.documentElement =new HTMLElement() 
    return document;
  }

  get parentElement() {
    return new HTMLElement();
  }
  set id(id) {
    this._id = id;
    this.mini_key = id;
  }
  get id() {
    return this._id;
  }
  get children() {
    return this._children;
  }
  get childNodes() {
    return this._childNodes;
  }
  set innerHTML(innerHTML) {
    if (typeof innerHTML != "string") {
      return;
    }
    innerHTML = innerHTML.replaceAll("<br/>", "\n");
    innerHTML = innerHTML.replaceAll("<br>", "\n");
    innerHTML = innerHTML.replaceAll("&nbsp;", " ");
    const key = `${this.mini_key}_innerHTML`;
    const data = {};
    data[key] = innerHTML;
    if(Page.current){
      Page.current.setData(data);
    }
  }
  get innerHTML() {
    return this._innerHTML;
  }
  prepend() {}
  append() {}
  appendChild() {}
  removeChild() {}
  remove() {}

  insertBefore() {}

  setAttribute() {}

  toggleAttribute() {}

  click() {}
  get clientLeft() {
    return 0;
  }
  get clientTop() {
    return 0;
  }
  getBoundingClientRect() {
    if (this.mini_element) {
      const systemInfo = wx.getSystemInfoSync();
      return {
        left: 0,
        top: 0,
        width: this.mini_element.width / systemInfo.pixelRatio,
        height: this.mini_element.height / systemInfo.pixelRatio,
      };
    }
    return {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    };
  }
  play() {}
  setPointerCapture() {}
  releasePointerCapture() {}
  get clientWidth() {
    return this.mini_element ? this.mini_element.width : 0;
  }
  get clientHeight() {
    return this.mini_element ? this.mini_element.height : 0;
  }
  get pageXOffset(){
    return 0
  }
  get pageYOffset(){
    return 0
  }
};exports.default = HTMLElement

}, function(modId) { var map = {"./Style":1670917931009,"./Element":1670917931011,"./ClassCollection":1670917931016,"./core/Page":1670917931007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931009, function(require, module, exports) {


var __TEMP__ = require('./core/String');var String = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
function fix(value){
    if(value.endsWith("px")){
        value = value.substring(0,value.length-2)
    }
    return value
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Style {
	constructor(element) {
		//this.element = element;
		this.styles = {};
		this.value = "";
	}
	set cssText(cssText) {
		this._cssText = cssText;
	}

	get cssText() {
		return this._cssText;
	}

	setProperty() {}
	run(key, value) {
		return
        if(!this.element){
            return
        }
		if(!this.element.mini_key){
			return
		}
		/*
		function dict2string(dict) {
		  var string = "";
		  for (const key of Object.keys(dict)) {
		    string += `${String.fromHump(key)}:${dict[key]};`;
		  }
		  return string;
		}
		const data = {};
		data[`${this.element.mini_key}_style`] = dict2string(this.styles);*/

		const data = {};
		this.value += `${String.fromHump(key)}:${value};`;
		data[`${this.element.mini_key}_style`] = this.value
		//
		if (!this.page) {
			const pages = page.getCurrentPages();
			this.page = pages[pages.length - 1];
		}
		if(!this.page){
			return
		}
		//this.page.setData(data);
	}
	set display(value) {
		//this.styles.display = value;
		this.run("display", value);
	}
	set pointerEvents(value) {
		//this.styles.pointerEvents = value;
		this.run("pointerEvents", value);
	}

	set margin(value) {
		//this.styles.margin = value;
		this.run("margin", value);
	}
	set marginBottom(value) {
		//this.styles.marginBottom = value;
		this.run("marginBottom", value);
	}
	set marginTop(value) {
		//this.styles.marginTop = value;
		this.run("marginTop", value);
	}
	set marginLeft(value) {
		//this.styles.marginLeft = value;
		this.run("marginLeft", value);
	}
	set marginRight(value) {
		//this.styles.marginRight = value;
		this.run("marginRight", value);
	}

	set padding(value) {
		//this.styles.padding = value;
		this.run("padding", value);
	}
	set paddingBottom(value) {
		//this.styles.paddingBottom = value;
		this.run("paddingBottom", value);
	}
	set paddingTop(value) {
		//this.styles.paddingTop = value;
		this.run("paddingTop", value);
	}
	set paddingLeft(value) {
		//this.styles.paddingLeft = value;
		this.run("paddingLeft", value);
	}
	set paddingRight(value) {
		//this.styles.paddingRight = value;
		this.run("paddingRight", value);
	}

	set position(value) {
		//this.styles.position = value;
		this.run("position", value);
	}
	set backfaceVisibility(value) {
		//this.styles.backfaceVisibility = value;
		this.run("backfaceVisibility", value);
	}
	set transformStyle(value) {
		//this.styles.transformStyle = value;
		this.run("transformStyle", value);
	}
	set fontFamily(value) {
		//this.styles.fontFamily = value;
		this.run("fontFamily", value);
	}
	set fontSize(value) {
		//this.styles.fontSize = value;
		this.run("fontSize", value);
	}
	set fontStyle(value) {
		//this.styles.fontStyle = value;
		this.run("fontStyle", value);
	}
	set fontWeight(value) {
		//this.styles.fontWeight = value;
		this.run("fontWeight", value);
	}
	set letterSpacing(value) {
		//this.styles.letterSpacing = value;
		this.run("letterSpacing", value);
	}
	set color(value) {
		//this.styles.color = value;
		this.run("color", value);
	}
	set background(value) {
		//this.styles.background = value;
		this.run("background", value);
	}
	set backgroundColor(value) {
		//this.styles.backgroundColor = value;
		this.run("backgroundColor", value);
	}
	set touchAction(value) {
		//this.styles.touchAction = value;
		this.run("touchAction", value);
	}
	set visibility(value) {
		//this.styles.visibility = value;
		this.run("visibility", value);
	}
	set zoom(value) {
		//this.styles.zoom = value;
		this.run("zoom", value);
	}
	set userSelect(value) {
		//this.styles.userSelect = value;
		this.run("userSelect", value);
	}
	set overflow(value) {
		//this.styles.overflow = value;
		this.run("overflow", value);
	}

	set width(value0) {
		this.run("width", value0);
	}
	set height(value0) {
		this.run("height", value0);
	}
	set left(value0) {
		this.run("left", value0);
	}
	set right(value0) {
		this.run("right", value0);
	}
	set top(value0) {
		this.run("top", value0);
	}
	set bottom(value0) {
		this.run("bottom", value0);
    }


	set opacity(value) {
		//this.styles.opacity = value;
		this.run("opacity", value);
	}
	set transform(value) {
		//this.styles.transform = value;
		this.run("transform", value);
	}
	set transformOrigin(value) {
		//this.styles.transformOrigin = value;
		this.run("transformOrigin", value);
	}
};exports.default = Style

}, function(modId) { var map = {"./core/String":1670917931010,"./core/Page":1670917931007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931010, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class String {
  static fromHump(s) {
    return s.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
  static toHump(name) {
    return name.replace(/\-(\w)/g, function (all, letter) {
      console.log(all); //"_T"
      console.log(letter); //"T"
      return letter.toUpperCase();
    });
  }
};exports.default = String

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931011, function(require, module, exports) {


var __TEMP__ = require('./Node');var Node = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Element extends Node {
  constructor() {
    super()
  }
};exports.default = Element

}, function(modId) { var map = {"./Node":1670917931012}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931012, function(require, module, exports) {

var __TEMP__ = require('./EventTarget');var EventTarget = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Node extends EventTarget {
  constructor() {
    super()
  }
};exports.default = Node

}, function(modId) { var map = {"./EventTarget":1670917931013}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931013, function(require, module, exports) {
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
var __TEMP__ = require('./core/ArrayX');var ArrayX = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Event');var Event = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class EventTarget {
  constructor() {
    this._all_event_handlers = {};
  }

  addEventListener (type, handler) {
    if (!this._all_event_handlers[type]) {
      this._all_event_handlers[type] = [];
    }
    this._all_event_handlers[type].push(handler);
  }

  removeEventListener (type, handler) {
    this._all_event_handlers[type] = ArrayX.remove(
      this._all_event_handlers[type],
      handler
    );
  }

  createEvent (type) {
    return new Event(type);
  }
  dispatchEvent (e) {
    setTimeout(() => {
      var type = e.type;
      const Mobile2Web = {
        "touchcancel": ["mouseCancel","pointercancel"],
        "touchstart": ["mouseDown","pointerdown"],
        "touchmove": ["mouseMove","pointermove"],
        "touchend": ["mouseUp","pointerup", "click"]
      }
      var event_handlers = this._all_event_handlers[type] || [];
      if (
        event_handlers.length <= 0 &&
        Object.keys(Mobile2Web).includes(type)) {
        const types = Mobile2Web[type]
        for (const t of types) {
          const handlers = this._all_event_handlers[t]
          if (handlers) {
            event_handlers = event_handlers.concat(handlers)
          }
        }
      }
      for (var event_handler of event_handlers) {
        event_handler.call(this, e);
      }
    }, 0);
  }
};exports.default = EventTarget

}, function(modId) { var map = {"./core/ArrayX":1670917931014,"./Event":1670917931015}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931014, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = {
  remove(array, item) {
    const index = array.indexOf(item)
    if (index > -1) {
      array.splice(index, 1)
    }
    return array
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931015, function(require, module, exports) {
var systemInfo = wx.getSystemInfoSync()
var platform = systemInfo.platform
var pixelRatio = systemInfo.pixelRatio
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Event {
	static fix(mini_e) {

		//console.error(mini_e)
		var web_e = new Event(mini_e.type)
		///////////////////////////////////
		web_e.isTrusted = true
		web_e.altKey = false
		web_e.altitudeAngle = 1.5707963267948966
		web_e.azimuthAngle = 0
		web_e.bubbles = true
		web_e.button = ["touchstart", "touchend"].includes(mini_e.type) ? 0 : -1
		web_e.buttons = ["touchstart", "touchend"].includes(mini_e.type) ? 0 : 1
		web_e.cancelBubble = false
		web_e.cancelable = true
		web_e.composed = true
		web_e.ctrlKey = false
		web_e.currentTarget = null
		web_e.defaultPrevented = false
		web_e.detail = 0
		web_e.eventPhase = 0
		web_e.fromElement = null
		web_e.width = 5 //30.66666603088379
		web_e.height = 5 //30.66666603088379
		web_e.isPrimary = true
		web_e.metaKey = false
		web_e.movementX = 0
		web_e.movementY = 1
		//    web_e.path = []canvas, body, html, document, Window]
		web_e.pointerType = "touch"
		web_e.pressure = 1
		web_e.relatedTarget = null
		web_e.returnValue = true
		web_e.shiftKey = false
		web_e.sourceCapabilities = null
		// web_e.srcElement =canvas
		web_e.tangentialPressure = 0
		// web_e.target =canvas
		web_e.tiltX = 0
		web_e.tiltY = 0
		web_e.timeStamp = 39505
		web_e.toElement = null
		web_e.twist = 0
		//web_e.view = ?
		web_e.which = 0
		///////////////////////////////////
		web_e.code = "";
		const offsetLeft = mini_e.target.offsetLeft
		const offsetTop = mini_e.target.offsetTop
		//
		/*
		var result = []
		if (mini_e.changedTouches.length > 0) {
			for (const touch of mini_e.changedTouches) {
				result.push(this.touch2touch(offsetLeft, offsetTop, touch, web_e, pixelRatio))
			}
		} else {
			result.push(web_e)
		}

		return result*/
		/*
		var touch = mini_e.changedTouches[0]
		switch (mini_e.type) {
			case "touchstart":
			case "touchend":
				web_e.pointerId = touch.identifier != null ? touch.identifier : 2;
				web_e.identifier = touch.identifier;
				return web_e;
			case "touchmove":
				return this.touch2touch(offsetLeft, offsetTop, touch, web_e, pixelRatio)
		}*/
		var touch = mini_e.changedTouches[0]
		return this.touch2touch(offsetLeft, offsetTop, touch, web_e, pixelRatio)
	}
	static fix2(mini_e) {
		//console.error(mini_e)
		const web_e = new Event(mini_e.type)
		///////////////////////////////////
		web_e.isTrusted = true
		web_e.altKey = false
		web_e.altitudeAngle = 1.5707963267948966
		web_e.azimuthAngle = 0
		web_e.bubbles = true
		web_e.button = ["touchstart", "touchend"].includes(mini_e.type) ? 0 : -1
		web_e.buttons = ["touchstart", "touchend"].includes(mini_e.type) ? 0 : 1
		web_e.cancelBubble = false
		web_e.cancelable = true
		web_e.composed = true
		web_e.ctrlKey = false
		web_e.currentTarget = null
		web_e.defaultPrevented = false
		web_e.detail = 0
		web_e.eventPhase = 0
		web_e.fromElement = null
		web_e.height = 30.66666603088379
		web_e.isPrimary = true
		web_e.metaKey = false
		web_e.movementX = 0
		web_e.movementY = 1
		//    web_e.path = []canvas, body, html, document, Window]
		web_e.pointerType = "touch"
		web_e.pressure = 1
		web_e.relatedTarget = null
		web_e.returnValue = true
		web_e.shiftKey = false
		web_e.sourceCapabilities = null
		// web_e.srcElement =canvas
		web_e.tangentialPressure = 0
		// web_e.target =canvas
		web_e.tiltX = 0
		web_e.tiltY = 0
		web_e.timeStamp = 39505
		web_e.toElement = null
		web_e.twist = 0
		//web_e.view = ?
		web_e.which = 0
		web_e.width = 30.66666603088379
		///////////////////////////////////
		web_e.code = "";
		const offsetLeft = mini_e.target.offsetLeft
		const offsetTop = mini_e.target.offsetTop
		web_e.touches = mini_e.touches.map(touch => {
			return this.touch2touch(offsetLeft, offsetTop, touch, {})
		})
		web_e.changedTouches = mini_e.changedTouches.map(touch => {
			return this.touch2touch(offsetLeft, offsetTop, touch, {})
		})
		//
		return web_e
	}
	static touch2touch(offsetLeft, offsetTop, touch, web_e, pixelRatio = 1) {
		web_e.pointerId = touch.identifier != null ? touch.identifier : 2;
		web_e.identifier = touch.identifier;
	//	console.error(platform)
		if (platform == "devtools") {
			web_e.pageX = touch.x * pixelRatio;
			web_e.pageY = touch.y * pixelRatio;
			web_e.clientX = (touch.x - offsetLeft) * pixelRatio
			web_e.clientY = (touch.y - offsetTop) * pixelRatio
			//
			web_e.layerX = web_e.clientX;
			web_e.layerY = web_e.clientY;
			web_e.x = web_e.clientX;
			web_e.y = web_e.clientY;
			web_e.offsetX = web_e.clientX;
			web_e.offsetY = web_e.clientY;
			web_e.deltaX = web_e.offsetX;
			web_e.deltaY = web_e.offsetY;
		} else {
			web_e.pageX = touch.pageX* pixelRatio;
			web_e.pageY = touch.pageY* pixelRatio;
			web_e.clientX = touch.clientX* pixelRatio;
			web_e.clientY = touch.clientY* pixelRatio;
			web_e.x = touch.x* pixelRatio;
			web_e.y = touch.y* pixelRatio;
			web_e.deltaX = touch.deltaX* pixelRatio;
			web_e.deltaY = touch.deltaY* pixelRatio;
			//
			web_e.layerX = web_e.clientX;
			web_e.layerY = web_e.clientY;
			web_e.deltaX = web_e.offsetX;
			web_e.deltaY = web_e.offsetY;
		}
		return web_e
	}
	//////////////////////////////////////////////////////////////

	constructor(type, options) {
		this.type = type
		this.options = options
	}
	preventDefault() {

	}
};exports.default = Event

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931016, function(require, module, exports) {

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class ClassCollection {
  constructor(element){
  //  this.element = element
    this.classes = []
  }
  add(className) {
   // this.element.mini_key = className
  }

  remove() {

  }

  toggle() {

  }
};exports.default = ClassCollection

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931017, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class CSSStyleDeclaration {
  constructor() {
    this.fill = ''
    this['fill-opacity'] = ''
    this['fill-rule'] = ''
    this.opacity = ''
    this.stroke = ''
    this['stroke-opacity'] = ''
    this['stroke-width'] = ''
    this['stroke-linejoin'] = ''
    this['stroke-linecap'] = ''
    this['stroke-miterlimit'] = ''
    this.visibility = ''
  }

  static parse(css) {
    const style = new CSSStyleDeclaration()
    const pairs = css.split(';')
    for (const pair of pairs) {
      if (!pair) {
        continue
      }
      if (!pair.includes(':')) {
        continue
      }
      const kv = pair.trim().split(':')
      style[kv[0].trim()] = kv[1].trim()
    }
    return style
  }
};exports.default = CSSStyleDeclaration

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931018, function(require, module, exports) {
var __TEMP__ = require('./HTMLImageElement');var HTMLImageElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./HTMLCanvasElement');var HTMLCanvasElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./window');var Window = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Location');var Location = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./HTMLElement');var HTMLElement = __REQUIRE_DEFAULT__(__TEMP__);
const window = new Window()

class Head extends HTMLElement { }

class Body extends HTMLElement { }

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Document extends HTMLElement {
  constructor() {
    super();
    this.window = window;
    this.body = new Body();
    this.pointerLockElement = this.body
  }

  get head() {
    return new Head();
  }

  async createElementAsync(nodeName, canvasType = "2d", THIS) {
    switch (nodeName) {
      case "canvas":
        return new Promise((resolve) => {
          var query = wx.createSelectorQuery();
          if (THIS) {
            query = query.in(THIS);
          }
          query
            .select(`#canvas_${canvasType}`)
            .fields({ node: true })
            .exec((res) => {
              const canvas = res[0].node;
              resolve(new HTMLCanvasElement(canvas));
            });
        });
      default:
        console.error("createElementAsync", nodeName);
        throw new Error(nodeName);
    }
  }

  async getElementByIdAsync(id, canvasType = "2d", THIS) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery();
      if (THIS) {
        query = query.in(THIS);
      }
      query
        .select(`#${id}`)
        .fields({ node: true })
        .exec((res) => {
          const canvas = res[0].node;
          resolve(new HTMLCanvasElement(canvas));
        });
    });
  }

  async getElementsByTagNameAsync(tagName, canvasType = "2d", THIS) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery();
      if (THIS) {
        query = query.in(THIS);
      }
      query
        .select(tagName)
        .fields({ node: true })
        .exec((res) => {
          const canvas = res[0].node;
          resolve([new HTMLCanvasElement(canvas)]);
        });
    });
  }

  async getElementsByClassNameAsync(className, canvasType = "2d", THIS) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery();
      if (THIS) {
        query = query.in(THIS);
      }
      query
        .select(`.${className}`)
        .fields({ node: true })
        .exec((res) => {
          const canvas = res[0].node;
          resolve([new HTMLCanvasElement(canvas)]);
        });
    });
  }

  createElement(nodeName, canvasType = "2d") {
    switch (nodeName) {
      case "canvas":
        return new HTMLCanvasElement(wx.createOffscreenCanvas({ type: canvasType }));
      case "img":
        return new HTMLImageElement();
      default:
        return new HTMLElement();
    }
  }

  createElementNS(namesspace, nodeName, canvasType) {
    return this.createElement(nodeName, canvasType);
  }

  get documentElement() {
    return new HTMLElement();
  }

  getElementById() {
    return new HTMLElement();
  }

  getElementsByTagName() {
    return [];
  }

  getElementsByClassName() {
    return [];
  }

  querySelector() {
    return new HTMLElement();
  }

  get location() {
    return new Location();
  }

  querySelectorAll() {
    return [];
  }
};exports.default = Document

}, function(modId) { var map = {"./HTMLImageElement":1670917931004,"./HTMLCanvasElement":1670917931019,"./window":1670917931020,"./Location":1670917931024,"./HTMLElement":1670917931008}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931019, function(require, module, exports) {
var __TEMP__ = require('./HTMLElement');var HTMLElement = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class HTMLCanvasElement extends HTMLElement {
  constructor(mini_element) {
    super(mini_element);
  }
  get width() {
    return this.mini_element.width;
  }
  set width(width) {
    this.mini_element.width = width;
  }
  get height() {
    return this.mini_element.height;
  }
  set height(height) {
    this.mini_element.height = height;
  }
  getContext(type, attrs) {
    if (!["2d", "webgl"].includes(type)) {
      return null;
    }
    return this.mini_element.getContext(type, attrs);
  }
  toDataURL( type,  encoderOptions){
    return this.mini_element.toDataURL(type, encoderOptions); 
  }
};exports.default = HTMLCanvasElement

}, function(modId) { var map = {"./HTMLElement":1670917931008}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931020, function(require, module, exports) {
/* eslint-disable no-undef */
/* eslint-disable getter-return */

var __TEMP__ = require('./HTMLElement');var HTMLElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./URL');var URL = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Performance');var Performance = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Location');var Location = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./requestAnimationFrame');var requestAnimationFrame = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./cancelAnimationFrame');var cancelAnimationFrame = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./createImageBitmap');var createImageBitmap = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Image');var Image = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./HTMLImageElement');var HTMLImageElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./HTMLCanvasElement');var HTMLCanvasElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./ImageBitmap');var ImageBitmap = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Worker');var Worker = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./btoa');var btoa = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./AudioContext');var AudioContext = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./ImageData');var ImageData = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Event');var Event = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./TextDecoder');var TextDecoder = __REQUIRE_DEFAULT__(__TEMP__);
// ///////////////////////////////////////////////

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Window extends HTMLElement {
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
};exports.default = Window

}, function(modId) { var map = {"./HTMLElement":1670917931008,"./URL":1670917931021,"./Performance":1670917931023,"./Location":1670917931024,"./requestAnimationFrame":1670917931025,"./cancelAnimationFrame":1670917931026,"./createImageBitmap":1670917931003,"./Image":1670917931027,"./HTMLImageElement":1670917931004,"./HTMLCanvasElement":1670917931019,"./ImageBitmap":1670917931028,"./Worker":1670917931029,"./btoa":1670917931006,"./AudioContext":1670917931030,"./ImageData":1670917931031,"./Event":1670917931015,"./TextDecoder":1670917931032}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931021, function(require, module, exports) {
var __TEMP__ = require('./core/GUID');var GUID = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class URL {
  static createObjectURL(blob) {
    const guid = GUID();
    const url = `blob:http://localhost/${guid}`;
    try {
      var global = Page.current
      if (!global) {
        global = Page.getApp()
      }
      if (!global.DataURL) {
        global.DataURL = {}
      }
      global.DataURL[url] = blob
    } catch (ex) {
      console.error(ex);
    }
    return url;
  }

  static revokeObjectURL(url) {
    try {
      var global = Page.current
      if (!global) {
        global = Page.getApp()
      }
      delete global.DataURL[url]
    } catch (ex) {
      console.error(ex);
    }
  }
};exports.default = URL

}, function(modId) { var map = {"./core/GUID":1670917931022,"./core/Page":1670917931007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931022, function(require, module, exports) {


if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function GUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0; const
      v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
};exports.default = GUID

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931023, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Performance {
	constructor() {
        this.time0 = new Date().getTime()
	}
	now() {
        return new Date().getTime()-this.time0
	}
};exports.default = Performance

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931024, function(require, module, exports) {

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Location {
  constructor() {
    this.hash = ''
    this.search = ''
    this.href = ''
  }
};exports.default = Location

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931025, function(require, module, exports) {
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function requestAnimationFrame(callback,canvas) {
  if (!canvas && Page.current) {
    canvas = Page.current.canvas
  }
  if (!canvas && Page.getApp()) {
    canvas = Page.getApp().canvas
  }
  if (canvas && canvas.mini_element) {
    canvas = canvas.mini_element
  }
  const requestId = canvas.requestAnimationFrame(callback)
  return requestId
};exports.default = requestAnimationFrame

}, function(modId) { var map = {"./core/Page":1670917931007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931026, function(require, module, exports) {
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function cancelAnimationFrame(requestId, canvas) {
	try {
		if (!requestId) {
			return
		}
		if (!canvas && Page.current) {
			canvas = Page.current.canvas
		}
		if (!canvas && Page.getApp()) {
			canvas = Page.getApp().canvas
		}
		if (!canvas) {
			return
		}
		if (canvas && canvas.mini_element) {
			canvas = canvas.mini_element
		}
		canvas.cancelAnimationFrame(requestId)
	} catch (ex) {
		console.error(ex)
	}
};exports.default = cancelAnimationFrame

}, function(modId) { var map = {"./core/Page":1670917931007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931027, function(require, module, exports) {
var __TEMP__ = require('./core/Base64');var Base64 = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./EventTarget');var EventTarget = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Image extends EventTarget {
  constructor(canvas2d) {
    super();
		this.isOffscreen = canvas2d && canvas2d.isOffscreenCanvas
		var canvas = canvas2d;
    if (!canvas && Page.current) {
      canvas = Page.current.canvas
    }
    if (!canvas && Page.getApp()) {
      canvas = Page.getApp().canvas
    }
    if (canvas && canvas.mini_element) {
      canvas = canvas.mini_element
    }
    this.image = canvas.createImage();
    this.image.onload = () => {
      if (this.onload) {
        this.onload.call(this);
      }
      if (this._all_event_handlers.load) {
        this._all_event_handlers.load.forEach((handler) => {
          handler.call(this);
        });
      }
    };
    this.image.onerror = (e) => {
      if (this.onerror) {
        this.onerror.call(this, e);
      }
      if (this._all_event_handlers.error) {
        this._all_event_handlers.error.forEach((handler) => {
          handler.call(this, e);
        });
      }
    };
  }
  get width() {
    return this.image.width;
  }
  get height() {
    return this.image.height;
  }
  get data() {
    return this.image.data;
  }
  get complete() {
    return this.image.complete;
  }
  set crossOrigin(crossOrigin) {
    this._crossOrigin = crossOrigin;
  }

  get crossOrigin() {
    return this._crossOrigin;
  }

  set src(url) {
    const onekit_debug = Page.getApp().onekit_debug;
    if (onekit_debug) {
      if (url.startsWith("data:")) {
        console[onekit_debug]("[Image]", "blob");
      } else {
        console[onekit_debug]("[Image]", url);
      }
    }
    if (url.startsWith("data:")) {
      this._src = url;
      this.image.src = url;
      return;
    }
    if (url.startsWith("blob:")) {
      try {
        this._src = url;
        var global = Page.current
        if(!global){
          global = Page.getApp()
        }
        const arrayBuffer = global.DataURL[url].array[0];
        const base64 =
          "data:image/png;base64," + Base64.arrayBufferToBase64(arrayBuffer);
        this.image.src = base64;
      } catch (ex) {
        console.error(ex);
      }
      return;
    }
    if (url.startsWith("./")) {
      url = url.substring(2);
    }
    if (
      !url.startsWith("blob:") &&
      !url.startsWith("data:") &&
      !url.startsWith("mini:") &&
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      url = (Page.getApp().onekit_path || "") + url;
    }
    this.image.src = url;
  }

  get src() {
    return this._src;
  }
};exports.default = Image

}, function(modId) { var map = {"./core/Base64":1670917931005,"./core/Page":1670917931007,"./EventTarget":1670917931013}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931028, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class ImageBitmap {
  constructor(image) {
    this.image = image;
  }
  get width() {
    return this.image.width;
  }
  get height() {
    return this.image.height;
  }
  get data() {
    return this.image.data;
  }
};exports.default = ImageBitmap

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931029, function(require, module, exports) {
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-tabs */
/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
var __TEMP__ = require('./EventTarget');var EventTarget = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
function json2message(json) {
  if (json == null) {
    return null;
  }
  if (json instanceof ArrayBuffer) {
    return {
      t: "ArrayBuffer",
      v: json,
    };
  }
  if (json instanceof Int8Array) {
    return {
      t: "Int8Array",
      v: json.buffer,
    };
  }
  if (json instanceof Uint8Array) {
    return {
      t: "Uint8Array",
      v: json.buffer,
    };
  }
  if (json instanceof Uint8ClampedArray) {
    return {
      t: "Uint8ClampedArray",
      v: json.buffer,
    };
  }
  if (json instanceof Int16Array) {
    return {
      t: "Int16Array",
      v: json.buffer,
    };
  }
  if (json instanceof Uint16Array) {
    return {
      t: "Uint16Array",
      v: json.buffer,
    };
  }
  if (json instanceof Int32Array) {
    return {
      t: "Int32Array",
      v: json.buffer,
    };
  }
  if (json instanceof Uint32Array) {
    return {
      t: "Uint32Array",
      v: json.buffer,
    };
  }
  if (json instanceof Uint32Array) {
    return {
      t: "Uint32Array",
      v: json.buffer,
    };
  }
  if (json instanceof Float32Array) {
    return {
      t: "Float32Array",
      v: json.buffer,
    };
  }
  if (json instanceof Float64Array) {
    return {
      t: "Float64Array",
      v: json.buffer,
    };
  }
  if (json instanceof Array) {
    return {
      t: "Array",
      v: json.map((item) => json2message(item)),
    };
  }
  if (typeof json === "boolean") {
    return {
      t: "Boolean",
      v: json,
    };
  }
  if (typeof json === "number") {
    return {
      t: "Number",
      v: json,
    };
  }
  if (typeof json === "string") {
    return {
      t: "String",
      v: json,
    };
  }
  const dict = {};
  for (const key of Object.keys(json)) {
    dict[key] = json2message(json[key]);
  }
  return {
    t: "Dict",
    v: dict,
  };
}

function message2json(message) {
  if (message == null) {
    return null;
  }
  const value = message.v;
  switch (message.t) {
    case "ArrayBuffer":
      return value;
    case "Int8Array":
      return new Int8Array(value);
    case "Uint8Array":
      return new Uint8Array(value);
    case "Uint8ClampedArray":
      return new Uint8ClampedArray(value);
    case "Int16Array":
      return new Int16Array(value);
    case "Uint16Array":
      return new Uint16Array(value);
    case "Int32Array":
      return new Int32Array(value);
    case "Uint32Array":
      return new Uint32Array(value);
    case "Float32Array":
      return new Float32Array(value);
    case "Float64Array":
      return new Float64Array(value);

    case "Array":
      return value.map((item) => message2json(item));
    case "Boolean":
    case "String":
    case "Number":
      return value;
    case "Dict":
      const dict = {};
      for (const key of Object.keys(value)) {
        dict[key] = message2json(value[key]);
      }
      return dict;
    default:
      throw new Error(message.t);
  }
}
/*
function json2message(json) {
  if (json == null) {
    return null
  }
  if (json instanceof ArrayBuffer) {
    return {
      t: 'ArrayBuffer',
      v: Array.prototype.slice.call(new Uint8Array(json))
    }
  }
  if (json instanceof Int8Array) {
    return {
      t: 'Int8Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Uint8Array) {
    return {
      t: 'Uint8Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Uint8ClampedArray) {
    return {
      t: 'Uint8ClampedArray',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Int16Array) {
    return {
      t: 'Int16Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Uint16Array) {
    return {
      t: 'Uint16Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Int32Array) {
    return {
      t: 'Int32Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Uint32Array) {
    return {
      t: 'Uint32Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Uint32Array) {
    return {
      t: 'Uint32Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Float32Array) {
    return {
      t: 'Float32Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Float64Array) {
    return {
      t: 'Float64Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Array) {
    return {
      t: 'Array',
      v: json.map(item => json2message(item))
    }
  }
  if (typeof json === 'boolean') {
    return {
      t: 'Boolean',
      v: json
    }
  }
  if (typeof json === 'number') {
    return {
      t: 'Number',
      v: json
    }
  }
  if (typeof json === 'string') {
    return {
      t: 'String',
      v: json
    }
  }
  const dict = {}
  for (const key of Object.keys(json)) {
    dict[key] = json2message(json[key])
  }
  return {
    t: 'Dict',
    v: dict
  }
}

function message2json(message) {
  if (message == null) {
    return null
  }
  const value = message.v
  switch (message.t) {
    case 'ArrayBuffer':
      return new Uint8Array(value).buffer
    case 'Int8Array':
      return new Int8Array(value)
    case 'Uint8Array':
      return new Uint8Array(value)
    case 'Uint8ClampedArray':
      return new Uint8ClampedArray(value)
    case 'Int16Array':
      return new Int16Array(value)
    case 'Uint16Array':
      return new Uint16Array(value)
    case 'Int32Array':
      return new Int32Array(value)
    case 'Uint32Array':
      return new Uint32Array(value)
    case 'Float32Array':
      return new Float32Array(value)
    case 'Float64Array':
      return new Float64Array(value)

    case 'Array':
      return value.map(item => message2json(item))
    case 'Boolean':
    case 'String':
    case 'Number':
      return value
    case 'Dict':
      const dict = {}
      for (const key of Object.keys(value)) {
        dict[key] = message2json(value[key])
      }
      return dict
    default:
      throw new Error(message.t)
  }
}
*/
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Worker extends EventTarget {
  static self_onmessage(msg) {
    return { data: message2json(msg) };
  }

  static self_postMessage(json) {
    return worker.postMessage(json2message(json));
  }
  // /////////////////
  constructor(url) {
    super();
    var global = Page.current
    if(!global){
      global = Page.getApp()
    }
    //if(Page.current){
      global.worker = this
    //}
		const onekit_debug = Page.getApp().onekit_debug
    if (onekit_debug) {
      console[onekit_debug]("[Worker]", url);
    }
    const createNewWorker = () => {
      const worker = wx.createWorker("workers/" + url, {
        useExperimentalWorker: true,
      });
      worker.onMessage((msg) => {
        if (this.onmessage) {
          this.onmessage({
            data: message2json(msg),
          });
        }
        if (this._all_event_handlers.message) {
          this._all_event_handlers.message.forEach((handler) => {
            handler.apply(this);
          });
        }
      });
      // 监听 worker 被系统回收事件
      worker.onProcessKilled(() => {
        // 重新创建一个worker
        createNewWorker();
      });
      this._worker = worker;
    };
    createNewWorker();
  }

  postMessage(json) {
    const message = json2message(json);
    // console.error(message)
    this._worker.postMessage(message);
  }

  terminate() {
    this._worker.terminate();
  }
};exports.default = Worker

}, function(modId) { var map = {"./EventTarget":1670917931013,"./core/Page":1670917931007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931030, function(require, module, exports) {
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
        //this.mini_source.connect( data)
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
class Listener {
    constructor() {
    }
    get positionX() {
        return 0;
    }
    get positionY() {
        return 0;
    }
    setPosition(){

    }
    setOrientation (){
        
    }
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class AudioContext {
    constructor() {
        this.mini_context = wx.createWebAudioContext()
    }
    createBufferSource() {
        return new BufferSource(this.mini_context.createBufferSource())
    }
    createPanner() {
        return new Panner(this.mini_context.createPanner())
    }   
    get listener() {
        return new Listener()
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
};exports.default = AudioContext
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931031, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class ImageData{
    constructor(array,width,height){
        this.array=array
        this.width=width
        this.height=height
    }
};exports.default = ImageData
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931032, function(require, module, exports) {
var __TEMP__ = require('./core/encoding/encoding.js');var encoding = __REQUIRE_DEFAULT__(__TEMP__);
module.exports = encoding.TextDecoder
}, function(modId) { var map = {"./core/encoding/encoding.js":1670917931033}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931033, function(require, module, exports) {



/**
 * @fileoverview Global |this| required for resolving indexes in node.
 * @suppress {globalThis}
 */
(function(global) {
  

  
  if (typeof module !== "undefined" && module.exports &&
    !global["encoding-indexes"]) {
    global["encoding-indexes"] =
      require("./encoding-indexes.js")["encoding-indexes"];
  }

  
  
  

  /**
   * @param {number} a The number to test.
   * @param {number} min The minimum value in the range, inclusive.
   * @param {number} max The maximum value in the range, inclusive.
   * @return {boolean} True if a >= min and a <= max.
   */
  function inRange(a, min, max) {
    return min <= a && a <= max;
  }

  /**
   * @param {!Array.<*>} array The array to check.
   * @param {*} item The item to look for in the array.
   * @return {boolean} True if the item appears in the array.
   */
  function includes(array, item) {
    return array.indexOf(item) !== -1;
  }

  var floor = Math.floor;

  /**
   * @param {*} o
   * @return {Object}
   */
  function ToDictionary(o) {
    if (o === undefined) return {};
    if (o === Object(o)) return o;
    throw TypeError('Could not convert argument to dictionary');
  }

  /**
   * @param {string} string Input string of UTF-16 code units.
   * @return {!Array.<number>} Code points.
   */
  function stringToCodePoints(string) {
    

    
    var s = String(string);

    
    var n = s.length;

    
    var i = 0;

    
    var u = [];

    
    while (i < n) {

      
      var c = s.charCodeAt(i);

      

      
      if (c < 0xD800 || c > 0xDFFF) {
        
        u.push(c);
      }

      
      else if (0xDC00 <= c && c <= 0xDFFF) {
        
        u.push(0xFFFD);
      }

      
      else if (0xD800 <= c && c <= 0xDBFF) {
        
        
        if (i === n - 1) {
          u.push(0xFFFD);
        }
        
        else {
          
          var d = s.charCodeAt(i + 1);

          
          if (0xDC00 <= d && d <= 0xDFFF) {
            
            var a = c & 0x3FF;

            
            var b = d & 0x3FF;

            
            
            u.push(0x10000 + (a << 10) + b);

            
            i += 1;
          }

          
          
          else  {
            u.push(0xFFFD);
          }
        }
      }

      
      i += 1;
    }

    
    return u;
  }

  /**
   * @param {!Array.<number>} code_points Array of code points.
   * @return {string} string String of UTF-16 code units.
   */
  function codePointsToString(code_points) {
    var s = '';
    for (var i = 0; i < code_points.length; ++i) {
      var cp = code_points[i];
      if (cp <= 0xFFFF) {
        s += String.fromCharCode(cp);
      } else {
        cp -= 0x10000;
        s += String.fromCharCode((cp >> 10) + 0xD800,
                                 (cp & 0x3FF) + 0xDC00);
      }
    }
    return s;
  }


  
  
  
  

  
  
  

  /**
   * An ASCII byte is a byte in the range 0x00 to 0x7F, inclusive.
   * @param {number} a The number to test.
   * @return {boolean} True if a is in the range 0x00 to 0x7F, inclusive.
   */
  function isASCIIByte(a) {
    return 0x00 <= a && a <= 0x7F;
  }

  /**
   * An ASCII code point is a code point in the range U+0000 to
   * U+007F, inclusive.
   */
  var isASCIICodePoint = isASCIIByte;


  /**
   * End-of-stream is a special token that signifies no more tokens
   * are in the stream.
   * @const
   */ var end_of_stream = -1;

  /**
   * A stream represents an ordered sequence of tokens.
   *
   * @constructor
   * @param {!(Array.<number>|Uint8Array)} tokens Array of tokens that provide
   * the stream.
   */
  function Stream(tokens) {
    /** @type {!Array.<number>} */
    this.tokens = [].slice.call(tokens);
    
    this.tokens.reverse();
  }

  Stream.prototype = {
    /**
     * @return {boolean} True if end-of-stream has been hit.
     */
    endOfStream: function() {
      return !this.tokens.length;
    },

    /**
     * When a token is read from a stream, the first token in the
     * stream must be returned and subsequently removed, and
     * end-of-stream must be returned otherwise.
     *
     * @return {number} Get the next token from the stream, or
     * end_of_stream.
     */
     read: function() {
      if (!this.tokens.length)
        return end_of_stream;
       return this.tokens.pop();
     },

    /**
     * When one or more tokens are prepended to a stream, those tokens
     * must be inserted, in given order, before the first token in the
     * stream.
     *
     * @param {(number|!Array.<number>)} token The token(s) to prepend to the
     * stream.
     */
    prepend: function(token) {
      if (Array.isArray(token)) {
        var tokens = /**@type {!Array.<number>}*/(token);
        while (tokens.length)
          this.tokens.push(tokens.pop());
      } else {
        this.tokens.push(token);
      }
    },

    /**
     * When one or more tokens are pushed to a stream, those tokens
     * must be inserted, in given order, after the last token in the
     * stream.
     *
     * @param {(number|!Array.<number>)} token The tokens(s) to push to the
     * stream.
     */
    push: function(token) {
      if (Array.isArray(token)) {
        var tokens = /**@type {!Array.<number>}*/(token);
        while (tokens.length)
          this.tokens.unshift(tokens.shift());
      } else {
        this.tokens.unshift(token);
      }
    }
  };

  
  
  

  

  /** @const */
  var finished = -1;

  /**
   * @param {boolean} fatal If true, decoding errors raise an exception.
   * @param {number=} opt_code_point Override the standard fallback code point.
   * @return {number} The code point to insert on a decoding error.
   */
  function decoderError(fatal, opt_code_point) {
    if (fatal)
      throw TypeError('Decoder error');
    return opt_code_point || 0xFFFD;
  }

  /**
   * @param {number} code_point The code point that could not be encoded.
   * @return {number} Always throws, no value is actually returned.
   */
  function encoderError(code_point) {
    throw TypeError('The code point ' + code_point + ' could not be encoded.');
  }

  /** @interface */
  function Decoder() {}
  Decoder.prototype = {
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point, or |finished|.
     */
    handler: function(stream, bite) {}
  };

  /** @interface */
  function Encoder() {}
  Encoder.prototype = {
    /**
     * @param {Stream} stream The stream of code points being encoded.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit, or |finished|.
     */
    handler: function(stream, code_point) {}
  };

  

  
  

  /**
   * @param {string} label The encoding label.
   * @return {?{name:string,labels:Array.<string>}}
   */
  function getEncoding(label) {
    
    label = String(label).trim().toLowerCase();

    
    
    
    if (Object.prototype.hasOwnProperty.call(label_to_encoding, label)) {
      return label_to_encoding[label];
    }
    return null;
  }

  /**
   * Encodings table: https:
   * @const
   * @type {!Array.<{
   *          heading: string,
   *          encodings: Array.<{name:string,labels:Array.<string>}>
   *        }>}
   */
  var encodings = [
    {
      "encodings": [
        {
          "labels": [
            "unicode-1-1-utf-8",
            "utf-8",
            "utf8"
          ],
          "name": "UTF-8"
        }
      ],
      "heading": "The Encoding"
    },
    {
      "encodings": [
        {
          "labels": [
            "866",
            "cp866",
            "csibm866",
            "ibm866"
          ],
          "name": "IBM866"
        },
        {
          "labels": [
            "csisolatin2",
            "iso-8859-2",
            "iso-ir-101",
            "iso8859-2",
            "iso88592",
            "iso_8859-2",
            "iso_8859-2:1987",
            "l2",
            "latin2"
          ],
          "name": "ISO-8859-2"
        },
        {
          "labels": [
            "csisolatin3",
            "iso-8859-3",
            "iso-ir-109",
            "iso8859-3",
            "iso88593",
            "iso_8859-3",
            "iso_8859-3:1988",
            "l3",
            "latin3"
          ],
          "name": "ISO-8859-3"
        },
        {
          "labels": [
            "csisolatin4",
            "iso-8859-4",
            "iso-ir-110",
            "iso8859-4",
            "iso88594",
            "iso_8859-4",
            "iso_8859-4:1988",
            "l4",
            "latin4"
          ],
          "name": "ISO-8859-4"
        },
        {
          "labels": [
            "csisolatincyrillic",
            "cyrillic",
            "iso-8859-5",
            "iso-ir-144",
            "iso8859-5",
            "iso88595",
            "iso_8859-5",
            "iso_8859-5:1988"
          ],
          "name": "ISO-8859-5"
        },
        {
          "labels": [
            "arabic",
            "asmo-708",
            "csiso88596e",
            "csiso88596i",
            "csisolatinarabic",
            "ecma-114",
            "iso-8859-6",
            "iso-8859-6-e",
            "iso-8859-6-i",
            "iso-ir-127",
            "iso8859-6",
            "iso88596",
            "iso_8859-6",
            "iso_8859-6:1987"
          ],
          "name": "ISO-8859-6"
        },
        {
          "labels": [
            "csisolatingreek",
            "ecma-118",
            "elot_928",
            "greek",
            "greek8",
            "iso-8859-7",
            "iso-ir-126",
            "iso8859-7",
            "iso88597",
            "iso_8859-7",
            "iso_8859-7:1987",
            "sun_eu_greek"
          ],
          "name": "ISO-8859-7"
        },
        {
          "labels": [
            "csiso88598e",
            "csisolatinhebrew",
            "hebrew",
            "iso-8859-8",
            "iso-8859-8-e",
            "iso-ir-138",
            "iso8859-8",
            "iso88598",
            "iso_8859-8",
            "iso_8859-8:1988",
            "visual"
          ],
          "name": "ISO-8859-8"
        },
        {
          "labels": [
            "csiso88598i",
            "iso-8859-8-i",
            "logical"
          ],
          "name": "ISO-8859-8-I"
        },
        {
          "labels": [
            "csisolatin6",
            "iso-8859-10",
            "iso-ir-157",
            "iso8859-10",
            "iso885910",
            "l6",
            "latin6"
          ],
          "name": "ISO-8859-10"
        },
        {
          "labels": [
            "iso-8859-13",
            "iso8859-13",
            "iso885913"
          ],
          "name": "ISO-8859-13"
        },
        {
          "labels": [
            "iso-8859-14",
            "iso8859-14",
            "iso885914"
          ],
          "name": "ISO-8859-14"
        },
        {
          "labels": [
            "csisolatin9",
            "iso-8859-15",
            "iso8859-15",
            "iso885915",
            "iso_8859-15",
            "l9"
          ],
          "name": "ISO-8859-15"
        },
        {
          "labels": [
            "iso-8859-16"
          ],
          "name": "ISO-8859-16"
        },
        {
          "labels": [
            "cskoi8r",
            "koi",
            "koi8",
            "koi8-r",
            "koi8_r"
          ],
          "name": "KOI8-R"
        },
        {
          "labels": [
            "koi8-ru",
            "koi8-u"
          ],
          "name": "KOI8-U"
        },
        {
          "labels": [
            "csmacintosh",
            "mac",
            "macintosh",
            "x-mac-roman"
          ],
          "name": "macintosh"
        },
        {
          "labels": [
            "dos-874",
            "iso-8859-11",
            "iso8859-11",
            "iso885911",
            "tis-620",
            "windows-874"
          ],
          "name": "windows-874"
        },
        {
          "labels": [
            "cp1250",
            "windows-1250",
            "x-cp1250"
          ],
          "name": "windows-1250"
        },
        {
          "labels": [
            "cp1251",
            "windows-1251",
            "x-cp1251"
          ],
          "name": "windows-1251"
        },
        {
          "labels": [
            "ansi_x3.4-1968",
            "ascii",
            "cp1252",
            "cp819",
            "csisolatin1",
            "ibm819",
            "iso-8859-1",
            "iso-ir-100",
            "iso8859-1",
            "iso88591",
            "iso_8859-1",
            "iso_8859-1:1987",
            "l1",
            "latin1",
            "us-ascii",
            "windows-1252",
            "x-cp1252"
          ],
          "name": "windows-1252"
        },
        {
          "labels": [
            "cp1253",
            "windows-1253",
            "x-cp1253"
          ],
          "name": "windows-1253"
        },
        {
          "labels": [
            "cp1254",
            "csisolatin5",
            "iso-8859-9",
            "iso-ir-148",
            "iso8859-9",
            "iso88599",
            "iso_8859-9",
            "iso_8859-9:1989",
            "l5",
            "latin5",
            "windows-1254",
            "x-cp1254"
          ],
          "name": "windows-1254"
        },
        {
          "labels": [
            "cp1255",
            "windows-1255",
            "x-cp1255"
          ],
          "name": "windows-1255"
        },
        {
          "labels": [
            "cp1256",
            "windows-1256",
            "x-cp1256"
          ],
          "name": "windows-1256"
        },
        {
          "labels": [
            "cp1257",
            "windows-1257",
            "x-cp1257"
          ],
          "name": "windows-1257"
        },
        {
          "labels": [
            "cp1258",
            "windows-1258",
            "x-cp1258"
          ],
          "name": "windows-1258"
        },
        {
          "labels": [
            "x-mac-cyrillic",
            "x-mac-ukrainian"
          ],
          "name": "x-mac-cyrillic"
        }
      ],
      "heading": "Legacy single-byte encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "chinese",
            "csgb2312",
            "csiso58gb231280",
            "gb2312",
            "gb_2312",
            "gb_2312-80",
            "gbk",
            "iso-ir-58",
            "x-gbk"
          ],
          "name": "GBK"
        },
        {
          "labels": [
            "gb18030"
          ],
          "name": "gb18030"
        }
      ],
      "heading": "Legacy multi-byte Chinese (simplified) encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "big5",
            "big5-hkscs",
            "cn-big5",
            "csbig5",
            "x-x-big5"
          ],
          "name": "Big5"
        }
      ],
      "heading": "Legacy multi-byte Chinese (traditional) encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "cseucpkdfmtjapanese",
            "euc-jp",
            "x-euc-jp"
          ],
          "name": "EUC-JP"
        },
        {
          "labels": [
            "csiso2022jp",
            "iso-2022-jp"
          ],
          "name": "ISO-2022-JP"
        },
        {
          "labels": [
            "csshiftjis",
            "ms932",
            "ms_kanji",
            "shift-jis",
            "shift_jis",
            "sjis",
            "windows-31j",
            "x-sjis"
          ],
          "name": "Shift_JIS"
        }
      ],
      "heading": "Legacy multi-byte Japanese encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "cseuckr",
            "csksc56011987",
            "euc-kr",
            "iso-ir-149",
            "korean",
            "ks_c_5601-1987",
            "ks_c_5601-1989",
            "ksc5601",
            "ksc_5601",
            "windows-949"
          ],
          "name": "EUC-KR"
        }
      ],
      "heading": "Legacy multi-byte Korean encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "csiso2022kr",
            "hz-gb-2312",
            "iso-2022-cn",
            "iso-2022-cn-ext",
            "iso-2022-kr"
          ],
          "name": "replacement"
        },
        {
          "labels": [
            "utf-16be"
          ],
          "name": "UTF-16BE"
        },
        {
          "labels": [
            "utf-16",
            "utf-16le"
          ],
          "name": "UTF-16LE"
        },
        {
          "labels": [
            "x-user-defined"
          ],
          "name": "x-user-defined"
        }
      ],
      "heading": "Legacy miscellaneous encodings"
    }
  ];

  
  /** @type {Object.<string,{name:string,labels:Array.<string>}>} */
  var label_to_encoding = {};
  encodings.forEach(function(category) {
    category.encodings.forEach(function(encoding) {
      encoding.labels.forEach(function(label) {
        label_to_encoding[label] = encoding;
      });
    });
  });

  
  /** @type {Object.<string, function({fatal:boolean}): Encoder>} */
  var encoders = {};
  /** @type {Object.<string, function({fatal:boolean}): Decoder>} */
  var decoders = {};

  
  
  

  /**
   * @param {number} pointer The |pointer| to search for.
   * @param {(!Array.<?number>|undefined)} index The |index| to search within.
   * @return {?number} The code point corresponding to |pointer| in |index|,
   *     or null if |code point| is not in |index|.
   */
  function indexCodePointFor(pointer, index) {
    if (!index) return null;
    return index[pointer] || null;
  }

  /**
   * @param {number} code_point The |code point| to search for.
   * @param {!Array.<?number>} index The |index| to search within.
   * @return {?number} The first pointer corresponding to |code point| in
   *     |index|, or null if |code point| is not in |index|.
   */
  function indexPointerFor(code_point, index) {
    var pointer = index.indexOf(code_point);
    return pointer === -1 ? null : pointer;
  }

  /**
   * @param {string} name Name of the index.
   * @return {(!Array.<number>|!Array.<Array.<number>>)}
   *  */
  function index(name) {
    if (!('encoding-indexes' in global)) {
      throw Error("Indexes missing." +
                  " Did you forget to include encoding-indexes.js first?");
    }
    return global['encoding-indexes'][name];
  }

  /**
   * @param {number} pointer The |pointer| to search for in the gb18030 index.
   * @return {?number} The code point corresponding to |pointer| in |index|,
   *     or null if |code point| is not in the gb18030 index.
   */
  function indexGB18030RangesCodePointFor(pointer) {
    
    
    if ((pointer > 39419 && pointer < 189000) || (pointer > 1237575))
      return null;

    
    if (pointer === 7457) return 0xE7C7;

    
    
    
    var offset = 0;
    var code_point_offset = 0;
    var idx = index('gb18030-ranges');
    var i;
    for (i = 0; i < idx.length; ++i) {
      /** @type {!Array.<number>} */
      var entry = idx[i];
      if (entry[0] <= pointer) {
        offset = entry[0];
        code_point_offset = entry[1];
      } else {
        break;
      }
    }

    
    
    return code_point_offset + pointer - offset;
  }

  /**
   * @param {number} code_point The |code point| to locate in the gb18030 index.
   * @return {number} The first pointer corresponding to |code point| in the
   *     gb18030 index.
   */
  function indexGB18030RangesPointerFor(code_point) {
    
    if (code_point === 0xE7C7) return 7457;

    
    
    
    var offset = 0;
    var pointer_offset = 0;
    var idx = index('gb18030-ranges');
    var i;
    for (i = 0; i < idx.length; ++i) {
      /** @type {!Array.<number>} */
      var entry = idx[i];
      if (entry[1] <= code_point) {
        offset = entry[1];
        pointer_offset = entry[0];
      } else {
        break;
      }
    }

    
    
    return pointer_offset + code_point - offset;
  }

  /**
   * @param {number} code_point The |code_point| to search for in the Shift_JIS
   *     index.
   * @return {?number} The code point corresponding to |pointer| in |index|,
   *     or null if |code point| is not in the Shift_JIS index.
   */
  function indexShiftJISPointerFor(code_point) {
    
    
    shift_jis_index = shift_jis_index ||
      index('jis0208').map(function(code_point, pointer) {
        return inRange(pointer, 8272, 8835) ? null : code_point;
      });
    var index_ = shift_jis_index;

    
    return index_.indexOf(code_point);
  }
  var shift_jis_index;

  /**
   * @param {number} code_point The |code_point| to search for in the big5
   *     index.
   * @return {?number} The code point corresponding to |pointer| in |index|,
   *     or null if |code point| is not in the big5 index.
   */
  function indexBig5PointerFor(code_point) {
    
    big5_index_no_hkscs = big5_index_no_hkscs ||
      index('big5').map(function(code_point, pointer) {
        return (pointer < (0xA1 - 0x81) * 157) ? null : code_point;
      });
    var index_ = big5_index_no_hkscs;

    
    
    
    if (code_point === 0x2550 || code_point === 0x255E ||
        code_point === 0x2561 || code_point === 0x256A ||
        code_point === 0x5341 || code_point === 0x5345) {
      return index_.lastIndexOf(code_point);
    }

    
    return indexPointerFor(code_point, index_);
  }
  var big5_index_no_hkscs;

  
  
  

  /** @const */ var DEFAULT_ENCODING = 'utf-8';

  

  /**
   * @constructor
   * @param {string=} label The label of the encoding;
   *     defaults to 'utf-8'.
   * @param {Object=} options
   */
  function TextDecoder(label, options) {
    
    if (!(this instanceof TextDecoder))
      throw TypeError('Called as a function. Did you forget \'new\'?');
    label = label !== undefined ? String(label) : DEFAULT_ENCODING;
    options = ToDictionary(options);

    
    
    
    

    /** @private */
    this._encoding = null;
    /** @private @type {?Decoder} */
    this._decoder = null;
    /** @private @type {boolean} */
    this._ignoreBOM = false;
    /** @private @type {boolean} */
    this._BOMseen = false;
    /** @private @type {string} */
    this._error_mode = 'replacement';
    /** @private @type {boolean} */
    this._do_not_flush = false;


    
    
    var encoding = getEncoding(label);

    
    if (encoding === null || encoding.name === 'replacement')
      throw RangeError('Unknown encoding: ' + label);
    if (!decoders[encoding.name]) {
      throw Error('Decoder not present.' +
                  ' Did you forget to include encoding-indexes.js first?');
    }

    
    var dec = this;

    
    dec._encoding = encoding;

    
    
    if (Boolean(options['fatal']))
      dec._error_mode = 'fatal';

    
    
    if (Boolean(options['ignoreBOM']))
      dec._ignoreBOM = true;

    
    if (!Object.defineProperty) {
      this.encoding = dec._encoding.name.toLowerCase();
      this.fatal = dec._error_mode === 'fatal';
      this.ignoreBOM = dec._ignoreBOM;
    }

    
    return dec;
  }

  if (Object.defineProperty) {
    
    Object.defineProperty(TextDecoder.prototype, 'encoding', {
      /** @this {TextDecoder} */
      get: function() { return this._encoding.name.toLowerCase(); }
    });

    
    
    Object.defineProperty(TextDecoder.prototype, 'fatal', {
      /** @this {TextDecoder} */
      get: function() { return this._error_mode === 'fatal'; }
    });

    
    
    Object.defineProperty(TextDecoder.prototype, 'ignoreBOM', {
      /** @this {TextDecoder} */
      get: function() { return this._ignoreBOM; }
    });
  }

  /**
   * @param {BufferSource=} input The buffer of bytes to decode.
   * @param {Object=} options
   * @return {string} The decoded string.
   */
  TextDecoder.prototype.decode = function decode(input, options) {
    var bytes;
    if (typeof input === 'object' && input instanceof ArrayBuffer) {
      bytes = new Uint8Array(input);
    } else if (typeof input === 'object' && 'buffer' in input &&
               input.buffer instanceof ArrayBuffer) {
      bytes = new Uint8Array(input.buffer,
                             input.byteOffset,
                             input.byteLength);
    } else {
      bytes = new Uint8Array(0);
    }

    options = ToDictionary(options);

    
    
    
    if (!this._do_not_flush) {
      this._decoder = decoders[this._encoding.name]({
        fatal: this._error_mode === 'fatal'});
      this._BOMseen = false;
    }

    
    
    this._do_not_flush = Boolean(options['stream']);

    
    
    var input_stream = new Stream(bytes);

    
    var output = [];

    /** @type {?(number|!Array.<number>)} */
    var result;

    
    while (true) {
      
      var token = input_stream.read();

      
      
      
      if (token === end_of_stream)
        break;

      

      
      
      result = this._decoder.handler(input_stream, token);

      
      if (result === finished)
        break;

      if (result !== null) {
        if (Array.isArray(result))
          output.push.apply(output, /**@type {!Array.<number>}*/(result));
        else
          output.push(result);
      }

      
      

      
    }
    
    if (!this._do_not_flush) {
      do {
        result = this._decoder.handler(input_stream, input_stream.read());
        if (result === finished)
          break;
        if (result === null)
          continue;
        if (Array.isArray(result))
          output.push.apply(output, /**@type {!Array.<number>}*/(result));
        else
          output.push(result);
      } while (!input_stream.endOfStream());
      this._decoder = null;
    }

    
    
    /**
     * @param {!Array.<number>} stream
     * @return {string}
     * @this {TextDecoder}
     */
    function serializeStream(stream) {
      
      

      
      
      if (includes(['UTF-8', 'UTF-16LE', 'UTF-16BE'], this._encoding.name) &&
          !this._ignoreBOM && !this._BOMseen) {
        if (stream.length > 0 && stream[0] === 0xFEFF) {
          
          this._BOMseen = true;
          stream.shift();
        } else if (stream.length > 0) {
          
          
          this._BOMseen = true;
        } else {
          
          
          
        }
      }
      
      return codePointsToString(stream);
    }

    return serializeStream.call(this, output);
  };

  

  /**
   * @constructor
   * @param {string=} label The label of the encoding. NONSTANDARD.
   * @param {Object=} options NONSTANDARD.
   */
  function TextEncoder(label, options) {
    
    if (!(this instanceof TextEncoder))
      throw TypeError('Called as a function. Did you forget \'new\'?');
    options = ToDictionary(options);

    

    /** @private */
    this._encoding = null;
    /** @private @type {?Encoder} */
    this._encoder = null;

    
    /** @private @type {boolean} */
    this._do_not_flush = false;
    /** @private @type {string} */
    this._fatal = Boolean(options['fatal']) ? 'fatal' : 'replacement';

    
    var enc = this;

    
    if (Boolean(options['NONSTANDARD_allowLegacyEncoding'])) {
      
      label = label !== undefined ? String(label) : DEFAULT_ENCODING;
      var encoding = getEncoding(label);
      if (encoding === null || encoding.name === 'replacement')
        throw RangeError('Unknown encoding: ' + label);
      if (!encoders[encoding.name]) {
        throw Error('Encoder not present.' +
                    ' Did you forget to include encoding-indexes.js first?');
      }
      enc._encoding = encoding;
    } else {
      
      enc._encoding = getEncoding('utf-8');

      if (label !== undefined && 'console' in global) {
        console.warn('TextEncoder constructor called with encoding label, '
                     + 'which is ignored.');
      }
    }

    
    if (!Object.defineProperty)
      this.encoding = enc._encoding.name.toLowerCase();

    
    return enc;
  }

  if (Object.defineProperty) {
    
    Object.defineProperty(TextEncoder.prototype, 'encoding', {
      /** @this {TextEncoder} */
      get: function() { return this._encoding.name.toLowerCase(); }
    });
  }

  /**
   * @param {string=} opt_string The string to encode.
   * @param {Object=} options
   * @return {!Uint8Array} Encoded bytes, as a Uint8Array.
   */
  TextEncoder.prototype.encode = function encode(opt_string, options) {
    opt_string = opt_string === undefined ? '' : String(opt_string);
    options = ToDictionary(options);

    
    
    
    if (!this._do_not_flush)
      this._encoder = encoders[this._encoding.name]({
        fatal: this._fatal === 'fatal'});
    this._do_not_flush = Boolean(options['stream']);

    
    var input = new Stream(stringToCodePoints(opt_string));

    
    var output = [];

    /** @type {?(number|!Array.<number>)} */
    var result;
    
    while (true) {
      
      var token = input.read();
      if (token === end_of_stream)
        break;
      
      
      result = this._encoder.handler(input, token);
      if (result === finished)
        break;
      if (Array.isArray(result))
        output.push.apply(output, /**@type {!Array.<number>}*/(result));
      else
        output.push(result);
    }
    
    if (!this._do_not_flush) {
      while (true) {
        result = this._encoder.handler(input, input.read());
        if (result === finished)
          break;
        if (Array.isArray(result))
          output.push.apply(output, /**@type {!Array.<number>}*/(result));
        else
          output.push(result);
      }
      this._encoder = null;
    }
    
    
    
    return new Uint8Array(output);
  };


  
  
  

  

  
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function UTF8Decoder(options) {
    var fatal = options.fatal;

    
    
    
    
    var /** @type {number} */ utf8_code_point = 0,
        /** @type {number} */ utf8_bytes_seen = 0,
        /** @type {number} */ utf8_bytes_needed = 0,
        /** @type {number} */ utf8_lower_boundary = 0x80,
        /** @type {number} */ utf8_upper_boundary = 0xBF;

    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      
      
      if (bite === end_of_stream && utf8_bytes_needed !== 0) {
        utf8_bytes_needed = 0;
        return decoderError(fatal);
      }

      
      if (bite === end_of_stream)
        return finished;

      
      if (utf8_bytes_needed === 0) {

        
        if (inRange(bite, 0x00, 0x7F)) {
          
          return bite;
        }

        
        else if (inRange(bite, 0xC2, 0xDF)) {
          
          utf8_bytes_needed = 1;

          
          utf8_code_point = bite & 0x1F;
        }

        
        else if (inRange(bite, 0xE0, 0xEF)) {
          
          if (bite === 0xE0)
            utf8_lower_boundary = 0xA0;
          
          if (bite === 0xED)
            utf8_upper_boundary = 0x9F;
          
          utf8_bytes_needed = 2;
          
          utf8_code_point = bite & 0xF;
        }

        
        else if (inRange(bite, 0xF0, 0xF4)) {
          
          if (bite === 0xF0)
            utf8_lower_boundary = 0x90;
          
          if (bite === 0xF4)
            utf8_upper_boundary = 0x8F;
          
          utf8_bytes_needed = 3;
          
          utf8_code_point = bite & 0x7;
        }

        
        else {
          
          return decoderError(fatal);
        }

        
        return null;
      }

      
      
      if (!inRange(bite, utf8_lower_boundary, utf8_upper_boundary)) {

        
        
        
        utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;
        utf8_lower_boundary = 0x80;
        utf8_upper_boundary = 0xBF;

        
        stream.prepend(bite);

        
        return decoderError(fatal);
      }

      
      
      utf8_lower_boundary = 0x80;
      utf8_upper_boundary = 0xBF;

      
      
      utf8_code_point = (utf8_code_point << 6) | (bite & 0x3F);

      
      utf8_bytes_seen += 1;

      
      
      if (utf8_bytes_seen !== utf8_bytes_needed)
        return null;

      
      var code_point = utf8_code_point;

      
      
      utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;

      
      return code_point;
    };
  }

  
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function UTF8Encoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      
      if (code_point === end_of_stream)
        return finished;

      
      
      if (isASCIICodePoint(code_point))
        return code_point;

      
      var count, offset;
      
      if (inRange(code_point, 0x0080, 0x07FF)) {
        
        count = 1;
        offset = 0xC0;
      }
      
      else if (inRange(code_point, 0x0800, 0xFFFF)) {
        
        count = 2;
        offset = 0xE0;
      }
      
      else if (inRange(code_point, 0x10000, 0x10FFFF)) {
        
        count = 3;
        offset = 0xF0;
      }

      
      
      var bytes = [(code_point >> (6 * count)) + offset];

      
      while (count > 0) {

        
        var temp = code_point >> (6 * (count - 1));

        
        bytes.push(0x80 | (temp & 0x3F));

        
        count -= 1;
      }

      
      return bytes;
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['UTF-8'] = function(options) {
    return new UTF8Encoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['UTF-8'] = function(options) {
    return new UTF8Decoder(options);
  };

  
  
  

  
  /**
   * @constructor
   * @implements {Decoder}
   * @param {!Array.<number>} index The encoding index.
   * @param {{fatal: boolean}} options
   */
  function SingleByteDecoder(index, options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      
      if (bite === end_of_stream)
        return finished;

      
      
      if (isASCIIByte(bite))
        return bite;

      
      
      var code_point = index[bite - 0x80];

      
      if (code_point === null)
        return decoderError(fatal);

      
      return code_point;
    };
  }

  
  /**
   * @constructor
   * @implements {Encoder}
   * @param {!Array.<?number>} index The encoding index.
   * @param {{fatal: boolean}} options
   */
  function SingleByteEncoder(index, options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      
      if (code_point === end_of_stream)
        return finished;

      
      
      if (isASCIICodePoint(code_point))
        return code_point;

      
      
      var pointer = indexPointerFor(code_point, index);

      
      if (pointer === null)
        encoderError(code_point);

      
      return pointer + 0x80;
    };
  }

  (function() {
    if (!('encoding-indexes' in global))
      return;
    encodings.forEach(function(category) {
      if (category.heading !== 'Legacy single-byte encodings')
        return;
      category.encodings.forEach(function(encoding) {
        var name = encoding.name;
        var idx = index(name.toLowerCase());
        /** @param {{fatal: boolean}} options */
        decoders[name] = function(options) {
          return new SingleByteDecoder(idx, options);
        };
        /** @param {{fatal: boolean}} options */
        encoders[name] = function(options) {
          return new SingleByteEncoder(idx, options);
        };
      });
    });
  }());

  
  
  

  

  
  
  /** @param {{fatal: boolean}} options */
  decoders['GBK'] = function(options) {
    return new GB18030Decoder(options);
  };

  
  
  /** @param {{fatal: boolean}} options */
  encoders['GBK'] = function(options) {
    return new GB18030Encoder(options, true);
  };

  

  
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function GB18030Decoder(options) {
    var fatal = options.fatal;
    
    
    var /** @type {number} */ gb18030_first = 0x00,
        /** @type {number} */ gb18030_second = 0x00,
        /** @type {number} */ gb18030_third = 0x00;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      
      
      if (bite === end_of_stream && gb18030_first === 0x00 &&
          gb18030_second === 0x00 && gb18030_third === 0x00) {
        return finished;
      }
      
      
      
      if (bite === end_of_stream &&
          (gb18030_first !== 0x00 || gb18030_second !== 0x00 ||
           gb18030_third !== 0x00)) {
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        gb18030_third = 0x00;
        decoderError(fatal);
      }
      var code_point;
      
      if (gb18030_third !== 0x00) {
        
        code_point = null;
        
        
        
        
        if (inRange(bite, 0x30, 0x39)) {
          code_point = indexGB18030RangesCodePointFor(
              (((gb18030_first - 0x81) * 10 + gb18030_second - 0x30) * 126 +
               gb18030_third - 0x81) * 10 + bite - 0x30);
        }

        
        
        var buffer = [gb18030_second, gb18030_third, bite];

        
        
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        gb18030_third = 0x00;

        
        
        if (code_point === null) {
          stream.prepend(buffer);
          return decoderError(fatal);
        }

        
        return code_point;
      }

      
      if (gb18030_second !== 0x00) {

        
        
        if (inRange(bite, 0x81, 0xFE)) {
          gb18030_third = bite;
          return null;
        }

        
        
        stream.prepend([gb18030_second, bite]);
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        return decoderError(fatal);
      }

      
      if (gb18030_first !== 0x00) {

        
        
        if (inRange(bite, 0x30, 0x39)) {
          gb18030_second = bite;
          return null;
        }

        
        
        var lead = gb18030_first;
        var pointer = null;
        gb18030_first = 0x00;

        
        
        var offset = bite < 0x7F ? 0x40 : 0x41;

        
        
        
        if (inRange(bite, 0x40, 0x7E) || inRange(bite, 0x80, 0xFE))
          pointer = (lead - 0x81) * 190 + (bite - offset);

        
        
        code_point = pointer === null ? null :
            indexCodePointFor(pointer, index('gb18030'));

        
        
        if (code_point === null && isASCIIByte(bite))
          stream.prepend(bite);

        
        if (code_point === null)
          return decoderError(fatal);

        
        return code_point;
      }

      
      
      if (isASCIIByte(bite))
        return bite;

      
      if (bite === 0x80)
        return 0x20AC;

      
      
      if (inRange(bite, 0x81, 0xFE)) {
        gb18030_first = bite;
        return null;
      }

      
      return decoderError(fatal);
    };
  }

  
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   * @param {boolean=} gbk_flag
   */
  function GB18030Encoder(options, gbk_flag) {
    var fatal = options.fatal;
    
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      
      if (code_point === end_of_stream)
        return finished;

      
      
      if (isASCIICodePoint(code_point))
        return code_point;

      
      if (code_point === 0xE5E5)
        return encoderError(code_point);

      
      
      if (gbk_flag && code_point === 0x20AC)
        return 0x80;

      
      
      var pointer = indexPointerFor(code_point, index('gb18030'));

      
      if (pointer !== null) {

        
        var lead = floor(pointer / 190) + 0x81;

        
        var trail = pointer % 190;

        
        var offset = trail < 0x3F ? 0x40 : 0x41;

        
        return [lead, trail + offset];
      }

      
      if (gbk_flag)
        return encoderError(code_point);

      
      
      pointer = indexGB18030RangesPointerFor(code_point);

      
      var byte1 = floor(pointer / 10 / 126 / 10);

      
      pointer = pointer - byte1 * 10 * 126 * 10;

      
      var byte2 = floor(pointer / 10 / 126);

      
      pointer = pointer - byte2 * 10 * 126;

      
      var byte3 = floor(pointer / 10);

      
      var byte4 = pointer - byte3 * 10;

      
      
      return [byte1 + 0x81,
              byte2 + 0x30,
              byte3 + 0x81,
              byte4 + 0x30];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['gb18030'] = function(options) {
    return new GB18030Encoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['gb18030'] = function(options) {
    return new GB18030Decoder(options);
  };


  
  
  

  

  
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function Big5Decoder(options) {
    var fatal = options.fatal;
    
    var /** @type {number} */ Big5_lead = 0x00;

    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      
      
      if (bite === end_of_stream && Big5_lead !== 0x00) {
        Big5_lead = 0x00;
        return decoderError(fatal);
      }

      
      
      if (bite === end_of_stream && Big5_lead === 0x00)
        return finished;

      
      
      
      if (Big5_lead !== 0x00) {
        var lead = Big5_lead;
        var pointer = null;
        Big5_lead = 0x00;

        
        
        var offset = bite < 0x7F ? 0x40 : 0x62;

        
        
        
        if (inRange(bite, 0x40, 0x7E) || inRange(bite, 0xA1, 0xFE))
          pointer = (lead - 0x81) * 157 + (bite - offset);

        
        
        
        
        
        
        
        
        
        switch (pointer) {
          case 1133: return [0x00CA, 0x0304];
          case 1135: return [0x00CA, 0x030C];
          case 1164: return [0x00EA, 0x0304];
          case 1166: return [0x00EA, 0x030C];
        }

        
        
        var code_point = (pointer === null) ? null :
            indexCodePointFor(pointer, index('big5'));

        
        
        if (code_point === null && isASCIIByte(bite))
          stream.prepend(bite);

        
        if (code_point === null)
          return decoderError(fatal);

        
        return code_point;
      }

      
      
      if (isASCIIByte(bite))
        return bite;

      
      
      if (inRange(bite, 0x81, 0xFE)) {
        Big5_lead = bite;
        return null;
      }

      
      return decoderError(fatal);
    };
  }

  
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function Big5Encoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      
      if (code_point === end_of_stream)
        return finished;

      
      
      if (isASCIICodePoint(code_point))
        return code_point;

      
      var pointer = indexBig5PointerFor(code_point);

      
      if (pointer === null)
        return encoderError(code_point);

      
      var lead = floor(pointer / 157) + 0x81;

      
      if (lead < 0xA1)
        return encoderError(code_point);

      
      var trail = pointer % 157;

      
      
      var offset = trail < 0x3F ? 0x40 : 0x62;

      
      return [lead, trail + offset];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['Big5'] = function(options) {
    return new Big5Encoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['Big5'] = function(options) {
    return new Big5Decoder(options);
  };


  
  
  

  

  
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function EUCJPDecoder(options) {
    var fatal = options.fatal;

    
    
    var /** @type {boolean} */ eucjp_jis0212_flag = false,
        /** @type {number} */ eucjp_lead = 0x00;

    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      
      
      if (bite === end_of_stream && eucjp_lead !== 0x00) {
        eucjp_lead = 0x00;
        return decoderError(fatal);
      }

      
      
      if (bite === end_of_stream && eucjp_lead === 0x00)
        return finished;

      
      
      
      if (eucjp_lead === 0x8E && inRange(bite, 0xA1, 0xDF)) {
        eucjp_lead = 0x00;
        return 0xFF61 - 0xA1 + bite;
      }

      
      
      
      if (eucjp_lead === 0x8F && inRange(bite, 0xA1, 0xFE)) {
        eucjp_jis0212_flag = true;
        eucjp_lead = bite;
        return null;
      }

      
      
      if (eucjp_lead !== 0x00) {
        var lead = eucjp_lead;
        eucjp_lead = 0x00;

        
        var code_point = null;

        
        
        
        
        if (inRange(lead, 0xA1, 0xFE) && inRange(bite, 0xA1, 0xFE)) {
          code_point = indexCodePointFor(
            (lead - 0xA1) * 94 + (bite - 0xA1),
            index(!eucjp_jis0212_flag ? 'jis0208' : 'jis0212'));
        }

        
        eucjp_jis0212_flag = false;

        
        
        if (!inRange(bite, 0xA1, 0xFE))
          stream.prepend(bite);

        
        if (code_point === null)
          return decoderError(fatal);

        
        return code_point;
      }

      
      
      if (isASCIIByte(bite))
        return bite;

      
      
      if (bite === 0x8E || bite === 0x8F || inRange(bite, 0xA1, 0xFE)) {
        eucjp_lead = bite;
        return null;
      }

      
      return decoderError(fatal);
    };
  }

  
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function EUCJPEncoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      
      if (code_point === end_of_stream)
        return finished;

      
      
      if (isASCIICodePoint(code_point))
        return code_point;

      
      if (code_point === 0x00A5)
        return 0x5C;

      
      if (code_point === 0x203E)
        return 0x7E;

      
      
      
      if (inRange(code_point, 0xFF61, 0xFF9F))
        return [0x8E, code_point - 0xFF61 + 0xA1];

      
      if (code_point === 0x2212)
        code_point = 0xFF0D;

      
      
      var pointer = indexPointerFor(code_point, index('jis0208'));

      
      if (pointer === null)
        return encoderError(code_point);

      
      var lead = floor(pointer / 94) + 0xA1;

      
      var trail = pointer % 94 + 0xA1;

      
      return [lead, trail];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['EUC-JP'] = function(options) {
    return new EUCJPEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['EUC-JP'] = function(options) {
    return new EUCJPDecoder(options);
  };

  

  
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function ISO2022JPDecoder(options) {
    var fatal = options.fatal;
    /** @enum */
    var states = {
      ASCII: 0,
      Roman: 1,
      Katakana: 2,
      LeadByte: 3,
      TrailByte: 4,
      EscapeStart: 5,
      Escape: 6
    };
    
    
    
    
    var /** @type {number} */ iso2022jp_decoder_state = states.ASCII,
        /** @type {number} */ iso2022jp_decoder_output_state = states.ASCII,
        /** @type {number} */ iso2022jp_lead = 0x00,
        /** @type {boolean} */ iso2022jp_output_flag = false;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      
      switch (iso2022jp_decoder_state) {
      default:
      case states.ASCII:
        
        

        
        if (bite === 0x1B) {
          
          
          iso2022jp_decoder_state = states.EscapeStart;
          return null;
        }

        
        if (inRange(bite, 0x00, 0x7F) && bite !== 0x0E
            && bite !== 0x0F && bite !== 0x1B) {
          
          
          iso2022jp_output_flag = false;
          return bite;
        }

        
        if (bite === end_of_stream) {
          
          return finished;
        }

        
        
        iso2022jp_output_flag = false;
        return decoderError(fatal);

      case states.Roman:
        
        

        
        if (bite === 0x1B) {
          
          
          iso2022jp_decoder_state = states.EscapeStart;
          return null;
        }

        
        if (bite === 0x5C) {
          
          
          iso2022jp_output_flag = false;
          return 0x00A5;
        }

        
        if (bite === 0x7E) {
          
          
          iso2022jp_output_flag = false;
          return 0x203E;
        }

        
        if (inRange(bite, 0x00, 0x7F) && bite !== 0x0E && bite !== 0x0F
            && bite !== 0x1B && bite !== 0x5C && bite !== 0x7E) {
          
          
          iso2022jp_output_flag = false;
          return bite;
        }

        
        if (bite === end_of_stream) {
          
          return finished;
        }

        
        
        iso2022jp_output_flag = false;
        return decoderError(fatal);

      case states.Katakana:
        
        

        
        if (bite === 0x1B) {
          
          
          iso2022jp_decoder_state = states.EscapeStart;
          return null;
        }

        
        if (inRange(bite, 0x21, 0x5F)) {
          
          
          iso2022jp_output_flag = false;
          return 0xFF61 - 0x21 + bite;
        }

        
        if (bite === end_of_stream) {
          
          return finished;
        }

        
        
        iso2022jp_output_flag = false;
        return decoderError(fatal);

      case states.LeadByte:
        
        

        
        if (bite === 0x1B) {
          
          
          iso2022jp_decoder_state = states.EscapeStart;
          return null;
        }

        
        if (inRange(bite, 0x21, 0x7E)) {
          
          
          
          iso2022jp_output_flag = false;
          iso2022jp_lead = bite;
          iso2022jp_decoder_state = states.TrailByte;
          return null;
        }

        
        if (bite === end_of_stream) {
          
          return finished;
        }

        
        
        iso2022jp_output_flag = false;
        return decoderError(fatal);

      case states.TrailByte:
        
        

        
        if (bite === 0x1B) {
          
          
          iso2022jp_decoder_state = states.EscapeStart;
          return decoderError(fatal);
        }

        
        if (inRange(bite, 0x21, 0x7E)) {
          
          iso2022jp_decoder_state = states.LeadByte;

          
          var pointer = (iso2022jp_lead - 0x21) * 94 + bite - 0x21;

          
          
          var code_point = indexCodePointFor(pointer, index('jis0208'));

          
          if (code_point === null)
            return decoderError(fatal);

          
          return code_point;
        }

        
        if (bite === end_of_stream) {
          
          
          iso2022jp_decoder_state = states.LeadByte;
          stream.prepend(bite);
          return decoderError(fatal);
        }

        
        
        
        iso2022jp_decoder_state = states.LeadByte;
        return decoderError(fatal);

      case states.EscapeStart:
        

        
        
        
        if (bite === 0x24 || bite === 0x28) {
          iso2022jp_lead = bite;
          iso2022jp_decoder_state = states.Escape;
          return null;
        }

        
        stream.prepend(bite);

        
        
        
        iso2022jp_output_flag = false;
        iso2022jp_decoder_state = iso2022jp_decoder_output_state;
        return decoderError(fatal);

      case states.Escape:
        

        
        
        var lead = iso2022jp_lead;
        iso2022jp_lead = 0x00;

        
        var state = null;

        
        if (lead === 0x28 && bite === 0x42)
          state = states.ASCII;

        
        if (lead === 0x28 && bite === 0x4A)
          state = states.Roman;

        
        if (lead === 0x28 && bite === 0x49)
          state = states.Katakana;

        
        
        if (lead === 0x24 && (bite === 0x40 || bite === 0x42))
          state = states.LeadByte;

        
        if (state !== null) {
          
          
          iso2022jp_decoder_state = iso2022jp_decoder_state = state;

          
          var output_flag = iso2022jp_output_flag;

          
          iso2022jp_output_flag = true;

          
          
          return !output_flag ? null : decoderError(fatal);
        }

        
        stream.prepend([lead, bite]);

        
        
        
        iso2022jp_output_flag = false;
        iso2022jp_decoder_state = iso2022jp_decoder_output_state;
        return decoderError(fatal);
      }
    };
  }

  
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function ISO2022JPEncoder(options) {
    var fatal = options.fatal;
    
    
    
    /** @enum */
    var states = {
      ASCII: 0,
      Roman: 1,
      jis0208: 2
    };
    var /** @type {number} */ iso2022jp_state = states.ASCII;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      
      
      
      
      if (code_point === end_of_stream &&
          iso2022jp_state !== states.ASCII) {
        stream.prepend(code_point);
        iso2022jp_state = states.ASCII;
        return [0x1B, 0x28, 0x42];
      }

      
      
      if (code_point === end_of_stream && iso2022jp_state === states.ASCII)
        return finished;

      
      
      if ((iso2022jp_state === states.ASCII ||
           iso2022jp_state === states.Roman) &&
          (code_point === 0x000E || code_point === 0x000F ||
           code_point === 0x001B)) {
        return encoderError(0xFFFD);
      }

      
      
      if (iso2022jp_state === states.ASCII &&
          isASCIICodePoint(code_point))
        return code_point;

      
      
      
      if (iso2022jp_state === states.Roman &&
          ((isASCIICodePoint(code_point) &&
           code_point !== 0x005C && code_point !== 0x007E) ||
          (code_point == 0x00A5 || code_point == 0x203E))) {

        
        
        if (isASCIICodePoint(code_point))
          return code_point;

        
        if (code_point === 0x00A5)
          return 0x5C;

        
        if (code_point === 0x203E)
          return 0x7E;
      }

      
      
      
      
      if (isASCIICodePoint(code_point) &&
          iso2022jp_state !== states.ASCII) {
        stream.prepend(code_point);
        iso2022jp_state = states.ASCII;
        return [0x1B, 0x28, 0x42];
      }

      
      
      
      
      if ((code_point === 0x00A5 || code_point === 0x203E) &&
          iso2022jp_state !== states.Roman) {
        stream.prepend(code_point);
        iso2022jp_state = states.Roman;
        return [0x1B, 0x28, 0x4A];
      }

      
      if (code_point === 0x2212)
        code_point = 0xFF0D;

      
      
      var pointer = indexPointerFor(code_point, index('jis0208'));

      
      if (pointer === null)
        return encoderError(code_point);

      
      
      
      if (iso2022jp_state !== states.jis0208) {
        stream.prepend(code_point);
        iso2022jp_state = states.jis0208;
        return [0x1B, 0x24, 0x42];
      }

      
      var lead = floor(pointer / 94) + 0x21;

      
      var trail = pointer % 94 + 0x21;

      
      return [lead, trail];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['ISO-2022-JP'] = function(options) {
    return new ISO2022JPEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['ISO-2022-JP'] = function(options) {
    return new ISO2022JPDecoder(options);
  };

  

  
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function ShiftJISDecoder(options) {
    var fatal = options.fatal;
    
    
    var /** @type {number} */ Shift_JIS_lead = 0x00;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      
      
      if (bite === end_of_stream && Shift_JIS_lead !== 0x00) {
        Shift_JIS_lead = 0x00;
        return decoderError(fatal);
      }

      
      
      if (bite === end_of_stream && Shift_JIS_lead === 0x00)
        return finished;

      
      
      
      if (Shift_JIS_lead !== 0x00) {
        var lead = Shift_JIS_lead;
        var pointer = null;
        Shift_JIS_lead = 0x00;

        
        
        var offset = (bite < 0x7F) ? 0x40 : 0x41;

        
        
        var lead_offset = (lead < 0xA0) ? 0x81 : 0xC1;

        
        
        
        if (inRange(bite, 0x40, 0x7E) || inRange(bite, 0x80, 0xFC))
          pointer = (lead - lead_offset) * 188 + bite - offset;

        
        
        if (inRange(pointer, 8836, 10715))
          return 0xE000 - 8836 + pointer;

        
        
        var code_point = (pointer === null) ? null :
              indexCodePointFor(pointer, index('jis0208'));

        
        
        if (code_point === null && isASCIIByte(bite))
          stream.prepend(bite);

        
        if (code_point === null)
          return decoderError(fatal);

        
        return code_point;
      }

      
      
      if (isASCIIByte(bite) || bite === 0x80)
        return bite;

      
      
      if (inRange(bite, 0xA1, 0xDF))
        return 0xFF61 - 0xA1 + bite;

      
      
      
      if (inRange(bite, 0x81, 0x9F) || inRange(bite, 0xE0, 0xFC)) {
        Shift_JIS_lead = bite;
        return null;
      }

      
      return decoderError(fatal);
    };
  }

  
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function ShiftJISEncoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      
      if (code_point === end_of_stream)
        return finished;

      
      
      if (isASCIICodePoint(code_point) || code_point === 0x0080)
        return code_point;

      
      if (code_point === 0x00A5)
        return 0x5C;

      
      if (code_point === 0x203E)
        return 0x7E;

      
      
      if (inRange(code_point, 0xFF61, 0xFF9F))
        return code_point - 0xFF61 + 0xA1;

      
      if (code_point === 0x2212)
        code_point = 0xFF0D;

      
      var pointer = indexShiftJISPointerFor(code_point);

      
      if (pointer === null)
        return encoderError(code_point);

      
      var lead = floor(pointer / 188);

      
      
      var lead_offset = (lead < 0x1F) ? 0x81 : 0xC1;

      
      var trail = pointer % 188;

      
      
      var offset = (trail < 0x3F) ? 0x40 : 0x41;

      
      
      return [lead + lead_offset, trail + offset];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['Shift_JIS'] = function(options) {
    return new ShiftJISEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['Shift_JIS'] = function(options) {
    return new ShiftJISDecoder(options);
  };

  
  
  

  

  
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function EUCKRDecoder(options) {
    var fatal = options.fatal;

    
    var /** @type {number} */ euckr_lead = 0x00;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      
      
      if (bite === end_of_stream && euckr_lead !== 0) {
        euckr_lead = 0x00;
        return decoderError(fatal);
      }

      
      
      if (bite === end_of_stream && euckr_lead === 0)
        return finished;

      
      
      
      if (euckr_lead !== 0x00) {
        var lead = euckr_lead;
        var pointer = null;
        euckr_lead = 0x00;

        
        
        if (inRange(bite, 0x41, 0xFE))
          pointer = (lead - 0x81) * 190 + (bite - 0x41);

        
        
        var code_point = (pointer === null)
              ? null : indexCodePointFor(pointer, index('euc-kr'));

        
        
        if (pointer === null && isASCIIByte(bite))
          stream.prepend(bite);

        
        if (code_point === null)
          return decoderError(fatal);

        
        return code_point;
      }

      
      
      if (isASCIIByte(bite))
        return bite;

      
      
      if (inRange(bite, 0x81, 0xFE)) {
        euckr_lead = bite;
        return null;
      }

      
      return decoderError(fatal);
    };
  }

  
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function EUCKREncoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      
      if (code_point === end_of_stream)
        return finished;

      
      
      if (isASCIICodePoint(code_point))
        return code_point;

      
      
      var pointer = indexPointerFor(code_point, index('euc-kr'));

      
      if (pointer === null)
        return encoderError(code_point);

      
      var lead = floor(pointer / 190) + 0x81;

      
      var trail = (pointer % 190) + 0x41;

      
      return [lead, trail];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['EUC-KR'] = function(options) {
    return new EUCKREncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['EUC-KR'] = function(options) {
    return new EUCKRDecoder(options);
  };


  
  
  

  

  

  

  /**
   * @param {number} code_unit
   * @param {boolean} utf16be
   * @return {!Array.<number>} bytes
   */
  function convertCodeUnitToBytes(code_unit, utf16be) {
    
    var byte1 = code_unit >> 8;

    
    var byte2 = code_unit & 0x00FF;

    
        
    if (utf16be)
      return [byte1, byte2];
    
    return [byte2, byte1];
  }

  
  /**
   * @constructor
   * @implements {Decoder}
   * @param {boolean} utf16_be True if big-endian, false if little-endian.
   * @param {{fatal: boolean}} options
   */
  function UTF16Decoder(utf16_be, options) {
    var fatal = options.fatal;
    var /** @type {?number} */ utf16_lead_byte = null,
        /** @type {?number} */ utf16_lead_surrogate = null;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      
      
      
      if (bite === end_of_stream && (utf16_lead_byte !== null ||
                                utf16_lead_surrogate !== null)) {
        return decoderError(fatal);
      }

      
      
      if (bite === end_of_stream && utf16_lead_byte === null &&
          utf16_lead_surrogate === null) {
        return finished;
      }

      
      
      if (utf16_lead_byte === null) {
        utf16_lead_byte = bite;
        return null;
      }

      
      var code_unit;
      if (utf16_be) {
        
        
        code_unit = (utf16_lead_byte << 8) + bite;
      } else {
        
        
        code_unit = (bite << 8) + utf16_lead_byte;
      }
      
      utf16_lead_byte = null;

      
      
      
      if (utf16_lead_surrogate !== null) {
        var lead_surrogate = utf16_lead_surrogate;
        utf16_lead_surrogate = null;

        
        
        
        if (inRange(code_unit, 0xDC00, 0xDFFF)) {
          return 0x10000 + (lead_surrogate - 0xD800) * 0x400 +
              (code_unit - 0xDC00);
        }

        
        
        
        stream.prepend(convertCodeUnitToBytes(code_unit, utf16_be));
        return decoderError(fatal);
      }

      
      
      if (inRange(code_unit, 0xD800, 0xDBFF)) {
        utf16_lead_surrogate = code_unit;
        return null;
      }

      
      
      if (inRange(code_unit, 0xDC00, 0xDFFF))
        return decoderError(fatal);

      
      return code_unit;
    };
  }

  
  /**
   * @constructor
   * @implements {Encoder}
   * @param {boolean} utf16_be True if big-endian, false if little-endian.
   * @param {{fatal: boolean}} options
   */
  function UTF16Encoder(utf16_be, options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      
      if (code_point === end_of_stream)
        return finished;

      
      
      
      if (inRange(code_point, 0x0000, 0xFFFF))
        return convertCodeUnitToBytes(code_point, utf16_be);

      
      
      var lead = convertCodeUnitToBytes(
        ((code_point - 0x10000) >> 10) + 0xD800, utf16_be);

      
      
      var trail = convertCodeUnitToBytes(
        ((code_point - 0x10000) & 0x3FF) + 0xDC00, utf16_be);

      
      return lead.concat(trail);
    };
  }

  
  
  /** @param {{fatal: boolean}} options */
  encoders['UTF-16BE'] = function(options) {
    return new UTF16Encoder(true, options);
  };
  
  /** @param {{fatal: boolean}} options */
  decoders['UTF-16BE'] = function(options) {
    return new UTF16Decoder(true, options);
  };

  
  
  /** @param {{fatal: boolean}} options */
  encoders['UTF-16LE'] = function(options) {
    return new UTF16Encoder(false, options);
  };
  
  /** @param {{fatal: boolean}} options */
  decoders['UTF-16LE'] = function(options) {
    return new UTF16Decoder(false, options);
  };


  function XUserDefinedDecoder(options) {
    var fatal = options.fatal;

    this.handler = function(stream, bite) {
      
      if (bite === end_of_stream)
        return finished;

      
      
      if (isASCIIByte(bite))
        return bite;

      
      return 0xF780 + bite - 0x80;
    };
  }


  function XUserDefinedEncoder(options) {
    var fatal = options.fatal;

    this.handler = function(stream, code_point) {
      
      if (code_point === end_of_stream)
        return finished;

      
      
      if (isASCIICodePoint(code_point))
        return code_point;

      
      
      if (inRange(code_point, 0xF780, 0xF7FF))
        return code_point - 0xF780 + 0x80;

      
      return encoderError(code_point);
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['x-user-defined'] = function(options) {
    return new XUserDefinedEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['x-user-defined'] = function(options) {
    return new XUserDefinedDecoder(options);
  };

  if (!global['TextEncoder'])
    global['TextEncoder'] = TextEncoder;
  if (!global['TextDecoder'])
    global['TextDecoder'] = TextDecoder;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      TextEncoder: global['TextEncoder'],
      TextDecoder: global['TextDecoder'],
      EncodingIndexes: global["encoding-indexes"]
    };
  }



}(this || {}));
}, function(modId) { var map = {"./encoding-indexes.js":1670917931034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931034, function(require, module, exports) {
(function (global) {
	

	if (typeof module !== "undefined" && module.exports) {
		module.exports = global;
	}

	global["encoding-indexes"] = {
		"big5": [],
		"euc-kr": [],
		"gb18030": [19970, 19972, 19973, 19974, 19983, 19986, 19991, 19999, 20000, 20001, 20003, 20006, 20009, 20014, 20015, 20017, 20019, 20021, 20023, 20028, 20032, 20033, 20034, 20036, 20038, 20042, 20049, 20053, 20055, 20058, 20059, 20066, 20067, 20068, 20069, 20071, 20072, 20074, 20075, 20076, 20077, 20078, 20079, 20082, 20084, 20085, 20086, 20087, 20088, 20089, 20090, 20091, 20092, 20093, 20095, 20096, 20097, 20098, 20099, 20100, 20101, 20103, 20106, 20112, 20118, 20119, 20121, 20124, 20125, 20126, 20131, 20138, 20143, 20144, 20145, 20148, 20150, 20151, 20152, 20153, 20156, 20157, 20158, 20168, 20172, 20175, 20176, 20178, 20186, 20187, 20188, 20192, 20194, 20198, 20199, 20201, 20205, 20206, 20207, 20209, 20212, 20216, 20217, 20218, 20220, 20222, 20224, 20226, 20227, 20228, 20229, 20230, 20231, 20232, 20235, 20236, 20242, 20243, 20244, 20245, 20246, 20252, 20253, 20257, 20259, 20264, 20265, 20268, 20269, 20270, 20273, 20275, 20277, 20279, 20281, 20283, 20286, 20287, 20288, 20289, 20290, 20292, 20293, 20295, 20296, 20297, 20298, 20299, 20300, 20306, 20308, 20310, 20321, 20322, 20326, 20328, 20330, 20331, 20333, 20334, 20337, 20338, 20341, 20343, 20344, 20345, 20346, 20349, 20352, 20353, 20354, 20357, 20358, 20359, 20362, 20364, 20366, 20368, 20370, 20371, 20373, 20374, 20376, 20377, 20378, 20380, 20382, 20383, 20385, 20386, 20388, 20395, 20397, 20400, 20401, 20402, 20403, 20404, 20406, 20407, 20408, 20409, 20410, 20411, 20412, 20413, 20414, 20416, 20417, 20418, 20422, 20423, 20424, 20425, 20427, 20428, 20429, 20434, 20435, 20436, 20437, 20438, 20441, 20443, 20448, 20450, 20452, 20453, 20455, 20459, 20460, 20464, 20466, 20468, 20469, 20470, 20471, 20473, 20475, 20476, 20477, 20479, 20480, 20481, 20482, 20483, 20484, 20485, 20486, 20487, 20488, 20489, 20490, 20491, 20494, 20496, 20497, 20499, 20501, 20502, 20503, 20507, 20509, 20510, 20512, 20514, 20515, 20516, 20519, 20523, 20527, 20528, 20529, 20530, 20531, 20532, 20533, 20534, 20535, 20536, 20537, 20539, 20541, 20543, 20544, 20545, 20546, 20548, 20549, 20550, 20553, 20554, 20555, 20557, 20560, 20561, 20562, 20563, 20564, 20566, 20567, 20568, 20569, 20571, 20573, 20574, 20575, 20576, 20577, 20578, 20579, 20580, 20582, 20583, 20584, 20585, 20586, 20587, 20589, 20590, 20591, 20592, 20593, 20594, 20595, 20596, 20597, 20600, 20601, 20602, 20604, 20605, 20609, 20610, 20611, 20612, 20614, 20615, 20617, 20618, 20619, 20620, 20622, 20623, 20624, 20625, 20626, 20627, 20628, 20629, 20630, 20631, 20632, 20633, 20634, 20635, 20636, 20637, 20638, 20639, 20640, 20641, 20642, 20644, 20646, 20650, 20651, 20653, 20654, 20655, 20656, 20657, 20659, 20660, 20661, 20662, 20663, 20664, 20665, 20668, 20669, 20670, 20671, 20672, 20673, 20674, 20675, 20676, 20677, 20678, 20679, 20680, 20681, 20682, 20683, 20684, 20685, 20686, 20688, 20689, 20690, 20691, 20692, 20693, 20695, 20696, 20697, 20699, 20700, 20701, 20702, 20703, 20704, 20705, 20706, 20707, 20708, 20709, 20712, 20713, 20714, 20715, 20719, 20720, 20721, 20722, 20724, 20726, 20727, 20728, 20729, 20730, 20732, 20733, 20734, 20735, 20736, 20737, 20738, 20739, 20740, 20741, 20744, 20745, 20746, 20748, 20749, 20750, 20751, 20752, 20753, 20755, 20756, 20757, 20758, 20759, 20760, 20761, 20762, 20763, 20764, 20765, 20766, 20767, 20768, 20770, 20771, 20772, 20773, 20774, 20775, 20776, 20777, 20778, 20779, 20780, 20781, 20782, 20783, 20784, 20785, 20786, 20787, 20788, 20789, 20790, 20791, 20792, 20793, 20794, 20795, 20796, 20797, 20798, 20802, 20807, 20810, 20812, 20814, 20815, 20816, 20818, 20819, 20823, 20824, 20825, 20827, 20829, 20830, 20831, 20832, 20833, 20835, 20836, 20838, 20839, 20841, 20842, 20847, 20850, 20858, 20862, 20863, 20867, 20868, 20870, 20871, 20874, 20875, 20878, 20879, 20880, 20881, 20883, 20884, 20888, 20890, 20893, 20894, 20895, 20897, 20899, 20902, 20903, 20904, 20905, 20906, 20909, 20910, 20916, 20920, 20921, 20922, 20926, 20927, 20929, 20930, 20931, 20933, 20936, 20938, 20941, 20942, 20944, 20946, 20947, 20948, 20949, 20950, 20951, 20952, 20953, 20954, 20956, 20958, 20959, 20962, 20963, 20965, 20966, 20967, 20968, 20969, 20970, 20972, 20974, 20977, 20978, 20980, 20983, 20990, 20996, 20997, 21001, 21003, 21004, 21007, 21008, 21011, 21012, 21013, 21020, 21022, 21023, 21025, 21026, 21027, 21029, 21030, 21031, 21034, 21036, 21039, 21041, 21042, 21044, 21045, 21052, 21054, 21060, 21061, 21062, 21063, 21064, 21065, 21067, 21070, 21071, 21074, 21075, 21077, 21079, 21080, 21081, 21082, 21083, 21085, 21087, 21088, 21090, 21091, 21092, 21094, 21096, 21099, 21100, 21101, 21102, 21104, 21105, 21107, 21108, 21109, 21110, 21111, 21112, 21113, 21114, 21115, 21116, 21118, 21120, 21123, 21124, 21125, 21126, 21127, 21129, 21130, 21131, 21132, 21133, 21134, 21135, 21137, 21138, 21140, 21141, 21142, 21143, 21144, 21145, 21146, 21148, 21156, 21157, 21158, 21159, 21166, 21167, 21168, 21172, 21173, 21174, 21175, 21176, 21177, 21178, 21179, 21180, 21181, 21184, 21185, 21186, 21188, 21189, 21190, 21192, 21194, 21196, 21197, 21198, 21199, 21201, 21203, 21204, 21205, 21207, 21209, 21210, 21211, 21212, 21213, 21214, 21216, 21217, 21218, 21219, 21221, 21222, 21223, 21224, 21225, 21226, 21227, 21228, 21229, 21230, 21231, 21233, 21234, 21235, 21236, 21237, 21238, 21239, 21240, 21243, 21244, 21245, 21249, 21250, 21251, 21252, 21255, 21257, 21258, 21259, 21260, 21262, 21265, 21266, 21267, 21268, 21272, 21275, 21276, 21278, 21279, 21282, 21284, 21285, 21287, 21288, 21289, 21291, 21292, 21293, 21295, 21296, 21297, 21298, 21299, 21300, 21301, 21302, 21303, 21304, 21308, 21309, 21312, 21314, 21316, 21318, 21323, 21324, 21325, 21328, 21332, 21336, 21337, 21339, 21341, 21349, 21352, 21354, 21356, 21357, 21362, 21366, 21369, 21371, 21372, 21373, 21374, 21376, 21377, 21379, 21383, 21384, 21386, 21390, 21391, 21392, 21393, 21394, 21395, 21396, 21398, 21399, 21401, 21403, 21404, 21406, 21408, 21409, 21412, 21415, 21418, 21419, 21420, 21421, 21423, 21424, 21425, 21426, 21427, 21428, 21429, 21431, 21432, 21433, 21434, 21436, 21437, 21438, 21440, 21443, 21444, 21445, 21446, 21447, 21454, 21455, 21456, 21458, 21459, 21461, 21466, 21468, 21469, 21470, 21473, 21474, 21479, 21492, 21498, 21502, 21503, 21504, 21506, 21509, 21511, 21515, 21524, 21528, 21529, 21530, 21532, 21538, 21540, 21541, 21546, 21552, 21555, 21558, 21559, 21562, 21565, 21567, 21569, 21570, 21572, 21573, 21575, 21577, 21580, 21581, 21582, 21583, 21585, 21594, 21597, 21598, 21599, 21600, 21601, 21603, 21605, 21607, 21609, 21610, 21611, 21612, 21613, 21614, 21615, 21616, 21620, 21625, 21626, 21630, 21631, 21633, 21635, 21637, 21639, 21640, 21641, 21642, 21645, 21649, 21651, 21655, 21656, 21660, 21662, 21663, 21664, 21665, 21666, 21669, 21678, 21680, 21682, 21685, 21686, 21687, 21689, 21690, 21692, 21694, 21699, 21701, 21706, 21707, 21718, 21720, 21723, 21728, 21729, 21730, 21731, 21732, 21739, 21740, 21743, 21744, 21745, 21748, 21749, 21750, 21751, 21752, 21753, 21755, 21758, 21760, 21762, 21763, 21764, 21765, 21768, 21770, 21771, 21772, 21773, 21774, 21778, 21779, 21781, 21782, 21783, 21784, 21785, 21786, 21788, 21789, 21790, 21791, 21793, 21797, 21798, 21800, 21801, 21803, 21805, 21810, 21812, 21813, 21814, 21816, 21817, 21818, 21819, 21821, 21824, 21826, 21829, 21831, 21832, 21835, 21836, 21837, 21838, 21839, 21841, 21842, 21843, 21844, 21847, 21848, 21849, 21850, 21851, 21853, 21854, 21855, 21856, 21858, 21859, 21864, 21865, 21867, 21871, 21872, 21873, 21874, 21875, 21876, 21881, 21882, 21885, 21887, 21893, 21894, 21900, 21901, 21902, 21904, 21906, 21907, 21909, 21910, 21911, 21914, 21915, 21918, 21920, 21921, 21922, 21923, 21924, 21925, 21926, 21928, 21929, 21930, 21931, 21932, 21933, 21934, 21935, 21936, 21938, 21940, 21942, 21944, 21946, 21948, 21951, 21952, 21953, 21954, 21955, 21958, 21959, 21960, 21962, 21963, 21966, 21967, 21968, 21973, 21975, 21976, 21977, 21978, 21979, 21982, 21984, 21986, 21991, 21993, 21997, 21998, 22000, 22001, 22004, 22006, 22008, 22009, 22010, 22011, 22012, 22015, 22018, 22019, 22020, 22021, 22022, 22023, 22026, 22027, 22029, 22032, 22033, 22034, 22035, 22036, 22037, 22038, 22039, 22041, 22042, 22044, 22045, 22048, 22049, 22050, 22053, 22054, 22056, 22057, 22058, 22059, 22062, 22063, 22064, 22067, 22069, 22071, 22072, 22074, 22076, 22077, 22078, 22080, 22081, 22082, 22083, 22084, 22085, 22086, 22087, 22088, 22089, 22090, 22091, 22095, 22096, 22097, 22098, 22099, 22101, 22102, 22106, 22107, 22109, 22110, 22111, 22112, 22113, 22115, 22117, 22118, 22119, 22125, 22126, 22127, 22128, 22130, 22131, 22132, 22133, 22135, 22136, 22137, 22138, 22141, 22142, 22143, 22144, 22145, 22146, 22147, 22148, 22151, 22152, 22153, 22154, 22155, 22156, 22157, 22160, 22161, 22162, 22164, 22165, 22166, 22167, 22168, 22169, 22170, 22171, 22172, 22173, 22174, 22175, 22176, 22177, 22178, 22180, 22181, 22182, 22183, 22184, 22185, 22186, 22187, 22188, 22189, 22190, 22192, 22193, 22194, 22195, 22196, 22197, 22198, 22200, 22201, 22202, 22203, 22205, 22206, 22207, 22208, 22209, 22210, 22211, 22212, 22213, 22214, 22215, 22216, 22217, 22219, 22220, 22221, 22222, 22223, 22224, 22225, 22226, 22227, 22229, 22230, 22232, 22233, 22236, 22243, 22245, 22246, 22247, 22248, 22249, 22250, 22252, 22254, 22255, 22258, 22259, 22262, 22263, 22264, 22267, 22268, 22272, 22273, 22274, 22277, 22279, 22283, 22284, 22285, 22286, 22287, 22288, 22289, 22290, 22291, 22292, 22293, 22294, 22295, 22296, 22297, 22298, 22299, 22301, 22302, 22304, 22305, 22306, 22308, 22309, 22310, 22311, 22315, 22321, 22322, 22324, 22325, 22326, 22327, 22328, 22332, 22333, 22335, 22337, 22339, 22340, 22341, 22342, 22344, 22345, 22347, 22354, 22355, 22356, 22357, 22358, 22360, 22361, 22370, 22371, 22373, 22375, 22380, 22382, 22384, 22385, 22386, 22388, 22389, 22392, 22393, 22394, 22397, 22398, 22399, 22400, 22401, 22407, 22408, 22409, 22410, 22413, 22414, 22415, 22416, 22417, 22420, 22421, 22422, 22423, 22424, 22425, 22426, 22428, 22429, 22430, 22431, 22437, 22440, 22442, 22444, 22447, 22448, 22449, 22451, 22453, 22454, 22455, 22457, 22458, 22459, 22460, 22461, 22462, 22463, 22464, 22465, 22468, 22469, 22470, 22471, 22472, 22473, 22474, 22476, 22477, 22480, 22481, 22483, 22486, 22487, 22491, 22492, 22494, 22497, 22498, 22499, 22501, 22502, 22503, 22504, 22505, 22506, 22507, 22508, 22510, 22512, 22513, 22514, 22515, 22517, 22518, 22519, 22523, 22524, 22526, 22527, 22529, 22531, 22532, 22533, 22536, 22537, 22538, 22540, 22542, 22543, 22544, 22546, 22547, 22548, 22550, 22551, 22552, 22554, 22555, 22556, 22557, 22559, 22562, 22563, 22565, 22566, 22567, 22568, 22569, 22571, 22572, 22573, 22574, 22575, 22577, 22578, 22579, 22580, 22582, 22583, 22584, 22585, 22586, 22587, 22588, 22589, 22590, 22591, 22592, 22593, 22594, 22595, 22597, 22598, 22599, 22600, 22601, 22602, 22603, 22606, 22607, 22608, 22610, 22611, 22613, 22614, 22615, 22617, 22618, 22619, 22620, 22621, 22623, 22624, 22625, 22626, 22627, 22628, 22630, 22631, 22632, 22633, 22634, 22637, 22638, 22639, 22640, 22641, 22642, 22643, 22644, 22645, 22646, 22647, 22648, 22649, 22650, 22651, 22652, 22653, 22655, 22658, 22660, 22662, 22663, 22664, 22666, 22667, 22668, 22669, 22670, 22671, 22672, 22673, 22676, 22677, 22678, 22679, 22680, 22683, 22684, 22685, 22688, 22689, 22690, 22691, 22692, 22693, 22694, 22695, 22698, 22699, 22700, 22701, 22702, 22703, 22704, 22705, 22706, 22707, 22708, 22709, 22710, 22711, 22712, 22713, 22714, 22715, 22717, 22718, 22719, 22720, 22722, 22723, 22724, 22726, 22727, 22728, 22729, 22730, 22731, 22732, 22733, 22734, 22735, 22736, 22738, 22739, 22740, 22742, 22743, 22744, 22745, 22746, 22747, 22748, 22749, 22750, 22751, 22752, 22753, 22754, 22755, 22757, 22758, 22759, 22760, 22761, 22762, 22765, 22767, 22769, 22770, 22772, 22773, 22775, 22776, 22778, 22779, 22780, 22781, 22782, 22783, 22784, 22785, 22787, 22789, 22790, 22792, 22793, 22794, 22795, 22796, 22798, 22800, 22801, 22802, 22803, 22807, 22808, 22811, 22813, 22814, 22816, 22817, 22818, 22819, 22822, 22824, 22828, 22832, 22834, 22835, 22837, 22838, 22843, 22845, 22846, 22847, 22848, 22851, 22853, 22854, 22858, 22860, 22861, 22864, 22866, 22867, 22873, 22875, 22876, 22877, 22878, 22879, 22881, 22883, 22884, 22886, 22887, 22888, 22889, 22890, 22891, 22892, 22893, 22894, 22895, 22896, 22897, 22898, 22901, 22903, 22906, 22907, 22908, 22910, 22911, 22912, 22917, 22921, 22923, 22924, 22926, 22927, 22928, 22929, 22932, 22933, 22936, 22938, 22939, 22940, 22941, 22943, 22944, 22945, 22946, 22950, 22951, 22956, 22957, 22960, 22961, 22963, 22964, 22965, 22966, 22967, 22968, 22970, 22972, 22973, 22975, 22976, 22977, 22978, 22979, 22980, 22981, 22983, 22984, 22985, 22988, 22989, 22990, 22991, 22997, 22998, 23001, 23003, 23006, 23007, 23008, 23009, 23010, 23012, 23014, 23015, 23017, 23018, 23019, 23021, 23022, 23023, 23024, 23025, 23026, 23027, 23028, 23029, 23030, 23031, 23032, 23034, 23036, 23037, 23038, 23040, 23042, 23050, 23051, 23053, 23054, 23055, 23056, 23058, 23060, 23061, 23062, 23063, 23065, 23066, 23067, 23069, 23070, 23073, 23074, 23076, 23078, 23079, 23080, 23082, 23083, 23084, 23085, 23086, 23087, 23088, 23091, 23093, 23095, 23096, 23097, 23098, 23099, 23101, 23102, 23103, 23105, 23106, 23107, 23108, 23109, 23111, 23112, 23115, 23116, 23117, 23118, 23119, 23120, 23121, 23122, 23123, 23124, 23126, 23127, 23128, 23129, 23131, 23132, 23133, 23134, 23135, 23136, 23137, 23139, 23140, 23141, 23142, 23144, 23145, 23147, 23148, 23149, 23150, 23151, 23152, 23153, 23154, 23155, 23160, 23161, 23163, 23164, 23165, 23166, 23168, 23169, 23170, 23171, 23172, 23173, 23174, 23175, 23176, 23177, 23178, 23179, 23180, 23181, 23182, 23183, 23184, 23185, 23187, 23188, 23189, 23190, 23191, 23192, 23193, 23196, 23197, 23198, 23199, 23200, 23201, 23202, 23203, 23204, 23205, 23206, 23207, 23208, 23209, 23211, 23212, 23213, 23214, 23215, 23216, 23217, 23220, 23222, 23223, 23225, 23226, 23227, 23228, 23229, 23231, 23232, 23235, 23236, 23237, 23238, 23239, 23240, 23242, 23243, 23245, 23246, 23247, 23248, 23249, 23251, 23253, 23255, 23257, 23258, 23259, 23261, 23262, 23263, 23266, 23268, 23269, 23271, 23272, 23274, 23276, 23277, 23278, 23279, 23280, 23282, 23283, 23284, 23285, 23286, 23287, 23288, 23289, 23290, 23291, 23292, 23293, 23294, 23295, 23296, 23297, 23298, 23299, 23300, 23301, 23302, 23303, 23304, 23306, 23307, 23308, 23309, 23310, 23311, 23312, 23313, 23314, 23315, 23316, 23317, 23320, 23321, 23322, 23323, 23324, 23325, 23326, 23327, 23328, 23329, 23330, 23331, 23332, 23333, 23334, 23335, 23336, 23337, 23338, 23339, 23340, 23341, 23342, 23343, 23344, 23345, 23347, 23349, 23350, 23352, 23353, 23354, 23355, 23356, 23357, 23358, 23359, 23361, 23362, 23363, 23364, 23365, 23366, 23367, 23368, 23369, 23370, 23371, 23372, 23373, 23374, 23375, 23378, 23382, 23390, 23392, 23393, 23399, 23400, 23403, 23405, 23406, 23407, 23410, 23412, 23414, 23415, 23416, 23417, 23419, 23420, 23422, 23423, 23426, 23430, 23434, 23437, 23438, 23440, 23441, 23442, 23444, 23446, 23455, 23463, 23464, 23465, 23468, 23469, 23470, 23471, 23473, 23474, 23479, 23482, 23483, 23484, 23488, 23489, 23491, 23496, 23497, 23498, 23499, 23501, 23502, 23503, 23505, 23508, 23509, 23510, 23511, 23512, 23513, 23514, 23515, 23516, 23520, 23522, 23523, 23526, 23527, 23529, 23530, 23531, 23532, 23533, 23535, 23537, 23538, 23539, 23540, 23541, 23542, 23543, 23549, 23550, 23552, 23554, 23555, 23557, 23559, 23560, 23563, 23564, 23565, 23566, 23568, 23570, 23571, 23575, 23577, 23579, 23582, 23583, 23584, 23585, 23587, 23590, 23592, 23593, 23594, 23595, 23597, 23598, 23599, 23600, 23602, 23603, 23605, 23606, 23607, 23619, 23620, 23622, 23623, 23628, 23629, 23634, 23635, 23636, 23638, 23639, 23640, 23642, 23643, 23644, 23645, 23647, 23650, 23652, 23655, 23656, 23657, 23658, 23659, 23660, 23661, 23664, 23666, 23667, 23668, 23669, 23670, 23671, 23672, 23675, 23676, 23677, 23678, 23680, 23683, 23684, 23685, 23686, 23687, 23689, 23690, 23691, 23694, 23695, 23698, 23699, 23701, 23709, 23710, 23711, 23712, 23713, 23716, 23717, 23718, 23719, 23720, 23722, 23726, 23727, 23728, 23730, 23732, 23734, 23737, 23738, 23739, 23740, 23742, 23744, 23746, 23747, 23749, 23750, 23751, 23752, 23753, 23754, 23756, 23757, 23758, 23759, 23760, 23761, 23763, 23764, 23765, 23766, 23767, 23768, 23770, 23771, 23772, 23773, 23774, 23775, 23776, 23778, 23779, 23783, 23785, 23787, 23788, 23790, 23791, 23793, 23794, 23795, 23796, 23797, 23798, 23799, 23800, 23801, 23802, 23804, 23805, 23806, 23807, 23808, 23809, 23812, 23813, 23816, 23817, 23818, 23819, 23820, 23821, 23823, 23824, 23825, 23826, 23827, 23829, 23831, 23832, 23833, 23834, 23836, 23837, 23839, 23840, 23841, 23842, 23843, 23845, 23848, 23850, 23851, 23852, 23855, 23856, 23857, 23858, 23859, 23861, 23862, 23863, 23864, 23865, 23866, 23867, 23868, 23871, 23872, 23873, 23874, 23875, 23876, 23877, 23878, 23880, 23881, 23885, 23886, 23887, 23888, 23889, 23890, 23891, 23892, 23893, 23894, 23895, 23897, 23898, 23900, 23902, 23903, 23904, 23905, 23906, 23907, 23908, 23909, 23910, 23911, 23912, 23914, 23917, 23918, 23920, 23921, 23922, 23923, 23925, 23926, 23927, 23928, 23929, 23930, 23931, 23932, 23933, 23934, 23935, 23936, 23937, 23939, 23940, 23941, 23942, 23943, 23944, 23945, 23946, 23947, 23948, 23949, 23950, 23951, 23952, 23953, 23954, 23955, 23956, 23957, 23958, 23959, 23960, 23962, 23963, 23964, 23966, 23967, 23968, 23969, 23970, 23971, 23972, 23973, 23974, 23975, 23976, 23977, 23978, 23979, 23980, 23981, 23982, 23983, 23984, 23985, 23986, 23987, 23988, 23989, 23990, 23992, 23993, 23994, 23995, 23996, 23997, 23998, 23999, 24000, 24001, 24002, 24003, 24004, 24006, 24007, 24008, 24009, 24010, 24011, 24012, 24014, 24015, 24016, 24017, 24018, 24019, 24020, 24021, 24022, 24023, 24024, 24025, 24026, 24028, 24031, 24032, 24035, 24036, 24042, 24044, 24045, 24048, 24053, 24054, 24056, 24057, 24058, 24059, 24060, 24063, 24064, 24068, 24071, 24073, 24074, 24075, 24077, 24078, 24082, 24083, 24087, 24094, 24095, 24096, 24097, 24098, 24099, 24100, 24101, 24104, 24105, 24106, 24107, 24108, 24111, 24112, 24114, 24115, 24116, 24117, 24118, 24121, 24122, 24126, 24127, 24128, 24129, 24131, 24134, 24135, 24136, 24137, 24138, 24139, 24141, 24142, 24143, 24144, 24145, 24146, 24147, 24150, 24151, 24152, 24153, 24154, 24156, 24157, 24159, 24160, 24163, 24164, 24165, 24166, 24167, 24168, 24169, 24170, 24171, 24172, 24173, 24174, 24175, 24176, 24177, 24181, 24183, 24185, 24190, 24193, 24194, 24195, 24197, 24200, 24201, 24204, 24205, 24206, 24210, 24216, 24219, 24221, 24225, 24226, 24227, 24228, 24232, 24233, 24234, 24235, 24236, 24238, 24239, 24240, 24241, 24242, 24244, 24250, 24251, 24252, 24253, 24255, 24256, 24257, 24258, 24259, 24260, 24261, 24262, 24263, 24264, 24267, 24268, 24269, 24270, 24271, 24272, 24276, 24277, 24279, 24280, 24281, 24282, 24284, 24285, 24286, 24287, 24288, 24289, 24290, 24291, 24292, 24293, 24294, 24295, 24297, 24299, 24300, 24301, 24302, 24303, 24304, 24305, 24306, 24307, 24309, 24312, 24313, 24315, 24316, 24317, 24325, 24326, 24327, 24329, 24332, 24333, 24334, 24336, 24338, 24340, 24342, 24345, 24346, 24348, 24349, 24350, 24353, 24354, 24355, 24356, 24360, 24363, 24364, 24366, 24368, 24370, 24371, 24372, 24373, 24374, 24375, 24376, 24379, 24381, 24382, 24383, 24385, 24386, 24387, 24388, 24389, 24390, 24391, 24392, 24393, 24394, 24395, 24396, 24397, 24398, 24399, 24401, 24404, 24409, 24410, 24411, 24412, 24414, 24415, 24416, 24419, 24421, 24423, 24424, 24427, 24430, 24431, 24434, 24436, 24437, 24438, 24440, 24442, 24445, 24446, 24447, 24451, 24454, 24461, 24462, 24463, 24465, 24467, 24468, 24470, 24474, 24475, 24477, 24478, 24479, 24480, 24482, 24483, 24484, 24485, 24486, 24487, 24489, 24491, 24492, 24495, 24496, 24497, 24498, 24499, 24500, 24502, 24504, 24505, 24506, 24507, 24510, 24511, 24512, 24513, 24514, 24519, 24520, 24522, 24523, 24526, 24531, 24532, 24533, 24538, 24539, 24540, 24542, 24543, 24546, 24547, 24549, 24550, 24552, 24553, 24556, 24559, 24560, 24562, 24563, 24564, 24566, 24567, 24569, 24570, 24572, 24583, 24584, 24585, 24587, 24588, 24592, 24593, 24595, 24599, 24600, 24602, 24606, 24607, 24610, 24611, 24612, 24620, 24621, 24622, 24624, 24625, 24626, 24627, 24628, 24630, 24631, 24632, 24633, 24634, 24637, 24638, 24640, 24644, 24645, 24646, 24647, 24648, 24649, 24650, 24652, 24654, 24655, 24657, 24659, 24660, 24662, 24663, 24664, 24667, 24668, 24670, 24671, 24672, 24673, 24677, 24678, 24686, 24689, 24690, 24692, 24693, 24695, 24702, 24704, 24705, 24706, 24709, 24710, 24711, 24712, 24714, 24715, 24718, 24719, 24720, 24721, 24723, 24725, 24727, 24728, 24729, 24732, 24734, 24737, 24738, 24740, 24741, 24743, 24745, 24746, 24750, 24752, 24755, 24757, 24758, 24759, 24761, 24762, 24765, 24766, 24767, 24768, 24769, 24770, 24771, 24772, 24775, 24776, 24777, 24780, 24781, 24782, 24783, 24784, 24786, 24787, 24788, 24790, 24791, 24793, 24795, 24798, 24801, 24802, 24803, 24804, 24805, 24810, 24817, 24818, 24821, 24823, 24824, 24827, 24828, 24829, 24830, 24831, 24834, 24835, 24836, 24837, 24839, 24842, 24843, 24844, 24848, 24849, 24850, 24851, 24852, 24854, 24855, 24856, 24857, 24859, 24860, 24861, 24862, 24865, 24866, 24869, 24872, 24873, 24874, 24876, 24877, 24878, 24879, 24880, 24881, 24882, 24883, 24884, 24885, 24886, 24887, 24888, 24889, 24890, 24891, 24892, 24893, 24894, 24896, 24897, 24898, 24899, 24900, 24901, 24902, 24903, 24905, 24907, 24909, 24911, 24912, 24914, 24915, 24916, 24918, 24919, 24920, 24921, 24922, 24923, 24924, 24926, 24927, 24928, 24929, 24931, 24932, 24933, 24934, 24937, 24938, 24939, 24940, 24941, 24942, 24943, 24945, 24946, 24947, 24948, 24950, 24952, 24953, 24954, 24955, 24956, 24957, 24958, 24959, 24960, 24961, 24962, 24963, 24964, 24965, 24966, 24967, 24968, 24969, 24970, 24972, 24973, 24975, 24976, 24977, 24978, 24979, 24981, 24982, 24983, 24984, 24985, 24986, 24987, 24988, 24990, 24991, 24992, 24993, 24994, 24995, 24996, 24997, 24998, 25002, 25003, 25005, 25006, 25007, 25008, 25009, 25010, 25011, 25012, 25013, 25014, 25016, 25017, 25018, 25019, 25020, 25021, 25023, 25024, 25025, 25027, 25028, 25029, 25030, 25031, 25033, 25036, 25037, 25038, 25039, 25040, 25043, 25045, 25046, 25047, 25048, 25049, 25050, 25051, 25052, 25053, 25054, 25055, 25056, 25057, 25058, 25059, 25060, 25061, 25063, 25064, 25065, 25066, 25067, 25068, 25069, 25070, 25071, 25072, 25073, 25074, 25075, 25076, 25078, 25079, 25080, 25081, 25082, 25083, 25084, 25085, 25086, 25088, 25089, 25090, 25091, 25092, 25093, 25095, 25097, 25107, 25108, 25113, 25116, 25117, 25118, 25120, 25123, 25126, 25127, 25128, 25129, 25131, 25133, 25135, 25136, 25137, 25138, 25141, 25142, 25144, 25145, 25146, 25147, 25148, 25154, 25156, 25157, 25158, 25162, 25167, 25168, 25173, 25174, 25175, 25177, 25178, 25180, 25181, 25182, 25183, 25184, 25185, 25186, 25188, 25189, 25192, 25201, 25202, 25204, 25205, 25207, 25208, 25210, 25211, 25213, 25217, 25218, 25219, 25221, 25222, 25223, 25224, 25227, 25228, 25229, 25230, 25231, 25232, 25236, 25241, 25244, 25245, 25246, 25251, 25254, 25255, 25257, 25258, 25261, 25262, 25263, 25264, 25266, 25267, 25268, 25270, 25271, 25272, 25274, 25278, 25280, 25281, 25283, 25291, 25295, 25297, 25301, 25309, 25310, 25312, 25313, 25316, 25322, 25323, 25328, 25330, 25333, 25336, 25337, 25338, 25339, 25344, 25347, 25348, 25349, 25350, 25354, 25355, 25356, 25357, 25359, 25360, 25362, 25363, 25364, 25365, 25367, 25368, 25369, 25372, 25382, 25383, 25385, 25388, 25389, 25390, 25392, 25393, 25395, 25396, 25397, 25398, 25399, 25400, 25403, 25404, 25406, 25407, 25408, 25409, 25412, 25415, 25416, 25418, 25425, 25426, 25427, 25428, 25430, 25431, 25432, 25433, 25434, 25435, 25436, 25437, 25440, 25444, 25445, 25446, 25448, 25450, 25451, 25452, 25455, 25456, 25458, 25459, 25460, 25461, 25464, 25465, 25468, 25469, 25470, 25471, 25473, 25475, 25476, 25477, 25478, 25483, 25485, 25489, 25491, 25492, 25493, 25495, 25497, 25498, 25499, 25500, 25501, 25502, 25503, 25505, 25508, 25510, 25515, 25519, 25521, 25522, 25525, 25526, 25529, 25531, 25533, 25535, 25536, 25537, 25538, 25539, 25541, 25543, 25544, 25546, 25547, 25548, 25553, 25555, 25556, 25557, 25559, 25560, 25561, 25562, 25563, 25564, 25565, 25567, 25570, 25572, 25573, 25574, 25575, 25576, 25579, 25580, 25582, 25583, 25584, 25585, 25587, 25589, 25591, 25593, 25594, 25595, 25596, 25598, 25603, 25604, 25606, 25607, 25608, 25609, 25610, 25613, 25614, 25617, 25618, 25621, 25622, 25623, 25624, 25625, 25626, 25629, 25631, 25634, 25635, 25636, 25637, 25639, 25640, 25641, 25643, 25646, 25647, 25648, 25649, 25650, 25651, 25653, 25654, 25655, 25656, 25657, 25659, 25660, 25662, 25664, 25666, 25667, 25673, 25675, 25676, 25677, 25678, 25679, 25680, 25681, 25683, 25685, 25686, 25687, 25689, 25690, 25691, 25692, 25693, 25695, 25696, 25697, 25698, 25699, 25700, 25701, 25702, 25704, 25706, 25707, 25708, 25710, 25711, 25712, 25713, 25714, 25715, 25716, 25717, 25718, 25719, 25723, 25724, 25725, 25726, 25727, 25728, 25729, 25731, 25734, 25736, 25737, 25738, 25739, 25740, 25741, 25742, 25743, 25744, 25747, 25748, 25751, 25752, 25754, 25755, 25756, 25757, 25759, 25760, 25761, 25762, 25763, 25765, 25766, 25767, 25768, 25770, 25771, 25775, 25777, 25778, 25779, 25780, 25782, 25785, 25787, 25789, 25790, 25791, 25793, 25795, 25796, 25798, 25799, 25800, 25801, 25802, 25803, 25804, 25807, 25809, 25811, 25812, 25813, 25814, 25817, 25818, 25819, 25820, 25821, 25823, 25824, 25825, 25827, 25829, 25831, 25832, 25833, 25834, 25835, 25836, 25837, 25838, 25839, 25840, 25841, 25842, 25843, 25844, 25845, 25846, 25847, 25848, 25849, 25850, 25851, 25852, 25853, 25854, 25855, 25857, 25858, 25859, 25860, 25861, 25862, 25863, 25864, 25866, 25867, 25868, 25869, 25870, 25871, 25872, 25873, 25875, 25876, 25877, 25878, 25879, 25881, 25882, 25883, 25884, 25885, 25886, 25887, 25888, 25889, 25890, 25891, 25892, 25894, 25895, 25896, 25897, 25898, 25900, 25901, 25904, 25905, 25906, 25907, 25911, 25914, 25916, 25917, 25920, 25921, 25922, 25923, 25924, 25926, 25927, 25930, 25931, 25933, 25934, 25936, 25938, 25939, 25940, 25943, 25944, 25946, 25948, 25951, 25952, 25953, 25956, 25957, 25959, 25960, 25961, 25962, 25965, 25966, 25967, 25969, 25971, 25973, 25974, 25976, 25977, 25978, 25979, 25980, 25981, 25982, 25983, 25984, 25985, 25986, 25987, 25988, 25989, 25990, 25992, 25993, 25994, 25997, 25998, 25999, 26002, 26004, 26005, 26006, 26008, 26010, 26013, 26014, 26016, 26018, 26019, 26022, 26024, 26026, 26028, 26030, 26033, 26034, 26035, 26036, 26037, 26038, 26039, 26040, 26042, 26043, 26046, 26047, 26048, 26050, 26055, 26056, 26057, 26058, 26061, 26064, 26065, 26067, 26068, 26069, 26072, 26073, 26074, 26075, 26076, 26077, 26078, 26079, 26081, 26083, 26084, 26090, 26091, 26098, 26099, 26100, 26101, 26104, 26105, 26107, 26108, 26109, 26110, 26111, 26113, 26116, 26117, 26119, 26120, 26121, 26123, 26125, 26128, 26129, 26130, 26134, 26135, 26136, 26138, 26139, 26140, 26142, 26145, 26146, 26147, 26148, 26150, 26153, 26154, 26155, 26156, 26158, 26160, 26162, 26163, 26167, 26168, 26169, 26170, 26171, 26173, 26175, 26176, 26178, 26180, 26181, 26182, 26183, 26184, 26185, 26186, 26189, 26190, 26192, 26193, 26200, 26201, 26203, 26204, 26205, 26206, 26208, 26210, 26211, 26213, 26215, 26217, 26218, 26219, 26220, 26221, 26225, 26226, 26227, 26229, 26232, 26233, 26235, 26236, 26237, 26239, 26240, 26241, 26243, 26245, 26246, 26248, 26249, 26250, 26251, 26253, 26254, 26255, 26256, 26258, 26259, 26260, 26261, 26264, 26265, 26266, 26267, 26268, 26270, 26271, 26272, 26273, 26274, 26275, 26276, 26277, 26278, 26281, 26282, 26283, 26284, 26285, 26287, 26288, 26289, 26290, 26291, 26293, 26294, 26295, 26296, 26298, 26299, 26300, 26301, 26303, 26304, 26305, 26306, 26307, 26308, 26309, 26310, 26311, 26312, 26313, 26314, 26315, 26316, 26317, 26318, 26319, 26320, 26321, 26322, 26323, 26324, 26325, 26326, 26327, 26328, 26330, 26334, 26335, 26336, 26337, 26338, 26339, 26340, 26341, 26343, 26344, 26346, 26347, 26348, 26349, 26350, 26351, 26353, 26357, 26358, 26360, 26362, 26363, 26365, 26369, 26370, 26371, 26372, 26373, 26374, 26375, 26380, 26382, 26383, 26385, 26386, 26387, 26390, 26392, 26393, 26394, 26396, 26398, 26400, 26401, 26402, 26403, 26404, 26405, 26407, 26409, 26414, 26416, 26418, 26419, 26422, 26423, 26424, 26425, 26427, 26428, 26430, 26431, 26433, 26436, 26437, 26439, 26442, 26443, 26445, 26450, 26452, 26453, 26455, 26456, 26457, 26458, 26459, 26461, 26466, 26467, 26468, 26470, 26471, 26475, 26476, 26478, 26481, 26484, 26486, 26488, 26489, 26490, 26491, 26493, 26496, 26498, 26499, 26501, 26502, 26504, 26506, 26508, 26509, 26510, 26511, 26513, 26514, 26515, 26516, 26518, 26521, 26523, 26527, 26528, 26529, 26532, 26534, 26537, 26540, 26542, 26545, 26546, 26548, 26553, 26554, 26555, 26556, 26557, 26558, 26559, 26560, 26562, 26565, 26566, 26567, 26568, 26569, 26570, 26571, 26572, 26573, 26574, 26581, 26582, 26583, 26587, 26591, 26593, 26595, 26596, 26598, 26599, 26600, 26602, 26603, 26605, 26606, 26610, 26613, 26614, 26615, 26616, 26617, 26618, 26619, 26620, 26622, 26625, 26626, 26627, 26628, 26630, 26637, 26640, 26642, 26644, 26645, 26648, 26649, 26650, 26651, 26652, 26654, 26655, 26656, 26658, 26659, 26660, 26661, 26662, 26663, 26664, 26667, 26668, 26669, 26670, 26671, 26672, 26673, 26676, 26677, 26678, 26682, 26683, 26687, 26695, 26699, 26701, 26703, 26706, 26710, 26711, 26712, 26713, 26714, 26715, 26716, 26717, 26718, 26719, 26730, 26732, 26733, 26734, 26735, 26736, 26737, 26738, 26739, 26741, 26744, 26745, 26746, 26747, 26748, 26749, 26750, 26751, 26752, 26754, 26756, 26759, 26760, 26761, 26762, 26763, 26764, 26765, 26766, 26768, 26769, 26770, 26772, 26773, 26774, 26776, 26777, 26778, 26779, 26780, 26781, 26782, 26783, 26784, 26785, 26787, 26788, 26789, 26793, 26794, 26795, 26796, 26798, 26801, 26802, 26804, 26806, 26807, 26808, 26809, 26810, 26811, 26812, 26813, 26814, 26815, 26817, 26819, 26820, 26821, 26822, 26823, 26824, 26826, 26828, 26830, 26831, 26832, 26833, 26835, 26836, 26838, 26839, 26841, 26843, 26844, 26845, 26846, 26847, 26849, 26850, 26852, 26853, 26854, 26855, 26856, 26857, 26858, 26859, 26860, 26861, 26863, 26866, 26867, 26868, 26870, 26871, 26872, 26875, 26877, 26878, 26879, 26880, 26882, 26883, 26884, 26886, 26887, 26888, 26889, 26890, 26892, 26895, 26897, 26899, 26900, 26901, 26902, 26903, 26904, 26905, 26906, 26907, 26908, 26909, 26910, 26913, 26914, 26915, 26917, 26918, 26919, 26920, 26921, 26922, 26923, 26924, 26926, 26927, 26929, 26930, 26931, 26933, 26934, 26935, 26936, 26938, 26939, 26940, 26942, 26944, 26945, 26947, 26948, 26949, 26950, 26951, 26952, 26953, 26954, 26955, 26956, 26957, 26958, 26959, 26960, 26961, 26962, 26963, 26965, 26966, 26968, 26969, 26971, 26972, 26975, 26977, 26978, 26980, 26981, 26983, 26984, 26985, 26986, 26988, 26989, 26991, 26992, 26994, 26995, 26996, 26997, 26998, 27002, 27003, 27005, 27006, 27007, 27009, 27011, 27013, 27018, 27019, 27020, 27022, 27023, 27024, 27025, 27026, 27027, 27030, 27031, 27033, 27034, 27037, 27038, 27039, 27040, 27041, 27042, 27043, 27044, 27045, 27046, 27049, 27050, 27052, 27054, 27055, 27056, 27058, 27059, 27061, 27062, 27064, 27065, 27066, 27068, 27069, 27070, 27071, 27072, 27074, 27075, 27076, 27077, 27078, 27079, 27080, 27081, 27083, 27085, 27087, 27089, 27090, 27091, 27093, 27094, 27095, 27096, 27097, 27098, 27100, 27101, 27102, 27105, 27106, 27107, 27108, 27109, 27110, 27111, 27112, 27113, 27114, 27115, 27116, 27118, 27119, 27120, 27121, 27123, 27124, 27125, 27126, 27127, 27128, 27129, 27130, 27131, 27132, 27134, 27136, 27137, 27138, 27139, 27140, 27141, 27142, 27143, 27144, 27145, 27147, 27148, 27149, 27150, 27151, 27152, 27153, 27154, 27155, 27156, 27157, 27158, 27161, 27162, 27163, 27164, 27165, 27166, 27168, 27170, 27171, 27172, 27173, 27174, 27175, 27177, 27179, 27180, 27181, 27182, 27184, 27186, 27187, 27188, 27190, 27191, 27192, 27193, 27194, 27195, 27196, 27199, 27200, 27201, 27202, 27203, 27205, 27206, 27208, 27209, 27210, 27211, 27212, 27213, 27214, 27215, 27217, 27218, 27219, 27220, 27221, 27222, 27223, 27226, 27228, 27229, 27230, 27231, 27232, 27234, 27235, 27236, 27238, 27239, 27240, 27241, 27242, 27243, 27244, 27245, 27246, 27247, 27248, 27250, 27251, 27252, 27253, 27254, 27255, 27256, 27258, 27259, 27261, 27262, 27263, 27265, 27266, 27267, 27269, 27270, 27271, 27272, 27273, 27274, 27275, 27276, 27277, 27279, 27282, 27283, 27284, 27285, 27286, 27288, 27289, 27290, 27291, 27292, 27293, 27294, 27295, 27297, 27298, 27299, 27300, 27301, 27302, 27303, 27304, 27306, 27309, 27310, 27311, 27312, 27313, 27314, 27315, 27316, 27317, 27318, 27319, 27320, 27321, 27322, 27323, 27324, 27325, 27326, 27327, 27328, 27329, 27330, 27331, 27332, 27333, 27334, 27335, 27336, 27337, 27338, 27339, 27340, 27341, 27342, 27343, 27344, 27345, 27346, 27347, 27348, 27349, 27350, 27351, 27352, 27353, 27354, 27355, 27356, 27357, 27358, 27359, 27360, 27361, 27362, 27363, 27364, 27365, 27366, 27367, 27368, 27369, 27370, 27371, 27372, 27373, 27374, 27375, 27376, 27377, 27378, 27379, 27380, 27381, 27382, 27383, 27384, 27385, 27386, 27387, 27388, 27389, 27390, 27391, 27392, 27393, 27394, 27395, 27396, 27397, 27398, 27399, 27400, 27401, 27402, 27403, 27404, 27405, 27406, 27407, 27408, 27409, 27410, 27411, 27412, 27413, 27414, 27415, 27416, 27417, 27418, 27419, 27420, 27421, 27422, 27423, 27429, 27430, 27432, 27433, 27434, 27435, 27436, 27437, 27438, 27439, 27440, 27441, 27443, 27444, 27445, 27446, 27448, 27451, 27452, 27453, 27455, 27456, 27457, 27458, 27460, 27461, 27464, 27466, 27467, 27469, 27470, 27471, 27472, 27473, 27474, 27475, 27476, 27477, 27478, 27479, 27480, 27482, 27483, 27484, 27485, 27486, 27487, 27488, 27489, 27496, 27497, 27499, 27500, 27501, 27502, 27503, 27504, 27505, 27506, 27507, 27508, 27509, 27510, 27511, 27512, 27514, 27517, 27518, 27519, 27520, 27525, 27528, 27532, 27534, 27535, 27536, 27537, 27540, 27541, 27543, 27544, 27545, 27548, 27549, 27550, 27551, 27552, 27554, 27555, 27556, 27557, 27558, 27559, 27560, 27561, 27563, 27564, 27565, 27566, 27567, 27568, 27569, 27570, 27574, 27576, 27577, 27578, 27579, 27580, 27581, 27582, 27584, 27587, 27588, 27590, 27591, 27592, 27593, 27594, 27596, 27598, 27600, 27601, 27608, 27610, 27612, 27613, 27614, 27615, 27616, 27618, 27619, 27620, 27621, 27622, 27623, 27624, 27625, 27628, 27629, 27630, 27632, 27633, 27634, 27636, 27638, 27639, 27640, 27642, 27643, 27644, 27646, 27647, 27648, 27649, 27650, 27651, 27652, 27656, 27657, 27658, 27659, 27660, 27662, 27666, 27671, 27676, 27677, 27678, 27680, 27683, 27685, 27691, 27692, 27693, 27697, 27699, 27702, 27703, 27705, 27706, 27707, 27708, 27710, 27711, 27715, 27716, 27717, 27720, 27723, 27724, 27725, 27726, 27727, 27729, 27730, 27731, 27734, 27736, 27737, 27738, 27746, 27747, 27749, 27750, 27751, 27755, 27756, 27757, 27758, 27759, 27761, 27763, 27765, 27767, 27768, 27770, 27771, 27772, 27775, 27776, 27780, 27783, 27786, 27787, 27789, 27790, 27793, 27794, 27797, 27798, 27799, 27800, 27802, 27804, 27805, 27806, 27808, 27810, 27816, 27820, 27823, 27824, 27828, 27829, 27830, 27831, 27834, 27840, 27841, 27842, 27843, 27846, 27847, 27848, 27851, 27853, 27854, 27855, 27857, 27858, 27864, 27865, 27866, 27868, 27869, 27871, 27876, 27878, 27879, 27881, 27884, 27885, 27890, 27892, 27897, 27903, 27904, 27906, 27907, 27909, 27910, 27912, 27913, 27914, 27917, 27919, 27920, 27921, 27923, 27924, 27925, 27926, 27928, 27932, 27933, 27935, 27936, 27937, 27938, 27939, 27940, 27942, 27944, 27945, 27948, 27949, 27951, 27952, 27956, 27958, 27959, 27960, 27962, 27967, 27968, 27970, 27972, 27977, 27980, 27984, 27989, 27990, 27991, 27992, 27995, 27997, 27999, 28001, 28002, 28004, 28005, 28007, 28008, 28011, 28012, 28013, 28016, 28017, 28018, 28019, 28021, 28022, 28025, 28026, 28027, 28029, 28030, 28031, 28032, 28033, 28035, 28036, 28038, 28039, 28042, 28043, 28045, 28047, 28048, 28050, 28054, 28055, 28056, 28057, 28058, 28060, 28066, 28069, 28076, 28077, 28080, 28081, 28083, 28084, 28086, 28087, 28089, 28090, 28091, 28092, 28093, 28094, 28097, 28098, 28099, 28104, 28105, 28106, 28109, 28110, 28111, 28112, 28114, 28115, 28116, 28117, 28119, 28122, 28123, 28124, 28127, 28130, 28131, 28133, 28135, 28136, 28137, 28138, 28141, 28143, 28144, 28146, 28148, 28149, 28150, 28152, 28154, 28157, 28158, 28159, 28160, 28161, 28162, 28163, 28164, 28166, 28167, 28168, 28169, 28171, 28175, 28178, 28179, 28181, 28184, 28185, 28187, 28188, 28190, 28191, 28194, 28198, 28199, 28200, 28202, 28204, 28206, 28208, 28209, 28211, 28213, 28214, 28215, 28217, 28219, 28220, 28221, 28222, 28223, 28224, 28225, 28226, 28229, 28230, 28231, 28232, 28233, 28234, 28235, 28236, 28239, 28240, 28241, 28242, 28245, 28247, 28249, 28250, 28252, 28253, 28254, 28256, 28257, 28258, 28259, 28260, 28261, 28262, 28263, 28264, 28265, 28266, 28268, 28269, 28271, 28272, 28273, 28274, 28275, 28276, 28277, 28278, 28279, 28280, 28281, 28282, 28283, 28284, 28285, 28288, 28289, 28290, 28292, 28295, 28296, 28298, 28299, 28300, 28301, 28302, 28305, 28306, 28307, 28308, 28309, 28310, 28311, 28313, 28314, 28315, 28317, 28318, 28320, 28321, 28323, 28324, 28326, 28328, 28329, 28331, 28332, 28333, 28334, 28336, 28339, 28341, 28344, 28345, 28348, 28350, 28351, 28352, 28355, 28356, 28357, 28358, 28360, 28361, 28362, 28364, 28365, 28366, 28368, 28370, 28374, 28376, 28377, 28379, 28380, 28381, 28387, 28391, 28394, 28395, 28396, 28397, 28398, 28399, 28400, 28401, 28402, 28403, 28405, 28406, 28407, 28408, 28410, 28411, 28412, 28413, 28414, 28415, 28416, 28417, 28419, 28420, 28421, 28423, 28424, 28426, 28427, 28428, 28429, 28430, 28432, 28433, 28434, 28438, 28439, 28440, 28441, 28442, 28443, 28444, 28445, 28446, 28447, 28449, 28450, 28451, 28453, 28454, 28455, 28456, 28460, 28462, 28464, 28466, 28468, 28469, 28471, 28472, 28473, 28474, 28475, 28476, 28477, 28479, 28480, 28481, 28482, 28483, 28484, 28485, 28488, 28489, 28490, 28492, 28494, 28495, 28496, 28497, 28498, 28499, 28500, 28501, 28502, 28503, 28505, 28506, 28507, 28509, 28511, 28512, 28513, 28515, 28516, 28517, 28519, 28520, 28521, 28522, 28523, 28524, 28527, 28528, 28529, 28531, 28533, 28534, 28535, 28537, 28539, 28541, 28542, 28543, 28544, 28545, 28546, 28547, 28549, 28550, 28551, 28554, 28555, 28559, 28560, 28561, 28562, 28563, 28564, 28565, 28566, 28567, 28568, 28569, 28570, 28571, 28573, 28574, 28575, 28576, 28578, 28579, 28580, 28581, 28582, 28584, 28585, 28586, 28587, 28588, 28589, 28590, 28591, 28592, 28593, 28594, 28596, 28597, 28599, 28600, 28602, 28603, 28604, 28605, 28606, 28607, 28609, 28611, 28612, 28613, 28614, 28615, 28616, 28618, 28619, 28620, 28621, 28622, 28623, 28624, 28627, 28628, 28629, 28630, 28631, 28632, 28633, 28634, 28635, 28636, 28637, 28639, 28642, 28643, 28644, 28645, 28646, 28647, 28648, 28649, 28650, 28651, 28652, 28653, 28656, 28657, 28658, 28659, 28660, 28661, 28662, 28663, 28664, 28665, 28666, 28667, 28668, 28669, 28670, 28671, 28672, 28673, 28674, 28675, 28676, 28677, 28678, 28679, 28680, 28681, 28682, 28683, 28684, 28685, 28686, 28687, 28688, 28690, 28691, 28692, 28693, 28694, 28695, 28696, 28697, 28700, 28701, 28702, 28703, 28704, 28705, 28706, 28708, 28709, 28710, 28711, 28712, 28713, 28714, 28715, 28716, 28717, 28718, 28719, 28720, 28721, 28722, 28723, 28724, 28726, 28727, 28728, 28730, 28731, 28732, 28733, 28734, 28735, 28736, 28737, 28738, 28739, 28740, 28741, 28742, 28743, 28744, 28745, 28746, 28747, 28749, 28750, 28752, 28753, 28754, 28755, 28756, 28757, 28758, 28759, 28760, 28761, 28762, 28763, 28764, 28765, 28767, 28768, 28769, 28770, 28771, 28772, 28773, 28774, 28775, 28776, 28777, 28778, 28782, 28785, 28786, 28787, 28788, 28791, 28793, 28794, 28795, 28797, 28801, 28802, 28803, 28804, 28806, 28807, 28808, 28811, 28812, 28813, 28815, 28816, 28817, 28819, 28823, 28824, 28826, 28827, 28830, 28831, 28832, 28833, 28834, 28835, 28836, 28837, 28838, 28839, 28840, 28841, 28842, 28848, 28850, 28852, 28853, 28854, 28858, 28862, 28863, 28868, 28869, 28870, 28871, 28873, 28875, 28876, 28877, 28878, 28879, 28880, 28881, 28882, 28883, 28884, 28885, 28886, 28887, 28890, 28892, 28893, 28894, 28896, 28897, 28898, 28899, 28901, 28906, 28910, 28912, 28913, 28914, 28915, 28916, 28917, 28918, 28920, 28922, 28923, 28924, 28926, 28927, 28928, 28929, 28930, 28931, 28932, 28933, 28934, 28935, 28936, 28939, 28940, 28941, 28942, 28943, 28945, 28946, 28948, 28951, 28955, 28956, 28957, 28958, 28959, 28960, 28961, 28962, 28963, 28964, 28965, 28967, 28968, 28969, 28970, 28971, 28972, 28973, 28974, 28978, 28979, 28980, 28981, 28983, 28984, 28985, 28986, 28987, 28988, 28989, 28990, 28991, 28992, 28993, 28994, 28995, 28996, 28998, 28999, 29000, 29001, 29003, 29005, 29007, 29008, 29009, 29010, 29011, 29012, 29013, 29014, 29015, 29016, 29017, 29018, 29019, 29021, 29023, 29024, 29025, 29026, 29027, 29029, 29033, 29034, 29035, 29036, 29037, 29039, 29040, 29041, 29044, 29045, 29046, 29047, 29049, 29051, 29052, 29054, 29055, 29056, 29057, 29058, 29059, 29061, 29062, 29063, 29064, 29065, 29067, 29068, 29069, 29070, 29072, 29073, 29074, 29075, 29077, 29078, 29079, 29082, 29083, 29084, 29085, 29086, 29089, 29090, 29091, 29092, 29093, 29094, 29095, 29097, 29098, 29099, 29101, 29102, 29103, 29104, 29105, 29106, 29108, 29110, 29111, 29112, 29114, 29115, 29116, 29117, 29118, 29119, 29120, 29121, 29122, 29124, 29125, 29126, 29127, 29128, 29129, 29130, 29131, 29132, 29133, 29135, 29136, 29137, 29138, 29139, 29142, 29143, 29144, 29145, 29146, 29147, 29148, 29149, 29150, 29151, 29153, 29154, 29155, 29156, 29158, 29160, 29161, 29162, 29163, 29164, 29165, 29167, 29168, 29169, 29170, 29171, 29172, 29173, 29174, 29175, 29176, 29178, 29179, 29180, 29181, 29182, 29183, 29184, 29185, 29186, 29187, 29188, 29189, 29191, 29192, 29193, 29194, 29195, 29196, 29197, 29198, 29199, 29200, 29201, 29202, 29203, 29204, 29205, 29206, 29207, 29208, 29209, 29210, 29211, 29212, 29214, 29215, 29216, 29217, 29218, 29219, 29220, 29221, 29222, 29223, 29225, 29227, 29229, 29230, 29231, 29234, 29235, 29236, 29242, 29244, 29246, 29248, 29249, 29250, 29251, 29252, 29253, 29254, 29257, 29258, 29259, 29262, 29263, 29264, 29265, 29267, 29268, 29269, 29271, 29272, 29274, 29276, 29278, 29280, 29283, 29284, 29285, 29288, 29290, 29291, 29292, 29293, 29296, 29297, 29299, 29300, 29302, 29303, 29304, 29307, 29308, 29309, 29314, 29315, 29317, 29318, 29319, 29320, 29321, 29324, 29326, 29328, 29329, 29331, 29332, 29333, 29334, 29335, 29336, 29337, 29338, 29339, 29340, 29341, 29342, 29344, 29345, 29346, 29347, 29348, 29349, 29350, 29351, 29352, 29353, 29354, 29355, 29358, 29361, 29362, 29363, 29365, 29370, 29371, 29372, 29373, 29374, 29375, 29376, 29381, 29382, 29383, 29385, 29386, 29387, 29388, 29391, 29393, 29395, 29396, 29397, 29398, 29400, 29402, 29403, 58566, 58567, 58568, 58569, 58570, 58571, 58572, 58573, 58574, 58575, 58576, 58577, 58578, 58579, 58580, 58581, 58582, 58583, 58584, 58585, 58586, 58587, 58588, 58589, 58590, 58591, 58592, 58593, 58594, 58595, 58596, 58597, 58598, 58599, 58600, 58601, 58602, 58603, 58604, 58605, 58606, 58607, 58608, 58609, 58610, 58611, 58612, 58613, 58614, 58615, 58616, 58617, 58618, 58619, 58620, 58621, 58622, 58623, 58624, 58625, 58626, 58627, 58628, 58629, 58630, 58631, 58632, 58633, 58634, 58635, 58636, 58637, 58638, 58639, 58640, 58641, 58642, 58643, 58644, 58645, 58646, 58647, 58648, 58649, 58650, 58651, 58652, 58653, 58654, 58655, 58656, 58657, 58658, 58659, 58660, 58661, 12288, 12289, 12290, 183, 713, 711, 168, 12291, 12293, 8212, 65374, 8214, 8230, 8216, 8217, 8220, 8221, 12308, 12309, 12296, 12297, 12298, 12299, 12300, 12301, 12302, 12303, 12310, 12311, 12304, 12305, 177, 215, 247, 8758, 8743, 8744, 8721, 8719, 8746, 8745, 8712, 8759, 8730, 8869, 8741, 8736, 8978, 8857, 8747, 8750, 8801, 8780, 8776, 8765, 8733, 8800, 8814, 8815, 8804, 8805, 8734, 8757, 8756, 9794, 9792, 176, 8242, 8243, 8451, 65284, 164, 65504, 65505, 8240, 167, 8470, 9734, 9733, 9675, 9679, 9678, 9671, 9670, 9633, 9632, 9651, 9650, 8251, 8594, 8592, 8593, 8595, 12307, 58662, 58663, 58664, 58665, 58666, 58667, 58668, 58669, 58670, 58671, 58672, 58673, 58674, 58675, 58676, 58677, 58678, 58679, 58680, 58681, 58682, 58683, 58684, 58685, 58686, 58687, 58688, 58689, 58690, 58691, 58692, 58693, 58694, 58695, 58696, 58697, 58698, 58699, 58700, 58701, 58702, 58703, 58704, 58705, 58706, 58707, 58708, 58709, 58710, 58711, 58712, 58713, 58714, 58715, 58716, 58717, 58718, 58719, 58720, 58721, 58722, 58723, 58724, 58725, 58726, 58727, 58728, 58729, 58730, 58731, 58732, 58733, 58734, 58735, 58736, 58737, 58738, 58739, 58740, 58741, 58742, 58743, 58744, 58745, 58746, 58747, 58748, 58749, 58750, 58751, 58752, 58753, 58754, 58755, 58756, 58757, 8560, 8561, 8562, 8563, 8564, 8565, 8566, 8567, 8568, 8569, 59238, 59239, 59240, 59241, 59242, 59243, 9352, 9353, 9354, 9355, 9356, 9357, 9358, 9359, 9360, 9361, 9362, 9363, 9364, 9365, 9366, 9367, 9368, 9369, 9370, 9371, 9332, 9333, 9334, 9335, 9336, 9337, 9338, 9339, 9340, 9341, 9342, 9343, 9344, 9345, 9346, 9347, 9348, 9349, 9350, 9351, 9312, 9313, 9314, 9315, 9316, 9317, 9318, 9319, 9320, 9321, 8364, 59245, 12832, 12833, 12834, 12835, 12836, 12837, 12838, 12839, 12840, 12841, 59246, 59247, 8544, 8545, 8546, 8547, 8548, 8549, 8550, 8551, 8552, 8553, 8554, 8555, 59248, 59249, 58758, 58759, 58760, 58761, 58762, 58763, 58764, 58765, 58766, 58767, 58768, 58769, 58770, 58771, 58772, 58773, 58774, 58775, 58776, 58777, 58778, 58779, 58780, 58781, 58782, 58783, 58784, 58785, 58786, 58787, 58788, 58789, 58790, 58791, 58792, 58793, 58794, 58795, 58796, 58797, 58798, 58799, 58800, 58801, 58802, 58803, 58804, 58805, 58806, 58807, 58808, 58809, 58810, 58811, 58812, 58813, 58814, 58815, 58816, 58817, 58818, 58819, 58820, 58821, 58822, 58823, 58824, 58825, 58826, 58827, 58828, 58829, 58830, 58831, 58832, 58833, 58834, 58835, 58836, 58837, 58838, 58839, 58840, 58841, 58842, 58843, 58844, 58845, 58846, 58847, 58848, 58849, 58850, 58851, 58852, 12288, 65281, 65282, 65283, 65509, 65285, 65286, 65287, 65288, 65289, 65290, 65291, 65292, 65293, 65294, 65295, 65296, 65297, 65298, 65299, 65300, 65301, 65302, 65303, 65304, 65305, 65306, 65307, 65308, 65309, 65310, 65311, 65312, 65313, 65314, 65315, 65316, 65317, 65318, 65319, 65320, 65321, 65322, 65323, 65324, 65325, 65326, 65327, 65328, 65329, 65330, 65331, 65332, 65333, 65334, 65335, 65336, 65337, 65338, 65339, 65340, 65341, 65342, 65343, 65344, 65345, 65346, 65347, 65348, 65349, 65350, 65351, 65352, 65353, 65354, 65355, 65356, 65357, 65358, 65359, 65360, 65361, 65362, 65363, 65364, 65365, 65366, 65367, 65368, 65369, 65370, 65371, 65372, 65373, 65507, 58854, 58855, 58856, 58857, 58858, 58859, 58860, 58861, 58862, 58863, 58864, 58865, 58866, 58867, 58868, 58869, 58870, 58871, 58872, 58873, 58874, 58875, 58876, 58877, 58878, 58879, 58880, 58881, 58882, 58883, 58884, 58885, 58886, 58887, 58888, 58889, 58890, 58891, 58892, 58893, 58894, 58895, 58896, 58897, 58898, 58899, 58900, 58901, 58902, 58903, 58904, 58905, 58906, 58907, 58908, 58909, 58910, 58911, 58912, 58913, 58914, 58915, 58916, 58917, 58918, 58919, 58920, 58921, 58922, 58923, 58924, 58925, 58926, 58927, 58928, 58929, 58930, 58931, 58932, 58933, 58934, 58935, 58936, 58937, 58938, 58939, 58940, 58941, 58942, 58943, 58944, 58945, 58946, 58947, 58948, 58949, 12353, 12354, 12355, 12356, 12357, 12358, 12359, 12360, 12361, 12362, 12363, 12364, 12365, 12366, 12367, 12368, 12369, 12370, 12371, 12372, 12373, 12374, 12375, 12376, 12377, 12378, 12379, 12380, 12381, 12382, 12383, 12384, 12385, 12386, 12387, 12388, 12389, 12390, 12391, 12392, 12393, 12394, 12395, 12396, 12397, 12398, 12399, 12400, 12401, 12402, 12403, 12404, 12405, 12406, 12407, 12408, 12409, 12410, 12411, 12412, 12413, 12414, 12415, 12416, 12417, 12418, 12419, 12420, 12421, 12422, 12423, 12424, 12425, 12426, 12427, 12428, 12429, 12430, 12431, 12432, 12433, 12434, 12435, 59250, 59251, 59252, 59253, 59254, 59255, 59256, 59257, 59258, 59259, 59260, 58950, 58951, 58952, 58953, 58954, 58955, 58956, 58957, 58958, 58959, 58960, 58961, 58962, 58963, 58964, 58965, 58966, 58967, 58968, 58969, 58970, 58971, 58972, 58973, 58974, 58975, 58976, 58977, 58978, 58979, 58980, 58981, 58982, 58983, 58984, 58985, 58986, 58987, 58988, 58989, 58990, 58991, 58992, 58993, 58994, 58995, 58996, 58997, 58998, 58999, 59000, 59001, 59002, 59003, 59004, 59005, 59006, 59007, 59008, 59009, 59010, 59011, 59012, 59013, 59014, 59015, 59016, 59017, 59018, 59019, 59020, 59021, 59022, 59023, 59024, 59025, 59026, 59027, 59028, 59029, 59030, 59031, 59032, 59033, 59034, 59035, 59036, 59037, 59038, 59039, 59040, 59041, 59042, 59043, 59044, 59045, 12449, 12450, 12451, 12452, 12453, 12454, 12455, 12456, 12457, 12458, 12459, 12460, 12461, 12462, 12463, 12464, 12465, 12466, 12467, 12468, 12469, 12470, 12471, 12472, 12473, 12474, 12475, 12476, 12477, 12478, 12479, 12480, 12481, 12482, 12483, 12484, 12485, 12486, 12487, 12488, 12489, 12490, 12491, 12492, 12493, 12494, 12495, 12496, 12497, 12498, 12499, 12500, 12501, 12502, 12503, 12504, 12505, 12506, 12507, 12508, 12509, 12510, 12511, 12512, 12513, 12514, 12515, 12516, 12517, 12518, 12519, 12520, 12521, 12522, 12523, 12524, 12525, 12526, 12527, 12528, 12529, 12530, 12531, 12532, 12533, 12534, 59261, 59262, 59263, 59264, 59265, 59266, 59267, 59268, 59046, 59047, 59048, 59049, 59050, 59051, 59052, 59053, 59054, 59055, 59056, 59057, 59058, 59059, 59060, 59061, 59062, 59063, 59064, 59065, 59066, 59067, 59068, 59069, 59070, 59071, 59072, 59073, 59074, 59075, 59076, 59077, 59078, 59079, 59080, 59081, 59082, 59083, 59084, 59085, 59086, 59087, 59088, 59089, 59090, 59091, 59092, 59093, 59094, 59095, 59096, 59097, 59098, 59099, 59100, 59101, 59102, 59103, 59104, 59105, 59106, 59107, 59108, 59109, 59110, 59111, 59112, 59113, 59114, 59115, 59116, 59117, 59118, 59119, 59120, 59121, 59122, 59123, 59124, 59125, 59126, 59127, 59128, 59129, 59130, 59131, 59132, 59133, 59134, 59135, 59136, 59137, 59138, 59139, 59140, 59141, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 59269, 59270, 59271, 59272, 59273, 59274, 59275, 59276, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 963, 964, 965, 966, 967, 968, 969, 59277, 59278, 59279, 59280, 59281, 59282, 59283, 65077, 65078, 65081, 65082, 65087, 65088, 65085, 65086, 65089, 65090, 65091, 65092, 59284, 59285, 65083, 65084, 65079, 65080, 65073, 59286, 65075, 65076, 59287, 59288, 59289, 59290, 59291, 59292, 59293, 59294, 59295, 59142, 59143, 59144, 59145, 59146, 59147, 59148, 59149, 59150, 59151, 59152, 59153, 59154, 59155, 59156, 59157, 59158, 59159, 59160, 59161, 59162, 59163, 59164, 59165, 59166, 59167, 59168, 59169, 59170, 59171, 59172, 59173, 59174, 59175, 59176, 59177, 59178, 59179, 59180, 59181, 59182, 59183, 59184, 59185, 59186, 59187, 59188, 59189, 59190, 59191, 59192, 59193, 59194, 59195, 59196, 59197, 59198, 59199, 59200, 59201, 59202, 59203, 59204, 59205, 59206, 59207, 59208, 59209, 59210, 59211, 59212, 59213, 59214, 59215, 59216, 59217, 59218, 59219, 59220, 59221, 59222, 59223, 59224, 59225, 59226, 59227, 59228, 59229, 59230, 59231, 59232, 59233, 59234, 59235, 59236, 59237, 1040, 1041, 1042, 1043, 1044, 1045, 1025, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 59296, 59297, 59298, 59299, 59300, 59301, 59302, 59303, 59304, 59305, 59306, 59307, 59308, 59309, 59310, 1072, 1073, 1074, 1075, 1076, 1077, 1105, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103, 59311, 59312, 59313, 59314, 59315, 59316, 59317, 59318, 59319, 59320, 59321, 59322, 59323, 714, 715, 729, 8211, 8213, 8229, 8245, 8453, 8457, 8598, 8599, 8600, 8601, 8725, 8735, 8739, 8786, 8806, 8807, 8895, 9552, 9553, 9554, 9555, 9556, 9557, 9558, 9559, 9560, 9561, 9562, 9563, 9564, 9565, 9566, 9567, 9568, 9569, 9570, 9571, 9572, 9573, 9574, 9575, 9576, 9577, 9578, 9579, 9580, 9581, 9582, 9583, 9584, 9585, 9586, 9587, 9601, 9602, 9603, 9604, 9605, 9606, 9607, 9608, 9609, 9610, 9611, 9612, 9613, 9614, 9615, 9619, 9620, 9621, 9660, 9661, 9698, 9699, 9700, 9701, 9737, 8853, 12306, 12317, 12318, 59324, 59325, 59326, 59327, 59328, 59329, 59330, 59331, 59332, 59333, 59334, 257, 225, 462, 224, 275, 233, 283, 232, 299, 237, 464, 236, 333, 243, 466, 242, 363, 250, 468, 249, 470, 472, 474, 476, 252, 234, 593, 7743, 324, 328, 505, 609, 59337, 59338, 59339, 59340, 12549, 12550, 12551, 12552, 12553, 12554, 12555, 12556, 12557, 12558, 12559, 12560, 12561, 12562, 12563, 12564, 12565, 12566, 12567, 12568, 12569, 12570, 12571, 12572, 12573, 12574, 12575, 12576, 12577, 12578, 12579, 12580, 12581, 12582, 12583, 12584, 12585, 59341, 59342, 59343, 59344, 59345, 59346, 59347, 59348, 59349, 59350, 59351, 59352, 59353, 59354, 59355, 59356, 59357, 59358, 59359, 59360, 59361, 12321, 12322, 12323, 12324, 12325, 12326, 12327, 12328, 12329, 12963, 13198, 13199, 13212, 13213, 13214, 13217, 13252, 13262, 13265, 13266, 13269, 65072, 65506, 65508, 59362, 8481, 12849, 59363, 8208, 59364, 59365, 59366, 12540, 12443, 12444, 12541, 12542, 12294, 12445, 12446, 65097, 65098, 65099, 65100, 65101, 65102, 65103, 65104, 65105, 65106, 65108, 65109, 65110, 65111, 65113, 65114, 65115, 65116, 65117, 65118, 65119, 65120, 65121, 65122, 65123, 65124, 65125, 65126, 65128, 65129, 65130, 65131, 12350, 12272, 12273, 12274, 12275, 12276, 12277, 12278, 12279, 12280, 12281, 12282, 12283, 12295, 59380, 59381, 59382, 59383, 59384, 59385, 59386, 59387, 59388, 59389, 59390, 59391, 59392, 9472, 9473, 9474, 9475, 9476, 9477, 9478, 9479, 9480, 9481, 9482, 9483, 9484, 9485, 9486, 9487, 9488, 9489, 9490, 9491, 9492, 9493, 9494, 9495, 9496, 9497, 9498, 9499, 9500, 9501, 9502, 9503, 9504, 9505, 9506, 9507, 9508, 9509, 9510, 9511, 9512, 9513, 9514, 9515, 9516, 9517, 9518, 9519, 9520, 9521, 9522, 9523, 9524, 9525, 9526, 9527, 9528, 9529, 9530, 9531, 9532, 9533, 9534, 9535, 9536, 9537, 9538, 9539, 9540, 9541, 9542, 9543, 9544, 9545, 9546, 9547, 59393, 59394, 59395, 59396, 59397, 59398, 59399, 59400, 59401, 59402, 59403, 59404, 59405, 59406, 59407, 29404, 29405, 29407, 29410, 29411, 29412, 29413, 29414, 29415, 29418, 29419, 29429, 29430, 29433, 29437, 29438, 29439, 29440, 29442, 29444, 29445, 29446, 29447, 29448, 29449, 29451, 29452, 29453, 29455, 29456, 29457, 29458, 29460, 29464, 29465, 29466, 29471, 29472, 29475, 29476, 29478, 29479, 29480, 29485, 29487, 29488, 29490, 29491, 29493, 29494, 29498, 29499, 29500, 29501, 29504, 29505, 29506, 29507, 29508, 29509, 29510, 29511, 29512, 29513, 29514, 29515, 29516, 29518, 29519, 29521, 29523, 29524, 29525, 29526, 29528, 29529, 29530, 29531, 29532, 29533, 29534, 29535, 29537, 29538, 29539, 29540, 29541, 29542, 29543, 29544, 29545, 29546, 29547, 29550, 29552, 29553, 57344, 57345, 57346, 57347, 57348, 57349, 57350, 57351, 57352, 57353, 57354, 57355, 57356, 57357, 57358, 57359, 57360, 57361, 57362, 57363, 57364, 57365, 57366, 57367, 57368, 57369, 57370, 57371, 57372, 57373, 57374, 57375, 57376, 57377, 57378, 57379, 57380, 57381, 57382, 57383, 57384, 57385, 57386, 57387, 57388, 57389, 57390, 57391, 57392, 57393, 57394, 57395, 57396, 57397, 57398, 57399, 57400, 57401, 57402, 57403, 57404, 57405, 57406, 57407, 57408, 57409, 57410, 57411, 57412, 57413, 57414, 57415, 57416, 57417, 57418, 57419, 57420, 57421, 57422, 57423, 57424, 57425, 57426, 57427, 57428, 57429, 57430, 57431, 57432, 57433, 57434, 57435, 57436, 57437, 29554, 29555, 29556, 29557, 29558, 29559, 29560, 29561, 29562, 29563, 29564, 29565, 29567, 29568, 29569, 29570, 29571, 29573, 29574, 29576, 29578, 29580, 29581, 29583, 29584, 29586, 29587, 29588, 29589, 29591, 29592, 29593, 29594, 29596, 29597, 29598, 29600, 29601, 29603, 29604, 29605, 29606, 29607, 29608, 29610, 29612, 29613, 29617, 29620, 29621, 29622, 29624, 29625, 29628, 29629, 29630, 29631, 29633, 29635, 29636, 29637, 29638, 29639, 29643, 29644, 29646, 29650, 29651, 29652, 29653, 29654, 29655, 29656, 29658, 29659, 29660, 29661, 29663, 29665, 29666, 29667, 29668, 29670, 29672, 29674, 29675, 29676, 29678, 29679, 29680, 29681, 29683, 29684, 29685, 29686, 29687, 57438, 57439, 57440, 57441, 57442, 57443, 57444, 57445, 57446, 57447, 57448, 57449, 57450, 57451, 57452, 57453, 57454, 57455, 57456, 57457, 57458, 57459, 57460, 57461, 57462, 57463, 57464, 57465, 57466, 57467, 57468, 57469, 57470, 57471, 57472, 57473, 57474, 57475, 57476, 57477, 57478, 57479, 57480, 57481, 57482, 57483, 57484, 57485, 57486, 57487, 57488, 57489, 57490, 57491, 57492, 57493, 57494, 57495, 57496, 57497, 57498, 57499, 57500, 57501, 57502, 57503, 57504, 57505, 57506, 57507, 57508, 57509, 57510, 57511, 57512, 57513, 57514, 57515, 57516, 57517, 57518, 57519, 57520, 57521, 57522, 57523, 57524, 57525, 57526, 57527, 57528, 57529, 57530, 57531, 29688, 29689, 29690, 29691, 29692, 29693, 29694, 29695, 29696, 29697, 29698, 29700, 29703, 29704, 29707, 29708, 29709, 29710, 29713, 29714, 29715, 29716, 29717, 29718, 29719, 29720, 29721, 29724, 29725, 29726, 29727, 29728, 29729, 29731, 29732, 29735, 29737, 29739, 29741, 29743, 29745, 29746, 29751, 29752, 29753, 29754, 29755, 29757, 29758, 29759, 29760, 29762, 29763, 29764, 29765, 29766, 29767, 29768, 29769, 29770, 29771, 29772, 29773, 29774, 29775, 29776, 29777, 29778, 29779, 29780, 29782, 29784, 29789, 29792, 29793, 29794, 29795, 29796, 29797, 29798, 29799, 29800, 29801, 29802, 29803, 29804, 29806, 29807, 29809, 29810, 29811, 29812, 29813, 29816, 29817, 29818, 57532, 57533, 57534, 57535, 57536, 57537, 57538, 57539, 57540, 57541, 57542, 57543, 57544, 57545, 57546, 57547, 57548, 57549, 57550, 57551, 57552, 57553, 57554, 57555, 57556, 57557, 57558, 57559, 57560, 57561, 57562, 57563, 57564, 57565, 57566, 57567, 57568, 57569, 57570, 57571, 57572, 57573, 57574, 57575, 57576, 57577, 57578, 57579, 57580, 57581, 57582, 57583, 57584, 57585, 57586, 57587, 57588, 57589, 57590, 57591, 57592, 57593, 57594, 57595, 57596, 57597, 57598, 57599, 57600, 57601, 57602, 57603, 57604, 57605, 57606, 57607, 57608, 57609, 57610, 57611, 57612, 57613, 57614, 57615, 57616, 57617, 57618, 57619, 57620, 57621, 57622, 57623, 57624, 57625, 29819, 29820, 29821, 29823, 29826, 29828, 29829, 29830, 29832, 29833, 29834, 29836, 29837, 29839, 29841, 29842, 29843, 29844, 29845, 29846, 29847, 29848, 29849, 29850, 29851, 29853, 29855, 29856, 29857, 29858, 29859, 29860, 29861, 29862, 29866, 29867, 29868, 29869, 29870, 29871, 29872, 29873, 29874, 29875, 29876, 29877, 29878, 29879, 29880, 29881, 29883, 29884, 29885, 29886, 29887, 29888, 29889, 29890, 29891, 29892, 29893, 29894, 29895, 29896, 29897, 29898, 29899, 29900, 29901, 29902, 29903, 29904, 29905, 29907, 29908, 29909, 29910, 29911, 29912, 29913, 29914, 29915, 29917, 29919, 29921, 29925, 29927, 29928, 29929, 29930, 29931, 29932, 29933, 29936, 29937, 29938, 57626, 57627, 57628, 57629, 57630, 57631, 57632, 57633, 57634, 57635, 57636, 57637, 57638, 57639, 57640, 57641, 57642, 57643, 57644, 57645, 57646, 57647, 57648, 57649, 57650, 57651, 57652, 57653, 57654, 57655, 57656, 57657, 57658, 57659, 57660, 57661, 57662, 57663, 57664, 57665, 57666, 57667, 57668, 57669, 57670, 57671, 57672, 57673, 57674, 57675, 57676, 57677, 57678, 57679, 57680, 57681, 57682, 57683, 57684, 57685, 57686, 57687, 57688, 57689, 57690, 57691, 57692, 57693, 57694, 57695, 57696, 57697, 57698, 57699, 57700, 57701, 57702, 57703, 57704, 57705, 57706, 57707, 57708, 57709, 57710, 57711, 57712, 57713, 57714, 57715, 57716, 57717, 57718, 57719, 29939, 29941, 29944, 29945, 29946, 29947, 29948, 29949, 29950, 29952, 29953, 29954, 29955, 29957, 29958, 29959, 29960, 29961, 29962, 29963, 29964, 29966, 29968, 29970, 29972, 29973, 29974, 29975, 29979, 29981, 29982, 29984, 29985, 29986, 29987, 29988, 29990, 29991, 29994, 29998, 30004, 30006, 30009, 30012, 30013, 30015, 30017, 30018, 30019, 30020, 30022, 30023, 30025, 30026, 30029, 30032, 30033, 30034, 30035, 30037, 30038, 30039, 30040, 30045, 30046, 30047, 30048, 30049, 30050, 30051, 30052, 30055, 30056, 30057, 30059, 30060, 30061, 30062, 30063, 30064, 30065, 30067, 30069, 30070, 30071, 30074, 30075, 30076, 30077, 30078, 30080, 30081, 30082, 30084, 30085, 30087, 57720, 57721, 57722, 57723, 57724, 57725, 57726, 57727, 57728, 57729, 57730, 57731, 57732, 57733, 57734, 57735, 57736, 57737, 57738, 57739, 57740, 57741, 57742, 57743, 57744, 57745, 57746, 57747, 57748, 57749, 57750, 57751, 57752, 57753, 57754, 57755, 57756, 57757, 57758, 57759, 57760, 57761, 57762, 57763, 57764, 57765, 57766, 57767, 57768, 57769, 57770, 57771, 57772, 57773, 57774, 57775, 57776, 57777, 57778, 57779, 57780, 57781, 57782, 57783, 57784, 57785, 57786, 57787, 57788, 57789, 57790, 57791, 57792, 57793, 57794, 57795, 57796, 57797, 57798, 57799, 57800, 57801, 57802, 57803, 57804, 57805, 57806, 57807, 57808, 57809, 57810, 57811, 57812, 57813, 30088, 30089, 30090, 30092, 30093, 30094, 30096, 30099, 30101, 30104, 30107, 30108, 30110, 30114, 30118, 30119, 30120, 30121, 30122, 30125, 30134, 30135, 30138, 30139, 30143, 30144, 30145, 30150, 30155, 30156, 30158, 30159, 30160, 30161, 30163, 30167, 30169, 30170, 30172, 30173, 30175, 30176, 30177, 30181, 30185, 30188, 30189, 30190, 30191, 30194, 30195, 30197, 30198, 30199, 30200, 30202, 30203, 30205, 30206, 30210, 30212, 30214, 30215, 30216, 30217, 30219, 30221, 30222, 30223, 30225, 30226, 30227, 30228, 30230, 30234, 30236, 30237, 30238, 30241, 30243, 30247, 30248, 30252, 30254, 30255, 30257, 30258, 30262, 30263, 30265, 30266, 30267, 30269, 30273, 30274, 30276, 57814, 57815, 57816, 57817, 57818, 57819, 57820, 57821, 57822, 57823, 57824, 57825, 57826, 57827, 57828, 57829, 57830, 57831, 57832, 57833, 57834, 57835, 57836, 57837, 57838, 57839, 57840, 57841, 57842, 57843, 57844, 57845, 57846, 57847, 57848, 57849, 57850, 57851, 57852, 57853, 57854, 57855, 57856, 57857, 57858, 57859, 57860, 57861, 57862, 57863, 57864, 57865, 57866, 57867, 57868, 57869, 57870, 57871, 57872, 57873, 57874, 57875, 57876, 57877, 57878, 57879, 57880, 57881, 57882, 57883, 57884, 57885, 57886, 57887, 57888, 57889, 57890, 57891, 57892, 57893, 57894, 57895, 57896, 57897, 57898, 57899, 57900, 57901, 57902, 57903, 57904, 57905, 57906, 57907, 30277, 30278, 30279, 30280, 30281, 30282, 30283, 30286, 30287, 30288, 30289, 30290, 30291, 30293, 30295, 30296, 30297, 30298, 30299, 30301, 30303, 30304, 30305, 30306, 30308, 30309, 30310, 30311, 30312, 30313, 30314, 30316, 30317, 30318, 30320, 30321, 30322, 30323, 30324, 30325, 30326, 30327, 30329, 30330, 30332, 30335, 30336, 30337, 30339, 30341, 30345, 30346, 30348, 30349, 30351, 30352, 30354, 30356, 30357, 30359, 30360, 30362, 30363, 30364, 30365, 30366, 30367, 30368, 30369, 30370, 30371, 30373, 30374, 30375, 30376, 30377, 30378, 30379, 30380, 30381, 30383, 30384, 30387, 30389, 30390, 30391, 30392, 30393, 30394, 30395, 30396, 30397, 30398, 30400, 30401, 30403, 21834, 38463, 22467, 25384, 21710, 21769, 21696, 30353, 30284, 34108, 30702, 33406, 30861, 29233, 38552, 38797, 27688, 23433, 20474, 25353, 26263, 23736, 33018, 26696, 32942, 26114, 30414, 20985, 25942, 29100, 32753, 34948, 20658, 22885, 25034, 28595, 33453, 25420, 25170, 21485, 21543, 31494, 20843, 30116, 24052, 25300, 36299, 38774, 25226, 32793, 22365, 38712, 32610, 29240, 30333, 26575, 30334, 25670, 20336, 36133, 25308, 31255, 26001, 29677, 25644, 25203, 33324, 39041, 26495, 29256, 25198, 25292, 20276, 29923, 21322, 21150, 32458, 37030, 24110, 26758, 27036, 33152, 32465, 26834, 30917, 34444, 38225, 20621, 35876, 33502, 32990, 21253, 35090, 21093, 30404, 30407, 30409, 30411, 30412, 30419, 30421, 30425, 30426, 30428, 30429, 30430, 30432, 30433, 30434, 30435, 30436, 30438, 30439, 30440, 30441, 30442, 30443, 30444, 30445, 30448, 30451, 30453, 30454, 30455, 30458, 30459, 30461, 30463, 30464, 30466, 30467, 30469, 30470, 30474, 30476, 30478, 30479, 30480, 30481, 30482, 30483, 30484, 30485, 30486, 30487, 30488, 30491, 30492, 30493, 30494, 30497, 30499, 30500, 30501, 30503, 30506, 30507, 30508, 30510, 30512, 30513, 30514, 30515, 30516, 30521, 30523, 30525, 30526, 30527, 30530, 30532, 30533, 30534, 30536, 30537, 30538, 30539, 30540, 30541, 30542, 30543, 30546, 30547, 30548, 30549, 30550, 30551, 30552, 30553, 30556, 34180, 38649, 20445, 22561, 39281, 23453, 25265, 25253, 26292, 35961, 40077, 29190, 26479, 30865, 24754, 21329, 21271, 36744, 32972, 36125, 38049, 20493, 29384, 22791, 24811, 28953, 34987, 22868, 33519, 26412, 31528, 23849, 32503, 29997, 27893, 36454, 36856, 36924, 40763, 27604, 37145, 31508, 24444, 30887, 34006, 34109, 27605, 27609, 27606, 24065, 24199, 30201, 38381, 25949, 24330, 24517, 36767, 22721, 33218, 36991, 38491, 38829, 36793, 32534, 36140, 25153, 20415, 21464, 21342, 36776, 36777, 36779, 36941, 26631, 24426, 33176, 34920, 40150, 24971, 21035, 30250, 24428, 25996, 28626, 28392, 23486, 25672, 20853, 20912, 26564, 19993, 31177, 39292, 28851, 30557, 30558, 30559, 30560, 30564, 30567, 30569, 30570, 30573, 30574, 30575, 30576, 30577, 30578, 30579, 30580, 30581, 30582, 30583, 30584, 30586, 30587, 30588, 30593, 30594, 30595, 30598, 30599, 30600, 30601, 30602, 30603, 30607, 30608, 30611, 30612, 30613, 30614, 30615, 30616, 30617, 30618, 30619, 30620, 30621, 30622, 30625, 30627, 30628, 30630, 30632, 30635, 30637, 30638, 30639, 30641, 30642, 30644, 30646, 30647, 30648, 30649, 30650, 30652, 30654, 30656, 30657, 30658, 30659, 30660, 30661, 30662, 30663, 30664, 30665, 30666, 30667, 30668, 30670, 30671, 30672, 30673, 30674, 30675, 30676, 30677, 30678, 30680, 30681, 30682, 30685, 30686, 30687, 30688, 30689, 30692, 30149, 24182, 29627, 33760, 25773, 25320, 38069, 27874, 21338, 21187, 25615, 38082, 31636, 20271, 24091, 33334, 33046, 33162, 28196, 27850, 39539, 25429, 21340, 21754, 34917, 22496, 19981, 24067, 27493, 31807, 37096, 24598, 25830, 29468, 35009, 26448, 25165, 36130, 30572, 36393, 37319, 24425, 33756, 34081, 39184, 21442, 34453, 27531, 24813, 24808, 28799, 33485, 33329, 20179, 27815, 34255, 25805, 31961, 27133, 26361, 33609, 21397, 31574, 20391, 20876, 27979, 23618, 36461, 25554, 21449, 33580, 33590, 26597, 30900, 25661, 23519, 23700, 24046, 35815, 25286, 26612, 35962, 25600, 25530, 34633, 39307, 35863, 32544, 38130, 20135, 38416, 39076, 26124, 29462, 30694, 30696, 30698, 30703, 30704, 30705, 30706, 30708, 30709, 30711, 30713, 30714, 30715, 30716, 30723, 30724, 30725, 30726, 30727, 30728, 30730, 30731, 30734, 30735, 30736, 30739, 30741, 30745, 30747, 30750, 30752, 30753, 30754, 30756, 30760, 30762, 30763, 30766, 30767, 30769, 30770, 30771, 30773, 30774, 30781, 30783, 30785, 30786, 30787, 30788, 30790, 30792, 30793, 30794, 30795, 30797, 30799, 30801, 30803, 30804, 30808, 30809, 30810, 30811, 30812, 30814, 30815, 30816, 30817, 30818, 30819, 30820, 30821, 30822, 30823, 30824, 30825, 30831, 30832, 30833, 30834, 30835, 30836, 30837, 30838, 30840, 30841, 30842, 30843, 30845, 30846, 30847, 30848, 30849, 30850, 30851, 22330, 23581, 24120, 38271, 20607, 32928, 21378, 25950, 30021, 21809, 20513, 36229, 25220, 38046, 26397, 22066, 28526, 24034, 21557, 28818, 36710, 25199, 25764, 25507, 24443, 28552, 37108, 33251, 36784, 23576, 26216, 24561, 27785, 38472, 36225, 34924, 25745, 31216, 22478, 27225, 25104, 21576, 20056, 31243, 24809, 28548, 35802, 25215, 36894, 39563, 31204, 21507, 30196, 25345, 21273, 27744, 36831, 24347, 39536, 32827, 40831, 20360, 23610, 36196, 32709, 26021, 28861, 20805, 20914, 34411, 23815, 23456, 25277, 37228, 30068, 36364, 31264, 24833, 31609, 20167, 32504, 30597, 19985, 33261, 21021, 20986, 27249, 21416, 36487, 38148, 38607, 28353, 38500, 26970, 30852, 30853, 30854, 30856, 30858, 30859, 30863, 30864, 30866, 30868, 30869, 30870, 30873, 30877, 30878, 30880, 30882, 30884, 30886, 30888, 30889, 30890, 30891, 30892, 30893, 30894, 30895, 30901, 30902, 30903, 30904, 30906, 30907, 30908, 30909, 30911, 30912, 30914, 30915, 30916, 30918, 30919, 30920, 30924, 30925, 30926, 30927, 30929, 30930, 30931, 30934, 30935, 30936, 30938, 30939, 30940, 30941, 30942, 30943, 30944, 30945, 30946, 30947, 30948, 30949, 30950, 30951, 30953, 30954, 30955, 30957, 30958, 30959, 30960, 30961, 30963, 30965, 30966, 30968, 30969, 30971, 30972, 30973, 30974, 30975, 30976, 30978, 30979, 30980, 30982, 30983, 30984, 30985, 30986, 30987, 30988, 30784, 20648, 30679, 25616, 35302, 22788, 25571, 24029, 31359, 26941, 20256, 33337, 21912, 20018, 30126, 31383, 24162, 24202, 38383, 21019, 21561, 28810, 25462, 38180, 22402, 26149, 26943, 37255, 21767, 28147, 32431, 34850, 25139, 32496, 30133, 33576, 30913, 38604, 36766, 24904, 29943, 35789, 27492, 21050, 36176, 27425, 32874, 33905, 22257, 21254, 20174, 19995, 20945, 31895, 37259, 31751, 20419, 36479, 31713, 31388, 25703, 23828, 20652, 33030, 30209, 31929, 28140, 32736, 26449, 23384, 23544, 30923, 25774, 25619, 25514, 25387, 38169, 25645, 36798, 31572, 30249, 25171, 22823, 21574, 27513, 20643, 25140, 24102, 27526, 20195, 36151, 34955, 24453, 36910, 30989, 30990, 30991, 30992, 30993, 30994, 30996, 30997, 30998, 30999, 31000, 31001, 31002, 31003, 31004, 31005, 31007, 31008, 31009, 31010, 31011, 31013, 31014, 31015, 31016, 31017, 31018, 31019, 31020, 31021, 31022, 31023, 31024, 31025, 31026, 31027, 31029, 31030, 31031, 31032, 31033, 31037, 31039, 31042, 31043, 31044, 31045, 31047, 31050, 31051, 31052, 31053, 31054, 31055, 31056, 31057, 31058, 31060, 31061, 31064, 31065, 31073, 31075, 31076, 31078, 31081, 31082, 31083, 31084, 31086, 31088, 31089, 31090, 31091, 31092, 31093, 31094, 31097, 31099, 31100, 31101, 31102, 31103, 31106, 31107, 31110, 31111, 31112, 31113, 31115, 31116, 31117, 31118, 31120, 31121, 31122, 24608, 32829, 25285, 20025, 21333, 37112, 25528, 32966, 26086, 27694, 20294, 24814, 28129, 35806, 24377, 34507, 24403, 25377, 20826, 33633, 26723, 20992, 25443, 36424, 20498, 23707, 31095, 23548, 21040, 31291, 24764, 36947, 30423, 24503, 24471, 30340, 36460, 28783, 30331, 31561, 30634, 20979, 37011, 22564, 20302, 28404, 36842, 25932, 31515, 29380, 28068, 32735, 23265, 25269, 24213, 22320, 33922, 31532, 24093, 24351, 36882, 32532, 39072, 25474, 28359, 30872, 28857, 20856, 38747, 22443, 30005, 20291, 30008, 24215, 24806, 22880, 28096, 27583, 30857, 21500, 38613, 20939, 20993, 25481, 21514, 38035, 35843, 36300, 29241, 30879, 34678, 36845, 35853, 21472, 31123, 31124, 31125, 31126, 31127, 31128, 31129, 31131, 31132, 31133, 31134, 31135, 31136, 31137, 31138, 31139, 31140, 31141, 31142, 31144, 31145, 31146, 31147, 31148, 31149, 31150, 31151, 31152, 31153, 31154, 31156, 31157, 31158, 31159, 31160, 31164, 31167, 31170, 31172, 31173, 31175, 31176, 31178, 31180, 31182, 31183, 31184, 31187, 31188, 31190, 31191, 31193, 31194, 31195, 31196, 31197, 31198, 31200, 31201, 31202, 31205, 31208, 31210, 31212, 31214, 31217, 31218, 31219, 31220, 31221, 31222, 31223, 31225, 31226, 31228, 31230, 31231, 31233, 31236, 31237, 31239, 31240, 31241, 31242, 31244, 31247, 31248, 31249, 31250, 31251, 31253, 31254, 31256, 31257, 31259, 31260, 19969, 30447, 21486, 38025, 39030, 40718, 38189, 23450, 35746, 20002, 19996, 20908, 33891, 25026, 21160, 26635, 20375, 24683, 20923, 27934, 20828, 25238, 26007, 38497, 35910, 36887, 30168, 37117, 30563, 27602, 29322, 29420, 35835, 22581, 30585, 36172, 26460, 38208, 32922, 24230, 28193, 22930, 31471, 30701, 38203, 27573, 26029, 32526, 22534, 20817, 38431, 23545, 22697, 21544, 36466, 25958, 39039, 22244, 38045, 30462, 36929, 25479, 21702, 22810, 22842, 22427, 36530, 26421, 36346, 33333, 21057, 24816, 22549, 34558, 23784, 40517, 20420, 39069, 35769, 23077, 24694, 21380, 25212, 36943, 37122, 39295, 24681, 32780, 20799, 32819, 23572, 39285, 27953, 20108, 31261, 31263, 31265, 31266, 31268, 31269, 31270, 31271, 31272, 31273, 31274, 31275, 31276, 31277, 31278, 31279, 31280, 31281, 31282, 31284, 31285, 31286, 31288, 31290, 31294, 31296, 31297, 31298, 31299, 31300, 31301, 31303, 31304, 31305, 31306, 31307, 31308, 31309, 31310, 31311, 31312, 31314, 31315, 31316, 31317, 31318, 31320, 31321, 31322, 31323, 31324, 31325, 31326, 31327, 31328, 31329, 31330, 31331, 31332, 31333, 31334, 31335, 31336, 31337, 31338, 31339, 31340, 31341, 31342, 31343, 31345, 31346, 31347, 31349, 31355, 31356, 31357, 31358, 31362, 31365, 31367, 31369, 31370, 31371, 31372, 31374, 31375, 31376, 31379, 31380, 31385, 31386, 31387, 31390, 31393, 31394, 36144, 21457, 32602, 31567, 20240, 20047, 38400, 27861, 29648, 34281, 24070, 30058, 32763, 27146, 30718, 38034, 32321, 20961, 28902, 21453, 36820, 33539, 36137, 29359, 39277, 27867, 22346, 33459, 26041, 32938, 25151, 38450, 22952, 20223, 35775, 32442, 25918, 33778, 38750, 21857, 39134, 32933, 21290, 35837, 21536, 32954, 24223, 27832, 36153, 33452, 37210, 21545, 27675, 20998, 32439, 22367, 28954, 27774, 31881, 22859, 20221, 24575, 24868, 31914, 20016, 23553, 26539, 34562, 23792, 38155, 39118, 30127, 28925, 36898, 20911, 32541, 35773, 22857, 20964, 20315, 21542, 22827, 25975, 32932, 23413, 25206, 25282, 36752, 24133, 27679, 31526, 20239, 20440, 26381, 31395, 31396, 31399, 31401, 31402, 31403, 31406, 31407, 31408, 31409, 31410, 31412, 31413, 31414, 31415, 31416, 31417, 31418, 31419, 31420, 31421, 31422, 31424, 31425, 31426, 31427, 31428, 31429, 31430, 31431, 31432, 31433, 31434, 31436, 31437, 31438, 31439, 31440, 31441, 31442, 31443, 31444, 31445, 31447, 31448, 31450, 31451, 31452, 31453, 31457, 31458, 31460, 31463, 31464, 31465, 31466, 31467, 31468, 31470, 31472, 31473, 31474, 31475, 31476, 31477, 31478, 31479, 31480, 31483, 31484, 31486, 31488, 31489, 31490, 31493, 31495, 31497, 31500, 31501, 31502, 31504, 31506, 31507, 31510, 31511, 31512, 31514, 31516, 31517, 31519, 31521, 31522, 31523, 31527, 31529, 31533, 28014, 28074, 31119, 34993, 24343, 29995, 25242, 36741, 20463, 37340, 26023, 33071, 33105, 24220, 33104, 36212, 21103, 35206, 36171, 22797, 20613, 20184, 38428, 29238, 33145, 36127, 23500, 35747, 38468, 22919, 32538, 21648, 22134, 22030, 35813, 25913, 27010, 38041, 30422, 28297, 24178, 29976, 26438, 26577, 31487, 32925, 36214, 24863, 31174, 25954, 36195, 20872, 21018, 38050, 32568, 32923, 32434, 23703, 28207, 26464, 31705, 30347, 39640, 33167, 32660, 31957, 25630, 38224, 31295, 21578, 21733, 27468, 25601, 25096, 40509, 33011, 30105, 21106, 38761, 33883, 26684, 34532, 38401, 38548, 38124, 20010, 21508, 32473, 26681, 36319, 32789, 26356, 24218, 32697, 31535, 31536, 31538, 31540, 31541, 31542, 31543, 31545, 31547, 31549, 31551, 31552, 31553, 31554, 31555, 31556, 31558, 31560, 31562, 31565, 31566, 31571, 31573, 31575, 31577, 31580, 31582, 31583, 31585, 31587, 31588, 31589, 31590, 31591, 31592, 31593, 31594, 31595, 31596, 31597, 31599, 31600, 31603, 31604, 31606, 31608, 31610, 31612, 31613, 31615, 31617, 31618, 31619, 31620, 31622, 31623, 31624, 31625, 31626, 31627, 31628, 31630, 31631, 31633, 31634, 31635, 31638, 31640, 31641, 31642, 31643, 31646, 31647, 31648, 31651, 31652, 31653, 31662, 31663, 31664, 31666, 31667, 31669, 31670, 31671, 31673, 31674, 31675, 31676, 31677, 31678, 31679, 31680, 31682, 31683, 31684, 22466, 32831, 26775, 24037, 25915, 21151, 24685, 40858, 20379, 36524, 20844, 23467, 24339, 24041, 27742, 25329, 36129, 20849, 38057, 21246, 27807, 33503, 29399, 22434, 26500, 36141, 22815, 36764, 33735, 21653, 31629, 20272, 27837, 23396, 22993, 40723, 21476, 34506, 39592, 35895, 32929, 25925, 39038, 22266, 38599, 21038, 29916, 21072, 23521, 25346, 35074, 20054, 25296, 24618, 26874, 20851, 23448, 20896, 35266, 31649, 39302, 32592, 24815, 28748, 36143, 20809, 24191, 36891, 29808, 35268, 22317, 30789, 24402, 40863, 38394, 36712, 39740, 35809, 30328, 26690, 26588, 36330, 36149, 21053, 36746, 28378, 26829, 38149, 37101, 22269, 26524, 35065, 36807, 21704, 31685, 31688, 31689, 31690, 31691, 31693, 31694, 31695, 31696, 31698, 31700, 31701, 31702, 31703, 31704, 31707, 31708, 31710, 31711, 31712, 31714, 31715, 31716, 31719, 31720, 31721, 31723, 31724, 31725, 31727, 31728, 31730, 31731, 31732, 31733, 31734, 31736, 31737, 31738, 31739, 31741, 31743, 31744, 31745, 31746, 31747, 31748, 31749, 31750, 31752, 31753, 31754, 31757, 31758, 31760, 31761, 31762, 31763, 31764, 31765, 31767, 31768, 31769, 31770, 31771, 31772, 31773, 31774, 31776, 31777, 31778, 31779, 31780, 31781, 31784, 31785, 31787, 31788, 31789, 31790, 31791, 31792, 31793, 31794, 31795, 31796, 31797, 31798, 31799, 31801, 31802, 31803, 31804, 31805, 31806, 31810, 39608, 23401, 28023, 27686, 20133, 23475, 39559, 37219, 25000, 37039, 38889, 21547, 28085, 23506, 20989, 21898, 32597, 32752, 25788, 25421, 26097, 25022, 24717, 28938, 27735, 27721, 22831, 26477, 33322, 22741, 22158, 35946, 27627, 37085, 22909, 32791, 21495, 28009, 21621, 21917, 33655, 33743, 26680, 31166, 21644, 20309, 21512, 30418, 35977, 38402, 27827, 28088, 36203, 35088, 40548, 36154, 22079, 40657, 30165, 24456, 29408, 24680, 21756, 20136, 27178, 34913, 24658, 36720, 21700, 28888, 34425, 40511, 27946, 23439, 24344, 32418, 21897, 20399, 29492, 21564, 21402, 20505, 21518, 21628, 20046, 24573, 29786, 22774, 33899, 32993, 34676, 29392, 31946, 28246, 31811, 31812, 31813, 31814, 31815, 31816, 31817, 31818, 31819, 31820, 31822, 31823, 31824, 31825, 31826, 31827, 31828, 31829, 31830, 31831, 31832, 31833, 31834, 31835, 31836, 31837, 31838, 31839, 31840, 31841, 31842, 31843, 31844, 31845, 31846, 31847, 31848, 31849, 31850, 31851, 31852, 31853, 31854, 31855, 31856, 31857, 31858, 31861, 31862, 31863, 31864, 31865, 31866, 31870, 31871, 31872, 31873, 31874, 31875, 31876, 31877, 31878, 31879, 31880, 31882, 31883, 31884, 31885, 31886, 31887, 31888, 31891, 31892, 31894, 31897, 31898, 31899, 31904, 31905, 31907, 31910, 31911, 31912, 31913, 31915, 31916, 31917, 31919, 31920, 31924, 31925, 31926, 31927, 31928, 31930, 31931, 24359, 34382, 21804, 25252, 20114, 27818, 25143, 33457, 21719, 21326, 29502, 28369, 30011, 21010, 21270, 35805, 27088, 24458, 24576, 28142, 22351, 27426, 29615, 26707, 36824, 32531, 25442, 24739, 21796, 30186, 35938, 28949, 28067, 23462, 24187, 33618, 24908, 40644, 30970, 34647, 31783, 30343, 20976, 24822, 29004, 26179, 24140, 24653, 35854, 28784, 25381, 36745, 24509, 24674, 34516, 22238, 27585, 24724, 24935, 21321, 24800, 26214, 36159, 31229, 20250, 28905, 27719, 35763, 35826, 32472, 33636, 26127, 23130, 39746, 27985, 28151, 35905, 27963, 20249, 28779, 33719, 25110, 24785, 38669, 36135, 31096, 20987, 22334, 22522, 26426, 30072, 31293, 31215, 31637, 31935, 31936, 31938, 31939, 31940, 31942, 31945, 31947, 31950, 31951, 31952, 31953, 31954, 31955, 31956, 31960, 31962, 31963, 31965, 31966, 31969, 31970, 31971, 31972, 31973, 31974, 31975, 31977, 31978, 31979, 31980, 31981, 31982, 31984, 31985, 31986, 31987, 31988, 31989, 31990, 31991, 31993, 31994, 31996, 31997, 31998, 31999, 32000, 32001, 32002, 32003, 32004, 32005, 32006, 32007, 32008, 32009, 32011, 32012, 32013, 32014, 32015, 32016, 32017, 32018, 32019, 32020, 32021, 32022, 32023, 32024, 32025, 32026, 32027, 32028, 32029, 32030, 32031, 32033, 32035, 32036, 32037, 32038, 32040, 32041, 32042, 32044, 32045, 32046, 32048, 32049, 32050, 32051, 32052, 32053, 32054, 32908, 39269, 36857, 28608, 35749, 40481, 23020, 32489, 32521, 21513, 26497, 26840, 36753, 31821, 38598, 21450, 24613, 30142, 27762, 21363, 23241, 32423, 25380, 20960, 33034, 24049, 34015, 25216, 20864, 23395, 20238, 31085, 21058, 24760, 27982, 23492, 23490, 35745, 35760, 26082, 24524, 38469, 22931, 32487, 32426, 22025, 26551, 22841, 20339, 23478, 21152, 33626, 39050, 36158, 30002, 38078, 20551, 31292, 20215, 26550, 39550, 23233, 27516, 30417, 22362, 23574, 31546, 38388, 29006, 20860, 32937, 33392, 22904, 32516, 33575, 26816, 26604, 30897, 30839, 25315, 25441, 31616, 20461, 21098, 20943, 33616, 27099, 37492, 36341, 36145, 35265, 38190, 31661, 20214, 32055, 32056, 32057, 32058, 32059, 32060, 32061, 32062, 32063, 32064, 32065, 32066, 32067, 32068, 32069, 32070, 32071, 32072, 32073, 32074, 32075, 32076, 32077, 32078, 32079, 32080, 32081, 32082, 32083, 32084, 32085, 32086, 32087, 32088, 32089, 32090, 32091, 32092, 32093, 32094, 32095, 32096, 32097, 32098, 32099, 32100, 32101, 32102, 32103, 32104, 32105, 32106, 32107, 32108, 32109, 32111, 32112, 32113, 32114, 32115, 32116, 32117, 32118, 32120, 32121, 32122, 32123, 32124, 32125, 32126, 32127, 32128, 32129, 32130, 32131, 32132, 32133, 32134, 32135, 32136, 32137, 32138, 32139, 32140, 32141, 32142, 32143, 32144, 32145, 32146, 32147, 32148, 32149, 32150, 32151, 32152, 20581, 33328, 21073, 39279, 28176, 28293, 28071, 24314, 20725, 23004, 23558, 27974, 27743, 30086, 33931, 26728, 22870, 35762, 21280, 37233, 38477, 34121, 26898, 30977, 28966, 33014, 20132, 37066, 27975, 39556, 23047, 22204, 25605, 38128, 30699, 20389, 33050, 29409, 35282, 39290, 32564, 32478, 21119, 25945, 37237, 36735, 36739, 21483, 31382, 25581, 25509, 30342, 31224, 34903, 38454, 25130, 21163, 33410, 26708, 26480, 25463, 30571, 31469, 27905, 32467, 35299, 22992, 25106, 34249, 33445, 30028, 20511, 20171, 30117, 35819, 23626, 24062, 31563, 26020, 37329, 20170, 27941, 35167, 32039, 38182, 20165, 35880, 36827, 38771, 26187, 31105, 36817, 28908, 28024, 32153, 32154, 32155, 32156, 32157, 32158, 32159, 32160, 32161, 32162, 32163, 32164, 32165, 32167, 32168, 32169, 32170, 32171, 32172, 32173, 32175, 32176, 32177, 32178, 32179, 32180, 32181, 32182, 32183, 32184, 32185, 32186, 32187, 32188, 32189, 32190, 32191, 32192, 32193, 32194, 32195, 32196, 32197, 32198, 32199, 32200, 32201, 32202, 32203, 32204, 32205, 32206, 32207, 32208, 32209, 32210, 32211, 32212, 32213, 32214, 32215, 32216, 32217, 32218, 32219, 32220, 32221, 32222, 32223, 32224, 32225, 32226, 32227, 32228, 32229, 32230, 32231, 32232, 32233, 32234, 32235, 32236, 32237, 32238, 32239, 32240, 32241, 32242, 32243, 32244, 32245, 32246, 32247, 32248, 32249, 32250, 23613, 21170, 33606, 20834, 33550, 30555, 26230, 40120, 20140, 24778, 31934, 31923, 32463, 20117, 35686, 26223, 39048, 38745, 22659, 25964, 38236, 24452, 30153, 38742, 31455, 31454, 20928, 28847, 31384, 25578, 31350, 32416, 29590, 38893, 20037, 28792, 20061, 37202, 21417, 25937, 26087, 33276, 33285, 21646, 23601, 30106, 38816, 25304, 29401, 30141, 23621, 39545, 33738, 23616, 21632, 30697, 20030, 27822, 32858, 25298, 25454, 24040, 20855, 36317, 36382, 38191, 20465, 21477, 24807, 28844, 21095, 25424, 40515, 23071, 20518, 30519, 21367, 32482, 25733, 25899, 25225, 25496, 20500, 29237, 35273, 20915, 35776, 32477, 22343, 33740, 38055, 20891, 21531, 23803, 32251, 32252, 32253, 32254, 32255, 32256, 32257, 32258, 32259, 32260, 32261, 32262, 32263, 32264, 32265, 32266, 32267, 32268, 32269, 32270, 32271, 32272, 32273, 32274, 32275, 32276, 32277, 32278, 32279, 32280, 32281, 32282, 32283, 32284, 32285, 32286, 32287, 32288, 32289, 32290, 32291, 32292, 32293, 32294, 32295, 32296, 32297, 32298, 32299, 32300, 32301, 32302, 32303, 32304, 32305, 32306, 32307, 32308, 32309, 32310, 32311, 32312, 32313, 32314, 32316, 32317, 32318, 32319, 32320, 32322, 32323, 32324, 32325, 32326, 32328, 32329, 32330, 32331, 32332, 32333, 32334, 32335, 32336, 32337, 32338, 32339, 32340, 32341, 32342, 32343, 32344, 32345, 32346, 32347, 32348, 32349, 20426, 31459, 27994, 37089, 39567, 21888, 21654, 21345, 21679, 24320, 25577, 26999, 20975, 24936, 21002, 22570, 21208, 22350, 30733, 30475, 24247, 24951, 31968, 25179, 25239, 20130, 28821, 32771, 25335, 28900, 38752, 22391, 33499, 26607, 26869, 30933, 39063, 31185, 22771, 21683, 21487, 28212, 20811, 21051, 23458, 35838, 32943, 21827, 22438, 24691, 22353, 21549, 31354, 24656, 23380, 25511, 25248, 21475, 25187, 23495, 26543, 21741, 31391, 33510, 37239, 24211, 35044, 22840, 22446, 25358, 36328, 33007, 22359, 31607, 20393, 24555, 23485, 27454, 21281, 31568, 29378, 26694, 30719, 30518, 26103, 20917, 20111, 30420, 23743, 31397, 33909, 22862, 39745, 20608, 32350, 32351, 32352, 32353, 32354, 32355, 32356, 32357, 32358, 32359, 32360, 32361, 32362, 32363, 32364, 32365, 32366, 32367, 32368, 32369, 32370, 32371, 32372, 32373, 32374, 32375, 32376, 32377, 32378, 32379, 32380, 32381, 32382, 32383, 32384, 32385, 32387, 32388, 32389, 32390, 32391, 32392, 32393, 32394, 32395, 32396, 32397, 32398, 32399, 32400, 32401, 32402, 32403, 32404, 32405, 32406, 32407, 32408, 32409, 32410, 32412, 32413, 32414, 32430, 32436, 32443, 32444, 32470, 32484, 32492, 32505, 32522, 32528, 32542, 32567, 32569, 32571, 32572, 32573, 32574, 32575, 32576, 32577, 32579, 32582, 32583, 32584, 32585, 32586, 32587, 32588, 32589, 32590, 32591, 32594, 32595, 39304, 24871, 28291, 22372, 26118, 25414, 22256, 25324, 25193, 24275, 38420, 22403, 25289, 21895, 34593, 33098, 36771, 21862, 33713, 26469, 36182, 34013, 23146, 26639, 25318, 31726, 38417, 20848, 28572, 35888, 25597, 35272, 25042, 32518, 28866, 28389, 29701, 27028, 29436, 24266, 37070, 26391, 28010, 25438, 21171, 29282, 32769, 20332, 23013, 37226, 28889, 28061, 21202, 20048, 38647, 38253, 34174, 30922, 32047, 20769, 22418, 25794, 32907, 31867, 27882, 26865, 26974, 20919, 21400, 26792, 29313, 40654, 31729, 29432, 31163, 28435, 29702, 26446, 37324, 40100, 31036, 33673, 33620, 21519, 26647, 20029, 21385, 21169, 30782, 21382, 21033, 20616, 20363, 20432, 32598, 32601, 32603, 32604, 32605, 32606, 32608, 32611, 32612, 32613, 32614, 32615, 32619, 32620, 32621, 32623, 32624, 32627, 32629, 32630, 32631, 32632, 32634, 32635, 32636, 32637, 32639, 32640, 32642, 32643, 32644, 32645, 32646, 32647, 32648, 32649, 32651, 32653, 32655, 32656, 32657, 32658, 32659, 32661, 32662, 32663, 32664, 32665, 32667, 32668, 32672, 32674, 32675, 32677, 32678, 32680, 32681, 32682, 32683, 32684, 32685, 32686, 32689, 32691, 32692, 32693, 32694, 32695, 32698, 32699, 32702, 32704, 32706, 32707, 32708, 32710, 32711, 32712, 32713, 32715, 32717, 32719, 32720, 32721, 32722, 32723, 32726, 32727, 32729, 32730, 32731, 32732, 32733, 32734, 32738, 32739, 30178, 31435, 31890, 27813, 38582, 21147, 29827, 21737, 20457, 32852, 33714, 36830, 38256, 24265, 24604, 28063, 24088, 25947, 33080, 38142, 24651, 28860, 32451, 31918, 20937, 26753, 31921, 33391, 20004, 36742, 37327, 26238, 20142, 35845, 25769, 32842, 20698, 30103, 29134, 23525, 36797, 28518, 20102, 25730, 38243, 24278, 26009, 21015, 35010, 28872, 21155, 29454, 29747, 26519, 30967, 38678, 20020, 37051, 40158, 28107, 20955, 36161, 21533, 25294, 29618, 33777, 38646, 40836, 38083, 20278, 32666, 20940, 28789, 38517, 23725, 39046, 21478, 20196, 28316, 29705, 27060, 30827, 39311, 30041, 21016, 30244, 27969, 26611, 20845, 40857, 32843, 21657, 31548, 31423, 32740, 32743, 32744, 32746, 32747, 32748, 32749, 32751, 32754, 32756, 32757, 32758, 32759, 32760, 32761, 32762, 32765, 32766, 32767, 32770, 32775, 32776, 32777, 32778, 32782, 32783, 32785, 32787, 32794, 32795, 32797, 32798, 32799, 32801, 32803, 32804, 32811, 32812, 32813, 32814, 32815, 32816, 32818, 32820, 32825, 32826, 32828, 32830, 32832, 32833, 32836, 32837, 32839, 32840, 32841, 32846, 32847, 32848, 32849, 32851, 32853, 32854, 32855, 32857, 32859, 32860, 32861, 32862, 32863, 32864, 32865, 32866, 32867, 32868, 32869, 32870, 32871, 32872, 32875, 32876, 32877, 32878, 32879, 32880, 32882, 32883, 32884, 32885, 32886, 32887, 32888, 32889, 32890, 32891, 32892, 32893, 38534, 22404, 25314, 38471, 27004, 23044, 25602, 31699, 28431, 38475, 33446, 21346, 39045, 24208, 28809, 25523, 21348, 34383, 40065, 40595, 30860, 38706, 36335, 36162, 40575, 28510, 31108, 24405, 38470, 25134, 39540, 21525, 38109, 20387, 26053, 23653, 23649, 32533, 34385, 27695, 24459, 29575, 28388, 32511, 23782, 25371, 23402, 28390, 21365, 20081, 25504, 30053, 25249, 36718, 20262, 20177, 27814, 32438, 35770, 33821, 34746, 32599, 36923, 38179, 31657, 39585, 35064, 33853, 27931, 39558, 32476, 22920, 40635, 29595, 30721, 34434, 39532, 39554, 22043, 21527, 22475, 20080, 40614, 21334, 36808, 33033, 30610, 39314, 34542, 28385, 34067, 26364, 24930, 28459, 32894, 32897, 32898, 32901, 32904, 32906, 32909, 32910, 32911, 32912, 32913, 32914, 32916, 32917, 32919, 32921, 32926, 32931, 32934, 32935, 32936, 32940, 32944, 32947, 32949, 32950, 32952, 32953, 32955, 32965, 32967, 32968, 32969, 32970, 32971, 32975, 32976, 32977, 32978, 32979, 32980, 32981, 32984, 32991, 32992, 32994, 32995, 32998, 33006, 33013, 33015, 33017, 33019, 33022, 33023, 33024, 33025, 33027, 33028, 33029, 33031, 33032, 33035, 33036, 33045, 33047, 33049, 33051, 33052, 33053, 33055, 33056, 33057, 33058, 33059, 33060, 33061, 33062, 33063, 33064, 33065, 33066, 33067, 33069, 33070, 33072, 33075, 33076, 33077, 33079, 33081, 33082, 33083, 33084, 33085, 33087, 35881, 33426, 33579, 30450, 27667, 24537, 33725, 29483, 33541, 38170, 27611, 30683, 38086, 21359, 33538, 20882, 24125, 35980, 36152, 20040, 29611, 26522, 26757, 37238, 38665, 29028, 27809, 30473, 23186, 38209, 27599, 32654, 26151, 23504, 22969, 23194, 38376, 38391, 20204, 33804, 33945, 27308, 30431, 38192, 29467, 26790, 23391, 30511, 37274, 38753, 31964, 36855, 35868, 24357, 31859, 31192, 35269, 27852, 34588, 23494, 24130, 26825, 30496, 32501, 20885, 20813, 21193, 23081, 32517, 38754, 33495, 25551, 30596, 34256, 31186, 28218, 24217, 22937, 34065, 28781, 27665, 25279, 30399, 25935, 24751, 38397, 26126, 34719, 40483, 38125, 21517, 21629, 35884, 25720, 33088, 33089, 33090, 33091, 33092, 33093, 33095, 33097, 33101, 33102, 33103, 33106, 33110, 33111, 33112, 33115, 33116, 33117, 33118, 33119, 33121, 33122, 33123, 33124, 33126, 33128, 33130, 33131, 33132, 33135, 33138, 33139, 33141, 33142, 33143, 33144, 33153, 33155, 33156, 33157, 33158, 33159, 33161, 33163, 33164, 33165, 33166, 33168, 33170, 33171, 33172, 33173, 33174, 33175, 33177, 33178, 33182, 33183, 33184, 33185, 33186, 33188, 33189, 33191, 33193, 33195, 33196, 33197, 33198, 33199, 33200, 33201, 33202, 33204, 33205, 33206, 33207, 33208, 33209, 33212, 33213, 33214, 33215, 33220, 33221, 33223, 33224, 33225, 33227, 33229, 33230, 33231, 33232, 33233, 33234, 33235, 25721, 34321, 27169, 33180, 30952, 25705, 39764, 25273, 26411, 33707, 22696, 40664, 27819, 28448, 23518, 38476, 35851, 29279, 26576, 25287, 29281, 20137, 22982, 27597, 22675, 26286, 24149, 21215, 24917, 26408, 30446, 30566, 29287, 31302, 25343, 21738, 21584, 38048, 37027, 23068, 32435, 27670, 20035, 22902, 32784, 22856, 21335, 30007, 38590, 22218, 25376, 33041, 24700, 38393, 28118, 21602, 39297, 20869, 23273, 33021, 22958, 38675, 20522, 27877, 23612, 25311, 20320, 21311, 33147, 36870, 28346, 34091, 25288, 24180, 30910, 25781, 25467, 24565, 23064, 37247, 40479, 23615, 25423, 32834, 23421, 21870, 38218, 38221, 28037, 24744, 26592, 29406, 20957, 23425, 33236, 33237, 33238, 33239, 33240, 33241, 33242, 33243, 33244, 33245, 33246, 33247, 33248, 33249, 33250, 33252, 33253, 33254, 33256, 33257, 33259, 33262, 33263, 33264, 33265, 33266, 33269, 33270, 33271, 33272, 33273, 33274, 33277, 33279, 33283, 33287, 33288, 33289, 33290, 33291, 33294, 33295, 33297, 33299, 33301, 33302, 33303, 33304, 33305, 33306, 33309, 33312, 33316, 33317, 33318, 33319, 33321, 33326, 33330, 33338, 33340, 33341, 33343, 33344, 33345, 33346, 33347, 33349, 33350, 33352, 33354, 33356, 33357, 33358, 33360, 33361, 33362, 33363, 33364, 33365, 33366, 33367, 33369, 33371, 33372, 33373, 33374, 33376, 33377, 33378, 33379, 33380, 33381, 33382, 33383, 33385, 25319, 27870, 29275, 25197, 38062, 32445, 33043, 27987, 20892, 24324, 22900, 21162, 24594, 22899, 26262, 34384, 30111, 25386, 25062, 31983, 35834, 21734, 27431, 40485, 27572, 34261, 21589, 20598, 27812, 21866, 36276, 29228, 24085, 24597, 29750, 25293, 25490, 29260, 24472, 28227, 27966, 25856, 28504, 30424, 30928, 30460, 30036, 21028, 21467, 20051, 24222, 26049, 32810, 32982, 25243, 21638, 21032, 28846, 34957, 36305, 27873, 21624, 32986, 22521, 35060, 36180, 38506, 37197, 20329, 27803, 21943, 30406, 30768, 25256, 28921, 28558, 24429, 34028, 26842, 30844, 31735, 33192, 26379, 40527, 25447, 30896, 22383, 30738, 38713, 25209, 25259, 21128, 29749, 27607, 33386, 33387, 33388, 33389, 33393, 33397, 33398, 33399, 33400, 33403, 33404, 33408, 33409, 33411, 33413, 33414, 33415, 33417, 33420, 33424, 33427, 33428, 33429, 33430, 33434, 33435, 33438, 33440, 33442, 33443, 33447, 33458, 33461, 33462, 33466, 33467, 33468, 33471, 33472, 33474, 33475, 33477, 33478, 33481, 33488, 33494, 33497, 33498, 33501, 33506, 33511, 33512, 33513, 33514, 33516, 33517, 33518, 33520, 33522, 33523, 33525, 33526, 33528, 33530, 33532, 33533, 33534, 33535, 33536, 33546, 33547, 33549, 33552, 33554, 33555, 33558, 33560, 33561, 33565, 33566, 33567, 33568, 33569, 33570, 33571, 33572, 33573, 33574, 33577, 33578, 33582, 33584, 33586, 33591, 33595, 33597, 21860, 33086, 30130, 30382, 21305, 30174, 20731, 23617, 35692, 31687, 20559, 29255, 39575, 39128, 28418, 29922, 31080, 25735, 30629, 25340, 39057, 36139, 21697, 32856, 20050, 22378, 33529, 33805, 24179, 20973, 29942, 35780, 23631, 22369, 27900, 39047, 23110, 30772, 39748, 36843, 31893, 21078, 25169, 38138, 20166, 33670, 33889, 33769, 33970, 22484, 26420, 22275, 26222, 28006, 35889, 26333, 28689, 26399, 27450, 26646, 25114, 22971, 19971, 20932, 28422, 26578, 27791, 20854, 26827, 22855, 27495, 30054, 23822, 33040, 40784, 26071, 31048, 31041, 39569, 36215, 23682, 20062, 20225, 21551, 22865, 30732, 22120, 27668, 36804, 24323, 27773, 27875, 35755, 25488, 33598, 33599, 33601, 33602, 33604, 33605, 33608, 33610, 33611, 33612, 33613, 33614, 33619, 33621, 33622, 33623, 33624, 33625, 33629, 33634, 33648, 33649, 33650, 33651, 33652, 33653, 33654, 33657, 33658, 33662, 33663, 33664, 33665, 33666, 33667, 33668, 33671, 33672, 33674, 33675, 33676, 33677, 33679, 33680, 33681, 33684, 33685, 33686, 33687, 33689, 33690, 33693, 33695, 33697, 33698, 33699, 33700, 33701, 33702, 33703, 33708, 33709, 33710, 33711, 33717, 33723, 33726, 33727, 33730, 33731, 33732, 33734, 33736, 33737, 33739, 33741, 33742, 33744, 33745, 33746, 33747, 33749, 33751, 33753, 33754, 33755, 33758, 33762, 33763, 33764, 33766, 33767, 33768, 33771, 33772, 33773, 24688, 27965, 29301, 25190, 38030, 38085, 21315, 36801, 31614, 20191, 35878, 20094, 40660, 38065, 38067, 21069, 28508, 36963, 27973, 35892, 22545, 23884, 27424, 27465, 26538, 21595, 33108, 32652, 22681, 34103, 24378, 25250, 27207, 38201, 25970, 24708, 26725, 30631, 20052, 20392, 24039, 38808, 25772, 32728, 23789, 20431, 31373, 20999, 33540, 19988, 24623, 31363, 38054, 20405, 20146, 31206, 29748, 21220, 33465, 25810, 31165, 23517, 27777, 38738, 36731, 27682, 20542, 21375, 28165, 25806, 26228, 27696, 24773, 39031, 35831, 24198, 29756, 31351, 31179, 19992, 37041, 29699, 27714, 22234, 37195, 27845, 36235, 21306, 34502, 26354, 36527, 23624, 39537, 28192, 33774, 33775, 33779, 33780, 33781, 33782, 33783, 33786, 33787, 33788, 33790, 33791, 33792, 33794, 33797, 33799, 33800, 33801, 33802, 33808, 33810, 33811, 33812, 33813, 33814, 33815, 33817, 33818, 33819, 33822, 33823, 33824, 33825, 33826, 33827, 33833, 33834, 33835, 33836, 33837, 33838, 33839, 33840, 33842, 33843, 33844, 33845, 33846, 33847, 33849, 33850, 33851, 33854, 33855, 33856, 33857, 33858, 33859, 33860, 33861, 33863, 33864, 33865, 33866, 33867, 33868, 33869, 33870, 33871, 33872, 33874, 33875, 33876, 33877, 33878, 33880, 33885, 33886, 33887, 33888, 33890, 33892, 33893, 33894, 33895, 33896, 33898, 33902, 33903, 33904, 33906, 33908, 33911, 33913, 33915, 33916, 21462, 23094, 40843, 36259, 21435, 22280, 39079, 26435, 37275, 27849, 20840, 30154, 25331, 29356, 21048, 21149, 32570, 28820, 30264, 21364, 40522, 27063, 30830, 38592, 35033, 32676, 28982, 29123, 20873, 26579, 29924, 22756, 25880, 22199, 35753, 39286, 25200, 32469, 24825, 28909, 22764, 20161, 20154, 24525, 38887, 20219, 35748, 20995, 22922, 32427, 25172, 20173, 26085, 25102, 33592, 33993, 33635, 34701, 29076, 28342, 23481, 32466, 20887, 25545, 26580, 32905, 33593, 34837, 20754, 23418, 22914, 36785, 20083, 27741, 20837, 35109, 36719, 38446, 34122, 29790, 38160, 38384, 28070, 33509, 24369, 25746, 27922, 33832, 33134, 40131, 22622, 36187, 19977, 21441, 33917, 33918, 33919, 33920, 33921, 33923, 33924, 33925, 33926, 33930, 33933, 33935, 33936, 33937, 33938, 33939, 33940, 33941, 33942, 33944, 33946, 33947, 33949, 33950, 33951, 33952, 33954, 33955, 33956, 33957, 33958, 33959, 33960, 33961, 33962, 33963, 33964, 33965, 33966, 33968, 33969, 33971, 33973, 33974, 33975, 33979, 33980, 33982, 33984, 33986, 33987, 33989, 33990, 33991, 33992, 33995, 33996, 33998, 33999, 34002, 34004, 34005, 34007, 34008, 34009, 34010, 34011, 34012, 34014, 34017, 34018, 34020, 34023, 34024, 34025, 34026, 34027, 34029, 34030, 34031, 34033, 34034, 34035, 34036, 34037, 34038, 34039, 34040, 34041, 34042, 34043, 34045, 34046, 34048, 34049, 34050, 20254, 25955, 26705, 21971, 20007, 25620, 39578, 25195, 23234, 29791, 33394, 28073, 26862, 20711, 33678, 30722, 26432, 21049, 27801, 32433, 20667, 21861, 29022, 31579, 26194, 29642, 33515, 26441, 23665, 21024, 29053, 34923, 38378, 38485, 25797, 36193, 33203, 21892, 27733, 25159, 32558, 22674, 20260, 21830, 36175, 26188, 19978, 23578, 35059, 26786, 25422, 31245, 28903, 33421, 21242, 38902, 23569, 21736, 37045, 32461, 22882, 36170, 34503, 33292, 33293, 36198, 25668, 23556, 24913, 28041, 31038, 35774, 30775, 30003, 21627, 20280, 36523, 28145, 23072, 32453, 31070, 27784, 23457, 23158, 29978, 32958, 24910, 28183, 22768, 29983, 29989, 29298, 21319, 32499, 34051, 34052, 34053, 34054, 34055, 34056, 34057, 34058, 34059, 34061, 34062, 34063, 34064, 34066, 34068, 34069, 34070, 34072, 34073, 34075, 34076, 34077, 34078, 34080, 34082, 34083, 34084, 34085, 34086, 34087, 34088, 34089, 34090, 34093, 34094, 34095, 34096, 34097, 34098, 34099, 34100, 34101, 34102, 34110, 34111, 34112, 34113, 34114, 34116, 34117, 34118, 34119, 34123, 34124, 34125, 34126, 34127, 34128, 34129, 34130, 34131, 34132, 34133, 34135, 34136, 34138, 34139, 34140, 34141, 34143, 34144, 34145, 34146, 34147, 34149, 34150, 34151, 34153, 34154, 34155, 34156, 34157, 34158, 34159, 34160, 34161, 34163, 34165, 34166, 34167, 34168, 34172, 34173, 34175, 34176, 34177, 30465, 30427, 21097, 32988, 22307, 24072, 22833, 29422, 26045, 28287, 35799, 23608, 34417, 21313, 30707, 25342, 26102, 20160, 39135, 34432, 23454, 35782, 21490, 30690, 20351, 23630, 39542, 22987, 24335, 31034, 22763, 19990, 26623, 20107, 25325, 35475, 36893, 21183, 26159, 21980, 22124, 36866, 20181, 20365, 37322, 39280, 27663, 24066, 24643, 23460, 35270, 35797, 25910, 25163, 39318, 23432, 23551, 25480, 21806, 21463, 30246, 20861, 34092, 26530, 26803, 27530, 25234, 36755, 21460, 33298, 28113, 30095, 20070, 36174, 23408, 29087, 34223, 26257, 26329, 32626, 34560, 40653, 40736, 23646, 26415, 36848, 26641, 26463, 25101, 31446, 22661, 24246, 25968, 28465, 34178, 34179, 34182, 34184, 34185, 34186, 34187, 34188, 34189, 34190, 34192, 34193, 34194, 34195, 34196, 34197, 34198, 34199, 34200, 34201, 34202, 34205, 34206, 34207, 34208, 34209, 34210, 34211, 34213, 34214, 34215, 34217, 34219, 34220, 34221, 34225, 34226, 34227, 34228, 34229, 34230, 34232, 34234, 34235, 34236, 34237, 34238, 34239, 34240, 34242, 34243, 34244, 34245, 34246, 34247, 34248, 34250, 34251, 34252, 34253, 34254, 34257, 34258, 34260, 34262, 34263, 34264, 34265, 34266, 34267, 34269, 34270, 34271, 34272, 34273, 34274, 34275, 34277, 34278, 34279, 34280, 34282, 34283, 34284, 34285, 34286, 34287, 34288, 34289, 34290, 34291, 34292, 34293, 34294, 34295, 34296, 24661, 21047, 32781, 25684, 34928, 29993, 24069, 26643, 25332, 38684, 21452, 29245, 35841, 27700, 30561, 31246, 21550, 30636, 39034, 33308, 35828, 30805, 26388, 28865, 26031, 25749, 22070, 24605, 31169, 21496, 19997, 27515, 32902, 23546, 21987, 22235, 20282, 20284, 39282, 24051, 26494, 32824, 24578, 39042, 36865, 23435, 35772, 35829, 25628, 33368, 25822, 22013, 33487, 37221, 20439, 32032, 36895, 31903, 20723, 22609, 28335, 23487, 35785, 32899, 37240, 33948, 31639, 34429, 38539, 38543, 32485, 39635, 30862, 23681, 31319, 36930, 38567, 31071, 23385, 25439, 31499, 34001, 26797, 21766, 32553, 29712, 32034, 38145, 25152, 22604, 20182, 23427, 22905, 22612, 34297, 34298, 34300, 34301, 34302, 34304, 34305, 34306, 34307, 34308, 34310, 34311, 34312, 34313, 34314, 34315, 34316, 34317, 34318, 34319, 34320, 34322, 34323, 34324, 34325, 34327, 34328, 34329, 34330, 34331, 34332, 34333, 34334, 34335, 34336, 34337, 34338, 34339, 34340, 34341, 34342, 34344, 34346, 34347, 34348, 34349, 34350, 34351, 34352, 34353, 34354, 34355, 34356, 34357, 34358, 34359, 34361, 34362, 34363, 34365, 34366, 34367, 34368, 34369, 34370, 34371, 34372, 34373, 34374, 34375, 34376, 34377, 34378, 34379, 34380, 34386, 34387, 34389, 34390, 34391, 34392, 34393, 34395, 34396, 34397, 34399, 34400, 34401, 34403, 34404, 34405, 34406, 34407, 34408, 34409, 34410, 29549, 25374, 36427, 36367, 32974, 33492, 25260, 21488, 27888, 37214, 22826, 24577, 27760, 22349, 25674, 36138, 30251, 28393, 22363, 27264, 30192, 28525, 35885, 35848, 22374, 27631, 34962, 30899, 25506, 21497, 28845, 27748, 22616, 25642, 22530, 26848, 33179, 21776, 31958, 20504, 36538, 28108, 36255, 28907, 25487, 28059, 28372, 32486, 33796, 26691, 36867, 28120, 38518, 35752, 22871, 29305, 34276, 33150, 30140, 35466, 26799, 21076, 36386, 38161, 25552, 39064, 36420, 21884, 20307, 26367, 22159, 24789, 28053, 21059, 23625, 22825, 28155, 22635, 30000, 29980, 24684, 33300, 33094, 25361, 26465, 36834, 30522, 36339, 36148, 38081, 24086, 21381, 21548, 28867, 34413, 34415, 34416, 34418, 34419, 34420, 34421, 34422, 34423, 34424, 34435, 34436, 34437, 34438, 34439, 34440, 34441, 34446, 34447, 34448, 34449, 34450, 34452, 34454, 34455, 34456, 34457, 34458, 34459, 34462, 34463, 34464, 34465, 34466, 34469, 34470, 34475, 34477, 34478, 34482, 34483, 34487, 34488, 34489, 34491, 34492, 34493, 34494, 34495, 34497, 34498, 34499, 34501, 34504, 34508, 34509, 34514, 34515, 34517, 34518, 34519, 34522, 34524, 34525, 34528, 34529, 34530, 34531, 34533, 34534, 34535, 34536, 34538, 34539, 34540, 34543, 34549, 34550, 34551, 34554, 34555, 34556, 34557, 34559, 34561, 34564, 34565, 34566, 34571, 34572, 34574, 34575, 34576, 34577, 34580, 34582, 27712, 24311, 20572, 20141, 24237, 25402, 33351, 36890, 26704, 37230, 30643, 21516, 38108, 24420, 31461, 26742, 25413, 31570, 32479, 30171, 20599, 25237, 22836, 36879, 20984, 31171, 31361, 22270, 24466, 36884, 28034, 23648, 22303, 21520, 20820, 28237, 22242, 25512, 39059, 33151, 34581, 35114, 36864, 21534, 23663, 33216, 25302, 25176, 33073, 40501, 38464, 39534, 39548, 26925, 22949, 25299, 21822, 25366, 21703, 34521, 27964, 23043, 29926, 34972, 27498, 22806, 35916, 24367, 28286, 29609, 39037, 20024, 28919, 23436, 30871, 25405, 26202, 30358, 24779, 23451, 23113, 19975, 33109, 27754, 29579, 20129, 26505, 32593, 24448, 26106, 26395, 24536, 22916, 23041, 34585, 34587, 34589, 34591, 34592, 34596, 34598, 34599, 34600, 34602, 34603, 34604, 34605, 34607, 34608, 34610, 34611, 34613, 34614, 34616, 34617, 34618, 34620, 34621, 34624, 34625, 34626, 34627, 34628, 34629, 34630, 34634, 34635, 34637, 34639, 34640, 34641, 34642, 34644, 34645, 34646, 34648, 34650, 34651, 34652, 34653, 34654, 34655, 34657, 34658, 34662, 34663, 34664, 34665, 34666, 34667, 34668, 34669, 34671, 34673, 34674, 34675, 34677, 34679, 34680, 34681, 34682, 34687, 34688, 34689, 34692, 34694, 34695, 34697, 34698, 34700, 34702, 34703, 34704, 34705, 34706, 34708, 34709, 34710, 34712, 34713, 34714, 34715, 34716, 34717, 34718, 34720, 34721, 34722, 34723, 34724, 24013, 24494, 21361, 38886, 36829, 26693, 22260, 21807, 24799, 20026, 28493, 32500, 33479, 33806, 22996, 20255, 20266, 23614, 32428, 26410, 34074, 21619, 30031, 32963, 21890, 39759, 20301, 28205, 35859, 23561, 24944, 21355, 30239, 28201, 34442, 25991, 38395, 32441, 21563, 31283, 32010, 38382, 21985, 32705, 29934, 25373, 34583, 28065, 31389, 25105, 26017, 21351, 25569, 27779, 24043, 21596, 38056, 20044, 27745, 35820, 23627, 26080, 33436, 26791, 21566, 21556, 27595, 27494, 20116, 25410, 21320, 33310, 20237, 20398, 22366, 25098, 38654, 26212, 29289, 21247, 21153, 24735, 35823, 26132, 29081, 26512, 35199, 30802, 30717, 26224, 22075, 21560, 38177, 29306, 34725, 34726, 34727, 34729, 34730, 34734, 34736, 34737, 34738, 34740, 34742, 34743, 34744, 34745, 34747, 34748, 34750, 34751, 34753, 34754, 34755, 34756, 34757, 34759, 34760, 34761, 34764, 34765, 34766, 34767, 34768, 34772, 34773, 34774, 34775, 34776, 34777, 34778, 34780, 34781, 34782, 34783, 34785, 34786, 34787, 34788, 34790, 34791, 34792, 34793, 34795, 34796, 34797, 34799, 34800, 34801, 34802, 34803, 34804, 34805, 34806, 34807, 34808, 34810, 34811, 34812, 34813, 34815, 34816, 34817, 34818, 34820, 34821, 34822, 34823, 34824, 34825, 34827, 34828, 34829, 34830, 34831, 34832, 34833, 34834, 34836, 34839, 34840, 34841, 34842, 34844, 34845, 34846, 34847, 34848, 34851, 31232, 24687, 24076, 24713, 33181, 22805, 24796, 29060, 28911, 28330, 27728, 29312, 27268, 34989, 24109, 20064, 23219, 21916, 38115, 27927, 31995, 38553, 25103, 32454, 30606, 34430, 21283, 38686, 36758, 26247, 23777, 20384, 29421, 19979, 21414, 22799, 21523, 25472, 38184, 20808, 20185, 40092, 32420, 21688, 36132, 34900, 33335, 38386, 28046, 24358, 23244, 26174, 38505, 29616, 29486, 21439, 33146, 39301, 32673, 23466, 38519, 38480, 32447, 30456, 21410, 38262, 39321, 31665, 35140, 28248, 20065, 32724, 31077, 35814, 24819, 21709, 20139, 39033, 24055, 27233, 20687, 21521, 35937, 33831, 30813, 38660, 21066, 21742, 22179, 38144, 28040, 23477, 28102, 26195, 34852, 34853, 34854, 34855, 34856, 34857, 34858, 34859, 34860, 34861, 34862, 34863, 34864, 34865, 34867, 34868, 34869, 34870, 34871, 34872, 34874, 34875, 34877, 34878, 34879, 34881, 34882, 34883, 34886, 34887, 34888, 34889, 34890, 34891, 34894, 34895, 34896, 34897, 34898, 34899, 34901, 34902, 34904, 34906, 34907, 34908, 34909, 34910, 34911, 34912, 34918, 34919, 34922, 34925, 34927, 34929, 34931, 34932, 34933, 34934, 34936, 34937, 34938, 34939, 34940, 34944, 34947, 34950, 34951, 34953, 34954, 34956, 34958, 34959, 34960, 34961, 34963, 34964, 34965, 34967, 34968, 34969, 34970, 34971, 34973, 34974, 34975, 34976, 34977, 34979, 34981, 34982, 34983, 34984, 34985, 34986, 23567, 23389, 26657, 32918, 21880, 31505, 25928, 26964, 20123, 27463, 34638, 38795, 21327, 25375, 25658, 37034, 26012, 32961, 35856, 20889, 26800, 21368, 34809, 25032, 27844, 27899, 35874, 23633, 34218, 33455, 38156, 27427, 36763, 26032, 24571, 24515, 20449, 34885, 26143, 33125, 29481, 24826, 20852, 21009, 22411, 24418, 37026, 34892, 37266, 24184, 26447, 24615, 22995, 20804, 20982, 33016, 21256, 27769, 38596, 29066, 20241, 20462, 32670, 26429, 21957, 38152, 31168, 34966, 32483, 22687, 25100, 38656, 34394, 22040, 39035, 24464, 35768, 33988, 37207, 21465, 26093, 24207, 30044, 24676, 32110, 23167, 32490, 32493, 36713, 21927, 23459, 24748, 26059, 29572, 34988, 34990, 34991, 34992, 34994, 34995, 34996, 34997, 34998, 35000, 35001, 35002, 35003, 35005, 35006, 35007, 35008, 35011, 35012, 35015, 35016, 35018, 35019, 35020, 35021, 35023, 35024, 35025, 35027, 35030, 35031, 35034, 35035, 35036, 35037, 35038, 35040, 35041, 35046, 35047, 35049, 35050, 35051, 35052, 35053, 35054, 35055, 35058, 35061, 35062, 35063, 35066, 35067, 35069, 35071, 35072, 35073, 35075, 35076, 35077, 35078, 35079, 35080, 35081, 35083, 35084, 35085, 35086, 35087, 35089, 35092, 35093, 35094, 35095, 35096, 35100, 35101, 35102, 35103, 35104, 35106, 35107, 35108, 35110, 35111, 35112, 35113, 35116, 35117, 35118, 35119, 35121, 35122, 35123, 35125, 35127, 36873, 30307, 30505, 32474, 38772, 34203, 23398, 31348, 38634, 34880, 21195, 29071, 24490, 26092, 35810, 23547, 39535, 24033, 27529, 27739, 35757, 35759, 36874, 36805, 21387, 25276, 40486, 40493, 21568, 20011, 33469, 29273, 34460, 23830, 34905, 28079, 38597, 21713, 20122, 35766, 28937, 21693, 38409, 28895, 28153, 30416, 20005, 30740, 34578, 23721, 24310, 35328, 39068, 38414, 28814, 27839, 22852, 25513, 30524, 34893, 28436, 33395, 22576, 29141, 21388, 30746, 38593, 21761, 24422, 28976, 23476, 35866, 39564, 27523, 22830, 40495, 31207, 26472, 25196, 20335, 30113, 32650, 27915, 38451, 27687, 20208, 30162, 20859, 26679, 28478, 36992, 33136, 22934, 29814, 35128, 35129, 35130, 35131, 35132, 35133, 35134, 35135, 35136, 35138, 35139, 35141, 35142, 35143, 35144, 35145, 35146, 35147, 35148, 35149, 35150, 35151, 35152, 35153, 35154, 35155, 35156, 35157, 35158, 35159, 35160, 35161, 35162, 35163, 35164, 35165, 35168, 35169, 35170, 35171, 35172, 35173, 35175, 35176, 35177, 35178, 35179, 35180, 35181, 35182, 35183, 35184, 35185, 35186, 35187, 35188, 35189, 35190, 35191, 35192, 35193, 35194, 35196, 35197, 35198, 35200, 35202, 35204, 35205, 35207, 35208, 35209, 35210, 35211, 35212, 35213, 35214, 35215, 35216, 35217, 35218, 35219, 35220, 35221, 35222, 35223, 35224, 35225, 35226, 35227, 35228, 35229, 35230, 35231, 35232, 35233, 25671, 23591, 36965, 31377, 35875, 23002, 21676, 33280, 33647, 35201, 32768, 26928, 22094, 32822, 29239, 37326, 20918, 20063, 39029, 25494, 19994, 21494, 26355, 33099, 22812, 28082, 19968, 22777, 21307, 25558, 38129, 20381, 20234, 34915, 39056, 22839, 36951, 31227, 20202, 33008, 30097, 27778, 23452, 23016, 24413, 26885, 34433, 20506, 24050, 20057, 30691, 20197, 33402, 25233, 26131, 37009, 23673, 20159, 24441, 33222, 36920, 32900, 30123, 20134, 35028, 24847, 27589, 24518, 20041, 30410, 28322, 35811, 35758, 35850, 35793, 24322, 32764, 32716, 32462, 33589, 33643, 22240, 27575, 38899, 38452, 23035, 21535, 38134, 28139, 23493, 39278, 23609, 24341, 38544, 35234, 35235, 35236, 35237, 35238, 35239, 35240, 35241, 35242, 35243, 35244, 35245, 35246, 35247, 35248, 35249, 35250, 35251, 35252, 35253, 35254, 35255, 35256, 35257, 35258, 35259, 35260, 35261, 35262, 35263, 35264, 35267, 35277, 35283, 35284, 35285, 35287, 35288, 35289, 35291, 35293, 35295, 35296, 35297, 35298, 35300, 35303, 35304, 35305, 35306, 35308, 35309, 35310, 35312, 35313, 35314, 35316, 35317, 35318, 35319, 35320, 35321, 35322, 35323, 35324, 35325, 35326, 35327, 35329, 35330, 35331, 35332, 35333, 35334, 35336, 35337, 35338, 35339, 35340, 35341, 35342, 35343, 35344, 35345, 35346, 35347, 35348, 35349, 35350, 35351, 35352, 35353, 35354, 35355, 35356, 35357, 21360, 33521, 27185, 23156, 40560, 24212, 32552, 33721, 33828, 33829, 33639, 34631, 36814, 36194, 30408, 24433, 39062, 30828, 26144, 21727, 25317, 20323, 33219, 30152, 24248, 38605, 36362, 34553, 21647, 27891, 28044, 27704, 24703, 21191, 29992, 24189, 20248, 24736, 24551, 23588, 30001, 37038, 38080, 29369, 27833, 28216, 37193, 26377, 21451, 21491, 20305, 37321, 35825, 21448, 24188, 36802, 28132, 20110, 30402, 27014, 34398, 24858, 33286, 20313, 20446, 36926, 40060, 24841, 28189, 28180, 38533, 20104, 23089, 38632, 19982, 23679, 31161, 23431, 35821, 32701, 29577, 22495, 33419, 37057, 21505, 36935, 21947, 23786, 24481, 24840, 27442, 29425, 32946, 35465, 35358, 35359, 35360, 35361, 35362, 35363, 35364, 35365, 35366, 35367, 35368, 35369, 35370, 35371, 35372, 35373, 35374, 35375, 35376, 35377, 35378, 35379, 35380, 35381, 35382, 35383, 35384, 35385, 35386, 35387, 35388, 35389, 35391, 35392, 35393, 35394, 35395, 35396, 35397, 35398, 35399, 35401, 35402, 35403, 35404, 35405, 35406, 35407, 35408, 35409, 35410, 35411, 35412, 35413, 35414, 35415, 35416, 35417, 35418, 35419, 35420, 35421, 35422, 35423, 35424, 35425, 35426, 35427, 35428, 35429, 35430, 35431, 35432, 35433, 35434, 35435, 35436, 35437, 35438, 35439, 35440, 35441, 35442, 35443, 35444, 35445, 35446, 35447, 35448, 35450, 35451, 35452, 35453, 35454, 35455, 35456, 28020, 23507, 35029, 39044, 35947, 39533, 40499, 28170, 20900, 20803, 22435, 34945, 21407, 25588, 36757, 22253, 21592, 22278, 29503, 28304, 32536, 36828, 33489, 24895, 24616, 38498, 26352, 32422, 36234, 36291, 38053, 23731, 31908, 26376, 24742, 38405, 32792, 20113, 37095, 21248, 38504, 20801, 36816, 34164, 37213, 26197, 38901, 23381, 21277, 30776, 26434, 26685, 21705, 28798, 23472, 36733, 20877, 22312, 21681, 25874, 26242, 36190, 36163, 33039, 33900, 36973, 31967, 20991, 34299, 26531, 26089, 28577, 34468, 36481, 22122, 36896, 30338, 28790, 29157, 36131, 25321, 21017, 27901, 36156, 24590, 22686, 24974, 26366, 36192, 25166, 21939, 28195, 26413, 36711, 35457, 35458, 35459, 35460, 35461, 35462, 35463, 35464, 35467, 35468, 35469, 35470, 35471, 35472, 35473, 35474, 35476, 35477, 35478, 35479, 35480, 35481, 35482, 35483, 35484, 35485, 35486, 35487, 35488, 35489, 35490, 35491, 35492, 35493, 35494, 35495, 35496, 35497, 35498, 35499, 35500, 35501, 35502, 35503, 35504, 35505, 35506, 35507, 35508, 35509, 35510, 35511, 35512, 35513, 35514, 35515, 35516, 35517, 35518, 35519, 35520, 35521, 35522, 35523, 35524, 35525, 35526, 35527, 35528, 35529, 35530, 35531, 35532, 35533, 35534, 35535, 35536, 35537, 35538, 35539, 35540, 35541, 35542, 35543, 35544, 35545, 35546, 35547, 35548, 35549, 35550, 35551, 35552, 35553, 35554, 35555, 38113, 38392, 30504, 26629, 27048, 21643, 20045, 28856, 35784, 25688, 25995, 23429, 31364, 20538, 23528, 30651, 27617, 35449, 31896, 27838, 30415, 26025, 36759, 23853, 23637, 34360, 26632, 21344, 25112, 31449, 28251, 32509, 27167, 31456, 24432, 28467, 24352, 25484, 28072, 26454, 19976, 24080, 36134, 20183, 32960, 30260, 38556, 25307, 26157, 25214, 27836, 36213, 29031, 32617, 20806, 32903, 21484, 36974, 25240, 21746, 34544, 36761, 32773, 38167, 34071, 36825, 27993, 29645, 26015, 30495, 29956, 30759, 33275, 36126, 38024, 20390, 26517, 30137, 35786, 38663, 25391, 38215, 38453, 33976, 25379, 30529, 24449, 29424, 20105, 24596, 25972, 25327, 27491, 25919, 35556, 35557, 35558, 35559, 35560, 35561, 35562, 35563, 35564, 35565, 35566, 35567, 35568, 35569, 35570, 35571, 35572, 35573, 35574, 35575, 35576, 35577, 35578, 35579, 35580, 35581, 35582, 35583, 35584, 35585, 35586, 35587, 35588, 35589, 35590, 35592, 35593, 35594, 35595, 35596, 35597, 35598, 35599, 35600, 35601, 35602, 35603, 35604, 35605, 35606, 35607, 35608, 35609, 35610, 35611, 35612, 35613, 35614, 35615, 35616, 35617, 35618, 35619, 35620, 35621, 35623, 35624, 35625, 35626, 35627, 35628, 35629, 35630, 35631, 35632, 35633, 35634, 35635, 35636, 35637, 35638, 35639, 35640, 35641, 35642, 35643, 35644, 35645, 35646, 35647, 35648, 35649, 35650, 35651, 35652, 35653, 24103, 30151, 37073, 35777, 33437, 26525, 25903, 21553, 34584, 30693, 32930, 33026, 27713, 20043, 32455, 32844, 30452, 26893, 27542, 25191, 20540, 20356, 22336, 25351, 27490, 36286, 21482, 26088, 32440, 24535, 25370, 25527, 33267, 33268, 32622, 24092, 23769, 21046, 26234, 31209, 31258, 36136, 28825, 30164, 28382, 27835, 31378, 20013, 30405, 24544, 38047, 34935, 32456, 31181, 32959, 37325, 20210, 20247, 33311, 21608, 24030, 27954, 35788, 31909, 36724, 32920, 24090, 21650, 30385, 23449, 26172, 39588, 29664, 26666, 34523, 26417, 29482, 35832, 35803, 36880, 31481, 28891, 29038, 25284, 30633, 22065, 20027, 33879, 26609, 21161, 34496, 36142, 38136, 31569, 35654, 35655, 35656, 35657, 35658, 35659, 35660, 35661, 35662, 35663, 35664, 35665, 35666, 35667, 35668, 35669, 35670, 35671, 35672, 35673, 35674, 35675, 35676, 35677, 35678, 35679, 35680, 35681, 35682, 35683, 35684, 35685, 35687, 35688, 35689, 35690, 35691, 35693, 35694, 35695, 35696, 35697, 35698, 35699, 35700, 35701, 35702, 35703, 35704, 35705, 35706, 35707, 35708, 35709, 35710, 35711, 35712, 35713, 35714, 35715, 35716, 35717, 35718, 35719, 35720, 35721, 35722, 35723, 35724, 35725, 35726, 35727, 35728, 35729, 35730, 35731, 35732, 35733, 35734, 35735, 35736, 35737, 35738, 35739, 35740, 35741, 35742, 35743, 35756, 35761, 35771, 35783, 35792, 35818, 35849, 35870, 20303, 27880, 31069, 39547, 25235, 29226, 25341, 19987, 30742, 36716, 25776, 36186, 31686, 26729, 24196, 35013, 22918, 25758, 22766, 29366, 26894, 38181, 36861, 36184, 22368, 32512, 35846, 20934, 25417, 25305, 21331, 26700, 29730, 33537, 37196, 21828, 30528, 28796, 27978, 20857, 21672, 36164, 23039, 28363, 28100, 23388, 32043, 20180, 31869, 28371, 23376, 33258, 28173, 23383, 39683, 26837, 36394, 23447, 32508, 24635, 32437, 37049, 36208, 22863, 25549, 31199, 36275, 21330, 26063, 31062, 35781, 38459, 32452, 38075, 32386, 22068, 37257, 26368, 32618, 23562, 36981, 26152, 24038, 20304, 26590, 20570, 20316, 22352, 24231, 59408, 59409, 59410, 59411, 59412, 35896, 35897, 35898, 35899, 35900, 35901, 35902, 35903, 35904, 35906, 35907, 35908, 35909, 35912, 35914, 35915, 35917, 35918, 35919, 35920, 35921, 35922, 35923, 35924, 35926, 35927, 35928, 35929, 35931, 35932, 35933, 35934, 35935, 35936, 35939, 35940, 35941, 35942, 35943, 35944, 35945, 35948, 35949, 35950, 35951, 35952, 35953, 35954, 35956, 35957, 35958, 35959, 35963, 35964, 35965, 35966, 35967, 35968, 35969, 35971, 35972, 35974, 35975, 35976, 35979, 35981, 35982, 35983, 35984, 35985, 35986, 35987, 35989, 35990, 35991, 35993, 35994, 35995, 35996, 35997, 35998, 35999, 36000, 36001, 36002, 36003, 36004, 36005, 36006, 36007, 36008, 36009, 36010, 36011, 36012, 36013, 20109, 19980, 20800, 19984, 24319, 21317, 19989, 20120, 19998, 39730, 23404, 22121, 20008, 31162, 20031, 21269, 20039, 22829, 29243, 21358, 27664, 22239, 32996, 39319, 27603, 30590, 40727, 20022, 20127, 40720, 20060, 20073, 20115, 33416, 23387, 21868, 22031, 20164, 21389, 21405, 21411, 21413, 21422, 38757, 36189, 21274, 21493, 21286, 21294, 21310, 36188, 21350, 21347, 20994, 21000, 21006, 21037, 21043, 21055, 21056, 21068, 21086, 21089, 21084, 33967, 21117, 21122, 21121, 21136, 21139, 20866, 32596, 20155, 20163, 20169, 20162, 20200, 20193, 20203, 20190, 20251, 20211, 20258, 20324, 20213, 20261, 20263, 20233, 20267, 20318, 20327, 25912, 20314, 20317, 36014, 36015, 36016, 36017, 36018, 36019, 36020, 36021, 36022, 36023, 36024, 36025, 36026, 36027, 36028, 36029, 36030, 36031, 36032, 36033, 36034, 36035, 36036, 36037, 36038, 36039, 36040, 36041, 36042, 36043, 36044, 36045, 36046, 36047, 36048, 36049, 36050, 36051, 36052, 36053, 36054, 36055, 36056, 36057, 36058, 36059, 36060, 36061, 36062, 36063, 36064, 36065, 36066, 36067, 36068, 36069, 36070, 36071, 36072, 36073, 36074, 36075, 36076, 36077, 36078, 36079, 36080, 36081, 36082, 36083, 36084, 36085, 36086, 36087, 36088, 36089, 36090, 36091, 36092, 36093, 36094, 36095, 36096, 36097, 36098, 36099, 36100, 36101, 36102, 36103, 36104, 36105, 36106, 36107, 36108, 36109, 20319, 20311, 20274, 20285, 20342, 20340, 20369, 20361, 20355, 20367, 20350, 20347, 20394, 20348, 20396, 20372, 20454, 20456, 20458, 20421, 20442, 20451, 20444, 20433, 20447, 20472, 20521, 20556, 20467, 20524, 20495, 20526, 20525, 20478, 20508, 20492, 20517, 20520, 20606, 20547, 20565, 20552, 20558, 20588, 20603, 20645, 20647, 20649, 20666, 20694, 20742, 20717, 20716, 20710, 20718, 20743, 20747, 20189, 27709, 20312, 20325, 20430, 40864, 27718, 31860, 20846, 24061, 40649, 39320, 20865, 22804, 21241, 21261, 35335, 21264, 20971, 22809, 20821, 20128, 20822, 20147, 34926, 34980, 20149, 33044, 35026, 31104, 23348, 34819, 32696, 20907, 20913, 20925, 20924, 36110, 36111, 36112, 36113, 36114, 36115, 36116, 36117, 36118, 36119, 36120, 36121, 36122, 36123, 36124, 36128, 36177, 36178, 36183, 36191, 36197, 36200, 36201, 36202, 36204, 36206, 36207, 36209, 36210, 36216, 36217, 36218, 36219, 36220, 36221, 36222, 36223, 36224, 36226, 36227, 36230, 36231, 36232, 36233, 36236, 36237, 36238, 36239, 36240, 36242, 36243, 36245, 36246, 36247, 36248, 36249, 36250, 36251, 36252, 36253, 36254, 36256, 36257, 36258, 36260, 36261, 36262, 36263, 36264, 36265, 36266, 36267, 36268, 36269, 36270, 36271, 36272, 36274, 36278, 36279, 36281, 36283, 36285, 36288, 36289, 36290, 36293, 36295, 36296, 36297, 36298, 36301, 36304, 36306, 36307, 36308, 20935, 20886, 20898, 20901, 35744, 35750, 35751, 35754, 35764, 35765, 35767, 35778, 35779, 35787, 35791, 35790, 35794, 35795, 35796, 35798, 35800, 35801, 35804, 35807, 35808, 35812, 35816, 35817, 35822, 35824, 35827, 35830, 35833, 35836, 35839, 35840, 35842, 35844, 35847, 35852, 35855, 35857, 35858, 35860, 35861, 35862, 35865, 35867, 35864, 35869, 35871, 35872, 35873, 35877, 35879, 35882, 35883, 35886, 35887, 35890, 35891, 35893, 35894, 21353, 21370, 38429, 38434, 38433, 38449, 38442, 38461, 38460, 38466, 38473, 38484, 38495, 38503, 38508, 38514, 38516, 38536, 38541, 38551, 38576, 37015, 37019, 37021, 37017, 37036, 37025, 37044, 37043, 37046, 37050, 36309, 36312, 36313, 36316, 36320, 36321, 36322, 36325, 36326, 36327, 36329, 36333, 36334, 36336, 36337, 36338, 36340, 36342, 36348, 36350, 36351, 36352, 36353, 36354, 36355, 36356, 36358, 36359, 36360, 36363, 36365, 36366, 36368, 36369, 36370, 36371, 36373, 36374, 36375, 36376, 36377, 36378, 36379, 36380, 36384, 36385, 36388, 36389, 36390, 36391, 36392, 36395, 36397, 36400, 36402, 36403, 36404, 36406, 36407, 36408, 36411, 36412, 36414, 36415, 36419, 36421, 36422, 36428, 36429, 36430, 36431, 36432, 36435, 36436, 36437, 36438, 36439, 36440, 36442, 36443, 36444, 36445, 36446, 36447, 36448, 36449, 36450, 36451, 36452, 36453, 36455, 36456, 36458, 36459, 36462, 36465, 37048, 37040, 37071, 37061, 37054, 37072, 37060, 37063, 37075, 37094, 37090, 37084, 37079, 37083, 37099, 37103, 37118, 37124, 37154, 37150, 37155, 37169, 37167, 37177, 37187, 37190, 21005, 22850, 21154, 21164, 21165, 21182, 21759, 21200, 21206, 21232, 21471, 29166, 30669, 24308, 20981, 20988, 39727, 21430, 24321, 30042, 24047, 22348, 22441, 22433, 22654, 22716, 22725, 22737, 22313, 22316, 22314, 22323, 22329, 22318, 22319, 22364, 22331, 22338, 22377, 22405, 22379, 22406, 22396, 22395, 22376, 22381, 22390, 22387, 22445, 22436, 22412, 22450, 22479, 22439, 22452, 22419, 22432, 22485, 22488, 22490, 22489, 22482, 22456, 22516, 22511, 22520, 22500, 22493, 36467, 36469, 36471, 36472, 36473, 36474, 36475, 36477, 36478, 36480, 36482, 36483, 36484, 36486, 36488, 36489, 36490, 36491, 36492, 36493, 36494, 36497, 36498, 36499, 36501, 36502, 36503, 36504, 36505, 36506, 36507, 36509, 36511, 36512, 36513, 36514, 36515, 36516, 36517, 36518, 36519, 36520, 36521, 36522, 36525, 36526, 36528, 36529, 36531, 36532, 36533, 36534, 36535, 36536, 36537, 36539, 36540, 36541, 36542, 36543, 36544, 36545, 36546, 36547, 36548, 36549, 36550, 36551, 36552, 36553, 36554, 36555, 36556, 36557, 36559, 36560, 36561, 36562, 36563, 36564, 36565, 36566, 36567, 36568, 36569, 36570, 36571, 36572, 36573, 36574, 36575, 36576, 36577, 36578, 36579, 36580, 22539, 22541, 22525, 22509, 22528, 22558, 22553, 22596, 22560, 22629, 22636, 22657, 22665, 22682, 22656, 39336, 40729, 25087, 33401, 33405, 33407, 33423, 33418, 33448, 33412, 33422, 33425, 33431, 33433, 33451, 33464, 33470, 33456, 33480, 33482, 33507, 33432, 33463, 33454, 33483, 33484, 33473, 33449, 33460, 33441, 33450, 33439, 33476, 33486, 33444, 33505, 33545, 33527, 33508, 33551, 33543, 33500, 33524, 33490, 33496, 33548, 33531, 33491, 33553, 33562, 33542, 33556, 33557, 33504, 33493, 33564, 33617, 33627, 33628, 33544, 33682, 33596, 33588, 33585, 33691, 33630, 33583, 33615, 33607, 33603, 33631, 33600, 33559, 33632, 33581, 33594, 33587, 33638, 33637, 36581, 36582, 36583, 36584, 36585, 36586, 36587, 36588, 36589, 36590, 36591, 36592, 36593, 36594, 36595, 36596, 36597, 36598, 36599, 36600, 36601, 36602, 36603, 36604, 36605, 36606, 36607, 36608, 36609, 36610, 36611, 36612, 36613, 36614, 36615, 36616, 36617, 36618, 36619, 36620, 36621, 36622, 36623, 36624, 36625, 36626, 36627, 36628, 36629, 36630, 36631, 36632, 36633, 36634, 36635, 36636, 36637, 36638, 36639, 36640, 36641, 36642, 36643, 36644, 36645, 36646, 36647, 36648, 36649, 36650, 36651, 36652, 36653, 36654, 36655, 36656, 36657, 36658, 36659, 36660, 36661, 36662, 36663, 36664, 36665, 36666, 36667, 36668, 36669, 36670, 36671, 36672, 36673, 36674, 36675, 36676, 33640, 33563, 33641, 33644, 33642, 33645, 33646, 33712, 33656, 33715, 33716, 33696, 33706, 33683, 33692, 33669, 33660, 33718, 33705, 33661, 33720, 33659, 33688, 33694, 33704, 33722, 33724, 33729, 33793, 33765, 33752, 22535, 33816, 33803, 33757, 33789, 33750, 33820, 33848, 33809, 33798, 33748, 33759, 33807, 33795, 33784, 33785, 33770, 33733, 33728, 33830, 33776, 33761, 33884, 33873, 33882, 33881, 33907, 33927, 33928, 33914, 33929, 33912, 33852, 33862, 33897, 33910, 33932, 33934, 33841, 33901, 33985, 33997, 34000, 34022, 33981, 34003, 33994, 33983, 33978, 34016, 33953, 33977, 33972, 33943, 34021, 34019, 34060, 29965, 34104, 34032, 34105, 34079, 34106, 36677, 36678, 36679, 36680, 36681, 36682, 36683, 36684, 36685, 36686, 36687, 36688, 36689, 36690, 36691, 36692, 36693, 36694, 36695, 36696, 36697, 36698, 36699, 36700, 36701, 36702, 36703, 36704, 36705, 36706, 36707, 36708, 36709, 36714, 36736, 36748, 36754, 36765, 36768, 36769, 36770, 36772, 36773, 36774, 36775, 36778, 36780, 36781, 36782, 36783, 36786, 36787, 36788, 36789, 36791, 36792, 36794, 36795, 36796, 36799, 36800, 36803, 36806, 36809, 36810, 36811, 36812, 36813, 36815, 36818, 36822, 36823, 36826, 36832, 36833, 36835, 36839, 36844, 36847, 36849, 36850, 36852, 36853, 36854, 36858, 36859, 36860, 36862, 36863, 36871, 36872, 36876, 36878, 36883, 36885, 36888, 34134, 34107, 34047, 34044, 34137, 34120, 34152, 34148, 34142, 34170, 30626, 34115, 34162, 34171, 34212, 34216, 34183, 34191, 34169, 34222, 34204, 34181, 34233, 34231, 34224, 34259, 34241, 34268, 34303, 34343, 34309, 34345, 34326, 34364, 24318, 24328, 22844, 22849, 32823, 22869, 22874, 22872, 21263, 23586, 23589, 23596, 23604, 25164, 25194, 25247, 25275, 25290, 25306, 25303, 25326, 25378, 25334, 25401, 25419, 25411, 25517, 25590, 25457, 25466, 25486, 25524, 25453, 25516, 25482, 25449, 25518, 25532, 25586, 25592, 25568, 25599, 25540, 25566, 25550, 25682, 25542, 25534, 25669, 25665, 25611, 25627, 25632, 25612, 25638, 25633, 25694, 25732, 25709, 25750, 36889, 36892, 36899, 36900, 36901, 36903, 36904, 36905, 36906, 36907, 36908, 36912, 36913, 36914, 36915, 36916, 36919, 36921, 36922, 36925, 36927, 36928, 36931, 36933, 36934, 36936, 36937, 36938, 36939, 36940, 36942, 36948, 36949, 36950, 36953, 36954, 36956, 36957, 36958, 36959, 36960, 36961, 36964, 36966, 36967, 36969, 36970, 36971, 36972, 36975, 36976, 36977, 36978, 36979, 36982, 36983, 36984, 36985, 36986, 36987, 36988, 36990, 36993, 36996, 36997, 36998, 36999, 37001, 37002, 37004, 37005, 37006, 37007, 37008, 37010, 37012, 37014, 37016, 37018, 37020, 37022, 37023, 37024, 37028, 37029, 37031, 37032, 37033, 37035, 37037, 37042, 37047, 37052, 37053, 37055, 37056, 25722, 25783, 25784, 25753, 25786, 25792, 25808, 25815, 25828, 25826, 25865, 25893, 25902, 24331, 24530, 29977, 24337, 21343, 21489, 21501, 21481, 21480, 21499, 21522, 21526, 21510, 21579, 21586, 21587, 21588, 21590, 21571, 21537, 21591, 21593, 21539, 21554, 21634, 21652, 21623, 21617, 21604, 21658, 21659, 21636, 21622, 21606, 21661, 21712, 21677, 21698, 21684, 21714, 21671, 21670, 21715, 21716, 21618, 21667, 21717, 21691, 21695, 21708, 21721, 21722, 21724, 21673, 21674, 21668, 21725, 21711, 21726, 21787, 21735, 21792, 21757, 21780, 21747, 21794, 21795, 21775, 21777, 21799, 21802, 21863, 21903, 21941, 21833, 21869, 21825, 21845, 21823, 21840, 21820, 37058, 37059, 37062, 37064, 37065, 37067, 37068, 37069, 37074, 37076, 37077, 37078, 37080, 37081, 37082, 37086, 37087, 37088, 37091, 37092, 37093, 37097, 37098, 37100, 37102, 37104, 37105, 37106, 37107, 37109, 37110, 37111, 37113, 37114, 37115, 37116, 37119, 37120, 37121, 37123, 37125, 37126, 37127, 37128, 37129, 37130, 37131, 37132, 37133, 37134, 37135, 37136, 37137, 37138, 37139, 37140, 37141, 37142, 37143, 37144, 37146, 37147, 37148, 37149, 37151, 37152, 37153, 37156, 37157, 37158, 37159, 37160, 37161, 37162, 37163, 37164, 37165, 37166, 37168, 37170, 37171, 37172, 37173, 37174, 37175, 37176, 37178, 37179, 37180, 37181, 37182, 37183, 37184, 37185, 37186, 37188, 21815, 21846, 21877, 21878, 21879, 21811, 21808, 21852, 21899, 21970, 21891, 21937, 21945, 21896, 21889, 21919, 21886, 21974, 21905, 21883, 21983, 21949, 21950, 21908, 21913, 21994, 22007, 21961, 22047, 21969, 21995, 21996, 21972, 21990, 21981, 21956, 21999, 21989, 22002, 22003, 21964, 21965, 21992, 22005, 21988, 36756, 22046, 22024, 22028, 22017, 22052, 22051, 22014, 22016, 22055, 22061, 22104, 22073, 22103, 22060, 22093, 22114, 22105, 22108, 22092, 22100, 22150, 22116, 22129, 22123, 22139, 22140, 22149, 22163, 22191, 22228, 22231, 22237, 22241, 22261, 22251, 22265, 22271, 22276, 22282, 22281, 22300, 24079, 24089, 24084, 24081, 24113, 24123, 24124, 37189, 37191, 37192, 37201, 37203, 37204, 37205, 37206, 37208, 37209, 37211, 37212, 37215, 37216, 37222, 37223, 37224, 37227, 37229, 37235, 37242, 37243, 37244, 37248, 37249, 37250, 37251, 37252, 37254, 37256, 37258, 37262, 37263, 37267, 37268, 37269, 37270, 37271, 37272, 37273, 37276, 37277, 37278, 37279, 37280, 37281, 37284, 37285, 37286, 37287, 37288, 37289, 37291, 37292, 37296, 37297, 37298, 37299, 37302, 37303, 37304, 37305, 37307, 37308, 37309, 37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37320, 37323, 37328, 37330, 37331, 37332, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341, 37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 24119, 24132, 24148, 24155, 24158, 24161, 23692, 23674, 23693, 23696, 23702, 23688, 23704, 23705, 23697, 23706, 23708, 23733, 23714, 23741, 23724, 23723, 23729, 23715, 23745, 23735, 23748, 23762, 23780, 23755, 23781, 23810, 23811, 23847, 23846, 23854, 23844, 23838, 23814, 23835, 23896, 23870, 23860, 23869, 23916, 23899, 23919, 23901, 23915, 23883, 23882, 23913, 23924, 23938, 23961, 23965, 35955, 23991, 24005, 24435, 24439, 24450, 24455, 24457, 24460, 24469, 24473, 24476, 24488, 24493, 24501, 24508, 34914, 24417, 29357, 29360, 29364, 29367, 29368, 29379, 29377, 29390, 29389, 29394, 29416, 29423, 29417, 29426, 29428, 29431, 29441, 29427, 29443, 29434, 37350, 37351, 37352, 37353, 37354, 37355, 37356, 37357, 37358, 37359, 37360, 37361, 37362, 37363, 37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37372, 37373, 37374, 37375, 37376, 37377, 37378, 37379, 37380, 37381, 37382, 37383, 37384, 37385, 37386, 37387, 37388, 37389, 37390, 37391, 37392, 37393, 37394, 37395, 37396, 37397, 37398, 37399, 37400, 37401, 37402, 37403, 37404, 37405, 37406, 37407, 37408, 37409, 37410, 37411, 37412, 37413, 37414, 37415, 37416, 37417, 37418, 37419, 37420, 37421, 37422, 37423, 37424, 37425, 37426, 37427, 37428, 37429, 37430, 37431, 37432, 37433, 37434, 37435, 37436, 37437, 37438, 37439, 37440, 37441, 37442, 37443, 37444, 37445, 29435, 29463, 29459, 29473, 29450, 29470, 29469, 29461, 29474, 29497, 29477, 29484, 29496, 29489, 29520, 29517, 29527, 29536, 29548, 29551, 29566, 33307, 22821, 39143, 22820, 22786, 39267, 39271, 39272, 39273, 39274, 39275, 39276, 39284, 39287, 39293, 39296, 39300, 39303, 39306, 39309, 39312, 39313, 39315, 39316, 39317, 24192, 24209, 24203, 24214, 24229, 24224, 24249, 24245, 24254, 24243, 36179, 24274, 24273, 24283, 24296, 24298, 33210, 24516, 24521, 24534, 24527, 24579, 24558, 24580, 24545, 24548, 24574, 24581, 24582, 24554, 24557, 24568, 24601, 24629, 24614, 24603, 24591, 24589, 24617, 24619, 24586, 24639, 24609, 24696, 24697, 24699, 24698, 24642, 37446, 37447, 37448, 37449, 37450, 37451, 37452, 37453, 37454, 37455, 37456, 37457, 37458, 37459, 37460, 37461, 37462, 37463, 37464, 37465, 37466, 37467, 37468, 37469, 37470, 37471, 37472, 37473, 37474, 37475, 37476, 37477, 37478, 37479, 37480, 37481, 37482, 37483, 37484, 37485, 37486, 37487, 37488, 37489, 37490, 37491, 37493, 37494, 37495, 37496, 37497, 37498, 37499, 37500, 37501, 37502, 37503, 37504, 37505, 37506, 37507, 37508, 37509, 37510, 37511, 37512, 37513, 37514, 37515, 37516, 37517, 37519, 37520, 37521, 37522, 37523, 37524, 37525, 37526, 37527, 37528, 37529, 37530, 37531, 37532, 37533, 37534, 37535, 37536, 37537, 37538, 37539, 37540, 37541, 37542, 37543, 24682, 24701, 24726, 24730, 24749, 24733, 24707, 24722, 24716, 24731, 24812, 24763, 24753, 24797, 24792, 24774, 24794, 24756, 24864, 24870, 24853, 24867, 24820, 24832, 24846, 24875, 24906, 24949, 25004, 24980, 24999, 25015, 25044, 25077, 24541, 38579, 38377, 38379, 38385, 38387, 38389, 38390, 38396, 38398, 38403, 38404, 38406, 38408, 38410, 38411, 38412, 38413, 38415, 38418, 38421, 38422, 38423, 38425, 38426, 20012, 29247, 25109, 27701, 27732, 27740, 27722, 27811, 27781, 27792, 27796, 27788, 27752, 27753, 27764, 27766, 27782, 27817, 27856, 27860, 27821, 27895, 27896, 27889, 27863, 27826, 27872, 27862, 27898, 27883, 27886, 27825, 27859, 27887, 27902, 37544, 37545, 37546, 37547, 37548, 37549, 37551, 37552, 37553, 37554, 37555, 37556, 37557, 37558, 37559, 37560, 37561, 37562, 37563, 37564, 37565, 37566, 37567, 37568, 37569, 37570, 37571, 37572, 37573, 37574, 37575, 37577, 37578, 37579, 37580, 37581, 37582, 37583, 37584, 37585, 37586, 37587, 37588, 37589, 37590, 37591, 37592, 37593, 37594, 37595, 37596, 37597, 37598, 37599, 37600, 37601, 37602, 37603, 37604, 37605, 37606, 37607, 37608, 37609, 37610, 37611, 37612, 37613, 37614, 37615, 37616, 37617, 37618, 37619, 37620, 37621, 37622, 37623, 37624, 37625, 37626, 37627, 37628, 37629, 37630, 37631, 37632, 37633, 37634, 37635, 37636, 37637, 37638, 37639, 37640, 37641, 27961, 27943, 27916, 27971, 27976, 27911, 27908, 27929, 27918, 27947, 27981, 27950, 27957, 27930, 27983, 27986, 27988, 27955, 28049, 28015, 28062, 28064, 27998, 28051, 28052, 27996, 28000, 28028, 28003, 28186, 28103, 28101, 28126, 28174, 28095, 28128, 28177, 28134, 28125, 28121, 28182, 28075, 28172, 28078, 28203, 28270, 28238, 28267, 28338, 28255, 28294, 28243, 28244, 28210, 28197, 28228, 28383, 28337, 28312, 28384, 28461, 28386, 28325, 28327, 28349, 28347, 28343, 28375, 28340, 28367, 28303, 28354, 28319, 28514, 28486, 28487, 28452, 28437, 28409, 28463, 28470, 28491, 28532, 28458, 28425, 28457, 28553, 28557, 28556, 28536, 28530, 28540, 28538, 28625, 37642, 37643, 37644, 37645, 37646, 37647, 37648, 37649, 37650, 37651, 37652, 37653, 37654, 37655, 37656, 37657, 37658, 37659, 37660, 37661, 37662, 37663, 37664, 37665, 37666, 37667, 37668, 37669, 37670, 37671, 37672, 37673, 37674, 37675, 37676, 37677, 37678, 37679, 37680, 37681, 37682, 37683, 37684, 37685, 37686, 37687, 37688, 37689, 37690, 37691, 37692, 37693, 37695, 37696, 37697, 37698, 37699, 37700, 37701, 37702, 37703, 37704, 37705, 37706, 37707, 37708, 37709, 37710, 37711, 37712, 37713, 37714, 37715, 37716, 37717, 37718, 37719, 37720, 37721, 37722, 37723, 37724, 37725, 37726, 37727, 37728, 37729, 37730, 37731, 37732, 37733, 37734, 37735, 37736, 37737, 37739, 28617, 28583, 28601, 28598, 28610, 28641, 28654, 28638, 28640, 28655, 28698, 28707, 28699, 28729, 28725, 28751, 28766, 23424, 23428, 23445, 23443, 23461, 23480, 29999, 39582, 25652, 23524, 23534, 35120, 23536, 36423, 35591, 36790, 36819, 36821, 36837, 36846, 36836, 36841, 36838, 36851, 36840, 36869, 36868, 36875, 36902, 36881, 36877, 36886, 36897, 36917, 36918, 36909, 36911, 36932, 36945, 36946, 36944, 36968, 36952, 36962, 36955, 26297, 36980, 36989, 36994, 37000, 36995, 37003, 24400, 24407, 24406, 24408, 23611, 21675, 23632, 23641, 23409, 23651, 23654, 32700, 24362, 24361, 24365, 33396, 24380, 39739, 23662, 22913, 22915, 22925, 22953, 22954, 22947, 37740, 37741, 37742, 37743, 37744, 37745, 37746, 37747, 37748, 37749, 37750, 37751, 37752, 37753, 37754, 37755, 37756, 37757, 37758, 37759, 37760, 37761, 37762, 37763, 37764, 37765, 37766, 37767, 37768, 37769, 37770, 37771, 37772, 37773, 37774, 37776, 37777, 37778, 37779, 37780, 37781, 37782, 37783, 37784, 37785, 37786, 37787, 37788, 37789, 37790, 37791, 37792, 37793, 37794, 37795, 37796, 37797, 37798, 37799, 37800, 37801, 37802, 37803, 37804, 37805, 37806, 37807, 37808, 37809, 37810, 37811, 37812, 37813, 37814, 37815, 37816, 37817, 37818, 37819, 37820, 37821, 37822, 37823, 37824, 37825, 37826, 37827, 37828, 37829, 37830, 37831, 37832, 37833, 37835, 37836, 37837, 22935, 22986, 22955, 22942, 22948, 22994, 22962, 22959, 22999, 22974, 23045, 23046, 23005, 23048, 23011, 23000, 23033, 23052, 23049, 23090, 23092, 23057, 23075, 23059, 23104, 23143, 23114, 23125, 23100, 23138, 23157, 33004, 23210, 23195, 23159, 23162, 23230, 23275, 23218, 23250, 23252, 23224, 23264, 23267, 23281, 23254, 23270, 23256, 23260, 23305, 23319, 23318, 23346, 23351, 23360, 23573, 23580, 23386, 23397, 23411, 23377, 23379, 23394, 39541, 39543, 39544, 39546, 39551, 39549, 39552, 39553, 39557, 39560, 39562, 39568, 39570, 39571, 39574, 39576, 39579, 39580, 39581, 39583, 39584, 39586, 39587, 39589, 39591, 32415, 32417, 32419, 32421, 32424, 32425, 37838, 37839, 37840, 37841, 37842, 37843, 37844, 37845, 37847, 37848, 37849, 37850, 37851, 37852, 37853, 37854, 37855, 37856, 37857, 37858, 37859, 37860, 37861, 37862, 37863, 37864, 37865, 37866, 37867, 37868, 37869, 37870, 37871, 37872, 37873, 37874, 37875, 37876, 37877, 37878, 37879, 37880, 37881, 37882, 37883, 37884, 37885, 37886, 37887, 37888, 37889, 37890, 37891, 37892, 37893, 37894, 37895, 37896, 37897, 37898, 37899, 37900, 37901, 37902, 37903, 37904, 37905, 37906, 37907, 37908, 37909, 37910, 37911, 37912, 37913, 37914, 37915, 37916, 37917, 37918, 37919, 37920, 37921, 37922, 37923, 37924, 37925, 37926, 37927, 37928, 37929, 37930, 37931, 37932, 37933, 37934, 32429, 32432, 32446, 32448, 32449, 32450, 32457, 32459, 32460, 32464, 32468, 32471, 32475, 32480, 32481, 32488, 32491, 32494, 32495, 32497, 32498, 32525, 32502, 32506, 32507, 32510, 32513, 32514, 32515, 32519, 32520, 32523, 32524, 32527, 32529, 32530, 32535, 32537, 32540, 32539, 32543, 32545, 32546, 32547, 32548, 32549, 32550, 32551, 32554, 32555, 32556, 32557, 32559, 32560, 32561, 32562, 32563, 32565, 24186, 30079, 24027, 30014, 37013, 29582, 29585, 29614, 29602, 29599, 29647, 29634, 29649, 29623, 29619, 29632, 29641, 29640, 29669, 29657, 39036, 29706, 29673, 29671, 29662, 29626, 29682, 29711, 29738, 29787, 29734, 29733, 29736, 29744, 29742, 29740, 37935, 37936, 37937, 37938, 37939, 37940, 37941, 37942, 37943, 37944, 37945, 37946, 37947, 37948, 37949, 37951, 37952, 37953, 37954, 37955, 37956, 37957, 37958, 37959, 37960, 37961, 37962, 37963, 37964, 37965, 37966, 37967, 37968, 37969, 37970, 37971, 37972, 37973, 37974, 37975, 37976, 37977, 37978, 37979, 37980, 37981, 37982, 37983, 37984, 37985, 37986, 37987, 37988, 37989, 37990, 37991, 37992, 37993, 37994, 37996, 37997, 37998, 37999, 38000, 38001, 38002, 38003, 38004, 38005, 38006, 38007, 38008, 38009, 38010, 38011, 38012, 38013, 38014, 38015, 38016, 38017, 38018, 38019, 38020, 38033, 38038, 38040, 38087, 38095, 38099, 38100, 38106, 38118, 38139, 38172, 38176, 29723, 29722, 29761, 29788, 29783, 29781, 29785, 29815, 29805, 29822, 29852, 29838, 29824, 29825, 29831, 29835, 29854, 29864, 29865, 29840, 29863, 29906, 29882, 38890, 38891, 38892, 26444, 26451, 26462, 26440, 26473, 26533, 26503, 26474, 26483, 26520, 26535, 26485, 26536, 26526, 26541, 26507, 26487, 26492, 26608, 26633, 26584, 26634, 26601, 26544, 26636, 26585, 26549, 26586, 26547, 26589, 26624, 26563, 26552, 26594, 26638, 26561, 26621, 26674, 26675, 26720, 26721, 26702, 26722, 26692, 26724, 26755, 26653, 26709, 26726, 26689, 26727, 26688, 26686, 26698, 26697, 26665, 26805, 26767, 26740, 26743, 26771, 26731, 26818, 26990, 26876, 26911, 26912, 26873, 38183, 38195, 38205, 38211, 38216, 38219, 38229, 38234, 38240, 38254, 38260, 38261, 38263, 38264, 38265, 38266, 38267, 38268, 38269, 38270, 38272, 38273, 38274, 38275, 38276, 38277, 38278, 38279, 38280, 38281, 38282, 38283, 38284, 38285, 38286, 38287, 38288, 38289, 38290, 38291, 38292, 38293, 38294, 38295, 38296, 38297, 38298, 38299, 38300, 38301, 38302, 38303, 38304, 38305, 38306, 38307, 38308, 38309, 38310, 38311, 38312, 38313, 38314, 38315, 38316, 38317, 38318, 38319, 38320, 38321, 38322, 38323, 38324, 38325, 38326, 38327, 38328, 38329, 38330, 38331, 38332, 38333, 38334, 38335, 38336, 38337, 38338, 38339, 38340, 38341, 38342, 38343, 38344, 38345, 38346, 38347, 26916, 26864, 26891, 26881, 26967, 26851, 26896, 26993, 26937, 26976, 26946, 26973, 27012, 26987, 27008, 27032, 27000, 26932, 27084, 27015, 27016, 27086, 27017, 26982, 26979, 27001, 27035, 27047, 27067, 27051, 27053, 27092, 27057, 27073, 27082, 27103, 27029, 27104, 27021, 27135, 27183, 27117, 27159, 27160, 27237, 27122, 27204, 27198, 27296, 27216, 27227, 27189, 27278, 27257, 27197, 27176, 27224, 27260, 27281, 27280, 27305, 27287, 27307, 29495, 29522, 27521, 27522, 27527, 27524, 27538, 27539, 27533, 27546, 27547, 27553, 27562, 36715, 36717, 36721, 36722, 36723, 36725, 36726, 36728, 36727, 36729, 36730, 36732, 36734, 36737, 36738, 36740, 36743, 36747, 38348, 38349, 38350, 38351, 38352, 38353, 38354, 38355, 38356, 38357, 38358, 38359, 38360, 38361, 38362, 38363, 38364, 38365, 38366, 38367, 38368, 38369, 38370, 38371, 38372, 38373, 38374, 38375, 38380, 38399, 38407, 38419, 38424, 38427, 38430, 38432, 38435, 38436, 38437, 38438, 38439, 38440, 38441, 38443, 38444, 38445, 38447, 38448, 38455, 38456, 38457, 38458, 38462, 38465, 38467, 38474, 38478, 38479, 38481, 38482, 38483, 38486, 38487, 38488, 38489, 38490, 38492, 38493, 38494, 38496, 38499, 38501, 38502, 38507, 38509, 38510, 38511, 38512, 38513, 38515, 38520, 38521, 38522, 38523, 38524, 38525, 38526, 38527, 38528, 38529, 38530, 38531, 38532, 38535, 38537, 38538, 36749, 36750, 36751, 36760, 36762, 36558, 25099, 25111, 25115, 25119, 25122, 25121, 25125, 25124, 25132, 33255, 29935, 29940, 29951, 29967, 29969, 29971, 25908, 26094, 26095, 26096, 26122, 26137, 26482, 26115, 26133, 26112, 28805, 26359, 26141, 26164, 26161, 26166, 26165, 32774, 26207, 26196, 26177, 26191, 26198, 26209, 26199, 26231, 26244, 26252, 26279, 26269, 26302, 26331, 26332, 26342, 26345, 36146, 36147, 36150, 36155, 36157, 36160, 36165, 36166, 36168, 36169, 36167, 36173, 36181, 36185, 35271, 35274, 35275, 35276, 35278, 35279, 35280, 35281, 29294, 29343, 29277, 29286, 29295, 29310, 29311, 29316, 29323, 29325, 29327, 29330, 25352, 25394, 25520, 38540, 38542, 38545, 38546, 38547, 38549, 38550, 38554, 38555, 38557, 38558, 38559, 38560, 38561, 38562, 38563, 38564, 38565, 38566, 38568, 38569, 38570, 38571, 38572, 38573, 38574, 38575, 38577, 38578, 38580, 38581, 38583, 38584, 38586, 38587, 38591, 38594, 38595, 38600, 38602, 38603, 38608, 38609, 38611, 38612, 38614, 38615, 38616, 38617, 38618, 38619, 38620, 38621, 38622, 38623, 38625, 38626, 38627, 38628, 38629, 38630, 38631, 38635, 38636, 38637, 38638, 38640, 38641, 38642, 38644, 38645, 38648, 38650, 38651, 38652, 38653, 38655, 38658, 38659, 38661, 38666, 38667, 38668, 38672, 38673, 38674, 38676, 38677, 38679, 38680, 38681, 38682, 38683, 38685, 38687, 38688, 25663, 25816, 32772, 27626, 27635, 27645, 27637, 27641, 27653, 27655, 27654, 27661, 27669, 27672, 27673, 27674, 27681, 27689, 27684, 27690, 27698, 25909, 25941, 25963, 29261, 29266, 29270, 29232, 34402, 21014, 32927, 32924, 32915, 32956, 26378, 32957, 32945, 32939, 32941, 32948, 32951, 32999, 33000, 33001, 33002, 32987, 32962, 32964, 32985, 32973, 32983, 26384, 32989, 33003, 33009, 33012, 33005, 33037, 33038, 33010, 33020, 26389, 33042, 35930, 33078, 33054, 33068, 33048, 33074, 33096, 33100, 33107, 33140, 33113, 33114, 33137, 33120, 33129, 33148, 33149, 33133, 33127, 22605, 23221, 33160, 33154, 33169, 28373, 33187, 33194, 33228, 26406, 33226, 33211, 38689, 38690, 38691, 38692, 38693, 38694, 38695, 38696, 38697, 38699, 38700, 38702, 38703, 38705, 38707, 38708, 38709, 38710, 38711, 38714, 38715, 38716, 38717, 38719, 38720, 38721, 38722, 38723, 38724, 38725, 38726, 38727, 38728, 38729, 38730, 38731, 38732, 38733, 38734, 38735, 38736, 38737, 38740, 38741, 38743, 38744, 38746, 38748, 38749, 38751, 38755, 38756, 38758, 38759, 38760, 38762, 38763, 38764, 38765, 38766, 38767, 38768, 38769, 38770, 38773, 38775, 38776, 38777, 38778, 38779, 38781, 38782, 38783, 38784, 38785, 38786, 38787, 38788, 38790, 38791, 38792, 38793, 38794, 38796, 38798, 38799, 38800, 38803, 38805, 38806, 38807, 38809, 38810, 38811, 38812, 38813, 33217, 33190, 27428, 27447, 27449, 27459, 27462, 27481, 39121, 39122, 39123, 39125, 39129, 39130, 27571, 24384, 27586, 35315, 26000, 40785, 26003, 26044, 26054, 26052, 26051, 26060, 26062, 26066, 26070, 28800, 28828, 28822, 28829, 28859, 28864, 28855, 28843, 28849, 28904, 28874, 28944, 28947, 28950, 28975, 28977, 29043, 29020, 29032, 28997, 29042, 29002, 29048, 29050, 29080, 29107, 29109, 29096, 29088, 29152, 29140, 29159, 29177, 29213, 29224, 28780, 28952, 29030, 29113, 25150, 25149, 25155, 25160, 25161, 31035, 31040, 31046, 31049, 31067, 31068, 31059, 31066, 31074, 31063, 31072, 31087, 31079, 31098, 31109, 31114, 31130, 31143, 31155, 24529, 24528, 38814, 38815, 38817, 38818, 38820, 38821, 38822, 38823, 38824, 38825, 38826, 38828, 38830, 38832, 38833, 38835, 38837, 38838, 38839, 38840, 38841, 38842, 38843, 38844, 38845, 38846, 38847, 38848, 38849, 38850, 38851, 38852, 38853, 38854, 38855, 38856, 38857, 38858, 38859, 38860, 38861, 38862, 38863, 38864, 38865, 38866, 38867, 38868, 38869, 38870, 38871, 38872, 38873, 38874, 38875, 38876, 38877, 38878, 38879, 38880, 38881, 38882, 38883, 38884, 38885, 38888, 38894, 38895, 38896, 38897, 38898, 38900, 38903, 38904, 38905, 38906, 38907, 38908, 38909, 38910, 38911, 38912, 38913, 38914, 38915, 38916, 38917, 38918, 38919, 38920, 38921, 38922, 38923, 38924, 38925, 38926, 24636, 24669, 24666, 24679, 24641, 24665, 24675, 24747, 24838, 24845, 24925, 25001, 24989, 25035, 25041, 25094, 32896, 32895, 27795, 27894, 28156, 30710, 30712, 30720, 30729, 30743, 30744, 30737, 26027, 30765, 30748, 30749, 30777, 30778, 30779, 30751, 30780, 30757, 30764, 30755, 30761, 30798, 30829, 30806, 30807, 30758, 30800, 30791, 30796, 30826, 30875, 30867, 30874, 30855, 30876, 30881, 30883, 30898, 30905, 30885, 30932, 30937, 30921, 30956, 30962, 30981, 30964, 30995, 31012, 31006, 31028, 40859, 40697, 40699, 40700, 30449, 30468, 30477, 30457, 30471, 30472, 30490, 30498, 30489, 30509, 30502, 30517, 30520, 30544, 30545, 30535, 30531, 30554, 30568, 38927, 38928, 38929, 38930, 38931, 38932, 38933, 38934, 38935, 38936, 38937, 38938, 38939, 38940, 38941, 38942, 38943, 38944, 38945, 38946, 38947, 38948, 38949, 38950, 38951, 38952, 38953, 38954, 38955, 38956, 38957, 38958, 38959, 38960, 38961, 38962, 38963, 38964, 38965, 38966, 38967, 38968, 38969, 38970, 38971, 38972, 38973, 38974, 38975, 38976, 38977, 38978, 38979, 38980, 38981, 38982, 38983, 38984, 38985, 38986, 38987, 38988, 38989, 38990, 38991, 38992, 38993, 38994, 38995, 38996, 38997, 38998, 38999, 39000, 39001, 39002, 39003, 39004, 39005, 39006, 39007, 39008, 39009, 39010, 39011, 39012, 39013, 39014, 39015, 39016, 39017, 39018, 39019, 39020, 39021, 39022, 30562, 30565, 30591, 30605, 30589, 30592, 30604, 30609, 30623, 30624, 30640, 30645, 30653, 30010, 30016, 30030, 30027, 30024, 30043, 30066, 30073, 30083, 32600, 32609, 32607, 35400, 32616, 32628, 32625, 32633, 32641, 32638, 30413, 30437, 34866, 38021, 38022, 38023, 38027, 38026, 38028, 38029, 38031, 38032, 38036, 38039, 38037, 38042, 38043, 38044, 38051, 38052, 38059, 38058, 38061, 38060, 38063, 38064, 38066, 38068, 38070, 38071, 38072, 38073, 38074, 38076, 38077, 38079, 38084, 38088, 38089, 38090, 38091, 38092, 38093, 38094, 38096, 38097, 38098, 38101, 38102, 38103, 38105, 38104, 38107, 38110, 38111, 38112, 38114, 38116, 38117, 38119, 38120, 38122, 39023, 39024, 39025, 39026, 39027, 39028, 39051, 39054, 39058, 39061, 39065, 39075, 39080, 39081, 39082, 39083, 39084, 39085, 39086, 39087, 39088, 39089, 39090, 39091, 39092, 39093, 39094, 39095, 39096, 39097, 39098, 39099, 39100, 39101, 39102, 39103, 39104, 39105, 39106, 39107, 39108, 39109, 39110, 39111, 39112, 39113, 39114, 39115, 39116, 39117, 39119, 39120, 39124, 39126, 39127, 39131, 39132, 39133, 39136, 39137, 39138, 39139, 39140, 39141, 39142, 39145, 39146, 39147, 39148, 39149, 39150, 39151, 39152, 39153, 39154, 39155, 39156, 39157, 39158, 39159, 39160, 39161, 39162, 39163, 39164, 39165, 39166, 39167, 39168, 39169, 39170, 39171, 39172, 39173, 39174, 39175, 38121, 38123, 38126, 38127, 38131, 38132, 38133, 38135, 38137, 38140, 38141, 38143, 38147, 38146, 38150, 38151, 38153, 38154, 38157, 38158, 38159, 38162, 38163, 38164, 38165, 38166, 38168, 38171, 38173, 38174, 38175, 38178, 38186, 38187, 38185, 38188, 38193, 38194, 38196, 38198, 38199, 38200, 38204, 38206, 38207, 38210, 38197, 38212, 38213, 38214, 38217, 38220, 38222, 38223, 38226, 38227, 38228, 38230, 38231, 38232, 38233, 38235, 38238, 38239, 38237, 38241, 38242, 38244, 38245, 38246, 38247, 38248, 38249, 38250, 38251, 38252, 38255, 38257, 38258, 38259, 38202, 30695, 30700, 38601, 31189, 31213, 31203, 31211, 31238, 23879, 31235, 31234, 31262, 31252, 39176, 39177, 39178, 39179, 39180, 39182, 39183, 39185, 39186, 39187, 39188, 39189, 39190, 39191, 39192, 39193, 39194, 39195, 39196, 39197, 39198, 39199, 39200, 39201, 39202, 39203, 39204, 39205, 39206, 39207, 39208, 39209, 39210, 39211, 39212, 39213, 39215, 39216, 39217, 39218, 39219, 39220, 39221, 39222, 39223, 39224, 39225, 39226, 39227, 39228, 39229, 39230, 39231, 39232, 39233, 39234, 39235, 39236, 39237, 39238, 39239, 39240, 39241, 39242, 39243, 39244, 39245, 39246, 39247, 39248, 39249, 39250, 39251, 39254, 39255, 39256, 39257, 39258, 39259, 39260, 39261, 39262, 39263, 39264, 39265, 39266, 39268, 39270, 39283, 39288, 39289, 39291, 39294, 39298, 39299, 39305, 31289, 31287, 31313, 40655, 39333, 31344, 30344, 30350, 30355, 30361, 30372, 29918, 29920, 29996, 40480, 40482, 40488, 40489, 40490, 40491, 40492, 40498, 40497, 40502, 40504, 40503, 40505, 40506, 40510, 40513, 40514, 40516, 40518, 40519, 40520, 40521, 40523, 40524, 40526, 40529, 40533, 40535, 40538, 40539, 40540, 40542, 40547, 40550, 40551, 40552, 40553, 40554, 40555, 40556, 40561, 40557, 40563, 30098, 30100, 30102, 30112, 30109, 30124, 30115, 30131, 30132, 30136, 30148, 30129, 30128, 30147, 30146, 30166, 30157, 30179, 30184, 30182, 30180, 30187, 30183, 30211, 30193, 30204, 30207, 30224, 30208, 30213, 30220, 30231, 30218, 30245, 30232, 30229, 30233, 39308, 39310, 39322, 39323, 39324, 39325, 39326, 39327, 39328, 39329, 39330, 39331, 39332, 39334, 39335, 39337, 39338, 39339, 39340, 39341, 39342, 39343, 39344, 39345, 39346, 39347, 39348, 39349, 39350, 39351, 39352, 39353, 39354, 39355, 39356, 39357, 39358, 39359, 39360, 39361, 39362, 39363, 39364, 39365, 39366, 39367, 39368, 39369, 39370, 39371, 39372, 39373, 39374, 39375, 39376, 39377, 39378, 39379, 39380, 39381, 39382, 39383, 39384, 39385, 39386, 39387, 39388, 39389, 39390, 39391, 39392, 39393, 39394, 39395, 39396, 39397, 39398, 39399, 39400, 39401, 39402, 39403, 39404, 39405, 39406, 39407, 39408, 39409, 39410, 39411, 39412, 39413, 39414, 39415, 39416, 39417, 30235, 30268, 30242, 30240, 30272, 30253, 30256, 30271, 30261, 30275, 30270, 30259, 30285, 30302, 30292, 30300, 30294, 30315, 30319, 32714, 31462, 31352, 31353, 31360, 31366, 31368, 31381, 31398, 31392, 31404, 31400, 31405, 31411, 34916, 34921, 34930, 34941, 34943, 34946, 34978, 35014, 34999, 35004, 35017, 35042, 35022, 35043, 35045, 35057, 35098, 35068, 35048, 35070, 35056, 35105, 35097, 35091, 35099, 35082, 35124, 35115, 35126, 35137, 35174, 35195, 30091, 32997, 30386, 30388, 30684, 32786, 32788, 32790, 32796, 32800, 32802, 32805, 32806, 32807, 32809, 32808, 32817, 32779, 32821, 32835, 32838, 32845, 32850, 32873, 32881, 35203, 39032, 39040, 39043, 39418, 39419, 39420, 39421, 39422, 39423, 39424, 39425, 39426, 39427, 39428, 39429, 39430, 39431, 39432, 39433, 39434, 39435, 39436, 39437, 39438, 39439, 39440, 39441, 39442, 39443, 39444, 39445, 39446, 39447, 39448, 39449, 39450, 39451, 39452, 39453, 39454, 39455, 39456, 39457, 39458, 39459, 39460, 39461, 39462, 39463, 39464, 39465, 39466, 39467, 39468, 39469, 39470, 39471, 39472, 39473, 39474, 39475, 39476, 39477, 39478, 39479, 39480, 39481, 39482, 39483, 39484, 39485, 39486, 39487, 39488, 39489, 39490, 39491, 39492, 39493, 39494, 39495, 39496, 39497, 39498, 39499, 39500, 39501, 39502, 39503, 39504, 39505, 39506, 39507, 39508, 39509, 39510, 39511, 39512, 39513, 39049, 39052, 39053, 39055, 39060, 39066, 39067, 39070, 39071, 39073, 39074, 39077, 39078, 34381, 34388, 34412, 34414, 34431, 34426, 34428, 34427, 34472, 34445, 34443, 34476, 34461, 34471, 34467, 34474, 34451, 34473, 34486, 34500, 34485, 34510, 34480, 34490, 34481, 34479, 34505, 34511, 34484, 34537, 34545, 34546, 34541, 34547, 34512, 34579, 34526, 34548, 34527, 34520, 34513, 34563, 34567, 34552, 34568, 34570, 34573, 34569, 34595, 34619, 34590, 34597, 34606, 34586, 34622, 34632, 34612, 34609, 34601, 34615, 34623, 34690, 34594, 34685, 34686, 34683, 34656, 34672, 34636, 34670, 34699, 34643, 34659, 34684, 34660, 34649, 34661, 34707, 34735, 34728, 34770, 39514, 39515, 39516, 39517, 39518, 39519, 39520, 39521, 39522, 39523, 39524, 39525, 39526, 39527, 39528, 39529, 39530, 39531, 39538, 39555, 39561, 39565, 39566, 39572, 39573, 39577, 39590, 39593, 39594, 39595, 39596, 39597, 39598, 39599, 39602, 39603, 39604, 39605, 39609, 39611, 39613, 39614, 39615, 39619, 39620, 39622, 39623, 39624, 39625, 39626, 39629, 39630, 39631, 39632, 39634, 39636, 39637, 39638, 39639, 39641, 39642, 39643, 39644, 39645, 39646, 39648, 39650, 39651, 39652, 39653, 39655, 39656, 39657, 39658, 39660, 39662, 39664, 39665, 39666, 39667, 39668, 39669, 39670, 39671, 39672, 39674, 39676, 39677, 39678, 39679, 39680, 39681, 39682, 39684, 39685, 39686, 34758, 34696, 34693, 34733, 34711, 34691, 34731, 34789, 34732, 34741, 34739, 34763, 34771, 34749, 34769, 34752, 34762, 34779, 34794, 34784, 34798, 34838, 34835, 34814, 34826, 34843, 34849, 34873, 34876, 32566, 32578, 32580, 32581, 33296, 31482, 31485, 31496, 31491, 31492, 31509, 31498, 31531, 31503, 31559, 31544, 31530, 31513, 31534, 31537, 31520, 31525, 31524, 31539, 31550, 31518, 31576, 31578, 31557, 31605, 31564, 31581, 31584, 31598, 31611, 31586, 31602, 31601, 31632, 31654, 31655, 31672, 31660, 31645, 31656, 31621, 31658, 31644, 31650, 31659, 31668, 31697, 31681, 31692, 31709, 31706, 31717, 31718, 31722, 31756, 31742, 31740, 31759, 31766, 31755, 39687, 39689, 39690, 39691, 39692, 39693, 39694, 39696, 39697, 39698, 39700, 39701, 39702, 39703, 39704, 39705, 39706, 39707, 39708, 39709, 39710, 39712, 39713, 39714, 39716, 39717, 39718, 39719, 39720, 39721, 39722, 39723, 39724, 39725, 39726, 39728, 39729, 39731, 39732, 39733, 39734, 39735, 39736, 39737, 39738, 39741, 39742, 39743, 39744, 39750, 39754, 39755, 39756, 39758, 39760, 39762, 39763, 39765, 39766, 39767, 39768, 39769, 39770, 39771, 39772, 39773, 39774, 39775, 39776, 39777, 39778, 39779, 39780, 39781, 39782, 39783, 39784, 39785, 39786, 39787, 39788, 39789, 39790, 39791, 39792, 39793, 39794, 39795, 39796, 39797, 39798, 39799, 39800, 39801, 39802, 39803, 31775, 31786, 31782, 31800, 31809, 31808, 33278, 33281, 33282, 33284, 33260, 34884, 33313, 33314, 33315, 33325, 33327, 33320, 33323, 33336, 33339, 33331, 33332, 33342, 33348, 33353, 33355, 33359, 33370, 33375, 33384, 34942, 34949, 34952, 35032, 35039, 35166, 32669, 32671, 32679, 32687, 32688, 32690, 31868, 25929, 31889, 31901, 31900, 31902, 31906, 31922, 31932, 31933, 31937, 31943, 31948, 31949, 31944, 31941, 31959, 31976, 33390, 26280, 32703, 32718, 32725, 32741, 32737, 32742, 32745, 32750, 32755, 31992, 32119, 32166, 32174, 32327, 32411, 40632, 40628, 36211, 36228, 36244, 36241, 36273, 36199, 36205, 35911, 35913, 37194, 37200, 37198, 37199, 37220, 39804, 39805, 39806, 39807, 39808, 39809, 39810, 39811, 39812, 39813, 39814, 39815, 39816, 39817, 39818, 39819, 39820, 39821, 39822, 39823, 39824, 39825, 39826, 39827, 39828, 39829, 39830, 39831, 39832, 39833, 39834, 39835, 39836, 39837, 39838, 39839, 39840, 39841, 39842, 39843, 39844, 39845, 39846, 39847, 39848, 39849, 39850, 39851, 39852, 39853, 39854, 39855, 39856, 39857, 39858, 39859, 39860, 39861, 39862, 39863, 39864, 39865, 39866, 39867, 39868, 39869, 39870, 39871, 39872, 39873, 39874, 39875, 39876, 39877, 39878, 39879, 39880, 39881, 39882, 39883, 39884, 39885, 39886, 39887, 39888, 39889, 39890, 39891, 39892, 39893, 39894, 39895, 39896, 39897, 39898, 39899, 37218, 37217, 37232, 37225, 37231, 37245, 37246, 37234, 37236, 37241, 37260, 37253, 37264, 37261, 37265, 37282, 37283, 37290, 37293, 37294, 37295, 37301, 37300, 37306, 35925, 40574, 36280, 36331, 36357, 36441, 36457, 36277, 36287, 36284, 36282, 36292, 36310, 36311, 36314, 36318, 36302, 36303, 36315, 36294, 36332, 36343, 36344, 36323, 36345, 36347, 36324, 36361, 36349, 36372, 36381, 36383, 36396, 36398, 36387, 36399, 36410, 36416, 36409, 36405, 36413, 36401, 36425, 36417, 36418, 36433, 36434, 36426, 36464, 36470, 36476, 36463, 36468, 36485, 36495, 36500, 36496, 36508, 36510, 35960, 35970, 35978, 35973, 35992, 35988, 26011, 35286, 35294, 35290, 35292, 39900, 39901, 39902, 39903, 39904, 39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914, 39915, 39916, 39917, 39918, 39919, 39920, 39921, 39922, 39923, 39924, 39925, 39926, 39927, 39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937, 39938, 39939, 39940, 39941, 39942, 39943, 39944, 39945, 39946, 39947, 39948, 39949, 39950, 39951, 39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961, 39962, 39963, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972, 39973, 39974, 39975, 39976, 39977, 39978, 39979, 39980, 39981, 39982, 39983, 39984, 39985, 39986, 39987, 39988, 39989, 39990, 39991, 39992, 39993, 39994, 39995, 35301, 35307, 35311, 35390, 35622, 38739, 38633, 38643, 38639, 38662, 38657, 38664, 38671, 38670, 38698, 38701, 38704, 38718, 40832, 40835, 40837, 40838, 40839, 40840, 40841, 40842, 40844, 40702, 40715, 40717, 38585, 38588, 38589, 38606, 38610, 30655, 38624, 37518, 37550, 37576, 37694, 37738, 37834, 37775, 37950, 37995, 40063, 40066, 40069, 40070, 40071, 40072, 31267, 40075, 40078, 40080, 40081, 40082, 40084, 40085, 40090, 40091, 40094, 40095, 40096, 40097, 40098, 40099, 40101, 40102, 40103, 40104, 40105, 40107, 40109, 40110, 40112, 40113, 40114, 40115, 40116, 40117, 40118, 40119, 40122, 40123, 40124, 40125, 40132, 40133, 40134, 40135, 40138, 40139, 39996, 39997, 39998, 39999, 40000, 40001, 40002, 40003, 40004, 40005, 40006, 40007, 40008, 40009, 40010, 40011, 40012, 40013, 40014, 40015, 40016, 40017, 40018, 40019, 40020, 40021, 40022, 40023, 40024, 40025, 40026, 40027, 40028, 40029, 40030, 40031, 40032, 40033, 40034, 40035, 40036, 40037, 40038, 40039, 40040, 40041, 40042, 40043, 40044, 40045, 40046, 40047, 40048, 40049, 40050, 40051, 40052, 40053, 40054, 40055, 40056, 40057, 40058, 40059, 40061, 40062, 40064, 40067, 40068, 40073, 40074, 40076, 40079, 40083, 40086, 40087, 40088, 40089, 40093, 40106, 40108, 40111, 40121, 40126, 40127, 40128, 40129, 40130, 40136, 40137, 40145, 40146, 40154, 40155, 40160, 40161, 40140, 40141, 40142, 40143, 40144, 40147, 40148, 40149, 40151, 40152, 40153, 40156, 40157, 40159, 40162, 38780, 38789, 38801, 38802, 38804, 38831, 38827, 38819, 38834, 38836, 39601, 39600, 39607, 40536, 39606, 39610, 39612, 39617, 39616, 39621, 39618, 39627, 39628, 39633, 39749, 39747, 39751, 39753, 39752, 39757, 39761, 39144, 39181, 39214, 39253, 39252, 39647, 39649, 39654, 39663, 39659, 39675, 39661, 39673, 39688, 39695, 39699, 39711, 39715, 40637, 40638, 32315, 40578, 40583, 40584, 40587, 40594, 37846, 40605, 40607, 40667, 40668, 40669, 40672, 40671, 40674, 40681, 40679, 40677, 40682, 40687, 40738, 40748, 40751, 40761, 40759, 40765, 40766, 40772, 40163, 40164, 40165, 40166, 40167, 40168, 40169, 40170, 40171, 40172, 40173, 40174, 40175, 40176, 40177, 40178, 40179, 40180, 40181, 40182, 40183, 40184, 40185, 40186, 40187, 40188, 40189, 40190, 40191, 40192, 40193, 40194, 40195, 40196, 40197, 40198, 40199, 40200, 40201, 40202, 40203, 40204, 40205, 40206, 40207, 40208, 40209, 40210, 40211, 40212, 40213, 40214, 40215, 40216, 40217, 40218, 40219, 40220, 40221, 40222, 40223, 40224, 40225, 40226, 40227, 40228, 40229, 40230, 40231, 40232, 40233, 40234, 40235, 40236, 40237, 40238, 40239, 40240, 40241, 40242, 40243, 40244, 40245, 40246, 40247, 40248, 40249, 40250, 40251, 40252, 40253, 40254, 40255, 40256, 40257, 40258, 57908, 57909, 57910, 57911, 57912, 57913, 57914, 57915, 57916, 57917, 57918, 57919, 57920, 57921, 57922, 57923, 57924, 57925, 57926, 57927, 57928, 57929, 57930, 57931, 57932, 57933, 57934, 57935, 57936, 57937, 57938, 57939, 57940, 57941, 57942, 57943, 57944, 57945, 57946, 57947, 57948, 57949, 57950, 57951, 57952, 57953, 57954, 57955, 57956, 57957, 57958, 57959, 57960, 57961, 57962, 57963, 57964, 57965, 57966, 57967, 57968, 57969, 57970, 57971, 57972, 57973, 57974, 57975, 57976, 57977, 57978, 57979, 57980, 57981, 57982, 57983, 57984, 57985, 57986, 57987, 57988, 57989, 57990, 57991, 57992, 57993, 57994, 57995, 57996, 57997, 57998, 57999, 58000, 58001, 40259, 40260, 40261, 40262, 40263, 40264, 40265, 40266, 40267, 40268, 40269, 40270, 40271, 40272, 40273, 40274, 40275, 40276, 40277, 40278, 40279, 40280, 40281, 40282, 40283, 40284, 40285, 40286, 40287, 40288, 40289, 40290, 40291, 40292, 40293, 40294, 40295, 40296, 40297, 40298, 40299, 40300, 40301, 40302, 40303, 40304, 40305, 40306, 40307, 40308, 40309, 40310, 40311, 40312, 40313, 40314, 40315, 40316, 40317, 40318, 40319, 40320, 40321, 40322, 40323, 40324, 40325, 40326, 40327, 40328, 40329, 40330, 40331, 40332, 40333, 40334, 40335, 40336, 40337, 40338, 40339, 40340, 40341, 40342, 40343, 40344, 40345, 40346, 40347, 40348, 40349, 40350, 40351, 40352, 40353, 40354, 58002, 58003, 58004, 58005, 58006, 58007, 58008, 58009, 58010, 58011, 58012, 58013, 58014, 58015, 58016, 58017, 58018, 58019, 58020, 58021, 58022, 58023, 58024, 58025, 58026, 58027, 58028, 58029, 58030, 58031, 58032, 58033, 58034, 58035, 58036, 58037, 58038, 58039, 58040, 58041, 58042, 58043, 58044, 58045, 58046, 58047, 58048, 58049, 58050, 58051, 58052, 58053, 58054, 58055, 58056, 58057, 58058, 58059, 58060, 58061, 58062, 58063, 58064, 58065, 58066, 58067, 58068, 58069, 58070, 58071, 58072, 58073, 58074, 58075, 58076, 58077, 58078, 58079, 58080, 58081, 58082, 58083, 58084, 58085, 58086, 58087, 58088, 58089, 58090, 58091, 58092, 58093, 58094, 58095, 40355, 40356, 40357, 40358, 40359, 40360, 40361, 40362, 40363, 40364, 40365, 40366, 40367, 40368, 40369, 40370, 40371, 40372, 40373, 40374, 40375, 40376, 40377, 40378, 40379, 40380, 40381, 40382, 40383, 40384, 40385, 40386, 40387, 40388, 40389, 40390, 40391, 40392, 40393, 40394, 40395, 40396, 40397, 40398, 40399, 40400, 40401, 40402, 40403, 40404, 40405, 40406, 40407, 40408, 40409, 40410, 40411, 40412, 40413, 40414, 40415, 40416, 40417, 40418, 40419, 40420, 40421, 40422, 40423, 40424, 40425, 40426, 40427, 40428, 40429, 40430, 40431, 40432, 40433, 40434, 40435, 40436, 40437, 40438, 40439, 40440, 40441, 40442, 40443, 40444, 40445, 40446, 40447, 40448, 40449, 40450, 58096, 58097, 58098, 58099, 58100, 58101, 58102, 58103, 58104, 58105, 58106, 58107, 58108, 58109, 58110, 58111, 58112, 58113, 58114, 58115, 58116, 58117, 58118, 58119, 58120, 58121, 58122, 58123, 58124, 58125, 58126, 58127, 58128, 58129, 58130, 58131, 58132, 58133, 58134, 58135, 58136, 58137, 58138, 58139, 58140, 58141, 58142, 58143, 58144, 58145, 58146, 58147, 58148, 58149, 58150, 58151, 58152, 58153, 58154, 58155, 58156, 58157, 58158, 58159, 58160, 58161, 58162, 58163, 58164, 58165, 58166, 58167, 58168, 58169, 58170, 58171, 58172, 58173, 58174, 58175, 58176, 58177, 58178, 58179, 58180, 58181, 58182, 58183, 58184, 58185, 58186, 58187, 58188, 58189, 40451, 40452, 40453, 40454, 40455, 40456, 40457, 40458, 40459, 40460, 40461, 40462, 40463, 40464, 40465, 40466, 40467, 40468, 40469, 40470, 40471, 40472, 40473, 40474, 40475, 40476, 40477, 40478, 40484, 40487, 40494, 40496, 40500, 40507, 40508, 40512, 40525, 40528, 40530, 40531, 40532, 40534, 40537, 40541, 40543, 40544, 40545, 40546, 40549, 40558, 40559, 40562, 40564, 40565, 40566, 40567, 40568, 40569, 40570, 40571, 40572, 40573, 40576, 40577, 40579, 40580, 40581, 40582, 40585, 40586, 40588, 40589, 40590, 40591, 40592, 40593, 40596, 40597, 40598, 40599, 40600, 40601, 40602, 40603, 40604, 40606, 40608, 40609, 40610, 40611, 40612, 40613, 40615, 40616, 40617, 40618, 58190, 58191, 58192, 58193, 58194, 58195, 58196, 58197, 58198, 58199, 58200, 58201, 58202, 58203, 58204, 58205, 58206, 58207, 58208, 58209, 58210, 58211, 58212, 58213, 58214, 58215, 58216, 58217, 58218, 58219, 58220, 58221, 58222, 58223, 58224, 58225, 58226, 58227, 58228, 58229, 58230, 58231, 58232, 58233, 58234, 58235, 58236, 58237, 58238, 58239, 58240, 58241, 58242, 58243, 58244, 58245, 58246, 58247, 58248, 58249, 58250, 58251, 58252, 58253, 58254, 58255, 58256, 58257, 58258, 58259, 58260, 58261, 58262, 58263, 58264, 58265, 58266, 58267, 58268, 58269, 58270, 58271, 58272, 58273, 58274, 58275, 58276, 58277, 58278, 58279, 58280, 58281, 58282, 58283, 40619, 40620, 40621, 40622, 40623, 40624, 40625, 40626, 40627, 40629, 40630, 40631, 40633, 40634, 40636, 40639, 40640, 40641, 40642, 40643, 40645, 40646, 40647, 40648, 40650, 40651, 40652, 40656, 40658, 40659, 40661, 40662, 40663, 40665, 40666, 40670, 40673, 40675, 40676, 40678, 40680, 40683, 40684, 40685, 40686, 40688, 40689, 40690, 40691, 40692, 40693, 40694, 40695, 40696, 40698, 40701, 40703, 40704, 40705, 40706, 40707, 40708, 40709, 40710, 40711, 40712, 40713, 40714, 40716, 40719, 40721, 40722, 40724, 40725, 40726, 40728, 40730, 40731, 40732, 40733, 40734, 40735, 40737, 40739, 40740, 40741, 40742, 40743, 40744, 40745, 40746, 40747, 40749, 40750, 40752, 40753, 58284, 58285, 58286, 58287, 58288, 58289, 58290, 58291, 58292, 58293, 58294, 58295, 58296, 58297, 58298, 58299, 58300, 58301, 58302, 58303, 58304, 58305, 58306, 58307, 58308, 58309, 58310, 58311, 58312, 58313, 58314, 58315, 58316, 58317, 58318, 58319, 58320, 58321, 58322, 58323, 58324, 58325, 58326, 58327, 58328, 58329, 58330, 58331, 58332, 58333, 58334, 58335, 58336, 58337, 58338, 58339, 58340, 58341, 58342, 58343, 58344, 58345, 58346, 58347, 58348, 58349, 58350, 58351, 58352, 58353, 58354, 58355, 58356, 58357, 58358, 58359, 58360, 58361, 58362, 58363, 58364, 58365, 58366, 58367, 58368, 58369, 58370, 58371, 58372, 58373, 58374, 58375, 58376, 58377, 40754, 40755, 40756, 40757, 40758, 40760, 40762, 40764, 40767, 40768, 40769, 40770, 40771, 40773, 40774, 40775, 40776, 40777, 40778, 40779, 40780, 40781, 40782, 40783, 40786, 40787, 40788, 40789, 40790, 40791, 40792, 40793, 40794, 40795, 40796, 40797, 40798, 40799, 40800, 40801, 40802, 40803, 40804, 40805, 40806, 40807, 40808, 40809, 40810, 40811, 40812, 40813, 40814, 40815, 40816, 40817, 40818, 40819, 40820, 40821, 40822, 40823, 40824, 40825, 40826, 40827, 40828, 40829, 40830, 40833, 40834, 40845, 40846, 40847, 40848, 40849, 40850, 40851, 40852, 40853, 40854, 40855, 40856, 40860, 40861, 40862, 40865, 40866, 40867, 40868, 40869, 63788, 63865, 63893, 63975, 63985, 58378, 58379, 58380, 58381, 58382, 58383, 58384, 58385, 58386, 58387, 58388, 58389, 58390, 58391, 58392, 58393, 58394, 58395, 58396, 58397, 58398, 58399, 58400, 58401, 58402, 58403, 58404, 58405, 58406, 58407, 58408, 58409, 58410, 58411, 58412, 58413, 58414, 58415, 58416, 58417, 58418, 58419, 58420, 58421, 58422, 58423, 58424, 58425, 58426, 58427, 58428, 58429, 58430, 58431, 58432, 58433, 58434, 58435, 58436, 58437, 58438, 58439, 58440, 58441, 58442, 58443, 58444, 58445, 58446, 58447, 58448, 58449, 58450, 58451, 58452, 58453, 58454, 58455, 58456, 58457, 58458, 58459, 58460, 58461, 58462, 58463, 58464, 58465, 58466, 58467, 58468, 58469, 58470, 58471, 64012, 64013, 64014, 64015, 64017, 64019, 64020, 64024, 64031, 64032, 64033, 64035, 64036, 64039, 64040, 64041, 11905, 59414, 59415, 59416, 11908, 13427, 13383, 11912, 11915, 59422, 13726, 13850, 13838, 11916, 11927, 14702, 14616, 59430, 14799, 14815, 14963, 14800, 59435, 59436, 15182, 15470, 15584, 11943, 59441, 59442, 11946, 16470, 16735, 11950, 17207, 11955, 11958, 11959, 59451, 17329, 17324, 11963, 17373, 17622, 18017, 17996, 59459, 18211, 18217, 18300, 18317, 11978, 18759, 18810, 18813, 18818, 18819, 18821, 18822, 18847, 18843, 18871, 18870, 59476, 59477, 19619, 19615, 19616, 19617, 19575, 19618, 19731, 19732, 19733, 19734, 19735, 19736, 19737, 19886, 59492, 58472, 58473, 58474, 58475, 58476, 58477, 58478, 58479, 58480, 58481, 58482, 58483, 58484, 58485, 58486, 58487, 58488, 58489, 58490, 58491, 58492, 58493, 58494, 58495, 58496, 58497, 58498, 58499, 58500, 58501, 58502, 58503, 58504, 58505, 58506, 58507, 58508, 58509, 58510, 58511, 58512, 58513, 58514, 58515, 58516, 58517, 58518, 58519, 58520, 58521, 58522, 58523, 58524, 58525, 58526, 58527, 58528, 58529, 58530, 58531, 58532, 58533, 58534, 58535, 58536, 58537, 58538, 58539, 58540, 58541, 58542, 58543, 58544, 58545, 58546, 58547, 58548, 58549, 58550, 58551, 58552, 58553, 58554, 58555, 58556, 58557, 58558, 58559, 58560, 58561, 58562, 58563, 58564, 58565],
		"gb18030-ranges": [
			[0, 128],
			[36, 165],
			[38, 169],
			[45, 178],
			[50, 184],
			[81, 216],
			[89, 226],
			[95, 235],
			[96, 238],
			[100, 244],
			[103, 248],
			[104, 251],
			[105, 253],
			[109, 258],
			[126, 276],
			[133, 284],
			[148, 300],
			[172, 325],
			[175, 329],
			[179, 334],
			[208, 364],
			[306, 463],
			[307, 465],
			[308, 467],
			[309, 469],
			[310, 471],
			[311, 473],
			[312, 475],
			[313, 477],
			[341, 506],
			[428, 594],
			[443, 610],
			[544, 712],
			[545, 716],
			[558, 730],
			[741, 930],
			[742, 938],
			[749, 962],
			[750, 970],
			[805, 1026],
			[819, 1104],
			[820, 1106],
			[7922, 8209],
			[7924, 8215],
			[7925, 8218],
			[7927, 8222],
			[7934, 8231],
			[7943, 8241],
			[7944, 8244],
			[7945, 8246],
			[7950, 8252],
			[8062, 8365],
			[8148, 8452],
			[8149, 8454],
			[8152, 8458],
			[8164, 8471],
			[8174, 8482],
			[8236, 8556],
			[8240, 8570],
			[8262, 8596],
			[8264, 8602],
			[8374, 8713],
			[8380, 8720],
			[8381, 8722],
			[8384, 8726],
			[8388, 8731],
			[8390, 8737],
			[8392, 8740],
			[8393, 8742],
			[8394, 8748],
			[8396, 8751],
			[8401, 8760],
			[8406, 8766],
			[8416, 8777],
			[8419, 8781],
			[8424, 8787],
			[8437, 8802],
			[8439, 8808],
			[8445, 8816],
			[8482, 8854],
			[8485, 8858],
			[8496, 8870],
			[8521, 8896],
			[8603, 8979],
			[8936, 9322],
			[8946, 9372],
			[9046, 9548],
			[9050, 9588],
			[9063, 9616],
			[9066, 9622],
			[9076, 9634],
			[9092, 9652],
			[9100, 9662],
			[9108, 9672],
			[9111, 9676],
			[9113, 9680],
			[9131, 9702],
			[9162, 9735],
			[9164, 9738],
			[9218, 9793],
			[9219, 9795],
			[11329, 11906],
			[11331, 11909],
			[11334, 11913],
			[11336, 11917],
			[11346, 11928],
			[11361, 11944],
			[11363, 11947],
			[11366, 11951],
			[11370, 11956],
			[11372, 11960],
			[11375, 11964],
			[11389, 11979],
			[11682, 12284],
			[11686, 12292],
			[11687, 12312],
			[11692, 12319],
			[11694, 12330],
			[11714, 12351],
			[11716, 12436],
			[11723, 12447],
			[11725, 12535],
			[11730, 12543],
			[11736, 12586],
			[11982, 12842],
			[11989, 12850],
			[12102, 12964],
			[12336, 13200],
			[12348, 13215],
			[12350, 13218],
			[12384, 13253],
			[12393, 13263],
			[12395, 13267],
			[12397, 13270],
			[12510, 13384],
			[12553, 13428],
			[12851, 13727],
			[12962, 13839],
			[12973, 13851],
			[13738, 14617],
			[13823, 14703],
			[13919, 14801],
			[13933, 14816],
			[14080, 14964],
			[14298, 15183],
			[14585, 15471],
			[14698, 15585],
			[15583, 16471],
			[15847, 16736],
			[16318, 17208],
			[16434, 17325],
			[16438, 17330],
			[16481, 17374],
			[16729, 17623],
			[17102, 17997],
			[17122, 18018],
			[17315, 18212],
			[17320, 18218],
			[17402, 18301],
			[17418, 18318],
			[17859, 18760],
			[17909, 18811],
			[17911, 18814],
			[17915, 18820],
			[17916, 18823],
			[17936, 18844],
			[17939, 18848],
			[17961, 18872],
			[18664, 19576],
			[18703, 19620],
			[18814, 19738],
			[18962, 19887],
			[19043, 40870],
			[33469, 59244],
			[33470, 59336],
			[33471, 59367],
			[33484, 59413],
			[33485, 59417],
			[33490, 59423],
			[33497, 59431],
			[33501, 59437],
			[33505, 59443],
			[33513, 59452],
			[33520, 59460],
			[33536, 59478],
			[33550, 59493],
			[37845, 63789],
			[37921, 63866],
			[37948, 63894],
			[38029, 63976],
			[38038, 63986],
			[38064, 64016],
			[38065, 64018],
			[38066, 64021],
			[38069, 64025],
			[38075, 64034],
			[38076, 64037],
			[38078, 64042],
			[39108, 65074],
			[39109, 65093],
			[39113, 65107],
			[39114, 65112],
			[39115, 65127],
			[39116, 65132],
			[39265, 65375],
			[39394, 65510],
			[189000, 65536]
		],
		"jis0208": [12288, 12289, 12290, 65292, 65294, 12539, 65306, 65307, 65311, 65281, 12443, 12444, 180, 65344, 168, 65342, 65507, 65343, 12541, 12542, 12445, 12446, 12291, 20189, 12293, 12294, 12295, 12540, 8213, 8208, 65295, 65340, 65374, 8741, 65372, 8230, 8229, 8216, 8217, 8220, 8221, 65288, 65289, 12308, 12309, 65339, 65341, 65371, 65373, 12296, 12297, 12298, 12299, 12300, 12301, 12302, 12303, 12304, 12305, 65291, 65293, 177, 215, 247, 65309, 8800, 65308, 65310, 8806, 8807, 8734, 8756, 9794, 9792, 176, 8242, 8243, 8451, 65509, 65284, 65504, 65505, 65285, 65283, 65286, 65290, 65312, 167, 9734, 9733, 9675, 9679, 9678, 9671, 9670, 9633, 9632, 9651, 9650, 9661, 9660, 8251, 12306, 8594, 8592, 8593, 8595, 12307, null, null, null, null, null, null, null, null, null, null, null, 8712, 8715, 8838, 8839, 8834, 8835, 8746, 8745, null, null, null, null, null, null, null, null, 8743, 8744, 65506, 8658, 8660, 8704, 8707, null, null, null, null, null, null, null, null, null, null, null, 8736, 8869, 8978, 8706, 8711, 8801, 8786, 8810, 8811, 8730, 8765, 8733, 8757, 8747, 8748, null, null, null, null, null, null, null, 8491, 8240, 9839, 9837, 9834, 8224, 8225, 182, null, null, null, null, 9711, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 65296, 65297, 65298, 65299, 65300, 65301, 65302, 65303, 65304, 65305, null, null, null, null, null, null, null, 65313, 65314, 65315, 65316, 65317, 65318, 65319, 65320, 65321, 65322, 65323, 65324, 65325, 65326, 65327, 65328, 65329, 65330, 65331, 65332, 65333, 65334, 65335, 65336, 65337, 65338, null, null, null, null, null, null, 65345, 65346, 65347, 65348, 65349, 65350, 65351, 65352, 65353, 65354, 65355, 65356, 65357, 65358, 65359, 65360, 65361, 65362, 65363, 65364, 65365, 65366, 65367, 65368, 65369, 65370, null, null, null, null, 12353, 12354, 12355, 12356, 12357, 12358, 12359, 12360, 12361, 12362, 12363, 12364, 12365, 12366, 12367, 12368, 12369, 12370, 12371, 12372, 12373, 12374, 12375, 12376, 12377, 12378, 12379, 12380, 12381, 12382, 12383, 12384, 12385, 12386, 12387, 12388, 12389, 12390, 12391, 12392, 12393, 12394, 12395, 12396, 12397, 12398, 12399, 12400, 12401, 12402, 12403, 12404, 12405, 12406, 12407, 12408, 12409, 12410, 12411, 12412, 12413, 12414, 12415, 12416, 12417, 12418, 12419, 12420, 12421, 12422, 12423, 12424, 12425, 12426, 12427, 12428, 12429, 12430, 12431, 12432, 12433, 12434, 12435, null, null, null, null, null, null, null, null, null, null, null, 12449, 12450, 12451, 12452, 12453, 12454, 12455, 12456, 12457, 12458, 12459, 12460, 12461, 12462, 12463, 12464, 12465, 12466, 12467, 12468, 12469, 12470, 12471, 12472, 12473, 12474, 12475, 12476, 12477, 12478, 12479, 12480, 12481, 12482, 12483, 12484, 12485, 12486, 12487, 12488, 12489, 12490, 12491, 12492, 12493, 12494, 12495, 12496, 12497, 12498, 12499, 12500, 12501, 12502, 12503, 12504, 12505, 12506, 12507, 12508, 12509, 12510, 12511, 12512, 12513, 12514, 12515, 12516, 12517, 12518, 12519, 12520, 12521, 12522, 12523, 12524, 12525, 12526, 12527, 12528, 12529, 12530, 12531, 12532, 12533, 12534, null, null, null, null, null, null, null, null, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, null, null, null, null, null, null, null, null, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 963, 964, 965, 966, 967, 968, 969, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1040, 1041, 1042, 1043, 1044, 1045, 1025, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1072, 1073, 1074, 1075, 1076, 1077, 1105, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103, null, null, null, null, null, null, null, null, null, null, null, null, null, 9472, 9474, 9484, 9488, 9496, 9492, 9500, 9516, 9508, 9524, 9532, 9473, 9475, 9487, 9491, 9499, 9495, 9507, 9523, 9515, 9531, 9547, 9504, 9519, 9512, 9527, 9535, 9501, 9520, 9509, 9528, 9538, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 9312, 9313, 9314, 9315, 9316, 9317, 9318, 9319, 9320, 9321, 9322, 9323, 9324, 9325, 9326, 9327, 9328, 9329, 9330, 9331, 8544, 8545, 8546, 8547, 8548, 8549, 8550, 8551, 8552, 8553, null, 13129, 13076, 13090, 13133, 13080, 13095, 13059, 13110, 13137, 13143, 13069, 13094, 13091, 13099, 13130, 13115, 13212, 13213, 13214, 13198, 13199, 13252, 13217, null, null, null, null, null, null, null, null, 13179, 12317, 12319, 8470, 13261, 8481, 12964, 12965, 12966, 12967, 12968, 12849, 12850, 12857, 13182, 13181, 13180, 8786, 8801, 8747, 8750, 8721, 8730, 8869, 8736, 8735, 8895, 8757, 8745, 8746, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 20124, 21782, 23043, 38463, 21696, 24859, 25384, 23030, 36898, 33909, 33564, 31312, 24746, 25569, 28197, 26093, 33894, 33446, 39925, 26771, 22311, 26017, 25201, 23451, 22992, 34427, 39156, 32098, 32190, 39822, 25110, 31903, 34999, 23433, 24245, 25353, 26263, 26696, 38343, 38797, 26447, 20197, 20234, 20301, 20381, 20553, 22258, 22839, 22996, 23041, 23561, 24799, 24847, 24944, 26131, 26885, 28858, 30031, 30064, 31227, 32173, 32239, 32963, 33806, 34915, 35586, 36949, 36986, 21307, 20117, 20133, 22495, 32946, 37057, 30959, 19968, 22769, 28322, 36920, 31282, 33576, 33419, 39983, 20801, 21360, 21693, 21729, 22240, 23035, 24341, 39154, 28139, 32996, 34093, 38498, 38512, 38560, 38907, 21515, 21491, 23431, 28879, 32701, 36802, 38632, 21359, 40284, 31418, 19985, 30867, 33276, 28198, 22040, 21764, 27421, 34074, 39995, 23013, 21417, 28006, 29916, 38287, 22082, 20113, 36939, 38642, 33615, 39180, 21473, 21942, 23344, 24433, 26144, 26355, 26628, 27704, 27891, 27945, 29787, 30408, 31310, 38964, 33521, 34907, 35424, 37613, 28082, 30123, 30410, 39365, 24742, 35585, 36234, 38322, 27022, 21421, 20870, 22290, 22576, 22852, 23476, 24310, 24616, 25513, 25588, 27839, 28436, 28814, 28948, 29017, 29141, 29503, 32257, 33398, 33489, 34199, 36960, 37467, 40219, 22633, 26044, 27738, 29989, 20985, 22830, 22885, 24448, 24540, 25276, 26106, 27178, 27431, 27572, 29579, 32705, 35158, 40236, 40206, 40644, 23713, 27798, 33659, 20740, 23627, 25014, 33222, 26742, 29281, 20057, 20474, 21368, 24681, 28201, 31311, 38899, 19979, 21270, 20206, 20309, 20285, 20385, 20339, 21152, 21487, 22025, 22799, 23233, 23478, 23521, 31185, 26247, 26524, 26550, 27468, 27827, 28779, 29634, 31117, 31166, 31292, 31623, 33457, 33499, 33540, 33655, 33775, 33747, 34662, 35506, 22057, 36008, 36838, 36942, 38686, 34442, 20420, 23784, 25105, 29273, 30011, 33253, 33469, 34558, 36032, 38597, 39187, 39381, 20171, 20250, 35299, 22238, 22602, 22730, 24315, 24555, 24618, 24724, 24674, 25040, 25106, 25296, 25913, 39745, 26214, 26800, 28023, 28784, 30028, 30342, 32117, 33445, 34809, 38283, 38542, 35997, 20977, 21182, 22806, 21683, 23475, 23830, 24936, 27010, 28079, 30861, 33995, 34903, 35442, 37799, 39608, 28012, 39336, 34521, 22435, 26623, 34510, 37390, 21123, 22151, 21508, 24275, 25313, 25785, 26684, 26680, 27579, 29554, 30906, 31339, 35226, 35282, 36203, 36611, 37101, 38307, 38548, 38761, 23398, 23731, 27005, 38989, 38990, 25499, 31520, 27179, 27263, 26806, 39949, 28511, 21106, 21917, 24688, 25324, 27963, 28167, 28369, 33883, 35088, 36676, 19988, 39993, 21494, 26907, 27194, 38788, 26666, 20828, 31427, 33970, 37340, 37772, 22107, 40232, 26658, 33541, 33841, 31909, 21000, 33477, 29926, 20094, 20355, 20896, 23506, 21002, 21208, 21223, 24059, 21914, 22570, 23014, 23436, 23448, 23515, 24178, 24185, 24739, 24863, 24931, 25022, 25563, 25954, 26577, 26707, 26874, 27454, 27475, 27735, 28450, 28567, 28485, 29872, 29976, 30435, 30475, 31487, 31649, 31777, 32233, 32566, 32752, 32925, 33382, 33694, 35251, 35532, 36011, 36996, 37969, 38291, 38289, 38306, 38501, 38867, 39208, 33304, 20024, 21547, 23736, 24012, 29609, 30284, 30524, 23721, 32747, 36107, 38593, 38929, 38996, 39000, 20225, 20238, 21361, 21916, 22120, 22522, 22855, 23305, 23492, 23696, 24076, 24190, 24524, 25582, 26426, 26071, 26082, 26399, 26827, 26820, 27231, 24112, 27589, 27671, 27773, 30079, 31048, 23395, 31232, 32000, 24509, 35215, 35352, 36020, 36215, 36556, 36637, 39138, 39438, 39740, 20096, 20605, 20736, 22931, 23452, 25135, 25216, 25836, 27450, 29344, 30097, 31047, 32681, 34811, 35516, 35696, 25516, 33738, 38816, 21513, 21507, 21931, 26708, 27224, 35440, 30759, 26485, 40653, 21364, 23458, 33050, 34384, 36870, 19992, 20037, 20167, 20241, 21450, 21560, 23470, 24339, 24613, 25937, 26429, 27714, 27762, 27875, 28792, 29699, 31350, 31406, 31496, 32026, 31998, 32102, 26087, 29275, 21435, 23621, 24040, 25298, 25312, 25369, 28192, 34394, 35377, 36317, 37624, 28417, 31142, 39770, 20136, 20139, 20140, 20379, 20384, 20689, 20807, 31478, 20849, 20982, 21332, 21281, 21375, 21483, 21932, 22659, 23777, 24375, 24394, 24623, 24656, 24685, 25375, 25945, 27211, 27841, 29378, 29421, 30703, 33016, 33029, 33288, 34126, 37111, 37857, 38911, 39255, 39514, 20208, 20957, 23597, 26241, 26989, 23616, 26354, 26997, 29577, 26704, 31873, 20677, 21220, 22343, 24062, 37670, 26020, 27427, 27453, 29748, 31105, 31165, 31563, 32202, 33465, 33740, 34943, 35167, 35641, 36817, 37329, 21535, 37504, 20061, 20534, 21477, 21306, 29399, 29590, 30697, 33510, 36527, 39366, 39368, 39378, 20855, 24858, 34398, 21936, 31354, 20598, 23507, 36935, 38533, 20018, 27355, 37351, 23633, 23624, 25496, 31391, 27795, 38772, 36705, 31402, 29066, 38536, 31874, 26647, 32368, 26705, 37740, 21234, 21531, 34219, 35347, 32676, 36557, 37089, 21350, 34952, 31041, 20418, 20670, 21009, 20804, 21843, 22317, 29674, 22411, 22865, 24418, 24452, 24693, 24950, 24935, 25001, 25522, 25658, 25964, 26223, 26690, 28179, 30054, 31293, 31995, 32076, 32153, 32331, 32619, 33550, 33610, 34509, 35336, 35427, 35686, 36605, 38938, 40335, 33464, 36814, 39912, 21127, 25119, 25731, 28608, 38553, 26689, 20625, 27424, 27770, 28500, 31348, 32080, 34880, 35363, 26376, 20214, 20537, 20518, 20581, 20860, 21048, 21091, 21927, 22287, 22533, 23244, 24314, 25010, 25080, 25331, 25458, 26908, 27177, 29309, 29356, 29486, 30740, 30831, 32121, 30476, 32937, 35211, 35609, 36066, 36562, 36963, 37749, 38522, 38997, 39443, 40568, 20803, 21407, 21427, 24187, 24358, 28187, 28304, 29572, 29694, 32067, 33335, 35328, 35578, 38480, 20046, 20491, 21476, 21628, 22266, 22993, 23396, 24049, 24235, 24359, 25144, 25925, 26543, 28246, 29392, 31946, 34996, 32929, 32993, 33776, 34382, 35463, 36328, 37431, 38599, 39015, 40723, 20116, 20114, 20237, 21320, 21577, 21566, 23087, 24460, 24481, 24735, 26791, 27278, 29786, 30849, 35486, 35492, 35703, 37264, 20062, 39881, 20132, 20348, 20399, 20505, 20502, 20809, 20844, 21151, 21177, 21246, 21402, 21475, 21521, 21518, 21897, 22353, 22434, 22909, 23380, 23389, 23439, 24037, 24039, 24055, 24184, 24195, 24218, 24247, 24344, 24658, 24908, 25239, 25304, 25511, 25915, 26114, 26179, 26356, 26477, 26657, 26775, 27083, 27743, 27946, 28009, 28207, 28317, 30002, 30343, 30828, 31295, 31968, 32005, 32024, 32094, 32177, 32789, 32771, 32943, 32945, 33108, 33167, 33322, 33618, 34892, 34913, 35611, 36002, 36092, 37066, 37237, 37489, 30783, 37628, 38308, 38477, 38917, 39321, 39640, 40251, 21083, 21163, 21495, 21512, 22741, 25335, 28640, 35946, 36703, 40633, 20811, 21051, 21578, 22269, 31296, 37239, 40288, 40658, 29508, 28425, 33136, 29969, 24573, 24794, 39592, 29403, 36796, 27492, 38915, 20170, 22256, 22372, 22718, 23130, 24680, 25031, 26127, 26118, 26681, 26801, 28151, 30165, 32058, 33390, 39746, 20123, 20304, 21449, 21766, 23919, 24038, 24046, 26619, 27801, 29811, 30722, 35408, 37782, 35039, 22352, 24231, 25387, 20661, 20652, 20877, 26368, 21705, 22622, 22971, 23472, 24425, 25165, 25505, 26685, 27507, 28168, 28797, 37319, 29312, 30741, 30758, 31085, 25998, 32048, 33756, 35009, 36617, 38555, 21092, 22312, 26448, 32618, 36001, 20916, 22338, 38442, 22586, 27018, 32948, 21682, 23822, 22524, 30869, 40442, 20316, 21066, 21643, 25662, 26152, 26388, 26613, 31364, 31574, 32034, 37679, 26716, 39853, 31545, 21273, 20874, 21047, 23519, 25334, 25774, 25830, 26413, 27578, 34217, 38609, 30352, 39894, 25420, 37638, 39851, 30399, 26194, 19977, 20632, 21442, 23665, 24808, 25746, 25955, 26719, 29158, 29642, 29987, 31639, 32386, 34453, 35715, 36059, 37240, 39184, 26028, 26283, 27531, 20181, 20180, 20282, 20351, 21050, 21496, 21490, 21987, 22235, 22763, 22987, 22985, 23039, 23376, 23629, 24066, 24107, 24535, 24605, 25351, 25903, 23388, 26031, 26045, 26088, 26525, 27490, 27515, 27663, 29509, 31049, 31169, 31992, 32025, 32043, 32930, 33026, 33267, 35222, 35422, 35433, 35430, 35468, 35566, 36039, 36060, 38604, 39164, 27503, 20107, 20284, 20365, 20816, 23383, 23546, 24904, 25345, 26178, 27425, 28363, 27835, 29246, 29885, 30164, 30913, 31034, 32780, 32819, 33258, 33940, 36766, 27728, 40575, 24335, 35672, 40235, 31482, 36600, 23437, 38635, 19971, 21489, 22519, 22833, 23241, 23460, 24713, 28287, 28422, 30142, 36074, 23455, 34048, 31712, 20594, 26612, 33437, 23649, 34122, 32286, 33294, 20889, 23556, 25448, 36198, 26012, 29038, 31038, 32023, 32773, 35613, 36554, 36974, 34503, 37034, 20511, 21242, 23610, 26451, 28796, 29237, 37196, 37320, 37675, 33509, 23490, 24369, 24825, 20027, 21462, 23432, 25163, 26417, 27530, 29417, 29664, 31278, 33131, 36259, 37202, 39318, 20754, 21463, 21610, 23551, 25480, 27193, 32172, 38656, 22234, 21454, 21608, 23447, 23601, 24030, 20462, 24833, 25342, 27954, 31168, 31179, 32066, 32333, 32722, 33261, 33311, 33936, 34886, 35186, 35728, 36468, 36655, 36913, 37195, 37228, 38598, 37276, 20160, 20303, 20805, 21313, 24467, 25102, 26580, 27713, 28171, 29539, 32294, 37325, 37507, 21460, 22809, 23487, 28113, 31069, 32302, 31899, 22654, 29087, 20986, 34899, 36848, 20426, 23803, 26149, 30636, 31459, 33308, 39423, 20934, 24490, 26092, 26991, 27529, 28147, 28310, 28516, 30462, 32020, 24033, 36981, 37255, 38918, 20966, 21021, 25152, 26257, 26329, 28186, 24246, 32210, 32626, 26360, 34223, 34295, 35576, 21161, 21465, 22899, 24207, 24464, 24661, 37604, 38500, 20663, 20767, 21213, 21280, 21319, 21484, 21736, 21830, 21809, 22039, 22888, 22974, 23100, 23477, 23558, 23567, 23569, 23578, 24196, 24202, 24288, 24432, 25215, 25220, 25307, 25484, 25463, 26119, 26124, 26157, 26230, 26494, 26786, 27167, 27189, 27836, 28040, 28169, 28248, 28988, 28966, 29031, 30151, 30465, 30813, 30977, 31077, 31216, 31456, 31505, 31911, 32057, 32918, 33750, 33931, 34121, 34909, 35059, 35359, 35388, 35412, 35443, 35937, 36062, 37284, 37478, 37758, 37912, 38556, 38808, 19978, 19976, 19998, 20055, 20887, 21104, 22478, 22580, 22732, 23330, 24120, 24773, 25854, 26465, 26454, 27972, 29366, 30067, 31331, 33976, 35698, 37304, 37664, 22065, 22516, 39166, 25325, 26893, 27542, 29165, 32340, 32887, 33394, 35302, 39135, 34645, 36785, 23611, 20280, 20449, 20405, 21767, 23072, 23517, 23529, 24515, 24910, 25391, 26032, 26187, 26862, 27035, 28024, 28145, 30003, 30137, 30495, 31070, 31206, 32051, 33251, 33455, 34218, 35242, 35386, 36523, 36763, 36914, 37341, 38663, 20154, 20161, 20995, 22645, 22764, 23563, 29978, 23613, 33102, 35338, 36805, 38499, 38765, 31525, 35535, 38920, 37218, 22259, 21416, 36887, 21561, 22402, 24101, 25512, 27700, 28810, 30561, 31883, 32736, 34928, 36930, 37204, 37648, 37656, 38543, 29790, 39620, 23815, 23913, 25968, 26530, 36264, 38619, 25454, 26441, 26905, 33733, 38935, 38592, 35070, 28548, 25722, 23544, 19990, 28716, 30045, 26159, 20932, 21046, 21218, 22995, 24449, 24615, 25104, 25919, 25972, 26143, 26228, 26866, 26646, 27491, 28165, 29298, 29983, 30427, 31934, 32854, 22768, 35069, 35199, 35488, 35475, 35531, 36893, 37266, 38738, 38745, 25993, 31246, 33030, 38587, 24109, 24796, 25114, 26021, 26132, 26512, 30707, 31309, 31821, 32318, 33034, 36012, 36196, 36321, 36447, 30889, 20999, 25305, 25509, 25666, 25240, 35373, 31363, 31680, 35500, 38634, 32118, 33292, 34633, 20185, 20808, 21315, 21344, 23459, 23554, 23574, 24029, 25126, 25159, 25776, 26643, 26676, 27849, 27973, 27927, 26579, 28508, 29006, 29053, 26059, 31359, 31661, 32218, 32330, 32680, 33146, 33307, 33337, 34214, 35438, 36046, 36341, 36984, 36983, 37549, 37521, 38275, 39854, 21069, 21892, 28472, 28982, 20840, 31109, 32341, 33203, 31950, 22092, 22609, 23720, 25514, 26366, 26365, 26970, 29401, 30095, 30094, 30990, 31062, 31199, 31895, 32032, 32068, 34311, 35380, 38459, 36961, 40736, 20711, 21109, 21452, 21474, 20489, 21930, 22766, 22863, 29245, 23435, 23652, 21277, 24803, 24819, 25436, 25475, 25407, 25531, 25805, 26089, 26361, 24035, 27085, 27133, 28437, 29157, 20105, 30185, 30456, 31379, 31967, 32207, 32156, 32865, 33609, 33624, 33900, 33980, 34299, 35013, 36208, 36865, 36973, 37783, 38684, 39442, 20687, 22679, 24974, 33235, 34101, 36104, 36896, 20419, 20596, 21063, 21363, 24687, 25417, 26463, 28204, 36275, 36895, 20439, 23646, 36042, 26063, 32154, 21330, 34966, 20854, 25539, 23384, 23403, 23562, 25613, 26449, 36956, 20182, 22810, 22826, 27760, 35409, 21822, 22549, 22949, 24816, 25171, 26561, 33333, 26965, 38464, 39364, 39464, 20307, 22534, 23550, 32784, 23729, 24111, 24453, 24608, 24907, 25140, 26367, 27888, 28382, 32974, 33151, 33492, 34955, 36024, 36864, 36910, 38538, 40667, 39899, 20195, 21488, 22823, 31532, 37261, 38988, 40441, 28381, 28711, 21331, 21828, 23429, 25176, 25246, 25299, 27810, 28655, 29730, 35351, 37944, 28609, 35582, 33592, 20967, 34552, 21482, 21481, 20294, 36948, 36784, 22890, 33073, 24061, 31466, 36799, 26842, 35895, 29432, 40008, 27197, 35504, 20025, 21336, 22022, 22374, 25285, 25506, 26086, 27470, 28129, 28251, 28845, 30701, 31471, 31658, 32187, 32829, 32966, 34507, 35477, 37723, 22243, 22727, 24382, 26029, 26262, 27264, 27573, 30007, 35527, 20516, 30693, 22320, 24347, 24677, 26234, 27744, 30196, 31258, 32622, 33268, 34584, 36933, 39347, 31689, 30044, 31481, 31569, 33988, 36880, 31209, 31378, 33590, 23265, 30528, 20013, 20210, 23449, 24544, 25277, 26172, 26609, 27880, 34411, 34935, 35387, 37198, 37619, 39376, 27159, 28710, 29482, 33511, 33879, 36015, 19969, 20806, 20939, 21899, 23541, 24086, 24115, 24193, 24340, 24373, 24427, 24500, 25074, 25361, 26274, 26397, 28526, 29266, 30010, 30522, 32884, 33081, 33144, 34678, 35519, 35548, 36229, 36339, 37530, 38263, 38914, 40165, 21189, 25431, 30452, 26389, 27784, 29645, 36035, 37806, 38515, 27941, 22684, 26894, 27084, 36861, 37786, 30171, 36890, 22618, 26626, 25524, 27131, 20291, 28460, 26584, 36795, 34086, 32180, 37716, 26943, 28528, 22378, 22775, 23340, 32044, 29226, 21514, 37347, 40372, 20141, 20302, 20572, 20597, 21059, 35998, 21576, 22564, 23450, 24093, 24213, 24237, 24311, 24351, 24716, 25269, 25402, 25552, 26799, 27712, 30855, 31118, 31243, 32224, 33351, 35330, 35558, 36420, 36883, 37048, 37165, 37336, 40718, 27877, 25688, 25826, 25973, 28404, 30340, 31515, 36969, 37841, 28346, 21746, 24505, 25764, 36685, 36845, 37444, 20856, 22635, 22825, 23637, 24215, 28155, 32399, 29980, 36028, 36578, 39003, 28857, 20253, 27583, 28593, 30000, 38651, 20814, 21520, 22581, 22615, 22956, 23648, 24466, 26007, 26460, 28193, 30331, 33759, 36077, 36884, 37117, 37709, 30757, 30778, 21162, 24230, 22303, 22900, 24594, 20498, 20826, 20908, 20941, 20992, 21776, 22612, 22616, 22871, 23445, 23798, 23947, 24764, 25237, 25645, 26481, 26691, 26812, 26847, 30423, 28120, 28271, 28059, 28783, 29128, 24403, 30168, 31095, 31561, 31572, 31570, 31958, 32113, 21040, 33891, 34153, 34276, 35342, 35588, 35910, 36367, 36867, 36879, 37913, 38518, 38957, 39472, 38360, 20685, 21205, 21516, 22530, 23566, 24999, 25758, 27934, 30643, 31461, 33012, 33796, 36947, 37509, 23776, 40199, 21311, 24471, 24499, 28060, 29305, 30563, 31167, 31716, 27602, 29420, 35501, 26627, 27233, 20984, 31361, 26932, 23626, 40182, 33515, 23493, 37193, 28702, 22136, 23663, 24775, 25958, 27788, 35930, 36929, 38931, 21585, 26311, 37389, 22856, 37027, 20869, 20045, 20970, 34201, 35598, 28760, 25466, 37707, 26978, 39348, 32260, 30071, 21335, 26976, 36575, 38627, 27741, 20108, 23612, 24336, 36841, 21250, 36049, 32905, 34425, 24319, 26085, 20083, 20837, 22914, 23615, 38894, 20219, 22922, 24525, 35469, 28641, 31152, 31074, 23527, 33905, 29483, 29105, 24180, 24565, 25467, 25754, 29123, 31896, 20035, 24316, 20043, 22492, 22178, 24745, 28611, 32013, 33021, 33075, 33215, 36786, 35223, 34468, 24052, 25226, 25773, 35207, 26487, 27874, 27966, 29750, 30772, 23110, 32629, 33453, 39340, 20467, 24259, 25309, 25490, 25943, 26479, 30403, 29260, 32972, 32954, 36649, 37197, 20493, 22521, 23186, 26757, 26995, 29028, 29437, 36023, 22770, 36064, 38506, 36889, 34687, 31204, 30695, 33833, 20271, 21093, 21338, 25293, 26575, 27850, 30333, 31636, 31893, 33334, 34180, 36843, 26333, 28448, 29190, 32283, 33707, 39361, 40614, 20989, 31665, 30834, 31672, 32903, 31560, 27368, 24161, 32908, 30033, 30048, 20843, 37474, 28300, 30330, 37271, 39658, 20240, 32624, 25244, 31567, 38309, 40169, 22138, 22617, 34532, 38588, 20276, 21028, 21322, 21453, 21467, 24070, 25644, 26001, 26495, 27710, 27726, 29256, 29359, 29677, 30036, 32321, 33324, 34281, 36009, 31684, 37318, 29033, 38930, 39151, 25405, 26217, 30058, 30436, 30928, 34115, 34542, 21290, 21329, 21542, 22915, 24199, 24444, 24754, 25161, 25209, 25259, 26000, 27604, 27852, 30130, 30382, 30865, 31192, 32203, 32631, 32933, 34987, 35513, 36027, 36991, 38750, 39131, 27147, 31800, 20633, 23614, 24494, 26503, 27608, 29749, 30473, 32654, 40763, 26570, 31255, 21305, 30091, 39661, 24422, 33181, 33777, 32920, 24380, 24517, 30050, 31558, 36924, 26727, 23019, 23195, 32016, 30334, 35628, 20469, 24426, 27161, 27703, 28418, 29922, 31080, 34920, 35413, 35961, 24287, 25551, 30149, 31186, 33495, 37672, 37618, 33948, 34541, 39981, 21697, 24428, 25996, 27996, 28693, 36007, 36051, 38971, 25935, 29942, 19981, 20184, 22496, 22827, 23142, 23500, 20904, 24067, 24220, 24598, 25206, 25975, 26023, 26222, 28014, 29238, 31526, 33104, 33178, 33433, 35676, 36000, 36070, 36212, 38428, 38468, 20398, 25771, 27494, 33310, 33889, 34154, 37096, 23553, 26963, 39080, 33914, 34135, 20239, 21103, 24489, 24133, 26381, 31119, 33145, 35079, 35206, 28149, 24343, 25173, 27832, 20175, 29289, 39826, 20998, 21563, 22132, 22707, 24996, 25198, 28954, 22894, 31881, 31966, 32027, 38640, 25991, 32862, 19993, 20341, 20853, 22592, 24163, 24179, 24330, 26564, 20006, 34109, 38281, 38491, 31859, 38913, 20731, 22721, 30294, 30887, 21029, 30629, 34065, 31622, 20559, 22793, 29255, 31687, 32232, 36794, 36820, 36941, 20415, 21193, 23081, 24321, 38829, 20445, 33303, 37610, 22275, 25429, 27497, 29995, 35036, 36628, 31298, 21215, 22675, 24917, 25098, 26286, 27597, 31807, 33769, 20515, 20472, 21253, 21574, 22577, 22857, 23453, 23792, 23791, 23849, 24214, 25265, 25447, 25918, 26041, 26379, 27861, 27873, 28921, 30770, 32299, 32990, 33459, 33804, 34028, 34562, 35090, 35370, 35914, 37030, 37586, 39165, 40179, 40300, 20047, 20129, 20621, 21078, 22346, 22952, 24125, 24536, 24537, 25151, 26292, 26395, 26576, 26834, 20882, 32033, 32938, 33192, 35584, 35980, 36031, 37502, 38450, 21536, 38956, 21271, 20693, 21340, 22696, 25778, 26420, 29287, 30566, 31302, 37350, 21187, 27809, 27526, 22528, 24140, 22868, 26412, 32763, 20961, 30406, 25705, 30952, 39764, 40635, 22475, 22969, 26151, 26522, 27598, 21737, 27097, 24149, 33180, 26517, 39850, 26622, 40018, 26717, 20134, 20451, 21448, 25273, 26411, 27819, 36804, 20397, 32365, 40639, 19975, 24930, 28288, 28459, 34067, 21619, 26410, 39749, 24051, 31637, 23724, 23494, 34588, 28234, 34001, 31252, 33032, 22937, 31885, 27665, 30496, 21209, 22818, 28961, 29279, 30683, 38695, 40289, 26891, 23167, 23064, 20901, 21517, 21629, 26126, 30431, 36855, 37528, 40180, 23018, 29277, 28357, 20813, 26825, 32191, 32236, 38754, 40634, 25720, 27169, 33538, 22916, 23391, 27611, 29467, 30450, 32178, 32791, 33945, 20786, 26408, 40665, 30446, 26466, 21247, 39173, 23588, 25147, 31870, 36016, 21839, 24758, 32011, 38272, 21249, 20063, 20918, 22812, 29242, 32822, 37326, 24357, 30690, 21380, 24441, 32004, 34220, 35379, 36493, 38742, 26611, 34222, 37971, 24841, 24840, 27833, 30290, 35565, 36664, 21807, 20305, 20778, 21191, 21451, 23461, 24189, 24736, 24962, 25558, 26377, 26586, 28263, 28044, 29494, 29495, 30001, 31056, 35029, 35480, 36938, 37009, 37109, 38596, 34701, 22805, 20104, 20313, 19982, 35465, 36671, 38928, 20653, 24188, 22934, 23481, 24248, 25562, 25594, 25793, 26332, 26954, 27096, 27915, 28342, 29076, 29992, 31407, 32650, 32768, 33865, 33993, 35201, 35617, 36362, 36965, 38525, 39178, 24958, 25233, 27442, 27779, 28020, 32716, 32764, 28096, 32645, 34746, 35064, 26469, 33713, 38972, 38647, 27931, 32097, 33853, 37226, 20081, 21365, 23888, 27396, 28651, 34253, 34349, 35239, 21033, 21519, 23653, 26446, 26792, 29702, 29827, 30178, 35023, 35041, 37324, 38626, 38520, 24459, 29575, 31435, 33870, 25504, 30053, 21129, 27969, 28316, 29705, 30041, 30827, 31890, 38534, 31452, 40845, 20406, 24942, 26053, 34396, 20102, 20142, 20698, 20001, 20940, 23534, 26009, 26753, 28092, 29471, 30274, 30637, 31260, 31975, 33391, 35538, 36988, 37327, 38517, 38936, 21147, 32209, 20523, 21400, 26519, 28107, 29136, 29747, 33256, 36650, 38563, 40023, 40607, 29792, 22593, 28057, 32047, 39006, 20196, 20278, 20363, 20919, 21169, 23994, 24604, 29618, 31036, 33491, 37428, 38583, 38646, 38666, 40599, 40802, 26278, 27508, 21015, 21155, 28872, 35010, 24265, 24651, 24976, 28451, 29001, 31806, 32244, 32879, 34030, 36899, 37676, 21570, 39791, 27347, 28809, 36034, 36335, 38706, 21172, 23105, 24266, 24324, 26391, 27004, 27028, 28010, 28431, 29282, 29436, 31725, 32769, 32894, 34635, 37070, 20845, 40595, 31108, 32907, 37682, 35542, 20525, 21644, 35441, 27498, 36036, 33031, 24785, 26528, 40434, 20121, 20120, 39952, 35435, 34241, 34152, 26880, 28286, 30871, 33109, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 24332, 19984, 19989, 20010, 20017, 20022, 20028, 20031, 20034, 20054, 20056, 20098, 20101, 35947, 20106, 33298, 24333, 20110, 20126, 20127, 20128, 20130, 20144, 20147, 20150, 20174, 20173, 20164, 20166, 20162, 20183, 20190, 20205, 20191, 20215, 20233, 20314, 20272, 20315, 20317, 20311, 20295, 20342, 20360, 20367, 20376, 20347, 20329, 20336, 20369, 20335, 20358, 20374, 20760, 20436, 20447, 20430, 20440, 20443, 20433, 20442, 20432, 20452, 20453, 20506, 20520, 20500, 20522, 20517, 20485, 20252, 20470, 20513, 20521, 20524, 20478, 20463, 20497, 20486, 20547, 20551, 26371, 20565, 20560, 20552, 20570, 20566, 20588, 20600, 20608, 20634, 20613, 20660, 20658, 20681, 20682, 20659, 20674, 20694, 20702, 20709, 20717, 20707, 20718, 20729, 20725, 20745, 20737, 20738, 20758, 20757, 20756, 20762, 20769, 20794, 20791, 20796, 20795, 20799, 20800, 20818, 20812, 20820, 20834, 31480, 20841, 20842, 20846, 20864, 20866, 22232, 20876, 20873, 20879, 20881, 20883, 20885, 20886, 20900, 20902, 20898, 20905, 20906, 20907, 20915, 20913, 20914, 20912, 20917, 20925, 20933, 20937, 20955, 20960, 34389, 20969, 20973, 20976, 20981, 20990, 20996, 21003, 21012, 21006, 21031, 21034, 21038, 21043, 21049, 21071, 21060, 21067, 21068, 21086, 21076, 21098, 21108, 21097, 21107, 21119, 21117, 21133, 21140, 21138, 21105, 21128, 21137, 36776, 36775, 21164, 21165, 21180, 21173, 21185, 21197, 21207, 21214, 21219, 21222, 39149, 21216, 21235, 21237, 21240, 21241, 21254, 21256, 30008, 21261, 21264, 21263, 21269, 21274, 21283, 21295, 21297, 21299, 21304, 21312, 21318, 21317, 19991, 21321, 21325, 20950, 21342, 21353, 21358, 22808, 21371, 21367, 21378, 21398, 21408, 21414, 21413, 21422, 21424, 21430, 21443, 31762, 38617, 21471, 26364, 29166, 21486, 21480, 21485, 21498, 21505, 21565, 21568, 21548, 21549, 21564, 21550, 21558, 21545, 21533, 21582, 21647, 21621, 21646, 21599, 21617, 21623, 21616, 21650, 21627, 21632, 21622, 21636, 21648, 21638, 21703, 21666, 21688, 21669, 21676, 21700, 21704, 21672, 21675, 21698, 21668, 21694, 21692, 21720, 21733, 21734, 21775, 21780, 21757, 21742, 21741, 21754, 21730, 21817, 21824, 21859, 21836, 21806, 21852, 21829, 21846, 21847, 21816, 21811, 21853, 21913, 21888, 21679, 21898, 21919, 21883, 21886, 21912, 21918, 21934, 21884, 21891, 21929, 21895, 21928, 21978, 21957, 21983, 21956, 21980, 21988, 21972, 22036, 22007, 22038, 22014, 22013, 22043, 22009, 22094, 22096, 29151, 22068, 22070, 22066, 22072, 22123, 22116, 22063, 22124, 22122, 22150, 22144, 22154, 22176, 22164, 22159, 22181, 22190, 22198, 22196, 22210, 22204, 22209, 22211, 22208, 22216, 22222, 22225, 22227, 22231, 22254, 22265, 22272, 22271, 22276, 22281, 22280, 22283, 22285, 22291, 22296, 22294, 21959, 22300, 22310, 22327, 22328, 22350, 22331, 22336, 22351, 22377, 22464, 22408, 22369, 22399, 22409, 22419, 22432, 22451, 22436, 22442, 22448, 22467, 22470, 22484, 22482, 22483, 22538, 22486, 22499, 22539, 22553, 22557, 22642, 22561, 22626, 22603, 22640, 27584, 22610, 22589, 22649, 22661, 22713, 22687, 22699, 22714, 22750, 22715, 22712, 22702, 22725, 22739, 22737, 22743, 22745, 22744, 22757, 22748, 22756, 22751, 22767, 22778, 22777, 22779, 22780, 22781, 22786, 22794, 22800, 22811, 26790, 22821, 22828, 22829, 22834, 22840, 22846, 31442, 22869, 22864, 22862, 22874, 22872, 22882, 22880, 22887, 22892, 22889, 22904, 22913, 22941, 20318, 20395, 22947, 22962, 22982, 23016, 23004, 22925, 23001, 23002, 23077, 23071, 23057, 23068, 23049, 23066, 23104, 23148, 23113, 23093, 23094, 23138, 23146, 23194, 23228, 23230, 23243, 23234, 23229, 23267, 23255, 23270, 23273, 23254, 23290, 23291, 23308, 23307, 23318, 23346, 23248, 23338, 23350, 23358, 23363, 23365, 23360, 23377, 23381, 23386, 23387, 23397, 23401, 23408, 23411, 23413, 23416, 25992, 23418, 23424, 23427, 23462, 23480, 23491, 23495, 23497, 23508, 23504, 23524, 23526, 23522, 23518, 23525, 23531, 23536, 23542, 23539, 23557, 23559, 23560, 23565, 23571, 23584, 23586, 23592, 23608, 23609, 23617, 23622, 23630, 23635, 23632, 23631, 23409, 23660, 23662, 20066, 23670, 23673, 23692, 23697, 23700, 22939, 23723, 23739, 23734, 23740, 23735, 23749, 23742, 23751, 23769, 23785, 23805, 23802, 23789, 23948, 23786, 23819, 23829, 23831, 23900, 23839, 23835, 23825, 23828, 23842, 23834, 23833, 23832, 23884, 23890, 23886, 23883, 23916, 23923, 23926, 23943, 23940, 23938, 23970, 23965, 23980, 23982, 23997, 23952, 23991, 23996, 24009, 24013, 24019, 24018, 24022, 24027, 24043, 24050, 24053, 24075, 24090, 24089, 24081, 24091, 24118, 24119, 24132, 24131, 24128, 24142, 24151, 24148, 24159, 24162, 24164, 24135, 24181, 24182, 24186, 40636, 24191, 24224, 24257, 24258, 24264, 24272, 24271, 24278, 24291, 24285, 24282, 24283, 24290, 24289, 24296, 24297, 24300, 24305, 24307, 24304, 24308, 24312, 24318, 24323, 24329, 24413, 24412, 24331, 24337, 24342, 24361, 24365, 24376, 24385, 24392, 24396, 24398, 24367, 24401, 24406, 24407, 24409, 24417, 24429, 24435, 24439, 24451, 24450, 24447, 24458, 24456, 24465, 24455, 24478, 24473, 24472, 24480, 24488, 24493, 24508, 24534, 24571, 24548, 24568, 24561, 24541, 24755, 24575, 24609, 24672, 24601, 24592, 24617, 24590, 24625, 24603, 24597, 24619, 24614, 24591, 24634, 24666, 24641, 24682, 24695, 24671, 24650, 24646, 24653, 24675, 24643, 24676, 24642, 24684, 24683, 24665, 24705, 24717, 24807, 24707, 24730, 24708, 24731, 24726, 24727, 24722, 24743, 24715, 24801, 24760, 24800, 24787, 24756, 24560, 24765, 24774, 24757, 24792, 24909, 24853, 24838, 24822, 24823, 24832, 24820, 24826, 24835, 24865, 24827, 24817, 24845, 24846, 24903, 24894, 24872, 24871, 24906, 24895, 24892, 24876, 24884, 24893, 24898, 24900, 24947, 24951, 24920, 24921, 24922, 24939, 24948, 24943, 24933, 24945, 24927, 24925, 24915, 24949, 24985, 24982, 24967, 25004, 24980, 24986, 24970, 24977, 25003, 25006, 25036, 25034, 25033, 25079, 25032, 25027, 25030, 25018, 25035, 32633, 25037, 25062, 25059, 25078, 25082, 25076, 25087, 25085, 25084, 25086, 25088, 25096, 25097, 25101, 25100, 25108, 25115, 25118, 25121, 25130, 25134, 25136, 25138, 25139, 25153, 25166, 25182, 25187, 25179, 25184, 25192, 25212, 25218, 25225, 25214, 25234, 25235, 25238, 25300, 25219, 25236, 25303, 25297, 25275, 25295, 25343, 25286, 25812, 25288, 25308, 25292, 25290, 25282, 25287, 25243, 25289, 25356, 25326, 25329, 25383, 25346, 25352, 25327, 25333, 25424, 25406, 25421, 25628, 25423, 25494, 25486, 25472, 25515, 25462, 25507, 25487, 25481, 25503, 25525, 25451, 25449, 25534, 25577, 25536, 25542, 25571, 25545, 25554, 25590, 25540, 25622, 25652, 25606, 25619, 25638, 25654, 25885, 25623, 25640, 25615, 25703, 25711, 25718, 25678, 25898, 25749, 25747, 25765, 25769, 25736, 25788, 25818, 25810, 25797, 25799, 25787, 25816, 25794, 25841, 25831, 33289, 25824, 25825, 25260, 25827, 25839, 25900, 25846, 25844, 25842, 25850, 25856, 25853, 25880, 25884, 25861, 25892, 25891, 25899, 25908, 25909, 25911, 25910, 25912, 30027, 25928, 25942, 25941, 25933, 25944, 25950, 25949, 25970, 25976, 25986, 25987, 35722, 26011, 26015, 26027, 26039, 26051, 26054, 26049, 26052, 26060, 26066, 26075, 26073, 26080, 26081, 26097, 26482, 26122, 26115, 26107, 26483, 26165, 26166, 26164, 26140, 26191, 26180, 26185, 26177, 26206, 26205, 26212, 26215, 26216, 26207, 26210, 26224, 26243, 26248, 26254, 26249, 26244, 26264, 26269, 26305, 26297, 26313, 26302, 26300, 26308, 26296, 26326, 26330, 26336, 26175, 26342, 26345, 26352, 26357, 26359, 26383, 26390, 26398, 26406, 26407, 38712, 26414, 26431, 26422, 26433, 26424, 26423, 26438, 26462, 26464, 26457, 26467, 26468, 26505, 26480, 26537, 26492, 26474, 26508, 26507, 26534, 26529, 26501, 26551, 26607, 26548, 26604, 26547, 26601, 26552, 26596, 26590, 26589, 26594, 26606, 26553, 26574, 26566, 26599, 27292, 26654, 26694, 26665, 26688, 26701, 26674, 26702, 26803, 26667, 26713, 26723, 26743, 26751, 26783, 26767, 26797, 26772, 26781, 26779, 26755, 27310, 26809, 26740, 26805, 26784, 26810, 26895, 26765, 26750, 26881, 26826, 26888, 26840, 26914, 26918, 26849, 26892, 26829, 26836, 26855, 26837, 26934, 26898, 26884, 26839, 26851, 26917, 26873, 26848, 26863, 26920, 26922, 26906, 26915, 26913, 26822, 27001, 26999, 26972, 27000, 26987, 26964, 27006, 26990, 26937, 26996, 26941, 26969, 26928, 26977, 26974, 26973, 27009, 26986, 27058, 27054, 27088, 27071, 27073, 27091, 27070, 27086, 23528, 27082, 27101, 27067, 27075, 27047, 27182, 27025, 27040, 27036, 27029, 27060, 27102, 27112, 27138, 27163, 27135, 27402, 27129, 27122, 27111, 27141, 27057, 27166, 27117, 27156, 27115, 27146, 27154, 27329, 27171, 27155, 27204, 27148, 27250, 27190, 27256, 27207, 27234, 27225, 27238, 27208, 27192, 27170, 27280, 27277, 27296, 27268, 27298, 27299, 27287, 34327, 27323, 27331, 27330, 27320, 27315, 27308, 27358, 27345, 27359, 27306, 27354, 27370, 27387, 27397, 34326, 27386, 27410, 27414, 39729, 27423, 27448, 27447, 30428, 27449, 39150, 27463, 27459, 27465, 27472, 27481, 27476, 27483, 27487, 27489, 27512, 27513, 27519, 27520, 27524, 27523, 27533, 27544, 27541, 27550, 27556, 27562, 27563, 27567, 27570, 27569, 27571, 27575, 27580, 27590, 27595, 27603, 27615, 27628, 27627, 27635, 27631, 40638, 27656, 27667, 27668, 27675, 27684, 27683, 27742, 27733, 27746, 27754, 27778, 27789, 27802, 27777, 27803, 27774, 27752, 27763, 27794, 27792, 27844, 27889, 27859, 27837, 27863, 27845, 27869, 27822, 27825, 27838, 27834, 27867, 27887, 27865, 27882, 27935, 34893, 27958, 27947, 27965, 27960, 27929, 27957, 27955, 27922, 27916, 28003, 28051, 28004, 27994, 28025, 27993, 28046, 28053, 28644, 28037, 28153, 28181, 28170, 28085, 28103, 28134, 28088, 28102, 28140, 28126, 28108, 28136, 28114, 28101, 28154, 28121, 28132, 28117, 28138, 28142, 28205, 28270, 28206, 28185, 28274, 28255, 28222, 28195, 28267, 28203, 28278, 28237, 28191, 28227, 28218, 28238, 28196, 28415, 28189, 28216, 28290, 28330, 28312, 28361, 28343, 28371, 28349, 28335, 28356, 28338, 28372, 28373, 28303, 28325, 28354, 28319, 28481, 28433, 28748, 28396, 28408, 28414, 28479, 28402, 28465, 28399, 28466, 28364, 28478, 28435, 28407, 28550, 28538, 28536, 28545, 28544, 28527, 28507, 28659, 28525, 28546, 28540, 28504, 28558, 28561, 28610, 28518, 28595, 28579, 28577, 28580, 28601, 28614, 28586, 28639, 28629, 28652, 28628, 28632, 28657, 28654, 28635, 28681, 28683, 28666, 28689, 28673, 28687, 28670, 28699, 28698, 28532, 28701, 28696, 28703, 28720, 28734, 28722, 28753, 28771, 28825, 28818, 28847, 28913, 28844, 28856, 28851, 28846, 28895, 28875, 28893, 28889, 28937, 28925, 28956, 28953, 29029, 29013, 29064, 29030, 29026, 29004, 29014, 29036, 29071, 29179, 29060, 29077, 29096, 29100, 29143, 29113, 29118, 29138, 29129, 29140, 29134, 29152, 29164, 29159, 29173, 29180, 29177, 29183, 29197, 29200, 29211, 29224, 29229, 29228, 29232, 29234, 29243, 29244, 29247, 29248, 29254, 29259, 29272, 29300, 29310, 29314, 29313, 29319, 29330, 29334, 29346, 29351, 29369, 29362, 29379, 29382, 29380, 29390, 29394, 29410, 29408, 29409, 29433, 29431, 20495, 29463, 29450, 29468, 29462, 29469, 29492, 29487, 29481, 29477, 29502, 29518, 29519, 40664, 29527, 29546, 29544, 29552, 29560, 29557, 29563, 29562, 29640, 29619, 29646, 29627, 29632, 29669, 29678, 29662, 29858, 29701, 29807, 29733, 29688, 29746, 29754, 29781, 29759, 29791, 29785, 29761, 29788, 29801, 29808, 29795, 29802, 29814, 29822, 29835, 29854, 29863, 29898, 29903, 29908, 29681, 29920, 29923, 29927, 29929, 29934, 29938, 29936, 29937, 29944, 29943, 29956, 29955, 29957, 29964, 29966, 29965, 29973, 29971, 29982, 29990, 29996, 30012, 30020, 30029, 30026, 30025, 30043, 30022, 30042, 30057, 30052, 30055, 30059, 30061, 30072, 30070, 30086, 30087, 30068, 30090, 30089, 30082, 30100, 30106, 30109, 30117, 30115, 30146, 30131, 30147, 30133, 30141, 30136, 30140, 30129, 30157, 30154, 30162, 30169, 30179, 30174, 30206, 30207, 30204, 30209, 30192, 30202, 30194, 30195, 30219, 30221, 30217, 30239, 30247, 30240, 30241, 30242, 30244, 30260, 30256, 30267, 30279, 30280, 30278, 30300, 30296, 30305, 30306, 30312, 30313, 30314, 30311, 30316, 30320, 30322, 30326, 30328, 30332, 30336, 30339, 30344, 30347, 30350, 30358, 30355, 30361, 30362, 30384, 30388, 30392, 30393, 30394, 30402, 30413, 30422, 30418, 30430, 30433, 30437, 30439, 30442, 34351, 30459, 30472, 30471, 30468, 30505, 30500, 30494, 30501, 30502, 30491, 30519, 30520, 30535, 30554, 30568, 30571, 30555, 30565, 30591, 30590, 30585, 30606, 30603, 30609, 30624, 30622, 30640, 30646, 30649, 30655, 30652, 30653, 30651, 30663, 30669, 30679, 30682, 30684, 30691, 30702, 30716, 30732, 30738, 31014, 30752, 31018, 30789, 30862, 30836, 30854, 30844, 30874, 30860, 30883, 30901, 30890, 30895, 30929, 30918, 30923, 30932, 30910, 30908, 30917, 30922, 30956, 30951, 30938, 30973, 30964, 30983, 30994, 30993, 31001, 31020, 31019, 31040, 31072, 31063, 31071, 31066, 31061, 31059, 31098, 31103, 31114, 31133, 31143, 40779, 31146, 31150, 31155, 31161, 31162, 31177, 31189, 31207, 31212, 31201, 31203, 31240, 31245, 31256, 31257, 31264, 31263, 31104, 31281, 31291, 31294, 31287, 31299, 31319, 31305, 31329, 31330, 31337, 40861, 31344, 31353, 31357, 31368, 31383, 31381, 31384, 31382, 31401, 31432, 31408, 31414, 31429, 31428, 31423, 36995, 31431, 31434, 31437, 31439, 31445, 31443, 31449, 31450, 31453, 31457, 31458, 31462, 31469, 31472, 31490, 31503, 31498, 31494, 31539, 31512, 31513, 31518, 31541, 31528, 31542, 31568, 31610, 31492, 31565, 31499, 31564, 31557, 31605, 31589, 31604, 31591, 31600, 31601, 31596, 31598, 31645, 31640, 31647, 31629, 31644, 31642, 31627, 31634, 31631, 31581, 31641, 31691, 31681, 31692, 31695, 31668, 31686, 31709, 31721, 31761, 31764, 31718, 31717, 31840, 31744, 31751, 31763, 31731, 31735, 31767, 31757, 31734, 31779, 31783, 31786, 31775, 31799, 31787, 31805, 31820, 31811, 31828, 31823, 31808, 31824, 31832, 31839, 31844, 31830, 31845, 31852, 31861, 31875, 31888, 31908, 31917, 31906, 31915, 31905, 31912, 31923, 31922, 31921, 31918, 31929, 31933, 31936, 31941, 31938, 31960, 31954, 31964, 31970, 39739, 31983, 31986, 31988, 31990, 31994, 32006, 32002, 32028, 32021, 32010, 32069, 32075, 32046, 32050, 32063, 32053, 32070, 32115, 32086, 32078, 32114, 32104, 32110, 32079, 32099, 32147, 32137, 32091, 32143, 32125, 32155, 32186, 32174, 32163, 32181, 32199, 32189, 32171, 32317, 32162, 32175, 32220, 32184, 32159, 32176, 32216, 32221, 32228, 32222, 32251, 32242, 32225, 32261, 32266, 32291, 32289, 32274, 32305, 32287, 32265, 32267, 32290, 32326, 32358, 32315, 32309, 32313, 32323, 32311, 32306, 32314, 32359, 32349, 32342, 32350, 32345, 32346, 32377, 32362, 32361, 32380, 32379, 32387, 32213, 32381, 36782, 32383, 32392, 32393, 32396, 32402, 32400, 32403, 32404, 32406, 32398, 32411, 32412, 32568, 32570, 32581, 32588, 32589, 32590, 32592, 32593, 32597, 32596, 32600, 32607, 32608, 32616, 32617, 32615, 32632, 32642, 32646, 32643, 32648, 32647, 32652, 32660, 32670, 32669, 32666, 32675, 32687, 32690, 32697, 32686, 32694, 32696, 35697, 32709, 32710, 32714, 32725, 32724, 32737, 32742, 32745, 32755, 32761, 39132, 32774, 32772, 32779, 32786, 32792, 32793, 32796, 32801, 32808, 32831, 32827, 32842, 32838, 32850, 32856, 32858, 32863, 32866, 32872, 32883, 32882, 32880, 32886, 32889, 32893, 32895, 32900, 32902, 32901, 32923, 32915, 32922, 32941, 20880, 32940, 32987, 32997, 32985, 32989, 32964, 32986, 32982, 33033, 33007, 33009, 33051, 33065, 33059, 33071, 33099, 38539, 33094, 33086, 33107, 33105, 33020, 33137, 33134, 33125, 33126, 33140, 33155, 33160, 33162, 33152, 33154, 33184, 33173, 33188, 33187, 33119, 33171, 33193, 33200, 33205, 33214, 33208, 33213, 33216, 33218, 33210, 33225, 33229, 33233, 33241, 33240, 33224, 33242, 33247, 33248, 33255, 33274, 33275, 33278, 33281, 33282, 33285, 33287, 33290, 33293, 33296, 33302, 33321, 33323, 33336, 33331, 33344, 33369, 33368, 33373, 33370, 33375, 33380, 33378, 33384, 33386, 33387, 33326, 33393, 33399, 33400, 33406, 33421, 33426, 33451, 33439, 33467, 33452, 33505, 33507, 33503, 33490, 33524, 33523, 33530, 33683, 33539, 33531, 33529, 33502, 33542, 33500, 33545, 33497, 33589, 33588, 33558, 33586, 33585, 33600, 33593, 33616, 33605, 33583, 33579, 33559, 33560, 33669, 33690, 33706, 33695, 33698, 33686, 33571, 33678, 33671, 33674, 33660, 33717, 33651, 33653, 33696, 33673, 33704, 33780, 33811, 33771, 33742, 33789, 33795, 33752, 33803, 33729, 33783, 33799, 33760, 33778, 33805, 33826, 33824, 33725, 33848, 34054, 33787, 33901, 33834, 33852, 34138, 33924, 33911, 33899, 33965, 33902, 33922, 33897, 33862, 33836, 33903, 33913, 33845, 33994, 33890, 33977, 33983, 33951, 34009, 33997, 33979, 34010, 34000, 33985, 33990, 34006, 33953, 34081, 34047, 34036, 34071, 34072, 34092, 34079, 34069, 34068, 34044, 34112, 34147, 34136, 34120, 34113, 34306, 34123, 34133, 34176, 34212, 34184, 34193, 34186, 34216, 34157, 34196, 34203, 34282, 34183, 34204, 34167, 34174, 34192, 34249, 34234, 34255, 34233, 34256, 34261, 34269, 34277, 34268, 34297, 34314, 34323, 34315, 34302, 34298, 34310, 34338, 34330, 34352, 34367, 34381, 20053, 34388, 34399, 34407, 34417, 34451, 34467, 34473, 34474, 34443, 34444, 34486, 34479, 34500, 34502, 34480, 34505, 34851, 34475, 34516, 34526, 34537, 34540, 34527, 34523, 34543, 34578, 34566, 34568, 34560, 34563, 34555, 34577, 34569, 34573, 34553, 34570, 34612, 34623, 34615, 34619, 34597, 34601, 34586, 34656, 34655, 34680, 34636, 34638, 34676, 34647, 34664, 34670, 34649, 34643, 34659, 34666, 34821, 34722, 34719, 34690, 34735, 34763, 34749, 34752, 34768, 38614, 34731, 34756, 34739, 34759, 34758, 34747, 34799, 34802, 34784, 34831, 34829, 34814, 34806, 34807, 34830, 34770, 34833, 34838, 34837, 34850, 34849, 34865, 34870, 34873, 34855, 34875, 34884, 34882, 34898, 34905, 34910, 34914, 34923, 34945, 34942, 34974, 34933, 34941, 34997, 34930, 34946, 34967, 34962, 34990, 34969, 34978, 34957, 34980, 34992, 35007, 34993, 35011, 35012, 35028, 35032, 35033, 35037, 35065, 35074, 35068, 35060, 35048, 35058, 35076, 35084, 35082, 35091, 35139, 35102, 35109, 35114, 35115, 35137, 35140, 35131, 35126, 35128, 35148, 35101, 35168, 35166, 35174, 35172, 35181, 35178, 35183, 35188, 35191, 35198, 35203, 35208, 35210, 35219, 35224, 35233, 35241, 35238, 35244, 35247, 35250, 35258, 35261, 35263, 35264, 35290, 35292, 35293, 35303, 35316, 35320, 35331, 35350, 35344, 35340, 35355, 35357, 35365, 35382, 35393, 35419, 35410, 35398, 35400, 35452, 35437, 35436, 35426, 35461, 35458, 35460, 35496, 35489, 35473, 35493, 35494, 35482, 35491, 35524, 35533, 35522, 35546, 35563, 35571, 35559, 35556, 35569, 35604, 35552, 35554, 35575, 35550, 35547, 35596, 35591, 35610, 35553, 35606, 35600, 35607, 35616, 35635, 38827, 35622, 35627, 35646, 35624, 35649, 35660, 35663, 35662, 35657, 35670, 35675, 35674, 35691, 35679, 35692, 35695, 35700, 35709, 35712, 35724, 35726, 35730, 35731, 35734, 35737, 35738, 35898, 35905, 35903, 35912, 35916, 35918, 35920, 35925, 35938, 35948, 35960, 35962, 35970, 35977, 35973, 35978, 35981, 35982, 35988, 35964, 35992, 25117, 36013, 36010, 36029, 36018, 36019, 36014, 36022, 36040, 36033, 36068, 36067, 36058, 36093, 36090, 36091, 36100, 36101, 36106, 36103, 36111, 36109, 36112, 40782, 36115, 36045, 36116, 36118, 36199, 36205, 36209, 36211, 36225, 36249, 36290, 36286, 36282, 36303, 36314, 36310, 36300, 36315, 36299, 36330, 36331, 36319, 36323, 36348, 36360, 36361, 36351, 36381, 36382, 36368, 36383, 36418, 36405, 36400, 36404, 36426, 36423, 36425, 36428, 36432, 36424, 36441, 36452, 36448, 36394, 36451, 36437, 36470, 36466, 36476, 36481, 36487, 36485, 36484, 36491, 36490, 36499, 36497, 36500, 36505, 36522, 36513, 36524, 36528, 36550, 36529, 36542, 36549, 36552, 36555, 36571, 36579, 36604, 36603, 36587, 36606, 36618, 36613, 36629, 36626, 36633, 36627, 36636, 36639, 36635, 36620, 36646, 36659, 36667, 36665, 36677, 36674, 36670, 36684, 36681, 36678, 36686, 36695, 36700, 36706, 36707, 36708, 36764, 36767, 36771, 36781, 36783, 36791, 36826, 36837, 36834, 36842, 36847, 36999, 36852, 36869, 36857, 36858, 36881, 36885, 36897, 36877, 36894, 36886, 36875, 36903, 36918, 36917, 36921, 36856, 36943, 36944, 36945, 36946, 36878, 36937, 36926, 36950, 36952, 36958, 36968, 36975, 36982, 38568, 36978, 36994, 36989, 36993, 36992, 37002, 37001, 37007, 37032, 37039, 37041, 37045, 37090, 37092, 25160, 37083, 37122, 37138, 37145, 37170, 37168, 37194, 37206, 37208, 37219, 37221, 37225, 37235, 37234, 37259, 37257, 37250, 37282, 37291, 37295, 37290, 37301, 37300, 37306, 37312, 37313, 37321, 37323, 37328, 37334, 37343, 37345, 37339, 37372, 37365, 37366, 37406, 37375, 37396, 37420, 37397, 37393, 37470, 37463, 37445, 37449, 37476, 37448, 37525, 37439, 37451, 37456, 37532, 37526, 37523, 37531, 37466, 37583, 37561, 37559, 37609, 37647, 37626, 37700, 37678, 37657, 37666, 37658, 37667, 37690, 37685, 37691, 37724, 37728, 37756, 37742, 37718, 37808, 37804, 37805, 37780, 37817, 37846, 37847, 37864, 37861, 37848, 37827, 37853, 37840, 37832, 37860, 37914, 37908, 37907, 37891, 37895, 37904, 37942, 37931, 37941, 37921, 37946, 37953, 37970, 37956, 37979, 37984, 37986, 37982, 37994, 37417, 38000, 38005, 38007, 38013, 37978, 38012, 38014, 38017, 38015, 38274, 38279, 38282, 38292, 38294, 38296, 38297, 38304, 38312, 38311, 38317, 38332, 38331, 38329, 38334, 38346, 28662, 38339, 38349, 38348, 38357, 38356, 38358, 38364, 38369, 38373, 38370, 38433, 38440, 38446, 38447, 38466, 38476, 38479, 38475, 38519, 38492, 38494, 38493, 38495, 38502, 38514, 38508, 38541, 38552, 38549, 38551, 38570, 38567, 38577, 38578, 38576, 38580, 38582, 38584, 38585, 38606, 38603, 38601, 38605, 35149, 38620, 38669, 38613, 38649, 38660, 38662, 38664, 38675, 38670, 38673, 38671, 38678, 38681, 38692, 38698, 38704, 38713, 38717, 38718, 38724, 38726, 38728, 38722, 38729, 38748, 38752, 38756, 38758, 38760, 21202, 38763, 38769, 38777, 38789, 38780, 38785, 38778, 38790, 38795, 38799, 38800, 38812, 38824, 38822, 38819, 38835, 38836, 38851, 38854, 38856, 38859, 38876, 38893, 40783, 38898, 31455, 38902, 38901, 38927, 38924, 38968, 38948, 38945, 38967, 38973, 38982, 38991, 38987, 39019, 39023, 39024, 39025, 39028, 39027, 39082, 39087, 39089, 39094, 39108, 39107, 39110, 39145, 39147, 39171, 39177, 39186, 39188, 39192, 39201, 39197, 39198, 39204, 39200, 39212, 39214, 39229, 39230, 39234, 39241, 39237, 39248, 39243, 39249, 39250, 39244, 39253, 39319, 39320, 39333, 39341, 39342, 39356, 39391, 39387, 39389, 39384, 39377, 39405, 39406, 39409, 39410, 39419, 39416, 39425, 39439, 39429, 39394, 39449, 39467, 39479, 39493, 39490, 39488, 39491, 39486, 39509, 39501, 39515, 39511, 39519, 39522, 39525, 39524, 39529, 39531, 39530, 39597, 39600, 39612, 39616, 39631, 39633, 39635, 39636, 39646, 39647, 39650, 39651, 39654, 39663, 39659, 39662, 39668, 39665, 39671, 39675, 39686, 39704, 39706, 39711, 39714, 39715, 39717, 39719, 39720, 39721, 39722, 39726, 39727, 39730, 39748, 39747, 39759, 39757, 39758, 39761, 39768, 39796, 39827, 39811, 39825, 39830, 39831, 39839, 39840, 39848, 39860, 39872, 39882, 39865, 39878, 39887, 39889, 39890, 39907, 39906, 39908, 39892, 39905, 39994, 39922, 39921, 39920, 39957, 39956, 39945, 39955, 39948, 39942, 39944, 39954, 39946, 39940, 39982, 39963, 39973, 39972, 39969, 39984, 40007, 39986, 40006, 39998, 40026, 40032, 40039, 40054, 40056, 40167, 40172, 40176, 40201, 40200, 40171, 40195, 40198, 40234, 40230, 40367, 40227, 40223, 40260, 40213, 40210, 40257, 40255, 40254, 40262, 40264, 40285, 40286, 40292, 40273, 40272, 40281, 40306, 40329, 40327, 40363, 40303, 40314, 40346, 40356, 40361, 40370, 40388, 40385, 40379, 40376, 40378, 40390, 40399, 40386, 40409, 40403, 40440, 40422, 40429, 40431, 40445, 40474, 40475, 40478, 40565, 40569, 40573, 40577, 40584, 40587, 40588, 40594, 40597, 40593, 40605, 40613, 40617, 40632, 40618, 40621, 38753, 40652, 40654, 40655, 40656, 40660, 40668, 40670, 40669, 40672, 40677, 40680, 40687, 40692, 40694, 40695, 40697, 40699, 40700, 40701, 40711, 40712, 30391, 40725, 40737, 40748, 40766, 40778, 40786, 40788, 40803, 40799, 40800, 40801, 40806, 40807, 40812, 40810, 40823, 40818, 40822, 40853, 40860, 40864, 22575, 27079, 36953, 29796, 20956, 29081, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 32394, 35100, 37704, 37512, 34012, 20425, 28859, 26161, 26824, 37625, 26363, 24389, 20008, 20193, 20220, 20224, 20227, 20281, 20310, 20370, 20362, 20378, 20372, 20429, 20544, 20514, 20479, 20510, 20550, 20592, 20546, 20628, 20724, 20696, 20810, 20836, 20893, 20926, 20972, 21013, 21148, 21158, 21184, 21211, 21248, 21255, 21284, 21362, 21395, 21426, 21469, 64014, 21660, 21642, 21673, 21759, 21894, 22361, 22373, 22444, 22472, 22471, 64015, 64016, 22686, 22706, 22795, 22867, 22875, 22877, 22883, 22948, 22970, 23382, 23488, 29999, 23512, 23532, 23582, 23718, 23738, 23797, 23847, 23891, 64017, 23874, 23917, 23992, 23993, 24016, 24353, 24372, 24423, 24503, 24542, 24669, 24709, 24714, 24798, 24789, 24864, 24818, 24849, 24887, 24880, 24984, 25107, 25254, 25589, 25696, 25757, 25806, 25934, 26112, 26133, 26171, 26121, 26158, 26142, 26148, 26213, 26199, 26201, 64018, 26227, 26265, 26272, 26290, 26303, 26362, 26382, 63785, 26470, 26555, 26706, 26560, 26625, 26692, 26831, 64019, 26984, 64020, 27032, 27106, 27184, 27243, 27206, 27251, 27262, 27362, 27364, 27606, 27711, 27740, 27782, 27759, 27866, 27908, 28039, 28015, 28054, 28076, 28111, 28152, 28146, 28156, 28217, 28252, 28199, 28220, 28351, 28552, 28597, 28661, 28677, 28679, 28712, 28805, 28843, 28943, 28932, 29020, 28998, 28999, 64021, 29121, 29182, 29361, 29374, 29476, 64022, 29559, 29629, 29641, 29654, 29667, 29650, 29703, 29685, 29734, 29738, 29737, 29742, 29794, 29833, 29855, 29953, 30063, 30338, 30364, 30366, 30363, 30374, 64023, 30534, 21167, 30753, 30798, 30820, 30842, 31024, 64024, 64025, 64026, 31124, 64027, 31131, 31441, 31463, 64028, 31467, 31646, 64029, 32072, 32092, 32183, 32160, 32214, 32338, 32583, 32673, 64030, 33537, 33634, 33663, 33735, 33782, 33864, 33972, 34131, 34137, 34155, 64031, 34224, 64032, 64033, 34823, 35061, 35346, 35383, 35449, 35495, 35518, 35551, 64034, 35574, 35667, 35711, 36080, 36084, 36114, 36214, 64035, 36559, 64036, 64037, 36967, 37086, 64038, 37141, 37159, 37338, 37335, 37342, 37357, 37358, 37348, 37349, 37382, 37392, 37386, 37434, 37440, 37436, 37454, 37465, 37457, 37433, 37479, 37543, 37495, 37496, 37607, 37591, 37593, 37584, 64039, 37589, 37600, 37587, 37669, 37665, 37627, 64040, 37662, 37631, 37661, 37634, 37744, 37719, 37796, 37830, 37854, 37880, 37937, 37957, 37960, 38290, 63964, 64041, 38557, 38575, 38707, 38715, 38723, 38733, 38735, 38737, 38741, 38999, 39013, 64042, 64043, 39207, 64044, 39326, 39502, 39641, 39644, 39797, 39794, 39823, 39857, 39867, 39936, 40304, 40299, 64045, 40473, 40657, null, null, 8560, 8561, 8562, 8563, 8564, 8565, 8566, 8567, 8568, 8569, 65506, 65508, 65287, 65282, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 8560, 8561, 8562, 8563, 8564, 8565, 8566, 8567, 8568, 8569, 8544, 8545, 8546, 8547, 8548, 8549, 8550, 8551, 8552, 8553, 65506, 65508, 65287, 65282, 12849, 8470, 8481, 8757, 32394, 35100, 37704, 37512, 34012, 20425, 28859, 26161, 26824, 37625, 26363, 24389, 20008, 20193, 20220, 20224, 20227, 20281, 20310, 20370, 20362, 20378, 20372, 20429, 20544, 20514, 20479, 20510, 20550, 20592, 20546, 20628, 20724, 20696, 20810, 20836, 20893, 20926, 20972, 21013, 21148, 21158, 21184, 21211, 21248, 21255, 21284, 21362, 21395, 21426, 21469, 64014, 21660, 21642, 21673, 21759, 21894, 22361, 22373, 22444, 22472, 22471, 64015, 64016, 22686, 22706, 22795, 22867, 22875, 22877, 22883, 22948, 22970, 23382, 23488, 29999, 23512, 23532, 23582, 23718, 23738, 23797, 23847, 23891, 64017, 23874, 23917, 23992, 23993, 24016, 24353, 24372, 24423, 24503, 24542, 24669, 24709, 24714, 24798, 24789, 24864, 24818, 24849, 24887, 24880, 24984, 25107, 25254, 25589, 25696, 25757, 25806, 25934, 26112, 26133, 26171, 26121, 26158, 26142, 26148, 26213, 26199, 26201, 64018, 26227, 26265, 26272, 26290, 26303, 26362, 26382, 63785, 26470, 26555, 26706, 26560, 26625, 26692, 26831, 64019, 26984, 64020, 27032, 27106, 27184, 27243, 27206, 27251, 27262, 27362, 27364, 27606, 27711, 27740, 27782, 27759, 27866, 27908, 28039, 28015, 28054, 28076, 28111, 28152, 28146, 28156, 28217, 28252, 28199, 28220, 28351, 28552, 28597, 28661, 28677, 28679, 28712, 28805, 28843, 28943, 28932, 29020, 28998, 28999, 64021, 29121, 29182, 29361, 29374, 29476, 64022, 29559, 29629, 29641, 29654, 29667, 29650, 29703, 29685, 29734, 29738, 29737, 29742, 29794, 29833, 29855, 29953, 30063, 30338, 30364, 30366, 30363, 30374, 64023, 30534, 21167, 30753, 30798, 30820, 30842, 31024, 64024, 64025, 64026, 31124, 64027, 31131, 31441, 31463, 64028, 31467, 31646, 64029, 32072, 32092, 32183, 32160, 32214, 32338, 32583, 32673, 64030, 33537, 33634, 33663, 33735, 33782, 33864, 33972, 34131, 34137, 34155, 64031, 34224, 64032, 64033, 34823, 35061, 35346, 35383, 35449, 35495, 35518, 35551, 64034, 35574, 35667, 35711, 36080, 36084, 36114, 36214, 64035, 36559, 64036, 64037, 36967, 37086, 64038, 37141, 37159, 37338, 37335, 37342, 37357, 37358, 37348, 37349, 37382, 37392, 37386, 37434, 37440, 37436, 37454, 37465, 37457, 37433, 37479, 37543, 37495, 37496, 37607, 37591, 37593, 37584, 64039, 37589, 37600, 37587, 37669, 37665, 37627, 64040, 37662, 37631, 37661, 37634, 37744, 37719, 37796, 37830, 37854, 37880, 37937, 37957, 37960, 38290, 63964, 64041, 38557, 38575, 38707, 38715, 38723, 38733, 38735, 38737, 38741, 38999, 39013, 64042, 64043, 39207, 64044, 39326, 39502, 39641, 39644, 39797, 39794, 39823, 39857, 39867, 39936, 40304, 40299, 64045, 40473, 40657, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
		"jis0212":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,728,711,184,729,733,175,731,730,65374,900,901,null,null,null,null,null,null,null,null,161,166,191,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,186,170,169,174,8482,164,8470,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,902,904,905,906,938,null,908,null,910,939,null,911,null,null,null,null,940,941,942,943,970,912,972,962,973,971,944,974,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,1026,1027,1028,1029,1030,1031,1032,1033,1034,1035,1036,1038,1039,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,1106,1107,1108,1109,1110,1111,1112,1113,1114,1115,1116,1118,1119,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,198,272,null,294,null,306,null,321,319,null,330,216,338,null,358,222,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,230,273,240,295,305,307,312,322,320,329,331,248,339,223,359,254,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,193,192,196,194,258,461,256,260,197,195,262,264,268,199,266,270,201,200,203,202,282,278,274,280,null,284,286,290,288,292,205,204,207,206,463,304,298,302,296,308,310,313,317,315,323,327,325,209,211,210,214,212,465,336,332,213,340,344,342,346,348,352,350,356,354,218,217,220,219,364,467,368,362,370,366,360,471,475,473,469,372,221,376,374,377,381,379,null,null,null,null,null,null,null,225,224,228,226,259,462,257,261,229,227,263,265,269,231,267,271,233,232,235,234,283,279,275,281,501,285,287,null,289,293,237,236,239,238,464,null,299,303,297,309,311,314,318,316,324,328,326,241,243,242,246,244,466,337,333,245,341,345,343,347,349,353,351,357,355,250,249,252,251,365,468,369,363,371,367,361,472,476,474,470,373,253,255,375,378,382,380,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,19970,19972,19973,19980,19986,19999,20003,20004,20008,20011,20014,20015,20016,20021,20032,20033,20036,20039,20049,20058,20060,20067,20072,20073,20084,20085,20089,20095,20109,20118,20119,20125,20143,20153,20163,20176,20186,20187,20192,20193,20194,20200,20207,20209,20211,20213,20221,20222,20223,20224,20226,20227,20232,20235,20236,20242,20245,20246,20247,20249,20270,20273,20320,20275,20277,20279,20281,20283,20286,20288,20290,20296,20297,20299,20300,20306,20308,20310,20312,20319,20323,20330,20332,20334,20337,20343,20344,20345,20346,20349,20350,20353,20354,20356,20357,20361,20362,20364,20366,20368,20370,20371,20372,20375,20377,20378,20382,20383,20402,20407,20409,20411,20412,20413,20414,20416,20417,20421,20422,20424,20425,20427,20428,20429,20431,20434,20444,20448,20450,20464,20466,20476,20477,20479,20480,20481,20484,20487,20490,20492,20494,20496,20499,20503,20504,20507,20508,20509,20510,20514,20519,20526,20528,20530,20531,20533,20544,20545,20546,20549,20550,20554,20556,20558,20561,20562,20563,20567,20569,20575,20576,20578,20579,20582,20583,20586,20589,20592,20593,20539,20609,20611,20612,20614,20618,20622,20623,20624,20626,20627,20628,20630,20635,20636,20638,20639,20640,20641,20642,20650,20655,20656,20665,20666,20669,20672,20675,20676,20679,20684,20686,20688,20691,20692,20696,20700,20701,20703,20706,20708,20710,20712,20713,20719,20721,20726,20730,20734,20739,20742,20743,20744,20747,20748,20749,20750,20722,20752,20759,20761,20763,20764,20765,20766,20771,20775,20776,20780,20781,20783,20785,20787,20788,20789,20792,20793,20802,20810,20815,20819,20821,20823,20824,20831,20836,20838,20862,20867,20868,20875,20878,20888,20893,20897,20899,20909,20920,20922,20924,20926,20927,20930,20936,20943,20945,20946,20947,20949,20952,20958,20962,20965,20974,20978,20979,20980,20983,20993,20994,20997,21010,21011,21013,21014,21016,21026,21032,21041,21042,21045,21052,21061,21065,21077,21079,21080,21082,21084,21087,21088,21089,21094,21102,21111,21112,21113,21120,21122,21125,21130,21132,21139,21141,21142,21143,21144,21146,21148,21156,21157,21158,21159,21167,21168,21174,21175,21176,21178,21179,21181,21184,21188,21190,21192,21196,21199,21201,21204,21206,21211,21212,21217,21221,21224,21225,21226,21228,21232,21233,21236,21238,21239,21248,21251,21258,21259,21260,21265,21267,21272,21275,21276,21278,21279,21285,21287,21288,21289,21291,21292,21293,21296,21298,21301,21308,21309,21310,21314,21324,21323,21337,21339,21345,21347,21349,21356,21357,21362,21369,21374,21379,21383,21384,21390,21395,21396,21401,21405,21409,21412,21418,21419,21423,21426,21428,21429,21431,21432,21434,21437,21440,21445,21455,21458,21459,21461,21466,21469,21470,21472,21478,21479,21493,21506,21523,21530,21537,21543,21544,21546,21551,21553,21556,21557,21571,21572,21575,21581,21583,21598,21602,21604,21606,21607,21609,21611,21613,21614,21620,21631,21633,21635,21637,21640,21641,21645,21649,21653,21654,21660,21663,21665,21670,21671,21673,21674,21677,21678,21681,21687,21689,21690,21691,21695,21702,21706,21709,21710,21728,21738,21740,21743,21750,21756,21758,21759,21760,21761,21765,21768,21769,21772,21773,21774,21781,21802,21803,21810,21813,21814,21819,21820,21821,21825,21831,21833,21834,21837,21840,21841,21848,21850,21851,21854,21856,21857,21860,21862,21887,21889,21890,21894,21896,21902,21903,21905,21906,21907,21908,21911,21923,21924,21933,21938,21951,21953,21955,21958,21961,21963,21964,21966,21969,21970,21971,21975,21976,21979,21982,21986,21993,22006,22015,22021,22024,22026,22029,22030,22031,22032,22033,22034,22041,22060,22064,22067,22069,22071,22073,22075,22076,22077,22079,22080,22081,22083,22084,22086,22089,22091,22093,22095,22100,22110,22112,22113,22114,22115,22118,22121,22125,22127,22129,22130,22133,22148,22149,22152,22155,22156,22165,22169,22170,22173,22174,22175,22182,22183,22184,22185,22187,22188,22189,22193,22195,22199,22206,22213,22217,22218,22219,22223,22224,22220,22221,22233,22236,22237,22239,22241,22244,22245,22246,22247,22248,22257,22251,22253,22262,22263,22273,22274,22279,22282,22284,22289,22293,22298,22299,22301,22304,22306,22307,22308,22309,22313,22314,22316,22318,22319,22323,22324,22333,22334,22335,22341,22342,22348,22349,22354,22370,22373,22375,22376,22379,22381,22382,22383,22384,22385,22387,22388,22389,22391,22393,22394,22395,22396,22398,22401,22403,22412,22420,22423,22425,22426,22428,22429,22430,22431,22433,22421,22439,22440,22441,22444,22456,22461,22471,22472,22476,22479,22485,22493,22494,22500,22502,22503,22505,22509,22512,22517,22518,22520,22525,22526,22527,22531,22532,22536,22537,22497,22540,22541,22555,22558,22559,22560,22566,22567,22573,22578,22585,22591,22601,22604,22605,22607,22608,22613,22623,22625,22628,22631,22632,22648,22652,22655,22656,22657,22663,22664,22665,22666,22668,22669,22671,22672,22676,22678,22685,22688,22689,22690,22694,22697,22705,22706,22724,22716,22722,22728,22733,22734,22736,22738,22740,22742,22746,22749,22753,22754,22761,22771,22789,22790,22795,22796,22802,22803,22804,34369,22813,22817,22819,22820,22824,22831,22832,22835,22837,22838,22847,22851,22854,22866,22867,22873,22875,22877,22878,22879,22881,22883,22891,22893,22895,22898,22901,22902,22905,22907,22908,22923,22924,22926,22930,22933,22935,22943,22948,22951,22957,22958,22959,22960,22963,22967,22970,22972,22977,22979,22980,22984,22986,22989,22994,23005,23006,23007,23011,23012,23015,23022,23023,23025,23026,23028,23031,23040,23044,23052,23053,23054,23058,23059,23070,23075,23076,23079,23080,23082,23085,23088,23108,23109,23111,23112,23116,23120,23125,23134,23139,23141,23143,23149,23159,23162,23163,23166,23179,23184,23187,23190,23193,23196,23198,23199,23200,23202,23207,23212,23217,23218,23219,23221,23224,23226,23227,23231,23236,23238,23240,23247,23258,23260,23264,23269,23274,23278,23285,23286,23293,23296,23297,23304,23319,23348,23321,23323,23325,23329,23333,23341,23352,23361,23371,23372,23378,23382,23390,23400,23406,23407,23420,23421,23422,23423,23425,23428,23430,23434,23438,23440,23441,23443,23444,23446,23464,23465,23468,23469,23471,23473,23474,23479,23482,23484,23488,23489,23501,23503,23510,23511,23512,23513,23514,23520,23535,23537,23540,23549,23564,23575,23582,23583,23587,23590,23593,23595,23596,23598,23600,23602,23605,23606,23641,23642,23644,23650,23651,23655,23656,23657,23661,23664,23668,23669,23674,23675,23676,23677,23687,23688,23690,23695,23698,23709,23711,23712,23714,23715,23718,23722,23730,23732,23733,23738,23753,23755,23762,23773,23767,23790,23793,23794,23796,23809,23814,23821,23826,23851,23843,23844,23846,23847,23857,23860,23865,23869,23871,23874,23875,23878,23880,23893,23889,23897,23882,23903,23904,23905,23906,23908,23914,23917,23920,23929,23930,23934,23935,23937,23939,23944,23946,23954,23955,23956,23957,23961,23963,23967,23968,23975,23979,23984,23988,23992,23993,24003,24007,24011,24016,24014,24024,24025,24032,24036,24041,24056,24057,24064,24071,24077,24082,24084,24085,24088,24095,24096,24110,24104,24114,24117,24126,24139,24144,24137,24145,24150,24152,24155,24156,24158,24168,24170,24171,24172,24173,24174,24176,24192,24203,24206,24226,24228,24229,24232,24234,24236,24241,24243,24253,24254,24255,24262,24268,24267,24270,24273,24274,24276,24277,24284,24286,24293,24299,24322,24326,24327,24328,24334,24345,24348,24349,24353,24354,24355,24356,24360,24363,24364,24366,24368,24372,24374,24379,24381,24383,24384,24388,24389,24391,24397,24400,24404,24408,24411,24416,24419,24420,24423,24431,24434,24436,24437,24440,24442,24445,24446,24457,24461,24463,24470,24476,24477,24482,24487,24491,24484,24492,24495,24496,24497,24504,24516,24519,24520,24521,24523,24528,24529,24530,24531,24532,24542,24545,24546,24552,24553,24554,24556,24557,24558,24559,24562,24563,24566,24570,24572,24583,24586,24589,24595,24596,24599,24600,24602,24607,24612,24621,24627,24629,24640,24647,24648,24649,24652,24657,24660,24662,24663,24669,24673,24679,24689,24702,24703,24706,24710,24712,24714,24718,24721,24723,24725,24728,24733,24734,24738,24740,24741,24744,24752,24753,24759,24763,24766,24770,24772,24776,24777,24778,24779,24782,24783,24788,24789,24793,24795,24797,24798,24802,24805,24818,24821,24824,24828,24829,24834,24839,24842,24844,24848,24849,24850,24851,24852,24854,24855,24857,24860,24862,24866,24874,24875,24880,24881,24885,24886,24887,24889,24897,24901,24902,24905,24926,24928,24940,24946,24952,24955,24956,24959,24960,24961,24963,24964,24971,24973,24978,24979,24983,24984,24988,24989,24991,24992,24997,25000,25002,25005,25016,25017,25020,25024,25025,25026,25038,25039,25045,25052,25053,25054,25055,25057,25058,25063,25065,25061,25068,25069,25071,25089,25091,25092,25095,25107,25109,25116,25120,25122,25123,25127,25129,25131,25145,25149,25154,25155,25156,25158,25164,25168,25169,25170,25172,25174,25178,25180,25188,25197,25199,25203,25210,25213,25229,25230,25231,25232,25254,25256,25267,25270,25271,25274,25278,25279,25284,25294,25301,25302,25306,25322,25330,25332,25340,25341,25347,25348,25354,25355,25357,25360,25363,25366,25368,25385,25386,25389,25397,25398,25401,25404,25409,25410,25411,25412,25414,25418,25419,25422,25426,25427,25428,25432,25435,25445,25446,25452,25453,25457,25460,25461,25464,25468,25469,25471,25474,25476,25479,25482,25488,25492,25493,25497,25498,25502,25508,25510,25517,25518,25519,25533,25537,25541,25544,25550,25553,25555,25556,25557,25564,25568,25573,25578,25580,25586,25587,25589,25592,25593,25609,25610,25616,25618,25620,25624,25630,25632,25634,25636,25637,25641,25642,25647,25648,25653,25661,25663,25675,25679,25681,25682,25683,25684,25690,25691,25692,25693,25695,25696,25697,25699,25709,25715,25716,25723,25725,25733,25735,25743,25744,25745,25752,25753,25755,25757,25759,25761,25763,25766,25768,25772,25779,25789,25790,25791,25796,25801,25802,25803,25804,25806,25808,25809,25813,25815,25828,25829,25833,25834,25837,25840,25845,25847,25851,25855,25857,25860,25864,25865,25866,25871,25875,25876,25878,25881,25883,25886,25887,25890,25894,25897,25902,25905,25914,25916,25917,25923,25927,25929,25936,25938,25940,25951,25952,25959,25963,25978,25981,25985,25989,25994,26002,26005,26008,26013,26016,26019,26022,26030,26034,26035,26036,26047,26050,26056,26057,26062,26064,26068,26070,26072,26079,26096,26098,26100,26101,26105,26110,26111,26112,26116,26120,26121,26125,26129,26130,26133,26134,26141,26142,26145,26146,26147,26148,26150,26153,26154,26155,26156,26158,26160,26161,26163,26169,26167,26176,26181,26182,26186,26188,26193,26190,26199,26200,26201,26203,26204,26208,26209,26363,26218,26219,26220,26238,26227,26229,26239,26231,26232,26233,26235,26240,26236,26251,26252,26253,26256,26258,26265,26266,26267,26268,26271,26272,26276,26285,26289,26290,26293,26299,26303,26304,26306,26307,26312,26316,26318,26319,26324,26331,26335,26344,26347,26348,26350,26362,26373,26375,26382,26387,26393,26396,26400,26402,26419,26430,26437,26439,26440,26444,26452,26453,26461,26470,26476,26478,26484,26486,26491,26497,26500,26510,26511,26513,26515,26518,26520,26521,26523,26544,26545,26546,26549,26555,26556,26557,26617,26560,26562,26563,26565,26568,26569,26578,26583,26585,26588,26593,26598,26608,26610,26614,26615,26706,26644,26649,26653,26655,26664,26663,26668,26669,26671,26672,26673,26675,26683,26687,26692,26693,26698,26700,26709,26711,26712,26715,26731,26734,26735,26736,26737,26738,26741,26745,26746,26747,26748,26754,26756,26758,26760,26774,26776,26778,26780,26785,26787,26789,26793,26794,26798,26802,26811,26821,26824,26828,26831,26832,26833,26835,26838,26841,26844,26845,26853,26856,26858,26859,26860,26861,26864,26865,26869,26870,26875,26876,26877,26886,26889,26890,26896,26897,26899,26902,26903,26929,26931,26933,26936,26939,26946,26949,26953,26958,26967,26971,26979,26980,26981,26982,26984,26985,26988,26992,26993,26994,27002,27003,27007,27008,27021,27026,27030,27032,27041,27045,27046,27048,27051,27053,27055,27063,27064,27066,27068,27077,27080,27089,27094,27095,27106,27109,27118,27119,27121,27123,27125,27134,27136,27137,27139,27151,27153,27157,27162,27165,27168,27172,27176,27184,27186,27188,27191,27195,27198,27199,27205,27206,27209,27210,27214,27216,27217,27218,27221,27222,27227,27236,27239,27242,27249,27251,27262,27265,27267,27270,27271,27273,27275,27281,27291,27293,27294,27295,27301,27307,27311,27312,27313,27316,27325,27326,27327,27334,27337,27336,27340,27344,27348,27349,27350,27356,27357,27364,27367,27372,27376,27377,27378,27388,27389,27394,27395,27398,27399,27401,27407,27408,27409,27415,27419,27422,27428,27432,27435,27436,27439,27445,27446,27451,27455,27462,27466,27469,27474,27478,27480,27485,27488,27495,27499,27502,27504,27509,27517,27518,27522,27525,27543,27547,27551,27552,27554,27555,27560,27561,27564,27565,27566,27568,27576,27577,27581,27582,27587,27588,27593,27596,27606,27610,27617,27619,27622,27623,27630,27633,27639,27641,27647,27650,27652,27653,27657,27661,27662,27664,27666,27673,27679,27686,27687,27688,27692,27694,27699,27701,27702,27706,27707,27711,27722,27723,27725,27727,27730,27732,27737,27739,27740,27755,27757,27759,27764,27766,27768,27769,27771,27781,27782,27783,27785,27796,27797,27799,27800,27804,27807,27824,27826,27828,27842,27846,27853,27855,27856,27857,27858,27860,27862,27866,27868,27872,27879,27881,27883,27884,27886,27890,27892,27908,27911,27914,27918,27919,27921,27923,27930,27942,27943,27944,27751,27950,27951,27953,27961,27964,27967,27991,27998,27999,28001,28005,28007,28015,28016,28028,28034,28039,28049,28050,28052,28054,28055,28056,28074,28076,28084,28087,28089,28093,28095,28100,28104,28106,28110,28111,28118,28123,28125,28127,28128,28130,28133,28137,28143,28144,28148,28150,28156,28160,28164,28190,28194,28199,28210,28214,28217,28219,28220,28228,28229,28232,28233,28235,28239,28241,28242,28243,28244,28247,28252,28253,28254,28258,28259,28264,28275,28283,28285,28301,28307,28313,28320,28327,28333,28334,28337,28339,28347,28351,28352,28353,28355,28359,28360,28362,28365,28366,28367,28395,28397,28398,28409,28411,28413,28420,28424,28426,28428,28429,28438,28440,28442,28443,28454,28457,28458,28463,28464,28467,28470,28475,28476,28461,28495,28497,28498,28499,28503,28505,28506,28509,28510,28513,28514,28520,28524,28541,28542,28547,28551,28552,28555,28556,28557,28560,28562,28563,28564,28566,28570,28575,28576,28581,28582,28583,28584,28590,28591,28592,28597,28598,28604,28613,28615,28616,28618,28634,28638,28648,28649,28656,28661,28665,28668,28669,28672,28677,28678,28679,28685,28695,28704,28707,28719,28724,28727,28729,28732,28739,28740,28744,28745,28746,28747,28756,28757,28765,28766,28750,28772,28773,28780,28782,28789,28790,28798,28801,28805,28806,28820,28821,28822,28823,28824,28827,28836,28843,28848,28849,28852,28855,28874,28881,28883,28884,28885,28886,28888,28892,28900,28922,28931,28932,28933,28934,28935,28939,28940,28943,28958,28960,28971,28973,28975,28976,28977,28984,28993,28997,28998,28999,29002,29003,29008,29010,29015,29018,29020,29022,29024,29032,29049,29056,29061,29063,29068,29074,29082,29083,29088,29090,29103,29104,29106,29107,29114,29119,29120,29121,29124,29131,29132,29139,29142,29145,29146,29148,29176,29182,29184,29191,29192,29193,29203,29207,29210,29213,29215,29220,29227,29231,29236,29240,29241,29249,29250,29251,29253,29262,29263,29264,29267,29269,29270,29274,29276,29278,29280,29283,29288,29291,29294,29295,29297,29303,29304,29307,29308,29311,29316,29321,29325,29326,29331,29339,29352,29357,29358,29361,29364,29374,29377,29383,29385,29388,29397,29398,29400,29407,29413,29427,29428,29434,29435,29438,29442,29444,29445,29447,29451,29453,29458,29459,29464,29465,29470,29474,29476,29479,29480,29484,29489,29490,29493,29498,29499,29501,29507,29517,29520,29522,29526,29528,29533,29534,29535,29536,29542,29543,29545,29547,29548,29550,29551,29553,29559,29561,29564,29568,29569,29571,29573,29574,29582,29584,29587,29589,29591,29592,29596,29598,29599,29600,29602,29605,29606,29610,29611,29613,29621,29623,29625,29628,29629,29631,29637,29638,29641,29643,29644,29647,29650,29651,29654,29657,29661,29665,29667,29670,29671,29673,29684,29685,29687,29689,29690,29691,29693,29695,29696,29697,29700,29703,29706,29713,29722,29723,29732,29734,29736,29737,29738,29739,29740,29741,29742,29743,29744,29745,29753,29760,29763,29764,29766,29767,29771,29773,29777,29778,29783,29789,29794,29798,29799,29800,29803,29805,29806,29809,29810,29824,29825,29829,29830,29831,29833,29839,29840,29841,29842,29848,29849,29850,29852,29855,29856,29857,29859,29862,29864,29865,29866,29867,29870,29871,29873,29874,29877,29881,29883,29887,29896,29897,29900,29904,29907,29912,29914,29915,29918,29919,29924,29928,29930,29931,29935,29940,29946,29947,29948,29951,29958,29970,29974,29975,29984,29985,29988,29991,29993,29994,29999,30006,30009,30013,30014,30015,30016,30019,30023,30024,30030,30032,30034,30039,30046,30047,30049,30063,30065,30073,30074,30075,30076,30077,30078,30081,30085,30096,30098,30099,30101,30105,30108,30114,30116,30132,30138,30143,30144,30145,30148,30150,30156,30158,30159,30167,30172,30175,30176,30177,30180,30183,30188,30190,30191,30193,30201,30208,30210,30211,30212,30215,30216,30218,30220,30223,30226,30227,30229,30230,30233,30235,30236,30237,30238,30243,30245,30246,30249,30253,30258,30259,30261,30264,30265,30266,30268,30282,30272,30273,30275,30276,30277,30281,30283,30293,30297,30303,30308,30309,30317,30318,30319,30321,30324,30337,30341,30348,30349,30357,30363,30364,30365,30367,30368,30370,30371,30372,30373,30374,30375,30376,30378,30381,30397,30401,30405,30409,30411,30412,30414,30420,30425,30432,30438,30440,30444,30448,30449,30454,30457,30460,30464,30470,30474,30478,30482,30484,30485,30487,30489,30490,30492,30498,30504,30509,30510,30511,30516,30517,30518,30521,30525,30526,30530,30533,30534,30538,30541,30542,30543,30546,30550,30551,30556,30558,30559,30560,30562,30564,30567,30570,30572,30576,30578,30579,30580,30586,30589,30592,30596,30604,30605,30612,30613,30614,30618,30623,30626,30631,30634,30638,30639,30641,30645,30654,30659,30665,30673,30674,30677,30681,30686,30687,30688,30692,30694,30698,30700,30704,30705,30708,30712,30715,30725,30726,30729,30733,30734,30737,30749,30753,30754,30755,30765,30766,30768,30773,30775,30787,30788,30791,30792,30796,30798,30802,30812,30814,30816,30817,30819,30820,30824,30826,30830,30842,30846,30858,30863,30868,30872,30881,30877,30878,30879,30884,30888,30892,30893,30896,30897,30898,30899,30907,30909,30911,30919,30920,30921,30924,30926,30930,30931,30933,30934,30948,30939,30943,30944,30945,30950,30954,30962,30963,30976,30966,30967,30970,30971,30975,30982,30988,30992,31002,31004,31006,31007,31008,31013,31015,31017,31021,31025,31028,31029,31035,31037,31039,31044,31045,31046,31050,31051,31055,31057,31060,31064,31067,31068,31079,31081,31083,31090,31097,31099,31100,31102,31115,31116,31121,31123,31124,31125,31126,31128,31131,31132,31137,31144,31145,31147,31151,31153,31156,31160,31163,31170,31172,31175,31176,31178,31183,31188,31190,31194,31197,31198,31200,31202,31205,31210,31211,31213,31217,31224,31228,31234,31235,31239,31241,31242,31244,31249,31253,31259,31262,31265,31271,31275,31277,31279,31280,31284,31285,31288,31289,31290,31300,31301,31303,31304,31308,31317,31318,31321,31324,31325,31327,31328,31333,31335,31338,31341,31349,31352,31358,31360,31362,31365,31366,31370,31371,31376,31377,31380,31390,31392,31395,31404,31411,31413,31417,31419,31420,31430,31433,31436,31438,31441,31451,31464,31465,31467,31468,31473,31476,31483,31485,31486,31495,31508,31519,31523,31527,31529,31530,31531,31533,31534,31535,31536,31537,31540,31549,31551,31552,31553,31559,31566,31573,31584,31588,31590,31593,31594,31597,31599,31602,31603,31607,31620,31625,31630,31632,31633,31638,31643,31646,31648,31653,31660,31663,31664,31666,31669,31670,31674,31675,31676,31677,31682,31685,31688,31690,31700,31702,31703,31705,31706,31707,31720,31722,31730,31732,31733,31736,31737,31738,31740,31742,31745,31746,31747,31748,31750,31753,31755,31756,31758,31759,31769,31771,31776,31781,31782,31784,31788,31793,31795,31796,31798,31801,31802,31814,31818,31829,31825,31826,31827,31833,31834,31835,31836,31837,31838,31841,31843,31847,31849,31853,31854,31856,31858,31865,31868,31869,31878,31879,31887,31892,31902,31904,31910,31920,31926,31927,31930,31931,31932,31935,31940,31943,31944,31945,31949,31951,31955,31956,31957,31959,31961,31962,31965,31974,31977,31979,31989,32003,32007,32008,32009,32015,32017,32018,32019,32022,32029,32030,32035,32038,32042,32045,32049,32060,32061,32062,32064,32065,32071,32072,32077,32081,32083,32087,32089,32090,32092,32093,32101,32103,32106,32112,32120,32122,32123,32127,32129,32130,32131,32133,32134,32136,32139,32140,32141,32145,32150,32151,32157,32158,32166,32167,32170,32179,32182,32183,32185,32194,32195,32196,32197,32198,32204,32205,32206,32215,32217,32256,32226,32229,32230,32234,32235,32237,32241,32245,32246,32249,32250,32264,32272,32273,32277,32279,32284,32285,32288,32295,32296,32300,32301,32303,32307,32310,32319,32324,32325,32327,32334,32336,32338,32344,32351,32353,32354,32357,32363,32366,32367,32371,32376,32382,32385,32390,32391,32394,32397,32401,32405,32408,32410,32413,32414,32572,32571,32573,32574,32575,32579,32580,32583,32591,32594,32595,32603,32604,32605,32609,32611,32612,32613,32614,32621,32625,32637,32638,32639,32640,32651,32653,32655,32656,32657,32662,32663,32668,32673,32674,32678,32682,32685,32692,32700,32703,32704,32707,32712,32718,32719,32731,32735,32739,32741,32744,32748,32750,32751,32754,32762,32765,32766,32767,32775,32776,32778,32781,32782,32783,32785,32787,32788,32790,32797,32798,32799,32800,32804,32806,32812,32814,32816,32820,32821,32823,32825,32826,32828,32830,32832,32836,32864,32868,32870,32877,32881,32885,32897,32904,32910,32924,32926,32934,32935,32939,32952,32953,32968,32973,32975,32978,32980,32981,32983,32984,32992,33005,33006,33008,33010,33011,33014,33017,33018,33022,33027,33035,33046,33047,33048,33052,33054,33056,33060,33063,33068,33072,33077,33082,33084,33093,33095,33098,33100,33106,33111,33120,33121,33127,33128,33129,33133,33135,33143,33153,33168,33156,33157,33158,33163,33166,33174,33176,33179,33182,33186,33198,33202,33204,33211,33227,33219,33221,33226,33230,33231,33237,33239,33243,33245,33246,33249,33252,33259,33260,33264,33265,33266,33269,33270,33272,33273,33277,33279,33280,33283,33295,33299,33300,33305,33306,33309,33313,33314,33320,33330,33332,33338,33347,33348,33349,33350,33355,33358,33359,33361,33366,33372,33376,33379,33383,33389,33396,33403,33405,33407,33408,33409,33411,33412,33415,33417,33418,33422,33425,33428,33430,33432,33434,33435,33440,33441,33443,33444,33447,33448,33449,33450,33454,33456,33458,33460,33463,33466,33468,33470,33471,33478,33488,33493,33498,33504,33506,33508,33512,33514,33517,33519,33526,33527,33533,33534,33536,33537,33543,33544,33546,33547,33620,33563,33565,33566,33567,33569,33570,33580,33581,33582,33584,33587,33591,33594,33596,33597,33602,33603,33604,33607,33613,33614,33617,33621,33622,33623,33648,33656,33661,33663,33664,33666,33668,33670,33677,33682,33684,33685,33688,33689,33691,33692,33693,33702,33703,33705,33708,33726,33727,33728,33735,33737,33743,33744,33745,33748,33757,33619,33768,33770,33782,33784,33785,33788,33793,33798,33802,33807,33809,33813,33817,33709,33839,33849,33861,33863,33864,33866,33869,33871,33873,33874,33878,33880,33881,33882,33884,33888,33892,33893,33895,33898,33904,33907,33908,33910,33912,33916,33917,33921,33925,33938,33939,33941,33950,33958,33960,33961,33962,33967,33969,33972,33978,33981,33982,33984,33986,33991,33992,33996,33999,34003,34012,34023,34026,34031,34032,34033,34034,34039,34098,34042,34043,34045,34050,34051,34055,34060,34062,34064,34076,34078,34082,34083,34084,34085,34087,34090,34091,34095,34099,34100,34102,34111,34118,34127,34128,34129,34130,34131,34134,34137,34140,34141,34142,34143,34144,34145,34146,34148,34155,34159,34169,34170,34171,34173,34175,34177,34181,34182,34185,34187,34188,34191,34195,34200,34205,34207,34208,34210,34213,34215,34228,34230,34231,34232,34236,34237,34238,34239,34242,34247,34250,34251,34254,34221,34264,34266,34271,34272,34278,34280,34285,34291,34294,34300,34303,34304,34308,34309,34317,34318,34320,34321,34322,34328,34329,34331,34334,34337,34343,34345,34358,34360,34362,34364,34365,34368,34370,34374,34386,34387,34390,34391,34392,34393,34397,34400,34401,34402,34403,34404,34409,34412,34415,34421,34422,34423,34426,34445,34449,34454,34456,34458,34460,34465,34470,34471,34472,34477,34481,34483,34484,34485,34487,34488,34489,34495,34496,34497,34499,34501,34513,34514,34517,34519,34522,34524,34528,34531,34533,34535,34440,34554,34556,34557,34564,34565,34567,34571,34574,34575,34576,34579,34580,34585,34590,34591,34593,34595,34600,34606,34607,34609,34610,34617,34618,34620,34621,34622,34624,34627,34629,34637,34648,34653,34657,34660,34661,34671,34673,34674,34683,34691,34692,34693,34694,34695,34696,34697,34699,34700,34704,34707,34709,34711,34712,34713,34718,34720,34723,34727,34732,34733,34734,34737,34741,34750,34751,34753,34760,34761,34762,34766,34773,34774,34777,34778,34780,34783,34786,34787,34788,34794,34795,34797,34801,34803,34808,34810,34815,34817,34819,34822,34825,34826,34827,34832,34841,34834,34835,34836,34840,34842,34843,34844,34846,34847,34856,34861,34862,34864,34866,34869,34874,34876,34881,34883,34885,34888,34889,34890,34891,34894,34897,34901,34902,34904,34906,34908,34911,34912,34916,34921,34929,34937,34939,34944,34968,34970,34971,34972,34975,34976,34984,34986,35002,35005,35006,35008,35018,35019,35020,35021,35022,35025,35026,35027,35035,35038,35047,35055,35056,35057,35061,35063,35073,35078,35085,35086,35087,35093,35094,35096,35097,35098,35100,35104,35110,35111,35112,35120,35121,35122,35125,35129,35130,35134,35136,35138,35141,35142,35145,35151,35154,35159,35162,35163,35164,35169,35170,35171,35179,35182,35184,35187,35189,35194,35195,35196,35197,35209,35213,35216,35220,35221,35227,35228,35231,35232,35237,35248,35252,35253,35254,35255,35260,35284,35285,35286,35287,35288,35301,35305,35307,35309,35313,35315,35318,35321,35325,35327,35332,35333,35335,35343,35345,35346,35348,35349,35358,35360,35362,35364,35366,35371,35372,35375,35381,35383,35389,35390,35392,35395,35397,35399,35401,35405,35406,35411,35414,35415,35416,35420,35421,35425,35429,35431,35445,35446,35447,35449,35450,35451,35454,35455,35456,35459,35462,35467,35471,35472,35474,35478,35479,35481,35487,35495,35497,35502,35503,35507,35510,35511,35515,35518,35523,35526,35528,35529,35530,35537,35539,35540,35541,35543,35549,35551,35564,35568,35572,35573,35574,35580,35583,35589,35590,35595,35601,35612,35614,35615,35594,35629,35632,35639,35644,35650,35651,35652,35653,35654,35656,35666,35667,35668,35673,35661,35678,35683,35693,35702,35704,35705,35708,35710,35713,35716,35717,35723,35725,35727,35732,35733,35740,35742,35743,35896,35897,35901,35902,35909,35911,35913,35915,35919,35921,35923,35924,35927,35928,35931,35933,35929,35939,35940,35942,35944,35945,35949,35955,35957,35958,35963,35966,35974,35975,35979,35984,35986,35987,35993,35995,35996,36004,36025,36026,36037,36038,36041,36043,36047,36054,36053,36057,36061,36065,36072,36076,36079,36080,36082,36085,36087,36088,36094,36095,36097,36099,36105,36114,36119,36123,36197,36201,36204,36206,36223,36226,36228,36232,36237,36240,36241,36245,36254,36255,36256,36262,36267,36268,36271,36274,36277,36279,36281,36283,36288,36293,36294,36295,36296,36298,36302,36305,36308,36309,36311,36313,36324,36325,36327,36332,36336,36284,36337,36338,36340,36349,36353,36356,36357,36358,36363,36369,36372,36374,36384,36385,36386,36387,36390,36391,36401,36403,36406,36407,36408,36409,36413,36416,36417,36427,36429,36430,36431,36436,36443,36444,36445,36446,36449,36450,36457,36460,36461,36463,36464,36465,36473,36474,36475,36482,36483,36489,36496,36498,36501,36506,36507,36509,36510,36514,36519,36521,36525,36526,36531,36533,36538,36539,36544,36545,36547,36548,36551,36559,36561,36564,36572,36584,36590,36592,36593,36599,36601,36602,36589,36608,36610,36615,36616,36623,36624,36630,36631,36632,36638,36640,36641,36643,36645,36647,36648,36652,36653,36654,36660,36661,36662,36663,36666,36672,36673,36675,36679,36687,36689,36690,36691,36692,36693,36696,36701,36702,36709,36765,36768,36769,36772,36773,36774,36789,36790,36792,36798,36800,36801,36806,36810,36811,36813,36816,36818,36819,36821,36832,36835,36836,36840,36846,36849,36853,36854,36859,36862,36866,36868,36872,36876,36888,36891,36904,36905,36911,36906,36908,36909,36915,36916,36919,36927,36931,36932,36940,36955,36957,36962,36966,36967,36972,36976,36980,36985,36997,37000,37003,37004,37006,37008,37013,37015,37016,37017,37019,37024,37025,37026,37029,37040,37042,37043,37044,37046,37053,37068,37054,37059,37060,37061,37063,37064,37077,37079,37080,37081,37084,37085,37087,37093,37074,37110,37099,37103,37104,37108,37118,37119,37120,37124,37125,37126,37128,37133,37136,37140,37142,37143,37144,37146,37148,37150,37152,37157,37154,37155,37159,37161,37166,37167,37169,37172,37174,37175,37177,37178,37180,37181,37187,37191,37192,37199,37203,37207,37209,37210,37211,37217,37220,37223,37229,37236,37241,37242,37243,37249,37251,37253,37254,37258,37262,37265,37267,37268,37269,37272,37278,37281,37286,37288,37292,37293,37294,37296,37297,37298,37299,37302,37307,37308,37309,37311,37314,37315,37317,37331,37332,37335,37337,37338,37342,37348,37349,37353,37354,37356,37357,37358,37359,37360,37361,37367,37369,37371,37373,37376,37377,37380,37381,37382,37383,37385,37386,37388,37392,37394,37395,37398,37400,37404,37405,37411,37412,37413,37414,37416,37422,37423,37424,37427,37429,37430,37432,37433,37434,37436,37438,37440,37442,37443,37446,37447,37450,37453,37454,37455,37457,37464,37465,37468,37469,37472,37473,37477,37479,37480,37481,37486,37487,37488,37493,37494,37495,37496,37497,37499,37500,37501,37503,37512,37513,37514,37517,37518,37522,37527,37529,37535,37536,37540,37541,37543,37544,37547,37551,37554,37558,37560,37562,37563,37564,37565,37567,37568,37569,37570,37571,37573,37574,37575,37576,37579,37580,37581,37582,37584,37587,37589,37591,37592,37593,37596,37597,37599,37600,37601,37603,37605,37607,37608,37612,37614,37616,37625,37627,37631,37632,37634,37640,37645,37649,37652,37653,37660,37661,37662,37663,37665,37668,37669,37671,37673,37674,37683,37684,37686,37687,37703,37704,37705,37712,37713,37714,37717,37719,37720,37722,37726,37732,37733,37735,37737,37738,37741,37743,37744,37745,37747,37748,37750,37754,37757,37759,37760,37761,37762,37768,37770,37771,37773,37775,37778,37781,37784,37787,37790,37793,37795,37796,37798,37800,37803,37812,37813,37814,37818,37801,37825,37828,37829,37830,37831,37833,37834,37835,37836,37837,37843,37849,37852,37854,37855,37858,37862,37863,37881,37879,37880,37882,37883,37885,37889,37890,37892,37896,37897,37901,37902,37903,37909,37910,37911,37919,37934,37935,37937,37938,37939,37940,37947,37951,37949,37955,37957,37960,37962,37964,37973,37977,37980,37983,37985,37987,37992,37995,37997,37998,37999,38001,38002,38020,38019,38264,38265,38270,38276,38280,38284,38285,38286,38301,38302,38303,38305,38310,38313,38315,38316,38324,38326,38330,38333,38335,38342,38344,38345,38347,38352,38353,38354,38355,38361,38362,38365,38366,38367,38368,38372,38374,38429,38430,38434,38436,38437,38438,38444,38449,38451,38455,38456,38457,38458,38460,38461,38465,38482,38484,38486,38487,38488,38497,38510,38516,38523,38524,38526,38527,38529,38530,38531,38532,38537,38545,38550,38554,38557,38559,38564,38565,38566,38569,38574,38575,38579,38586,38602,38610,23986,38616,38618,38621,38622,38623,38633,38639,38641,38650,38658,38659,38661,38665,38682,38683,38685,38689,38690,38691,38696,38705,38707,38721,38723,38730,38734,38735,38741,38743,38744,38746,38747,38755,38759,38762,38766,38771,38774,38775,38776,38779,38781,38783,38784,38793,38805,38806,38807,38809,38810,38814,38815,38818,38828,38830,38833,38834,38837,38838,38840,38841,38842,38844,38846,38847,38849,38852,38853,38855,38857,38858,38860,38861,38862,38864,38865,38868,38871,38872,38873,38877,38878,38880,38875,38881,38884,38895,38897,38900,38903,38904,38906,38919,38922,38937,38925,38926,38932,38934,38940,38942,38944,38947,38950,38955,38958,38959,38960,38962,38963,38965,38949,38974,38980,38983,38986,38993,38994,38995,38998,38999,39001,39002,39010,39011,39013,39014,39018,39020,39083,39085,39086,39088,39092,39095,39096,39098,39099,39103,39106,39109,39112,39116,39137,39139,39141,39142,39143,39146,39155,39158,39170,39175,39176,39185,39189,39190,39191,39194,39195,39196,39199,39202,39206,39207,39211,39217,39218,39219,39220,39221,39225,39226,39227,39228,39232,39233,39238,39239,39240,39245,39246,39252,39256,39257,39259,39260,39262,39263,39264,39323,39325,39327,39334,39344,39345,39346,39349,39353,39354,39357,39359,39363,39369,39379,39380,39385,39386,39388,39390,39399,39402,39403,39404,39408,39412,39413,39417,39421,39422,39426,39427,39428,39435,39436,39440,39441,39446,39454,39456,39458,39459,39460,39463,39469,39470,39475,39477,39478,39480,39495,39489,39492,39498,39499,39500,39502,39505,39508,39510,39517,39594,39596,39598,39599,39602,39604,39605,39606,39609,39611,39614,39615,39617,39619,39622,39624,39630,39632,39634,39637,39638,39639,39643,39644,39648,39652,39653,39655,39657,39660,39666,39667,39669,39673,39674,39677,39679,39680,39681,39682,39683,39684,39685,39688,39689,39691,39692,39693,39694,39696,39698,39702,39705,39707,39708,39712,39718,39723,39725,39731,39732,39733,39735,39737,39738,39741,39752,39755,39756,39765,39766,39767,39771,39774,39777,39779,39781,39782,39784,39786,39787,39788,39789,39790,39795,39797,39799,39800,39801,39807,39808,39812,39813,39814,39815,39817,39818,39819,39821,39823,39824,39828,39834,39837,39838,39846,39847,39849,39852,39856,39857,39858,39863,39864,39867,39868,39870,39871,39873,39879,39880,39886,39888,39895,39896,39901,39903,39909,39911,39914,39915,39919,39923,39927,39928,39929,39930,39933,39935,39936,39938,39947,39951,39953,39958,39960,39961,39962,39964,39966,39970,39971,39974,39975,39976,39977,39978,39985,39989,39990,39991,39997,40001,40003,40004,40005,40009,40010,40014,40015,40016,40019,40020,40022,40024,40027,40029,40030,40031,40035,40041,40042,40028,40043,40040,40046,40048,40050,40053,40055,40059,40166,40178,40183,40185,40203,40194,40209,40215,40216,40220,40221,40222,40239,40240,40242,40243,40244,40250,40252,40261,40253,40258,40259,40263,40266,40275,40276,40287,40291,40290,40293,40297,40298,40299,40304,40310,40311,40315,40316,40318,40323,40324,40326,40330,40333,40334,40338,40339,40341,40342,40343,40344,40353,40362,40364,40366,40369,40373,40377,40380,40383,40387,40391,40393,40394,40404,40405,40406,40407,40410,40414,40415,40416,40421,40423,40425,40427,40430,40432,40435,40436,40446,40458,40450,40455,40462,40464,40465,40466,40469,40470,40473,40476,40477,40570,40571,40572,40576,40578,40579,40580,40581,40583,40590,40591,40598,40600,40603,40606,40612,40616,40620,40622,40623,40624,40627,40628,40629,40646,40648,40651,40661,40671,40676,40679,40684,40685,40686,40688,40689,40690,40693,40696,40703,40706,40707,40713,40719,40720,40721,40722,40724,40726,40727,40729,40730,40731,40735,40738,40742,40746,40747,40751,40753,40754,40756,40759,40761,40762,40764,40765,40767,40769,40771,40772,40773,40774,40775,40787,40789,40790,40791,40792,40794,40797,40798,40808,40809,40813,40814,40815,40816,40817,40819,40821,40826,40829,40847,40848,40849,40850,40852,40854,40855,40862,40865,40866,40867,40869,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
		"ibm866": [],
		"iso-8859-2": [],
		"iso-8859-3": [],
		"iso-8859-4": [],
		"iso-8859-5": [],
		"iso-8859-6": [],
		"iso-8859-7": [],
		"iso-8859-8": [],
		"iso-8859-10": [],
		"iso-8859-13": [],
		"iso-8859-14": [],
		"iso-8859-15": [],
		"iso-8859-16": [],
		"koi8-r": [],
		"koi8-u": [],
		"macintosh": [],
		"windows-874": [],
		"windows-1250": [],
		"windows-1251": [],
		"windows-1252": [],
		"windows-1253": [],
		"windows-1254": [],
		"windows-1255": [],
		"windows-1256": [],
		"windows-1257": [],
		"windows-1258": [],
		"x-mac-cyrillic": []
	};

}(this || {}));

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931035, function(require, module, exports) {
var __TEMP__ = require('./Response');var Response = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function fetch(request) {
  return new Promise((resolve) => {
    resolve(new Response(null, {status: 200}, request))
  })
};exports.default = fetch

}, function(modId) { var map = {"./Response":1670917931036}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931036, function(require, module, exports) {
/* eslint-disable handle-callback-err */
/* eslint-disable no-console */
var __TEMP__ = require('./core/Base64');var Base64 = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Blob');var Blob = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Response {
	constructor(body, options = {}, request) {
		if (!request) {
			this.body = body
			this.status = options.status
			this.statusText = options.statusText
			this.headers = options.headers
		}
		if (typeof request == "string") {
			this.request = {
				url: request
			}
		} else {
			this.request = request
		}
		this.status = 200
	}

	_run(responseType, dataType = 'text') {
		const onekit_debug = Page.getApp().onekit_debug
		if (onekit_debug) {
			console[onekit_debug]('[fetch]', this.request.url, responseType, dataType)
		}
		var url = this.request.url
		if (url.endsWith('.js')) {
			return new Promise((resolve) => {
				resolve(url)
			})
		}
		if (url.startsWith('mini:')) {
			return new Promise((resolve, reject) => {
				try {
					if (dataType == 'text') {
						const MINI = 'mini:'
						const text = url.substring(MINI.length)
						resolve(text);
					} else {
						const BASE64 = 'base64,'
						const base64 = url.substring(url.indexOf(BASE64) + BASE64.length)
						resolve(Base64.base64ToArrayBuffer(base64))
					}
				} catch (ex) {
					console.error(ex)
					reject(ex)
				}
			})
		}
		if (url.startsWith('data:')) {
			return new Promise((resolve, reject) => {
				try {
					const BASE64 = 'base64,'
					const base64 = url.substring(url.indexOf(BASE64) + BASE64.length)
					resolve(Base64.base64ToArrayBuffer(base64))
				} catch (ex) {
					console.error(ex)
					reject(ex)
				}
			})
		}
		if (url.startsWith('blob:')) {
			return new Promise((resolve,reject) => {
				try {
					var global = Page.current
					if(!global){
					  global = Page.getApp()
					}
					const arrayBuffer = global.DataURL[url].array[0]
					resolve(arrayBuffer)
				} catch (ex) {
					console.error(ex);
					reject(ex)
				}
			})
		}
		if (url.startsWith("./")) {
			url = url.substring(2)
		}
		if (!url.startsWith("blob:") &&
			!url.startsWith("data:") &&
			!url.startsWith("mini:") &&
			!url.startsWith("http://") &&
			!url.startsWith("https://")) {
			url = (Page.getApp().onekit_path || "") + url
		}

		// /////////////////////////
		return new Promise((resolve, reject) => {
			Page.wx_request({
				url,
				headers: ((this.request.options || {}).headers || {}).data || {},
				responseType,
				dataType,
				success: (res) => {
					resolve(res.data)
				},
				fail: (e) => {
					console.error('[fetch.fail]', this.request.url, e)
					// eslint-disable-next-line prefer-promise-reject-errors
					reject(null)
				}
			})
		})
	}

	arrayBuffer() {
		return this._run('arraybuffer', 'arraybuffer')
	}

	blob() {
		return new Promise((callback, reject) => {

			this._run('arraybuffer', 'blob').then(data => {
				callback(new Blob([data]));
			}).catch((e) => {
				console.error(e)
				reject(e.message)
			})

		})
	}

	text() {
		return this._run('text')
	}

	json() {
		return this._run('text', 'json')
	}
};exports.default = Response

}, function(modId) { var map = {"./core/Base64":1670917931005,"./core/Page":1670917931007,"./Blob":1670917931002}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931037, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Headers {
  constructor(data) {
    this.data = data
  }
};exports.default = Headers

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931038, function(require, module, exports) {
class Navigator {
  constructor() {
    const systemInfo = wx.getSystemInfoSync()
    this.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
    this.platform = systemInfo.platform;
    this.mediaDevices = {
      getUserMedia() {
        return new Promise((resolve) => {
          resolve();
        });
      },
    };
  }
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = new Navigator();

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931039, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Request {
  constructor(url, options = {}) {
    this.url = url
    this.options = options
  }
};exports.default = Request

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931040, function(require, module, exports) {
module.exports = {
  compile: WXWebAssembly.compile,

  compileStreaming: WXWebAssembly.compileStreaming,

  instantiate: WXWebAssembly.instantiate,

  instantiateStreaming: WXWebAssembly.compileStreaming,

  validate: WXWebAssembly.validate || function() { return true },

  Module: WXWebAssembly.Module,

  Global: WXWebAssembly.Global,

  Instance: WXWebAssembly.Instance,

  Memory: WXWebAssembly.Memory,

  Table: WXWebAssembly.Table,

  Tag: WXWebAssembly.Tag,

  CompileError: Error,

  LinkError: Error,

  RuntimeError: Error,

  Exception: Error
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931041, function(require, module, exports) {
/* eslint-disable camelcase */
var __TEMP__ = require('./EventTarget');var EventTarget = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);

function run(cb, mini_object) {
	return new Promise((resolve, reject) => {
		mini_object.success = resolve;
		mini_object.fail = (e) => {
			console.error("[XMLHttpRequest]", e)
			reject(e)
		};
		cb(Page.wx_request(mini_object));
	});
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class XMLHttpRequest extends EventTarget {
	constructor() {
		super();
		this._responseType = "text";
	}

	open(method, url, async = true, user, password) {
		this._method = method;
		this._url = url;
		this._async = async;
		this._user = user;
		this._password = password;
	}

	async send(body) {
		const callback = (res) => {
			this._response = res.data;
			if (this._responseType === "text") {
				this._responseText = this._response;
			}
			if (this.onload) {
				this.onload.apply(this);
			}
			if (this._all_event_handlers.load) {
				this._all_event_handlers.load.forEach((handler) => {
					handler.apply(this);
				});
			}
		};
		var url = this._url
		if (url.startsWith('mini:')) {
			try {
				var data
				if (this._responseType == 'text') {
					const MINI = 'mini:'
					const text = url.substring(MINI.length)
					data = text;
				} else {
					const BASE64 = 'base64,'
					const base64 = url.substring(url.indexOf(BASE64) + BASE64.length)
					data = Base64.base64ToArrayBuffer(base64)
				}
				callback.call(this, { data });
			} catch (ex) {
				console.error(ex);
			}
			return
		}
		if (url.startsWith('data:')) {
			try {
				const BASE64 = 'base64,'
				url = url.substring(url.indexOf(BASE64) + BASE64.length)
				const data = Base64.base64ToArrayBuffer(url)
				callback.call(this, { data });
			} catch (ex) {
				console.error(ex);
			}
			return
		}
		if (url.startsWith('blob:')) {
			try {
				var global = Page.current
				if (!global) {
					global = Page.getApp()
				}
				const data = global.DataURL[url].array[0]
				callback.call(this, { data });
			} catch (ex) {
				console.error(ex);
			}
			return
		}
		if (url.startsWith("./")) {
			url = url.substring(2)
		}
		if (!url.startsWith("blob:") &&
			!url.startsWith("data:") &&
			!url.startsWith("mini:") &&
			!url.startsWith("http://") &&
			!url.startsWith("https://")) {
			url = (Page.getApp().onekit_path || "") + url
		}
		const mini_object = {
			url,
			dataType: "text",
			responseType: this._responseType,
			method: this._method,
			data: body,
		};
		if (this._async) {
			mini_object.success = (res) => {
				callback.call(this, res);
			};
			mini_object.fail = console.error
			this._task = Page.wx_request(mini_object);
		} else {
			try {
				const res = await run((task) => {
					this._task = task;
				}, mini_object);
				callback.call(this, res);
			} catch (ex) {
				console.error(ex);
			}
		}
	}

	set responseType(responseType) {
		this._responseType = responseType;
	}

	get responseType() {
		return this._responseType;
	}

	get status() {
		return this.response.status;
	}

	get response() {
		return this._response;
	}

	get responseText() {
		return this._responseText;
	}

	set onload(onload) {
		this._onload = onload;
	}

	get onload() {
		return this._onload;
	}

	set onerror(onerror) {
		this._onerror = onerror;
	}

	get onerror() {
		return this._onerror;
	}
};exports.default = XMLHttpRequest

}, function(modId) { var map = {"./EventTarget":1670917931013,"./core/Page":1670917931007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931042, function(require, module, exports) {
/* eslint-disable */
function DOMParser(options) {
  this.options = options || {locator: {}}
}

DOMParser.prototype.parseFromString = function(source, mimeType) {
  const options = this.options
  const sax = new XMLReader()
  const domBuilder = options.domBuilder || new DOMHandler()// contentHandler and LexicalHandler
  const errorHandler = options.errorHandler
  const locator = options.locator
  const defaultNSMap = options.xmlns || {}
  const isHTML = /\/x?html?$/.test(mimeType)// mimeType.toLowerCase().indexOf('html') > -1;
  	const entityMap = isHTML ? htmlEntity.entityMap : {
    lt: '<', gt: '>', amp: '&', quot: '"', apos: "'"
  }
  if (locator) {
    domBuilder.setDocumentLocator(locator)
  }

  sax.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator)
  sax.domBuilder = options.domBuilder || domBuilder
  if (isHTML) {
    defaultNSMap[''] = 'http://www.w3.org/1999/xhtml'
  }
  defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace'
  if (source) {
    sax.parse(source, defaultNSMap, entityMap)
  } else {
    sax.errorHandler.error('invalid doc source')
  }
  return domBuilder.doc
}
function buildErrorHandler(errorImpl, domBuilder, locator) {
  if (!errorImpl) {
    if (domBuilder instanceof DOMHandler) {
      return domBuilder
    }
    errorImpl = domBuilder
  }
  const errorHandler = {}
  const isCallback = errorImpl instanceof Function
  locator = locator || {}
  function build(key) {
    let fn = errorImpl[key]
    if (!fn && isCallback) {
      fn = errorImpl.length == 2 ? function(msg) { errorImpl(key, msg) } : errorImpl
    }
    errorHandler[key] = fn && function(msg) {
      fn('[xmldom ' + key + ']\t' + msg + _locator(locator))
    } || function() {}
  }
  build('warning')
  build('error')
  build('fatalError')
  return errorHandler
}

// console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler
 *
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
  this.cdata = false
}
function position(locator, node) {
  node.lineNumber = locator.lineNumber
  node.columnNumber = locator.columnNumber
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */
DOMHandler.prototype = {
  startDocument() {
    	this.doc = new DOMImplementation().createDocument(null, null, null)
    	if (this.locator) {
        	this.doc.documentURI = this.locator.systemId
    	}
  },
  startElement(namespaceURI, localName, qName, attrs) {
    const doc = this.doc
	    const el = doc.createElementNS(namespaceURI, qName || localName)
	    const len = attrs.length
	    appendElement(this, el)
	    this.currentElement = el

    this.locator && position(this.locator, el)
	    for (let i = 0; i < len; i++) {
	        var namespaceURI = attrs.getURI(i)
	        const value = attrs.getValue(i)
	        var qName = attrs.getQName(i)
      const attr = doc.createAttributeNS(namespaceURI, qName)
      this.locator && position(attrs.getLocator(i), attr)
      attr.value = attr.nodeValue = value
      el.setAttributeNode(attr)
	    }
  },
  endElement(namespaceURI, localName, qName) {
    const current = this.currentElement
    const tagName = current.tagName
    this.currentElement = current.parentNode
  },
  startPrefixMapping(prefix, uri) {
  },
  endPrefixMapping(prefix) {
  },
  processingInstruction(target, data) {
	    const ins = this.doc.createProcessingInstruction(target, data)
	    this.locator && position(this.locator, ins)
	    appendElement(this, ins)
  },
  ignorableWhitespace(ch, start, length) {
  },
  characters(chars, start, length) {
    chars = _toString.apply(this, arguments)
    // console.log(chars)
    if (chars) {
      if (this.cdata) {
        var charNode = this.doc.createCDATASection(chars)
      } else {
        var charNode = this.doc.createTextNode(chars)
      }
      if (this.currentElement) {
        this.currentElement.appendChild(charNode)
      } else if (/^\s*$/.test(chars)) {
        this.doc.appendChild(charNode)
        // process xml
      }
      this.locator && position(this.locator, charNode)
    }
  },
  skippedEntity(name) {
  },
  endDocument() {
    this.doc.normalize()
  },
  setDocumentLocator (locator) {
	    if (this.locator = locator) { // && !('lineNumber' in locator)){
	    	locator.lineNumber = 0
	    }
  },
  // LexicalHandler
  comment(chars, start, length) {
    chars = _toString.apply(this, arguments)
	    const comm = this.doc.createComment(chars)
	    this.locator && position(this.locator, comm)
	    appendElement(this, comm)
  },

  startCDATA() {
	    // used in characters() methods
	    this.cdata = true
  },
  endCDATA() {
	    this.cdata = false
  },

  startDTD(name, publicId, systemId) {
    const impl = this.doc.implementation
	    if (impl && impl.createDocumentType) {
	        const dt = impl.createDocumentType(name, publicId, systemId)
	        this.locator && position(this.locator, dt)
	        appendElement(this, dt)
	    }
  },
  /**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
  warning(error) {
    console.warn('[xmldom warning]\t' + error, _locator(this.locator))
  },
  error(error) {
    console.error('[xmldom error]\t' + error, _locator(this.locator))
  },
  fatalError(error) {
    console.error('[xmldom fatalError]\t' + error, _locator(this.locator))
	    throw error
  }
}
function _locator(l) {
  if (l) {
    return '\n@' + (l.systemId || '') + '#[line:' + l.lineNumber + ',col:' + l.columnNumber + ']'
  }
}
function _toString(chars, start, length) {
  if (typeof chars === 'string') {
    return chars.substr(start, length)
  } else { // java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
    if (chars.length >= start + length || start) {
      return new java.lang.String(chars, start, length) + ''
    }
    return chars
  }
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
'endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl'.replace(/\w+/g, function(key) {
  DOMHandler.prototype[key] = function() { return null }
})

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander, node) {
  if (!hander.currentElement) {
    hander.doc.appendChild(node)
  } else {
    hander.currentElement.appendChild(node)
  }
}// appendChild and setAttributeNS are preformance key

// if(typeof require == 'function'){
var htmlEntity = require('./entities')
var XMLReader = require('./sax').XMLReader
var DOMImplementation = exports.DOMImplementation = require('./dom').DOMImplementation
exports.XMLSerializer = require('./dom').XMLSerializer

exports.DOMParser = DOMParser
// }

}, function(modId) { var map = {"./entities":1670917931043,"./sax":1670917931044,"./dom":1670917931045}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931043, function(require, module, exports) {
exports.entityMap = {
  lt: '<',
  gt: '>',
  amp: '&',
  quot: '"',
  apos: "'",
  Agrave: 'À',
  Aacute: 'Á',
  Acirc: 'Â',
  Atilde: 'Ã',
  Auml: 'Ä',
  Aring: 'Å',
  AElig: 'Æ',
  Ccedil: 'Ç',
  Egrave: 'È',
  Eacute: 'É',
  Ecirc: 'Ê',
  Euml: 'Ë',
  Igrave: 'Ì',
  Iacute: 'Í',
  Icirc: 'Î',
  Iuml: 'Ï',
  ETH: 'Ð',
  Ntilde: 'Ñ',
  Ograve: 'Ò',
  Oacute: 'Ó',
  Ocirc: 'Ô',
  Otilde: 'Õ',
  Ouml: 'Ö',
  Oslash: 'Ø',
  Ugrave: 'Ù',
  Uacute: 'Ú',
  Ucirc: 'Û',
  Uuml: 'Ü',
  Yacute: 'Ý',
  THORN: 'Þ',
  szlig: 'ß',
  agrave: 'à',
  aacute: 'á',
  acirc: 'â',
  atilde: 'ã',
  auml: 'ä',
  aring: 'å',
  aelig: 'æ',
  ccedil: 'ç',
  egrave: 'è',
  eacute: 'é',
  ecirc: 'ê',
  euml: 'ë',
  igrave: 'ì',
  iacute: 'í',
  icirc: 'î',
  iuml: 'ï',
  eth: 'ð',
  ntilde: 'ñ',
  ograve: 'ò',
  oacute: 'ó',
  ocirc: 'ô',
  otilde: 'õ',
  ouml: 'ö',
  oslash: 'ø',
  ugrave: 'ù',
  uacute: 'ú',
  ucirc: 'û',
  uuml: 'ü',
  yacute: 'ý',
  thorn: 'þ',
  yuml: 'ÿ',
  nbsp: ' ',
  iexcl: '¡',
  cent: '¢',
  pound: '£',
  curren: '¤',
  yen: '¥',
  brvbar: '¦',
  sect: '§',
  uml: '¨',
  copy: '©',
  ordf: 'ª',
  laquo: '«',
  not: '¬',
  shy: '­­',
  reg: '®',
  macr: '¯',
  deg: '°',
  plusmn: '±',
  sup2: '²',
  sup3: '³',
  acute: '´',
  micro: 'µ',
  para: '¶',
  middot: '·',
  cedil: '¸',
  sup1: '¹',
  ordm: 'º',
  raquo: '»',
  frac14: '¼',
  frac12: '½',
  frac34: '¾',
  iquest: '¿',
  times: '×',
  divide: '÷',
  forall: '∀',
  part: '∂',
  exist: '∃',
  empty: '∅',
  nabla: '∇',
  isin: '∈',
  notin: '∉',
  ni: '∋',
  prod: '∏',
  sum: '∑',
  minus: '−',
  lowast: '∗',
  radic: '√',
  prop: '∝',
  infin: '∞',
  ang: '∠',
  and: '∧',
  or: '∨',
  cap: '∩',
  cup: '∪',
  int: '∫',
  there4: '∴',
  sim: '∼',
  cong: '≅',
  asymp: '≈',
  ne: '≠',
  equiv: '≡',
  le: '≤',
  ge: '≥',
  sub: '⊂',
  sup: '⊃',
  nsub: '⊄',
  sube: '⊆',
  supe: '⊇',
  oplus: '⊕',
  otimes: '⊗',
  perp: '⊥',
  sdot: '⋅',
  Alpha: 'Α',
  Beta: 'Β',
  Gamma: 'Γ',
  Delta: 'Δ',
  Epsilon: 'Ε',
  Zeta: 'Ζ',
  Eta: 'Η',
  Theta: 'Θ',
  Iota: 'Ι',
  Kappa: 'Κ',
  Lambda: 'Λ',
  Mu: 'Μ',
  Nu: 'Ν',
  Xi: 'Ξ',
  Omicron: 'Ο',
  Pi: 'Π',
  Rho: 'Ρ',
  Sigma: 'Σ',
  Tau: 'Τ',
  Upsilon: 'Υ',
  Phi: 'Φ',
  Chi: 'Χ',
  Psi: 'Ψ',
  Omega: 'Ω',
  alpha: 'α',
  beta: 'β',
  gamma: 'γ',
  delta: 'δ',
  epsilon: 'ε',
  zeta: 'ζ',
  eta: 'η',
  theta: 'θ',
  iota: 'ι',
  kappa: 'κ',
  lambda: 'λ',
  mu: 'μ',
  nu: 'ν',
  xi: 'ξ',
  omicron: 'ο',
  pi: 'π',
  rho: 'ρ',
  sigmaf: 'ς',
  sigma: 'σ',
  tau: 'τ',
  upsilon: 'υ',
  phi: 'φ',
  chi: 'χ',
  psi: 'ψ',
  omega: 'ω',
  thetasym: 'ϑ',
  upsih: 'ϒ',
  piv: 'ϖ',
  OElig: 'Œ',
  oelig: 'œ',
  Scaron: 'Š',
  scaron: 'š',
  Yuml: 'Ÿ',
  fnof: 'ƒ',
  circ: 'ˆ',
  tilde: '˜',
  ensp: ' ',
  emsp: ' ',
  thinsp: ' ',
  zwnj: '‌',
  zwj: '‍',
  lrm: '‎',
  rlm: '‏',
  ndash: '–',
  mdash: '—',
  lsquo: '‘',
  rsquo: '’',
  sbquo: '‚',
  ldquo: '“',
  rdquo: '”',
  bdquo: '„',
  dagger: '†',
  Dagger: '‡',
  bull: '•',
  hellip: '…',
  permil: '‰',
  prime: '′',
  Prime: '″',
  lsaquo: '‹',
  rsaquo: '›',
  oline: '‾',
  euro: '€',
  trade: '™',
  larr: '←',
  uarr: '↑',
  rarr: '→',
  darr: '↓',
  harr: '↔',
  crarr: '↵',
  lceil: '⌈',
  rceil: '⌉',
  lfloor: '⌊',
  rfloor: '⌋',
  loz: '◊',
  spades: '♠',
  clubs: '♣',
  hearts: '♥',
  diams: '♦'
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931044, function(require, module, exports) {
const nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/// \u10000-\uEFFFF
const nameChar = new RegExp('[\\-\\.0-9' + nameStartChar.source.slice(1, -1) + '\\u00B7\\u0300-\\u036F\\u203F-\\u2040]')
const tagNamePattern = new RegExp('^' + nameStartChar.source + nameChar.source + '*(?:\:' + nameStartChar.source + nameChar.source + '*)?$')

const S_TAG = 0// tag name offerring
const S_ATTR = 1// attr name offerring
const S_ATTR_SPACE = 2// attr name end and space offer
const S_EQ = 3//= space?
const S_ATTR_NOQUOT_VALUE = 4// attr value(no quot value only)
const S_ATTR_END = 5// attr value end and no space(quot end)
const S_TAG_SPACE = 6// (attr value end || tag end ) && (space offer)
const S_TAG_CLOSE = 7// closed el<el />

function XMLReader() {

}

XMLReader.prototype = {
  parse(source, defaultNSMap, entityMap) {
    const domBuilder = this.domBuilder
    domBuilder.startDocument()
    _copy(defaultNSMap, defaultNSMap = {})
    parse(source, defaultNSMap, entityMap,
      domBuilder, this.errorHandler)
    domBuilder.endDocument()
  }
}
function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
  function fixedFromCharCode(code) {
    // String.prototype.fromCharCode does not supports
    // > 2 bytes unicode chars directly
    if (code > 0xffff) {
      code -= 0x10000
      const surrogate1 = 0xd800 + (code >> 10)
				 const surrogate2 = 0xdc00 + (code & 0x3ff)

      return String.fromCharCode(surrogate1, surrogate2)
    } else {
      return String.fromCharCode(code)
    }
  }
  function entityReplacer(a) {
    const k = a.slice(1, -1)
    if (k in entityMap) {
      return entityMap[k]
    } else if (k.charAt(0) === '#') {
      return fixedFromCharCode(parseInt(k.substr(1).replace('x', '0x')))
    } else {
      errorHandler.error('entity not found:' + a)
      return a
    }
  }
  function appendText(end) { // has some bugs
    if (end > start) {
      const xt = source.substring(start, end).replace(/&#?\w+;/g, entityReplacer)
      locator && position(start)
      domBuilder.characters(xt, 0, end - start)
      start = end
    }
  }
  function position(p, m) {
    while (p >= lineEnd && (m = linePattern.exec(source))) {
      lineStart = m.index
      lineEnd = lineStart + m[0].length
      locator.lineNumber++
      // console.log('line++:',locator,startPos,endPos)
    }
    locator.columnNumber = p - lineStart + 1
  }
  var lineStart = 0
  var lineEnd = 0
  var linePattern = /.*(?:\r\n?|\n)|.*$/g
  var locator = domBuilder.locator

  const parseStack = [{currentNSMap: defaultNSMapCopy}]
  const closeMap = {}
  var start = 0
  while (true) {
    try {
      var tagStart = source.indexOf('<', start)
      if (tagStart < 0) {
        if (!source.substr(start).match(/^\s*$/)) {
          const doc = domBuilder.doc
	    			const text = doc.createTextNode(source.substr(start))
	    			doc.appendChild(text)
	    			domBuilder.currentElement = text
        }
        return
      }
      if (tagStart > start) {
        appendText(tagStart)
      }
      switch (source.charAt(tagStart + 1)) {
        case '/':
          var end = source.indexOf('>', tagStart + 3)
          var tagName = source.substring(tagStart + 2, end)
          var config = parseStack.pop()
          if (end < 0) {
	        		tagName = source.substring(tagStart + 2).replace(/[\s<].*/, '')
	        		// console.error('#@@@@@@'+tagName)
	        		errorHandler.error('end tag name: ' + tagName + ' is not complete:' + config.tagName)
	        		end = tagStart + 1 + tagName.length
	        	} else if (tagName.match(/\s</)) {
	        		tagName = tagName.replace(/[\s<].*/, '')
	        		errorHandler.error('end tag name: ' + tagName + ' maybe not complete')
	        		end = tagStart + 1 + tagName.length
          }
          // console.error(parseStack.length,parseStack)
          // console.error(config);
          var localNSMap = config.localNSMap
          var endMatch = config.tagName == tagName
          var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase()
		        if (endIgnoreCaseMach) {
		        	domBuilder.endElement(config.uri, config.localName, tagName)
            if (localNSMap) {
              for (const prefix in localNSMap) {
                domBuilder.endPrefixMapping(prefix)
              }
            }
            if (!endMatch) {
		            	errorHandler.fatalError('end tag name: ' + tagName + ' is not match the current start tagName:' + config.tagName)
            }
		        } else {
		        	parseStack.push(config)
		        }

          end++
          break
          // end elment
        case '?':// <?...?>
          locator && position(tagStart)
          end = parseInstruction(source, tagStart, domBuilder)
          break
        case '!':// <!doctype,<![CDATA,<!--
          locator && position(tagStart)
          end = parseDCC(source, tagStart, domBuilder, errorHandler)
          break
        default:
          locator && position(tagStart)
          var el = new ElementAttributes()
          var currentNSMap = parseStack[parseStack.length - 1].currentNSMap
          // elStartEnd
          var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler)
          var len = el.length


          if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
            el.closed = true
            if (!entityMap.nbsp) {
              errorHandler.warning('unclosed xml attribute')
            }
          }
          if (locator && len) {
            const locator2 = copyLocator(locator, {})
            // try{//attribute position fixed
            for (let i = 0; i < len; i++) {
              const a = el[i]
              position(a.offset)
              a.locator = copyLocator(locator, {})
            }
            // }catch(e){console.error('@@@@@'+e)}
            domBuilder.locator = locator2
            if (appendElement(el, domBuilder, currentNSMap)) {
              parseStack.push(el)
            }
            domBuilder.locator = locator
          } else if (appendElement(el, domBuilder, currentNSMap)) {
            parseStack.push(el)
          }


          if (el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed) {
            end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder)
          } else {
            end++
          }
      }
    } catch (e) {
      errorHandler.error('element parse error: ' + e)
      // errorHandler.error('element parse error: '+e);
      end = -1
      // throw e;
    }
    if (end > start) {
      start = end
    } else {
      // TODO: 这里有可能sax回退，有位置错误风险
      appendText(Math.max(tagStart, start) + 1)
    }
  }
}
function copyLocator(f, t) {
  t.lineNumber = f.lineNumber
  t.columnNumber = f.columnNumber
  return t
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
  let attrName
  var value
  let p = ++start
  let s = S_TAG// status
  while (true) {
    let c = source.charAt(p)
    switch (c) {
      case '=':
        if (s === S_ATTR) { // attrName
          attrName = source.slice(start, p)
          s = S_EQ
        } else if (s === S_ATTR_SPACE) {
          s = S_EQ
        } else {
          // fatalError: equal must after attrName or space after attrName
          throw new Error('attribute equal must after attrName')
        }
        break
      case '\'':
      case '"':
        if (s === S_EQ || s === S_ATTR // || s == S_ATTR_SPACE
        ) { // equal
          if (s === S_ATTR) {
            errorHandler.warning('attribute value must after "="')
            attrName = source.slice(start, p)
          }
          start = p + 1
          p = source.indexOf(c, start)
          if (p > 0) {
            value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer)
            el.add(attrName, value, start - 1)
            s = S_ATTR_END
          } else {
            // fatalError: no end quot match
            throw new Error('attribute value no end \'' + c + '\' match')
          }
        } else if (s == S_ATTR_NOQUOT_VALUE) {
          value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer)
          // console.log(attrName,value,start,p)
          el.add(attrName, value, start)
          // console.dir(el)
          errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ')!!')
          start = p + 1
          s = S_ATTR_END
        } else {
          // fatalError: no equal before
          throw new Error('attribute value must after "="')
        }
        break
      case '/':
        switch (s) {
          case S_TAG:
            el.setTagName(source.slice(start, p))
          case S_ATTR_END:
          case S_TAG_SPACE:
          case S_TAG_CLOSE:
            s = S_TAG_CLOSE
            el.closed = true
          case S_ATTR_NOQUOT_VALUE:
          case S_ATTR:
          case S_ATTR_SPACE:
            break
            // case S_EQ:
          default:
            throw new Error("attribute invalid close char('/')")
        }
        break
      case '':// end document
        // throw new Error('unexpected end of input')
        errorHandler.error('unexpected end of input')
        if (s == S_TAG) {
          el.setTagName(source.slice(start, p))
        }
        return p
      case '>':
        switch (s) {
          case S_TAG:
            el.setTagName(source.slice(start, p))
          case S_ATTR_END:
          case S_TAG_SPACE:
          case S_TAG_CLOSE:
            break// normal
          case S_ATTR_NOQUOT_VALUE:// Compatible state
          case S_ATTR:
            value = source.slice(start, p)
            if (value.slice(-1) === '/') {
              el.closed = true
              value = value.slice(0, -1)
            }
          case S_ATTR_SPACE:
            if (s === S_ATTR_SPACE) {
              value = attrName
            }
            if (s == S_ATTR_NOQUOT_VALUE) {
              errorHandler.warning('attribute "' + value + '" missed quot(")!!')
              el.add(attrName, value.replace(/&#?\w+;/g, entityReplacer), start)
            } else {
              if (currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)) {
                errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!')
              }
              el.add(value, value, start)
            }
            break
          case S_EQ:
            throw new Error('attribute value missed!!')
        }
        //			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
        return p
        /* xml space '\x20' | #x9 | #xD | #xA; */
      case '\u0080':
        c = ' '
      default:
        if (c <= ' ') { // space
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p))// tagName
              s = S_TAG_SPACE
              break
            case S_ATTR:
              attrName = source.slice(start, p)
              s = S_ATTR_SPACE
              break
            case S_ATTR_NOQUOT_VALUE:
              var value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer)
              errorHandler.warning('attribute "' + value + '" missed quot(")!!')
              el.add(attrName, value, start)
            case S_ATTR_END:
              s = S_TAG_SPACE
              break
				// case S_TAG_SPACE:
				// case S_EQ:
				// case S_ATTR_SPACE:
				//	void();break;
				// case S_TAG_CLOSE:
					// ignore warning
          }
        } else { // not space
          // S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
          // S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
          switch (s) {
            // case S_TAG:void();break;
            // case S_ATTR:void();break;
            // case S_ATTR_NOQUOT_VALUE:void();break;
            case S_ATTR_SPACE:
              var tagName = el.tagName
              if (currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!')
              }
              el.add(attrName, attrName, start)
              start = p
              s = S_ATTR
              break
            case S_ATTR_END:
              errorHandler.warning('attribute space is required"' + attrName + '"!!')
            case S_TAG_SPACE:
              s = S_ATTR
              start = p
              break
            case S_EQ:
              s = S_ATTR_NOQUOT_VALUE
              start = p
              break
            case S_TAG_CLOSE:
              throw new Error("elements closed character '/' and '>' must be connected to")
          }
        }
    }// end outer switch
    // console.log('p++',p)
    p++
  }
}
/**
 * @return true if has new namespace define
 */
function appendElement(el, domBuilder, currentNSMap) {
  const tagName = el.tagName
  let localNSMap = null
  // var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
  var i = el.length
  while (i--) {
    var a = el[i]
    const qName = a.qName
    const value = a.value
    var nsp = qName.indexOf(':')
    if (nsp > 0) {
      var prefix = a.prefix = qName.slice(0, nsp)
      var localName = qName.slice(nsp + 1)
      var nsPrefix = prefix === 'xmlns' && localName
    } else {
      localName = qName
      prefix = null
      nsPrefix = qName === 'xmlns' && ''
    }
    // can not set prefix,because prefix !== ''
    a.localName = localName
    // prefix == null for no ns prefix attribute
    if (nsPrefix !== false) { // hack!!
      if (localNSMap == null) {
        localNSMap = {}
        // console.log(currentNSMap,0)
        _copy(currentNSMap, currentNSMap = {})
        // console.log(currentNSMap,1)
      }
      currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value
      a.uri = 'http://www.w3.org/2000/xmlns/'
      domBuilder.startPrefixMapping(nsPrefix, value)
    }
  }
  var i = el.length
  while (i--) {
    a = el[i]
    var prefix = a.prefix
    if (prefix) { // no prefix attribute has no namespace
      if (prefix === 'xml') {
        a.uri = 'http://www.w3.org/XML/1998/namespace'
      } if (prefix !== 'xmlns') {
        a.uri = currentNSMap[prefix || '']

        // {console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
      }
    }
  }
  var nsp = tagName.indexOf(':')
  if (nsp > 0) {
    prefix = el.prefix = tagName.slice(0, nsp)
    localName = el.localName = tagName.slice(nsp + 1)
  } else {
    prefix = null// important!!
    localName = el.localName = tagName
  }
  // no prefix element has default namespace
  const ns = el.uri = currentNSMap[prefix || '']
  domBuilder.startElement(ns, localName, tagName, el)
  // endPrefixMapping and startPrefixMapping have not any help for dom builder
  // localNSMap = null
  if (el.closed) {
    domBuilder.endElement(ns, localName, tagName)
    if (localNSMap) {
      for (prefix in localNSMap) {
        domBuilder.endPrefixMapping(prefix)
      }
    }
  } else {
    el.currentNSMap = currentNSMap
    el.localNSMap = localNSMap
    // parseStack.push(el);
    return true
  }
}
function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
  if (/^(?:script|textarea)$/i.test(tagName)) {
    const elEndStart = source.indexOf('</' + tagName + '>', elStartEnd)
    let text = source.substring(elStartEnd + 1, elEndStart)
    if (/[&<]/.test(text)) {
      if (/^script$/i.test(tagName)) {
        // if(!/\]\]>/.test(text)){
        // lexHandler.startCDATA();
        domBuilder.characters(text, 0, text.length)
        // lexHandler.endCDATA();
        return elEndStart
        // }
      }// }else{//text area
      text = text.replace(/&#?\w+;/g, entityReplacer)
      domBuilder.characters(text, 0, text.length)
      return elEndStart
      // }
    }
  }
  return elStartEnd + 1
}
function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
  // if(tagName in closeMap){
  let pos = closeMap[tagName]
  if (pos == null) {
    // console.log(tagName)
    pos = source.lastIndexOf('</' + tagName + '>')
    if (pos < elStartEnd) { // 忘记闭合
      pos = source.lastIndexOf('</' + tagName)
    }
    closeMap[tagName] = pos
  }
  return pos < elStartEnd
  // }
}
function _copy(source, target) {
  for (const n in source) { target[n] = source[n] }
}
function parseDCC(source, start, domBuilder, errorHandler) { // sure start with '<!'
  const next = source.charAt(start + 2)
  switch (next) {
    case '-':
      if (source.charAt(start + 3) === '-') {
        var end = source.indexOf('-->', start + 4)
        // append comment source.substring(4,end)//<!--
        if (end > start) {
          domBuilder.comment(source, start + 4, end - start - 4)
          return end + 3
        } else {
          errorHandler.error('Unclosed comment')
          return -1
        }
      } else {
        // error
        return -1
      }
    default:
      if (source.substr(start + 3, 6) == 'CDATA[') {
        var end = source.indexOf(']]>', start + 9)
        domBuilder.startCDATA()
        domBuilder.characters(source, start + 9, end - start - 9)
        domBuilder.endCDATA()
        return end + 3
      }
      // <!DOCTYPE
      // startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId)
      var matchs = split(source, start)
      var len = matchs.length
      if (len > 1 && /!doctype/i.test(matchs[0][0])) {
        const name = matchs[1][0]
        const pubid = len > 3 && /^public$/i.test(matchs[2][0]) && matchs[3][0]
        const sysid = len > 4 && matchs[4][0]
        const lastMatch = matchs[len - 1]
        domBuilder.startDTD(name, pubid && pubid.replace(/^(['"])(.*?)\1$/, '$2'),
          sysid && sysid.replace(/^(['"])(.*?)\1$/, '$2'))
        domBuilder.endDTD()

        return lastMatch.index + lastMatch[0].length
      }
  }
  return -1
}


function parseInstruction(source, start, domBuilder) {
  const end = source.indexOf('?>', start)
  if (end) {
    const match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/)
    if (match) {
      const len = match[0].length
      domBuilder.processingInstruction(match[1], match[2])
      return end + 2
    } else { // error
      return -1
    }
  }
  return -1
}

/**
 * @param source
 */
function ElementAttributes(source) {

}
ElementAttributes.prototype = {
  setTagName(tagName) {
    if (!tagNamePattern.test(tagName)) {
      throw new Error('invalid tagName:' + tagName)
    }
    this.tagName = tagName
  },
  add(qName, value, offset) {
    if (!tagNamePattern.test(qName)) {
      throw new Error('invalid attribute:' + qName)
    }
    this[this.length++] = {qName, value, offset}
  },
  length: 0,
  getLocalName(i) { return this[i].localName },
  getLocator(i) { return this[i].locator },
  getQName(i) { return this[i].qName },
  getURI(i) { return this[i].uri },
  getValue(i) { return this[i].value }
}


function split(source, start) {
  let match
  const buf = []
  const reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g
  reg.lastIndex = start
  reg.exec(source)// skip <
  while (match = reg.exec(source)) {
    buf.push(match)
    if (match[1]) return buf
  }
}

exports.XMLReader = XMLReader

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931045, function(require, module, exports) {
var __TEMP__ = require('../../CSSStyleDeclaration');var CSSStyleDeclaration = __REQUIRE_DEFAULT__(__TEMP__);
function copy(src, dest) {
  for (const p in src) {
    dest[p] = src[p]
  }
}

function _extends(Class, Super) {
  let pt = Class.prototype
  if (!(pt instanceof Super)) {
    function t() { }
    t.prototype = Super.prototype
    t = new t()
    copy(pt, t)
    Class.prototype = pt = t
  }
  if (pt.constructor != Class) {
    if (typeof Class !== 'function') {
      console.error('unknow Class:' + Class)
    }
    pt.constructor = Class
  }
}
const htmlns = 'http://www.w3.org/1999/xhtml'
// Node Types
const NodeType = {}
const ELEMENT_NODE = NodeType.ELEMENT_NODE = 1
const ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2
const TEXT_NODE = NodeType.TEXT_NODE = 3
const CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4
const ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5
const ENTITY_NODE = NodeType.ENTITY_NODE = 6
const PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7
const COMMENT_NODE = NodeType.COMMENT_NODE = 8
const DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9
const DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10
const DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11
const NOTATION_NODE = NodeType.NOTATION_NODE = 12

// ExceptionCode
const ExceptionCode = {}
const ExceptionMessage = {}
const INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = ((ExceptionMessage[1] = 'Index size error'), 1)
const DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = ((ExceptionMessage[2] = 'DOMString size error'), 2)
const HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = ((ExceptionMessage[3] = 'Hierarchy request error'), 3)
const WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = ((ExceptionMessage[4] = 'Wrong document'), 4)
const INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = ((ExceptionMessage[5] = 'Invalid character'), 5)
const NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = ((ExceptionMessage[6] = 'No data allowed'), 6)
const NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7] = 'No modification allowed'), 7)
const NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = ((ExceptionMessage[8] = 'Not found'), 8)
const NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = ((ExceptionMessage[9] = 'Not supported'), 9)
const INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = ((ExceptionMessage[10] = 'Attribute in use'), 10)
// level2
const INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = ((ExceptionMessage[11] = 'Invalid state'), 11)
const SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = ((ExceptionMessage[12] = 'Syntax error'), 12)
const INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = ((ExceptionMessage[13] = 'Invalid modification'), 13)
const NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = ((ExceptionMessage[14] = 'Invalid namespace'), 14)
const INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = ((ExceptionMessage[15] = 'Invalid access'), 15)


function DOMException(code, message) {
  if (message instanceof Error) {
    var error = message
  } else {
    error = this
    Error.call(this, ExceptionMessage[code])
    this.message = ExceptionMessage[code]
    if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException)
  }
  error.code = code
  if (message) this.message = this.message + ': ' + message
  return error
}
DOMException.prototype = Error.prototype
copy(ExceptionCode, DOMException)
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
}
NodeList.prototype = {
  /**
   * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
   * @standard level1
   */
  length: 0,
  /**
   * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
   * @standard level1
   * @param index  unsigned long
   *   Index into the collection.
   * @return Node
   * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
   */
  item(index) {
    return this[index] || null
  },
  toString(isHTML, nodeFilter) {
    for (var buf = [], i = 0; i < this.length; i++) {
      serializeToString(this[i], buf, isHTML, nodeFilter)
    }
    return buf.join('')
  }
}
function LiveNodeList(node, refresh) {
  this._node = node
  this._refresh = refresh
  _updateLiveList(this)
}
function _updateLiveList(list) {
  const inc = list._node._inc || list._node.ownerDocument._inc
  if (list._inc != inc) {
    const ls = list._refresh(list._node)
    // console.log(ls.length)
    __set__(list, 'length', ls.length)
    copy(ls, list)
    list._inc = inc
  }
}
LiveNodeList.prototype.item = function (i) {
  _updateLiveList(this)
  return this[i]
}

_extends(LiveNodeList, NodeList)

function NamedNodeMap() {
}

function _findNodeIndex(list, node) {
  let i = list.length
  while (i--) {
    if (list[i] === node) { return i }
  }
}

function _addNamedNode(el, list, newAttr, oldAttr) {
  if (oldAttr) {
    list[_findNodeIndex(list, oldAttr)] = newAttr
  } else {
    list[list.length++] = newAttr
  }
  if (el) {
    newAttr.ownerElement = el
    const doc = el.ownerDocument
    if (doc) {
      oldAttr && _onRemoveAttribute(doc, el, oldAttr)
      _onAddAttribute(doc, el, newAttr)
    }
  }
}
function _removeNamedNode(el, list, attr) {
  // console.log('remove attr:'+attr)
  let i = _findNodeIndex(list, attr)
  if (i >= 0) {
    const lastIndex = list.length - 1
    while (i < lastIndex) {
      list[i] = list[++i]
    }
    list.length = lastIndex
    if (el) {
      const doc = el.ownerDocument
      if (doc) {
        _onRemoveAttribute(doc, el, attr)
        attr.ownerElement = null
      }
    }
  } else {
    throw DOMException(NOT_FOUND_ERR, new Error(el.tagName + '@' + attr))
  }
}
NamedNodeMap.prototype = {
  length: 0,
  item: NodeList.prototype.item,
  getNamedItem(key) {
    //		if(key.indexOf(':')>0 || key == 'xmlns'){
    //			return null;
    //		}
    // console.log()
    let i = this.length
    while (i--) {
      const attr = this[i]
      // console.log(attr.nodeName,key)
      if (attr.nodeName == key) {
        return attr
      }
    }
  },
  setNamedItem(attr) {
    const el = attr.ownerElement
    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR)
    }
    const oldAttr = this.getNamedItem(attr.nodeName)
    _addNamedNode(this._ownerElement, this, attr, oldAttr)
    return oldAttr
  },
  /* returns Node */
  setNamedItemNS(attr) { // raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
    const el = attr.ownerElement; let
      oldAttr
    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR)
    }
    oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName)
    _addNamedNode(this._ownerElement, this, attr, oldAttr)
    return oldAttr
  },

  /* returns Node */
  removeNamedItem(key) {
    const attr = this.getNamedItem(key)
    _removeNamedNode(this._ownerElement, this, attr)
    return attr
  }, // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR

  // for level2
  removeNamedItemNS(namespaceURI, localName) {
    const attr = this.getNamedItemNS(namespaceURI, localName)
    _removeNamedNode(this._ownerElement, this, attr)
    return attr
  },
  getNamedItemNS(namespaceURI, localName) {
    let i = this.length
    while (i--) {
      const node = this[i]
      if (node.localName == localName && node.namespaceURI == namespaceURI) {
        return node
      }
    }
    return null
  }
}
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation(/* Object */ features) {
  this._features = {}
  if (features) {
    for (const feature in features) {
      this._features = features[feature]
    }
  }
}

DOMImplementation.prototype = {
  hasFeature(/* string */ feature, /* string */ version) {
    const versions = this._features[feature.toLowerCase()]
    if (versions && (!version || version in versions)) {
      return true
    } else {
      return false
    }
  },
  // Introduced in DOM Level 2:
  createDocument(namespaceURI, qualifiedName, doctype) { // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
    const doc = new Document()
    doc.implementation = this
    doc.childNodes = new NodeList()
    doc.doctype = doctype
    if (doctype) {
      doc.appendChild(doctype)
    }
    if (qualifiedName) {
      const root = doc.createElementNS(namespaceURI, qualifiedName)
      doc.appendChild(root)
    }
    return doc
  },
  // Introduced in DOM Level 2:
  createDocumentType(qualifiedName, publicId, systemId) { // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
    const node = new DocumentType()
    node.name = qualifiedName
    node.nodeName = qualifiedName
    node.publicId = publicId
    node.systemId = systemId
    // Introduced in DOM Level 2:
    // readonly attribute DOMString        internalSubset;

    // TODO:..
    //  readonly attribute NamedNodeMap     entities;
    //  readonly attribute NamedNodeMap     notations;
    return node
  }
}


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
}

Node.prototype = {
  firstChild: null,
  lastChild: null,
  previousSibling: null,
  nextSibling: null,
  attributes: null,
  parentNode: null,
  childNodes: null,
  ownerDocument: null,
  nodeValue: null,
  namespaceURI: null,
  prefix: null,
  localName: null,
  // Modified in DOM Level 2:
  insertBefore(newChild, refChild) { // raises
    return _insertBefore(this, newChild, refChild)
  },
  replaceChild(newChild, oldChild) { // raises
    this.insertBefore(newChild, oldChild)
    if (oldChild) {
      this.removeChild(oldChild)
    }
  },
  removeChild(oldChild) {
    return _removeChild(this, oldChild)
  },
  appendChild(newChild) {
    return this.insertBefore(newChild, null)
  },
  hasChildNodes() {
    return this.firstChild != null
  },
  cloneNode(deep) {
    return cloneNode(this.ownerDocument || this, this, deep)
  },
  // Modified in DOM Level 2:
  normalize() {
    let child = this.firstChild
    while (child) {
      const next = child.nextSibling
      if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
        this.removeChild(next)
        child.appendData(next.data)
      } else {
        child.normalize()
        child = next
      }
    }
  },
  // Introduced in DOM Level 2:
  isSupported(feature, version) {
    return this.ownerDocument.implementation.hasFeature(feature, version)
  },
  // Introduced in DOM Level 2:
  hasAttributes() {
    return this.attributes.length > 0
  },
  lookupPrefix(namespaceURI) {
    let el = this
    while (el) {
      const map = el._nsMap
      // console.dir(map)
      if (map) {
        for (const n in map) {
          if (map[n] == namespaceURI) {
            return n
          }
        }
      }
      el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode
    }
    return null
  },
  // Introduced in DOM Level 3:
  lookupNamespaceURI(prefix) {
    let el = this
    while (el) {
      const map = el._nsMap
      // console.dir(map)
      if (map) {
        if (prefix in map) {
          return map[prefix]
        }
      }
      el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode
    }
    return null
  },
  // Introduced in DOM Level 3:
  isDefaultNamespace(namespaceURI) {
    const prefix = this.lookupPrefix(namespaceURI)
    return prefix == null
  }
}


function _xmlEncoder(c) {
  return c == '<' && '&lt;' ||
    c == '>' && '&gt;' ||
    c == '&' && '&amp;' ||
    c == '"' && '&quot;' ||
    '&#' + c.charCodeAt() + ';'
}


copy(NodeType, Node)
copy(NodeType, Node.prototype)

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node, callback) {
  if (callback(node)) {
    return true
  }
  if (node = node.firstChild) {
    do {
      if (_visitNode(node, callback)) { return true }
    } while (node = node.nextSibling)
  }
}


function Document() {
}
function _onAddAttribute(doc, el, newAttr) {
  doc && doc._inc++
  const ns = newAttr.namespaceURI
  if (ns == 'http://www.w3.org/2000/xmlns/') {
    // update namespace
    el._nsMap[newAttr.prefix ? newAttr.localName : ''] = newAttr.value
  }
}
function _onRemoveAttribute(doc, el, newAttr, remove) {
  doc && doc._inc++
  const ns = newAttr.namespaceURI
  if (ns == 'http://www.w3.org/2000/xmlns/') {
    // update namespace
    delete el._nsMap[newAttr.prefix ? newAttr.localName : '']
  }
}
function _onUpdateChild(doc, el, newChild) {
  if (doc && doc._inc) {
    doc._inc++
    // update childNodes
    const cs = el.childNodes
    if (newChild) {
      cs[cs.length++] = newChild
    } else {
      // console.log(1)
      let child = el.firstChild
      let i = 0
      while (child) {
        cs[i++] = child
        child = child.nextSibling
      }
      cs.length = i
    }
  }
}

function _removeChild(parentNode, child) {
  const previous = child.previousSibling
  const next = child.nextSibling
  if (previous) {
    previous.nextSibling = next
  } else {
    parentNode.firstChild = next
  }
  if (next) {
    next.previousSibling = previous
  } else {
    parentNode.lastChild = previous
  }
  _onUpdateChild(parentNode.ownerDocument, parentNode)
  return child
}
/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode, newChild, nextChild) {
  const cp = newChild.parentNode
  if (cp) {
    cp.removeChild(newChild)// remove and update
  }
  if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
    var newFirst = newChild.firstChild
    if (newFirst == null) {
      return newChild
    }
    var newLast = newChild.lastChild
  } else {
    newFirst = newLast = newChild
  }
  const pre = nextChild ? nextChild.previousSibling : parentNode.lastChild

  newFirst.previousSibling = pre
  newLast.nextSibling = nextChild


  if (pre) {
    pre.nextSibling = newFirst
  } else {
    parentNode.firstChild = newFirst
  }
  if (nextChild == null) {
    parentNode.lastChild = newLast
  } else {
    nextChild.previousSibling = newLast
  }
  do {
    newFirst.parentNode = parentNode
  } while (newFirst !== newLast && (newFirst = newFirst.nextSibling))
  _onUpdateChild(parentNode.ownerDocument || parentNode, parentNode)
  // console.log(parentNode.lastChild.nextSibling == null)
  if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
    newChild.firstChild = newChild.lastChild = null
  }
  return newChild
}
function _appendSingleChild(parentNode, newChild) {
  const cp = newChild.parentNode
  if (cp) {
    var pre = parentNode.lastChild
    cp.removeChild(newChild)// remove and update
    var pre = parentNode.lastChild
  }
  var pre = parentNode.lastChild
  newChild.parentNode = parentNode
  newChild.previousSibling = pre
  newChild.nextSibling = null
  if (pre) {
    pre.nextSibling = newChild
  } else {
    parentNode.firstChild = newChild
  }
  parentNode.lastChild = newChild
  _onUpdateChild(parentNode.ownerDocument, parentNode, newChild)
  return newChild
  // console.log("__aa",parentNode.lastChild.nextSibling == null)
}
Document.prototype = {
  // implementation : null,
  nodeName: '#document',
  nodeType: DOCUMENT_NODE,
  doctype: null,
  documentElement: null,
  _inc: 1,

  insertBefore(newChild, refChild) { // raises
    if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
      let child = newChild.firstChild
      while (child) {
        const next = child.nextSibling
        this.insertBefore(child, refChild)
        child = next
      }
      return newChild
    }
    if (this.documentElement == null && newChild.nodeType == ELEMENT_NODE) {
      this.documentElement = newChild
    }

    return _insertBefore(this, newChild, refChild), (newChild.ownerDocument = this), newChild
  },
  removeChild(oldChild) {
    if (this.documentElement == oldChild) {
      this.documentElement = null
    }
    return _removeChild(this, oldChild)
  },
  // Introduced in DOM Level 2:
  importNode(importedNode, deep) {
    return importNode(this, importedNode, deep)
  },
  // Introduced in DOM Level 2:
  getElementById(id) {
    let rtv = null
    _visitNode(this.documentElement, function (node) {
      if (node.nodeType == ELEMENT_NODE) {
        if (node.getAttribute('id') == id) {
          rtv = node
          return true
        }
      }
    })
    return rtv
  },

  // document factory method:
  createElement(tagName) {
    const node = new Element()
    node.ownerDocument = this
    node.nodeName = tagName
    node.tagName = tagName
    node.childNodes = new NodeList()
    const attrs = node.attributes = new NamedNodeMap()
    attrs._ownerElement = node
    return node
  },
  createDocumentFragment() {
    const node = new DocumentFragment()
    node.ownerDocument = this
    node.childNodes = new NodeList()
    return node
  },
  createTextNode(data) {
    const node = new Text()
    node.ownerDocument = this
    node.appendData(data)
    return node
  },
  createComment(data) {
    const node = new Comment()
    node.ownerDocument = this
    node.appendData(data)
    return node
  },
  createCDATASection(data) {
    const node = new CDATASection()
    node.ownerDocument = this
    node.appendData(data)
    return node
  },
  createProcessingInstruction(target, data) {
    const node = new ProcessingInstruction()
    node.ownerDocument = this
    node.tagName = node.target = target
    node.nodeValue = node.data = data
    return node
  },
  createAttribute(name) {
    const node = new Attr()
    node.ownerDocument = this
    node.name = name
    node.nodeName = name
    node.localName = name
    node.specified = true
    return node
  },
  createEntityReference(name) {
    const node = new EntityReference()
    node.ownerDocument = this
    node.nodeName = name
    return node
  },
  // Introduced in DOM Level 2:
  createElementNS(namespaceURI, qualifiedName) {
    const node = new Element()
    const pl = qualifiedName.split(':')
    const attrs = node.attributes = new NamedNodeMap()
    node.childNodes = new NodeList()
    node.ownerDocument = this
    node.nodeName = qualifiedName
    node.tagName = qualifiedName
    node.namespaceURI = namespaceURI
    if (pl.length == 2) {
      node.prefix = pl[0]
      node.localName = pl[1]
    } else {
      // el.prefix = null;
      node.localName = qualifiedName
    }
    attrs._ownerElement = node
    return node
  },
  // Introduced in DOM Level 2:
  createAttributeNS(namespaceURI, qualifiedName) {
    const node = new Attr()
    const pl = qualifiedName.split(':')
    node.ownerDocument = this
    node.nodeName = qualifiedName
    node.name = qualifiedName
    node.namespaceURI = namespaceURI
    node.specified = true
    if (pl.length == 2) {
      node.prefix = pl[0]
      node.localName = pl[1]
    } else {
      // el.prefix = null;
      node.localName = qualifiedName
    }
    return node
  }
}
_extends(Document, Node)


function Element() {
  this._nsMap = {}
}
Element.prototype = {
  nodeType: ELEMENT_NODE,
  hasAttribute(name) {
    return this.getAttributeNode(name) != null
  },
  getAttribute(name) {
    const attr = this.getAttributeNode(name)
    return attr && attr.value || ''
  },
  getAttributeNode(name) {
    return this.attributes.getNamedItem(name)
  },
  setAttribute(name, value) {
    const attr = this.ownerDocument.createAttribute(name)
    attr.value = attr.nodeValue = '' + value
    this.setAttributeNode(attr)
  },
  removeAttribute(name) {
    const attr = this.getAttributeNode(name)
    attr && this.removeAttributeNode(attr)
  },

  // four real opeartion method
  appendChild(newChild) {
    if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return this.insertBefore(newChild, null)
    } else {
      return _appendSingleChild(this, newChild)
    }
  },
  setAttributeNode(newAttr) {
    const value = newAttr.value
    if(newAttr.name=="style"){
      
      this.style = CSSStyleDeclaration.parse(value)
    }
    this.attributes[newAttr.name] = { value, textContent: value == null ? "" : value.toString() }
    return this.attributes.setNamedItem(newAttr)
  },
  setAttributeNodeNS(newAttr) {
    return this.attributes.setNamedItemNS(newAttr)
  },
  removeAttributeNode(oldAttr) {
    // console.log(this == oldAttr.ownerElement)
    return this.attributes.removeNamedItem(oldAttr.nodeName)
  },
  // get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS(namespaceURI, localName) {
    const old = this.getAttributeNodeNS(namespaceURI, localName)
    old && this.removeAttributeNode(old)
  },

  hasAttributeNS(namespaceURI, localName) {
    return this.getAttributeNodeNS(namespaceURI, localName) != null
  },
  getAttributeNS(namespaceURI, localName) {
    const attr = this.getAttributeNodeNS(namespaceURI, localName)
    return attr && attr.value || ''
  },
  setAttributeNS(namespaceURI, qualifiedName, value) {
    const attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName)
    attr.value = attr.nodeValue = '' + value
    this.setAttributeNode(attr)
  },
  getAttributeNodeNS(namespaceURI, localName) {
    return this.attributes.getNamedItemNS(namespaceURI, localName)
  },

  getElementsByTagName(tagName) {
    return new LiveNodeList(this, function (base) {
      const ls = []
      _visitNode(base, function (node) {
        if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName
        || node.tagName.endsWith(":"+tagName))) {
          ls.push(node)
        }
      })
      return ls
    })
  },
  getElementsByTagNameNS(namespaceURI, localName) {
    return new LiveNodeList(this, function (base) {
      const ls = []
      _visitNode(base, function (node) {
        if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)) {
          ls.push(node)
        }
      })
      return ls
    })
  }
}

Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS
Element.prototype.querySelectorAll = function (selector) {
  const paths = selector.split(" ")
  let parents = [this]
  for (const path of paths) {
    const temp = []
    for (const parent of parents) {
      const children = parent.getElementsByTagName(path)
      for (var i = 0; i < children.length; i++) {
        temp.push(children[i])
      }
    }
    parents = temp.concat();
  }
  return parents
}
Element.prototype.querySelector = function (selector) {
  return this.querySelectorAll(selector)[0]
}
Document.prototype.querySelectorAll = Element.prototype.querySelectorAll 
Document.prototype.querySelector = Element.prototype.querySelector 

_extends(Element, Node)
function Attr() {
}
Attr.prototype.nodeType = ATTRIBUTE_NODE
_extends(Attr, Node)


function CharacterData() {
}
CharacterData.prototype = {
  data: '',
  substringData(offset, count) {
    return this.data.substring(offset, offset + count)
  },
  appendData(text) {
    text = this.data + text
    this.nodeValue = this.data = text
    this.length = text.length
  },
  insertData(offset, text) {
    this.replaceData(offset, 0, text)
  },
  appendChild(newChild) {
    throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
  },
  deleteData(offset, count) {
    this.replaceData(offset, count, '')
  },
  replaceData(offset, count, text) {
    const start = this.data.substring(0, offset)
    const end = this.data.substring(offset + count)
    text = start + text + end
    this.nodeValue = this.data = text
    this.length = text.length
  }
}
_extends(CharacterData, Node)
function Text() {
}
Text.prototype = {
  nodeName: '#text',
  nodeType: TEXT_NODE,
  splitText(offset) {
    let text = this.data
    const newText = text.substring(offset)
    text = text.substring(0, offset)
    this.data = this.nodeValue = text
    this.length = text.length
    const newNode = this.ownerDocument.createTextNode(newText)
    if (this.parentNode) {
      this.parentNode.insertBefore(newNode, this.nextSibling)
    }
    return newNode
  }
}
_extends(Text, CharacterData)
function Comment() {
}
Comment.prototype = {
  nodeName: '#comment',
  nodeType: COMMENT_NODE
}
_extends(Comment, CharacterData)

function CDATASection() {
}
CDATASection.prototype = {
  nodeName: '#cdata-section',
  nodeType: CDATA_SECTION_NODE
}
_extends(CDATASection, CharacterData)


function DocumentType() {
}
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE
_extends(DocumentType, Node)

function Notation() {
}
Notation.prototype.nodeType = NOTATION_NODE
_extends(Notation, Node)

function Entity() {
}
Entity.prototype.nodeType = ENTITY_NODE
_extends(Entity, Node)

function EntityReference() {
}
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE
_extends(EntityReference, Node)

function DocumentFragment() {
}
DocumentFragment.prototype.nodeName = '#document-fragment'
DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE
_extends(DocumentFragment, Node)


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE
_extends(ProcessingInstruction, Node)
function XMLSerializer() { }
XMLSerializer.prototype.serializeToString = function (node, isHtml, nodeFilter) {
  return nodeSerializeToString.call(node, isHtml, nodeFilter)
}
Node.prototype.toString = nodeSerializeToString
function nodeSerializeToString(isHtml, nodeFilter) {
  const buf = []
  const refNode = this.nodeType == 9 && this.documentElement || this
  var prefix = refNode.prefix
  const uri = refNode.namespaceURI

  if (uri && prefix == null) {
    // console.log(prefix)
    var prefix = refNode.lookupPrefix(uri)
    if (prefix == null) {
      // isHTML = true;
      var visibleNamespaces = [
        { namespace: uri, prefix: null }
        // {namespace:uri,prefix:''}
      ]
    }
  }
  serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces)
  // console.log('###',this.nodeType,uri,prefix,buf.join(''))
  return buf.join('')
}
function needNamespaceDefine(node, isHTML, visibleNamespaces) {
  const prefix = node.prefix || ''
  const uri = node.namespaceURI
  if (!prefix && !uri) {
    return false
  }
  if (prefix === 'xml' && uri === 'http://www.w3.org/XML/1998/namespace' ||
    uri == 'http://www.w3.org/2000/xmlns/') {
    return false
  }

  let i = visibleNamespaces.length
  // console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
  while (i--) {
    const ns = visibleNamespaces[i]
    // get namespace prefix
    // console.log(node.nodeType,node.tagName,ns.prefix,prefix)
    if (ns.prefix == prefix) {
      return ns.namespace != uri
    }
  }
  // console.log(isHTML,uri,prefix=='')
  // if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
  //	return false;
  // }
  // node.flag = '11111'
  // console.error(3,true,node.flag,node.prefix,node.namespaceURI)
  return true
}
function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
  if (nodeFilter) {
    node = nodeFilter(node)
    if (node) {
      if (typeof node === 'string') {
        buf.push(node)
        return
      }
    } else {
      return
    }
    // buf.sort.apply(attrs, attributeSorter);
  }
  switch (node.nodeType) {
    case ELEMENT_NODE:
      if (!visibleNamespaces) visibleNamespaces = []
      var startVisibleNamespaces = visibleNamespaces.length
      var attrs = node.attributes
      var len = attrs.length
      var child = node.firstChild
      var nodeName = node.tagName

      isHTML = (htmlns === node.namespaceURI) || isHTML
      buf.push('<', nodeName)


      for (var i = 0; i < len; i++) {
        var attr = attrs.item(i)
        if (attr.prefix == 'xmlns') {
          visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value })
        } else if (attr.nodeName == 'xmlns') {
          visibleNamespaces.push({ prefix: '', namespace: attr.value })
        }
      }
      for (var i = 0; i < len; i++) {
        var attr = attrs.item(i)
        if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
          var prefix = attr.prefix || ''
          var uri = attr.namespaceURI
          var ns = prefix ? ' xmlns:' + prefix : ' xmlns'
          buf.push(ns, '="', uri, '"')
          visibleNamespaces.push({ prefix, namespace: uri })
        }
        serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces)
      }
      // add namespace for current node
      if (needNamespaceDefine(node, isHTML, visibleNamespaces)) {
        var prefix = node.prefix || ''
        var uri = node.namespaceURI
        var ns = prefix ? ' xmlns:' + prefix : ' xmlns'
        buf.push(ns, '="', uri, '"')
        visibleNamespaces.push({ prefix, namespace: uri })
      }

      if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
        buf.push('>')
        // if is cdata child node
        if (isHTML && /^script$/i.test(nodeName)) {
          while (child) {
            if (child.data) {
              buf.push(child.data)
            } else {
              serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces)
            }
            child = child.nextSibling
          }
        } else {
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces)
            child = child.nextSibling
          }
        }
        buf.push('</', nodeName, '>')
      } else {
        buf.push('/>')
      }
      // remove added visible namespaces
      // visibleNamespaces.length = startVisibleNamespaces;
      return
    case DOCUMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      var child = node.firstChild
      while (child) {
        serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces)
        child = child.nextSibling
      }
      return
    case ATTRIBUTE_NODE:
      return buf.push(' ', node.name, '="', node.value.replace(/[<&"]/g, _xmlEncoder), '"')
    case TEXT_NODE:
      return buf.push(node.data.replace(/[<&]/g, _xmlEncoder))
    case CDATA_SECTION_NODE:
      return buf.push('<![CDATA[', node.data, ']]>')
    case COMMENT_NODE:
      return buf.push('<!--', node.data, '-->')
    case DOCUMENT_TYPE_NODE:
      var pubid = node.publicId
      var sysid = node.systemId
      buf.push('<!DOCTYPE ', node.name)
      if (pubid) {
        buf.push(' PUBLIC "', pubid)
        if (sysid && sysid != '.') {
          buf.push('" "', sysid)
        }
        buf.push('">')
      } else if (sysid && sysid != '.') {
        buf.push(' SYSTEM "', sysid, '">')
      } else {
        const sub = node.internalSubset
        if (sub) {
          buf.push(' [', sub, ']')
        }
        buf.push('>')
      }
      return
    case PROCESSING_INSTRUCTION_NODE:
      return buf.push('<?', node.target, ' ', node.data, '?>')
    case ENTITY_REFERENCE_NODE:
      return buf.push('&', node.nodeName, ';')
    // case ENTITY_NODE:
    // case NOTATION_NODE:
    default:
      buf.push('??', node.nodeName)
  }
}
function importNode(doc, node, deep) {
  let node2
  switch (node.nodeType) {
    case ELEMENT_NODE:
      node2 = node.cloneNode(false)
      node2.ownerDocument = doc

    case DOCUMENT_FRAGMENT_NODE:
      break
    case ATTRIBUTE_NODE:
      deep = true
      break
    // case ENTITY_REFERENCE_NODE:
    // case PROCESSING_INSTRUCTION_NODE:
    // //case TEXT_NODE:
    // case CDATA_SECTION_NODE:
    // case COMMENT_NODE:
    //	deep = false;
    //	break;
    // case DOCUMENT_NODE:
    // case DOCUMENT_TYPE_NODE:
    // cannot be imported.
    // case ENTITY_NODE:
    // case NOTATION_NODE：
    // can not hit in level3
    // default:throw e;
  }
  if (!node2) {
    node2 = node.cloneNode(false)// false
  }
  node2.ownerDocument = doc
  node2.parentNode = null
  if (deep) {
    let child = node.firstChild
    while (child) {
      node2.appendChild(importNode(doc, child, deep))
      child = child.nextSibling
    }
  }
  return node2
}
//
function cloneNode(doc, node, deep) {
  const node2 = new node.constructor()
  for (const n in node) {
    const v = node[n]
    if (typeof v !== 'object') {
      if (v != node2[n]) {
        node2[n] = v
      }
    }
  }
  if (node.childNodes) {
    node2.childNodes = new NodeList()
  }
  node2.ownerDocument = doc
  switch (node2.nodeType) {
    case ELEMENT_NODE:
      var attrs = node.attributes
      var attrs2 = node2.attributes = new NamedNodeMap()
      var len = attrs.length
      attrs2._ownerElement = node2
      for (let i = 0; i < len; i++) {
        node2.setAttributeNode(cloneNode(doc, attrs.item(i), true))
      }
      break
    case ATTRIBUTE_NODE:
      deep = true
  }
  if (deep) {
    let child = node.firstChild
    while (child) {
      node2.appendChild(cloneNode(doc, child, deep))
      child = child.nextSibling
    }
  }
  return node2
}

function __set__(object, key, value) {
  object[key] = value
}
// do dynamic
try {
  if (Object.defineProperty) {
    Object.defineProperty(Element.prototype, 'outerHTML', {
      get() {
        return new XMLSerializer().serializeToString(this)
      },
      set(){

      }
    })
    Object.defineProperty(Element.prototype, 'innerHTML', {
      get() {
        var html = new XMLSerializer().serializeToString(this)
        html = html.substring(html.indexOf(">"))
        html = html.substring(0,html.lastIndexOf("</"))
        return html
      },
      set(){
        
      }
    })
    Object.defineProperty(Element.prototype, 'firstElementChild', {
      get() {
        return this.firstChild
      }
    })
    Object.defineProperty(Element.prototype, 'nextElementSibling', {
      get() {
        return this.nextSibling
      }
    })
    Object.defineProperty(LiveNodeList.prototype, 'length', {
      get() {
        _updateLiveList(this)
        return this.$$length
      }
    })
    Object.defineProperty(Node.prototype, 'textContent', {
      get() {
        return getTextContent(this)
      },
      set(data) {
        switch (this.nodeType) {
          case ELEMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            while (this.firstChild) {
              this.removeChild(this.firstChild)
            }
            if (data || String(data)) {
              this.appendChild(this.ownerDocument.createTextNode(data))
            }
            break
          default:
            // TODO:
            this.data = data
            this.value = data
            this.nodeValue = data
        }
      }
    })

    function getTextContent(node) {
      switch (node.nodeType) {
        case ELEMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var buf = []
          node = node.firstChild
          while (node) {
            if (node.nodeType !== 7 && node.nodeType !== 8) {
              buf.push(getTextContent(node))
            }
            node = node.nextSibling
          }
          return buf.join('')
        default:
          return node.nodeValue
      }
    }
    __set__ = function (object, key, value) {
      // console.log(value)
      object['$$' + key] = value
    }
  }
} catch (e) { // ie8
}

// if(typeof require == 'function'){
exports.DOMImplementation = DOMImplementation
exports.XMLSerializer = XMLSerializer


}, function(modId) { var map = {"../../CSSStyleDeclaration":1670917931017}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931046, function(require, module, exports) {
var __TEMP__ = require('./ArrayX');var ArrayX = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Base64');var Base64 = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Canvas');var Canvas = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./GUID');var GUID = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./String');var String = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = {
  ArrayX,
  GUID,
  Base64,
  Canvas,
  String,
  Page
};

}, function(modId) { var map = {"./ArrayX":1670917931014,"./Base64":1670917931005,"./Canvas":1670917931047,"./GUID":1670917931022,"./Page":1670917931007,"./String":1670917931010}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931047, function(require, module, exports) {
var __TEMP__ = require('../HTMLCanvasElement');var HTMLCanvasElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../ImageBitmap');var ImageBitmap = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Base64');var Base64 = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../Blob');var Blob = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Canvas {
  static fix (canvas, canvas_image) {
    if (canvas.mini_element) {
      canvas = canvas.mini_element;
    }
    if (canvas_image.mini_element) {
      canvas_image = canvas_image.mini_element;
    }
    return new Promise((callback, reject) => {
      try {
        var image = canvas.createImage();
        image.onload = function () {
          var result = new HTMLCanvasElement(canvas_image)
          result.image = image
          callback(result);
        };
        image.onerror = function (e) {
          reject(e)
        }
        image.src = canvas_image.toDataURL();

      } catch (e) {
        reject(e)
      }
    });
  }
  static toImage (canvas, canvas_image) {
    if (canvas.mini_element) {
      canvas = canvas.mini_element;
    }
    if (canvas_image.mini_element) {
      canvas_image = canvas_image.mini_element;
    }
    return new Promise((callback, reject) => {
      try {
        var image = canvas.createImage();
        image.onload = function () {
          callback(image);
        };
        image.onerror = function (e) {
          reject(e)
        }
        image.src = canvas_image.toDataURL();

      } catch (e) {
        reject(e)
      }
    });
  }
  static toBlob (canvas, callback, type, quality) {
    const base64 = canvas.toDataURL(type, quality);
    const prev = `data:${type};base64,`;
    const buffer = Base64.base64ToArrayBuffer(base64.substring(prev.length));
    const blob = new Blob([buffer]);
    callback(blob);
  }

  static putImageData (
    ctx,
    imageData,
    dx,
    dy,
    dirtyX,
    dirtyY,
    dirtyWidth,
    dirtyHeight
  ) {
    const data = imageData.data;
    const height = imageData.height;
    const width = imageData.width;
    dirtyX = dirtyX || 0;
    dirtyY = dirtyY || 0;
    dirtyWidth = dirtyWidth !== undefined ? dirtyWidth : width;
    dirtyHeight = dirtyHeight !== undefined ? dirtyHeight : height;
    const limitBottom = dirtyY + dirtyHeight;
    const limitRight = dirtyX + dirtyWidth;
    for (let y = dirtyY; y < limitBottom; y++) {
      for (let x = dirtyX; x < limitRight; x++) {
        const pos = y * width + x;
        ctx.fillStyle = `rgba(${data[pos * 4 + 0]}, ${data[pos * 4 + 1]}, ${data[pos * 4 + 2]
          }, ${data[pos * 4 + 3] / 255})`;
        ctx.fillRect(x + dx, y + dy, 1, 1);
      }
    }
  }
};exports.default = Canvas

}, function(modId) { var map = {"../HTMLCanvasElement":1670917931019,"../ImageBitmap":1670917931028,"./Base64":1670917931005,"../Blob":1670917931002}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670917931048, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Event {
	static fix(mini_e) {
		mini_e.preventDefault = () => {}
		mini_e.stopPropagation = () => {}
		return mini_e

	}
};exports.default = Event

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1670917931001);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map