
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
import Node, { addNodeClass } from '../core/Node.js';
import { NodeUpdateType } from '../core/constants.js';
import { uniform } from '../core/UniformNode.js';
import { texture } from './TextureNode.js';
import { nodeObject } from '../shadernode/ShaderNode.js';

class ReferenceNode extends Node {

	constructor( property, uniformType, object = null ) {

		super();

		this.property = property;

		this.uniformType = uniformType;

		this.object = object;
		this.reference = null;

		this.node = null;

		this.updateType = NodeUpdateType.OBJECT;

		this.setNodeType( uniformType );

	}

	updateReference( frame ) {

		this.reference = this.object !== null ? this.object : frame.object;

		return this.reference;

	}

	setNodeType( uniformType ) {

		let node = null;

		if ( uniformType === 'texture' ) {

			node = texture( null );

		} else {

			node = uniform( uniformType );

		}

		this.node = node;

	}

	getNodeType( builder ) {

		return this.node.getNodeType( builder );

	}

	update( /*frame*/ ) {

		this.node.value = this.reference[ this.property ];

	}

	setup( /*builder*/ ) {

		return this.node;

	}

}

export default ReferenceNode;

export const reference = ( name, type, object ) => nodeObject( new ReferenceNode( name, type, object ) );

addNodeClass( 'ReferenceNode', ReferenceNode );
