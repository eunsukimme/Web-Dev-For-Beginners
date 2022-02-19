import { loadTexture } from './utils'
import Hero from './models/Hero';
import Enemy from './models/Enemy';
import { handleKeyDown, handleKeyUp } from './events/keyboard';
import { registerHeroMoveEvent } from './events';

let gameObjects = [];

async function initGame() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let heroImg = await loadTexture("assets/player.png");
  let enemyImg = await loadTexture("assets/enemyShip.png");
  let laserImg = await loadTexture("assets/laserRed.png");

  createHero(canvas, heroImg);
  createEnemies(canvas, enemyImg);

  registerHeroMoveEvent();

  let gameLoopId = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGameObjects(ctx);
  }, 100)
}

function createHero(canvas, heroImg) {
  const hero = new Hero(
    canvas.width / 2 - 45,
    canvas.height - canvas.height / 4
  );
  hero.img = heroImg;
  gameObjects.push(hero);
}

function createEnemies(canvas, enemyImg) {
  const MONSTER_TOTAL = 5;
  const MONSTER_WIDTH = MONSTER_TOTAL * 98;
  const START_X = (canvas.width - MONSTER_WIDTH) / 2;
  const STOP_X = START_X + MONSTER_WIDTH;

  for (let x = START_X; x < STOP_X; x += 98) {
    for (let y = 0; y < 50 * 5; y += 50) {
      const enemy = new Enemy(x, y);
      enemy.img = enemyImg;
      gameObjects.push(enemy);
    }
  }
}

function drawGameObjects(ctx) {
  gameObjects.forEach(object => object.draw(ctx));
}

window.addEventListener('keydown', handleKeyDown)
window.addEventListener('keyup', handleKeyUp)
window.onload = async () => {
  initGame();
};