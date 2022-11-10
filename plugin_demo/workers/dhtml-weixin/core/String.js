export default class String {
  static fromHump(s) {
    return s.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
  static toHump(name) {
    return name.replace(/\-(\w)/g, function (all, letter) {
      console.log(all); //"_T"
      console.log(letter); //"T"
      return letter.toUpperCase();
    });
  }
}
