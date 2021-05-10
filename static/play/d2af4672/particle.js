export function init(x, y, vx, vy, radius) {
  return { x, y, vx, vy, radius };
}
export function update(p) {
  p.x += p.vx;
  p.y += p.vy;
}
