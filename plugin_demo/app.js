App({
	//onekit_debug:"error",
	    onekit_path :"https://onekit.cn/examples/",
	//onekit_path: "http://localhost/examples/",
	//  onekit_path: "http://192.168.1.108/examples/",
	onLaunch(options) {
   //     console.error(options)
		const updateManager = wx.getUpdateManager()

		updateManager.onCheckForUpdate(function (res) {
			// 请求完新版本信息的回调
			console.log(res.hasUpdate)
		})

		updateManager.onUpdateReady(function () {
			wx.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success: function (res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate()
					}
				}
			})
		})

		updateManager.onUpdateFailed(function () {
			// 新版本下载失败
		})
	}
});
