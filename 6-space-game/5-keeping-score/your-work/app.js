import { createEnemies, createHero, drawGameObjects, drawLife, drawPoints, loadTexture, updateGameObjects } from './utils'
import { handleKeyDown, handleKeyUp } from './events/keyboard';
import { initMessageHandlers } from './events/messages';

async function initGame() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  const [heroImg, enemyImg, lifeImg, ...numberImgs] = await Promise.all([
    loadTexture("assets/player.png"),
    loadTexture("assets/enemyShip.png"),
    loadTexture("assets/life.png"),
    loadTexture("assets/number_0.png"),
    loadTexture("assets/number_1.png"),
    loadTexture("assets/number_2.png"),
    loadTexture("assets/number_3.png"),
    loadTexture("assets/number_4.png"),
    loadTexture("assets/number_4.png"),
    loadTexture("assets/number_5.png"),
    loadTexture("assets/number_6.png"),
    loadTexture("assets/number_7.png"),
    loadTexture("assets/number_8.png"),
  ])

  createHero(canvas, heroImg);
  createEnemies(canvas, enemyImg);

  initMessageHandlers();

  const runGameloop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    updateGameObjects();
    drawGameObjects(ctx);
    drawPoints(ctx, numberImgs);
    drawLife(ctx, lifeImg);
    requestAnimationFrame(runGameloop);
  }
  requestAnimationFrame(runGameloop);
}

window.addEventListener('keydown', handleKeyDown)
window.addEventListener('keyup', handleKeyUp)
window.onload = () => {
  initGame();
};