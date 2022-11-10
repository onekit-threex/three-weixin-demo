/* eslint-disable */
function DOMParser(options) {
  this.options = options || {locator: {}}
}

DOMParser.prototype.parseFromString = function(source, mimeType) {
  const options = this.options
  const sax = new XMLReader()
  const domBuilder = options.domBuilder || new DOMHandler()// contentHandler and LexicalHandler
  const errorHandler = options.errorHandler
  const locator = options.locator
  const defaultNSMap = options.xmlns || {}
  const isHTML = /\/x?html?$/.test(mimeType)// mimeType.toLowerCase().indexOf('html') > -1;
  	const entityMap = isHTML ? htmlEntity.entityMap : {
    lt: '<', gt: '>', amp: '&', quot: '"', apos: "'"
  }
  if (locator) {
    domBuilder.setDocumentLocator(locator)
  }

  sax.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator)
  sax.domBuilder = options.domBuilder || domBuilder
  if (isHTML) {
    defaultNSMap[''] = 'http://www.w3.org/1999/xhtml'
  }
  defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace'
  if (source) {
    sax.parse(source, defaultNSMap, entityMap)
  } else {
    sax.errorHandler.error('invalid doc source')
  }
  return domBuilder.doc
}
function buildErrorHandler(errorImpl, domBuilder, locator) {
  if (!errorImpl) {
    if (domBuilder instanceof DOMHandler) {
      return domBuilder
    }
    errorImpl = domBuilder
  }
  const errorHandler = {}
  const isCallback = errorImpl instanceof Function
  locator = locator || {}
  function build(key) {
    let fn = errorImpl[key]
    if (!fn && isCallback) {
      fn = errorImpl.length == 2 ? function(msg) { errorImpl(key, msg) } : errorImpl
    }
    errorHandler[key] = fn && function(msg) {
      fn('[xmldom ' + key + ']\t' + msg + _locator(locator))
    } || function() {}
  }
  build('warning')
  build('error')
  build('fatalError')
  return errorHandler
}

// console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler
 *
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
  this.cdata = false
}
function position(locator, node) {
  node.lineNumber = locator.lineNumber
  node.columnNumber = locator.columnNumber
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */
DOMHandler.prototype = {
  startDocument() {
    	this.doc = new DOMImplementation().createDocument(null, null, null)
    	if (this.locator) {
        	this.doc.documentURI = this.locator.systemId
    	}
  },
  startElement(namespaceURI, localName, qName, attrs) {
    const doc = this.doc
	    const el = doc.createElementNS(namespaceURI, qName || localName)
	    const len = attrs.length
	    appendElement(this, el)
	    this.currentElement = el

    this.locator && position(this.locator, el)
	    for (let i = 0; i < len; i++) {
	        var namespaceURI = attrs.getURI(i)
	        const value = attrs.getValue(i)
	        var qName = attrs.getQName(i)
      const attr = doc.createAttributeNS(namespaceURI, qName)
      this.locator && position(attrs.getLocator(i), attr)
      attr.value = attr.nodeValue = value
      el.setAttributeNode(attr)
	    }
  },
  endElement(namespaceURI, localName, qName) {
    const current = this.currentElement
    const tagName = current.tagName
    this.currentElement = current.parentNode
  },
  startPrefixMapping(prefix, uri) {
  },
  endPrefixMapping(prefix) {
  },
  processingInstruction(target, data) {
	    const ins = this.doc.createProcessingInstruction(target, data)
	    this.locator && position(this.locator, ins)
	    appendElement(this, ins)
  },
  ignorableWhitespace(ch, start, length) {
  },
  characters(chars, start, length) {
    chars = _toString.apply(this, arguments)
    // console.log(chars)
    if (chars) {
      if (this.cdata) {
        var charNode = this.doc.createCDATASection(chars)
      } else {
        var charNode = this.doc.createTextNode(chars)
      }
      if (this.currentElement) {
        this.currentElement.appendChild(charNode)
      } else if (/^\s*$/.test(chars)) {
        this.doc.appendChild(charNode)
        // process xml
      }
      this.locator && position(this.locator, charNode)
    }
  },
  skippedEntity(name) {
  },
  endDocument() {
    this.doc.normalize()
  },
  setDocumentLocator (locator) {
	    if (this.locator = locator) { // && !('lineNumber' in locator)){
	    	locator.lineNumber = 0
	    }
  },
  // LexicalHandler
  comment(chars, start, length) {
    chars = _toString.apply(this, arguments)
	    const comm = this.doc.createComment(chars)
	    this.locator && position(this.locator, comm)
	    appendElement(this, comm)
  },

  startCDATA() {
	    // used in characters() methods
	    this.cdata = true
  },
  endCDATA() {
	    this.cdata = false
  },

  startDTD(name, publicId, systemId) {
    const impl = this.doc.implementation
	    if (impl && impl.createDocumentType) {
	        const dt = impl.createDocumentType(name, publicId, systemId)
	        this.locator && position(this.locator, dt)
	        appendElement(this, dt)
	    }
  },
  /**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
  warning(error) {
    console.warn('[xmldom warning]\t' + error, _locator(this.locator))
  },
  error(error) {
    console.error('[xmldom error]\t' + error, _locator(this.locator))
  },
  fatalError(error) {
    console.error('[xmldom fatalError]\t' + error, _locator(this.locator))
	    throw error
  }
}
function _locator(l) {
  if (l) {
    return '\n@' + (l.systemId || '') + '#[line:' + l.lineNumber + ',col:' + l.columnNumber + ']'
  }
}
function _toString(chars, start, length) {
  if (typeof chars === 'string') {
    return chars.substr(start, length)
  } else { // java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
    if (chars.length >= start + length || start) {
      return new java.lang.String(chars, start, length) + ''
    }
    return chars
  }
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
'endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl'.replace(/\w+/g, function(key) {
  DOMHandler.prototype[key] = function() { return null }
})

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander, node) {
  if (!hander.currentElement) {
    hander.doc.appendChild(node)
  } else {
    hander.currentElement.appendChild(node)
  }
}// appendChild and setAttributeNS are preformance key

// if(typeof require == 'function'){
var htmlEntity = require('./entities')
var XMLReader = require('./sax').XMLReader
var DOMImplementation = exports.DOMImplementation = require('./dom').DOMImplementation
exports.XMLSerializer = require('./dom').XMLSerializer

exports.DOMParser = DOMParser
// }
