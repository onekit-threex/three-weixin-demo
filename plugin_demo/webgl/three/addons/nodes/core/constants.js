
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
export const NodeShaderStage = {
	VERTEX: 'vertex',
	FRAGMENT: 'fragment'
};

export const NodeUpdateType = {
	NONE: 'none',
	FRAME: 'frame',
	RENDER: 'render',
	OBJECT: 'object'
};

export const NodeType = {
	BOOLEAN: 'bool',
	INTEGER: 'int',
	FLOAT: 'float',
	VECTOR2: 'vec2',
	VECTOR3: 'vec3',
	VECTOR4: 'vec4',
	MATRIX3: 'mat3',
	MATRIX4: 'mat4'
};

export const defaultShaderStages = [ 'fragment', 'vertex' ];
export const defaultBuildStages = [ 'setup', 'analyze', 'generate' ];
export const shaderStages = [ ...defaultShaderStages, 'compute' ];
export const vectorComponents = [ 'x', 'y', 'z', 'w' ];
