// webgl_advanced/webgl_shadowmap_progressive.js
import {
	document,
	window,
	requestAnimationFrame,
	cancelAnimationFrame,
	Event,
	core
} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import {
	GUI
} from './jsm/libs/lil-gui.module.min.js';
import {
	GLTFLoader
} from './jsm/loaders/GLTFLoader.js';
import {
	OrbitControls
} from './jsm/controls/OrbitControls.js';
import {
	TransformControls
} from './jsm/controls/TransformControls.js';
import {
	ProgressiveLightMap
} from './jsm/misc/ProgressiveLightMap.js';

var requestId
Page({
	onUnload() {

	},
	async onLoad() {
		const canvas3d = this.canvas = await document.createElementAsync("canvas", "webgl")

	}
})
