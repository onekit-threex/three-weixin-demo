import {
  core
} from "dhtml-weixin"
class Style {
  constructor(element) {
    this.element = element
    this.css = {}
  }
  setProperty(key, value) {
    this.css[key] = value
  }
}
class ClassCollection {
  constructor(element) {
    this.element = element
    this.classNames = {}
  }
  add(className) {
    this.classNames[className] = true
  }
  remove(className) {
    delete this.classNames[className]
  }
  toggle(className, bool) {
    this.classNames[className] = bool
  }
}
class HTMLElement {
  toggleAttribute(){
    
  }
  constructor(nodeName) {
    this._guid = core.GUID()
    this.nodeName = nodeName
    this.attributes = {}
    this.classList = new ClassCollection(this)
    this.listeners = {}
    this.children = []
    this.style = new Style(this)
  }
  setAttribute(key, value) {
    this.attributes[key] = value
  }
  addEventListener(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = []
    }
    this.listeners[eventName].push(listener)
  }
  removeEventListener(eventName,listener){
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = []
    }
    this.listeners[eventName].slice( this.listeners[eventName].indexOf(listener))
  }
  appendChild(child) {
    this.children.push(child)
  }
  removeChild(child) {
    var index=0
    for(const item of  this.children){
      if(item._guid==child._guid){
        this.children.slice(index,1)
        return
      }
      index++
    }
  }
  insertBefore(newNode, referenceNode) {
    for (var i = 0; i < this.children.length; i++) {
      const child = this.children[i]
      if (child._guid == referenceNode._guid) {
        this.children.splice(i, 0, newNode)
        break
      }
    }
  }
  insertAfter(newNode, referenceNode) {
    for (var i = 0; i < this.children.length; i++) {
      const child = this.children[i]
      if (child._guid == referenceNode._guid) {
        this.children.splice(i + 1, 0, newNode)
        break
      }
    }
  }
}
class HTMLBodyElement extends HTMLElement {
  constructor() {
    super("body")
  }
}
class Document extends HTMLElement {
  constructor() {
    super("document")
    this.body = new HTMLBodyElement()
  }
  createElement(nodeName) {
    return new HTMLElement(nodeName)
  }
}
const document = new Document()
module.exports = {
  document
}