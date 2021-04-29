import * as p5 from "p5";

class Xorshift {
  protected readonly MAX = 0xffffffff;
  protected s: number;

  constructor(seed?: number) {
    if (seed === undefined) {
      this.s = Math.floor(Math.random() * this.MAX) + 1;
    } else {
      this.setSeed(seed);
    }
  }

  public setSeed(seed: number): void {
    seed = Math.floor(seed);
    if (!(0 <= seed && seed < this.MAX)) {
      throw new Error(`シード値の範囲は0以上${this.MAX}未満の値でなければいけません。`);
    }
    this.s = seed + 1;
  }

  public getValue(): number {
    this.next();

    if (this.s === this.MAX) {
      this.next();
    }

    return this.s;
  }

  protected next(): void {
    this.s = this.s ^ (this.s << 13);
    this.s = this.s ^ (this.s >>> 17);
    this.s = this.s ^ (this.s << 5);
    this.s = this.s >>> 0;
  }
}

type Point = {
  x: number;
  y: number;
};

new p5((p: p5) => {
  const num = 300;
  const iterations = 5000;
  let image: p5.Image;
  let xorShift: Xorshift;
  let x: number;
  let y: number;
  let index: number;

  p.preload = () => {
    image = p.loadImage("./0.jpg");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    xorShift = new Xorshift();
    x = 0;
    y = 0;
    index = 0;
  };

  p.draw = () => {
    image.loadPixels();

    for (let i = 0; i < iterations; i++) {
      const point = getBestPoint(x, y);
      const a = getPixel(x, y);
      const b = getPixel(point.x, point.y);
      setPixel(x, y, b);
      setPixel(point.x, point.y, a);

      x++;
      if (x >= image.width) {
        x = 0;
        y++;

        if (y >= image.height) {
          p.draw = null;
          break;
        }
      }
      index++;
    }

    image.updatePixels();
    p.image(image, 0, 0);
  };

  function onBoard(x: number, y: number): boolean {
    return 0 <= x && x < image.width && 0 <= y && y < image.height;
  }

  function getBestPoint(x: number, y: number): Point {
    let minScore = Number.MAX_SAFE_INTEGER;
    let bestPoint: Point = { x: 0, y: 0 };

    const dirGroup: Point[] = [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -1 },
    ];

    for (let i = 0; i < num; i++) {
      let score = 0;
      let count = 0;
      const point = getRandomPoint();
      const p = getPixel(point.x, point.y);

      dirGroup.forEach((dir) => {
        const tx = x + dir.x;
        const ty = y + dir.y;

        if (onBoard(tx, ty)) {
          const np = getPixel(tx, ty);
          score += Math.abs(np[0] - p[0]);
          score += Math.abs(np[1] - p[1]);
          score += Math.abs(np[2] - p[2]);
          count++;
        }
      });

      score /= count;
      if (score < minScore) {
        minScore = score;
        bestPoint = point;
      }
    }

    return bestPoint;
  }

  function getRandomPoint(): Point {
    const i = index + (xorShift.getValue() % (image.width * image.height - index));
    const x = i % image.width;
    const y = Math.floor(i / image.width);

    return { x, y };
  }

  function getPixel(x: number, y: number): number[] {
    const i = (y * image.width + x) * 4;
    return [image.pixels[i], image.pixels[i + 1], image.pixels[i + 2], image.pixels[i + 3]];
  }

  function setPixel(x: number, y: number, color: number[]): void {
    const i = (y * image.width + x) * 4;
    image.pixels[i + 0] = color[0];
    image.pixels[i + 1] = color[1];
    image.pixels[i + 2] = color[2];
  }
});
