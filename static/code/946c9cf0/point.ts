export type Point = {
  x: number;
  y: number;
};

export function init(x: number, y: number): Point {
  return { x, y };
}

export function leap(a: Point, b: Point, t: number): Point {
  const x = a.x * (1 - t) + b.x * t;
  const y = a.y * (1 - t) + b.y * t;

  return { x, y };
}
