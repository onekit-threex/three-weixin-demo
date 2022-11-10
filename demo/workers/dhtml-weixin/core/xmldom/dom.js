/* eslint-disable */
/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */
import CSSStyleDeclaration from "../../CSSStyleDeclaration"
function copy(src, dest) {
  for (const p in src) {
    dest[p] = src[p]
  }
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class, Super) {
  let pt = Class.prototype
  if (!(pt instanceof Super)) {
    function t() { }
    t.prototype = Super.prototype
    t = new t()
    copy(pt, t)
    Class.prototype = pt = t
  }
  if (pt.constructor != Class) {
    if (typeof Class !== 'function') {
      console.error('unknow Class:' + Class)
    }
    pt.constructor = Class
  }
}
const htmlns = 'http://www.w3.org/1999/xhtml'
// Node Types
const NodeType = {}
const ELEMENT_NODE = NodeType.ELEMENT_NODE = 1
const ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2
const TEXT_NODE = NodeType.TEXT_NODE = 3
const CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4
const ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5
const ENTITY_NODE = NodeType.ENTITY_NODE = 6
const PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7
const COMMENT_NODE = NodeType.COMMENT_NODE = 8
const DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9
const DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10
const DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11
const NOTATION_NODE = NodeType.NOTATION_NODE = 12

// ExceptionCode
const ExceptionCode = {}
const ExceptionMessage = {}
const INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = ((ExceptionMessage[1] = 'Index size error'), 1)
const DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = ((ExceptionMessage[2] = 'DOMString size error'), 2)
const HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = ((ExceptionMessage[3] = 'Hierarchy request error'), 3)
const WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = ((ExceptionMessage[4] = 'Wrong document'), 4)
const INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = ((ExceptionMessage[5] = 'Invalid character'), 5)
const NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = ((ExceptionMessage[6] = 'No data allowed'), 6)
const NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7] = 'No modification allowed'), 7)
const NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = ((ExceptionMessage[8] = 'Not found'), 8)
const NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = ((ExceptionMessage[9] = 'Not supported'), 9)
const INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = ((ExceptionMessage[10] = 'Attribute in use'), 10)
// level2
const INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = ((ExceptionMessage[11] = 'Invalid state'), 11)
const SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = ((ExceptionMessage[12] = 'Syntax error'), 12)
const INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = ((ExceptionMessage[13] = 'Invalid modification'), 13)
const NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = ((ExceptionMessage[14] = 'Invalid namespace'), 14)
const INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = ((ExceptionMessage[15] = 'Invalid access'), 15)


function DOMException(code, message) {
  if (message instanceof Error) {
    var error = message
  } else {
    error = this
    Error.call(this, ExceptionMessage[code])
    this.message = ExceptionMessage[code]
    if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException)
  }
  error.code = code
  if (message) this.message = this.message + ': ' + message
  return error
}
DOMException.prototype = Error.prototype
copy(ExceptionCode, DOMException)
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
}
NodeList.prototype = {
  /**
   * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
   * @standard level1
   */
  length: 0,
  /**
   * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
   * @standard level1
   * @param index  unsigned long
   *   Index into the collection.
   * @return Node
   * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
   */
  item(index) {
    return this[index] || null
  },
  toString(isHTML, nodeFilter) {
    for (var buf = [], i = 0; i < this.length; i++) {
      serializeToString(this[i], buf, isHTML, nodeFilter)
    }
    return buf.join('')
  }
}
function LiveNodeList(node, refresh) {
  this._node = node
  this._refresh = refresh
  _updateLiveList(this)
}
function _updateLiveList(list) {
  const inc = list._node._inc || list._node.ownerDocument._inc
  if (list._inc != inc) {
    const ls = list._refresh(list._node)
    // console.log(ls.length)
    __set__(list, 'length', ls.length)
    copy(ls, list)
    list._inc = inc
  }
}
LiveNodeList.prototype.item = function (i) {
  _updateLiveList(this)
  return this[i]
}

_extends(LiveNodeList, NodeList)

function NamedNodeMap() {
}

function _findNodeIndex(list, node) {
  let i = list.length
  while (i--) {
    if (list[i] === node) { return i }
  }
}

