import { createInnerHTML } from "./share/element.js";
import { Context } from "./share/context.js";
import { CONTEXT_SHAPE_ACTIONS } from "./share/context-path/index.js";

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

  const renderingContext = new Context($excalidrawContainerRenderCanvas);
  const workerContext = new Context($excalidrawContainerWorkerCanvas);
}

excalidraw();
