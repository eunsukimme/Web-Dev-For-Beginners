import { loadTexture } from '../utils';
import GameObject from './GameObject';
import GameObjects from './GameObjects';
import Laser from './Laser'

export default class Hero extends GameObject {
  constructor(x, y) {
    super(x, y); 
    if(Hero.instance){
      return Hero.instance;
    }
    Hero.instance = this;

    this.width = 100; 
    this.height = 75;
    this.type = "Hero";
    this.speed = { x: 0, y: 0 };
    this.cooldown = 0;
  }

  async fire() {
    const laser = new Laser(this.x + 45, this.y - 10);
    laser.img = await loadTexture("assets/laserRed.png")
    GameObjects.getInstance.list.push(laser);

    this.cooldown = 500;
    let id = setInterval(() => {
      if (this.cooldown > 0) {
        this.cooldown -= 100;
      } else {
        clearInterval(id);
      }
    }, 200);
  }

  canFire() {
    return this.cooldown === 0;
  }
}