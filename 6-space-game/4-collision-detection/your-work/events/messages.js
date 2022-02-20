import { Messages } from "../messages";
import EventEmitter from "../models/EventEmitter";
import Hero from "../models/Hero";

export function initMessageHandlers() {
  const eventEmitter = new EventEmitter();
  const hero = new Hero();
  
  eventEmitter.on(Messages.KEY_EVENT_UP, () => {
    hero.y -= 5;
  })
  .on(Messages.KEY_EVENT_RIGHT, () => {
    hero.x += 5;
  })
  .on(Messages.KEY_EVENT_DOWN, () => {
    hero.y += 5;
  })
  .on(Messages.KEY_EVENT_LEFT, () => {
    hero.x -= 5;
  })
  .on(Messages.KEY_EVENT_SPACE, () => {
    if (hero.canFire()) {
      hero.fire();
    }
  })
  .on(Messages.COLLISION_ENEMY_LASER, (_, { first, second }) => {
    first.dead = true;
    second.dead = true;
  })
}