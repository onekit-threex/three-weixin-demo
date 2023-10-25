"use strict";
/* eslint-disable class-methods-use-this */
import String from "./core/String";
function fix(value){
    if(value.endsWith("px")){
        value = value.substring(0,value.length-2)
    }
    return value
}
export default class Style {
	constructor(element) {
		//this.element = element;
		this.styles = {};
		this.value = "";
	}
	set cssText(cssText) {
		this._cssText = cssText;
	}

	get cssText() {
		return this._cssText;
	}

	setProperty() {}
	run(key, value) {
		return
        if(!this.element){
            return
        }
		if(!this.element.mini_key){
			return
		}
		/*
		function dict2string(dict) {
		  var string = "";
		  for (const key of Object.keys(dict)) {
		    string += `${String.fromHump(key)}:${dict[key]};`;
		  }
		  return string;
		}
		const data = {};
		data[`${this.element.mini_key}_style`] = dict2string(this.styles);*/

		const data = {};
		this.value += `${String.fromHump(key)}:${value};`;
		data[`${this.element.mini_key}_style`] = this.value
		//
		if (!this.page) {
			const pages = getCurrentPages();
			this.page = pages[pages.length - 1];
		}
		if(!this.page){
			return
		}
		//this.page.setData(data);
	}
	set display(value) {
		//this.styles.display = value;
		this.run("display", value);
	}
	set pointerEvents(value) {
		//this.styles.pointerEvents = value;
		this.run("pointerEvents", value);
	}

	set margin(value) {
		//this.styles.margin = value;
		this.run("margin", value);
	}
	set marginBottom(value) {
		//this.styles.marginBottom = value;
		this.run("marginBottom", value);
	}
	set marginTop(value) {
		//this.styles.marginTop = value;
		this.run("marginTop", value);
	}
	set marginLeft(value) {
		//this.styles.marginLeft = value;
		this.run("marginLeft", value);
	}
	set marginRight(value) {
		//this.styles.marginRight = value;
		this.run("marginRight", value);
	}

	set padding(value) {
		//this.styles.padding = value;
		this.run("padding", value);
	}
	set paddingBottom(value) {
		//this.styles.paddingBottom = value;
		this.run("paddingBottom", value);
	}
	set paddingTop(value) {
		//this.styles.paddingTop = value;
		this.run("paddingTop", value);
	}
	set paddingLeft(value) {
		//this.styles.paddingLeft = value;
		this.run("paddingLeft", value);
	}
	set paddingRight(value) {
		//this.styles.paddingRight = value;
		this.run("paddingRight", value);
	}

	set position(value) {
		//this.styles.position = value;
		this.run("position", value);
	}
	set backfaceVisibility(value) {
		//this.styles.backfaceVisibility = value;
		this.run("backfaceVisibility", value);
	}
	set transformStyle(value) {
		//this.styles.transformStyle = value;
		this.run("transformStyle", value);
	}
	set fontFamily(value) {
		//this.styles.fontFamily = value;
		this.run("fontFamily", value);
	}
	set fontSize(value) {
		//this.styles.fontSize = value;
		this.run("fontSize", value);
	}
	set fontStyle(value) {
		//this.styles.fontStyle = value;
		this.run("fontStyle", value);
	}
	set fontWeight(value) {
		//this.styles.fontWeight = value;
		this.run("fontWeight", value);
	}
	set letterSpacing(value) {
		//this.styles.letterSpacing = value;
		this.run("letterSpacing", value);
	}
	set color(value) {
		//this.styles.color = value;
		this.run("color", value);
	}
	set background(value) {
		//this.styles.background = value;
		this.run("background", value);
	}
	set backgroundColor(value) {
		//this.styles.backgroundColor = value;
		this.run("backgroundColor", value);
	}
	set touchAction(value) {
		//this.styles.touchAction = value;
		this.run("touchAction", value);
	}
	set visibility(value) {
		//this.styles.visibility = value;
		this.run("visibility", value);
	}
	set zoom(value) {
		//this.styles.zoom = value;
		this.run("zoom", value);
	}
	set userSelect(value) {
		//this.styles.userSelect = value;
		this.run("userSelect", value);
	}
	set overflow(value) {
		//this.styles.overflow = value;
		this.run("overflow", value);
	}

	set width(value0) {
		this.run("width", value0);
	}
	set height(value0) {
		this.run("height", value0);
	}
	set left(value0) {
		this.run("left", value0);
	}
	set right(value0) {
		this.run("right", value0);
	}
	set top(value0) {
		this.run("top", value0);
	}
	set bottom(value0) {
		this.run("bottom", value0);
    }


	set opacity(value) {
		//this.styles.opacity = value;
		this.run("opacity", value);
	}
	set transform(value) {
		//this.styles.transform = value;
		this.run("transform", value);
	}
	set transformOrigin(value) {
		//this.styles.transformOrigin = value;
		this.run("transformOrigin", value);
	}
}
