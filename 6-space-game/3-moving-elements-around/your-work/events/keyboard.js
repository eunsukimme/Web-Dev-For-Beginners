import { Messages } from "../messages";
import EventEmitter from "../models/EventEmitter";


export function handleKeyUp(event) {
  console.log(event.key);
  const eventEmitter = new EventEmitter();
  if(event.key === 'ArrowUp') {
    eventEmitter.emit(Messages.KEY_EVENT_UP)
  }
  if(event.key === 'ArrowRight') {
    eventEmitter.emit(Messages.KEY_EVENT_RIGHT)
  }
  if(event.key === 'ArrowDown') {
    eventEmitter.emit(Messages.KEY_EVENT_DOWN)
  }
  if(event.key === 'ArrowLeft') {
    eventEmitter.emit(Messages.KEY_EVENT_LEFT)
  }
}


export function handleKeyDown(event) {
  // prevent default behavior of browser to disable scrolling by keyboard
  switch(event.keyCode){
    // arrow keys
    case 37:
    case 39:
    case 38:
    case 40:
    // spacebar
    case 32:
      event.preventDefault();
      break;
    default:
      break;
  }
}