import { Canvas, Context2D } from "@share";

export function setupAnother($another: HTMLDivElement) {
  const $renderContainer: HTMLDivElement = $another.querySelector(".canvas-container-render")!;
  const $workerContainer: HTMLDivElement = $another.querySelector(".canvas-container-worker")!;
  const $renderContainerCanvas: HTMLCanvasElement = $renderContainer.querySelector("canvas")!;
  const $workerContainerCanvas: HTMLCanvasElement = $workerContainer.querySelector("canvas")!;

  const renderCanvasInstance: Canvas = Canvas.install($renderContainerCanvas);
  const workerCanvasInstance: Canvas = Canvas.install($workerContainerCanvas);

  renderCanvasInstance.updateResize(window.innerWidth, window.innerHeight);
  workerCanvasInstance.updateResize(window.innerWidth, window.innerHeight);

  console.log(Context2D);
}