function _addNamedNode(el, list, newAttr, oldAttr) {
  if (oldAttr) {
    list[_findNodeIndex(list, oldAttr)] = newAttr
  } else {
    list[list.length++] = newAttr
  }
  if (el) {
    newAttr.ownerElement = el
    const doc = el.ownerDocument
    if (doc) {
      oldAttr && _onRemoveAttribute(doc, el, oldAttr)
      _onAddAttribute(doc, el, newAttr)
    }
  }
}
function _removeNamedNode(el, list, attr) {
  // console.log('remove attr:'+attr)
  let i = _findNodeIndex(list, attr)
  if (i >= 0) {
    const lastIndex = list.length - 1
    while (i < lastIndex) {
      list[i] = list[++i]
    }
    list.length = lastIndex
    if (el) {
      const doc = el.ownerDocument
      if (doc) {
        _onRemoveAttribute(doc, el, attr)
        attr.ownerElement = null
      }
    }
  } else {
    throw DOMException(NOT_FOUND_ERR, new Error(el.tagName + '@' + attr))
  }
}
NamedNodeMap.prototype = {
  length: 0,
  item: NodeList.prototype.item,
  getNamedItem(key) {
    //		if(key.indexOf(':')>0 || key == 'xmlns'){
    //			return null;
    //		}
    // console.log()
    let i = this.length
    while (i--) {
      const attr = this[i]
      // console.log(attr.nodeName,key)
      if (attr.nodeName == key) {
        return attr
      }
    }
  },
  setNamedItem(attr) {
    const el = attr.ownerElement
    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR)
    }
    const oldAttr = this.getNamedItem(attr.nodeName)
    _addNamedNode(this._ownerElement, this, attr, oldAttr)
    return oldAttr
  },
  /* returns Node */
  setNamedItemNS(attr) { // raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
    const el = attr.ownerElement; let
      oldAttr
    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR)
    }
    oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName)
    _addNamedNode(this._ownerElement, this, attr, oldAttr)
    return oldAttr
  },

  /* returns Node */
  removeNamedItem(key) {
    const attr = this.getNamedItem(key)
    _removeNamedNode(this._ownerElement, this, attr)
    return attr
  }, // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR

  // for level2
  removeNamedItemNS(namespaceURI, localName) {
    const attr = this.getNamedItemNS(namespaceURI, localName)
    _removeNamedNode(this._ownerElement, this, attr)
    return attr
  },
  getNamedItemNS(namespaceURI, localName) {
    let i = this.length
    while (i--) {
      const node = this[i]
      if (node.localName == localName && node.namespaceURI == namespaceURI) {
        return node
      }
    }
    return null
  }
}
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation(/* Object */ features) {
  this._features = {}
  if (features) {
    for (const feature in features) {
      this._features = features[feature]
    }
  }
}

DOMImplementation.prototype = {
  hasFeature(/* string */ feature, /* string */ version) {
    const versions = this._features[feature.toLowerCase()]
    if (versions && (!version || version in versions)) {
      return true
    } else {
      return false
    }
  },
  // Introduced in DOM Level 2:
  createDocument(namespaceURI, qualifiedName, doctype) { // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
    const doc = new Document()
    doc.implementation = this
    doc.childNodes = new NodeList()
    doc.doctype = doctype
    if (doctype) {
      doc.appendChild(doctype)
    }
    if (qualifiedName) {
      const root = doc.createElementNS(namespaceURI, qualifiedName)
      doc.appendChild(root)
    }
    return doc
  },
  // Introduced in DOM Level 2:
  createDocumentType(qualifiedName, publicId, systemId) { // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
    const node = new DocumentType()
    node.name = qualifiedName
    node.nodeName = qualifiedName
    node.publicId = publicId
    node.systemId = systemId
    // Introduced in DOM Level 2:
    // readonly attribute DOMString        internalSubset;

    // TODO:..
    //  readonly attribute NamedNodeMap     entities;
    //  readonly attribute NamedNodeMap     notations;
    return node
  }
}


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
}

