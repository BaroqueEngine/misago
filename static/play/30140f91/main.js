import { init, update, draw, seek, flee, evade } from "./vehicle.js";
new p5((p) => {
  let seeker0;
  let seeker1;
  let seeker2;
  let seeker3;
  let fleer;
  let evader;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const position = p.createVector(x, y);
      const velocity = p.createVector();
      const maxSpeed = 3;
      const maxForce = 0.6;
      seeker0 = init(p, position, velocity, maxSpeed, maxForce);
    }
    {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const position = p.createVector(x, y);
      const velocity = p.createVector();
      const maxSpeed = 4;
      const maxForce = 0.4;
      seeker1 = init(p, position, velocity, maxSpeed, maxForce);
    }
    {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const position = p.createVector(x, y);
      const velocity = p.createVector();
      const maxSpeed = 3;
      const maxForce = 0.6;
      seeker2 = init(p, position, velocity, maxSpeed, maxForce);
    }
    {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const position = p.createVector(x, y);
      const velocity = p.createVector();
      const maxSpeed = 4;
      const maxForce = 0.4;
      seeker3 = init(p, position, velocity, maxSpeed, maxForce);
    }
    {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const position = p.createVector(x, y);
      const velocity = p.createVector();
      const maxSpeed = 5;
      const maxForce = 0.4;
      fleer = init(p, position, velocity, maxSpeed, maxForce);
    }
    {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const position = p.createVector(x, y);
      const velocity = p.createVector();
      const maxSpeed = 5;
      const maxForce = 0.4;
      evader = init(p, position, velocity, maxSpeed, maxForce);
    }
  };
  p.draw = () => {
    p.background("#02121e");
    seek(seeker0, fleer.position);
    update(p, seeker0);
    seek(seeker1, fleer.position);
    update(p, seeker1);
    seek(seeker2, evader.position);
    update(p, seeker2);
    seek(seeker3, evader.position);
    update(p, seeker3);
    flee(fleer, seeker0.position);
    flee(fleer, seeker1.position);
    update(p, fleer);
    evade(evader, seeker1);
    evade(evader, seeker2);
    update(p, evader);
    draw(p, seeker0, "#cd3830");
    draw(p, seeker1, "#cd3830");
    draw(p, seeker2, "#cd3830");
    draw(p, seeker3, "#cd3830");
    draw(p, fleer, "#1c8b94");
    draw(p, evader, "#de980f");
  };
});
