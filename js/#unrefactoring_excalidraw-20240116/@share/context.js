export class Context {
  #$canvas;
  #context;
  constructor($canvas) {
    this.#$canvas = $canvas;
    this.#context = $canvas.getContext("2d");
  }

  beginPath() {
    this.#context.beginPath();
    return this;
  }

  fill(contextPath) {
    this.#context.fill(contextPath);
  }
}