Node.prototype = {
  firstChild: null,
  lastChild: null,
  previousSibling: null,
  nextSibling: null,
  attributes: null,
  parentNode: null,
  childNodes: null,
  ownerDocument: null,
  nodeValue: null,
  namespaceURI: null,
  prefix: null,
  localName: null,
  // Modified in DOM Level 2:
  insertBefore(newChild, refChild) { // raises
    return _insertBefore(this, newChild, refChild)
  },
  replaceChild(newChild, oldChild) { // raises
    this.insertBefore(newChild, oldChild)
    if (oldChild) {
      this.removeChild(oldChild)
    }
  },
  removeChild(oldChild) {
    return _removeChild(this, oldChild)
  },
  appendChild(newChild) {
    return this.insertBefore(newChild, null)
  },
  hasChildNodes() {
    return this.firstChild != null
  },
  cloneNode(deep) {
    return cloneNode(this.ownerDocument || this, this, deep)
  },
  // Modified in DOM Level 2:
  normalize() {
    let child = this.firstChild
    while (child) {
      const next = child.nextSibling
      if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
        this.removeChild(next)
        child.appendData(next.data)
      } else {
        child.normalize()
        child = next
      }
    }
  },
  // Introduced in DOM Level 2:
  isSupported(feature, version) {
    return this.ownerDocument.implementation.hasFeature(feature, version)
  },
  // Introduced in DOM Level 2:
  hasAttributes() {
    return this.attributes.length > 0
  },
  lookupPrefix(namespaceURI) {
    let el = this
    while (el) {
      const map = el._nsMap
      // console.dir(map)
      if (map) {
        for (const n in map) {
          if (map[n] == namespaceURI) {
            return n
          }
        }
      }
      el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode
    }
    return null
  },
  // Introduced in DOM Level 3:
  lookupNamespaceURI(prefix) {
    let el = this
    while (el) {
      const map = el._nsMap
      // console.dir(map)
      if (map) {
        if (prefix in map) {
          return map[prefix]
        }
      }
      el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode
    }
    return null
  },
  // Introduced in DOM Level 3:
  isDefaultNamespace(namespaceURI) {
    const prefix = this.lookupPrefix(namespaceURI)
    return prefix == null
  }
}


function _xmlEncoder(c) {
  return c == '<' && '&lt;' ||
    c == '>' && '&gt;' ||
    c == '&' && '&amp;' ||
    c == '"' && '&quot;' ||
    '&#' + c.charCodeAt() + ';'
}


copy(NodeType, Node)
copy(NodeType, Node.prototype)

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node, callback) {
  if (callback(node)) {
    return true
  }
  if (node = node.firstChild) {
    do {
      if (_visitNode(node, callback)) { return true }
    } while (node = node.nextSibling)
  }
}


function Document() {
}
function _onAddAttribute(doc, el, newAttr) {
  doc && doc._inc++
  const ns = newAttr.namespaceURI
  if (ns == 'http://www.w3.org/2000/xmlns/') {
    // update namespace
    el._nsMap[newAttr.prefix ? newAttr.localName : ''] = newAttr.value
  }
}
function _onRemoveAttribute(doc, el, newAttr, remove) {
  doc && doc._inc++
  const ns = newAttr.namespaceURI
  if (ns == 'http://www.w3.org/2000/xmlns/') {
    // update namespace
    delete el._nsMap[newAttr.prefix ? newAttr.localName : '']
  }
}
function _onUpdateChild(doc, el, newChild) {
  if (doc && doc._inc) {
    doc._inc++
    // update childNodes
    const cs = el.childNodes
    if (newChild) {
      cs[cs.length++] = newChild
    } else {
      // console.log(1)
      let child = el.firstChild
      let i = 0
      while (child) {
        cs[i++] = child
        child = child.nextSibling
      }
      cs.length = i
    }
  }
}

