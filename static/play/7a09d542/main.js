import { init, update } from "./particle.js";
new p5((p) => {
  const color = {
    background: "#02121e",
    fill: 0xf0f0f0,
  };
  const interval = 10;
  const maxParticle = 100;
  let particles;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    particles = [];
  };
  p.draw = () => {
    p.background(color.background);
    p.noStroke();
    if (p.frameCount % interval === 0 && particles.length < maxParticle) {
      addParticle();
    }
    particles.forEach((particle) => {
      update(particle);
      p.fill(color.fill, particle.opacity);
      p.circle(particle.x, particle.y, particle.radius);
    });
  };
  function addParticle() {
    const vx = p.random(-3, 3);
    const vy = p.random(-3, 3);
    const radius = p.random(4, 30);
    const opacity = p.random(40, 255);
    const particle = init(
      p.windowWidth / 2,
      p.windowHeight / 2,
      vx,
      vy,
      radius,
      opacity
    );
    particles.push(particle);
  }
});
