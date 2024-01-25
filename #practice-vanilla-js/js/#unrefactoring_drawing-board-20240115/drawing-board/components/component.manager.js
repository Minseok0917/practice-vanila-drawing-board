import { DrawingBoardComponent } from "./component.drawing-board.js";
import { DrawingBoardShapeLayerComponent } from "./component.drawing-board-layer-shape.js";
import { DrawingBoardRenderingLayerComponent } from "./component.drawing-board-layer-rendering.js";

export class DrawingBoardComponentManager {
  constructor() {
    new DrawingBoardComponent();
    new DrawingBoardShapeLayerComponent();
    new DrawingBoardRenderingLayerComponent();
  }
}
