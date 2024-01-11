import { DrawingBoardTool } from "./module.tool.js";

export class DrawingBoardToolShape extends DrawingBoardTool {
  selected(drawingBoardInstance) {
    if (drawingBoardInstance.containClass("cursor-crosshair")) return;
    drawingBoardInstance.resetClass().addClass("cursor-crosshair");
  }
}
