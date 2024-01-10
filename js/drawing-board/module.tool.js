export class DrawingBoardTool {
  #name;
  #description;

  setName(name) {
    this.#name = name;
    return this;
  }
  setDescription(description) {
    this.#description = description;
    return this;
  }

  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
  }

  selected() {}
}

export class DrawingBoardToolShape extends DrawingBoardTool {
  selected(drawingBoardInstance) {
    if (drawingBoardInstance.containClass("cursor-crosshair")) return;
    drawingBoardInstance.resetClass().addClass("cursor-crosshair");
  }
}
