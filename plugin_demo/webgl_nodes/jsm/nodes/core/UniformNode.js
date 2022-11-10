
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
import InputNode from './InputNode.js';

class UniformNode extends InputNode {

	constructor( value, nodeType = null ) {

		super( value, nodeType );

		this.isUniformNode = true;

	}

	getUniformHash( builder ) {

		return this.getHash( builder );

	}

	generate( builder, output ) {

		const type = this.getNodeType( builder );

		const hash = this.getUniformHash( builder );

		let sharedNode = builder.getNodeFromHash( hash );

		if ( sharedNode === undefined ) {

			builder.setHashNode( this, hash );

			sharedNode = this;

		}

		const sharedNodeType = sharedNode.getInputType( builder );

		const nodeUniform = builder.getUniformFromNode( sharedNode, builder.shaderStage, sharedNodeType );
		const propertyName = builder.getPropertyName( nodeUniform );

		return builder.format( propertyName, type, output );

	}

}

export default UniformNode;
