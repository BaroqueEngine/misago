import { init, update, draw, arrive } from "./vehicle.js";
new p5((p) => {
  let vehicles;
  let target;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    vehicles = [];
    for (let i = 0; i < 100; i++) {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const position = p.createVector(x, y);
      const velocity = p.createVector();
      const maxSpeed = p.random() * 4 + 4;
      const maxForce = 0.4;
      const vehicle = init(p, position, velocity, maxSpeed, maxForce);
      vehicles.push(vehicle);
    }
    target = p.createVector(p.width / 2, p.height / 2);
  };
  p.draw = () => {
    p.background("#02121e");
    p.push();
    p.noFill();
    p.stroke("#ff9900");
    p.circle(target.x, target.y, 40);
    p.pop();
    vehicles.forEach((vehicle) => {
      arrive(vehicle, target);
      update(p, vehicle);
      draw(p, vehicle, "#aaa");
    });
  };
});
