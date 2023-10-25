import HTMLImageElement from "../HTMLImageElement";
import ImageBitmap from "../ImageBitmap"
import HTMLCanvasElement from "../HTMLCanvasElement"
import Base64 from "./Base64";
import Blob from "../Blob";
export default class Canvas {
  static x2image(x,tobase64,toBuffer) {
    if(!x){
      return x
    }
    var img;
    if (x instanceof HTMLImageElement) {
      img = x.mini_element;
    } else if (x instanceof ImageBitmap) {
      img = x.mini_element;
    } else if (x instanceof HTMLCanvasElement) {
      img = x.mini_element;
      if(tobase64){
        img = img.toDataURL()
        if(toBuffer){
          const prev = "data:image/png;base64,"
          img = img.substring(prev.length)
          img = Base64.base64ToArrayBuffer(img)
        }
      }
    } else {
      img = x;
    }
    return img;
  }
  static fix(canvas3d, canvas2d) {
    if (canvas3d.mini_element) {
      canvas3d = canvas3d.mini_element;
    }
    return new Promise((callback) => {
      var image = canvas2d.createImage();
      image.onload = function () {
        callback(image);
      };
      image.src = canvas3d.toDataURL();
    });
  }
  static canvas2img(canvas3d, canvas2d) {
    if (canvas3d.mini_element) {
      canvas3d = canvas3d.mini_element;
    }
    return new Promise((callback) => {
      var img = new HTMLImageElement(canvas2d);
      img.onload = function () {
        callback(img);
      };
      img.src = canvas3d.toDataURL();
    });
  }
  static toBlob(canvas, callback, type, quality) {
    const base64 = canvas.toDataURL(type, quality);
    const prev = `data:${type};base64,`;
    const buffer = Base64.base64ToArrayBuffer(base64.substring(prev.length));
    const blob = new Blob([buffer]);
    callback(blob);
  }
}
