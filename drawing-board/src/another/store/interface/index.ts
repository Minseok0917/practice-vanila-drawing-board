import { Canvas, Context2D } from "@/share";
import { TOOLS } from "@/another/tools/constant";

export interface AnotherStoreState {
  $another: HTMLDivElement;
  $renderContainer: HTMLDivElement;
  $workerContainer: HTMLDivElement;
  $renderContainerCanvas: HTMLCanvasElement;
  $workerContainerCanvas: HTMLCanvasElement;
  renderCanvasInstance: Canvas;
  workerCanvasInstance: Canvas;
  renderContextInstance: Context2D;
  workerContextInstance: Context2D;
  selectedTool: TOOLS;
}
