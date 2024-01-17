export class Context {
  #$canvas;
  #context;
  constructor($canvas) {
    this.#$canvas = $canvas;
    this.#context = $canvas.getContext("2d");
  }

  clearAll() {
    this.#context.clearRect(0, 0, this.#$canvas.width, this.#$canvas.height);
    return this;
  }

  beginPath() {
    this.#context.beginPath();
    return this;
  }

  rect({ x, y, width, height }) {
    this.#context.rect(x, y, width, height);
    return this;
  }

  fill(contextPath) {
    this.#context.fill(contextPath);
    return this;
  }

  stroke(contextPath) {
    this.#context.stroke(contextPath);
    return this;
  }
}
