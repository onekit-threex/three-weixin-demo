
import HTMLImageElement from "./HTMLImageElement";
import Base64 from "./core/Base64";
import Blob from "./Blob";

export default function createImageBitmap(src, options) {
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
}
