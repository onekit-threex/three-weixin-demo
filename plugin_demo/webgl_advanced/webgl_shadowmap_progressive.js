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
onLoad() {
    document.createElementAsync("canvas", "webgl").then(canvas=>this.run(canvas).then())
},
async run(canvas3d){
this.canvas = canvas3d

	}
})
