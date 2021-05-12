import { draw, init, update } from "./boid.js";
new p5((p) => {
  let group;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    group = [];
    for (let i = 0; i < 150; i++) {
      group.push(init(p));
    }
  };
  p.draw = () => {
    p.background("#02121e");
    group.forEach((boid) => {
      update(p, boid, group);
    });
    group.forEach((boid) => {
      draw(p, boid);
    });
  };
});
