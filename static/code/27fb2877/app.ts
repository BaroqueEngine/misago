function floor(value: number, unit: number): number {
  return Math.floor(value / unit) * unit;
}

function ceil(value: number, unit: number): number {
  return Math.ceil(value / unit) * unit;
}

const unit = 3;
for (let i = -10; i <= 10; i++) {
  console.log(`floor(${i}, ${unit}) = ${floor(i, unit)}`);
}
for (let i = -10; i <= 10; i++) {
  console.log(`ceil(${i}, ${unit}) = ${ceil(i, unit)}`);
}
