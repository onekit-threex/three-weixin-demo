export default class Event {
    
    static fix(mini_e){
        const web_e = new Event(mini_e.type)
        web_e.button = null;
        web_e.ctrlKey = false;
        web_e.metaKey = false;
        web_e.shiftKey = false;
        web_e.code = "";
        web_e.pointerType = "touch";
        //
        if(mini_e.changedTouches.length>0){
            const touch = mini_e.changedTouches[0]
            web_e.pointerId = touch.identifier || 2;
            web_e.pageX = touch.x;
            web_e.pageY = touch.y;
            web_e.clientX = touch.x-mini_e.currentTarget.offsetLeft;
            web_e.clientY = touch.y-mini_e.currentTarget.offsetTop;
            //
            web_e.offsetX = web_e.clientX;
            web_e.offsetY = web_e.clientY;
            web_e.deltaX = web_e.offsetX;
            web_e.deltaY = web_e.offsetY;
        }
        return web_e
    }
    
    //////////////////////////////////////////////////////////////

    constructor(type, options) {
        this.type = type
        this.options = options
    }
    preventDefault() {

    }
}
