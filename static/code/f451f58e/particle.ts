export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
};

export function init(x: number, y: number, vx: number, vy: number, radius: number, opacity: number): Particle {
  return { x, y, vx, vy, radius, opacity };
}

export function update(p: Particle): void {
  p.x += p.vx;
  p.y += p.vy;
}
