var _ = require('./_')
var type = "string"
Component({
	behaviors: [_],
	methods: {
		input_input(e) {
			const value = e.detail.value
			this.triggerEvent('change', {type,value})
			this.setData({
				value
			})
		},
	}
})
