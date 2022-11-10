
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
import { StringInput, Element } from '../../libs/flow.module.js';
import { BaseNode } from './BaseNode.js';
import { DataFile } from './DataFile.js';

export class FileURLEditor extends BaseNode {

	constructor() {

		const dataFile = new DataFile();

		super( 'File URL', 1, dataFile, 250 );

		const urlInput = new StringInput().onChange( () => {

			if ( urlInput.getValue() !== dataFile.getURL() ) {

				dataFile.setValue( urlInput.getValue() );

				this.invalidate();

			}

		} );

		this.add( new Element().add( urlInput ) );

	}

}
