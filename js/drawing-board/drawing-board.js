import { Canvas } from "../share/module.canvas.js";
import { ShapeLayer } from "./layer/layer-shape.js";
import { RenderingLayer } from "./layer/layer-rendering.js";
import { DrawingBoardToolHand } from "./tool/module.tool-hand.js";
import { DrawingBoardToolSelect } from "./tool/module.tool-select.js";
import { DrawingBoardToolShapeRect } from "./tool/module.tool-shape-rect.js";
import { DrawingBoardToolShapeCircle } from "./tool/module.tool-shape-cirlce.js";

export class DrawingBoardClone {
  #layers = new Map([
    ["shape-layer", new ShapeLayer()],
    ["rendering-layer", new RenderingLayer()],
  ]);
  /*
    layer 선택
    툴팁은 DrawingBoard의 공통 컴포넌트고 선택에 따라 CanvasLayer가 분리됨
    즉 Selected 했을때 화면에 특정 Layer가 나와야하는 상황이라는 뜻   
    그걸 분간하는건 Selected에 인스턴스 객체를 넘겨서 특정 레이어가 선택되게 해야됌      
    이벤트가 화면에 다른 Element 와 겹쳤을때는 작동하면 안되니 drawing-board에 이벤트를 고정을 주면 겹쳤을때 대응을 간단하게 할 수 없음
    - drawing-board 에 Event를 고정으로 줬을때는 장점이 Layer별 이벤트를 선언하지 않아도 된다는점
      단점은 component에 mouseenter 했을때 이벤트 동작이 멈춰야함 
      
      mouseenter 가 최소 3개이니 3x2 

      layer 별로 이벤트를 줬을 경우에는 처음에 넣으니깐 this 로 관리하는 함수 하나 선언하면 selected 했을때 다 꺼버리면 작동할거임
      mouseenter 일때는 거의 멈추는건 일일이 추가해야될 노릇이니 후자가 낫겠군
      
      DrawingBoard에 이벤트를 주지 않고 Canvas에 따로 이벤트를 주는 방향으로 관리를 선언 

      DrawingBoardElement 구조를 만들어야는데 이건또 객체지향으로 어떻게 할지 검토해야할 부분
      
      mount 안에 drawing-board 를 넣어야하니 
        const $drawingBoard = document.createElement('div')
        $drawingBoard.className = 'drawing-board'

        this.shapeLayer.mount($drawingBoard); 
          this.mount($canvas)
        this.renderigLayer.mount($drawingBoard);
          this.mount($canvas)
  */
  mount($parentElement) {
    const $drawingBoard = createElement("div", {
      className: "drawing-board",
    });
    this.#layers.forEach((layerInstance) => layerInstance.mount($drawingBoard));
    $parentElement.append($drawingBoard);
  }
}

new DrawingBoardClone().mount(document.getElementById("app"));

/* 현재는 싱글톤인데 나중에 싱클톤 버리고 여러 개 만들 수 있게끔 만들어야겠음 */
export class DrawingBoard extends Canvas {
  static #modeTypes = new Map([
    ["1", new DrawingBoardToolHand()],
    ["2", new DrawingBoardToolSelect()],
    ["3", new DrawingBoardToolShapeRect()],
    ["4", new DrawingBoardToolShapeCircle()],
  ]);
  #modeType = DrawingBoard.#modeTypes.get("1");

  constructor() {
    super();
    this.setCanvasRect(window.innerWidth, window.innerHeight);
    this.#handlerManagment();
    this.#modeType.selected(this);
    this.dummyShapeRendering();
  }

  dummyShapeRendering() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.beginPath()
      .rect(-100 + this.x, -100 + this.y, 50, 50)
      .fillStyle("red")
      .fill();
    this.beginPath()
      .rect(100 + this.x, 100 + this.y, 50, 50)
      .fillStyle("blue")
      .fill();
    this.beginPath()
      .rect(500 + this.x, 1500 + this.y, 50, 50)
      .fillStyle("yellow")
      .fill();
  }

  // handlers
  #handlerManagment() {
    this.event("mousedown", this.#mousedownHandler)
      .event("mousemove", this.#mousemoveHandler)
      .event("mouseup", this.#mouseupHandler);
    document.addEventListener("keydown", this.#documentKeydownHandler);
    window.addEventListener("resize", this.#windowResizeHandler);
  }
  #documentKeydownHandler = (event) => {
    if (!DrawingBoard.#modeTypes.has(event.key)) return;
    if (this.#modeType === DrawingBoard.#modeTypes.get(event.key)) return;
    if (this.#modeType.working) return;

    this.#modeType = DrawingBoard.#modeTypes.get(event.key);
    this.#modeType.selected(this);
  };
  #windowResizeHandler = () => {
    this.setCanvasRect(window.innerWidth, window.innerHeight);
    this.dummyShapeRendering();
  };
  #mousedownHandler = (event) => {
    this.#modeType.mousedownHandler && this.#modeType.mousedownHandler(event, this);
  };
  #mousemoveHandler = (event) => {
    this.#modeType.mousemoveHandler && this.#modeType.mousemoveHandler(event, this);
  };
  #mouseupHandler = (event) => {
    this.#modeType.mouseupHandler && this.#modeType.mouseupHandler(event, this);
  };
}
