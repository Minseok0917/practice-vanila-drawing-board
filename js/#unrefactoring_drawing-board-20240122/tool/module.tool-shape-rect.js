import { DrawingBoardToolShape } from "./module.tool-shape.js";

export class DrawingBoardToolShapeRect extends DrawingBoardToolShape {
  #mousedown = null; // null, { x:number, y:number}
  constructor() {
    super();
    this.path = new Path2D();
    this.setName("사각형").setDescription("사각형");
  }

  mousedownHandler(event, drawingBoardInstance) {
    this.#setMousedown(event);
  }
  mousemoveHandler(event, drawingBoardInstance) {
    if (this.#mousedown === null) return;
    const context = drawingBoardInstance.context;
    const [x, y] = [event.offsetX, event.offsetY];

    const width = Math.abs(this.#mousedown.x - event.offsetX);
    const height = Math.abs(this.#mousedown.y - event.offsetY);

    context.beginPath();
    context.rect(x, y, width, height);
    context.fill();
  }
  mouseupHandler(event, drawingBoardInstance) {
    this.#mousedown = null;
  }

  #setMousedown(event) {
    this.#mousedown = { x: event.offsetX, y: event.offsetY };
  }
}