function _removeChild(parentNode, child) {
  const previous = child.previousSibling
  const next = child.nextSibling
  if (previous) {
    previous.nextSibling = next
  } else {
    parentNode.firstChild = next
  }
  if (next) {
    next.previousSibling = previous
  } else {
    parentNode.lastChild = previous
  }
  _onUpdateChild(parentNode.ownerDocument, parentNode)
  return child
}
/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode, newChild, nextChild) {
  const cp = newChild.parentNode
  if (cp) {
    cp.removeChild(newChild)// remove and update
  }
  if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
    var newFirst = newChild.firstChild
    if (newFirst == null) {
      return newChild
    }
    var newLast = newChild.lastChild
  } else {
    newFirst = newLast = newChild
  }
  const pre = nextChild ? nextChild.previousSibling : parentNode.lastChild

  newFirst.previousSibling = pre
  newLast.nextSibling = nextChild


  if (pre) {
    pre.nextSibling = newFirst
  } else {
    parentNode.firstChild = newFirst
  }
  if (nextChild == null) {
    parentNode.lastChild = newLast
  } else {
    nextChild.previousSibling = newLast
  }
  do {
    newFirst.parentNode = parentNode
  } while (newFirst !== newLast && (newFirst = newFirst.nextSibling))
  _onUpdateChild(parentNode.ownerDocument || parentNode, parentNode)
  // console.log(parentNode.lastChild.nextSibling == null)
  if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
    newChild.firstChild = newChild.lastChild = null
  }
  return newChild
}
function _appendSingleChild(parentNode, newChild) {
  const cp = newChild.parentNode
  if (cp) {
    var pre = parentNode.lastChild
    cp.removeChild(newChild)// remove and update
    var pre = parentNode.lastChild
  }
  var pre = parentNode.lastChild
  newChild.parentNode = parentNode
  newChild.previousSibling = pre
  newChild.nextSibling = null
  if (pre) {
    pre.nextSibling = newChild
  } else {
    parentNode.firstChild = newChild
  }
  parentNode.lastChild = newChild
  _onUpdateChild(parentNode.ownerDocument, parentNode, newChild)
  return newChild
  // console.log("__aa",parentNode.lastChild.nextSibling == null)
}
Document.prototype = {
  // implementation : null,
  nodeName: '#document',
  nodeType: DOCUMENT_NODE,
  doctype: null,
  documentElement: null,
  _inc: 1,

  insertBefore(newChild, refChild) { // raises
    if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
      let child = newChild.firstChild
      while (child) {
        const next = child.nextSibling
        this.insertBefore(child, refChild)
        child = next
      }
      return newChild
    }
    if (this.documentElement == null && newChild.nodeType == ELEMENT_NODE) {
      this.documentElement = newChild
    }

    return _insertBefore(this, newChild, refChild), (newChild.ownerDocument = this), newChild
  },
  removeChild(oldChild) {
    if (this.documentElement == oldChild) {
      this.documentElement = null
    }
    return _removeChild(this, oldChild)
  },
  // Introduced in DOM Level 2:
  importNode(importedNode, deep) {
    return importNode(this, importedNode, deep)
  },
  // Introduced in DOM Level 2:
  getElementById(id) {
    let rtv = null
    _visitNode(this.documentElement, function (node) {
      if (node.nodeType == ELEMENT_NODE) {
        if (node.getAttribute('id') == id) {
          rtv = node
          return true
        }
      }
    })
    return rtv
  },

  // document factory method:
  createElement(tagName) {
    const node = new Element()
    node.ownerDocument = this
    node.nodeName = tagName
    node.tagName = tagName
    node.childNodes = new NodeList()
    const attrs = node.attributes = new NamedNodeMap()
    attrs._ownerElement = node
    return node
  },
  createDocumentFragment() {
    const node = new DocumentFragment()
    node.ownerDocument = this
    node.childNodes = new NodeList()
    return node
  },
  createTextNode(data) {
    const node = new Text()
    node.ownerDocument = this
    node.appendData(data)
    return node
  },
  createComment(data) {
    const node = new Comment()
    node.ownerDocument = this
    node.appendData(data)
    return node
  },
  createCDATASection(data) {
    const node = new CDATASection()
    node.ownerDocument = this
    node.appendData(data)
    return node
  },
  createProcessingInstruction(target, data) {
    const node = new ProcessingInstruction()
    node.ownerDocument = this
    node.tagName = node.target = target
    node.nodeValue = node.data = data
    return node
  },
  createAttribute(name) {
    const node = new Attr()
    node.ownerDocument = this
    node.name = name
    node.nodeName = name
    node.localName = name
    node.specified = true
    return node
  },
  createEntityReference(name) {
    const node = new EntityReference()
    node.ownerDocument = this
    node.nodeName = name
    return node
  },
  // Introduced in DOM Level 2:
  createElementNS(namespaceURI, qualifiedName) {
    const node = new Element()
    const pl = qualifiedName.split(':')
    const attrs = node.attributes = new NamedNodeMap()
    node.childNodes = new NodeList()
    node.ownerDocument = this
    node.nodeName = qualifiedName
    node.tagName = qualifiedName
    node.namespaceURI = namespaceURI
    if (pl.length == 2) {
      node.prefix = pl[0]
      node.localName = pl[1]
    } else {
      // el.prefix = null;
      node.localName = qualifiedName
    }
    attrs._ownerElement = node
    return node
  },
  // Introduced in DOM Level 2:
  createAttributeNS(namespaceURI, qualifiedName) {
    const node = new Attr()
    const pl = qualifiedName.split(':')
    node.ownerDocument = this
    node.nodeName = qualifiedName
    node.name = qualifiedName
    node.namespaceURI = namespaceURI
    node.specified = true
    if (pl.length == 2) {
      node.prefix = pl[0]
      node.localName = pl[1]
    } else {
      // el.prefix = null;
      node.localName = qualifiedName
    }
    return node
  }
}
_extends(Document, Node)


