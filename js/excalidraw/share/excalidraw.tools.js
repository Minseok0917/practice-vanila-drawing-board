import { updateStyled } from "./element.js";

class ExcalidrawTool {
  #$workerContainer;
  #renderCanvas;
  #workerCanvas;
  #state;
  constructor($workerContainer, render, workerCanvas, state) {
    this.#$workerContainer = $workerContainer;
    this.#renderCanvas = render;
    this.#workerCanvas = workerCanvas;
    this.#state = state;
  }
  selected() {}

  updateCursor(cursorName) {
    updateStyled(this.#$workerContainer, {
      cursor: cursorName,
    });
  }

  get renderCanvas() {
    return this.#renderCanvas;
  }
  get workerCanvas() {
    return this.#workerCanvas;
  }
  get state() {
    return this.#state;
  }
}

class ExcalidrawToolShape extends ExcalidrawTool {
  selected() {
    this.updateCursor("crosshair");
  }
}

export class ExcalidrawToolHand extends ExcalidrawTool {
  mousedown = null; // null | {x:number, y:number}

  selected() {
    this.updateCursor("grab");
  }
  handleMousedown(event) {
    this.updateCursor("grabbing");
    this.#setMousedown(event);
  }
  handleMousemove(event) {
    if (this.mousedown === null) return;
    this.state.canvasX += event.offsetX - this.mousedown.x;
    this.state.canvasY += event.offsetY - this.mousedown.y;

    this.mousedown.x = event.offsetX;
    this.mousedown.y = event.offsetY;

    this.renderCanvas.rendering(this.state.shapes);
  }
  handleMouseup() {
    if (this.mousedown === null) return;
    this.mousedown = null;
    this.updateCursor("grab");
  }

  #setMousedown(event) {
    this.mousedown = { x: event.offsetX, y: event.offsetY };
  }
}

export class ExcalidrawToolSelect extends ExcalidrawTool {
  selected() {
    this.updateCursor("auto");
  }
}

export class ExcalidrawToolShapeRect extends ExcalidrawToolShape {}

export class ExcalidrawToolShapeEllipse extends ExcalidrawToolShape {}
