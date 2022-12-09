import Page from "./core/Page"
export default function cancelAnimationFrame(requestId, canvas) {
	try {
		if (!requestId) {
			return
		}
		if (!canvas && Page.current) {
			canvas = Page.current.canvas
		}
		if (!canvas && Page.getApp()) {
			canvas = Page.getApp().canvas
		}
		if (!canvas) {
			return
		}
		if (canvas && canvas.mini_element) {
			canvas = canvas.mini_element
		}
		canvas.cancelAnimationFrame(requestId)
	} catch (ex) {
		console.error(ex)
	}
}
