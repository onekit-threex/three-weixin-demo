
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
import { SelectInput, LabelElement, Element } from '../../libs/flow.module.js';
import { BaseNode } from '../core/BaseNode.js';
import { OscNode, UniformNode } from '../../../jsm/nodes/Nodes.js';

const NULL_VALUE = new UniformNode( 0 );

export class OscillatorEditor extends BaseNode {

	constructor() {

		const node = new OscNode( OscNode.SINE, NULL_VALUE );

		super( 'Oscillator', 1, node, 175 );

		const methodInput = new SelectInput( [
			{ name: 'Sine', value: OscNode.SINE },
			{ name: 'Square', value: OscNode.SQUARE },
			{ name: 'Triangle', value: OscNode.TRIANGLE },
			{ name: 'Sawtooth', value: OscNode.SAWTOOTH }
		], OscNode.SINE );

		methodInput.onChange( () => {

			node.method = methodInput.getValue();

			this.invalidate();

		} );

		const timeElement = new LabelElement( 'Time' ).setInput( 1 );

		timeElement.onConnect( () => {

			node.timeNode = timeElement.getLinkedObject() || NULL_VALUE;

		} );

		this.add( new Element().add( methodInput ) )
			.add( timeElement );

	}

}
