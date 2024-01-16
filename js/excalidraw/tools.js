import { LAYERS } from "./layers.js";

export const TOOLS = Object.freeze({
  HAND: "HAND",
  SELECT: "SELECT",
  SHAPE_RECT: "SHAPE_RECT",
  SHAPE_ELLIPSE: "SHAPE_ELLIPSE",
});

export class ExcalidrawTool {
  name;
  constructor(name) {
    this.name = name;
  }
  selected() {}
}
export class ExcalidrawToolShape extends ExcalidrawTool {
  selected() {}
}
export class ExcalidrawToolHand extends ExcalidrawTool {
  #excalidraw;
  constructor(excalidraw) {
    super(TOOLS.HAND);
    this.#excalidraw = excalidraw;
  }

  selected() {
    this.#excalidraw.layerManager.changeSelectedLayer(LAYERS.RENDEINRG);
    this.#excalidraw.layerManager.selectedLayer.style.cursor = "grab";
  }

  handleMousedown = (event) => {
    // this.context =
  };
  handleMousemove = (event) => {};
  handleMouseup = (event) => {};

  get $canvas() {
    return this.#excalidraw.layerManager.$renderingCanvas;
  }
  get context() {
    return this.#excalidraw.layerManager.renderingContext;
  }
}
export class ExcalidrawToolSelect extends ExcalidrawTool {
  #excalidraw;
  constructor(excalidraw) {
    super(TOOLS.SELECT);
    this.#excalidraw = excalidraw;
  }
  selected() {
    this.#excalidraw.layerManager.changeSelectedLayer(LAYERS.RENDEINRG);
  }
}
export class ExcalidrawToolShapeRect extends ExcalidrawToolShape {
  #excalidraw;
  constructor(excalidraw) {
    super(TOOLS.SHAPE_RECT);
    this.#excalidraw = excalidraw;
  }
  selected() {
    this.#excalidraw.layerManager.changeSelectedLayer(LAYERS.WORKING);
  }
}
export class ExcalidrawToolShapeEllipse extends ExcalidrawToolShape {
  #excalidraw;
  constructor(excalidraw) {
    super(TOOLS.SHAPE_ELLIPSE);
    this.#excalidraw = excalidraw;
  }
  selected() {
    this.#excalidraw.layerManager.changeSelectedLayer(LAYERS.WORKING);
  }
}
export class ExcalidrawToolManagerKeyboardHandler {
  #keyActions;
  #toolManger;
  constructor(toolManger) {
    this.#toolManger = toolManger;
    this.#keyActions = new Map();
    this.#keyActions.set("1", TOOLS.HAND);
    this.#keyActions.set("2", TOOLS.SELECT);
    this.#keyActions.set("3", TOOLS.SHAPE_RECT);
    this.#keyActions.set("4", TOOLS.SHAPE_ELLIPSE);

    document.addEventListener("keydown", this.#handleKeydown);
  }

  #handleKeydown = (event) => {
    if (!this.#shouldSelctedTool(event.key)) return;
    this.#toolManger.updateSelectedTool(this.#getToolName(event.key));
  };

  #getToolName(key) {
    return this.#keyActions.get(key);
  }

  #shouldSelctedTool(key) {
    return this.#keyActions.has(key);
  }
}
export class ExcalidrawToolManager {
  #toolActions;
  #selectedTool;
  #excalidraw;

  constructor(excalidraw) {
    this.#excalidraw = excalidraw;
    this.#toolActions = new Map();
    this.#toolActions.set(TOOLS.HAND, new ExcalidrawToolHand(excalidraw));
    this.#toolActions.set(TOOLS.SELECT, new ExcalidrawToolSelect(excalidraw));
    this.#toolActions.set(TOOLS.SHAPE_RECT, new ExcalidrawToolShapeRect(excalidraw));
    this.#toolActions.set(TOOLS.SHAPE_ELLIPSE, new ExcalidrawToolShapeEllipse(excalidraw));
    this.updateSelectedTool(TOOLS.HAND);

    new ExcalidrawToolManagerKeyboardHandler(this);
  }

  updateSelectedTool(key) {
    this.#selectedTool = this.#toolActions.get(key);
    this.#selectedTool.selected();
  }

  get excalidraw() {
    return this.#excalidraw;
  }
}
