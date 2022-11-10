/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import ArrayX from "./core/ArrayX";
import Event from "./Event";

export default class EventTarget {
  constructor() {
    this._all_event_handlers = {};
  }

  addEventListener (type, handler) {
    if (!this._all_event_handlers[type]) {
      this._all_event_handlers[type] = [];
    }
    this._all_event_handlers[type].push(handler);
  }

  removeEventListener (type, handler) {
    this._all_event_handlers[type] = ArrayX.remove(
      this._all_event_handlers[type],
      handler
    );
  }

  createEvent (type) {
    return new Event(type);
  }
  dispatchEvent (e) {
    setTimeout(() => {
      var type = e.type;
      /*switch (e.type) {
        case "touchstart":
          type = "pointerdown";
          break;
        case "touchmove":
          type = "pointermove";
         const prev_e = this._prev_e;
          if (prev_e) {
            if (
              Math.abs(prev_e.clientX - e.clientX) < 5 &&
              Math.abs(prev_e.clientY - e.clientY) < 5
            ) {
              return;
            }
          }
          this._prev_e = e;
          break;
        case "touchend":
          type = "pointerup";
          break;
        case "touchcancel":
          type = "pointercancel";
          break;
        default:
          break;
      }*/
      const Mobile2Web = {
        "touchcancel": ["pointercancel"],
        "touchstart": ["pointerdown"],
        "touchmove": ["pointermove"],
        "touchend": ["pointerup", "click"],
        "touchcancel": ["pointercancel"],
      }
      var event_handlers = this._all_event_handlers[type] || [];
      if (
        event_handlers.length <= 0 &&
        Object.keys(Mobile2Web).includes(type)) {
        const types = Mobile2Web[type]
        for (const t of types) {
          const handlers = this._all_event_handlers[t]
          if (handlers) {
            event_handlers = event_handlers.concat(handlers)
          }
        }
      }
      for (var event_handler of event_handlers) {
        event_handler.call(this, e);
      }
    }, 0);
  }
}
