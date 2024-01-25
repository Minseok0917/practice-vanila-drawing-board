import { setupAnother } from "@/app";
import "@scss/all.scss";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="another">
    <div class="canvas-container canvas-container-render"><canvas /></div>
    <div class="canvas-container canvas-container-worker"><canvas /></div>
  </div>
`;

setupAnother(document.querySelector<HTMLDivElement>("#app .another")!);
