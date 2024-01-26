import type { ITool } from "../interface";
import { AnotherStore } from "@/another/store";
import { CURSOR } from "@/another/store/constant";

export class ToolHand implements ITool {
  public selected() {
    const { anotherStore } = AnotherStore.install();
    anotherStore.changeCanvasCursor(CURSOR.DEFAULT);
  }
  public mousedown(event: MouseEvent) {}
  public mousemove(event: MouseEvent) {}
  public mouseup(event: MouseEvent) {}
}
