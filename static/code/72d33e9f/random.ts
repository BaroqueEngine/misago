export function pickWeighted(array: number[]): number {
  const total = array.reduce((a, b) => a + b, 0);
  const probs = array.map((value) => value / total);
  const threshold = Math.random();

  let curProb = 0;
  return probs.findIndex((value) => {
    curProb += value;
    return threshold < curProb;
  });
}
