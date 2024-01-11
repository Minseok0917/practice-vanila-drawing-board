export class DrawingBoardTool {
  #name;
  #description;
  #working = false;

  setName(name) {
    this.#name = name;
    return this;
  }
  setDescription(description) {
    this.#description = description;
    return this;
  }
  setWorkingProgress() {
    this.#working = true;
  }
  setWorkingEnd() {
    this.#working = false;
  }

  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
  }
  get working() {
    return this.#working;
  }

  selected() {}
}

export class DrawingBoardToolShape extends DrawingBoardTool {
  selected(drawingBoardInstance) {
    if (drawingBoardInstance.containClass("cursor-crosshair")) return;
    drawingBoardInstance.resetClass().addClass("cursor-crosshair");
  }
}
