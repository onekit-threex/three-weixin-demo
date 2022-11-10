
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
import { Vector2 } from '../../../../three/Three';
import { UniformNode } from '../../../jsm/nodes/Nodes.js';

export class Vector2Editor extends BaseNode {

	constructor() {

		const node = new UniformNode( new Vector2() );

		super( 'Vector 2', 2, node );

		const onUpdate = () => {

			node.value.x = fieldX.getValue();
			node.value.y = fieldY.getValue();

		};

		const fieldX = new NumberInput().setTagColor( 'red' ).onChange( onUpdate );
		const fieldY = new NumberInput().setTagColor( 'green' ).onChange( onUpdate );

		this.add( new LabelElement( 'XY' ).add( fieldX ).add( fieldY ) );

	}

}
