export default class Performance {
	constructor() {
        this.time0 = new Date().getTime()
	}
	now() {
        return new Date().getTime()-this.time0
	}
}
