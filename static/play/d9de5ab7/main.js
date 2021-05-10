import { init, run, update, draw } from "./vehicle.js";
new p5((p) => {
  let vehicle;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    const position = p.createVector(100, 100);
    const velocity = p.createVector();
    const maxSpeed = 8;
    const maxForce = 0.1;
    vehicle = init(p, position, velocity, maxSpeed, maxForce);
  };
  p.draw = () => {
    p.background("#02121e");
    run(vehicle);
    update(p, vehicle);
    draw(p, vehicle, "#aaa");
  };
});
