
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
import TempNode from '../core/TempNode.js';
import { vec2, vec3, negate, normalize, cross, dot, mul, add, transformedNormalView, positionViewDirection } from '../shadernode/ShaderNodeBaseElements.js';

class MatcapUVNode extends TempNode {

	constructor() {

		super( 'vec2' );

	}

	generate( builder ) {

		const x = normalize( vec3( positionViewDirection.z, 0, negate( positionViewDirection.x ) ) );
		const y = cross( positionViewDirection, x );

		const uv = add( mul( vec2( dot( x, transformedNormalView ), dot( y, transformedNormalView ) ), 0.495 ), 0.5 );

		return uv.build( builder, this.getNodeType( builder ) );

	}

}

export default MatcapUVNode;
