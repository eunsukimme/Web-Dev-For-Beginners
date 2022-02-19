import { createEnemies, createHero, drawGameObjects, loadTexture } from './utils'
import { handleKeyDown, handleKeyUp } from './events/keyboard';
import { registerHeroMoveEvent } from './events/hero';

async function initGame() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let heroImg = await loadTexture("assets/player.png");
  let enemyImg = await loadTexture("assets/enemyShip.png");
  let laserImg = await loadTexture("assets/laserRed.png");
  let gameObjects = [];

  createHero(gameObjects, canvas, heroImg);
  createEnemies(gameObjects, canvas, enemyImg);

  registerHeroMoveEvent();

  let gameLoopId = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGameObjects(gameObjects, ctx);
  }, 100)
}

window.addEventListener('keydown', handleKeyDown)
window.addEventListener('keyup', handleKeyUp)
window.onload = async () => {
  initGame();
};