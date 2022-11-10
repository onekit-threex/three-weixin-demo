
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
import LightingNode from './LightingNode.js';
import { NodeUpdateType } from '../core/constants.js';
import { uniform } from '../shadernode/ShaderNodeElements.js';

import { Color } from '../../../../three/Three';

class AnalyticLightNode extends LightingNode {

	constructor( light = null ) {

		super();

		this.updateType = NodeUpdateType.Object;

		this.light = light;

		this.colorNode = uniform( new Color() );

	}

	getHash( /*builder*/ ) {

		return this.light.uuid;

	}

	update( /*frame*/ ) {

		const { light } = this;

		this.colorNode.value.copy( light.color ).multiplyScalar( light.intensity );

	}

}

export default AnalyticLightNode;
