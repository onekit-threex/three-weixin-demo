import GUI from "./src/GUI"
var _ = require('./uc/_')
Component({
	data: {
		children: []
	},
	options: {},
	properties: {
		show: {
			type: Boolean,
			value: true
		},
		root: {
			type: Boolean,
			value: true
		},
		path: {
			type: String,
			value: ""
		},
		children: {
			type: Array
		},
		title: {
			type: String
		},
		width: {
			type: Number | String,
			value: 100
		}
	},
	lifetimes: {
		attached: function () {
			if (this.data.root) {
				this.GUI = new GUI(this, {})
			}
		}
	},
	methods: {
		title_tap() {
			const show = !this.data.show
			this.setData({
				show
			})
		},
		addFolder(title) {
			return this.GUI.addFolder(title)
		},
		gui_change(e) {
			if (!this.data.root) {
				const dataset = e.currentTarget.dataset
				const {
					type,
					value
				} = e.detail
				this.triggerEvent("change", {
					dataset,
					value,
					type
				})
				return
			}
			const {
				dataset,
				value,
				type
			} = e.detail
			const {
				path,
				index
			} = dataset
			const controller = this.GUI._findNode(`${path}children[${index}]`)
			switch (type) {
				case "function":
					controller.getValue().call(controller.object);
					break
				default:
					controller.setValue(value)
					break
			}
		}
	}
})
