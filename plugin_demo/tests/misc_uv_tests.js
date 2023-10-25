// tests/misc_uv_tests.js
import {
	document,
	window,
	requestAnimationFrame,
	cancelAnimationFrame,
    Event,
    core
} from 'dhtml-weixin';
import * as THREE from './three/Three.js';
import {
	UVsDebug
} from './three/addons/utils/UVsDebug.js';

Page({
	data: {
		tests: []
	},
	onUnload() {
	//	cancelAnimationFrame(requestId, this.canvas)
this.worker && this.worker.terminate()
if(this.canvas) this.canvas = null

	},
	    webgl_touch(e) {
        const web_e = (window.platform=="devtools"?Event:Event0).fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
 onLoad() {
	//	const canvas3d = this.canvas = document.createElementAsync("canvas", "webgl")
		var that = this

		 function test(name, geometry) {

			/*  const d = document.createElement( 'div' );

    d.innerHTML = '<h3>' + name + '</h3>';

    d.appendChild( UVsDebug( geometry ) );

    document.body.appendChild( d );
*/
            var canvas = UVsDebug(geometry)
             const result = canvas.mini_element.toDataURL()
			const key = `tests[${that.data.tests.length}]`
			const data = {}
			data[key] =  {
					name,
					result
				}
			that.setData(data)
		}

		const points = [];

		for (let i = 0; i < 10; i++) {

			points.push(new THREE.Vector2(Math.sin(i * 0.2) * 15 + 50, (i - 5) * 2));

		}

		//

		test('new THREE.PlaneGeometry( 100, 100, 4, 4 )', new THREE.PlaneGeometry(100, 100, 4, 4));

		test('new THREE.SphereGeometry( 75, 12, 6 )', new THREE.SphereGeometry(75, 12, 6));

		test('new THREE.IcosahedronGeometry( 30, 1 )', new THREE.IcosahedronGeometry(30, 1));

		test('new THREE.OctahedronGeometry( 30, 2 )', new THREE.OctahedronGeometry(30, 2));

		test('new THREE.CylinderGeometry( 25, 75, 100, 10, 5 )', new THREE.CylinderGeometry(25, 75, 100, 10, 5));

		test('new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 )', new THREE.BoxGeometry(100, 100, 100, 4, 4, 4));

		test('new THREE.LatheGeometry( points, 8 )', new THREE.LatheGeometry(points, 8));

		test('new THREE.TorusGeometry( 50, 20, 8, 8 )', new THREE.TorusGeometry(50, 20, 8, 8));

		test('new THREE.TorusKnotGeometry( 50, 10, 12, 6 )', new THREE.TorusKnotGeometry(50, 10, 12, 6));

	}
})
