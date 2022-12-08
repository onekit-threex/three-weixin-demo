// demo.js
Page({
	onLoad() {
    var hdr = "https://onekit.cn/examples/ar/sky_box.hdr"
    var urls = [
			"https://onekit.cn/examples/ar/1/glass.glb",
			"https://onekit.cn/examples/ar/2/glass.glb",
			"https://onekit.cn/examples/ar/3/glass.glb"
		]
		var images = [
			"https://onekit.cn/examples/ar/1.png",
			"https://onekit.cn/examples/ar/2.png",
			"https://onekit.cn/examples/ar/3.png"
		]
		var titles = [
			"黑白经典",
			"金色沙滩",
			"国风复古"
		]
		this.setData({
			hdr,
			urls,
			images,
			titles
		})
	},
})
