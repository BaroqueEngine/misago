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
    p.textAlign(p.CENTER);
    particles = [];
  };
  p.draw = () => {
    p.background(color.background);
    p.noStroke();
    p.fill("#fff");
    p.text(`${particles.length} / ${maxParticle}`, p.width / 2, p.height / 2);
    if (p.frameCount % interval === 0 && particles.length < maxParticle) {
      addParticle();
    }
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      update(particle);
      p.fill(color.fill, particle.opacity);
      p.circle(particle.x, particle.y, particle.radius);
      if (
        particle.x + particle.radius < 0 ||
        p.width <= particle.x - particle.radius ||
        particle.y + particle.radius < 0 ||
        p.height <= particle.y - particle.radius
      ) {
        particles.splice(i, 1);
        i--;
      }
    }
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
