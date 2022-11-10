
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
import CameraNode from '../accessors/CameraNode.js';
import ModelNode from '../accessors/ModelNode.js';
import OperatorNode from '../math/OperatorNode.js';
import PositionNode from '../accessors/PositionNode.js';

class ModelViewProjectionNode extends Node {

	constructor( position = new PositionNode() ) {

		super( 'vec4' );

		this.position = position;

	}

	generate( builder ) {

		const position = this.position;

		const mvpMatrix = new OperatorNode( '*', new CameraNode( CameraNode.PROJECTION_MATRIX ), new ModelNode( ModelNode.VIEW_MATRIX ) );
		const mvpNode = new OperatorNode( '*', mvpMatrix, position );

		return mvpNode.build( builder );

	}

}

export default ModelViewProjectionNode;
