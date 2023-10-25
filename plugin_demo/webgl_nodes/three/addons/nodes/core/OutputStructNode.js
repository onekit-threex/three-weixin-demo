
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
import Node, { addNodeClass } from './Node.js';
import StructTypeNode from './StructTypeNode.js';
import { nodeProxy } from '../shadernode/ShaderNode.js';

class OutputStructNode extends Node {

	constructor( ...members ) {

		super();

		this.isOutputStructNode = true;
		this.members = members;

	}

	setup( builder ) {

		super.setup( builder );

		const members = this.members;
		const types = [];

		for ( let i = 0; i < members.length; i++ ) {

			types.push( members[ i ].getNodeType( builder ) );

		}

		this.nodeType = builder.getStructTypeFromNode( new StructTypeNode( types ) ).name;

	}

	generate( builder, output ) {

		const nodeVar = builder.getVarFromNode( this );
		nodeVar.isOutputStructVar = true;

		const propertyName = builder.getPropertyName( nodeVar );

		const members = this.members;

		const structPrefix = propertyName !== '' ? propertyName + '.' : '';

		for ( let i = 0; i < members.length; i++ ) {

			const snippet = members[ i ].build( builder, output );

			builder.addLineFlowCode( `${structPrefix}m${i} = ${snippet}` );

		}

		return propertyName;

	}

}

export default OutputStructNode;

export const outputStruct = nodeProxy( OutputStructNode );

addNodeClass( 'OutputStructNode', OutputStructNode );
