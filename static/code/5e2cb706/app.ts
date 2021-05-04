import { init, getValue } from "./xorshift";

const a = init(12345);
console.log(getValue(a));
console.log(getValue(a));
console.log(getValue(a));

const b = init(12345);
console.log(getValue(b));
console.log(getValue(b));
console.log(getValue(b));
