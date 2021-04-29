import * as p5 from "p5";

new p5((p: p5) => {
  let image: p5.Image;
  const threshold = 100;
  const br = 205;
  const bg = 78;
  const bb = 129;

  p.preload = () => {
    image = p.loadImage("./0.jpg");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    image.loadPixels();

    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        const color = getPixel(x, y);
        const r = p.red(color);
        const g = p.green(color);
        const b = p.blue(color);
        const cr = br - r;
        const cg = bg - g;
        const cb = bb - b;
        const v = p.sqrt(cr * cr + cg * cg + cb * cb);
        if (threshold < v) {
          setPixel(x, y, [0, 0, 255]);
        }
      }
    }

    image.updatePixels();
    p.image(image, 0, 0);
  };

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
