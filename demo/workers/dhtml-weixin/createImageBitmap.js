/* eslint-disable no-unused-vars */
import HTMLImageElement from "./HTMLImageElement"

export default function createImageBitmap(src, options) {
  return new Promise((resolve) => {
    const img = new HTMLImageElement()
    img.onload = function() {
      resolve(img)
    }
    img.src = src
  })
}
