
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
import { SplitNode, UniformNode } from '../../../jsm/nodes/Nodes.js';

const NULL_VALUE = new UniformNode( 0 );

export class SplitEditor extends BaseNode {

	constructor() {

		const node = new SplitNode( NULL_VALUE, 'x' );

		super( 'Split', 1, node, 175 );

		const componentsField = new SelectInput( [
			{ name: 'X | R', value: 'x' },
			{ name: 'Y | G', value: 'y' },
			{ name: 'Z | B', value: 'z' },
			{ name: 'W | A', value: 'w' }
		], node.components ).onChange( () => {

			node.components = componentsField.getValue();

			this.invalidate();

		} );

		const componentsElement = new Element().add( componentsField ).setInput( 1 )
			.onConnect( () => {

				node.node = componentsElement.getLinkedObject() || NULL_VALUE;

			} );

		this.add( componentsElement );

	}

}
