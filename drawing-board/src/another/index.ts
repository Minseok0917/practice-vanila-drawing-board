import { Canvas, Context2D } from "@share";
import { AnotherStore } from "./store";
import { TOOLS } from "./tools/constant";

const GLOBAL_KEYDOWN_ACTIONS = new Map<string, TOOLS>([
  ["1", TOOLS.HAND],
  ["2", TOOLS.SELECT],
  ["3", TOOLS.SHAPE_RECT],
  ["4", TOOLS.SHAPE_ELLIPSE],
]);

export function setupAnother($another: HTMLDivElement) {
  const $renderContainer: HTMLDivElement = $another.querySelector(".canvas-container-render")!;
  const $workerContainer: HTMLDivElement = $another.querySelector(".canvas-container-worker")!;
  const $renderContainerCanvas: HTMLCanvasElement = $renderContainer.querySelector("canvas")!;
  const $workerContainerCanvas: HTMLCanvasElement = $workerContainer.querySelector("canvas")!;

  const renderCanvasInstance: Canvas = Canvas.install($renderContainerCanvas);
  const workerCanvasInstance: Canvas = Canvas.install($workerContainerCanvas);
  const renderContextInstance: Context2D = new Context2D($renderContainerCanvas);
  const workerContextInstance: Context2D = new Context2D($workerContainerCanvas);

  const { anotherStore } = AnotherStore.install({
    $renderContainer,
    $workerContainer,
    $renderContainerCanvas,
    $workerContainerCanvas,
    renderCanvasInstance,
    workerCanvasInstance,
    renderContextInstance,
    workerContextInstance,
    selectedTool: TOOLS.HAND,
  });
  anotherStore.selectedToolAction.selected();

  renderCanvasInstance.updateResize(window.innerWidth, window.innerHeight);
  workerCanvasInstance.updateResize(window.innerWidth, window.innerHeight);

  function excuteSelectedToolActionMouseEvent(event: MouseEvent) {
    const selectedToolAction = anotherStore.selectedToolAction;
    switch (event.type) {
      case "mousedown":
        selectedToolAction.mousedown(event);
        break;
      case "mousemove":
        selectedToolAction.mousemove(event);
        break;
      case "mouseup":
        selectedToolAction.mouseup(event);
        break;
    }
  }

  function globalKeydownEvent(event: KeyboardEvent) {
    if (!GLOBAL_KEYDOWN_ACTIONS.has(event.key)) return;
    anotherStore.setState({ selectedTool: GLOBAL_KEYDOWN_ACTIONS.get(event.key)! });
    anotherStore.selectedToolAction.selected();
  }

  $another.addEventListener("mousedown", excuteSelectedToolActionMouseEvent);
  $another.addEventListener("mousemove", excuteSelectedToolActionMouseEvent);
  $another.addEventListener("mouseup", excuteSelectedToolActionMouseEvent);
  document.addEventListener("keydown", globalKeydownEvent);
}
