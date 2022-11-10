
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
import { SelectInput, Element, LabelElement } from '../../libs/flow.module.js';
import { BaseNode } from '../core/BaseNode.js';
import { MathNode, UniformNode } from '../../../jsm/nodes/Nodes.js';

const DEFAULT_VALUE = new UniformNode( 0 );

export class InvertEditor extends BaseNode {

	constructor() {

		const node = new MathNode( MathNode.INVERT, DEFAULT_VALUE );

		super( 'Invert / Negate', 1, node, 175 );

		const optionsField = new SelectInput( [
			{ name: 'Invert ( 1 - Source )', value: MathNode.INVERT },
			{ name: 'Negate ( - Source )', value: MathNode.NEGATE }
		], MathNode.INVERT ).onChange( () => {

			node.method = optionsField.getValue();

			this.invalidate();

		} );

		const input = new LabelElement( 'Source' ).setInput( 1 );

		input.onConnect( () => {

			node.aNode = input.getLinkedObject() || DEFAULT_VALUE;

		} );

		this.add( new Element().add( optionsField ) )
			.add( input );

	}

}
