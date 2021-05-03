export type Point = {
  x: number;
  y: number;
};

export function init(x: number = 0, y: number = 0): Point {
  return { x, y };
}

export function internalDivision(a: Point, b: Point, m: number, n: number): Point {
  const point = init();
  point.x = (m * b.x + n * a.x) / (m + n);
  point.y = (m * b.y + n * a.y) / (m + n);

  return point;
}

export function externalDivision(a: Point, b: Point, m: number, n: number): Point {
  const point = init();
  point.x = (-m * b.x + n * a.x) / (-m + n);
  point.y = (-m * b.y + n * a.y) / (-m + n);

  return point;
}
