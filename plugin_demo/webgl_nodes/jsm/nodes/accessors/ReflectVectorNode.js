
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
import Node from '../core/Node.js';
import {
	transformedNormalView, positionViewDirection,
	transformDirection, negate, reflect, cameraViewMatrix
} from '../shadernode/ShaderNodeBaseElements.js';

class ReflectVectorNode extends Node {

	constructor() {

		super( 'vec3' );

	}

	getHash( /*builder*/ ) {

		return 'reflectVector';

	}

	construct() {

		const reflectView = reflect( negate( positionViewDirection ), transformedNormalView );

		return transformDirection( reflectView, cameraViewMatrix );

	}

}

export default ReflectVectorNode;
