
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
import { SelectInput, Element } from '../../libs/flow.module.js';
import { BaseNode } from '../core/BaseNode.js';
import { NormalNode } from '../../../jsm/nodes/Nodes.js';

export class NormalEditor extends BaseNode {

	constructor() {

		const node = new NormalNode();

		super( 'Normal', 3, node, 200 );

		const optionsField = new SelectInput( [
			{ name: 'Local', value: NormalNode.LOCAL },
			{ name: 'World', value: NormalNode.WORLD },
			{ name: 'View', value: NormalNode.VIEW },
			{ name: 'Geometry', value: NormalNode.GEOMETRY }
		], NormalNode.LOCAL ).onChange( () => {

			node.scope = optionsField.getValue();

			this.invalidate();

		} );

		this.add( new Element().add( optionsField ) );

	}

}
