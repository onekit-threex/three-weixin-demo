var _ = require('./_')
var type = "color"
Component({
	data:{
		rgb: 'rgb(0,0,0)',
    color: '#000000',
    show: false
	},
	behaviors: [_],
	observers:{
		value(value){
			if(value==null){
				return
			}
			value = value.replace("#","")
			var color
			if(value.length!=3 && value.length!=6){
				color = "000000"
			}else if(value.length==3){
				color = `${value.substr(0,1)}0${value.substr(1,1)}0${value.substr(2,1)}0`
			}else{
				color = value
			}
			this.setData({color})
		}
	},
	lifetimes: {
		attached: function () {
		}
	},
	methods: {
		colorChange(color){
			const value = `#${color}`
			this.triggerEvent('change', {type,value})
			this.setData({
				color
			})
		},
		button_tap(){
			this.setData({show:true})
		},
		picker_changeColor(e) {
			function fix(number){
				var str = number.toString(16)+""
				if(str.length==1){
					str = "0"+str
				}
				return str
			}
			const rgb = e.detail.color
			const str = rgb.substring(rgb.indexOf("(")+1,rgb.indexOf(")"))
			const array = str.split(",")
			const color = fix(array[0])
				+fix(array[1])
				+fix(array[2])
			this.colorChange(color)
		},
		input_input(e) {
			const color = e.detail.value
			this.colorChange(color)
		},
	}
})
