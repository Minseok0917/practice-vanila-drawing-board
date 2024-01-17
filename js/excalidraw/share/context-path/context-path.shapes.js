import { CONTEXT_SHAPES } from "./context-path.constant.js";

class ContextPath {
  #path;
  constructor(name) {
    this.name = name;
    this.#path = new Path2D();
  }
  newPath() {
    this.#path = new Path2D();
  }

  get path() {
    return this.#path;
  }
}

export class ContextPathRect extends ContextPath {
  constructor({ x, y, width, height }) {
    super(CONTEXT_SHAPES.RECT);
    this.defineShape({ x, y, width, height }).draw(this);
  }

  defineShape({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  }

  draw({ x, y, width, height }) {
    this.newPath();
    this.path.rect(x, y, width, height);
    return this;
  }
}

export class ContextPathEllipse extends ContextPath {
  constructor({ x, y, rx, ry }) {
    super(CONTEXT_SHAPES.ELLIPSE);
    this.defineShape({ x, y, rx, ry }).draw();
  }

  defineShape({ x, y, rx, ry }) {
    this.x = x;
    this.y = y;
    this.rx = rx;
    this.ry = ry;
    return this;
  }

  draw() {
    this.newPath();
    this.path.ellipse(this.x, this.y, this.rx, this.ry, 0, 0, 2 * Math.PI);
    return this;
  }
}
