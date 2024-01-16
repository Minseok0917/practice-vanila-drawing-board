import { Canvas } from "./canvas.js";
import { Context } from "./context.js";

export class ExcalidrawCanvas extends Canvas {
  #context;
  constructor($container, $canvas) {
    super($canvas);
    this.#context = new Context(this.$canvas);

    new ResizeObserver(this.#handleResizeObserver).observe($container);
  }

  #handleResizeObserver = ([entry]) => {
    this.updateResize(entry.contentRect.width, entry.contentRect.height);
  };

  get context() {
    return this.#context;
  }
}
