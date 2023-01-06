module.exports = Behavior({
  behaviors: [],
  properties: {
    name: {
      type: String
    },
    value: {
      type: String | Number
    },
    path: {
      type: String,
      value:""
    }
  },
  attached: function(){
    //console.error(this.properties.value)
  },
  methods: {
  }
})