var _ = require('./_')
var type = "boolean"
Component({
  behaviors: [_],
  methods: {
    checkbox_change(e) {
      const value = e.detail.value.length > 0
      this._triggerEvent(type, value)
    },
  }
})