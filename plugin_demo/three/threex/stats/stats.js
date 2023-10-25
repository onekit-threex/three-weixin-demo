import {core} from "dhtml-weixin"
import Stats from "./stats.module"
var stats
Component({
  options: {
    virtualHost: true
  },
	data:{index:0},
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
    async  dom(){
      return new Promise((callback)=>{
        var timer = setInterval(()=>{
            if(stats){
              clearInterval(timer)
              callback(stats.dom)
            }
        },100)
      })
    },
		update() {
			stats.update()
    },
    showPanel(index){
      this.setData({index})
    },
		stats_change(){
			var index = stats.change()
			this.setData({index})
		}
	}
})
