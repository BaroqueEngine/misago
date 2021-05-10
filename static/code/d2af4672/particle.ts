export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export function init(x: number, y: number, vx: number, vy: number, radius: number): Particle {
  return { x, y, vx, vy, radius };
}

export function update(p: Particle): void {
  p.x += p.vx;
  p.y += p.vy;
}
