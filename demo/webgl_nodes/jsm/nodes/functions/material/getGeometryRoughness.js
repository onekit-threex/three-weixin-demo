
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
import { ShaderNode, max, abs, dFdx, dFdy, normalGeometry } from '../../shadernode/ShaderNodeBaseElements.js';

const getGeometryRoughness = new ShaderNode( () => {

	const dxy = max( abs( dFdx( normalGeometry ) ), abs( dFdy( normalGeometry ) ) );
	const geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );

	return geometryRoughness;

} );

export default getGeometryRoughness;
