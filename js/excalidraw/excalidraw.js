import { createInnerHTML } from "./share/element.js";
import { ExcalidrawCanvas } from "./share/excalidraw.canvas.js";
import { CONTEXT_SHAPES, CONTEXT_SHAPE_ACTIONS } from "./share/context-path/index.js";

const TOOLS = Object.freeze({
  HAND: "HAND",
  SELECT: "SELECT",
  SHAPE_RECT: "SHAPE_RECT",
  SHAPE_ELLIPSE: "SHAPE_ELLIPSE",
});

export function excalidraw() {
  const $excalidraw = createInnerHTML(`
    <div class="excalidraw">
        <div class="excalidraw-container excalidraw-render"><canvas /></div>
        <div class="excalidraw-container excalidraw-worker"><canvas /></div>
    </div>  
  `);
  const $excalidrawContainerRender = $excalidraw.querySelector(".excalidraw-container.excalidraw-render");
  const $excalidrawContainerWorker = $excalidraw.querySelector(".excalidraw-container.excalidraw-worker");
  const $excalidrawContainerRenderCanvas = $excalidrawContainerRender.querySelector("canvas");
  const $excalidrawContainerWorkerCanvas = $excalidrawContainerWorker.querySelector("canvas");

  const shapes = [];
  const renderCanvas = new ExcalidrawCanvas($excalidrawContainerRender, $excalidrawContainerRenderCanvas);
  const workerCanvas = new ExcalidrawCanvas($excalidrawContainerWorker, $excalidrawContainerWorkerCanvas);

  const selectedTool = TOOLS.HAND;

  return {
    mount($app) {
      $app.append($excalidraw);
    },
  };
}

const $app = document.getElementById("app");
excalidraw().mount($app);
