import { DrawingBoardToolShape } from "./module.tool.js";

export class DrawingBoardToolShapeCircle extends DrawingBoardToolShape {
  constructor() {
    super();
    this.setName("타원").setDescription("타원");
  }
}
