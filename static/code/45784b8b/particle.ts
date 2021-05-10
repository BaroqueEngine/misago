export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  lifespan: number;
  damage: number;
};

export function init(x: number, y: number, vx: number, vy: number, radius: number, opacity: number, lifespan: number, damage: number): Particle {
  return { x, y, vx, vy, radius, opacity, lifespan, damage };
}

export function update(p: Particle, gravity: number): void {
  p.vy += gravity;
  p.x += p.vx;
  p.y += p.vy;
  p.lifespan -= p.damage;
  p.lifespan = Math.max(0, p.lifespan);
}

export function isDead(p: Particle): boolean {
  return p.lifespan === 0;
}
