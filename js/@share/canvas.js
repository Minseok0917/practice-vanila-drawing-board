import { ElementFactory } from "./elementFactory.js";

export class Canvas {
  #$canvas;
  constructor() {
    this.#$canvas = ElementFactory.createElement("canvas");
    this.cw = this.#$canvas.width;
    this.ch = this.#$canvas.height;
  }

  setCanvasSize(width, height) {
    this.#setCanvasWidth(width);
    this.#setCanvasHeight(height);
    return this;
  }

  #setCanvasWidth(width) {
    this.cw = width;
    this.$canvas.width = width;
    return this;
  }

  #setCanvasHeight(height) {
    this.ch = height;
    this.$canvas.height = height;
    return this;
  }

  get $canvas() {
    return this.#$canvas;
  }
}
