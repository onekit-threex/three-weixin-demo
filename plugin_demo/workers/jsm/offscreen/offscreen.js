import init from './scene.js';
import {self} from "dhtml-weixin"

worker.onMessage( function ( message ) {
    self2.onmessage(message)
	const data = message.data;
	init( data.drawingSurface, data.width, data.height, data.pixelRatio, data.path );

});
