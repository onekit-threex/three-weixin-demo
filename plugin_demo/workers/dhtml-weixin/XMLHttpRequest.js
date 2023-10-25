/* eslint-disable camelcase */
import EventTarget from "./EventTarget";

function run(cb, mini_object) {
  return new Promise((resolve, reject) => {
    mini_object.success = resolve;
    mini_object.fail = reject;
    cb(wx.request(mini_object));
  });
}
export default class XMLHttpRequest extends EventTarget {
  constructor() {
    super();
    this._responseType = "text";
  }

  open(method, url, async = true, user, password) {
    this._method = method;
    this._url = url;
    this._async = async;
    this._user = user;
    this._password = password;
  }

  async send(body) {
    const callback = (res) => {
      this._response = res.data;
      if (this._responseType === "text") {
        this._responseText = this._response;
      }
      if (this.onload) {
        this.onload.apply(this);
      }
      if (this._all_event_handlers.load) {
        this._all_event_handlers.load.forEach((handler) => {
          handler.apply(this);
        });
      }
    };
    const mini_object = {
      url: this._url,
      dataType: "text",
      responseType: this._responseType,
      method: this._method,
      data: body,
    };
    if (this._async) {
      mini_object.success = (res) => {
        callback.call(this, res);
      };
      mini_object.fail = console.error
      this._task = wx.request(mini_object);
    } else {
      try {
        const res = await run((task) => {
          this._task = task;
        }, mini_object);
        callback.call(this, res);
      } catch (ex) {
        console.error(ex);
      }
    }
  }

  set responseType(responseType) {
    this._responseType = responseType;
  }

  get responseType() {
    return this._responseType;
  }

  get status() {
    return this.response.status;
  }

  get response() {
    return this._response;
  }

  get responseText() {
    return this._responseText;
  }

  set onload(onload) {
    this._onload = onload;
  }

  get onload() {
    return this._onload;
  }

  set onerror(onerror) {
    this._onerror = onerror;
  }

  get onerror() {
    return this._onerror;
  }
}
