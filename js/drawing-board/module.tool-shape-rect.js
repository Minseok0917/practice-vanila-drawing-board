import { DrawingBoardToolShape } from "./module.tool.js";

export class DrawingBoardToolShapeRect extends DrawingBoardToolShape {
  constructor() {
    super();
    this.setName("사각형").setDescription("사각형");
  }
}
