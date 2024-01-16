import { createElement } from "./element.js";

export class Canvas {
  #$canvas;
  constructor($canvas) {
    this.#$canvas = $canvas || createElement("canvas");
  }

  updateResize(width, height) {
    this.$canvas.width = width;
    this.$canvas.height = height;
    return this;
  }

  get $canvas() {
    return this.#$canvas;
  }
  get cw() {
    return this.$canvas.width;
  }
  get ch() {
    return this.$canvas.height;
  }
}
