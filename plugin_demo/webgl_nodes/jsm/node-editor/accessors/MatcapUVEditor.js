
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
import { BaseNode } from '../core/BaseNode.js';
import { MatcapUVNode } from '../../../jsm/nodes/Nodes.js';

export class MatcapUVEditor extends BaseNode {

	constructor() {

		const node = new MatcapUVNode();

		super( 'Matcap UV', 2, node, 200 );

	}

}
