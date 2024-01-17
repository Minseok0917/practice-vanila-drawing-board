import { TOOLS, LAYERS } from "./excalidraw.constant.js";
import { addClass, removeClass, hasClass } from "./element.js";
import {
  ExcalidrawToolHand,
  ExcalidrawToolSelect,
  ExcalidrawToolShapeRect,
  ExcalidrawToolShapeEllipse,
} from "./excalidraw.tools.js";

class ExcalidrawAction {
  #actions;
  constructor(actions) {
    this.#actions = new Map(actions);
  }

  get actions() {
    return this.#actions;
  }

  getAction(key) {
    return this.#actions.get(key);
  }
}

export class ExcalidrawActionTool extends ExcalidrawAction {
  constructor($workerContainer, render, workerCanvas, state) {
    super([
      [TOOLS.HAND, new ExcalidrawToolHand($workerContainer, render, workerCanvas, state)],
      [TOOLS.SELECT, new ExcalidrawToolSelect($workerContainer, render, workerCanvas, state)],
      [TOOLS.SHAPE_RECT, new ExcalidrawToolShapeRect($workerContainer, render, workerCanvas, state)],
      [TOOLS.SHAPE_ELLIPSE, new ExcalidrawToolShapeEllipse($workerContainer, render, workerCanvas, state)],
    ]);
  }
}

export class ExcalidrawActionKeydownTool extends ExcalidrawAction {
  constructor() {
    super([
      ["1", TOOLS.HAND],
      ["2", TOOLS.SELECT],
      ["3", TOOLS.SHAPE_RECT],
      ["4", TOOLS.SHAPE_ELLIPSE],
    ]);
  }
  shouldChangeSelectedTool(key, selectedTool) {
    const hasKeydownAction = this.actions.has(key);
    const sameCurrentSelectedTool = selectedTool === this.actions.get(key);
    return hasKeydownAction && !sameCurrentSelectedTool;
  }
}

export class ExcalidrawActionContainer extends ExcalidrawAction {
  constructor(actions) {
    super(Object.entries(actions));
  }

  /**  사용하지 않음
   * 원래는 캔버스 컨테이너를 선택하는 형식으로 구조를 잡았지만
   * 그럴 경우에 마우스 커서가 바로 바로 변경되지 않고 한 번 움직여야되는 버그가 존재함
   * 그래서 마우스 커서는 하나의 캔버스에서 처리하기로 했음
   * 정확하게는 작업용 캔버스에서 이벤트리스너 처리다 하고 뒤에는 렌더링 캔버스로 화면 업데이트만 시전하기로 했음
   * */

  #getContainer(actionName) {
    return this.getAction(actionName);
  }

  // 사용하지 않음
  #selected(actionName) {
    const $container = this.getContainer(actionName);
    if (hasClass($container, "excalidraw-container--selected")) return;
    this.#removeAll();
    addClass($container, "excalidraw-container--selected");
  }

  #removeAll() {
    this.actions.forEach(($container) => {
      removeClass($container, "excalidraw-container--selected");
    });
  }
}
