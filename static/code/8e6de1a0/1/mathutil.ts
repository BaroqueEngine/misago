export function range(min: number, max: number): number {
  return min + (max - min) * Math.random();
}

export function rangeInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(range(min, max + 1));
}
