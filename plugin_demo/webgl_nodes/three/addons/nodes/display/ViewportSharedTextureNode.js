
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
import ViewportTextureNode from './ViewportTextureNode.js';
import { addNodeClass } from '../core/Node.js';
import { addNodeElement, nodeProxy } from '../shadernode/ShaderNode.js';
import { viewportTopLeft } from './ViewportNode.js';
import { FramebufferTexture } from '../../../Three';

let sharedFramebuffer = null;

class ViewportSharedTextureNode extends ViewportTextureNode {

	constructor( uvNode = viewportTopLeft, levelNode = null ) {

		if ( sharedFramebuffer === null ) {

			sharedFramebuffer = new FramebufferTexture();

		}

		super( uvNode, levelNode, sharedFramebuffer );

	}

}

export default ViewportSharedTextureNode;

export const viewportSharedTexture = nodeProxy( ViewportSharedTextureNode );

addNodeElement( 'viewportSharedTexture', viewportSharedTexture );

addNodeClass( 'ViewportSharedTextureNode', ViewportSharedTextureNode );
