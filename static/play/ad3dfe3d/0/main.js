import { init, update, draw, seek, flee } from "./vehicle.js";
new p5((p) => {
  let seeker;
  let fleer;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    {
      const position = p.createVector(100, 0);
      const velocity = p.createVector();
      const maxSpeed = 8;
      const maxForce = 0.1;
      seeker = init(p, position, velocity, maxSpeed, maxForce);
    }
    {
      const position = p.createVector(200, 220);
      const velocity = p.createVector();
      const maxSpeed = 8;
      const maxForce = 0.1;
      fleer = init(p, position, velocity, maxSpeed, maxForce);
    }
  };
  p.draw = () => {
    p.background("#02121e");
    seek(seeker, fleer.position);
    update(p, seeker);
    draw(p, seeker, "#aaa");
    flee(fleer, seeker.position);
    update(p, fleer);
    draw(p, fleer, "#aaa");
  };
});
