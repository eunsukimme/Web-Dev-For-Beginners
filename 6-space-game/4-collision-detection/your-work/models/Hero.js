import GameObject from './GameObject';

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
  }
}