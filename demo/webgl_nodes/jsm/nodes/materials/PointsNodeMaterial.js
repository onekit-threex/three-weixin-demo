
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
import NodeMaterial from './NodeMaterial.js';
import { PointsMaterial } from '../../../../three/Three';

const defaultValues = new PointsMaterial();

class PointsNodeMaterial extends NodeMaterial {

	constructor( parameters ) {

		super();

		this.isPointsNodeMaterial = true;

		this.transparent = true;

		this.colorNode = null;
		this.opacityNode = null;

		this.alphaTestNode = null;

		this.lightNode = null;

		this.sizeNode = null;

		this.positionNode = null;

		this.setDefaultValues( defaultValues );

		this.setValues( parameters );

	}

	copy( source ) {

		this.colorNode = source.colorNode;
		this.opacityNode = source.opacityNode;

		this.alphaTestNode = source.alphaTestNode;

		this.lightNode = source.lightNode;

		this.sizeNode = source.sizeNode;

		this.positionNode = source.positionNode;

		return super.copy( source );

	}

}

export default PointsNodeMaterial;
