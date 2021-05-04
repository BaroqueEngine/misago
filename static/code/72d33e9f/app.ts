import { pickWeighted } from "./random";

const array = [1, 1, 2, 3];
const result = array.slice().fill(0);
const num = 100000;

for (let i = 0; i < num; i++) {
  const i = pickWeighted(array);
  result[i]++;
}

const stats = result.map((value) => ((value / num) * 100).toFixed(2) + "%");
console.log(stats);
