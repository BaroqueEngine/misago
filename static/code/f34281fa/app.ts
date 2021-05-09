const data = [86, 20, 71, 43, 39, 66, 59, 50, 83, 63, 48, 31, 80, 79, 100, 92, 83, 44, 52, 56];
const table: number[] = [];
const range = 20;
const max = 120;
const rMax = Math.ceil(max / range);

type Data = { index: number; value: number };
let maxData: Data = { index: -1, value: -1 };

for (let i = 0; i < rMax; i++) {
  table[i] = 0;
}

data.forEach((v) => {
  const i = Math.floor(v / range);
  table[i]++;
});

table.forEach((b, i) => {
  const curValue = table[i];
  if (maxData.value < curValue) {
    maxData.index = i;
    maxData.value = curValue;
  }
});

const rangeMin = range * maxData.index;
const rangeMax = range * (maxData.index + 1);
const mode = (rangeMin + rangeMax) / 2;

// 最頻値は50です。
console.log(`最頻値は${mode}です。`);
