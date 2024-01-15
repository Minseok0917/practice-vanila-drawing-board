import { ElementFactory } from "./@share/elementFactory.js";
import { Context } from "./@share/context.js";
import { CONTEXT_SHAPE_ACTIONS, ContextPathRect, ContextPathEllipse } from "./@share/contextPath.js";

const $app = document.getElementById("app");
const $canvas = ElementFactory.createElement("canvas");
const context = new Context($canvas);

$canvas.width = window.innerWidth;
$canvas.height = window.innerHeight;
$app.append($canvas);

context.beginPath();

const shapes = [
  { name: "RECT", x: 0, y: 0, width: 100, height: 100 },
  { name: "ELLIPSE", x: 200, y: 200, rx: 30, ry: 30 },
].map((shape) => {
  const shapeAction = CONTEXT_SHAPE_ACTIONS.get(shape.name);
  return new shapeAction(shape);
});

shapes.forEach((contextPath) => context.fill(contextPath.path));

context.fill(new ContextPathRect({ x: 200, y: 0, width: 30, height: 50 }).path);
context.fill(new ContextPathEllipse({ x: 400, y: 300, rx: 30, ry: 30 }).path);

console.log(JSON.stringify(shapes));
