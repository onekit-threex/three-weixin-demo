var _ = require('./_')
const type = "function"
Component({
	behaviors: [_],
	methods: {
		button_tap() {
      this._triggerEvent(type, null)
		}
	}
})
