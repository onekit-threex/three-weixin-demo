import {core} from "dhtml-weixin"
import GUI from "./src/GUI"
var _ = require('./uc/_')
Component({
	data: {
		children: []
	},
	options: {
    // virtualHost: true
  },
	properties: {
		show: {
			type: Boolean,
			value: true
		},
		root: {
			type: Boolean,
			value: true
		},
		index: {
			type: Number,
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
    destroy (){
      this.GUI.destroy()
    },
		title_tap() {
			const show = !this.data.show
			this.setData({
				show
			})
    },
    title(title){
      return this.GUI.title(title)
    },
    onChange(){
      return this.GUI.onChange.apply(this.GUI,arguments)
    },
		addFolder(title) {
			return this.GUI.addFolder(title)
    },
    add() {
      return this.GUI.add.apply(this.GUI,arguments)
    },
    addColor(){
      return this.GUI.addColor.apply(this.GUI,arguments)  
    },
    addBoolean(){
      return this.GUI.addBoolean.apply(this.GUI,arguments)  
    },
    addNumber(){
      return this.GUI.addNumber.apply(this.GUI,arguments)  
    },
    addString(){
      return this.GUI.addString.apply(this.GUI,arguments)  
    },
    addOptions(){
      return this.GUI.addOptions.apply(this.GUI,arguments)  
    },
    addFunction(){
      return this.GUI.addFunction.apply(this.GUI,arguments)  
    },
    open(){
			this.setData({
				show:true
			})
    },
    close(){
			this.setData({
				show:false
			})
    },
		gui_change(e) {
      const {
        type,
        value,
        name,
        sub_path
      } = e.detail
      /////////////////////////
      var i=0
      for(const item of this.data.children){
        if(item[item.type=="GUI"?"title":"name"]==name){
          break
        }
        i++
      }
      const full_path = `.children[${i}]${sub_path}`
      //console.error(this.data.root,this.data.children,name,i,full_path)
      //////////////////////////////////
			if (!this.data.root) {
				this.triggerEvent("change", {
          sub_path:full_path,
          value,
          name:this.data.title,
					type
				}, { bubbles: true })
				return
      }
      //////////////////////////////////
      const controller = this.GUI._findNode(full_path.substr(1))
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
