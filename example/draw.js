// Our draw code, shared between the main and worker thread

export const draw = (context, canvasSize, dpr) => {
  const { canvas } = context;
  const time = Date.now();

  context.clearRect(0, 0, canvasSize, canvasSize);
  context.globalCompositeOperation = "normal";
  context.fillStyle = "black";
  context.fillRect(0, 0, canvasSize, canvasSize);

  const pos = (Math.sin(time / 1200) + 1) / 2;
  context.globalCompositeOperation = "difference";
  context.fillStyle = "white";
  context.fillRect(75 + pos * 25, 75 + pos * 25, 100, 100);
  context.fillRect(125 - pos * 25, 125 - pos * 25, 100, 100);
  context.strokeStyle = "white";

  context.save();
  context.translate(canvasSize / 2, canvasSize / 2);
  context.rotate((Math.PI / 180) * (Math.sin(time / 300) * 8));
  context.translate(-canvasSize / 2, -canvasSize / 2);

  const size = (Math.sin(time / 800) + 1) / 2;
  // This is the only property HighResCanvas2D does not cover as there isn't
  // a way which doesn't tie us to the DOM to only affect the font size.
  context.font = `normal ${(32 + size * 32) * dpr}px sans-serif`;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.lineWidth = 0.5 + 1 * size;

  context.strokeText(
    `${canvas.width} × ${canvas.height}`,
    canvasSize / 2,
    40 + ((Math.sin(time / 1000) + 1) / 2) * 220,
  );

  context.restore();
};
