
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
import { MathNode, UniformNode } from '../../../jsm/nodes/Nodes.js';

const NULL_VALUE = new UniformNode( 0 );
const ONE_VALUE = new UniformNode( 1 );

export class BlendEditor extends BaseNode {

	constructor() {

		const node = new MathNode( MathNode.MIX, NULL_VALUE, NULL_VALUE, ONE_VALUE );

		super( 'Blend', 3, node, 200 );

		const aElement = new LabelElement( 'Base' ).setInput( 3 );
		const bElement = new LabelElement( 'Blend' ).setInput( 3 );
		const cElement = new LabelElement( 'Opacity' ).setInput( 1 );

		aElement.onConnect( () => {

			node.aNode = aElement.getLinkedObject() || NULL_VALUE;

		} );

		bElement.onConnect( () => {

			node.bNode = bElement.getLinkedObject() || NULL_VALUE;

		} );

		cElement.onConnect( () => {

			node.cNode = cElement.getLinkedObject() || ONE_VALUE;

		} );

		this.add( aElement )
			.add( bElement )
			.add( cElement );

	}

}
