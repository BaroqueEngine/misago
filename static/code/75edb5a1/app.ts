import * as p5 from "p5";

type Point = {
  x: number;
  y: number;
};

const CellType = {
  Floor: "floor",
  Wall: "wall",
} as const;
type CellType = typeof CellType[keyof typeof CellType];

new p5((p: p5) => {
  const tileWidth = 61;
  const tileHeight = 41;
  const tileSize = 10;
  const directions: Point[] = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];
  let map: CellType[][];
  let positions: Point[];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    map = [];
    for (let y = 0; y < tileHeight; y++) {
      map[y] = [];
      for (let x = 0; x < tileWidth; x++) {
        if (x === 0 || x === tileWidth - 1 || y === 0 || y === tileHeight - 1) {
          map[y][x] = CellType.Wall;
        } else {
          map[y][x] = CellType.Floor;
        }
      }
    }

    positions = [];
    for (let y = 0; y < tileHeight; y += 2) {
      positions.push({ x: 0, y });
      positions.push({ x: tileWidth - 1, y });
    }

    for (let x = 0; x < tileWidth; x += 2) {
      positions.push({ x, y: 0 });
      positions.push({ x, y: tileHeight - 1 });
    }

    shuffle(positions);

    while (0 < positions.length) {
      const next = positions.shift();
      createWall(next.x, next.y);
    }

    p.clear();
    p.fill("#666");
    p.strokeWeight(1);

    for (let y = 0; y < tileHeight; y++) {
      for (let x = 0; x < tileWidth; x++) {
        const tile = map[y][x];
        if (tile === CellType.Wall) {
          const tx = x * tileSize;
          const ty = y * tileSize;
          p.rect(tx, ty, tileSize, tileSize);
        }
      }
    }
  };

  function shuffle<T>(a: T[]): void {
    for (let i = a.length - 1; 0 < i; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
  }

  function createWall(x: number, y: number): void {
    const dirs = directions.slice();
    shuffle(dirs);

    for (const dir of dirs) {
      const tx = x + dir.x;
      const ty = y + dir.y;
      const tx2 = x + dir.x * 2;
      const ty2 = y + dir.y * 2;

      if (0 <= tx2 && tx2 < tileWidth && 0 <= ty2 && ty2 < tileHeight && map[ty][tx] === CellType.Floor && map[ty2][tx2] === CellType.Floor) {
        map[ty][tx] = CellType.Wall;
        map[ty2][tx2] = CellType.Wall;

        positions.unshift({ x: tx2, y: ty2 });
        positions.push({ x, y });
        break;
      }
    }
  }
});
