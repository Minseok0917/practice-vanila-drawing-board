import { DrawingBoardTool } from "./module.tool.js";

export class DrawingBoardToolHand extends DrawingBoardTool {
  #mousedown = null; // null | {x:number, y:number}

  constructor() {
    super();
    this.setName("손").setDescription("패닝 도구");
  }
  selected(drawingBoardInstance) {
    drawingBoardInstance.renderingLayer.resetClass().addClass("cursor-grab");
  }

  mousedownHandler(event, drawingBoardInstance) {
    this.setWorkingProgress();
    this.#setMousedown(event);
    drawingBoardInstance.renderingLayer.resetClass().addClass("cursor-grabbing");
  }
  mousemoveHandler(event, drawingBoardInstance) {
    if (this.#mousedown === null) return;
    drawingBoardInstance.setX(Math.round(drawingBoardInstance.x + event.offsetX - this.#mousedown.x));
    drawingBoardInstance.setY(Math.round(drawingBoardInstance.y + event.offsetY - this.#mousedown.y));
    drawingBoardInstance.renderingLayer.rendering();
    this.#setMousedown(event);
  }
  mouseupHandler(event, drawingBoardInstance) {
    this.setWorkingEnd();
    this.#mousedown = null;
    drawingBoardInstance.renderingLayer.resetClass().addClass("cursor-grab");
  }

  #setMousedown(event) {
    this.#mousedown = { x: event.offsetX, y: event.offsetY };
  }
}
