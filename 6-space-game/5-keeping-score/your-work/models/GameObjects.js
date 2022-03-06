export default class GameObjects {
  static #instance
  list = []

  static get getInstance() {
    if (!GameObjects.#instance) {
      GameObjects.#instance = new GameObjects();
    }
    return GameObjects.#instance;
  }
}