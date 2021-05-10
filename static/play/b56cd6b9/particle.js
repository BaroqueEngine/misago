export function init(x, y, vx, vy, radius, opacity, lifespan, damage) {
  return { x, y, vx, vy, radius, opacity, lifespan, damage };
}
export function update(p) {
  p.x += p.vx;
  p.y += p.vy;
  p.lifespan -= p.damage;
  p.lifespan = Math.max(0, p.lifespan);
}
export function isDead(p) {
  return p.lifespan === 0;
}
