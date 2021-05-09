function rotateRight<T>(a: T[], size: number): T[] {
  const d: T[] = [];
  for (let i = 0; i < size * size; i++) {
    const x = i % size;
    const y = Math.floor(i / size);
    const tx = size - 1 - y;
    const ty = x;
    const di = ty * size + tx;
    d[di] = a[i];
  }
  return d;
}

{
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const b = rotateRight(a, 3);
  console.log(b);
}

function rotateLeft<T>(a: T[], size: number): T[] {
  const d: T[] = [];
  for (let i = 0; i < size * size; i++) {
    const x = i % size;
    const y = Math.floor(i / size);
    const tx = y;
    const ty = size - 1 - x;
    const di = ty * size + tx;
    d[di] = a[i];
  }
  return d;
}

{
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const b = rotateLeft(a, 3);
  console.log(b);
}