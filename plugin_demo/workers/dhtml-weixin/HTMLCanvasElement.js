import HTMLElement from "./HTMLElement"
export default class HTMLCanvasElement extends HTMLElement{
  constructor(mini_element) {
      super(mini_element)
  }
  get width() {
    return this.mini_element.width;
  }
  get height() {
    return this.mini_element.height;
  }
}
