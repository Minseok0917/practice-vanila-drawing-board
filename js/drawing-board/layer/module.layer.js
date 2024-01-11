import { Canvas } from "../../share/module.canvas.js";

export class CanvasLayer extends Canvas {
  #layerName;
  #$layerContainer;

  setLayerName(layerName) {
    this.#layerName = layerName;
    return this;
  }

  mount($parentElement) {
    this.#$layerContainer = createElement("div", {
      className: `canvas-container ${this.#layerName}`,
    });
    this.#$layerContainer.append(this.$canvas);
    this.resizeObserver(this.#$layerContainer);
    $parentElement.append(this.#$layerContainer);
  }
}
