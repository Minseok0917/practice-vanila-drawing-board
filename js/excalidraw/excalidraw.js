import { createInnerHTML } from "./share/element.js";
import { TOOLS, LAYERS } from "./share/excalidraw.constant.js";
import { ExcalidrawCanvas } from "./share/excalidraw.canvas.js";
import { CONTEXT_SHAPES, CONTEXT_SHAPE_ACTIONS } from "./share/context-path/index.js";
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

  // instances
  const renderCanvas = new ExcalidrawCanvas($excalidrawContainerRender, $excalidrawContainerRenderCanvas);
  const workerCanvas = new ExcalidrawCanvas($excalidrawContainerWorker, $excalidrawContainerWorkerCanvas);

  // actions
  const toolActions = new ExcalidrawActionTool($excalidrawContainerWorker);
  const keydownToolActions = new ExcalidrawActionKeydownTool();
  const containerActions = new ExcalidrawActionContainer({
    [LAYERS.RENDER]: $excalidrawContainerRender,
    [LAYERS.WORKER]: $excalidrawContainerWorker,
  });

  // state & getters
  const state = {
    shapes: [],
    selectedTool: TOOLS.HAND,
    selectedLayer: null,
  };
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
  function handleExcalidrawMousedown(event) {}
  function handleExcalidrawMousemove(event) {}
  function handleExcalidrawMouseup(event) {}

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
