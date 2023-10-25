
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
import { tslFn, vec3 } from '../../shadernode/ShaderNode.js';

const Schlick_to_F0 = tslFn( ( { f, f90, dotVH } ) => {

	const x = dotVH.oneMinus().saturate();
	const x2 = x.mul( x );
	const x5 = x.mul( x2, x2 ).clamp( 0, .9999 );

	return f.sub( vec3( f90 ).mul( x5 ) ).div( x5.oneMinus() );

} ).setLayout( {
	name: 'Schlick_to_F0',
	type: 'vec3',
	inputs: [
		{ name: 'f', type: 'vec3' },
		{ name: 'f90', type: 'float' },
		{ name: 'dotVH', type: 'float' }
	]
} );

export default Schlick_to_F0;
