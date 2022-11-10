
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
import { Vector3 } from '../../../../three/Three';
import { MathNode, UniformNode } from '../../../jsm/nodes/Nodes.js';

const DEFAULT_VALUE = new UniformNode( new Vector3() );

export class TrigonometryEditor extends BaseNode {

	constructor() {

		const node = new MathNode( MathNode.SIN, DEFAULT_VALUE );

		super( 'Trigonometry', 1, node, 175 );

		const optionsField = new SelectInput( [
			{ name: 'Sin', value: MathNode.SIN },
			{ name: 'Cos', value: MathNode.COS },
			{ name: 'Tan', value: MathNode.TAN },

			{ name: 'asin', value: MathNode.ASIN },
			{ name: 'acos', value: MathNode.ACOS },
			{ name: 'atan', value: MathNode.ATAN }
		], MathNode.SIN ).onChange( () => {

			node.method = optionsField.getValue();

			this.invalidate();

		} );

		const input = new LabelElement( 'A' ).setInput( 1 );

		input.onConnect( () => {

			node.aNode = input.getLinkedObject() || DEFAULT_VALUE;

		} );

		this.add( new Element().add( optionsField ) )
			.add( input );

	}

}
