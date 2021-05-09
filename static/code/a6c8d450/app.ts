const data = [86, 20, 71, 43, 39, 66, 59, 50, 83, 63, 48, 31, 80, 79, 100, 92, 83, 44, 52, 56];
const table: number[] = [];
const range = 20;
const max = 120;
const rMax = Math.ceil(max / range);

for (let i = 0; i < rMax; i++) {
  table[i] = 0;
}

data.forEach(v => {
  const i = Math.floor(v / range);
  table[i]++;
});

table.forEach((b, i) => {
  const rangeMin = range * i;
  const rangeMax = range * (i + 1);

  console.log(`${rangeMin}以上 ${rangeMax}未満: ${table[i]}人`);
});
