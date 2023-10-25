
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
import LightingNode from './LightingNode.js';
import { addNodeClass } from '../core/Node.js';

class AONode extends LightingNode {

	constructor( aoNode = null ) {

		super();

		this.aoNode = aoNode;

	}

	setup( builder ) {

		const aoIntensity = 1;
		const aoNode = this.aoNode.x.sub( 1.0 ).mul( aoIntensity ).add( 1.0 );

		builder.context.ambientOcclusion.mulAssign( aoNode );

	}

}

export default AONode;

addNodeClass( 'AONode', AONode );
