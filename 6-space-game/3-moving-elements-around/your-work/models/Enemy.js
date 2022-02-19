import GameObject from './GameObject';

export default class Enemy extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.width = 98; 
    this.height = 50;
    this.type = "Enemy";
    let id = setInterval(() => {
      if (this.y < canvas.height - this.height) {
        this.y += 5;
      } else {
        console.log('Stopped at', this.y)
        clearInterval(id);
      }
    }, 300)
  }
}