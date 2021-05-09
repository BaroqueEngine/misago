type Point = {
  x: number;
  y: number;
};

function indexToXy(i: number, width: number): Point {
  const x = i % width;
  const y = Math.floor(i / width);

  return { x, y };
}

function xyToIndex(x: number, y: number, width: number): number {
  return y * width + x;
}

const width = 10;
const index = 35;
const point = indexToXy(index, width);

console.log(point);
console.log(xyToIndex(point.x, point.y, width));