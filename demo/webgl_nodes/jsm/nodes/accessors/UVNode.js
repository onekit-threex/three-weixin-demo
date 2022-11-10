
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
import AttributeNode from '../core/AttributeNode.js';

class UVNode extends AttributeNode {

	constructor( index = 0 ) {

		super( null, 'vec2' );

		this.isUVNode = true;

		this.index = index;

	}

	getAttributeName( /*builder*/ ) {

		const index = this.index;

		return 'uv' + ( index > 0 ? index + 1 : '' );

	}

	serialize( data ) {

		super.serialize( data );

		data.index = this.index;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.index = data.index;

	}

}

export default UVNode;
