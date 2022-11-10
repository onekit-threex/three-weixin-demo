
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
import { ShaderNode, mul } from '../../shadernode/ShaderNodeBaseElements.js';

const BRDF_Lambert = new ShaderNode( ( inputs ) => {

	return mul( 1 / Math.PI, inputs.diffuseColor ); // punctual light

} ); // validated

export default BRDF_Lambert;
