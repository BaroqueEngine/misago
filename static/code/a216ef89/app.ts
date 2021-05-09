function choice<T>(a: T[]): T {
  const i = Math.floor(Math.random() * a.length);
  return a[i];
}

console.log(choice([1, 2, 3, 4, 5]));