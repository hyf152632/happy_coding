import { Canvas2D } from "./canvas2d/Canvas2D.js";

let canvas = document.getElementById("canvas") as HTMLCanvasElement;

if (canvas === null) {
  throw new Error("Failed to get canvas element");
}
let canvas2d = new Canvas2D(canvas);
canvas2d.drawText("Hello World");
