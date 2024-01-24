export class Canvas {
  private _$canvas: HTMLCanvasElement;

  private constructor($canvas?: HTMLCanvasElement) {
    this._$canvas = $canvas ?? document.createElement("canvas");
  }

  static install($canvas?: HTMLCanvasElement) {
    return new Canvas($canvas);
  }

  public updateResize(width: number, height: number) {
    this.updateWidth(width);
    this.updateHeight(height);
    return this;
  }

  public updateWidth(width: number) {
    this.$canvas.width = width;
    return this;
  }

  public updateHeight(height: number) {
    this.$canvas.height = height;
    return this;
  }

  public get $canvas() {
    return this._$canvas;
  }

  public get canvasWidth() {
    return this.$canvas.width;
  }

  public get canvasHeight() {
    return this.$canvas.height;
  }
}
