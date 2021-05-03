import { externalDivision, init, internalDivision } from "./point";

const a = init(-2, 1);
const b = init(2, 3);

console.log(internalDivision(a, b, 5, 6));
console.log(externalDivision(a, b, 3, 1));
