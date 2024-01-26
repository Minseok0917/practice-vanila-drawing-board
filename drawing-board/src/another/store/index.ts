import { AnotherStoreState } from "./interface";
import { TOOL_ACTIONS } from "../tools/action";
import type { Canvas, Context2D } from "@/share";
import type { ITool } from "../tools/interface";
import type { CURSOR } from "./constant";

export class AnotherStore {
  private static instance: AnotherStore;
  private _state: AnotherStoreState;

  private constructor(state: AnotherStoreState) {
    this._state = state;
  }

  public static install(state?: AnotherStoreState): { anotherStore: AnotherStore } {
    if (!AnotherStore.instance && state) {
      AnotherStore.instance = new AnotherStore(state);
    }
    return { anotherStore: AnotherStore.instance };
  }

  public setState(newState: Partial<AnotherStoreState>): void {
    this._state = { ...this._state, ...newState };
  }

  public changeCanvasCursor(cursorName: CURSOR): void {
    this.$workerContainer.style.cursor = cursorName;
  }

  public get $another(): HTMLDivElement {
    return this._state.$another;
  }

  public get $renderContainer(): HTMLDivElement {
    return this._state.$renderContainer;
  }

  public get $workerContainer(): HTMLDivElement {
    return this._state.$workerContainer;
  }

  public get $renderContainerCanvas(): HTMLCanvasElement {
    return this._state.$renderContainerCanvas;
  }

  public get $workerContainerCanvas(): HTMLCanvasElement {
    return this._state.$workerContainerCanvas;
  }

  public get renderCanvasInstance(): Canvas {
    return this._state.renderCanvasInstance;
  }

  public get workerCanvasInstance(): Canvas {
    return this._state.workerCanvasInstance;
  }

  public get renderContextInstance(): Context2D {
    return this._state.renderContextInstance;
  }

  public get workerContextInstance(): Context2D {
    return this._state.workerContextInstance;
  }

  public get selectedToolAction(): ITool {
    return TOOL_ACTIONS[this._state.selectedTool];
  }
}
