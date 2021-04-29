import * as p5 from "p5";

type ColorInfo = {
  gray: number;
  color: number[];
};

new p5((p: p5) => {
  let image: p5.Image;

  p.preload = () => {
    image = p.loadImage("./0.jpg");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.loadPixels();
    image = medianFilter();
    p.image(image, 0, 0);
  };

  function medianFilter(): p5.Image {
    const dest = p.createImage(image.width, image.height);
    dest.copy(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
    dest.loadPixels();

    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        const colorInfo: ColorInfo[] = [];
        for (let yy = y - 1; yy <= y + 1; yy++) {
          for (let xx = x - 1; xx <= x + 1; xx++) {
            if (onBoard(xx, yy)) {
              const color = getPixel(image, xx, yy);
              const r = p.red(color);
              const g = p.green(color);
              const b = p.blue(color);
              const gray = 0.299 * r + 0.587 * g + 0.114 * b;
              colorInfo.push({ gray, color });
            }
          }
        }

        colorInfo.sort(function (a: ColorInfo, b: ColorInfo): number {
          return a.gray - b.gray;
        });

        const i = p.floor(colorInfo.length / 2);
        const value = colorInfo[i].color;
        setPixel(dest, x, y, value);
      }
    }

    dest.updatePixels();
    return dest;
  }

  function onBoard(x: number, y: number): boolean {
    return 0 <= x && x < image.width && 0 <= y && y < image.height;
  }

  function getPixel(image: p5.Image, x: number, y: number): number[] {
    const i = (y * image.width + x) * 4;
    return [image.pixels[i], image.pixels[i + 1], image.pixels[i + 2], image.pixels[i + 3]];
  }

  function setPixel(image: p5.Image, x: number, y: number, color: number[]): void {
    const i = (y * image.width + x) * 4;
    image.pixels[i + 0] = color[0];
    image.pixels[i + 1] = color[1];
    image.pixels[i + 2] = color[2];
  }
});