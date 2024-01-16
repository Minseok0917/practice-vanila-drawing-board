export class Context {
  #context;
  constructor($canvas) {
    this.#context = $canvas.getContext("2d");
  }

  beginPath() {
    this.#context.beginPath();
    return this;
  }

  fill(contextPath) {
    this.#context.fill(contextPath);
    return this;
  }
}
