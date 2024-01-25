import { createInnerHTML } from "./share/element.js";
import { TOOLS, LAYERS } from "./share/excalidraw.constant.js";
import { ExcalidrawCanvasRender, ExcalidrawCanvasWorker } from "./share/excalidraw.canvas.js";
import { CONTEXT_SHAPES, CONTEXT_SHAPE_ACTIONS } from "./share/context-path/index.js";
import { ContextPathRect, ContextPathEllipse } from "./share/context-path/context-path.shapes.js";
import {
  ExcalidrawActionTool,
  ExcalidrawActionKeydownTool,
  ExcalidrawActionContainer,
} from "./share/excalidraw.actions.js";

export function excalidraw() {
  // elements
  const $excalidraw = createInnerHTML(`
    <div class="excalidraw">
        <div class="excalidraw-container excalidraw-render"><canvas /></div>
        <div class="excalidraw-container excalidraw-container--selected excalidraw-worker"><canvas /></div>
    </div>  
  `);
  const $excalidrawContainerRender = $excalidraw.querySelector(".excalidraw-container.excalidraw-render");
  const $excalidrawContainerWorker = $excalidraw.querySelector(".excalidraw-container.excalidraw-worker");
  const $excalidrawContainerRenderCanvas = $excalidrawContainerRender.querySelector("canvas");
  const $excalidrawContainerWorkerCanvas = $excalidrawContainerWorker.querySelector("canvas");

  // state
  const state = {
    shapes: [
      new ContextPathRect({ x: -100, y: -100, width: 120, height: 120 }),
      new ContextPathRect({ x: 100, y: -10, width: 50, height: 50 }),
      new ContextPathRect({ x: -10, y: 500, width: 100, height: 200 }),
      new ContextPathRect({ x: 600, y: 80, width: 80, height: 150 }),
    ],
    selectedTool: TOOLS.HAND,
    selectedLayer: null,
    canvasX: 0,
    canvasY: 0,
  };

  // instances
  const renderCanvas = new ExcalidrawCanvasRender($excalidrawContainerRender, $excalidrawContainerRenderCanvas, state);
  const workerCanvas = new ExcalidrawCanvasWorker($excalidrawContainerWorker, $excalidrawContainerWorkerCanvas);

  // actions
  const toolActions = new ExcalidrawActionTool($excalidrawContainerWorker, renderCanvas, workerCanvas, state);
  const keydownToolActions = new ExcalidrawActionKeydownTool();
  const containerActions = new ExcalidrawActionContainer({
    [LAYERS.RENDER]: $excalidrawContainerRender,
    [LAYERS.WORKER]: $excalidrawContainerWorker,
  });

  // getters
  const getters = Object.freeze({
    get selectedToolAction() {
      return toolActions.getAction(state.selectedTool);
    },
  });

  // handles
  function handleDocumentKeydown(event) {
    if (!keydownToolActions.shouldChangeSelectedTool(event.key, state.selectedTool)) return;
    state.selectedTool = keydownToolActions.getAction(event.key);
    getters.selectedToolAction.selected(containerActions);
  }
  function handleExcalidrawMousedown(event) {
    if (!getters.selectedToolAction.handleMousedown) return;
    getters.selectedToolAction.handleMousedown(event);
  }
  function handleExcalidrawMousemove(event) {
    if (!getters.selectedToolAction.handleMouseup) return;
    getters.selectedToolAction.handleMousemove(event);
  }
  function handleExcalidrawMouseup(event) {
    if (!getters.selectedToolAction.handleMousemove) return;
    getters.selectedToolAction.handleMouseup(event);
  }

  document.addEventListener("keydown", handleDocumentKeydown);
  $excalidraw.addEventListener("mousedown", handleExcalidrawMousedown);
  $excalidraw.addEventListener("mousemove", handleExcalidrawMousemove);
  $excalidraw.addEventListener("mouseup", handleExcalidrawMouseup);

  // mount
  getters.selectedToolAction.selected(containerActions);
  const $app = document.getElementById("app");
  $app.append($excalidraw);
}

excalidraw();
