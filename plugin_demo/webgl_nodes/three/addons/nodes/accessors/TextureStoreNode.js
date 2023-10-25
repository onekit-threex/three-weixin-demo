
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
import { addNodeClass } from '../core/Node.js';
import TextureNode from './TextureNode.js';
import { nodeProxy } from '../shadernode/ShaderNode.js';

class TextureStoreNode extends TextureNode {

	constructor( value, uvNode, storeNode = null ) {

		super( value, uvNode );

		this.storeNode = storeNode;

		this.isStoreTextureNode = true;

	}

	getNodeType( /*builder*/ ) {

		return 'void';

	}

}

export default TextureStoreNode;

export const textureStore = nodeProxy( TextureStoreNode );

addNodeClass( 'TextureStoreNode', TextureStoreNode );
