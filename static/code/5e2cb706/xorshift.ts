const max = 0xffffffff;

export type XorShift = {
  seed: number;
};

export function init(seed?: number) {
  const xs: XorShift = { seed: 0 };

  if (seed === undefined) {
    xs.seed = Math.floor(Math.random() * max) + 1;
  } else {
    setSeed(xs, seed);
  }

  return xs;
}

export function setSeed(xs: XorShift, seed: number): void {
  seed = Math.floor(seed);
  if (!(0 <= seed && seed < max)) {
    throw new Error(`シード値の範囲は0以上${max}未満の値でなければいけません。`);
  }
  xs.seed = seed + 1;
}

export function getValue(xs: XorShift): number {
  next(xs);

  if (xs.seed === max) {
    next(xs);
  }

  return (xs.seed - 1) / (max - 1);
}

function next(xs: XorShift): void {
  xs.seed = xs.seed ^ (xs.seed << 13);
  xs.seed = xs.seed ^ (xs.seed >>> 17);
  xs.seed = xs.seed ^ (xs.seed << 5);
  xs.seed = xs.seed >>> 0;
}
