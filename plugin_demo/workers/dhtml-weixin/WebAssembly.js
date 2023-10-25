var WA 
if(typeof WXWebAssembly=="object"){
  WA = WXWebAssembly
} else if( typeof  WebAssembly=="object"){
  WA = WebAssembly
}else{
  WA = {}
}
module.exports = {
  compile: WA.compile,

  compileStreaming: WA.compileStreaming,

  instantiate: WA.instantiate,

  instantiateStreaming: WA.compileStreaming,

  validate: WA.validate || function() { return true },

  Module: WA.Module,

  Global: WA.Global,

  Instance: WA.Instance,

  Memory: WA.Memory,

  Table: WA.Table,

  Tag: WA.Tag,

  CompileError: Error,

  LinkError: Error,

  RuntimeError: Error,

  Exception: Error
}
