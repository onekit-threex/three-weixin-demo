import HTMLElement from "./HTMLElement"
export default class HTMLCanvasElement extends HTMLElement{
  constructor(wx_element) {
      super(wx_element)
  }
  get width() {
    return this.wx_element.width;
  }
  get height() {
    return this.wx_element.height;
  }
}
