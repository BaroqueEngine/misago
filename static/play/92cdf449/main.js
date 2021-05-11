import { init, update, draw, wander } from "./vehicle.js";
new p5((p) => {
  let wander0;
  let wander1;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const position = p.createVector(x, y);
      const velocity = p.createVector();
      const maxSpeed = 4;
      const maxForce = 0.4;
      wander0 = init(p, position, velocity, maxSpeed, maxForce);
    }
    {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const position = p.createVector(x, y);
      const velocity = p.createVector();
      const maxSpeed = 4;
      const maxForce = 0.4;
      wander1 = init(p, position, velocity, maxSpeed, maxForce);
    }
  };
  p.draw = () => {
    p.background("#02121e");
    wander(p, wander0);
    update(p, wander0);
    wander(p, wander1);
    update(p, wander1);
    draw(p, wander0, "#cd3830");
    draw(p, wander1, "#cd3830");
  };
});
