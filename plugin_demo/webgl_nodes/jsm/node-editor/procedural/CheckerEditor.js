
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
import { LabelElement } from '../../libs/flow.module.js';
import { BaseNode } from '../core/BaseNode.js';
import { CheckerNode, UVNode } from '../../../jsm/nodes/Nodes.js';

const defaultUV = new UVNode();

export class CheckerEditor extends BaseNode {

	constructor() {

		const node = new CheckerNode( defaultUV );

		super( 'Checker', 1, node, 200 );

		const field = new LabelElement( 'UV' ).setInput( 2 );

		field.onConnect( () => {

			node.uvNode = field.getLinkedObject() || defaultUV;

		} );

		this.add( field );

	}

}
