export default class CSSStyleDeclaration {
  constructor() {
    this.fill = ''
    this['fill-opacity'] = ''
    this['fill-rule'] = ''
    this.opacity = ''
    this.stroke = ''
    this['stroke-opacity'] = ''
    this['stroke-width'] = ''
    this['stroke-linejoin'] = ''
    this['stroke-linecap'] = ''
    this['stroke-miterlimit'] = ''
    this.visibility = ''
  }

  static parse(css) {
    const style = new CSSStyleDeclaration()
    const pairs = css.split(';')
    for (const pair of pairs) {
      if (!pair) {
        continue
      }
      if (!pair.includes(':')) {
        continue
      }
      const kv = pair.trim().split(':')
      style[kv[0].trim()] = kv[1].trim()
    }
    return style
  }
}
