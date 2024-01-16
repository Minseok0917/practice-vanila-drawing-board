import { CONTEXT_SHAPES } from "./context-path.constant.js";
import { ContextPathRect, ContextPathEllipse } from "./context-path.shapes.js";

export const CONTEXT_SHAPE_ACTIONS = new Map([
  [CONTEXT_SHAPES.RECT, ContextPathRect],
  [CONTEXT_SHAPES.ELLIPSE, ContextPathEllipse],
]);
