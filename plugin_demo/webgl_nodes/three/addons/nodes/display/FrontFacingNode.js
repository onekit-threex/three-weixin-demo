
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
import { nodeImmutable, float } from '../shadernode/ShaderNode.js';

class FrontFacingNode extends Node {

	constructor() {

		super( 'bool' );

		this.isFrontFacingNode = true;

	}

	generate( builder ) {

		return builder.getFrontFacing();

	}

}

export default FrontFacingNode;

export const frontFacing = nodeImmutable( FrontFacingNode );
export const faceDirection = float( frontFacing ).mul( 2.0 ).sub( 1.0 );

addNodeClass( 'FrontFacingNode', FrontFacingNode );
