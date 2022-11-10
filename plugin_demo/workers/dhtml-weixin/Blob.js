/* eslint-disable camelcase */
export default class Blob {
  constructor(array, options) {
    this.array = array
    this.options = options
  }
  get size(){
    return this.array[0].length
  }
  arrayBuffer(){
    return this.array[0]
  }
}
