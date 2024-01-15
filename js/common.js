import { ElementFactory } from "./@share/elementFactory.js";
import { Canvas } from "./@share/canvas.js";
import { Context } from "./@share/context.js";
import { CONTEXT_SHAPE_ACTIONS, ContextPathRect, ContextPathEllipse } from "./@share/contextPath.js";

class Component {
  constructor(elementName, attrs = {}) {
    this.$element = ElementFactory.createElement(elementName, attrs);
  }
  append($element) {
    this.$element.append($element);
    return this;
  }
}

class Excalidraw {
  constructor() {
    this.canvas = new Canvas().setCanvasSize(window.innerWidth, window.innerHeight);
    this.context = new Context(this.canvas.$canvas);
    this.shapes = [
      new ContextPathRect({ x: 0, y: 0, width: 100, height: 100 }),
      new ContextPathEllipse({ x: 100, y: 100, rx: 20, ry: 10 }),
    ];

    this.rendering();
  }

  rendering() {
    this.shapes.forEach((contextPath) => this.context.fill(contextPath.path));
  }

  mount($app) {
    const root = document.createElement("div");
    root.innerHTML = `
      <div class="root">
        <div class="container"><canvas class="rendering" /></div>
        <div class="container"><canvas class="working /></div>
        <div class="container"></div>
      </div>
    `;
    $app.append(this.canvas.$canvas);
  }
}

const $app = document.getElementById("app");
new Excalidraw().mount($app);
