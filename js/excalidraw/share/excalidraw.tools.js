import { updateStyled } from "./element.js";

class ExcalidrawTool {
  #$workerContainer;
  constructor($workerContainer) {
    this.#$workerContainer = $workerContainer;
  }
  selected() {}

  updateCursor(cursorName) {
    updateStyled(this.#$workerContainer, {
      cursor: cursorName,
    });
  }
}

class ExcalidrawToolShape extends ExcalidrawTool {
  selected() {
    this.updateCursor("crosshair");
  }
}

export class ExcalidrawToolHand extends ExcalidrawTool {
  selected() {
    this.updateCursor("grab");
  }
}

export class ExcalidrawToolSelect extends ExcalidrawTool {
  selected() {
    this.updateCursor("auto");
  }
}

export class ExcalidrawToolShapeRect extends ExcalidrawToolShape {}

export class ExcalidrawToolShapeEllipse extends ExcalidrawToolShape {}
