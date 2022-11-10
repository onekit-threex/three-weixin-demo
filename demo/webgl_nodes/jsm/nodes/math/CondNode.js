
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
import PropertyNode from '../core/PropertyNode.js';
import ContextNode from '../core/ContextNode.js';

class CondNode extends Node {

	constructor( condNode, ifNode, elseNode ) {

		super();

		this.condNode = condNode;

		this.ifNode = ifNode;
		this.elseNode = elseNode;

	}

	getNodeType( builder ) {

		const ifType = this.ifNode.getNodeType( builder );
		const elseType = this.elseNode.getNodeType( builder );

		if ( builder.getTypeLength( elseType ) > builder.getTypeLength( ifType ) ) {

			return elseType;

		}

		return ifType;

	}

	generate( builder ) {

		const type = this.getNodeType( builder );

		const context = { tempWrite: false };
		const nodeProperty = new PropertyNode( null, type ).build( builder );

		const nodeSnippet = new ContextNode( this.condNode/*, context*/ ).build( builder, 'bool' ),
			ifSnippet = new ContextNode( this.ifNode, context ).build( builder, type ),
			elseSnippet = new ContextNode( this.elseNode, context ).build( builder, type );

		builder.addFlowCode( `if ( ${nodeSnippet} ) {

\t\t${nodeProperty} = ${ifSnippet};

\t} else {

\t\t${nodeProperty} = ${elseSnippet};

\t}` );

		return nodeProperty;

	}

}

export default CondNode;
