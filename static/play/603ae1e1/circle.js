export function init(position, radius) {
  return { position, radius };
}
export function draw(p, circle) {
  p.push();
  p.noFill();
  p.stroke("#aaa");
  p.circle(circle.position.x, circle.position.y, circle.radius * 2);
  p.pop();
}
