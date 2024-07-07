# Hi-Res Canvas 2D

> A wrapper around CanvasRenderingContext2D to handle HiDPI scaling

```JavaScript
import { HighResCanvasRenderingContext2D } from "@vcync/hires-canvas2d";

const canvas = document.querySelector("canvas");
const context = new HighResCanvasRenderingContext2D(canvas.getContext("2d"), window.devicePixelRatio);

function resize() {
  context.dpr = window.devicePixelRatio;
}

window.addEventListener("resize", resize);
```

It just works!\*

\*apart from fonts which still need some attention with a multiplication such as:

```JavaScript
context.font = `normal ${32 * dpr}px sans-serif`;
```
