
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
import {
	WireframeGeometry
} from '../../Three';
import { LineSegmentsGeometry } from '../lines/LineSegmentsGeometry.js';

class WireframeGeometry2 extends LineSegmentsGeometry {

	constructor( geometry ) {

		super();

		this.isWireframeGeometry2 = true;

		this.type = 'WireframeGeometry2';

		this.fromWireframeGeometry( new WireframeGeometry( geometry ) );

		// set colors, maybe

	}

}

export { WireframeGeometry2 };
