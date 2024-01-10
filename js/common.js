import { Canvas } from "./module.canvas.js";
const $app = document.getElementById("app");

class DrawingBoard extends Canvas {
  static #instance;
  static #modeTypes = {
    1: "touch",
    2: "selected",
    3: "shape-rect",
    4: "shape-circle",
  };
  #modeType = DrawingBoard.#modeTypes[1]; // touch | selected | shape-rect | shape-circle

  constructor() {
    super();
    if (!DrawingBoard.#instance) DrawingBoard.#instance = this;
    this.setCanvasRect(window.innerWidth, window.innerHeight);
    this.#handlerManagment();
    return DrawingBoard.#instance;
  }
  static getInstance() {
    if (!DrawingBoard.#instance) DrawingBoard.#instance = new DrawingBoard();
    return DrawingBoard.#instance;
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
    this.#modeType = DrawingBoard.#modeTypes[event.key] ?? this.#modeType;
  };
  #windowResizeHandler = () => {
    this.setCanvasRect(window.innerWidth, window.innerHeight);
  };
  #mousedownHandler(event) {}
  #mousemoveHandler(event) {}
  #mouseupHandler(event) {}
}

const drawingBoardInstance = DrawingBoard.getInstance().mount($app);
