export class CanvasInputEvent {
  altKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;

  type: string;
  constructor(
    altKey: boolean,
    ctrlKey: boolean,
    shiftKey: boolean,
    type: string
  ) {
    this.altKey = altKey;
    this.ctrlKey = ctrlKey;
    this.shiftKey = shiftKey;
    this.type = type;
  }
}
