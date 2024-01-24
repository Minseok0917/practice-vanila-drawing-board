import { DrawingBoardComponent } from "./components/component.manager.js";
import { DrawingBoardToolManager } from "./tools/tools.manager.js";
import { DrawingBoardLayerManager } from "./layers/layers.manager.js";

export class DrawingBoard {
  constructor() {
    new DrawingBoardComponent();
    new DrawingBoardLayerManager();
    new DrawingBoardToolManager();
  }
}
