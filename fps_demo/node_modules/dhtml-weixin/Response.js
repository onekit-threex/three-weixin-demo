/* eslint-disable handle-callback-err */
/* eslint-disable no-console */
import Base64 from './core/Base64'
import Page from './core/Page'
import Blob from "./Blob"
export default class Response {
	constructor(body, options = {}, request) {
		if (!request) {
			this.body = body
			this.status = options.status
			this.statusText = options.statusText
			this.headers = options.headers
		}
		if (typeof request == "string") {
			this.request = {
				url: request
			}
		} else {
			this.request = request
		}
		this.status = 200
	}

	_run(responseType, dataType = 'text') {
		const onekit_debug = Page.getApp().onekit_debug
		if (onekit_debug) {
			console[onekit_debug]('[fetch]', this.request.url, responseType, dataType)
		}
		var url = this.request.url
		if (url.endsWith('.js')) {
			return new Promise((resolve) => {
				resolve(url)
			})
		}
		if (url.startsWith('mini:')) {
			return new Promise((resolve, reject) => {
				try {
					if (dataType == 'text') {
						const MINI = 'mini:'
						const text = url.substring(MINI.length)
						resolve(text);
					} else {
						const BASE64 = 'base64,'
						const base64 = url.substring(url.indexOf(BASE64) + BASE64.length)
						resolve(Base64.base64ToArrayBuffer(base64))
					}
				} catch (ex) {
					console.error(ex)
					reject(ex)
				}
			})
		}
		if (url.startsWith('data:')) {
			return new Promise((resolve, reject) => {
				try {
					const BASE64 = 'base64,'
					const base64 = url.substring(url.indexOf(BASE64) + BASE64.length)
					resolve(Base64.base64ToArrayBuffer(base64))
				} catch (ex) {
					console.error(ex)
					reject(ex)
				}
			})
		}
		if (url.startsWith('blob:')) {
			return new Promise((resolve,reject) => {
				try {
					var global = Page.current
					if(!global){
					  global = Page.getApp()
					}
					const arrayBuffer = global.DataURL[url].array[0]
					resolve(arrayBuffer)
				} catch (ex) {
					console.error(ex);
					reject(ex)
				}
			})
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

		// /////////////////////////
		return new Promise((resolve, reject) => {
			Page.wx_request({
				url,
				headers: ((this.request.options || {}).headers || {}).data || {},
				responseType,
				dataType,
				success: (res) => {
					resolve(res.data)
				},
				fail: (e) => {
					console.error('[fetch.fail]', this.request.url, e)
					// eslint-disable-next-line prefer-promise-reject-errors
					reject(null)
				}
			})
		})
	}

	arrayBuffer() {
		return this._run('arraybuffer', 'arraybuffer')
	}

	blob() {
		return new Promise((callback, reject) => {

			this._run('arraybuffer', 'blob').then(data => {
				callback(new Blob([data]));
			}).catch((e) => {
				console.error(e)
				reject(e.message)
			})

		})
	}

	text() {
		return this._run('text')
	}

	json() {
		return this._run('text', 'json')
	}
}
