export function init(x, y, vx, vy, radius, opacity) {
  return { x, y, vx, vy, radius, opacity };
}
export function update(p) {
  p.x += p.vx;
  p.y += p.vy;
}
