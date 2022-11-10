
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
import { NumberInput, LabelElement } from '../../libs/flow.module.js';
import { BaseNode } from '../core/BaseNode.js';
import { Vector3 } from '../../../../three/Three';
import { UniformNode } from '../../../jsm/nodes/Nodes.js';

export class Vector3Editor extends BaseNode {

	constructor() {

		const node = new UniformNode( new Vector3() );

		super( 'Vector 3', 3, node, 325 );

		const onUpdate = () => {

			node.value.x = fieldX.getValue();
			node.value.y = fieldY.getValue();
			node.value.z = fieldZ.getValue();

		};

		const fieldX = new NumberInput().setTagColor( 'red' ).onChange( onUpdate );
		const fieldY = new NumberInput().setTagColor( 'green' ).onChange( onUpdate );
		const fieldZ = new NumberInput().setTagColor( 'blue' ).onChange( onUpdate );

		this.add( new LabelElement( 'XYZ' ).add( fieldX ).add( fieldY ).add( fieldZ ) );

	}

}
