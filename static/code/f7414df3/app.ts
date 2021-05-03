function dir(value: number): number {
  if (value === 0) {
    return 0;
  }
  else if (value < 0) {
    return -1;
  }
  else {
    return 1;
  }
}

console.log(dir(-2));
console.log(dir(-1));
console.log(dir(0));
console.log(dir(1));
console.log(dir(2));
