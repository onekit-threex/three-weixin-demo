export default class Event0 {
    
    static fix(wx_e){
        const web_e = new Event0(wx_e.type)
        web_e.button = null;
        web_e.ctrlKey = false;
        web_e.metaKey = false;
        web_e.shiftKey = false;
        web_e.code = "";
        web_e.pointerType = "touch";
        //
        if(wx_e.changedTouches.length>0){
            const touch = wx_e.changedTouches[0]
            web_e.pointerId = touch.identifier || 2;
            web_e.pageX = touch.x;
            web_e.pageY = touch.y;
            web_e.clientX = touch.x-wx_e.currentTarget.offsetLeft;
            web_e.clientY = touch.y-wx_e.currentTarget.offsetTop;
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
