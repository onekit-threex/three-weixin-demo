module.exports = Behavior({
  behaviors: [],
  properties: {
    name: {
      type: String
    },
    disabled:{type:Boolean},
    value: {
      type: String
    }
  },
  methods: {
    disabled(disabled){
      this.setData({disabled})
    },
    _triggerEvent(type,value){
      this.triggerEvent('change', {type,value,sub_path:"",name:this.data.name}, { bubbles: true })
    }
  }
})