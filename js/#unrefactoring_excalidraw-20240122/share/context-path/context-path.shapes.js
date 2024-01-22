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

  getShapeInfo() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  draw({ x, y, width, height, canvasX = 0, canvasY = 0 }) {
    this.newPath();
    this.path.rect(x + canvasX, y + canvasY, width, height);
    return this;
  }
}

export class ContextPathEllipse extends ContextPath {
  constructor({ x, y, rx, ry }) {
    super(CONTEXT_SHAPES.ELLIPSE);
    this.defineShape({ x, y, rx, ry }).draw(this);
  }

  defineShape({ x, y, rx, ry }) {
    this.x = x;
    this.y = y;
    this.rx = rx;
    this.ry = ry;
    return this;
  }

  getShapeInfo() {
    return {
      x: this.x,
      y: this.y,
      rx: this.rx,
      ry: this.ry,
    };
  }

  draw({ x, y, rx, ry, canvasX = 0, canvasY = 0 }) {
    this.newPath();
    this.path.ellipse(x + canvasX, y + canvasY, rx, ry, 0, 0, 2 * Math.PI);
    return this;
  }
}
