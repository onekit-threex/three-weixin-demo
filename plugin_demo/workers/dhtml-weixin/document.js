/* eslint-disable no-redeclare */
/* eslint-disable import/export */
/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import HTMLImageElement from "./HTMLImageElement";
import Window from "./window";
import Location from "./Location";
import EventTarget from "./EventTarget";
/* eslint-disable class-methods-use-this */
import Style from "./Style";
import Element from "./Element";
import ClassCollection from "./ClassCollection";
const window = new Window()
function getPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}
class HTMLElement extends Element {
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
    return new Document();
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
    const page = getPage();
    const key = `${this.mini_key}_innerHTML`;
    const data = {};
    data[key] = innerHTML;
    page.setData(data);
  }
  get innerHTML() {
    return this._innerHTML;
  }
  append() {}
  appendChild() {}
  removeChild() {}
  remove() {}

  insertBefore() {}

  setAttribute() {}

  toggleAttribute() {}

  click() {}

  getBoundingClientRect() {
		if (this.mini_element) {
			return {
				left: 0,
				top:0,
				width: this.mini_element.width/window.devicePixelRatio,
				height: this.mini_element.height/window.devicePixelRatio,
			};
		}
		return {
			left: 0,
			top: 0,
			width: 0,
			height: 0
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
}

class Head extends HTMLElement {}

class Body extends HTMLElement {}

export default class Document extends EventTarget {
  constructor() {
    super();
    this.window = window;
  }

  get body() {
    return new Body();
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
              if (canvasType === "2d") {
                const context = canvas.getContext("2d");
                context.clearRect(0, 0, 10000, 10000);
              }
              resolve(canvas);
            });
        });
      default:
        console.error("createElementAsync", nodeName);
        throw new Error(nodeName);
    }
  }

  async getElementByIdAsync(id) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery();
      query
        .select(`#${id}`)
        .fields({ node: true })
        .exec((res) => {
          resolve(res[0].node);
        });
    });
  }

  async getElementsByTagNameAsync(tagName) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery();
      query
        .select(tagName)
        .fields({ node: true })
        .exec((res) => {
          resolve(res[0].node);
        });
    });
  }

  async getElementsByClassNameAsync(className) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery();
      query
        .select(`.${className}`)
        .fields({ node: true })
        .exec((res) => {
          resolve(res[0].node);
        });
    });
  }

  createElement(nodeName, canvasType = "2d",canvas) {
    switch (nodeName) {
      case "canvas":
        return new HTMLImageElemen(twx.createOffscreenCanvas({ type: canvasType }));
      case "img":
        return new HTMLImageElement(wx.createOffscreenCanvas({ type: canvasType }));
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
}
