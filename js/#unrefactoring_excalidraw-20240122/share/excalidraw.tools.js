import { updateStyled } from "./element.js";
import { ContextPathRect, ContextPathEllipse } from "./context-path/context-path.shapes.js";

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
  #mousedown = null; // null | {x:number, y:number}

  selected() {
    this.updateCursor("grab");
  }
  handleMousedown(event) {
    this.updateCursor("grabbing");
    this.#setMousedown(event);
  }
  handleMousemove(event) {
    if (this.#mousedown === null) return;
    this.state.canvasX += event.offsetX - this.#mousedown.x;
    this.state.canvasY += event.offsetY - this.#mousedown.y;

    this.#mousedown.x = event.offsetX;
    this.#mousedown.y = event.offsetY;

    this.renderCanvas.rendering(this.state.shapes);
  }
  handleMouseup() {
    if (this.#mousedown === null) return;
    this.#mousedown = null;
    this.updateCursor("grab");
  }

  #setMousedown(event) {
    this.#mousedown = { x: event.offsetX, y: event.offsetY };
  }
}

export class ExcalidrawToolSelect extends ExcalidrawTool {
  selected() {
    this.updateCursor("auto");
  }
}

export class ExcalidrawToolShapeRect extends ExcalidrawToolShape {
  #mousedown = null; // null | {x:number, y:number}
  #mousemove = null; // null | {x:number,}

  handleMousedown(event) {
    this.#setMousedown(event);
  }
  handleMousemove(event) {
    if (this.#mousedown === null) return;
    this.#setMousemove(event);

    const contextPath = new ContextPathRect(this.#setupPath());
    this.workerCanvas.context.clearAll().stroke(contextPath.path);
  }
  handleMouseup() {
    if (this.#mousedown === null) return;

    const contextPathConfig = this.#setupPath();
    contextPathConfig.x -= this.state.canvasX;
    contextPathConfig.y -= this.state.canvasY;
    console.log(contextPathConfig);

    const contextPath = new ContextPathRect(contextPathConfig);
    this.state.shapes = [...this.state.shapes, contextPath];
    this.workerCanvas.context.clearAll();
    this.renderCanvas.rendering(this.state.shapes);

    this.shapes;
    this.#mousedown = null;
    this.#mousemove = null;
  }

  #setupPath() {
    const { x: downX, y: downY } = this.#mousedown;
    const { x: moveX, y: moveY } = this.#mousemove;
    return {
      x: Math.min(downX, moveX),
      y: Math.min(downY, moveY),
      width: Math.abs(downX - moveX),
      height: Math.abs(downY - moveY),
    };
  }

  #setMousedown(event) {
    this.#mousedown = { x: event.offsetX, y: event.offsetY };
  }
  #setMousemove(event) {
    this.#mousemove = { x: event.offsetX, y: event.offsetY };
  }
}

export class ExcalidrawToolShapeEllipse extends ExcalidrawToolShape {
  #mousedown = null; // null | {x:number, y:number}
  #mousemove = null; // null | {x:number,}

  handleMousedown(event) {
    this.#setMousedown(event);
  }
  handleMousemove(event) {
    if (this.#mousedown === null) return;
    this.#setMousemove(event);

    const contextPath = new ContextPathEllipse(this.#setupPath());
    this.workerCanvas.context.clearAll().stroke(contextPath.path);
  }
  handleMouseup() {
    if (this.#mousedown === null) return;

    const contextPathConfig = this.#setupPath();
    contextPathConfig.x -= this.state.canvasX;
    contextPathConfig.y -= this.state.canvasY;

    const contextPath = new ContextPathEllipse(contextPathConfig);
    this.state.shapes = [...this.state.shapes, contextPath];
    this.workerCanvas.context.clearAll();
    this.renderCanvas.rendering(this.state.shapes);

    this.shapes;
    this.#mousedown = null;
    this.#mousemove = null;
  }

  #setupPath() {
    const { x: downX, y: downY } = this.#mousedown;
    const { x: moveX, y: moveY } = this.#mousemove;

    const rx = Math.abs(downX - moveX) / 2;
    const ry = Math.abs(downY - moveY) / 2;
    return {
      x: Math.min(downX, moveX) + rx,
      y: Math.min(downY, moveY) + ry,
      rx,
      ry,
    };
  }

  #setMousedown(event) {
    this.#mousedown = { x: event.offsetX, y: event.offsetY };
  }
  #setMousemove(event) {
    this.#mousemove = { x: event.offsetX, y: event.offsetY };
  }
}
