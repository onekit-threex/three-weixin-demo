
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
	Vertex: 'vertex',
	Fragment: 'fragment'
};

export const NodeUpdateType = {
	None: 'none',
	Frame: 'frame',
	Object: 'object'
};

export const NodeType = {
	Boolean: 'bool',
	Integer: 'int',
	Float: 'float',
	Vector2: 'vec2',
	Vector3: 'vec3',
	Vector4: 'vec4',
	Matrix3: 'mat3',
	Matrix4: 'mat4'
};
