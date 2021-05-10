import * as p5 from "p5";
import { Vehicle, init, run, update, draw } from "./vehicle";

new p5((p: p5) => {
  let vehicle: Vehicle;

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
