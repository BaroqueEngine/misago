import { init, update, draw, seek, flee, pursue } from "./vehicle.js";
new p5((p) => {
  let seeker;
  let pursuer;
  let fleer;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const position = p.createVector(x, y);
      const velocity = p.createVector();
      const maxSpeed = 4;
      const maxForce = 0.4;
      seeker = init(p, position, velocity, maxSpeed, maxForce);
    }
    {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const position = p.createVector(x, y);
      const velocity = p.createVector();
      const maxSpeed = 4;
      const maxForce = 0.4;
      pursuer = init(p, position, velocity, maxSpeed, maxForce);
    }
    {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const position = p.createVector(x, y);
      const velocity = p.createVector();
      const maxSpeed = 6;
      const maxForce = 0.4;
      fleer = init(p, position, velocity, maxSpeed, maxForce);
    }
  };
  p.draw = () => {
    p.background("#02121e");
    seek(seeker, fleer.position);
    update(p, seeker);
    pursue(pursuer, fleer);
    update(p, pursuer);
    flee(fleer, seeker.position);
    flee(fleer, pursuer.position);
    update(p, fleer);
    draw(p, seeker, "#ed1a3d");
    draw(p, pursuer, "#009ad6");
    draw(p, fleer, "#aaa");
  };
});
