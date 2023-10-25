import {
	document,
	Event,
  Event0
} from 'dhtml-weixin'
const systemInfo = wx.getSystemInfoSync()

Component({
	options: {
		virtualHost: true
	},
	properties: {},
	data: {
		direction: {
			x: 0,
			y: 0,
			show: false
		},
		buttons: [{
				text: "射",
				size: 70,
				right: 30,
				bottom: 30,
				mouse: true,
				keycode: "Left"
			}, {
				text: "跳",
				size: 50,
				right: 30,
				bottom: 120,
				keycode: "Space"
			},
			{
				text: "跑",
				size: 50,
				right: 100,
				bottom: 100,
				keycode: "Shift"
			},
			{
				text: "蹲",
				size: 50,
				right: 120,
				bottom: 30,
				keycode: "Ctrl"
			},
		]
	},

	methods: {
		eGamePadDirection1_touchstart() {
			this.setData({
				show: true

			})
		},
		eGamePadDirection1_touchmove(e) {
			var dy = 130 - (systemInfo.windowWidth - e.changedTouches[0].clientY)
			var dx = e.changedTouches[0].clientX - 100
			var a = Math.atan2(dy, dx)
			var length = Math.sqrt(dx * dx + dy * dy)
			length = Math.min(length, 100)
			var x = Math.cos(a)
			var y = Math.sin(a)
			/////////////////////////////
			var keycode
			if (Math.abs(x) > Math.abs(y)) {
				keycode = x > 0 ? "KeyD" : "KeyA"
			} else {
				keycode = y > 0 ? "KeyS" : "KeyW"
			}
			if (this.direction_keycode != keycode) {
				var event
				if (this.direction_keycode) {
					event = new Event("keyup")
					event.code = this.direction_keycode
					document.dispatchEvent(event)
				}
				this.direction_keycode = keycode
				event = new Event("keydown")
				event.code = keycode
				document.dispatchEvent(event)
			}
			///////////////////////////
			this.setData({
				direction: {
					x: 100 + length * x - 25,
					y: 100 + length * y - 25
				}
			})
		},
		eGamePadDirection1_touchend() {
			var event = new Event("keyup")
			event.code = this.direction_keycode
			document.dispatchEvent(event)
			this.direction_keycode = null
			////////////////////////////
			this.setData({
				show: false
			})
		},
		//////////////////////////////////////////////////////////////
		eGamePad_touchstart(e) {
			this.loockat_from = {
				x: e.changedTouches[0].clientX,
				y: e.changedTouches[0].clientY
			}
		},
		eGamePad_touchmove(e) {
			var loockat_to = {
				x: e.changedTouches[0].clientX,
				y: e.changedTouches[0].clientY
			}
			var dy =  loockat_to.y - this.loockat_from.y
			var dx =  loockat_to.x - this.loockat_from.x
			this.loockat_from =  loockat_to
			///////////////////////////////////
			//this.triggerEvent("mousemove",{movementX:dx,movementY:dy})
			var event = new Event("mousemove")
			event.movementX = dx
			event.movementY = dy
			document.body.dispatchEvent(event)
		},
		eGamePad_touchend() {
		},
		//////////////////////////////////////////////
		eGamePadButton_touch(e) {
			const {
				mouse,
				keycode
			} = e.target.dataset
			var eventName
			if (mouse) {
				switch (e.type) {
					case "touchstart":
						eventName = "mousedown"
						break
					case "touchend":
						eventName = "mouseup"
						break
				}
				var event = new Event(eventName)
				document.dispatchEvent(event)
			} else {
				switch (e.type) {
					case "touchstart":
						eventName = "keydown"
						break
					case "touchend":
						eventName = "keyup"
						break
				}
				var event = new Event(eventName)
				event.code = keycode
				document.dispatchEvent(event)
			}
		}
	}
})
