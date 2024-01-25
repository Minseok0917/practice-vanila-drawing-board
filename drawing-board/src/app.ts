import { Canvas, Context2D } from "@share";

abstract class Tool {
  public abstract mousedown(event: MouseEvent): void;
  public abstract mousemove(event: MouseEvent): void;
  public abstract mouseup(event: MouseEvent): void;
}
class ToolHand extends Tool {
  public mousedown(event: MouseEvent) {}
  public mousemove(event: MouseEvent) {}
  public mouseup(event: MouseEvent) {}
}
class ToolSelect extends Tool {
  public mousedown(event: MouseEvent) {}
  public mousemove(event: MouseEvent) {}
  public mouseup(event: MouseEvent) {}
}
class ToolShapeRect extends Tool {
  public mousedown(event: MouseEvent) {}
  public mousemove(event: MouseEvent) {}
  public mouseup(event: MouseEvent) {}
}
class ToolShapeEllipse extends Tool {
  public mousedown(event: MouseEvent) {}
  public mousemove(event: MouseEvent) {}
  public mouseup(event: MouseEvent) {}
}

enum TOOLS {
  HAND = "hand",
  SELECT = "select",
  SHAPE_RECT = "shape-rect",
  SHAPE_ELLIPSE = "shape-ellipse",
}

const TOOL_ACTIONS: Readonly<Record<TOOLS, Tool>> = {
  [TOOLS.HAND]: new ToolHand(),
  [TOOLS.SELECT]: new ToolSelect(),
  [TOOLS.SHAPE_RECT]: new ToolShapeRect(),
  [TOOLS.SHAPE_ELLIPSE]: new ToolShapeEllipse(),
};

interface AnotherStoreState {
  $renderContainer?: HTMLDivElement;
  $workerContainer?: HTMLDivElement;

  $renderContainerCanvas?: HTMLCanvasElement;
  $workerContainerCanvas?: HTMLCanvasElement;

  renderCanvasInstance?: Canvas;
  workerCanvasInstance?: Canvas;

  renderContextInstance?: Context2D;
  workerContextInstance?: Context2D;
}
class AnotherStore {
  private static instance: AnotherStore;
  private _state: AnotherStoreState;

  private constructor(state: AnotherStoreState) {
    this._state = state;
  }

  public static install(state: AnotherStoreState): AnotherStore {
    if (!AnotherStore.instance) {
      AnotherStore.instance = new AnotherStore(state);
    }
    return AnotherStore.instance;
  }

  public get state(): { [key: string]: any } {
    return this._state;
  }
}

export function setupAnother($another: HTMLDivElement) {
  const $renderContainer: HTMLDivElement = $another.querySelector(".canvas-container-render")!;
  const $workerContainer: HTMLDivElement = $another.querySelector(".canvas-container-worker")!;
  const $renderContainerCanvas: HTMLCanvasElement = $renderContainer.querySelector("canvas")!;
  const $workerContainerCanvas: HTMLCanvasElement = $workerContainer.querySelector("canvas")!;

  const renderCanvasInstance: Canvas = Canvas.install($renderContainerCanvas);
  const workerCanvasInstance: Canvas = Canvas.install($workerContainerCanvas);
  const renderContextInstance: Context2D = new Context2D($renderContainerCanvas);
  const workerContextInstance: Context2D = new Context2D($workerContainerCanvas);

  const anotherStore = AnotherStore.install({
    $renderContainer,
    $workerContainer,
    $renderContainerCanvas,
    $workerContainerCanvas,
    renderCanvasInstance,
    workerCanvasInstance,
    renderContextInstance,
    workerContextInstance,
  });

  renderCanvasInstance.updateResize(window.innerWidth, window.innerHeight);
  workerCanvasInstance.updateResize(window.innerWidth, window.innerHeight);

  let SELECTED_TOOL: TOOLS = TOOLS.HAND;

  function excuteSelectedToolActionMouseEvent(event: MouseEvent) {
    const selectedToolAction = TOOL_ACTIONS[SELECTED_TOOL];
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

  $another.addEventListener("mousedown", excuteSelectedToolActionMouseEvent);
  $another.addEventListener("mousemove", excuteSelectedToolActionMouseEvent);
  $another.addEventListener("mouseup", excuteSelectedToolActionMouseEvent);
}