function Element() {
  this._nsMap = {}
}
Element.prototype = {
  nodeType: ELEMENT_NODE,
  hasAttribute(name) {
    return this.getAttributeNode(name) != null
  },
  getAttribute(name) {
    const attr = this.getAttributeNode(name)
    return attr && attr.value || ''
  },
  getAttributeNode(name) {
    return this.attributes.getNamedItem(name)
  },
  setAttribute(name, value) {
    const attr = this.ownerDocument.createAttribute(name)
    attr.value = attr.nodeValue = '' + value
    this.setAttributeNode(attr)
  },
  removeAttribute(name) {
    const attr = this.getAttributeNode(name)
    attr && this.removeAttributeNode(attr)
  },

  // four real opeartion method
  appendChild(newChild) {
    if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return this.insertBefore(newChild, null)
    } else {
      return _appendSingleChild(this, newChild)
    }
  },
  setAttributeNode(newAttr) {
    const value = newAttr.value
    if(newAttr.name=="style"){
      
      this.style = CSSStyleDeclaration.parse(value)
    }
    this.attributes[newAttr.name] = { value, textContent: value == null ? "" : value.toString() }
    return this.attributes.setNamedItem(newAttr)
  },
  setAttributeNodeNS(newAttr) {
    return this.attributes.setNamedItemNS(newAttr)
  },
  removeAttributeNode(oldAttr) {
    // console.log(this == oldAttr.ownerElement)
    return this.attributes.removeNamedItem(oldAttr.nodeName)
  },
  // get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS(namespaceURI, localName) {
    const old = this.getAttributeNodeNS(namespaceURI, localName)
    old && this.removeAttributeNode(old)
  },

  hasAttributeNS(namespaceURI, localName) {
    return this.getAttributeNodeNS(namespaceURI, localName) != null
  },
  getAttributeNS(namespaceURI, localName) {
    const attr = this.getAttributeNodeNS(namespaceURI, localName)
    return attr && attr.value || ''
  },
  setAttributeNS(namespaceURI, qualifiedName, value) {
    const attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName)
    attr.value = attr.nodeValue = '' + value
    this.setAttributeNode(attr)
  },
  getAttributeNodeNS(namespaceURI, localName) {
    return this.attributes.getNamedItemNS(namespaceURI, localName)
  },

  getElementsByTagName(tagName) {
    return new LiveNodeList(this, function (base) {
      const ls = []
      _visitNode(base, function (node) {
        if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName
        || node.tagName.endsWith(":"+tagName))) {
          ls.push(node)
        }
      })
      return ls
    })
  },
  getElementsByTagNameNS(namespaceURI, localName) {
    return new LiveNodeList(this, function (base) {
      const ls = []
      _visitNode(base, function (node) {
        if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)) {
          ls.push(node)
        }
      })
      return ls
    })
  }
}

Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS
Element.prototype.querySelectorAll = function (selector) {
  const paths = selector.split(" ")
  let parents = [this]
  for (const path of paths) {
    const temp = []
    for (const parent of parents) {
      const children = parent.getElementsByTagName(path)
      for (var i = 0; i < children.length; i++) {
        temp.push(children[i])
      }
    }
    parents = temp.concat();
  }
  return parents
}
Element.prototype.querySelector = function (selector) {
  return this.querySelectorAll(selector)[0]
}
Document.prototype.querySelectorAll = Element.prototype.querySelectorAll 
Document.prototype.querySelector = Element.prototype.querySelector 

