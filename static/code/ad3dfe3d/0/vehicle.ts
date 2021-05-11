import * as p5 from "p5";

export type Vehicle = {
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  maxSpeed: number;
  maxForce: number;
};

export function init(p: p5, position: p5.Vector, velocity: p5.Vector, maxSpeed: number, maxForce: number): Vehicle {
  return { position, velocity, acceleration: p.createVector(), maxSpeed, maxForce };
}

export function update(p: p5, v: Vehicle): void {
  v.acceleration.limit(v.maxForce);
  v.velocity.add(v.acceleration);
  v.velocity.limit(v.maxSpeed);
  v.position.add(v.velocity);
  v.acceleration.set(0);

  adjustEdge(p, v);
}

export function adjustEdge(p: p5, v: Vehicle): void {
  if (v.position.x < 0) {
    v.position.x = 0;
    v.velocity.x *= -1;
  } else if (v.position.x >= p.windowWidth) {
    v.position.x = p.windowWidth - 1;
    v.velocity.x *= -1;
  }

  if (v.position.y < 0) {
    v.position.y = 0;
    v.velocity.y *= -1;
  } else if (v.position.y >= p.windowHeight) {
    v.position.y = p.windowHeight - 1;
    v.velocity.y *= -1;
  }
}

export function draw(p: p5, v: Vehicle, strokeColor: string): void {
  p.push();
  p.noFill();
  p.strokeWeight(2);
  p.stroke(strokeColor);
  p.translate(v.position);
  p.rotate(v.velocity.heading());
  p.beginShape();
  const r = 8;
  p.vertex(r * 2, 0);
  p.vertex(-r, r);
  p.vertex(-r, -r);
  p.endShape(p.CLOSE);
  p.pop();
}

export function run(v: Vehicle): void {
  v.acceleration.set(10, 10);
}

export function seek(v: Vehicle, target: p5.Vector): void {
  const desiredVelocity = p5.Vector.sub(target, v.position);
  desiredVelocity.limit(v.maxSpeed);
  const force = p5.Vector.sub(desiredVelocity, v.velocity);
  v.acceleration.add(force);
}

export function flee(v: Vehicle, target: p5.Vector) {
  const desiredVelocity = p5.Vector.sub(target, v.position);
  desiredVelocity.limit(v.maxSpeed);
  const force = p5.Vector.sub(desiredVelocity, v.velocity);
  v.acceleration.sub(force);
}
