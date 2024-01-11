import { Canvas } from "../share/module.canvas.js";
import { ShapeLayer } from "./shape/module.shape-layer.js";
import { DrawingBoardToolHand } from "./tool/module.tool-hand.js";
import { DrawingBoardToolSelect } from "./tool/module.tool-select.js";
import { DrawingBoardToolShapeRect } from "./tool/module.tool-shape-rect.js";
import { DrawingBoardToolShapeCircle } from "./tool/module.tool-shape-cirlce.js";

/* 현재는 싱글톤인데 나중에 싱클톤 버리고 여러 개 만들 수 있게끔 만들어야겠음 */
export class DrawingBoard extends Canvas {
  static #instance;
  static #modeTypes = new Map([
    ["1", new DrawingBoardToolHand()],
    ["2", new DrawingBoardToolSelect()],
    ["3", new DrawingBoardToolShapeRect()],
    ["4", new DrawingBoardToolShapeCircle()],
  ]);
  #shapeLayer = "";
  #shapes = [];
  #dummyShapes = [
    { type: "rect", x: -100, y: -100, width: 50, height: 50, fillStyle: "red" },
    { type: "rect", x: 100, y: 100, width: 50, height: 50, fillStyle: "blue" },
    { type: "rect", x: 500, y: 150, width: 50, height: 50, fillStyle: "yellow" },
  ];
  #modeType = DrawingBoard.#modeTypes.get("1");

  constructor() {
    super();
    if (!DrawingBoard.#instance) DrawingBoard.#instance = this;
    this.setCanvasRect(window.innerWidth, window.innerHeight);
    this.#handlerManagment();
    this.#modeType.selected(this);
    this.dummyShapeRendering();
    return DrawingBoard.#instance;
  }
  static getInstance() {
    if (!DrawingBoard.#instance) DrawingBoard.#instance = new DrawingBoard();
    return DrawingBoard.#instance;
  }
  dummyShapeRendering() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.beginPath()
      .rect(-100 + this.x, -100 + this.y, 50, 50)
      .fillStyle("red")
      .fill();
    this.beginPath()
      .rect(100 + this.x, 100 + this.y, 50, 50)
      .fillStyle("blue")
      .fill();
    this.beginPath()
      .rect(500 + this.x, 1500 + this.y, 50, 50)
      .fillStyle("yellow")
      .fill();
  }

  // handlers
  #handlerManagment() {
    this.event("mousedown", this.#mousedownHandler)
      .event("mousemove", this.#mousemoveHandler)
      .event("mouseup", this.#mouseupHandler);
    document.addEventListener("keydown", this.#documentKeydownHandler);
    window.addEventListener("resize", this.#windowResizeHandler);
  }
  #documentKeydownHandler = (event) => {
    if (!DrawingBoard.#modeTypes.has(event.key)) return;
    if (this.#modeType === DrawingBoard.#modeTypes.get(event.key)) return;
    if (this.#modeType.working) return;

    this.#modeType = DrawingBoard.#modeTypes.get(event.key);
    this.#modeType.selected(this);
  };
  #windowResizeHandler = () => {
    this.setCanvasRect(window.innerWidth, window.innerHeight);
    this.dummyShapeRendering();
  };
  #mousedownHandler = (event) => {
    this.#modeType.mousedownHandler && this.#modeType.mousedownHandler(event, this);
  };
  #mousemoveHandler = (event) => {
    this.#modeType.mousemoveHandler && this.#modeType.mousemoveHandler(event, this);
  };
  #mouseupHandler = (event) => {
    this.#modeType.mouseupHandler && this.#modeType.mouseupHandler(event, this);
  };
}
