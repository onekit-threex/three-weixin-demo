var _ = require('./_')
Component({
	behaviors: [_],
	methods: {
		button_tap() {
			this.triggerEvent('change', {type:"function"})
		}
	}
})
