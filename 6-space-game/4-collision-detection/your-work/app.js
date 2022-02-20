import { createEnemies, createHero, drawGameObjects, loadTexture, updateGameObjects } from './utils'
import { handleKeyDown, handleKeyUp } from './events/keyboard';
import { initMessageHandlers } from './events/messages';

async function initGame() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  const [heroImg, enemyImg] = await Promise.all([
    loadTexture("assets/player.png"),
    loadTexture("assets/enemyShip.png"),
  ])

  createHero(canvas, heroImg);
  createEnemies(canvas, enemyImg);

  initMessageHandlers();

  let gameLoopId = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    updateGameObjects();
    drawGameObjects(ctx);
  }, 100)
}

window.addEventListener('keydown', handleKeyDown)
window.addEventListener('keyup', handleKeyUp)
window.onload = () => {
  initGame();
};