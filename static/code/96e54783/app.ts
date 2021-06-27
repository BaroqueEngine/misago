import { length, normalize, unit, Vector } from "./vector";

const a: Vector = { x: 6, y: 6, z: 0 };
console.log(length(a));

const b: Vector = unit(a);
console.log(length(b));

const c: Vector = normalize(a, 2);
console.log(length(c));
