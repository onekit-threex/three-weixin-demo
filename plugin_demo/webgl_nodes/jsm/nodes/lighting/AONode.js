
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
import { float, add, mul, sub } from '../shadernode/ShaderNodeElements.js';

class AONode extends LightingNode {

	constructor( aoNode = null ) {

		super();

		this.aoNode = aoNode;

	}

	construct( builder ) {

		const aoIntensity = 1;
		const aoNode = add( mul( sub( float( this.aoNode ), 1.0 ), aoIntensity ), 1.0 );

		builder.context.ambientOcclusion.mul( aoNode );

	}

}

export default AONode;
