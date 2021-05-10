import { init, update } from "./particle.js";

new p5((p) => {
  const color = {
    background: "#02121e",
    fill: "#f0f0f0",
  };
  let particles;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    particles = [];
    for (let i = 0; i < 100; i++) {
      const vx = p.random(-3, 3);
      const vy = p.random(-3, 3);
      const particle = init(p.windowWidth / 2, p.windowHeight / 2, vx, vy, 30);
      particles.push(particle);
    }
  };
  p.draw = () => {
    p.background(color.background);
    p.fill(color.fill);
    p.noStroke();
    particles.forEach((particle) => {
      update(particle);
      p.circle(particle.x, particle.y, particle.radius);
    });
  };
});
