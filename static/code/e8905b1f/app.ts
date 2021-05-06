import * as p5 from "p5";

type Dir = {
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
  let map: CellType[][];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    map = [];
    for (let y = 0; y < tileHeight; y++) {
      map[y] = [];
      for (let x = 0; x < tileWidth; x++) {
        map[y][x] = CellType.Floor;

        if (x === 0 || x === tileWidth - 1 || y === 0 || y === tileHeight - 1) {
          map[y][x] = CellType.Wall;
        }
        if (x % 2 === 0 && y % 2 === 0) {
          map[y][x] = CellType.Wall;
        }
      }
    }

    for (let y = 2; y < tileHeight - 1; y += 2) {
      for (let x = 2; x < tileWidth - 1; x += 2) {
        const directions: Dir[] = [
          { x: 1, y: 0 },
          { x: 0, y: 1 },
          { x: -1, y: 0 },
        ];
        if (y === 2) {
          directions.push({ x: 0, y: -1 });
        }
        while (true) {
          const dir: Dir = p.random(directions);
          const tx = x + dir.x;
          const ty = y + dir.y;

          if (0 <= tx && tx < tileWidth && 0 <= ty && ty < tileHeight && map[ty][tx] === CellType.Floor) {
            map[ty][tx] = CellType.Wall;
            break;
          }
        }
      }
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
});
