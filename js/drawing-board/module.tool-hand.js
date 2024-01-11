import { DrawingBoardTool } from "./module.tool.js";

export class DrawingBoardToolHand extends DrawingBoardTool {
  constructor() {
    super();
    this.setName("손").setDescription("패닝 도구");
  }
  selected(drawingBoardInstance) {
    drawingBoardInstance.resetClass().addClass("cursor-grab");
  }

  mousedownHandler(event, drawingBoardInstance) {
    this.setWorkingProgress();
    drawingBoardInstance.resetClass().addClass("cursor-grabbing");
  }
  mousemoveHandler(event, drawingBoardInstance) {}
  mouseupHandler(event, drawingBoardInstance) {
    this.setWorkingEnd();
    drawingBoardInstance.resetClass().addClass("cursor-grab");
  }
}
