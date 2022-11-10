module.exports = {
  compile: WXWebAssembly.compile,

  compileStreaming: WXWebAssembly.compileStreaming,

  instantiate: WXWebAssembly.instantiate,

  instantiateStreaming: WXWebAssembly.compileStreaming,

  validate: WXWebAssembly.validate || function() { return true },

  Module: WXWebAssembly.Module,

  Global: WXWebAssembly.Global,

  Instance: WXWebAssembly.Instance,

  Memory: WXWebAssembly.Memory,

  Table: WXWebAssembly.Table,

  Tag: WXWebAssembly.Tag,

  CompileError: Error,

  LinkError: Error,

  RuntimeError: Error,

  Exception: Error
}
