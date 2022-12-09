var systemInfo = wx.getSystemInfoSync()
var platform = systemInfo.platform
var pixelRatio = systemInfo.pixelRatio
export default class Event {
	static fix(mini_e) {

		//console.error(mini_e)
		var web_e = new Event(mini_e.type)
		///////////////////////////////////
		web_e.isTrusted = true
		web_e.altKey = false
		web_e.altitudeAngle = 1.5707963267948966
		web_e.azimuthAngle = 0
		web_e.bubbles = true
		web_e.button = ["touchstart", "touchend"].includes(mini_e.type) ? 0 : -1
		web_e.buttons = ["touchstart", "touchend"].includes(mini_e.type) ? 0 : 1
		web_e.cancelBubble = false
		web_e.cancelable = true
		web_e.composed = true
		web_e.ctrlKey = false
		web_e.currentTarget = null
		web_e.defaultPrevented = false
		web_e.detail = 0
		web_e.eventPhase = 0
		web_e.fromElement = null
		web_e.width = 5 //30.66666603088379
		web_e.height = 5 //30.66666603088379
		web_e.isPrimary = true
		web_e.metaKey = false
		web_e.movementX = 0
		web_e.movementY = 1
		//    web_e.path = []canvas, body, html, document, Window]
		web_e.pointerType = "touch"
		web_e.pressure = 1
		web_e.relatedTarget = null
		web_e.returnValue = true
		web_e.shiftKey = false
		web_e.sourceCapabilities = null
		// web_e.srcElement =canvas
		web_e.tangentialPressure = 0
		// web_e.target =canvas
		web_e.tiltX = 0
		web_e.tiltY = 0
		web_e.timeStamp = 39505
		web_e.toElement = null
		web_e.twist = 0
		//web_e.view = ?
		web_e.which = 0
		///////////////////////////////////
		web_e.code = "";
		const offsetLeft = mini_e.target.offsetLeft
		const offsetTop = mini_e.target.offsetTop
		//
		/*
		var result = []
		if (mini_e.changedTouches.length > 0) {
			for (const touch of mini_e.changedTouches) {
				result.push(this.touch2touch(offsetLeft, offsetTop, touch, web_e, pixelRatio))
			}
		} else {
			result.push(web_e)
		}

		return result*/
		/*
		var touch = mini_e.changedTouches[0]
		switch (mini_e.type) {
			case "touchstart":
			case "touchend":
				web_e.pointerId = touch.identifier != null ? touch.identifier : 2;
				web_e.identifier = touch.identifier;
				return web_e;
			case "touchmove":
				return this.touch2touch(offsetLeft, offsetTop, touch, web_e, pixelRatio)
		}*/
		var touch = mini_e.changedTouches[0]
		return this.touch2touch(offsetLeft, offsetTop, touch, web_e, pixelRatio)
	}
	static fix2(mini_e) {
		//console.error(mini_e)
		const web_e = new Event(mini_e.type)
		///////////////////////////////////
		web_e.isTrusted = true
		web_e.altKey = false
		web_e.altitudeAngle = 1.5707963267948966
		web_e.azimuthAngle = 0
		web_e.bubbles = true
		web_e.button = ["touchstart", "touchend"].includes(mini_e.type) ? 0 : -1
		web_e.buttons = ["touchstart", "touchend"].includes(mini_e.type) ? 0 : 1
		web_e.cancelBubble = false
		web_e.cancelable = true
		web_e.composed = true
		web_e.ctrlKey = false
		web_e.currentTarget = null
		web_e.defaultPrevented = false
		web_e.detail = 0
		web_e.eventPhase = 0
		web_e.fromElement = null
		web_e.height = 30.66666603088379
		web_e.isPrimary = true
		web_e.metaKey = false
		web_e.movementX = 0
		web_e.movementY = 1
		//    web_e.path = []canvas, body, html, document, Window]
		web_e.pointerType = "touch"
		web_e.pressure = 1
		web_e.relatedTarget = null
		web_e.returnValue = true
		web_e.shiftKey = false
		web_e.sourceCapabilities = null
		// web_e.srcElement =canvas
		web_e.tangentialPressure = 0
		// web_e.target =canvas
		web_e.tiltX = 0
		web_e.tiltY = 0
		web_e.timeStamp = 39505
		web_e.toElement = null
		web_e.twist = 0
		//web_e.view = ?
		web_e.which = 0
		web_e.width = 30.66666603088379
		///////////////////////////////////
		web_e.code = "";
		const offsetLeft = mini_e.target.offsetLeft
		const offsetTop = mini_e.target.offsetTop
		web_e.touches = mini_e.touches.map(touch => {
			return this.touch2touch(offsetLeft, offsetTop, touch, {})
		})
		web_e.changedTouches = mini_e.changedTouches.map(touch => {
			return this.touch2touch(offsetLeft, offsetTop, touch, {})
		})
		//
		return web_e
	}
	static touch2touch(offsetLeft, offsetTop, touch, web_e, pixelRatio = 1) {
		web_e.pointerId = touch.identifier != null ? touch.identifier : 2;
		web_e.identifier = touch.identifier;
	//	console.error(platform)
		if (platform == "devtools") {
			web_e.pageX = touch.x * pixelRatio;
			web_e.pageY = touch.y * pixelRatio;
			web_e.clientX = (touch.x - offsetLeft) * pixelRatio
			web_e.clientY = (touch.y - offsetTop) * pixelRatio
			//
			web_e.layerX = web_e.clientX;
			web_e.layerY = web_e.clientY;
			web_e.x = web_e.clientX;
			web_e.y = web_e.clientY;
			web_e.offsetX = web_e.clientX;
			web_e.offsetY = web_e.clientY;
			web_e.deltaX = web_e.offsetX;
			web_e.deltaY = web_e.offsetY;
		} else {
			web_e.pageX = touch.pageX* pixelRatio;
			web_e.pageY = touch.pageY* pixelRatio;
			web_e.clientX = touch.clientX* pixelRatio;
			web_e.clientY = touch.clientY* pixelRatio;
			web_e.x = touch.x* pixelRatio;
			web_e.y = touch.y* pixelRatio;
			web_e.deltaX = touch.deltaX* pixelRatio;
			web_e.deltaY = touch.deltaY* pixelRatio;
			//
			web_e.layerX = web_e.clientX;
			web_e.layerY = web_e.clientY;
			web_e.deltaX = web_e.offsetX;
			web_e.deltaY = web_e.offsetY;
		}
		return web_e
	}
	//////////////////////////////////////////////////////////////

	constructor(type, options) {
		this.type = type
		this.options = options
	}
	preventDefault() {

	}
}
