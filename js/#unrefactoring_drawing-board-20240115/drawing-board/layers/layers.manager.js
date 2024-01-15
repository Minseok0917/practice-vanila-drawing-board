import { LAYERS } from "../constants/constants.layers.js";
import { DrawingBoardShapeLayer } from "./layer/layer.shape.js";
import { DrawingBoardRenderingLayer } from "./layer/layer.rendering.js";

export class DrawingBoardLayerManager {
  #layerActions;
  constructor() {
    this.#layerActions = new Map();
    this.#layerActions.set(LAYERS.SHAPE, new DrawingBoardShapeLayer());
    this.#layerActions.set(LAYERS.RENDERING, new DrawingBoardRenderingLayer());
  }
}
