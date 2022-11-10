
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
import { LabelElement, NumberInput } from '../../libs/flow.module.js';
import { BaseNode } from '../core/BaseNode.js';
import { MathNode, UniformNode } from '../../../jsm/nodes/Nodes.js';

export class PowerEditor extends BaseNode {

	constructor() {

		const NULL_VALUE = new UniformNode( 0 );
		const node = new MathNode( MathNode.POW, NULL_VALUE, NULL_VALUE );

		super( 'Power', 1, node, 175 );

		const aElement = new LabelElement( 'A' ).setInput( 1 );
		const bElement = new LabelElement( 'B' ).setInput( 1 );

		aElement.add( new NumberInput().onChange( ( field ) => {

			node.aNode.value = field.getValue();

		} ) ).onConnect( ( elmt ) => {

			elmt.setEnabledInputs( ! elmt.getLinkedObject() );
			node.aNode = elmt.getLinkedObject() || NULL_VALUE;

		} );

		bElement.add( new NumberInput().onChange( ( field ) => {

			node.bNode.value = field.getValue();

		} ) ).onConnect( ( elmt ) => {

			elmt.setEnabledInputs( ! elmt.getLinkedObject() );
			node.bNode = elmt.getLinkedObject() || NULL_VALUE;

		} );

		this.add( aElement )
			.add( bElement );

	}

}