_extends(Element, Node)
function Attr() {
}
Attr.prototype.nodeType = ATTRIBUTE_NODE
_extends(Attr, Node)


function CharacterData() {
}
CharacterData.prototype = {
  data: '',
  substringData(offset, count) {
    return this.data.substring(offset, offset + count)
  },
  appendData(text) {
    text = this.data + text
    this.nodeValue = this.data = text
    this.length = text.length
  },
  insertData(offset, text) {
    this.replaceData(offset, 0, text)
  },
  appendChild(newChild) {
    throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
  },
  deleteData(offset, count) {
    this.replaceData(offset, count, '')
  },
  replaceData(offset, count, text) {
    const start = this.data.substring(0, offset)
    const end = this.data.substring(offset + count)
    text = start + text + end
    this.nodeValue = this.data = text
    this.length = text.length
  }
}
_extends(CharacterData, Node)
function Text() {
}
Text.prototype = {
  nodeName: '#text',
  nodeType: TEXT_NODE,
  splitText(offset) {
    let text = this.data
    const newText = text.substring(offset)
    text = text.substring(0, offset)
    this.data = this.nodeValue = text
    this.length = text.length
    const newNode = this.ownerDocument.createTextNode(newText)
    if (this.parentNode) {
      this.parentNode.insertBefore(newNode, this.nextSibling)
    }
    return newNode
  }
}
_extends(Text, CharacterData)
function Comment() {
}
Comment.prototype = {
  nodeName: '#comment',
  nodeType: COMMENT_NODE
}
_extends(Comment, CharacterData)

function CDATASection() {
}
CDATASection.prototype = {
  nodeName: '#cdata-section',
  nodeType: CDATA_SECTION_NODE
}
_extends(CDATASection, CharacterData)


function DocumentType() {
}
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE
_extends(DocumentType, Node)

function Notation() {
}
Notation.prototype.nodeType = NOTATION_NODE
_extends(Notation, Node)

function Entity() {
}
Entity.prototype.nodeType = ENTITY_NODE
_extends(Entity, Node)

function EntityReference() {
}
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE
_extends(EntityReference, Node)

