import { CanvasLayer } from "./module.layer.js";

export class RenderingLayer extends CanvasLayer {
  constructor(drawingBoardInstance) {
    super(drawingBoardInstance);
    this.setLayerName("rendering-layer");
  }

  rendering() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.beginPath()
      .rect(-100 + this.x, -100 + this.y, 50, 50)
      .fillStyle("red")
      .fill();
    this.beginPath()
      .rect(100 + this.x, 100 + this.y, 50, 50)
      .fillStyle("blue")
      .fill();
    this.beginPath()
      .rect(500 + this.x, 1500 + this.y, 50, 50)
      .fillStyle("yellow")
      .fill();
  }
}

/* 
    .drawing-board
        .canvas-container shape-layer
        .canvas-container rendering-layer
*/
