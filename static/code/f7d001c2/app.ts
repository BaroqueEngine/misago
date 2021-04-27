import * as p5 from "p5";

new p5((p: p5) => {
  let image: p5.Image;

  p.preload = () => {
    image = p.loadImage("./0.jpg");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    image.loadPixels();

    const fromMax = 256;
    const toMax = 4;

    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        const color = getPixel(x, y);
        const r = p.red(color);
        const g = p.green(color);
        const b = p.blue(color);
        const nr = posterize(r, fromMax, toMax);
        const ng = posterize(g, fromMax, toMax);
        const nb = posterize(b, fromMax, toMax);
        setPixel(x, y, [nr, ng, nb]);
      }
    }

    image.updatePixels();
    p.image(image, 0, 0);
  };

  function posterize(value: number, fromMax: number, toMax: number): number {
    const i = Math.floor((toMax / fromMax) * value);
    const v = Math.ceil(((fromMax - 1) / (toMax - 1)) * i);
    return v;
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