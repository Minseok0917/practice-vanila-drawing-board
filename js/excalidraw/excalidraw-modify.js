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
    rectEllipseLT: new Path2D(),
    rectEliipseMT: new Path2D(),
    rectEliipseRT: new Path2D(),
    rectEliipseRM: new Path2D(),
    rectEliipseRB: new Path2D(),
    rectEliipseMB: new Path2D(),
    rectEliipseLB: new Path2D(),
    rectEliipseLM: new Path2D(),
  };

  const startX = x;
  const middleX = x + width / 2;
  const endX = x + width;

  const startY = y;
  const middleY = y + height / 2;
  const endY = y + height;

  paths.rect.rect(x, y, width, height);
  paths.rectEllipseLT.arc(startX, startY, 5, 0, Math.PI * 2);
  paths.rectEliipseMT.arc(middleX, startY, 5, 0, Math.PI * 2);
  paths.rectEliipseRT.arc(endX, startY, 5, 0, Math.PI * 2);
  paths.rectEliipseRM.arc(endX, middleY, 5, 0, Math.PI * 2);
  paths.rectEliipseRB.arc(endX, endY, 5, 0, Math.PI * 2);
  paths.rectEliipseMB.arc(middleX, endY, 5, 0, Math.PI * 2);
  paths.rectEliipseLB.arc(startX, endY, 5, 0, Math.PI * 2);
  paths.rectEliipseLM.arc(startX, middleY, 5, 0, Math.PI * 2);

  return paths;
}
const rectPaths = createRect(200, 200, 200, 200);
const selectedRect = rectPaths;

context.stroke(rectPaths.rect);
context.fill(rectPaths.rectEllipseLT);
context.fill(rectPaths.rectEliipseMT);
context.fill(rectPaths.rectEliipseRT);
context.fill(rectPaths.rectEliipseRM);
context.fill(rectPaths.rectEliipseRB);
context.fill(rectPaths.rectEliipseMB);
context.fill(rectPaths.rectEliipseLB);
context.fill(rectPaths.rectEliipseLM);

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
  } else if (context.isPointInPath(selectedRect.rect, x, y)) {
    $excalidrawCanvas.style.cursor = "all-scroll";
  } else {
    $excalidrawCanvas.style.cursor = "auto";
  }
});
