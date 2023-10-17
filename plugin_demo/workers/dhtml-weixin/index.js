import Blob from "./Blob";
import createImageBitmap from "./createImageBitmap";
import CSSStyleDeclaration from "./CSSStyleDeclaration";
import Document from "./document";
import fetch from "./fetch";
import Headers from "./Headers";
import HTMLImageElement from "./HTMLImageElement";
import HTMLCanvasElement from "./HTMLCanvasElement"
import ImageBitmap from "./ImageBitmap"
import navigator from "./navigator";
import Request from "./Request";
import requestAnimationFrame from "./requestAnimationFrame";
import cancelAnimationFrame from "./cancelAnimationFrame";
import Response from "./Response";
import URL from "./URL";
import Window from "./window";
const WebAssembly = require("./WebAssembly");
import Worker from "./Worker";
import XMLHttpRequest from "./XMLHttpRequest";
import Location from "./Location";
import { DOMParser } from "./core/xmldom/dom-parser";
import core from "./core/index";
import EventTarget from "./EventTarget";
import Element from "./Element";
import Node from "./Node";
import Event from "./Event";
import Performance from "./Performance";
import btoa from "./btoa"
const performance = new Performance();
const document = new Document();
const window = new Window();
const self = window;
const location = new Location();
module.exports = {
  Blob,
  btoa,
  createImageBitmap,
  CSSStyleDeclaration,
  performance,
  document,
  DOMParser,
  EventTarget,
  Element,
  fetch,
  Headers,
  HTMLCanvasElement,
  HTMLImageElement,
  ImageBitmap,
  location,
  navigator,
  Node,
  Event,
  Request,
  requestAnimationFrame,
  cancelAnimationFrame,
  Response,
  self,
  URL,
  window,
  WebAssembly,
  Worker,
  XMLHttpRequest,
  core,
};
