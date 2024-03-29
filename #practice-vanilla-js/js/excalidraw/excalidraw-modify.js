const createElement = (element, attrs = {}) => Object.assign(document.createElement(element), attrs);

const $app = document.getElementById("app");
const $excalidraw = createElement("div", { className: "excalidraw" });
const $excalidrawContainer = createElement("div", { className: "excalidraw-container excalidraw-container--selected" });
const $excalidrawCanvas = createElement("canvas");
const context = $excalidrawCanvas.getContext("2d");

$excalidrawCanvas.width = window.innerWidth;
$excalidrawCanvas.height = window.innerHeight;

$excalidraw.append($excalidrawContainer);
$excalidrawContainer.append($excalidrawCanvas);
$app.append($excalidraw);

function createRect(x, y, width, height) {
  const paths = {
    rect: new Path2D(),
    arcRotate: new Path2D(),
    rectBlueLine: new Path2D(),
    rectEllipseLT: new Path2D(),
    rectEliipseMT: new Path2D(),
    rectEliipseRT: new Path2D(),
    rectEliipseRM: new Path2D(),
    rectEliipseRB: new Path2D(),
    rectEliipseMB: new Path2D(),
    rectEliipseLB: new Path2D(),
    rectEliipseLM: new Path2D(),
  };

  const gap = 8;
  const roundRectWH = 8;

  const lineX = x - gap - roundRectWH / 2;
  const lineWidth = width + gap * 2;
  const lineY = y - gap - roundRectWH / 2;
  const lineHeight = height + gap * 2;

  const startX = lineX;
  const middleX = lineX + lineWidth / 2;
  const endX = lineX + lineWidth;

  const startY = lineY;
  const middleY = lineY + lineHeight / 2;
  const endY = lineY + lineHeight;

  paths.rect.rect(x, y, width, height);
  paths.rectBlueLine.rect(x - gap, y - gap, width + gap * 2, height + gap * 2);
  paths.rectEllipseLT.roundRect(startX, startY, roundRectWH, roundRectWH, [roundRectWH / 4]);
  paths.rectEliipseMT.roundRect(middleX, startY, roundRectWH, roundRectWH, [roundRectWH / 4]);
  paths.rectEliipseRT.roundRect(endX, startY, roundRectWH, roundRectWH, [roundRectWH / 4]);
  paths.rectEliipseRM.roundRect(endX, middleY, roundRectWH, roundRectWH, [roundRectWH / 4]);
  paths.rectEliipseRB.roundRect(endX, endY, roundRectWH, roundRectWH, [roundRectWH / 4]);
  paths.rectEliipseMB.roundRect(middleX, endY, roundRectWH, roundRectWH, [roundRectWH / 4]);
  paths.rectEliipseLB.roundRect(startX, endY, roundRectWH, roundRectWH, [roundRectWH / 4]);
  paths.rectEliipseLM.roundRect(startX, middleY, roundRectWH, roundRectWH, [roundRectWH / 4]);

  paths.arcRotate.arc(middleX + gap / 2, startY - gap * 1.5, gap / 2, 0, Math.PI * 2);

  return paths;
}
function modifyRect(x, y, width, height) {}

const rectPaths = createRect(200, 200, 200, 200);
const selectedRect = rectPaths;

/* function draw() {
  // left rectangles, rotate from canvas origin
  context.save();
  // blue rect
  context.fillStyle = "#0095DD";
  context.fillRect(30, 30, 100, 100);
  context.rotate((Math.PI / 180) * 25);
  // grey rect
  context.fillStyle = "#4D4E53";
  context.fillRect(30, 30, 100, 100);
  context.restore();

  // right rectangles, rotate from rectangle center
  // draw blue rect
  context.fillStyle = "#0095DD";
  context.fillRect(150, 30, 100, 100);

  context.translate(200, 80); // translate to rectangle center
  // x = x + 0.5 * width
  // y = y + 0.5 * height
  context.rotate((Math.PI / 180) * 135); // rotate
  context.translate(-200, -80); // translate back

  // draw grey rect
  context.fillStyle = "#4D4E53";
  context.fillRect(150, 30, 100, 100);
}

draw(); */
context.lineWidth = 0.5;
context.strokeStyle = "#000";
context.fillStyle = "#fff";
context.stroke(rectPaths.arcRotate);
context.fill(rectPaths.arcRotate);

// context.moveTo(200, 200);
// context.rotate((10 * Math.PI) / 180);

context.lineWidth = 1;
context.strokeStyle = "#3f51b5";
context.fillStyle = "#fff";

context.stroke(rectPaths.rectBlueLine);
context.fill(rectPaths.rectBlueLine);

context.lineWidth = 0.5;

context.stroke(rectPaths.rectEllipseLT);
context.stroke(rectPaths.rectEliipseMT);
context.stroke(rectPaths.rectEliipseRT);
context.stroke(rectPaths.rectEliipseRM);
context.stroke(rectPaths.rectEliipseRB);
context.stroke(rectPaths.rectEliipseMB);
context.stroke(rectPaths.rectEliipseLB);
context.stroke(rectPaths.rectEliipseLM);

context.fill(rectPaths.rectEllipseLT);
context.fill(rectPaths.rectEliipseMT);
context.fill(rectPaths.rectEliipseRT);
context.fill(rectPaths.rectEliipseRM);
context.fill(rectPaths.rectEliipseRB);
context.fill(rectPaths.rectEliipseMB);
context.fill(rectPaths.rectEliipseLB);
context.fill(rectPaths.rectEliipseLM);

context.lineWidth = 1;
context.strokeStyle = "#000";
context.fillStyle = "#fff";
context.stroke(rectPaths.rect);
context.fill(rectPaths.rect);

$excalidrawCanvas.addEventListener("mousemove", function (event) {
  const { offsetX: x, offsetY: y } = event;

  if (context.isPointInPath(selectedRect.rectEllipseLT, x, y)) {
    $excalidrawCanvas.style.cursor = "nw-resize";
  } else if (context.isPointInPath(selectedRect.rectEliipseMT, x, y)) {
    $excalidrawCanvas.style.cursor = "n-resize";
  } else if (context.isPointInPath(selectedRect.rectEliipseRT, x, y)) {
    $excalidrawCanvas.style.cursor = "sw-resize";
  } else if (context.isPointInPath(selectedRect.rectEliipseRM, x, y)) {
    $excalidrawCanvas.style.cursor = "e-resize";
  } else if (context.isPointInPath(selectedRect.rectEliipseRB, x, y)) {
    $excalidrawCanvas.style.cursor = "nw-resize";
  } else if (context.isPointInPath(selectedRect.rectEliipseMB, x, y)) {
    $excalidrawCanvas.style.cursor = "n-resize";
  } else if (context.isPointInPath(selectedRect.rectEliipseLB, x, y)) {
    $excalidrawCanvas.style.cursor = "sw-resize";
  } else if (context.isPointInPath(selectedRect.rectEliipseLM, x, y)) {
    $excalidrawCanvas.style.cursor = "e-resize";
  } else if (context.isPointInPath(selectedRect.rectBlueLine, x, y)) {
    $excalidrawCanvas.style.cursor = "all-scroll";
  } else if (context.isPointInPath(selectedRect.arcRotate, x, y)) {
    $excalidrawCanvas.style.cursor = "grab";
  } else {
    $excalidrawCanvas.style.cursor = "auto";
  }
});

class Rect {
  #x;
  #y;
  #width;
  #height;

  constructor({ x, y, width, height }) {
    this.#x = x;
    this.#y = y;
    this.#width = width;
    this.#height = height;
  }
}
