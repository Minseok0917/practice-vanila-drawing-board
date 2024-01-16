import { createInnerHTML } from "../@share/elementFactory.js";
import { ExcalidrawToolManager } from "./tools.js";
import { ExcalidrawLayerManager } from "./layers.js";

export class Excalidraw {
  #elements = {
    $root: null,
    $tools: null,
    $workingLayer: null,
    $renderingLayer: null,
  };
  #layerManager;
  #toolManager;
  constructor() {}

  mount($app) {
    this.#elements.$root = createInnerHTML(`
        <div class="excalidraw">
            <div class="excalidraw-container excalidraw__working-layer"></div>
            <div class="excalidraw-container excalidraw__rendering-layer"></div>
            <div class="excalidraw-container excalidraw__tools"></div>
        </div>
    `);
    $app.append(this.#elements.$root);
    this.#onMounted();
  }

  #onMounted() {
    const { $root } = this.#elements;
    this.#elements.$tools = $root.querySelector(".excalidraw__tools");
    this.#elements.$workingLayer = $root.querySelector(".excalidraw__working-layer");
    this.#elements.$renderingLayer = $root.querySelector(".excalidraw__rendering-layer");

    this.#layerManager = new ExcalidrawLayerManager(this);
    this.#toolManager = new ExcalidrawToolManager(this);
  }

  get layerManager() {
    return this.#layerManager;
  }

  get $renderingLayer() {
    return this.#elements.$renderingLayer;
  }
  get $workingLayer() {
    return this.#elements.$workingLayer;
  }
}
