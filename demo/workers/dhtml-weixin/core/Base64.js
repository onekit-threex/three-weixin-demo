/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-var */
/* eslint-disable no-mixed-operators */
/* eslint-disable vars-on-top */
/* eslint-disable no-bitwise */
import btoa from "../btoa"
function b64ToUint6(nChr) {
  return nChr > 64 && nChr < 91
    ? nChr - 65
    : nChr > 96 && nChr < 123
      ? nChr - 71
      : nChr > 47 && nChr < 58
        ? nChr + 4
        : nChr === 43
          ? 62
          : nChr === 47
            ? 63
            : 0
}
export default class Base64 {
  static arrayBufferToBase64(array) {
  //  return String.fromCharCode.apply(null, new Int8Array(buffer))
  
      let binary = ''
      const bytes = new Uint8Array(array)
      const len = bytes.byteLength
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return btoa(binary)
  }

  static base64ToArrayBuffer(sBase64, nBlockSize) {
    const
      sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ''); const nInLen = sB64Enc.length
    const nOutLen = nBlockSize ? Math.ceil((nInLen * 3 + 1 >>> 2) / nBlockSize) * nBlockSize : nInLen * 3 + 1 >>> 2; const
      aBytes = new Int8Array(nOutLen)

    for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
      nMod4 = nInIdx & 3
      nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4
      if (nMod4 === 3 || nInLen - nInIdx === 1) {
        for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
          aBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255
        }
        nUint24 = 0
      }
    }

    return aBytes.buffer
  }
}
