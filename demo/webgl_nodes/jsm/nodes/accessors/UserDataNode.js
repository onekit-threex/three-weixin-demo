
import {
    Blob,
    btoa,
    createImageBitmap,
    CSSStyleDeclaration,
    performance,
    document,
    DOMParser,
    EventTarget,
    fetch,
    Headers,
    HTMLCanvasElement,
	Image,
    HTMLImageElement,
    ImageBitmap,
    location,
    navigator,
    Request,
    requestAnimationFrame,
    cancelAnimationFrame,
    Response,
    URL,
    window,
    self,
    WebAssembly,
    Worker,
    XMLHttpRequest,
	ImageData,
	TextDecoder,
    core
    } from 'dhtml-weixin';
import ReferenceNode from './ReferenceNode.js';

class UserDataNode extends ReferenceNode {

	constructor( property, inputType, userData = null ) {

		super( property, inputType, userData );

		this.userData = userData;

	}

	update( frame ) {

		this.object = this.userData !== null ? this.userData : frame.object.userData;

		super.update( frame );

	}

}

export default UserDataNode;
