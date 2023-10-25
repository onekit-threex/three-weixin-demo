
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
import NodeLoader from './NodeLoader.js';
import NodeMaterialLoader from './NodeMaterialLoader.js';
import { ObjectLoader } from '../../../Three';

class NodeObjectLoader extends ObjectLoader {

	constructor( manager ) {

		super( manager );

		this._nodesJSON = null;

	}

	parse( json, onLoad ) {

		this._nodesJSON = json.nodes;

		const data = super.parse( json, onLoad );

		this._nodesJSON = null; // dispose

		return data;

	}

	parseNodes( json, textures ) {

		if ( json !== undefined ) {

			const loader = new NodeLoader();
			loader.setTextures( textures );

			return loader.parseNodes( json );

		}

		return {};

	}

	parseMaterials( json, textures ) {

		const materials = {};

		if ( json !== undefined ) {

			const nodes = this.parseNodes( this._nodesJSON, textures );

			const loader = new NodeMaterialLoader();
			loader.setTextures( textures );
			loader.setNodes( nodes );

			for ( let i = 0, l = json.length; i < l; i ++ ) {

				const data = json[ i ];

				materials[ data.uuid ] = loader.parse( data );

			}

		}

		return materials;

	}

}

export default NodeObjectLoader;
