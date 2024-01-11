export class Canvas {
  #$canvas;
  #context;
  #canvasWidth = 0;
  #canvasHeight = 0;
  #x = 0;
  #y = 0;

  #handlers = new Map();
  constructor() {
    this.#$canvas = document.createElement("canvas");
    this.#context = this.#$canvas.getContext("2d");
  }

  setCanvasRect(width, height) {
    this.#setCanvasWidth(width);
    this.#setCanvasHeight(height);
    return this;
  }

  #setCanvasWidth(width) {
    this.#canvasWidth = width;
    this.#$canvas.width = width;
  }

  #setCanvasHeight(height) {
    this.#canvasHeight = height;
    this.#$canvas.height = height;
  }
  setX(x) {
    this.#x = x;
    return this;
  }
  setY(y) {
    this.#y = y;
    return this;
  }

  resetClass() {
    this.$canvas.className = "";
    return this;
  }
  containClass(className) {
    return this.#$canvas.classList.contains(className);
  }
  addClass(className) {
    this.#$canvas.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.#$canvas.classList.remove(className);
    return this;
  }

  beginPath() {
    this.#context.beginPath();
    return this;
  }
  rect(x, y, width, height) {
    this.#context.rect(x, y, width, height);
    return this;
  }
  fillStyle(fillColor) {
    this.#context.fillStyle = fillColor;
    return this;
  }
  fill() {
    this.#context.fill();
    return this;
  }

  mount($parentElement) {
    $parentElement.append(this.#$canvas);
    return this;
  }

  event(key, callback) {
    if (this.#handlers.has(key)) throw new Error(`이미 중복된 이벤트가 존재합니다 ${key}`);
    this.#handlers.set(key, callback);
    this.#$canvas.addEventListener(key, callback);
    return this;
  }

  get $canvas() {
    return this.#$canvas;
  }
  get context() {
    return this.#context;
  }
  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }
}