function DocumentFragment() {
}
DocumentFragment.prototype.nodeName = '#document-fragment'
DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE
_extends(DocumentFragment, Node)


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE
_extends(ProcessingInstruction, Node)
function XMLSerializer() { }
XMLSerializer.prototype.serializeToString = function (node, isHtml, nodeFilter) {
  return nodeSerializeToString.call(node, isHtml, nodeFilter)
}
Node.prototype.toString = nodeSerializeToString
function nodeSerializeToString(isHtml, nodeFilter) {
  const buf = []
  const refNode = this.nodeType == 9 && this.documentElement || this
  var prefix = refNode.prefix
  const uri = refNode.namespaceURI

  if (uri && prefix == null) {
    // console.log(prefix)
    var prefix = refNode.lookupPrefix(uri)
    if (prefix == null) {
      // isHTML = true;
      var visibleNamespaces = [
        { namespace: uri, prefix: null }
        // {namespace:uri,prefix:''}
      ]
    }
  }
  serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces)
  // console.log('###',this.nodeType,uri,prefix,buf.join(''))
  return buf.join('')
}
function needNamespaceDefine(node, isHTML, visibleNamespaces) {
  const prefix = node.prefix || ''
  const uri = node.namespaceURI
  if (!prefix && !uri) {
    return false
  }
  if (prefix === 'xml' && uri === 'http://www.w3.org/XML/1998/namespace' ||
    uri == 'http://www.w3.org/2000/xmlns/') {
    return false
  }

  let i = visibleNamespaces.length
  // console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
  while (i--) {
    const ns = visibleNamespaces[i]
    // get namespace prefix
    // console.log(node.nodeType,node.tagName,ns.prefix,prefix)
    if (ns.prefix == prefix) {
      return ns.namespace != uri
    }
  }
  // console.log(isHTML,uri,prefix=='')
  // if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
  //	return false;
  // }
  // node.flag = '11111'
  // console.error(3,true,node.flag,node.prefix,node.namespaceURI)
  return true
}
function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
  if (nodeFilter) {
    node = nodeFilter(node)
    if (node) {
      if (typeof node === 'string') {
        buf.push(node)
        return
      }
    } else {
      return
    }
    // buf.sort.apply(attrs, attributeSorter);
  }
  switch (node.nodeType) {
    case ELEMENT_NODE:
      if (!visibleNamespaces) visibleNamespaces = []
      var startVisibleNamespaces = visibleNamespaces.length
      var attrs = node.attributes
      var len = attrs.length
      var child = node.firstChild
      var nodeName = node.tagName

      isHTML = (htmlns === node.namespaceURI) || isHTML
      buf.push('<', nodeName)


      for (var i = 0; i < len; i++) {
        var attr = attrs.item(i)
        if (attr.prefix == 'xmlns') {
          visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value })
        } else if (attr.nodeName == 'xmlns') {
          visibleNamespaces.push({ prefix: '', namespace: attr.value })
        }
      }
      for (var i = 0; i < len; i++) {
        var attr = attrs.item(i)
        if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
          var prefix = attr.prefix || ''
          var uri = attr.namespaceURI
          var ns = prefix ? ' xmlns:' + prefix : ' xmlns'
          buf.push(ns, '="', uri, '"')
          visibleNamespaces.push({ prefix, namespace: uri })
        }
        serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces)
      }
      // add namespace for current node
      if (needNamespaceDefine(node, isHTML, visibleNamespaces)) {
        var prefix = node.prefix || ''
        var uri = node.namespaceURI
        var ns = prefix ? ' xmlns:' + prefix : ' xmlns'
        buf.push(ns, '="', uri, '"')
        visibleNamespaces.push({ prefix, namespace: uri })
      }

      if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
        buf.push('>')
        // if is cdata child node
        if (isHTML && /^script$/i.test(nodeName)) {
          while (child) {
            if (child.data) {
              buf.push(child.data)
            } else {
              serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces)
            }
            child = child.nextSibling
          }
        } else {
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces)
            child = child.nextSibling
          }
        }
        buf.push('</', nodeName, '>')
      } else {
        buf.push('/>')
      }
      // remove added visible namespaces
      // visibleNamespaces.length = startVisibleNamespaces;
      return
    case DOCUMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      var child = node.firstChild
      while (child) {
        serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces)
        child = child.nextSibling
      }
      return
    case ATTRIBUTE_NODE:
      return buf.push(' ', node.name, '="', node.value.replace(/[<&"]/g, _xmlEncoder), '"')
    case TEXT_NODE:
      return buf.push(node.data.replace(/[<&]/g, _xmlEncoder))
    case CDATA_SECTION_NODE:
      return buf.push('<![CDATA[', node.data, ']]>')
    case COMMENT_NODE:
      return buf.push('<!--', node.data, '-->')
    case DOCUMENT_TYPE_NODE:
      var pubid = node.publicId
      var sysid = node.systemId
      buf.push('<!DOCTYPE ', node.name)
      if (pubid) {
        buf.push(' PUBLIC "', pubid)
        if (sysid && sysid != '.') {
          buf.push('" "', sysid)
        }
        buf.push('">')
      } else if (sysid && sysid != '.') {
        buf.push(' SYSTEM "', sysid, '">')
      } else {
        const sub = node.internalSubset
        if (sub) {
          buf.push(' [', sub, ']')
        }
        buf.push('>')
      }
      return
    case PROCESSING_INSTRUCTION_NODE:
      return buf.push('<?', node.target, ' ', node.data, '?>')
    case ENTITY_REFERENCE_NODE:
      return buf.push('&', node.nodeName, ';')
    // case ENTITY_NODE:
    // case NOTATION_NODE:
    default:
      buf.push('??', node.nodeName)
  }
}
function importNode(doc, node, deep) {
  let node2
  switch (node.nodeType) {
    case ELEMENT_NODE:
      node2 = node.cloneNode(false)
      node2.ownerDocument = doc

    case DOCUMENT_FRAGMENT_NODE:
      break
    case ATTRIBUTE_NODE:
      deep = true
      break
    // case ENTITY_REFERENCE_NODE:
    // case PROCESSING_INSTRUCTION_NODE:
    // //case TEXT_NODE:
    // case CDATA_SECTION_NODE:
    // case COMMENT_NODE:
    //	deep = false;
    //	break;
    // case DOCUMENT_NODE:
    // case DOCUMENT_TYPE_NODE:
    // cannot be imported.
    // case ENTITY_NODE:
    // case NOTATION_NODE：
    // can not hit in level3
    // default:throw e;
  }
  if (!node2) {
    node2 = node.cloneNode(false)// false
  }
  node2.ownerDocument = doc
  node2.parentNode = null
  if (deep) {
    let child = node.firstChild
    while (child) {
      node2.appendChild(importNode(doc, child, deep))
      child = child.nextSibling
    }
  }
  return node2
}
//
function cloneNode(doc, node, deep) {
  const node2 = new node.constructor()
  for (const n in node) {
    const v = node[n]
    if (typeof v !== 'object') {
      if (v != node2[n]) {
        node2[n] = v
      }
    }
  }
  if (node.childNodes) {
    node2.childNodes = new NodeList()
  }
  node2.ownerDocument = doc
  switch (node2.nodeType) {
    case ELEMENT_NODE:
      var attrs = node.attributes
      var attrs2 = node2.attributes = new NamedNodeMap()
      var len = attrs.length
      attrs2._ownerElement = node2
      for (let i = 0; i < len; i++) {
        node2.setAttributeNode(cloneNode(doc, attrs.item(i), true))
      }
      break
    case ATTRIBUTE_NODE:
      deep = true
  }
  if (deep) {
    let child = node.firstChild
    while (child) {
      node2.appendChild(cloneNode(doc, child, deep))
      child = child.nextSibling
    }
  }
  return node2
}

function __set__(object, key, value) {
  object[key] = value
}
// do dynamic
try {
  if (Object.defineProperty) {
    Object.defineProperty(Element.prototype, 'outerHTML', {
      get() {
        return new XMLSerializer().serializeToString(this)
      },
      set(){

      }
    })
    Object.defineProperty(Element.prototype, 'innerHTML', {
      get() {
        var html = new XMLSerializer().serializeToString(this)
        html = html.substring(html.indexOf(">"))
        html = html.substring(0,html.lastIndexOf("</"))
        return html
      },
      set(){
        
      }
    })
    Object.defineProperty(Element.prototype, 'firstElementChild', {
      get() {
        return this.firstChild
      }
    })
    Object.defineProperty(Element.prototype, 'nextElementSibling', {
      get() {
        return this.nextSibling
      }
    })
    Object.defineProperty(LiveNodeList.prototype, 'length', {
      get() {
        _updateLiveList(this)
        return this.$$length
      }
    })
    Object.defineProperty(Node.prototype, 'textContent', {
      get() {
        return getTextContent(this)
      },
      set(data) {
        switch (this.nodeType) {
          case ELEMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            while (this.firstChild) {
              this.removeChild(this.firstChild)
            }
            if (data || String(data)) {
              this.appendChild(this.ownerDocument.createTextNode(data))
            }
            break
          default:
            // TODO:
            this.data = data
            this.value = data
            this.nodeValue = data
        }
      }
    })

    function getTextContent(node) {
      switch (node.nodeType) {
        case ELEMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var buf = []
          node = node.firstChild
          while (node) {
            if (node.nodeType !== 7 && node.nodeType !== 8) {
              buf.push(getTextContent(node))
            }
            node = node.nextSibling
          }
          return buf.join('')
        default:
          return node.nodeValue
      }
    }
    __set__ = function (object, key, value) {
      // console.log(value)
      object['$$' + key] = value
    }
  }
} catch (e) { // ie8
}

// if(typeof require == 'function'){
exports.DOMImplementation = DOMImplementation
exports.XMLSerializer = XMLSerializer
// }
