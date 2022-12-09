/* eslint-disable camelcase */
import EventTarget from "./EventTarget";
import Page from "./core/Page"

function run(cb, mini_object) {
	return new Promise((resolve, reject) => {
		mini_object.success = resolve;
		mini_object.fail = (e) => {
			console.error("[XMLHttpRequest]", e)
			reject(e)
		};
		cb(Page.wx_request(mini_object));
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
		var url = this._url
		if (url.startsWith('mini:')) {
			try {
				var data
				if (this._responseType == 'text') {
					const MINI = 'mini:'
					const text = url.substring(MINI.length)
					data = text;
				} else {
					const BASE64 = 'base64,'
					const base64 = url.substring(url.indexOf(BASE64) + BASE64.length)
					data = Base64.base64ToArrayBuffer(base64)
				}
				callback.call(this, { data });
			} catch (ex) {
				console.error(ex);
			}
			return
		}
		if (url.startsWith('data:')) {
			try {
				const BASE64 = 'base64,'
				url = url.substring(url.indexOf(BASE64) + BASE64.length)
				const data = Base64.base64ToArrayBuffer(url)
				callback.call(this, { data });
			} catch (ex) {
				console.error(ex);
			}
			return
		}
		if (url.startsWith('blob:')) {
			try {
				var global = Page.current
				if (!global) {
					global = Page.getApp()
				}
				const data = global.DataURL[url].array[0]
				callback.call(this, { data });
			} catch (ex) {
				console.error(ex);
			}
			return
		}
		if (url.startsWith("./")) {
			url = url.substring(2)
		}
		if (!url.startsWith("blob:") &&
			!url.startsWith("data:") &&
			!url.startsWith("mini:") &&
			!url.startsWith("http://") &&
			!url.startsWith("https://")) {
			url = (Page.getApp().onekit_path || "") + url
		}
		const mini_object = {
			url,
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
			this._task = Page.wx_request(mini_object);
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
