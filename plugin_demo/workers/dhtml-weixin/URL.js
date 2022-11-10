import GUID from "./core/GUID";
import Page from "./core/Page"
export default class URL {
  static createObjectURL(blob) {
    const guid = GUID();
    const url = `blob:http://localhost/${guid}`;
    try {
  const page = Page.current
if(!page.DataURL){
    page.DataURL = {}
}
page.DataURL[url] = blob
    } catch (ex) {
      console.error(ex);
    }
    return url;
  }

  static revokeObjectURL(url) {
    try {
        delete  Page.current.DataURL[url]
    } catch (ex) {
      console.error(ex);
    }
  }
}
