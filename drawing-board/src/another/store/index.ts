import { AnotherStoreState } from "./interface";
import { Canvas, Context2D } from "@/share";
import { ITool } from "../tools/interface";
import { TOOL_ACTIONS } from "../tools/action";

export class AnotherStore {
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

  public setState(newState: Partial<AnotherStoreState>): void {
    this._state = { ...this._state, ...newState };
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
