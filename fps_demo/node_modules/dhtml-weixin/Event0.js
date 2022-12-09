export default class Event {
	static fix(mini_e) {
		mini_e.preventDefault = () => {}
		mini_e.stopPropagation = () => {}
		return mini_e

	}
}
