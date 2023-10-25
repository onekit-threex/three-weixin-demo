
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

import {
BufferAttribute,
BufferGeometry,
FileLoader,
Loader
} from '../../../three/Three';
const _taskCache = new WeakMap();

class DRACOLoader extends Loader {

constructor( manager ) {

  super( manager );

  this.decoderPath = '';
  this.decoderConfig = {};
  this.decoderBinary = null;
  this.decoderPending = null;

  this.workerLimit = 1;//4;
  this.workerPool = [];
  this.workerNextTaskID = 1;
  this.workerSourceURL = '';

  this.defaultAttributeIDs = {
    position: 'POSITION',
    normal: 'NORMAL',
    color: 'COLOR',
    uv: 'TEX_COORD'
  };
  this.defaultAttributeTypes = {
    position: 'Float32Array',
    normal: 'Float32Array',
    color: 'Float32Array',
    uv: 'Float32Array'
  };

}

setDecoderPath( path ) {

  this.decoderPath = path;

  return this;

}

setDecoderConfig( config ) {

  this.decoderConfig = config;

  return this;

}

setWorkerLimit( workerLimit ) {

  this.workerLimit = workerLimit;

  return this;

}

load( url, onLoad, onProgress, onError ) {

  const loader = new FileLoader( this.manager );

  loader.setPath( this.path );
  loader.setResponseType( 'arraybuffer' );
  loader.setRequestHeader( this.requestHeader );
  loader.setWithCredentials( this.withCredentials );

  loader.load( url, ( buffer ) => {

    this.decodeDracoFile( buffer, onLoad ).catch( onError );

  }, onProgress, onError );

}

decodeDracoFile( buffer, callback, attributeIDs, attributeTypes ) {

  const taskConfig = {
    attributeIDs: attributeIDs || this.defaultAttributeIDs,
    attributeTypes: attributeTypes || this.defaultAttributeTypes,
    useUniqueIDs: !! attributeIDs
  };

  return this.decodeGeometry( buffer, taskConfig ).then( callback );

}

decodeGeometry( buffer, taskConfig ) {

  const taskKey = JSON.stringify( taskConfig );

  // Check for an existing task using this buffer. A transferred buffer cannot be transferred
  // again from this thread.
  if ( _taskCache.has( buffer ) ) {

    const cachedTask = _taskCache.get( buffer );

    if ( cachedTask.key === taskKey ) {

      return cachedTask.promise;

    } else if ( buffer.byteLength === 0 ) {

      // Technically, it would be possible to wait for the previous task to complete,
      // transfer the buffer back, and decode again with the second configuration. That
      // is complex, and I don't know of any reason to decode a Draco buffer twice in
      // different ways, so this is left unimplemented.
      throw new Error(

        'THREE.DRACOLoader: Unable to re-decode a buffer with different ' +
        'settings. Buffer has already been transferred.'

      );

    }

  }

  //

  let worker;
  const taskID = this.workerNextTaskID ++;
  const taskCost = buffer.byteLength;

  // Obtain a worker and assign a task, and construct a geometry instance
  // when the task completes.
  const geometryPending = this._getWorker( taskID, taskCost )
    .then( ( _worker ) => {

      worker = _worker;

      return new Promise( ( resolve, reject ) => {

        worker._callbacks[ taskID ] = { resolve, reject };
                   //console.error( 'm -> ?', { type: 'decode', id: taskID, taskConfig, buffer }, [ buffer ] )
        worker.postMessage( { type: 'decode', id: taskID, taskConfig, buffer }, [ buffer ] );

        // this.debug();

      } );

    } )
    .then( ( message ) => this._createGeometry( message.geometry ) );

  // Remove task from the task list.
  // Note: replaced '.finally()' with '.catch().then()' block - iOS 11 support (#19416)
  geometryPending
    .catch( () => true )
    .then( () => {

      if ( worker && taskID ) {

        this._releaseTask( worker, taskID );

        // this.debug();

      }

    } );

  // Cache the task result.
  _taskCache.set( buffer, {

    key: taskKey,
    promise: geometryPending

  } );

  return geometryPending;

}

_createGeometry( geometryData ) {

  const geometry = new BufferGeometry();

  if ( geometryData.index ) {

    geometry.setIndex( new BufferAttribute( geometryData.index.array, 1 ) );

  }

  for ( let i = 0; i < geometryData.attributes.length; i ++ ) {

    const attribute = geometryData.attributes[ i ];
    const name = attribute.name;
    const array = attribute.array;
    const itemSize = attribute.itemSize;

    geometry.setAttribute( name, new BufferAttribute( array, itemSize ) );

  }

  return geometry;

}

_loadLibrary( url, responseType ) {
/*
  const loader = new FileLoader( this.manager );
//	loader.setPath( this.decoderPath );
  loader.setResponseType( responseType );
  loader.setWithCredentials( this.withCredentials );

  return new Promise( ( resolve, reject ) => {

    loader.load( url, resolve, undefined, reject );

      } );*/
      return new Promise( ( resolve, reject ) => {
          const path = this.decoderPath+url
          //  console.error("[loadLibrary]",path)
    resolve(path);

      } );
}

preload() {

  this._initDecoder();

  return this;

}

_initDecoder() {

  if ( this.decoderPending ) return this.decoderPending;

  const useJS = true//typeof WebAssembly !== 'object' || this.decoderConfig.type === 'js';
      const librariesPending = [];

  if ( useJS ) {

    librariesPending.push( this._loadLibrary( 'draco_decoder.js', 'text' ) );

  } else {

    librariesPending.push( this._loadLibrary( 'draco_wasm_wrapper.js', 'text' ) );
    librariesPending.push( this._loadLibrary( 'draco_decoder.wasm', 'arraybuffer' ) );

  }

  this.decoderPending = Promise.all( librariesPending )
    .then( ( libraries ) => {
      const jsContent = libraries[ 0 ];

      if ( ! useJS ) {

        this.decoderConfig.wasmBinary = new ArrayBuffer(1);//libraries[ 1 ];

      }

      //const fn = DRACOWorker.toString();
/*
      const body = [
        '// draco decoder ',
        jsContent,
        '',
        '// worker ',
        fn.substring( fn.indexOf( '{' ) + 1, fn.lastIndexOf( '}' ) )
      ].join( '\n' );
*/
              this.workerSourceURL = jsContent;
    } );

  return this.decoderPending;

}

_getWorker( taskID, taskCost ) {

  return this._initDecoder().then( () => {

    if ( this.workerPool.length < this.workerLimit ) {
      const worker = new Worker( this.workerSourceURL );
      worker._callbacks = {};
      worker._taskCosts = {};
      worker._taskLoad = 0;

      worker.onmessage = function ( e) {
                  const message = e.data
        //console.error("? -> m",message)

        switch ( message.type ) {

          case 'decode':
            worker._callbacks[ message.id ].resolve( message );
            break;

          case 'error':
            worker._callbacks[ message.id ].reject( message );
            break;

          default:
            console.error( 'THREE.DRACOLoader: Unexpected message, "' + message.type + '"' );

        }

              };
             //console.error('m -> ?',  { type: 'init', decoderConfig: this.decoderConfig } );
      worker.postMessage( { type: 'init', decoderConfig: this.decoderConfig } );

      this.workerPool.push( worker );

    } else {

      this.workerPool.sort( function ( a, b ) {

        return a._taskLoad > b._taskLoad ? - 1 : 1;

      } );

    }

    const worker = this.workerPool[ this.workerPool.length - 1 ];
    worker._taskCosts[ taskID ] = taskCost;
    worker._taskLoad += taskCost;
    return worker;

  } );

}

_releaseTask( worker, taskID ) {

  worker._taskLoad -= worker._taskCosts[ taskID ];
  delete worker._callbacks[ taskID ];
  delete worker._taskCosts[ taskID ];

}

debug() {

  console.log( 'Task load: ', this.workerPool.map( ( worker ) => worker._taskLoad ) );

}

dispose() {

  for ( let i = 0; i < this.workerPool.length; ++ i ) {

    this.workerPool[ i ].terminate();

  }

  this.workerPool.length = 0;

  return this;

}

}

/* WEB WORKER */

export { DRACOLoader };
