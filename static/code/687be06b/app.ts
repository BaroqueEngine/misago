function getDecimalPart(v: number): number {
  let str = v.toString();
  str = str.split(".")[1];
  const num = parseFloat("0." + str);
  return num;
}

const a = -12.3456789;
const b = Math.abs(a);

console.log(b % 1);
console.log(b - Math.floor(b));
console.log(getDecimalPart(a));
