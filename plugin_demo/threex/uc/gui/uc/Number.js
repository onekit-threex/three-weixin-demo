var _ = require('./_')
var type = "number"
Component({
	behaviors: [_],
	properties: {
		min: {
			type: Number,
			value:0
		},
		max: {
			type: Number,
			value:1
		},
		step: {
			type: Number,
			value: 0.01
		}
	},
	methods: {
		slider_changing(e) {
			const value = e.detail.value
			this.triggerEvent('change', {type,value})
			this.setData({
				value
			})
		},
		input_input(e) {
			const value = e.detail.value
			this.triggerEvent('change', {type,value})
			this.setData({
				value
			})
		},
	}
})
