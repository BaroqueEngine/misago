import * as p5 from "p5";

document.addEventListener("DOMContentLoaded", function() {
  new p5(init);
});

type Point = { x: number; y: number };
let p: p5;
const color = {
  background: "#de980f",
  fill: "#000",
  text: "#000"
};
const speed = 2;
let point: Point;

function init(_p: p5): void {
  p = _p;
  p.setup = setup;
  p.draw = update;
}

function setup(): void {
  p.createCanvas(p.windowWidth, p.windowHeight).parent("canvas-container");

  point = { x: 0, y: p.windowHeight / 2 };
}

function update(): void {
  point.x += speed;
  if (point.x > p.windowWidth) {
    point.x = 0;
  }

  p.background(color.background);
  p.noStroke();
  p.fill(color.fill);
  p.circle(point.x, point.y, 20);

  p.noStroke();
  p.fill(color.text);
  p.textSize(20);
  p.textAlign(p.CENTER, p.CENTER);
  p.text(`等速直線運動`, p.windowWidth / 2, p.windowHeight / 2 - 60);
  p.text(`${speed}px/f`, p.windowWidth / 2, p.windowHeight / 2 - 30);
}
