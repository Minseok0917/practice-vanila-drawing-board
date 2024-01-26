import { ITool } from "../interface";
import { TOOLS } from "../constant";
import { ToolHand, ToolSelect, ToolShapeRect, ToolShapeEllipse } from "../classes";

export const TOOL_ACTIONS: Readonly<Record<TOOLS, ITool>> = {
  [TOOLS.HAND]: new ToolHand(),
  [TOOLS.SELECT]: new ToolSelect(),
  [TOOLS.SHAPE_RECT]: new ToolShapeRect(),
  [TOOLS.SHAPE_ELLIPSE]: new ToolShapeEllipse(),
};
