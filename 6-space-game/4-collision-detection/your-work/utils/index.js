
import Hero from "../models/Hero";
import Enemy from '../models/Enemy';
import EventEmitter from "../models/EventEmitter";
import { Messages } from "../messages";
import GameObjects from '../models/GameObjects'

export function loadTexture(path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      resolve(img);
    };
  });
}

export function createHero(canvas, heroImg) {
  const hero = new Hero(
    canvas.width / 2 - 45,
    canvas.height - canvas.height / 4
  );
  hero.img = heroImg;
  GameObjects.getInstance.list.push(hero);
}

export function createEnemies(canvas, enemyImg) {
  const MONSTER_TOTAL = 5;
  const MONSTER_WIDTH = MONSTER_TOTAL * 98;
  const START_X = (canvas.width - MONSTER_WIDTH) / 2;
  const STOP_X = START_X + MONSTER_WIDTH;

  for (let x = START_X; x < STOP_X; x += 98) {
    for (let y = 0; y < 50 * 5; y += 50) {
      const enemy = new Enemy(x, y);
      enemy.img = enemyImg;
      GameObjects.getInstance.list.push(enemy);
    }
  }
}

export function drawGameObjects(ctx) {
  GameObjects.getInstance.list.forEach(obj => obj.draw(ctx));
}

export function intersectRect(r1, r2) {
  return !(r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top);
}

export function updateGameObjects() {
  const eventEmitter = new EventEmitter();
  const enemies = GameObjects.getInstance.list.filter(obj => obj.type === 'Enemy');
  const lasers = GameObjects.getInstance.list.filter(obj => obj.type === 'Laser');

  lasers.forEach(laser => {
    enemies.forEach(enemy => {
      if(intersectRect(laser.rectFromGameObject(), enemy.rectFromGameObject())){
        eventEmitter.emit(Messages.COLLISION_ENEMY_LASER, { first: laser, second: enemy });
      }
    })
  })

  GameObjects.getInstance.list = GameObjects.getInstance.list.filter(obj => !obj.dead);
}