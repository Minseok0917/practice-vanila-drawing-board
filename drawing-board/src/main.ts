import "@scss/all.scss";
import { Canvas } from "@share/canvas";

const $app = document.querySelector<HTMLDivElement>("#app")!;
const $canvas: HTMLCanvasElement = document.createElement("canvas");
const context: CanvasRenderingContext2D = $canvas.getContext("2d")!;

$app.innerHTML = `
  <div class="another w-full h-full">
    <div class="canvas-container"> </div>
  </div>
`;

// const a = Canvas.install($canvas).updateWidth(window.innerWidth).updateHeight(window.innerHeight);
