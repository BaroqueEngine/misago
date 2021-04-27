import * as p5 from "p5";

new p5((p: p5) => {
  let image: p5.Image;
  const range = 5;

  p.preload = () => {
    image = p.loadImage("./0.jpg");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    const dest = p.createImage(image.width, image.height);
    dest.copy(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
    dest.loadPixels();

    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        let tr = 0;
        let tg = 0;
        let tb = 0;
        let count = 0;
        for (let i = -range; i <= range; i++) {
          const ty = y + i;
          const tx = x + i;
          if (0 < ty && ty < image.height && 0 < tx && tx < image.width) {
            const color = getPixel(image, tx, ty);
            const r = p.red(color);
            const g = p.green(color);
            const b = p.blue(color);
            tr += r;
            tg += g;
            tb += b;
            count++;
          }
        }

        tr /= count;
        tg /= count;
        tb /= count;

        for (let yy = 0; yy < range; yy++) {
          for (let xx = 0; xx < range; xx++) {
            const ty = y + yy;
            const tx = x + xx;
            if (ty < image.height && tx < image.width) {
              setPixel(dest, tx, ty, [tr, tg, tb]);
            }
          }
        }
      }
    }

    dest.updatePixels();
    p.image(dest, 0, 0);
  };

  function getPixel(image: p5.Image, x: number, y: number) {
    const i = (y * image.width + x) * 4;
    return [image.pixels[i], image.pixels[i + 1], image.pixels[i + 2], image.pixels[i + 3]];
  }

  function setPixel(image: p5.Image, x: number, y: number, color: number[]) {
    const i = (y * image.width + x) * 4;
    image.pixels[i + 0] = color[0];
    image.pixels[i + 1] = color[1];
    image.pixels[i + 2] = color[2];
  }
});
