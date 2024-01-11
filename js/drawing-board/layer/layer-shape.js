import { CanvasLayer } from "./module.layer.js";

export class ShapeLayer extends CanvasLayer {
  #drawingBoardInstance;
  constructor(drawingBoardInstance) {
    super();
    this.#drawingBoardInstance = drawingBoardInstance;
    this.setLayerName("shape-layer");
  }
}
