import Page from "./core/Page"
export default function requestAnimationFrame(callback,canvas=Page.current.canvas) {
  if(!canvas){
    return
  }
  if(canvas && canvas.mini_element){
    canvas = canvas.mini_element
  }
  const requestId = canvas.requestAnimationFrame(callback)
  return requestId
}
