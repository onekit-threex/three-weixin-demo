import Stats from "./stats.module"
var stats
Component({
	data:{index:0},
	options:{
		virtualHost:true
	},
  lifetimes: {
    attached: function() {
			const query = wx.createSelectorQuery().in(this)
			query.selectAll('.Canvas')
				.fields({ node: true })
				.exec((res) => {
					stats = new Stats(res[0].map(res=>res.node))
				})
			
    }
  },
	methods: {
		update() {
			stats.update()
		},
		stats_change(){
			var index = stats.change()
			this.setData({index})
		}
	}
})
