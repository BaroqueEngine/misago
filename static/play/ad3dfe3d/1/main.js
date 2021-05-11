import { init, update, draw, seek, flee } from "./vehicle.js";
new p5((p) => {
  let vehicles;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    vehicles = [];
    for (let i = 0; i < 100; i++) {
      const position = p.createVector(p.random(p.width), p.random(p.height));
      const velocity = p.createVector(p.random(p.width), p.random(p.height));
      const maxSpeed = 8;
      const maxForce = 0.4;
      const vehicle = init(p, position, velocity, maxSpeed, maxForce);
      vehicles.push(vehicle);
    }
  };
  p.draw = () => {
    p.background("#02121e");
    vehicles.forEach((vehicle, index) => {
      const prev = index === 0 ? vehicles.length - 1 : index - 1;
      const next = (index + 1) % vehicles.length;
      flee(vehicle, vehicles[prev].position);
      seek(vehicle, vehicles[next].position);
      update(p, vehicle);
      draw(p, vehicle, "#aaa");
    });
  };
});
