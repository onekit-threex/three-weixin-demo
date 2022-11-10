
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
	ShaderMaterial,
	UniformsUtils
} from '../../../three/Three';
import { Pass, FullScreenQuad } from './Pass.js';
import { DotScreenShader } from '../shaders/DotScreenShader.js';

class DotScreenPass extends Pass {

	constructor( center, angle, scale ) {

		super();

		if ( DotScreenShader === undefined ) console.error( 'THREE.DotScreenPass relies on DotScreenShader' );

		const shader = DotScreenShader;

		this.uniforms = UniformsUtils.clone( shader.uniforms );

		if ( center !== undefined ) this.uniforms[ 'center' ].value.copy( center );
		if ( angle !== undefined ) this.uniforms[ 'angle' ].value = angle;
		if ( scale !== undefined ) this.uniforms[ 'scale' ].value = scale;

		this.material = new ShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		} );

		this.fsQuad = new FullScreenQuad( this.material );

	}

	render( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

		this.uniforms[ 'tDiffuse' ].value = readBuffer.texture;
		this.uniforms[ 'tSize' ].value.set( readBuffer.width, readBuffer.height );

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );
			if ( this.clear ) renderer.clear();
			this.fsQuad.render( renderer );

		}

	}

}

export { DotScreenPass };
