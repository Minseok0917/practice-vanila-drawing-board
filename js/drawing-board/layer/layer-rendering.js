import { CanvasLayer } from "./module.layer.js";

export class RenderingLayer extends CanvasLayer {
  constructor() {
    super();
    this.setLayerName("rendering-layer");
  }
}

/* 
    .drawing-board
        .canvas-container shape-layer
        .canvas-container rendering-layer
*/
