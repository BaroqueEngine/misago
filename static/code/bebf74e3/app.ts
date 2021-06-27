import * as p5 from "p5";
import { Point } from "./point";

new p5((p: p5) => {
  const iterations = 60;
  const n = 100;
  const points: Point[] = [];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    for (let i = 0; i < n; i++) {
      const x = p.random(p.windowWidth);
      const y = p.random(p.windowHeight);
      const color = p.color(p.random(256), p.random(256), p.random(256)).toString("#rgb");

      points.push({ x, y, color });
    }
  };

  p.draw = () => {
    for (let i = 0; i < iterations; i++) {
      for (const point of points) {
        walk(point);
      }
    }
  };

  function walk(point: Point): void {
    point.x += p.random() < 0.5 ? -1 : 1;
    point.y += p.random() < 0.5 ? -1 : 1;

    p.stroke(point.color);
    p.point(point.x, point.y);
  }
});
