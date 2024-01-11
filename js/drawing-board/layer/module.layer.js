import { Canvas } from "../../share/module.canvas.js";

export class CanvasLayer extends Canvas {
  #layerName;
  setLayerName(layerName) {
    this.#layerName = layerName;
    return this;
  }

  mount($parentElement) {
    const $layerContainer = createElement("div", {
      className: `canvas-container ${this.#layerName}`,
    });
    $layerContainer.append(this.$canvas);
    $parentElement.append($layerContainer);
  }
}
