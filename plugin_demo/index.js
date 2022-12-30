import files from './files.json'
var index = 0
var timer
Page({
    onshareAppMessage(){
        return {
            title: 'ThreeJS原生引擎',
            path: '/index'
          }
    },
    onShareTimeline(){
        return {
            title: 'ThreeJS原生引擎',
            path: '/index'
          }
    },
	onLoad() {

		const sections = []
		const platform = wx.getSystemInfoSync()
		for (const sectionName of Object.keys(files)) {
			if (sectionName.startsWith("physics_")) {
				const type = platform == "ios" ? "js" : "wasm"
				if (!sectionName.endsWith("_" + type)) {
					continue
				}
			}
			sections.push({
				sectionName,
				demos: files[sectionName]
			})
		}
		this.setData({
			sections
		})
		wx.navigateTo({
			url: 'webgl/webgl_animation_skinning_additive_blending',
		})
	},
	run() {
        var subs = Object.keys(files)
		var x = index;
		for (var sub of subs) {
			var demos = files[sub]
			if (demos.length > x) {
				var demo = demos[x]
				console.error(index,sub,x, demo)
				wx.redirectTo({
					url: "/" + sub + "/" + demo
                })
                return
			} else {
                x -= demos.length
			}
		}
		clearInterval(timer)

	},
	onReady() {

		timer = setInterval(() => {
            index++
	//	this.run()
	}, 4000)
	//	this.run()
	},
	onHide() {
		clearInterval(timer)
	}
})
