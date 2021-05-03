type Point = { x: number, y: number };

function midpoint(a: Point, b: Point): Point {
  const c: Point = { x: 0, y: 0 };
  c.x = (a.x + b.x) / 2;
  c.y = (a.y + b.y) / 2;

  return c;
}

console.log(midpoint({ x: 10, y: 10 }, { x: 10, y: 10 }));
console.log(midpoint({ x: 10, y: 10 }, { x: 15, y: 10 }));
console.log(midpoint({ x: 10, y: 10 }, { x: 15, y: 15 }));
