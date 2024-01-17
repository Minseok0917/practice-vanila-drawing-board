import { Canvas } from "./canvas.js";
import { Context } from "./context.js";

class ExcalidrawCanvas extends Canvas {
  #context;
  constructor($canvas) {
    super($canvas);
    this.#context = new Context(this.$canvas);
  }

  get context() {
    return this.#context;
  }
}

export class ExcalidrawCanvasRender extends ExcalidrawCanvas {
  #state;
  constructor($container, $canvas, state) {
    super($canvas);
    this.#state = state;
    new ResizeObserver(this.#handleResizeObserver).observe($container);
  }

  #handleResizeObserver = ([entry]) => {
    this.updateResize(entry.contentRect.width, entry.contentRect.height);
    this.rendering(this.#state.shapes);
  };

  rendering(shapes) {
    const { canvasX, canvasY } = this.#state;
    this.context.clearAll();

    shapes.forEach((shape) => {
      shape.draw({
        x: shape.x + canvasX,
        y: shape.y + canvasY,
        width: shape.width,
        height: shape.height,
      });
      this.context.beginPath().fill(shape.path);
    });
  }
}

export class ExcalidrawCanvasWorker extends ExcalidrawCanvas {
  constructor($container, $canvas) {
    super($canvas);
    new ResizeObserver(this.#handleResizeObserver).observe($container);
  }

  #handleResizeObserver = ([entry]) => {
    this.updateResize(entry.contentRect.width, entry.contentRect.height);
  };
}
