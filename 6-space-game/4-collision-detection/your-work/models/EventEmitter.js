export default class EventEmitter {
  constructor() {
    if(EventEmitter.instance){
      return EventEmitter.instance;
    }
    EventEmitter.instance = this;

    this.listener = {};
  }

  on(message, listener) {
    if(!this.listener[message]){
      this.listener[message] = [];
    }
    this.listener[message].push(listener);
  }

  emit(message, payload = null) {
    if(this.listener[message]){
      this.listener[message].forEach(listener => listener(message, payload))
    }
  }
}