import { Canvas } from "./module.canvas.js";
const $app = document.getElementById("app");

class DrawingBoard extends Canvas {
  static #instance;
  #mode = "touch"; // touch | selected | shape-rect | shape-circle

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
  #documentKeydownHandler(event) {
    switch (event.key) {
      case "1":
        this.#mode = "touch";
        break;
      case "2":
        this.#mode = "selected";
        break;
      case "3":
        this.#mode = "shape-rect";
        break;
      case "4":
        this.#mode = "shape-circle";
        break;
    }
  }
  #windowResizeHandler() {
    this.setCanvasRect(window.innerWidth, window.innerHeight);
  }
  #mousedownHandler(event) {}
  #mousemoveHandler(event) {}
  #mouseupHandler(event) {}
}

const drawingBoardInstance = DrawingBoard.getInstance().mount($app);
