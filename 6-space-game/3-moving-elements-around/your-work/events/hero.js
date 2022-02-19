import { Messages } from "../messages";
import EventEmitter from "../models/EventEmitter";
import Hero from "../models/Hero";

export function registerHeroMoveEvent() {
  const eventEmitter = new EventEmitter();
  const hero = new Hero();
  eventEmitter.on(Messages.KEY_EVENT_UP, () => {
    hero.y -= 5;
  })
  eventEmitter.on(Messages.KEY_EVENT_RIGHT, () => {
    hero.x += 5;
  })
  eventEmitter.on(Messages.KEY_EVENT_DOWN, () => {
    hero.y += 5;
  })
  eventEmitter.on(Messages.KEY_EVENT_LEFT, () => {
    hero.x -= 5;
  })
}