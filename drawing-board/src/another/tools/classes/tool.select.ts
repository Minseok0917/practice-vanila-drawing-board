import { ITool } from "../interface";
import { AnotherStore } from "@/another/store";
import { CURSOR } from "@/another/store/constant";

export class ToolSelect implements ITool {
  public selected() {
    const { anotherStore } = AnotherStore.install();
    anotherStore.changeCanvasCursor(CURSOR.GRAB);
  }
  public mousedown(event: MouseEvent) {}
  public mousemove(event: MouseEvent) {}
  public mouseup(event: MouseEvent) {}
}
