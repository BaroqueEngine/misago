import * as p5 from "p5";
import { Vehicle, init, update, draw, seek } from "./vehicle";

new p5((p: p5) => {
  let vehicle: Vehicle;
  let target: p5.Vector;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    const position = p.createVector(100, 0);
    const velocity = p.createVector();
    const maxSpeed = 8;
    const maxForce = 0.1;
    vehicle = init(p, position, velocity, maxSpeed, maxForce);

    target = p.createVector(p.width / 2, p.height / 2);
  };

  p.draw = () => {
    p.background("#02121e");

    target.x += 2;
    target.x %= p.windowWidth;

    p.push();
    p.noFill();
    p.stroke("#ff9900");
    p.circle(target.x, target.y, 20);
    p.pop();

    seek(vehicle, target);
    update(p, vehicle);
    draw(p, vehicle, "#aaa");
  };
});
