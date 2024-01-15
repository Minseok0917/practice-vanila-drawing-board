import { TOOLS } from "../../constants/constants.tools.js";

export class DrawingBoardToolKeyboardHandler {
  #keyActions;
  #toolManager;

  constructor(toolManager) {
    this.#toolManager = toolManager;
    this.#keyActions = new Map();
    this.#keyActions.set("1", TOOLS.HAND);
    this.#keyActions.set("2", TOOLS.SELECT);
    this.#keyActions.set("3", TOOLS.SHAPE_RECT);
    this.#keyActions.set("4", TOOLS.SHAPE_ECLIPSE);

    document.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (!this.#shouldSelectedTool(event.key)) return;
    this.#toolManager.updateSelectedTool(this.#getToolName(event.key));
  };

  #getToolName(key) {
    return this.#keyActions.get(key);
  }
  #shouldSelectedTool(key) {
    return this.#keyActions.has(key);
  }
}
