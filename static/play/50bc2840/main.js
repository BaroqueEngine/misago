new p5((p) => {
  const iterations = 20;
  let tx;
  let ty;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent("canvas-container");
    p.stroke("#009ad6");
    tx = p.floor(p.windowWidth / 2);
    ty = p.floor(p.windowHeight / 2);
  };

  p.draw = () => {
    for (let i = 0; i < iterations; i++) {
      walk();
    }
  };

  function walk() {
    tx += p.random() < 0.5 ? -1 : 1;
    ty += p.random() < 0.5 ? -1 : 1;
    p.point(tx, ty);
  }
});