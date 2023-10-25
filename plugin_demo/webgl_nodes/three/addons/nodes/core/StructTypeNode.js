
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
import Node, { addNodeClass } from './Node.js';

class StructTypeNode extends Node {

	constructor( types ) {

		super();

        this.types = types;
		this.isStructTypeNode = true;

	}

    getMemberTypes() {

        return this.types;

    }

}

export default StructTypeNode;

addNodeClass( 'StructTypeNode', StructTypeNode );
