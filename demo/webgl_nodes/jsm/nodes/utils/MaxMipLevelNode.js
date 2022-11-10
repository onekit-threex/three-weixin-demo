
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
import UniformNode from '../core/UniformNode.js';
import { NodeUpdateType } from '../core/constants.js';

class MaxMipLevelNode extends UniformNode {

	constructor( texture ) {

		super( 0 );

		this.texture = texture;

		this.updateType = NodeUpdateType.Frame;

	}

	update() {

		const images = this.texture.images;
		const image = ( images && images.length > 0 ) ? ( images[ 0 ]?.image || images[ 0 ] ) : this.texture.image;

		if ( image?.width !== undefined ) {

			const { width, height } = image;

			this.value = Math.log2( Math.max( width, height ) );

		}

	}

}

export default MaxMipLevelNode;
