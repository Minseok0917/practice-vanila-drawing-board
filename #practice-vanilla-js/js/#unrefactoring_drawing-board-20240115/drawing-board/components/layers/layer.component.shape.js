import { LayerComponent } from "./abtract.component-layer.js";

export class DrawingBoardShapeLayerComponent extends LayerComponent {
  #$element;
  #$canvas;
  constructor() {
    // this.#$element = new Element("div", { className: "layer-container shape-layer" });
    // this.#$canvas = new Element("canvas");
  }
}
