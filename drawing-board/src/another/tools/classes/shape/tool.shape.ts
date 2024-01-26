import { AnotherStore } from "@/another/store";
import { CURSOR } from "@/another/store/constant";

export class ToolShape {
  public selected() {
    const { anotherStore } = AnotherStore.install();
    anotherStore.changeCanvasCursor(CURSOR.CROSSHAIR);
  }
}
