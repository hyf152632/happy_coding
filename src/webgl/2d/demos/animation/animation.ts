export default class Application {
  private _animationTimer: null | number = null;
  private _startTime: number = 0;
  private _lastTime: number = 0;
  private _callback = (startTime: number, lastTime: number): void => {};
  constructor(callback: () => void, isStart = true) {
    this._callback = callback;
    if (isStart) {
      this.start();
    }
  }
  private _animate(time: number): void {
    if (!this._startTime) {
      this._startTime = time;
    }
    if (!this._lastTime) {
      this._lastTime = time;
    }
    this._callback(this._startTime, this._lastTime);
    this._animationTimer = window.requestAnimationFrame(this._animate);
  }
  public start(): void {
    this._animationTimer = window.requestAnimationFrame(this._animate);
  }
  public stop(): void {
    if (this._animationTimer) {
      window.cancelAnimationFrame(this._animationTimer);
    }
  }
}
