
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
import Node, { addNodeClass } from '../core/Node.js';

class LightingNode extends Node {

	constructor() {

		super( 'vec3' );

	}

	generate( /*builder*/ ) {

		console.warn( 'Abstract function.' );

	}

}

export default LightingNode;

addNodeClass( 'LightingNode', LightingNode );
