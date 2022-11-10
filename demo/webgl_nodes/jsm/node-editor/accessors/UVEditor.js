
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
import { SelectInput, LabelElement } from '../../libs/flow.module.js';
import { BaseNode } from '../core/BaseNode.js';
import { UVNode } from '../../../jsm/nodes/Nodes.js';

export class UVEditor extends BaseNode {

	constructor() {

		const node = new UVNode();

		super( 'UV', 2, node, 200 );

		const optionsField = new SelectInput( [ '1', '2' ], 0 ).onChange( () => {

			node.index = Number( optionsField.getValue() );

			this.invalidate();

		} );

		this.add( new LabelElement( 'Channel' ).add( optionsField ) );

	}

}
