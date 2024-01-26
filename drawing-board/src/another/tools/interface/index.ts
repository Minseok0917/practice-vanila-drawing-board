export interface ITool {
  mousedown(event: MouseEvent): void;
  mousemove(event: MouseEvent): void;
  mouseup(event: MouseEvent): void;
  selected(): void;
}
