import * as p5 from "p5";

new p5((p: p5) => {
  let image: p5.Image;
  const range = 10;

  p.preload = () => {
    image = p.loadImage("./0.jpg");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    image.loadPixels();

    for (let y = 0; y < image.height; y += range) {
      for (let x = 0; x < image.width; x += range) {
        let v = 0;
        let count = 0;
        for (let yy = 0; yy < range; yy++) {
          for (let xx = 0; xx < range; xx++) {
            const ty = y + yy;
            const tx = x + xx;
            if (ty < image.height && tx < image.width) {
              const color = getPixel(tx, ty);
              const r = p.red(color);
              const g = p.green(color);
              const b = p.blue(color);
              const gray = 0.299 * r + 0.587 * g + 0.114 * b;
              v += gray;
              count++;
            }
          }
        }

        v /= count;
        const d = p.map(v, 0, 255, 0, range);
        p.circle(x + range / 2, y + range / 2, d);
      }
    }
  };

  function getPixel(x: number, y: number): number[] {
    const i = (y * image.width + x) * 4;
    return [image.pixels[i], image.pixels[i + 1], image.pixels[i + 2], image.pixels[i + 3]];
  }
});
