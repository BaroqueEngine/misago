import * as Circ from "./circle.js";
import { init, update, draw, wander, avoid } from "./vehicle.js";
new p5((p) => {
  let vehicle;
  let circles;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    const x = p.random(p.width);
    const y = p.random(p.height);
    const position = p.createVector(x, y);
    const velocity = p.createVector();
    const maxSpeed = 4;
    const maxForce = 0.4;
    vehicle = init(p, position, velocity, maxSpeed, maxForce);
    circles = [];
    for (let i = 0; i < 25; i++) {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const position = p.createVector(x, y);
      const radius = 30 + p.random() * 100;
      const circle = Circ.init(position, radius);
      circles.push(circle);
    }
  };
  p.draw = () => {
    p.background("#02121e");
    wander(p, vehicle);
    avoid(p, vehicle, circles);
    update(p, vehicle);
    draw(p, vehicle, "#cd3830");
    circles.forEach((circle) => {
      Circ.draw(p, circle);
    });
  };
});
