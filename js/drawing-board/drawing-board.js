export const LAYERS = Object.freeze({
  SHAPE: "shape",
  RENDERING: "rendering",
});

export const TOOLS = Object.freeze({
  TOUCH: "touch",
  SELECT: "select",
  SHAPE_RECT: "shape-rect",
  SHAPE_ECLIPSE: "shape-eclipse",
});

export class DrawingBoardComponent {}

export class Canvas {}
export class DrawingBoardLayer {}

export class DrawingBoardLayerShape extends DrawingBoardLayer {}
export class DrawingBoardLayerRendering extends DrawingBoardLayer {}

export class DrawingBoardLayerManagement {
  constructor() {
    new DrawingBoardLayerShape();
    new DrawingBoardLayerRendering();
  }
}

/* export class DrawingBoardTool {}
export class DrawingBoardToolShape extends DrawingBoardTool {}

export class DrawingBoardToolTouch extends DrawingBoardTool {}
export class DrawingBoardToolSelect extends DrawingBoardTool {}
export class DrawingBoardToolShapeRect extends DrawingBoardToolShape {}
export class DrawingBoardToolShapeEclipse extends DrawingBoardToolShape {}
 */
/* export class DrawingBoardToolManager {
  #toolActions;
  #selectedTool;
  constructor() {
    this.#toolActions = new Map();
    this.#toolActions.set(TOOLS.TOUCH, new DrawingBoardToolTouch());
    this.#toolActions.set(TOOLS.SELECT, new DrawingBoardToolSelect());
    this.#toolActions.set(TOOLS.SHAPE_RECT, new DrawingBoardToolShapeRect());
    this.#toolActions.set(TOOLS.SHAPE_ECLIPSE, new DrawingBoardToolShapeEclipse());
    this.#selectedTool = this.#toolActions.get(TOOLS.TOUCH);
  }

  updateSelectedTool(toolName) {
    this.#selectedTool = this.#toolActions.get(toolName);
  }
}
export class DrawingBoardToolKeyboardHandler {
  #keyActions;
  #toolManager;

  constructor(toolManager) {
    this.#toolManager = toolManager;
    this.#keyActions = new Map();
    this.#keyActions.set("1", TOOLS.TOUCH);
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
 */
export class DrawingBoard {
  constructor() {
    new DrawingBoardComponent();
    new DrawingBoardLayerManagement();
    new DrawingBoardToolManager();
  }
}
