export class Context2D {
  private _context: CanvasRenderingContext2D;
  constructor($canvas: HTMLCanvasElement) {
    this._context = $canvas.getContext("2d")!;
  }

  get context() {
    return this._context;
  }
}
