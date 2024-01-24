import { DrawingBoardTool } from "./module.tool.js";

export class DrawingBoardToolShape extends DrawingBoardTool {
  selected(drawingBoardInstance) {
    if (drawingBoardInstance.shapeLayer.containClass("cursor-crosshair")) return;
    drawingBoardInstance.shapeLayer.resetClass().addClass("cursor-crosshair");
  }
}
