import {
	navigator
} from "dhtml-weixin"
var Ammo
//console.error("[ammo]",navigator.platform)
//if (navigator.platform=="ios"){
	Ammo = require("./ammo.js")
//} else {
//	Ammo = require("./ammo.wasm")
//}
module.exports = Ammo
