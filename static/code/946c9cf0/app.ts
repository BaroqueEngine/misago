import * as p5 from "p5";
import { init, Point } from "./point";

new p5((p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    const a = init(10, 150);
    const b = init(150, 30);
    const c = init(350, 180);
    const d = init(580, 80);

    p.noFill();
    p.stroke(200);
    drawBezier3(a, b, c, d);
  };

  function calcBezier3(a: Point, b: Point, c: Point, d: Point, t: number): Point {
    const x = a.x * (1 - t) ** 3 + b.x * 3 * (1 - t) ** 2 * t + c.x * 3 * (1 - t) * t ** 2 + d.x * t ** 3;
    const y = a.y * (1 - t) ** 3 + b.y * 3 * (1 - t) ** 2 * t + c.y * 3 * (1 - t) * t ** 2 + d.y * t ** 3;

    return { x, y };
  }

  function drawBezier3(a: Point, b: Point, c: Point, d: Point): void {
    let px = a.x;
    let py = a.y;

    const max = 100;
    for (let i = 1; i <= max; i++) {
      const t = i / max;
      const point = calcBezier3(a, b, c, d, t);
      p.line(px, py, point.x, point.y);
      px = point.x;
      py = point.y;
    }
  }
});
