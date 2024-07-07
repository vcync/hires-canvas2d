// We also work in non-DOM environments :)
import { HighResCanvasRenderingContext2D } from "../src/HighResCanvasRenderingContext2D.js";
import { draw } from "./draw.js";

let canvas;
let context;

const canvasSize = 300;
let dpr = 2;

const resize = (x) => {
  dpr = x;
  context.dpr = dpr;
  canvas.width = canvas.height = canvasSize * dpr;
};

self.addEventListener("message", ({ data: { type, payload } }) => {
  if (type === "canvas") {
    canvas = payload;

    context = new HighResCanvasRenderingContext2D(canvas.getContext("2d"), dpr);

    const loop = () => {
      requestAnimationFrame(loop);
      draw(context, canvasSize, dpr);
    };

    resize(dpr);

    requestAnimationFrame(loop);
  }

  if (type === "dpr") {
    resize(payload);
  }
});
