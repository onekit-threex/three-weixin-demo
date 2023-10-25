
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
import NodeCache from './NodeCache.js';
import { addNodeElement, nodeProxy } from '../shadernode/ShaderNode.js';

class CacheNode extends Node {

	constructor( node, cache = new NodeCache() ) {

		super();

		this.isCacheNode = true;

		this.node = node;
		this.cache = cache;

	}

	getNodeType( builder ) {

		return this.node.getNodeType( builder );

	}

	build( builder, ...params ) {

		const previousCache = builder.getCache();

		builder.setCache( this.cache );

		const data = this.node.build( builder, ...params );

		builder.setCache( previousCache );

		return data;

	}

}

export default CacheNode;

export const cache = nodeProxy( CacheNode );

addNodeElement( 'cache', cache );

addNodeClass( 'CacheNode', CacheNode );
