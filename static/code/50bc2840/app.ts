import * as p5 from "p5";

new p5((p: p5) => {
  const iterations = 20;
  let tx: number;
  let ty: number;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.stroke("#009ad6");

    tx = p.floor(p.windowWidth / 2);
    ty = p.floor(p.windowHeight / 2);
  };

  p.draw = () => {
    for (let i = 0; i < iterations; i++) {
      walk();
    }
  };

  function walk(): void {
    tx += p.random() < 0.5 ? -1 : 1;
    ty += p.random() < 0.5 ? -1 : 1;

    p.point(tx, ty);
  }
});