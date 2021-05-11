import * as p5 from "p5";
import { Circle } from "./circle";

export type Vehicle = {
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  maxSpeed: number;
  maxForce: number;
  arrivalThreshold: number;
  wanderDistance: number;
  wanderAngle: number;
  wanderRadius: number;
  wanderRange: number;
  avoidDistance: number;
  avoidBuffer: number;
};

export function init(
  p: p5,
  position: p5.Vector,
  velocity: p5.Vector,
  maxSpeed: number,
  maxForce: number
): Vehicle {
  return {
    position,
    velocity,
    acceleration: p.createVector(),
    maxSpeed,
    maxForce,
    arrivalThreshold: 100,
    wanderDistance: 10,
    wanderAngle: 0,
    wanderRadius: 5,
    wanderRange: 1,
    avoidDistance: 300,
    avoidBuffer: 20,
  };
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

export function arrive(v: Vehicle, target: p5.Vector) {
  const desiredVelocity = p5.Vector.sub(target, v.position);
  const dist = v.position.dist(target);
  if (dist > v.arrivalThreshold) {
    desiredVelocity.setMag(v.maxSpeed);
  } else {
    desiredVelocity.setMag(v.maxSpeed * (dist / v.arrivalThreshold));
  }
  const force = p5.Vector.sub(desiredVelocity, v.velocity);
  v.acceleration.add(force);
}

export function pursue(v: Vehicle, target: Vehicle) {
  const lookAheadTime = v.position.dist(target.position) / v.maxSpeed;
  const predictedTarget = p5.Vector.add(
    target.position,
    p5.Vector.mult(target.velocity, lookAheadTime)
  );
  seek(v, predictedTarget);
}

export function evade(v: Vehicle, target: Vehicle) {
  const lookAheadTime = v.position.dist(target.position) / v.maxSpeed;
  const predictedTarget = p5.Vector.add(
    target.position,
    p5.Vector.mult(target.velocity, lookAheadTime)
  );
  flee(v, predictedTarget);
}

export function wander(p: p5, v: Vehicle): void {
  const center = v.velocity.copy();
  center.setMag(v.wanderDistance);
  const offset = p.createVector(1, 1);
  offset.setMag(v.wanderRadius);
  offset.rotate(v.wanderAngle);
  v.wanderAngle += p.random() * v.wanderRange - v.wanderRange / 2;

  const force = center.add(offset);
  v.acceleration.add(force);
}

function sign(p: p5, v: Vehicle, target: p5.Vector): number {
  const vec = p.createVector(-v.position.y, v.position.x);
  return vec.dot(target) < 0 ? -1 : 1;
}

export function avoid(p: p5, v: Vehicle, circles: Circle[]): void {
  circles.forEach((circle) => {
    const heading = p.createVector(
      Math.cos(v.velocity.heading()),
      Math.sin(v.velocity.heading())
    );
    const diff = p5.Vector.sub(circle.position, v.position);
    const dot = diff.dot(heading);

    if (dot > 0) {
      const feeler = p5.Vector.mult(heading, v.avoidDistance);
      const projection = p5.Vector.mult(heading, dot);
      const dist = p5.Vector.sub(projection, diff).mag();
      if (
        dist < circle.radius + v.avoidBuffer &&
        projection.mag() < feeler.mag()
      ) {
        const force = p5.Vector.mult(heading, v.maxSpeed);
        force.rotate(force.heading() + sign(p, v, diff) * p.HALF_PI);
        force.mult(1.0 - projection.mag() / feeler.mag());
        v.acceleration.add(force);
        v.velocity.mult(projection.mag() / feeler.mag());
      }
    }
  });
}
