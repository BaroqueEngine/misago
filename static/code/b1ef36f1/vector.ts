export type Vector = {
  x: number;
  y: number;
  z: number;
};

export function heading(v: Vector): number {
  return Math.atan2(v.y, v.x);
}
