import { ITool } from "../interface";

export class ToolHand implements ITool {
  public selected() {}
  public mousedown(event: MouseEvent) {
    console.log("ToolHand");
  }
  public mousemove(event: MouseEvent) {}
  public mouseup(event: MouseEvent) {}
}
