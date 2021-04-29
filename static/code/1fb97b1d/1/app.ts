import * as p5 from "p5";

new p5((p: p5) => {
  let image: p5.Image;

  p.preload = () => {
    image = p.loadImage("./0.jpg");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    image.loadPixels();

    const error: number[][] = [];
    for (let y = 0; y < image.height; y++) {
      error[y] = [];
      for (let x = 0; x < image.width; x++) {
        error[y][x] = 0;
      }
    }

    const threshold = 127;
    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        const color = getPixel(x, y);
        const r = p.red(color);
        const g = p.green(color);
        const b = p.blue(color);

        let gray = 0.299 * r + 0.587 * g + 0.114 * b;
        gray += error[y][x];

        let value = 0;
        if (threshold <= gray) {
          value = 255;
        }

        const e = (gray - value) / 16;

        if (onBoard(x + 1, y)) {
          error[y][x + 1] += e * 7;
        }
        if (onBoard(x - 1, y + 1)) {
          error[y + 1][x - 1] += e * 3;
        }
        if (onBoard(x, y + 1)) {
          error[y + 1][x] += e * 5;
        }
        if (onBoard(x + 1, y + 1)) {
          error[y + 1][x + 1] += e;
        }

        setPixel(x, y, [value, value, value]);
      }
    }

    image.updatePixels();
    p.image(image, 0, 0);
  };

  function onBoard(x: number, y: number): boolean {
    return 0 <= x && x < image.width && 0 <= y && y < image.height;
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
