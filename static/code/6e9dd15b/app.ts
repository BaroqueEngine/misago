import * as p5 from "p5";

const CellType = {
  floor: "floor",
  wall: "wall",
} as const;
type CellType = typeof CellType[keyof typeof CellType];

new p5((p: p5) => {
  const chipWidth = 8;
  const chipHeight = 8;
  const tileWidth = 40;
  const tileHeight = 40;
  const cellWidth = 10;
  const cellHeight = 10;
  let chip: p5.Image;
  let map: CellType[];

  p.preload = () => {
    chip = p.loadImage("tile.png");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noSmooth();

    map = [];
    for (let i = 0; i < cellWidth * cellHeight; i++) {
      map[i] = p.random(0, 100) < 50 ? CellType.floor : CellType.wall;
    }
  };

  p.draw = () => {
    p.clear();

    for (let y = 0; y < cellHeight; y++) {
      for (let x = 0; x < cellWidth; x++) {
        if (getCell(x, y) === CellType.wall) {
          updateTile(x, y);
        }
      }
    }
  };

  function getCell(x: number, y: number): CellType {
    return map[y * cellWidth + x];
  }

  function updateTile(x: number, y: number): void {
    let index = 0;
    if (0 <= y - 1 && getCell(x, y - 1) === CellType.wall) {
      index += 1;
    }
    if (x + 1 < cellWidth && getCell(x + 1, y) === CellType.wall) {
      index += 2;
    }
    if (y + 1 < cellHeight && getCell(x, y + 1) === CellType.wall) {
      index += 4;
    }
    if (0 <= x - 1 && getCell(x - 1, y) === CellType.wall) {
      index += 8;
    }
    p.copy(chip, index * chipWidth, 0, chipWidth, chipHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
});
