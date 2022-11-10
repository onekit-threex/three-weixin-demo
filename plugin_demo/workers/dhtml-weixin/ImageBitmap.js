export default class ImageBitmap {
  constructor(image) {
    this.image = wx_element;
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
}
