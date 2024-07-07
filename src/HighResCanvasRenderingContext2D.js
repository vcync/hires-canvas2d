/**
 * @implements Partial<CanvasRenderingContext2D>
 */
export class HighResCanvasRenderingContext2D {
  /**
   * @param {CanvasRenderingContext2D} context  The context to shim.
   * @param {number} pixelRatio                 The pixel ratio to scale by. This can be set to window.devicePixelRatio in most cases
   */
  constructor(context, pixelRatio) {
    if (
      context.constructor.name !== "CanvasRenderingContext2D" &&
      context.constructor.name !== "OffscreenCanvasRenderingContext2D"
    ) {
      throw new Error("A 2D rendering context is required");
    }

    /**
     * @type {CanvasRenderingContext2D}
     * @private
     */
    this.c = context;

    /**
     * @type {number}
     * @public
     */
    this.dpr = pixelRatio;

    for (let key in context) {
      if (typeof context[key] !== "function") {
        Object.defineProperty(this, key, {
          get() {
            return context[key];
          },

          set(x) {
            context[key] = x;
          },
        });
      } else if (!this[key]) {
        this[key] = (...args) => context[key](...args);
      }
    }
  }

  arc(x, y, radius, startAngle, endAngle, counterClockwise) {
    const { c, dpr } = this;
    c.arc(
      ...[x, y, radius].map((x) => x * dpr),
      startAngle,
      endAngle,
      counterClockwise,
    );
  }

  arcTo(...args) {
    const { c, dpr } = this;
    c.arcTo(...args.map((x) => x * dpr));
  }

  bezierCurveTo(...args) {
    const { c, dpr } = this;
    c.bezierCurveTo(...args.map((x) => x * dpr));
  }

  clearRect(...args) {
    const { c, dpr } = this;
    c.clearRect(...args.map((x) => x * dpr));
  }

  createLinearGradient(...args) {
    const { c, dpr } = this;
    return c.createLinearGradient(...args.map((x) => x * dpr));
  }

  createRadialGradient(...args) {
    const { c, dpr } = this;
    return c.createRadialGradient(...args.map((x) => x * dpr));
  }

  drawImage(image, ...args) {
    const { c, dpr } = this;
    c.drawImage(image, ...args.map((x) => x * dpr));
  }

  ellipse(
    x,
    y,
    radiusX,
    radiusY,
    rotation,
    startAngle,
    endAngle,
    counterclockwise,
  ) {
    const { c, dpr } = this;
    c.ellipse(
      x * dpr,
      y * dpr,
      radiusX * dpr,
      radiusY * dpr,
      rotation,
      startAngle,
      endAngle,
      counterclockwise,
    );
  }

  fillRect(...args) {
    const { c, dpr } = this;
    c.fillRect(...args.map((x) => x * dpr));
  }

  fillText(text, ...args) {
    const { c, dpr } = this;
    c.fillText(text, ...args.map((x) => x * dpr));
  }

  getImageData(...args) {
    const { c, dpr } = this;
    return c.getImageData(
      args[0] * dpr,
      args[1] * dpr,
      args[2] * dpr,
      args[3] * dpr,
      args[4],
    );
  }

  isPointInPath(...args) {
    const { c, dpr } = this;

    if (args[0]?.constructor?.name === Path2D.name) {
      args[1] = args[1] * dpr;
      args[2] = args[2] * dpr;
    } else {
      args[0] = args[0] * dpr;
      args[1] = args[1] * dpr;
    }

    return c.isPointInPath(...args);
  }

  isPointInStroke(...args) {
    if (args[0]?.constructor?.name === Path2D.name) {
      args[1] = args[1] * dpr;
      args[2] = args[2] * dpr;
    } else {
      args[0] = args[0] * dpr;
      args[1] = args[1] * dpr;
    }

    return c.isPointInStroke(...args);
  }

  lineTo(...args) {
    const { c, dpr } = this;
    c.lineTo(...args.map((x) => x * dpr));
  }

  moveTo(...args) {
    const { c, dpr } = this;
    c.moveTo(...args.map((x) => x * dpr));
  }

  putImageData(imageData, ...args) {
    const { c, dpr } = this;
    c.putImageData(imageData, ...args.map((x) => x * dpr));
  }

  quadraticCurveTo(...args) {
    const { c, dpr } = this;
    c.quadraticCurveTo(...args.map((x) => x * dpr));
  }

  rect(...args) {
    const { c, dpr } = this;
    c.rect(...args.map((x) => x * dpr));
  }

  roundRect(...args) {
    const { c, dpr } = this;
    c.roundRect(...args.map((x) => x * dpr));
  }

  strokeRect(...args) {
    const { c, dpr } = this;
    c.strokeRect(...args.map((x) => x * dpr));
  }

  strokeText(text, ...args) {
    const { c, dpr } = this;
    c.strokeText(text, ...args.map((x) => x * dpr));
  }

  translate(...args) {
    const { c, dpr } = this;
    c.translate(...args.map((x) => x * dpr));
  }
}
