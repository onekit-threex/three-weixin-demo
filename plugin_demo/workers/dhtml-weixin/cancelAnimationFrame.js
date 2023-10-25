import Page from "./core/Page"
export default function cancelAnimationFrame(requestId,canvas=Page.current.canvas) {
	try {
		if(!canvas){
			return
		  }
		if (!requestId) {
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
