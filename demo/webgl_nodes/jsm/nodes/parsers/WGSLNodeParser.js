
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
import NodeParser from '../core/NodeParser.js';
import WGSLNodeFunction from './WGSLNodeFunction.js';

class WGSLNodeParser extends NodeParser {

	parseFunction( source ) {

		return new WGSLNodeFunction( source );

	}

}

export default WGSLNodeParser;
