import HTMLElement from "./HTMLElement";
export default class HTMLCanvasElement extends HTMLElement {
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
}
