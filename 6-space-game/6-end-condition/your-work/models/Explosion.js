import GameObject from "./GameObject";

export default class Explosion extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.width = 56;
    this.height = 54;
    let id = setTimeout(() => {
      this.dead = true;
      clearTimeout(id);
    }, 200)
  }
}