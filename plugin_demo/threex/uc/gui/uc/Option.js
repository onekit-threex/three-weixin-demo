var _ = require('./_')
var type = "option"
Component({
	properties:{
		range:{type:Array,value:[]}
	},
	observers:{
		value(value){
			if(value==null){
				return
			}
			const index = this.data.range.indexOf(value)
			this.setData({index})
		}
	},
	behaviors: [_],
	methods: {
		picker_change(e) {
			const index = e.detail.value
			const value = this.data.range[index]
			this.triggerEvent('change', {type,value})
		},
	}
})
