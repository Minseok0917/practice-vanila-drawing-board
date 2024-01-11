import { Canvas } from "../../share/module.canvas.js";

export class CanvasLayer extends Canvas {
  #drawingBoardInstance;
  #layerName;
  #$layerContainer;
  constructor(drawingBoardInstance) {
    super();
    this.#drawingBoardInstance = drawingBoardInstance;
    this.#handleManagements();
  }

  mount($parentElement) {
    // mount라인을 추상화해서 잘 작성해야할 듯, rendering은 1개의 layer에서만 있기에 따로 분류 대상임
    this.#$layerContainer = createElement("div", { className: `canvas-container ${this.#layerName}` });
    this.#$layerContainer.append(this.$canvas);
    this.resizeObserver(this.#$layerContainer, () => {
      this.rendering && this.rendering();
    });

    $parentElement.append(this.#$layerContainer);
  }

  // handlers
  #handleManagements() {
    this.event("mousedown", this.#mousedownHandler);
    this.event("mousemove", this.#mousemoveHandler);
    this.event("mouseup", this.#mouseupHandler);
  }

  #mousedownHandler = (event) => {
    const modeType = this.#drawingBoardInstance.modeType;
    modeType.mousedownHandler && modeType.mousedownHandler(event, this.#drawingBoardInstance);
  };
  #mousemoveHandler = (event) => {
    const modeType = this.#drawingBoardInstance.modeType;
    modeType.mousemoveHandler && modeType.mousemoveHandler(event, this.#drawingBoardInstance);
  };
  #mouseupHandler = (event) => {
    const modeType = this.#drawingBoardInstance.modeType;
    modeType.mouseupHandler && modeType.mouseupHandler(event, this.#drawingBoardInstance);
  };

  // getters
  get x() {
    return this.#drawingBoardInstance.x;
  }
  get y() {
    return this.#drawingBoardInstance.y;
  }

  // setters
  setLayerName(layerName) {
    this.#layerName = layerName;
    return this;
  }
}
