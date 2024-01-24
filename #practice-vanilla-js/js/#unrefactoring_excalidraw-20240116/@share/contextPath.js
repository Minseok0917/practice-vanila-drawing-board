export const CONTEXT_SHAPES = Object.freeze({
  RECT: "RECT",
  ELLIPSE: "ELLIPSE",
});

export class ContextPath {
  #path;

  constructor(name = "") {
    this.name = name;
    this.#path = new Path2D();
  }

  get path() {
    return this.#path;
  }

  draw() {}
  defineShape() {}
}

export class ContextPathRect extends ContextPath {
  constructor({ x, y, width, height }) {
    super(CONTEXT_SHAPES.RECT);
    this.defineShape({ x, y, width, height }).draw();
  }

  defineShape({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  }

  draw() {
    this.path.rect(this.x, this.y, this.width, this.height);
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
    this.path.ellipse(this.x, this.y, this.rx, this.ry, 0, 0, 2 * Math.PI);
    return this;
  }
}

export const CONTEXT_SHAPE_ACTIONS = new Map([
  [CONTEXT_SHAPES.RECT, ContextPathRect],
  [CONTEXT_SHAPES.ELLIPSE, ContextPathEllipse],
]);
