
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
let id = 0;

class NodeCache {

	constructor() {

		this.id = id ++;
		this.nodesData = new WeakMap();

	}

	getNodeData( node ) {

		return this.nodesData.get( node );

	}

	setNodeData( node, data ) {

		this.nodesData.set( node, data );

	}

}

export default NodeCache;
