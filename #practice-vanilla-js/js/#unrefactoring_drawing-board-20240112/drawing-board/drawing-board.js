import { ShapeLayer } from "./layer/layer-shape.js";
import { RenderingLayer } from "./layer/layer-rendering.js";
import { DrawingBoardToolHand } from "./tool/module.tool-hand.js";
import { DrawingBoardToolSelect } from "./tool/module.tool-select.js";
import { DrawingBoardToolShapeRect } from "./tool/module.tool-shape-rect.js";
import { DrawingBoardToolShapeCircle } from "./tool/module.tool-shape-cirlce.js";

/* 
  DrawingBoard
    - LayerManagement
    - ToolManagement
    

  제어 추상화
  - LayerManagement
  - ToolManagement
  데이터 추상화
  - Shape
  유틸 클래스
  - Element
  - Canvas
  - Context
*/

export class DrawingBoard {
  #layers = new Map();
  #modeTypes = new Map();
  #modeType;
  #x = 0;
  #y = 0;

  constructor() {
    this.initial();
    this.#handleManagements();
  }

  initial() {
    this.#layers.set("shape-layer", new ShapeLayer(this));
    this.#layers.set("rendering-layer", new RenderingLayer(this));

    this.#modeTypes.set("1", new DrawingBoardToolHand());
    this.#modeTypes.set("2", new DrawingBoardToolSelect());
    this.#modeTypes.set("3", new DrawingBoardToolShapeRect());
    this.#modeTypes.set("4", new DrawingBoardToolShapeCircle());

    this.#modeType = this.#modeTypes.get("1");
    this.#modeType.selected(this);
  }

  mount($parentElement) {
    const $drawingBoard = createElement("div", { className: "drawing-board" });
    this.#layers.forEach((layerInstance) => layerInstance.mount($drawingBoard));
    $parentElement.append($drawingBoard);
  }

  // handlers
  #handleManagements() {
    document.addEventListener("keydown", this.#documentKeydownHandler);
  }
  #documentKeydownHandler = (event) => {
    if (!this.#modeTypes.has(event.key)) return;
    if (this.#modeType === this.#modeTypes.get(event.key)) return;
    if (this.#modeType.working) return;

    this.#modeType = this.#modeTypes.get(event.key);
    this.#modeType.selected(this);
  };

  // getters
  get shapeLayer() {
    return this.#layers.get("shape-layer");
  }
  get renderingLayer() {
    return this.#layers.get("rendering-layer");
  }
  get modeType() {
    return this.#modeType;
  }
  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }
  // setters
  setX(x) {
    this.#x = x;
    return this;
  }
  setY(y) {
    this.#y = y;
    return this;
  }
}
