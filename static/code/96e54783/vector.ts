export type Vector = {
  x: number;
  y: number;
  z: number;
};

export function sub(a: Vector, b: Vector): Vector {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

export function length(vec: Vector): number {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
}

export function normalize(vec: Vector, len: number = 1): Vector {
  const ratio = len / length(vec);
  return { x: vec.x * ratio, y: vec.y * ratio, z: vec.z * ratio };
}

export function unit(vec: Vector): Vector {
  return normalize(vec);
}
