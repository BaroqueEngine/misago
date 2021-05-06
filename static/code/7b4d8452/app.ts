import * as p5 from "p5";

const CellType = {
  Wall: "wall",
  Floor: "floor",
};
type CellType = typeof CellType[keyof typeof CellType];

new p5((p: p5) => {
  const tileWidth = 128;
  const tileHeight = 64;
  const tileSize = 5;
  const iterations = 5;
  const fillProbability = 0.4;
  let map: CellType[][];
  let temp: CellType[][];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    initMap();
    for (let i = 0; i < iterations; i++) {
      generateMap();
    }

    p.strokeWeight(1);
    p.fill("#4977bc");

    for (let y = 0; y < tileHeight; y++) {
      for (let x = 0; x < tileWidth; x++) {
        if (map[y][x] === CellType.Floor) {
          p.rect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
      }
    }
  };

  function initMap(): void {
    temp = [];
    map = [];

    for (let y = 0; y < tileHeight; y++) {
      temp[y] = [];
      for (let x = 0; x < tileWidth; x++) {
        temp[y][x] = p.random(1.0) < fillProbability ? CellType.Wall : CellType.Floor;
      }
    }

    for (let y = 0; y < tileHeight; y++) {
      map[y] = [];
      for (let x = 0; x < tileWidth; x++) {
        map[y][x] = CellType.Wall;
      }
    }
  }

  function onBoard(x: number, y: number): boolean {
    return 0 <= x && x < tileWidth && 0 <= y && y < tileHeight;
  }

  function generateMap(): void {
    for (let y = 2; y < tileHeight - 2; y++) {
      for (let x = 2; x < tileWidth - 2; x++) {
        let count33 = 0;
        let count55 = 0;

        for (let ty = y - 1; ty <= y + 1; ty++) {
          for (let tx = x - 1; tx <= x + 1; tx++) {
            if (onBoard(tx, ty) && temp[ty][tx] === CellType.Wall) {
              count33++;
            }
          }
        }

        for (let ty = y - 2; ty <= y + 2; ty++) {
          for (let tx = x - 2; tx <= x + 2; tx++) {
            if (onBoard(tx, ty) && temp[ty][tx] === CellType.Wall) {
              count55++;
            }
          }
        }

        if (5 <= count33 || count55 <= 2) {
          map[y][x] = CellType.Wall;
        } else {
          map[y][x] = CellType.Floor;
        }
      }
    }

    for (let y = 0; y < tileHeight; y++) {
      for (let x = 0; x < tileWidth; x++) {
        temp[y][x] = map[y][x];
      }
    }
  }
});
