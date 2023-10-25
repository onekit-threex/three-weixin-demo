
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
import NodeMaterial, { addNodeMaterial } from './NodeMaterial.js';
import { shininess, specularColor } from '../core/PropertyNode.js';
import { materialShininess, materialSpecularColor } from '../accessors/MaterialNode.js';
import { float } from '../shadernode/ShaderNode.js';
import PhongLightingModel from '../functions/PhongLightingModel.js';

import { MeshPhongMaterial } from '../../../Three';

const defaultValues = new MeshPhongMaterial();

class MeshPhongNodeMaterial extends NodeMaterial {

	constructor( parameters ) {

		super();

		this.isMeshPhongNodeMaterial = true;

		this.lights = true;

		this.shininessNode = null;
		this.specularNode = null;

		this.setDefaultValues( defaultValues );

		this.setValues( parameters );

	}

	setupLightingModel( /*builder*/ ) {

		return new PhongLightingModel();

	}

	setupVariants() {

		// SHININESS

		const shininessNode = ( this.shininessNode ? float( this.shininessNode ) : materialShininess ).max( 1e-4 ); // to prevent pow( 0.0, 0.0 )

		shininess.assign( shininessNode );

		// SPECULAR COLOR

		const specularNode = this.specularNode || materialSpecularColor;

		specularColor.assign( specularNode );

	}

	copy( source ) {

		this.shininessNode = source.shininessNode;
		this.specularNode = source.specularNode;

		return super.copy( source );

	}

}

export default MeshPhongNodeMaterial;

addNodeMaterial( 'MeshPhongNodeMaterial', MeshPhongNodeMaterial );
