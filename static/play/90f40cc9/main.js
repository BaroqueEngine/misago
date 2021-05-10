import { init, update } from "./particle.js";
new p5((p) => {
  const color = {
    background: "#02121e",
    fill: 0xf0f0f0,
  };
  const max = 10;
  const gravity = 0;
  let particles;
  let layer;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    particles = [];
    layer = p.createGraphics(p.width, p.height);
    layer.pixelDensity(1);
    layer.background(0);
    layer.fill(255, 255, 255);
    layer.textSize(200);
    layer.textAlign(p.CENTER, p.CENTER);
    layer.text("snow", p.width / 2, p.height / 2);
    layer.loadPixels();
  };
  p.draw = () => {
    p.background(color.background);
    p.noFill();
    p.stroke(126, 181, 204);
    for (let i = 0; i < max; i++) {
      addParticle();
    }
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      const index =
        (Math.round(particle.y) * layer.width + Math.round(particle.x)) * 4;
      if (index < layer.pixels.length && 0 < layer.pixels[index]) {
        particle.vy = 0.2;
      } else {
        particle.vy = 4;
      }
      update(particle, gravity);
      p.fill(color.fill);
      p.noStroke();
      p.circle(particle.x, particle.y, particle.radius * 2);
      if (p.height + 100 < particle.y) {
        particles.splice(i, 1);
        i--;
      }
    }
  };
  function addParticle() {
    const x = p.random(p.windowWidth);
    const y = -30;
    const vx = 0;
    const vy = 4;
    const radius = 1;
    const lifespan = 1;
    const damage = 0;
    const opacity = 1;
    const particle = init(x, y, vx, vy, radius, opacity, lifespan, damage);
    particles.push(particle);
  }
});
