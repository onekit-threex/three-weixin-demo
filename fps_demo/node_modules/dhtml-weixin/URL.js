import GUID from "./core/GUID";
import Page from "./core/Page"
export default class URL {
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
}
