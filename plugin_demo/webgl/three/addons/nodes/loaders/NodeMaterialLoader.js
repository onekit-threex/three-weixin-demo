
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
import { MaterialLoader } from '../../../Three';
import { createNodeMaterialFromType } from '../materials/Materials.js';

const superFromTypeFunction = MaterialLoader.createMaterialFromType;

MaterialLoader.createMaterialFromType = function ( type ) {

	const material = createNodeMaterialFromType( type );

	if ( material !== undefined ) {

		return material;

	}

	return superFromTypeFunction.call( this, type );

};

class NodeMaterialLoader extends MaterialLoader {

	constructor( manager ) {

		super( manager );

		this.nodes = {};

	}

	parse( json ) {

		const material = super.parse( json );

		const nodes = this.nodes;
		const inputNodes = json.inputNodes;

		for ( const property in inputNodes ) {

			const uuid = inputNodes[ property ];

			material[ property ] = nodes[ uuid ];

		}

		return material;

	}

	setNodes( value ) {

		this.nodes = value;

		return this;

	}

}

export default NodeMaterialLoader;
