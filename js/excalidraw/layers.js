import { Canvas } from "../@share/canvas.js";
import { Context } from "../@share/context.js";

export const LAYERS = Object.freeze({
  RENDEINRG: "RENDERING",
  WORKING: "WORKING",
});

export class ExcalidrawLayerManager {
  #excalidraw;
  #selectedLayerName;
  #layerActions;
  #layerCanvasActions;
  #layerContextActions;

  constructor(excalidraw) {
    this.#excalidraw = excalidraw;
    this.#layerActions = new Map();
    this.#layerActions.set(LAYERS.WORKING, excalidraw.$workingLayer);
    this.#layerActions.set(LAYERS.RENDEINRG, excalidraw.$renderingLayer);

    this.#layerCanvasActions = new Map();
    this.#layerCanvasActions.set(LAYERS.WORKING, new Canvas().setCanvasSize(window.innerWidth, window.innerHeight));
    this.#layerCanvasActions.set(LAYERS.RENDEINRG, new Canvas().setCanvasSize(window.innerWidth, window.innerHeight));

    this.#layerContextActions = new Map();
    this.#layerContextActions.set(LAYERS.WORKING, new Context(this.$workingCanvas));
    this.#layerContextActions.set(LAYERS.RENDEINRG, new Context(this.$renderingCanvas));

    excalidraw.$workingLayer.append(this.$workingCanvas);
    excalidraw.$renderingLayer.append(this.$renderingCanvas);
  }

  changeSelectedLayer(layer) {
    if (this.#shouldChangeSameSelectedLayer(layer)) return;
    this.#selectedLayerName = layer;
    this.#updateSelectedLayer();
  }

  #updateSelectedLayer() {
    this.#layerActions.forEach((layer) => layer.classList.remove("excalidraw-container--selected"));
    this.selectedLayer.classList.add("excalidraw-container--selected");
  }
  #shouldChangeSameSelectedLayer(layer) {
    return this.#selectedLayerName === layer;
  }

  get $renderingLayer() {
    return this.#layerActions.get(LAYERS.RENDEINRG);
  }
  get $workingLayer() {
    return this.#layerActions.get(LAYERS.WORKING);
  }
  get $renderingCanvas() {
    return this.#layerCanvasActions.get(LAYERS.RENDEINRG).$canvas;
  }
  get $workingCanvas() {
    return this.#layerCanvasActions.get(LAYERS.WORKING).$canvas;
  }
  get renderingContext() {
    return this.#layerContextActions.get(LAYERS.RENDEINRG);
  }
  get workingContext() {
    return this.#layerContextActions.get(LAYERS.WORKING);
  }

  get selectedLayer() {
    return this.#layerActions.get(this.#selectedLayerName);
  }
  get selectedCanvas() {
    return this.#layerCanvasActions.get(this.#selectedLayerName);
  }
}

/* export class ExcalidrawCanvasLayer {
  constructor() {
    this.canvas = new Canvas().setCanvasSize(window.innerWidth, window.innerHeight);
    this.context = new Context(this.canvas.$canvas);
  }
}
export class ExcalidrawWorkingLayer extends ExcalidrawCanvasLayer {}
export class ExcalidrawRenderingLayer extends ExcalidrawCanvasLayer {}
 */
