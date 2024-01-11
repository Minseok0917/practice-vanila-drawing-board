import { DrawingBoardTool } from "./module.tool.js";

export class DrawingBoardToolSelect extends DrawingBoardTool {
  constructor() {
    super();
    this.setName("선택").setDescription("선택 도구");
  }
  selected(drawingBoardInstance) {
    drawingBoardInstance.renderingLayer.resetClass().addClass("cursor-auto");
  }
}
