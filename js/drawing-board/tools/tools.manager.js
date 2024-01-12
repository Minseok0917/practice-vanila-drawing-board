import { TOOLS } from "../../constants/constants.tools.js";
import { DrawingBoardToolKeyboardHandler } from "./handlers/handle.keyboard.js";
import { DrawingBoardToolHand } from "./tool/tool.hand.js";
import { DrawingBoardToolSelect } from "./tool/tool.select.js";
import { DrawingBoardToolShapeRect } from "./tool/tool.shape-rect.js";
import { DrawingBoardToolShapeEclipse } from "./tool/tool.shape-eclipse.js";

export class DrawingBoardToolManager {
  #toolActions;
  #selectedTool;
  constructor() {
    this.#toolActions = new Map();
    this.#toolActions.set(TOOLS.HAND, new DrawingBoardToolHand());
    this.#toolActions.set(TOOLS.SELECT, new DrawingBoardToolSelect());
    this.#toolActions.set(TOOLS.SHAPE_RECT, new DrawingBoardToolShapeRect());
    this.#toolActions.set(TOOLS.SHAPE_ECLIPSE, new DrawingBoardToolShapeEclipse());
    this.#selectedTool = this.#toolActions.get(TOOLS.HAND);

    new DrawingBoardToolKeyboardHandler(this);
  }

  updateSelectedTool(toolName) {
    this.#selectedTool = this.#toolActions.get(toolName);
  }
}
