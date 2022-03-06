
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

export function drawLife(ctx, lifeImg) {
  const hero = new Hero();
  const START_POS = canvas.width - 180;
  for(let i = 0; i < hero.life; i++) {
    ctx.drawImage(
      lifeImg, 
      START_POS + (45 * (i + 1)), 
      canvas.height - 37);
  }
}

export async function drawPoints(ctx, numberImgs) {
  const hero = new Hero();
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  drawText(ctx, `Points:`, 10, canvas.height - 20);
  [...hero.points.toString()].forEach(async (point_char, index) => {
    const pointImg = numberImgs[Number(point_char)]
    ctx.drawImage(pointImg, 88 + (index * 20), canvas.height - 36);
  })
}

export function drawText(ctx, message, x, y) {
  ctx.fillText(message, x, y);
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

  // enemy & laser collision detection
  lasers.forEach(laser => {
    enemies.forEach(enemy => {
      if(intersectRect(laser.rectFromGameObject(), enemy.rectFromGameObject())){
        eventEmitter.emit(Messages.COLLISION_ENEMY_LASER, { first: laser, second: enemy });
      }
    })
  })

  // hero & enemy collision detection
  const hero = new Hero();
  enemies.forEach((enemy) => {
    if(intersectRect(hero.rectFromGameObject(), enemy.rectFromGameObject())) {
      eventEmitter.emit(Messages.COLLISION_ENEMY_HERO, { enemy })
    }
  })

  GameObjects.getInstance.list = GameObjects.getInstance.list.filter(obj => !obj.dead);
}