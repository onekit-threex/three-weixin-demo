/* eslint-disable prefer-spread */
/* eslint-disable no-console */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
import EventTarget from "./EventTarget";
import Base64 from "./core/Base64";
import Page from "./core/Page"
export default class HTMLImageElement extends EventTarget {
	constructor(canvas2d) {
		super();
		const canvas = wx.createOffscreenCanvas({type:"2d"})//core.Page.current.canvas.wx_element;
		this.wx_element = canvas.createImage();
		this.wx_element.onload = () => {
			if (this.onload) {
				this.onload.call(this);
			}
			if (this._all_event_handlers.load) {
				this._all_event_handlers.load.forEach((handler) => {
					handler.call(this);
				});
			}
		};
		this.wx_element.onerror = (e) => {
			if (this.onerror) {
				this.onerror.call(this, e);
			}
			if (this._all_event_handlers.error) {
				this._all_event_handlers.error.forEach((handler) => {
					handler.call(this, e);
				});
			}
		};
		this.onekit_image = this;
	}
	get width() {
		return this.wx_element.width;
	}
	get height() {
		return this.wx_element.height;
	}
	get data() {
		return this.wx_element.data;
	}
	get complete() {
		return this.wx_element.complete;
	}
	set crossOrigin(crossOrigin) {
		this._crossOrigin = crossOrigin;
	}

	get crossOrigin() {
		return this._crossOrigin;
	}

	set src(src) {
		if (wx.getStorageSync("onekit_debug")) {
			if (src.startsWith("data:")) {
				console[wx.getStorageSync("onekit_debug")]("[image]", "blob");
			} else {
				console[wx.getStorageSync("onekit_debug")]("[image]", src);
			}
		}
		this._src = src;

		if (src.startsWith("blob:")) {
			try {
				const arrayBuffer = core.Page.current.DataURL[url].array[0]
				const base64 = "data:image/png;base64," + core.Base64.arrayBufferToBase64(arrayBuffer)
				this.wx_element.src = base64
			} catch (ex) {
				console.error(ex);
			}
		} else {
			this.wx_element.src = src;
		}
	}

	get src() {
		return this._src;
	}
}
