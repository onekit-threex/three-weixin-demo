// webgl_nodes/webgl_nodes_materialx_noise.js
import {
	document,
	window,
	requestAnimationFrame,
	cancelAnimationFrame,
	Event,
	core
} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import { MeshPhysicalNodeMaterial, add, mul, normalWorld, clamp, timerLocal }  from './jsm/nodes/Nodes.js';

import {
	mx_perlin_noise_float,
	mx_cell_noise_float,
	mx_worley_noise_float,
	mx_fractal_noise_float
} from './jsm/nodes/materialx/functions/lib/mx_noise.js';

import {
	nodeFrame
} from './jsm/renderers/webgl/nodes/WebGLNodes.js';

import Stats from './jsm/libs/stats.module.js';

import {
	OrbitControls
} from './jsm/controls/OrbitControls.js';
import {
	HDRCubeTextureLoader
} from './jsm/loaders/HDRCubeTextureLoader.js';

import {
	GUI
} from './jsm/libs/lil-gui.module.min.js';

var requestId
Page({
	onUnload() {
	
	},
	 onLoad() {
	
	}
})
