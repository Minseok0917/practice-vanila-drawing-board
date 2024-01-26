import type { ITool } from "../interface";
import { ToolShape } from "./shape/tool.shape";

export class ToolShapeEllipse extends ToolShape implements ITool {
  public mousedown(event: MouseEvent) {
    console.log("ToolShap");
  }
  public mousemove(event: MouseEvent) {}
  public mouseup(event: MouseEvent) {}
}
