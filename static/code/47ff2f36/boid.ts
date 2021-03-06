import * as p5 from "p5";

export const radius = 9;
export const speed = 2;
export const radialSpeed = Math.PI / 60;
export const vision = 50;

export type Boid = {
  x: number;
  y: number;
  heading: number;
};

export function init(p: p5): Boid {
  const x = Math.floor(p.random(p.windowWidth));
  const y = Math.floor(p.random(p.windowHeight));
  const heading = p.random(-Math.PI, Math.PI);

  return { x, y, heading };
}

export function draw(p: p5, target: Boid) {
  p.fill("#374151");
  p.triangle(target.x + Math.cos(target.heading) * radius * 1.5, target.y + Math.sin(target.heading) * radius * 1.5, target.x + Math.cos(target.heading + (Math.PI / 3) * 2) * radius, target.y + Math.sin(target.heading + (Math.PI / 3) * 2) * radius, target.x + Math.cos(target.heading + (Math.PI / 3) * 4) * radius, target.y + Math.sin(target.heading + (Math.PI / 3) * 4) * radius);
}

export function getDistance(p: p5, a: Boid, b: Boid): number {
  const x0 = Math.min(a.x, b.x);
  const x1 = Math.max(a.x, b.x);
  const y0 = Math.min(a.y, b.y);
  const y1 = Math.max(a.y, b.y);

  const dx = Math.min(x1 - x0, x0 + p.windowWidth - x1);
  const dy = Math.min(y1 - y0, y0 + p.windowHeight - y1);
  return p.dist(0, 0, dx, dy);
}

export function getNeighbors(p: p5, target: Boid, group: Boid[]): Boid[] {
  const neighbors: Boid[] = [];
  group.forEach((neighbor) => {
    if (target !== neighbor) {
      if (getDistance(p, target, neighbor) < vision) {
        neighbors.push(neighbor);
      }
    }
  });
  return neighbors;
}

export function update(p: p5, target: Boid, group: Boid[]): void {
  const neighbors = getNeighbors(p, target, group);
  if (0 < neighbors.length) {
    let avgHx = 0;
    let avgHy = 0;
    let avgX = 0;
    let avgY = 0;
    let nearestDist = radius * 2;
    let nearestBoid: Boid = null;

    neighbors.forEach((neighbor) => {
      avgHx += Math.cos(neighbor.heading);
      avgHy += Math.sin(neighbor.heading);
      avgX += neighbor.x;
      avgY += neighbor.y;

      const dist = getDistance(p, target, neighbor);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestBoid = neighbor;
      }
    });

    avgHx /= neighbors.length;
    avgHy /= neighbors.length;
    avgX /= neighbors.length;
    avgY /= neighbors.length;

    let t: number;
    // ????????????????????????????????????????????????????????????????????????????????????
    if (nearestBoid) {
      t = Math.atan2(target.y - nearestBoid.y, target.x - nearestBoid.x);
    } else {
      const avg = Math.atan2(avgHy, avgHx);
      const center = Math.atan2(avgY - target.y, avgX - target.x);
      // ???????????????????????????????????????
      const array = [avg, avg, avg, center];
      let totalX = 0;
      let totalY = 0;
      array.forEach((value) => {
        totalX += Math.cos(value);
        totalY += Math.sin(value);
      });
      t = Math.atan2(totalY / array.length, totalX / array.length);
    }

    let delta = t - target.heading;
    delta = wrap(delta, -Math.PI, Math.PI);
    delta = clamp(delta, radialSpeed);
    target.heading += delta;
    target.heading = wrap(target.heading, -Math.PI, Math.PI);
  }

  move(p, target);
}

function move(p: p5, target: Boid): void {
  target.x += Math.cos(target.heading) * speed;
  target.y += Math.sin(target.heading) * speed;

  target.x = wrap(target.x, 0, p.windowWidth);
  target.y = wrap(target.y, 0, p.windowHeight);
}

function wrap(value: number, min: number, max: number): number {
  while (max <= value) {
    value -= max - min;
  }
  while (value < min) {
    value += max - min;
  }
  return value;
}

function clamp(value: number, limit: number): number {
  return Math.max(Math.min(value, limit), -limit);
}
