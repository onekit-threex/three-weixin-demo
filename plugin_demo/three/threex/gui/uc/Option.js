var _ = require('./_')
var type = "option"
Component({
	properties:{
		range:{type:Array,value:[]}
	},
	observers:{
    range(range){
    //  console.error("?????????",this.data.value)
        if(this.data.value){
          var index = range.findIndex(item=>item.value)
          const {key} = range[index]
        //  console.error("!!!!!",this.data.value,index,key)
          this.setData({key})
        }else{
       //   console.error("!!!!!!!!!",this.data.value,range)
        }
    },
		value(value){
			if(value==null){
				return
			}
      var index = this.data.range.findIndex(item=>item.value)
      if(index<0){
        return
      }
      try{
        const {key} = this.data.range[index]
       this.setData({key})
      }catch(ex){
        throw ex;
      }
		}
	},
	behaviors: [_],
	methods: {
		picker_change(e) {
			const index = e.detail.value
      const {key,value} = this.data.range[index]
      this._triggerEvent(type, value)
      this.setData({key})
		},
	}
})
