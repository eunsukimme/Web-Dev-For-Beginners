import { Messages } from "../messages";
import EventEmitter from "../models/EventEmitter";
import Explosion from '../models/Explosion';
import GameObjects from "../models/GameObjects";
import Hero from "../models/Hero";
import { endGame, isEnemiesDead, isHeroDead, loadTexture, resetGame } from "../utils";


export function initMessageHandlers() {
  const eventEmitter = new EventEmitter();
  const hero = new Hero();
  
  eventEmitter.on(Messages.KEY_EVENT_UP, () => {
    hero.y -= 20;
  })
  .on(Messages.KEY_EVENT_RIGHT, () => {
    hero.x += 20;
  })
  .on(Messages.KEY_EVENT_DOWN, () => {
    hero.y += 20;
  })
  .on(Messages.KEY_EVENT_LEFT, () => {
    hero.x -= 20;
  })
  .on(Messages.KEY_EVENT_SPACE, () => {
    if (hero.canFire()) {
      hero.fire();
    }
  })
  .on(Messages.COLLISION_ENEMY_LASER, async (_, { first, second }) => {
    first.dead = true;
    second.dead = true;
    hero.incrementPoints();

    const explosion = new Explosion(first.x - 28, first.y - 20)
    explosion.img = await loadTexture('assets/laserRedShot.png')
    GameObjects.getInstance.list.push(explosion)

    if (isEnemiesDead()) {
      eventEmitter.emit(Messages.GAME_END_WIN);
    }
  })
  .on(Messages.COLLISION_ENEMY_HERO, (_, { enemy }) => {
    hero.decrementLife();
    enemy.dead = true;

    if (isHeroDead())  {
      eventEmitter.emit(Messages.GAME_END_LOSS);
      return; // loss before victory
    }
    if (isEnemiesDead()) {
      eventEmitter.emit(Messages.GAME_END_WIN);
    }
  })
  .on(Messages.GAME_END_WIN, () => {
    endGame(true);
  })
  .on(Messages.GAME_END_LOSS, () => {
    endGame(false);
  })
  .on(Messages.KEY_EVENT_ENTER, () => {
    resetGame();
  });
}