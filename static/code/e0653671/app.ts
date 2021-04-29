import * as p5 from "p5";

new p5((p: p5) => {
  let image: p5.Image;
  const radius = 200;
  const maxRad = Math.PI;

  p.preload = () => {
    image = p.loadImage("./0.jpg");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    image.loadPixels();

    const dest = p.createImage(image.width, image.height);
    dest.copy(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
    dest.loadPixels();

    const cx = image.width / 2;
    const cy = image.height / 2;

    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        const dist = p.dist(cx, cy, x, y);
        const rad = Math.max(0, p.map(dist, 0, radius, maxRad, 0));

        if (rad > 0) {
          const tx = cx + Math.round(Math.cos(rad) * (x - cx) - Math.sin(rad) * (y - cy));
          const ty = cy + Math.round(Math.sin(rad) * (x - cx) + Math.cos(rad) * (y - cy));
          const color = getPixel(image, tx, ty);
          setPixel(dest, x, y, color);
        }
      }
    }

    dest.updatePixels();
    p.image(dest, 0, 0);
  };

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
