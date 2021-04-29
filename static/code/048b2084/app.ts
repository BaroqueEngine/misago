import * as p5 from "p5";

new p5((p: p5) => {
  let image: p5.Image;

  p.preload = () => {
    image = p.loadImage("./0.jpg");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    image.loadPixels();
  };

  p.draw = () => {
    for (let i = 0; i < 20; i++) {
      const x = p.floor(p.random(image.width));
      const y = p.floor(p.random(image.height));
      const color = getPixel(x, y);
      p.fill(color);
      p.circle(x, y, 10);
    }
  };

  function getPixel(x: number, y: number): number[] {
    const i = (y * image.width + x) * 4;
    return [image.pixels[i], image.pixels[i + 1], image.pixels[i + 2], image.pixels[i + 3]];
  }
});
