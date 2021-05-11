import * as p5 from "p5";

export type Circle = {
  position: p5.Vector;
  radius: number;
};

export function init(position: p5.Vector, radius: number) {
  return { position, radius };
}

export function draw(p: p5, circle: Circle): void {
  p.push();
  p.noFill();
  p.stroke("#aaa");
  p.circle(circle.position.x, circle.position.y, circle.radius * 2);
  p.pop();
}
