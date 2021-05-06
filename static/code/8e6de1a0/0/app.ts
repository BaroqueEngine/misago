import * as p5 from "p5";
import { rangeInt } from "./mathutil";
import * as r from "./rectangle";
import { Rectangle } from "./rectangle";

const CellType = {
  none: "none",
  partition: "partition",
  room: "room",
  corridor: "corridor",
} as const;
type CellType = typeof CellType[keyof typeof CellType];

new p5((p: p5) => {
  const width = 50;
  const height = 50;
  const tileSize = 10;
  const minPartitionSize = 8;
  const splitRectSize = minPartitionSize * 2 + 1;
  const minRoomSize = 4;
  let map: CellType[][];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    map = [];
    for (let y = 0; y < height; y++) {
      map[y] = [];
      for (let x = 0; x < width; x++) {
        map[y][x] = CellType.none;
      }
    }

    const partitions = splitRect(r.init(0, 0, width - 1, height - 1));
    const rooms: Rectangle[] = [];
    for (let i = 0; i < partitions.length; i++) {
      rooms.push(createRoom(partitions[i]));
      fill(rooms[i], CellType.room);
    }
    makeCorridor(partitions, rooms);

    draw();
  };

  function draw(): void {
    p.clear();
    p.noStroke();

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        switch (map[y][x]) {
          case CellType.room:
            p.fill("#f5e8cf");
            break;
          case CellType.corridor:
            p.fill("#957e80");
            break;
          default:
            p.noFill();
            break;
        }

        p.rect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }

  function fill(rect: Rectangle, cellType: CellType): void {
    const minY = Math.min(rect.top, rect.bottom);
    const maxY = Math.max(rect.top, rect.bottom);

    const minX = Math.min(rect.left, rect.right);
    const maxX = Math.max(rect.left, rect.right);

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        map[y][x] = cellType;
      }
    }
  }

  function makeCorridor(partitions: Rectangle[], rooms: Rectangle[]): void {
    for (let i = 0; i < partitions.length - 1; i++) {
      connect(partitions[i], partitions[i + 1], rooms[i], rooms[i + 1]);
    }
  }

  function connect(part0: Rectangle, part1: Rectangle, room0: Rectangle, room1: Rectangle): void {
    let posA: number;
    let posB: number;

    if (part0.bottom + 1 == part1.top - 1) {
      posA = room0.left + rangeInt(0, r.width(room0) - 1);
      posB = room1.left + rangeInt(0, r.width(room1) - 1);

      fill(r.init(posA, room0.bottom + 1, posA, part0.bottom + 1), CellType.corridor);
      fill(r.init(posB, room1.top - 1, posB, part1.top - 1), CellType.corridor);
      fill(r.init(posA, part0.bottom + 1, posB, part1.top - 1), CellType.corridor);
    } else if (part0.right + 1 == part1.left - 1) {
      posA = room0.top + rangeInt(0, r.height(room0) - 1);
      posB = room1.top + rangeInt(0, r.height(room1) - 1);

      fill(r.init(room0.right + 1, posA, part0.right + 1, posA), CellType.corridor);
      fill(r.init(room1.left - 1, posB, part1.left - 1, posB), CellType.corridor);
      fill(r.init(part0.right + 1, posA, part1.left - 1, posB), CellType.corridor);
    }
  }

  function createRoom(rect: Rectangle): Rectangle {
    const width = minRoomSize + rangeInt(0, r.width(rect) - minRoomSize - 2);
    const height = minRoomSize + rangeInt(0, r.height(rect) - minRoomSize - 2);

    const startX = rect.left + 1 + rangeInt(0, r.width(rect) - width - 2);
    const startY = rect.top + 1 + rangeInt(0, r.height(rect) - height - 2);

    return r.init(startX, startY, startX + width - 1, startY + height - 1);
  }

  function splitRect(rect: Rectangle): Rectangle[] {
    if (r.height(rect) < splitRectSize || r.width(rect) < splitRectSize) {
      return [rect];
    }

    let a: Rectangle;
    let b: Rectangle;

    if (r.height(rect) >= r.width(rect)) {
      const space = r.height(rect) - splitRectSize;
      const aBottom = rect.top + (minPartitionSize - 1) + rangeInt(0, space);
      a = r.init(rect.left, rect.top, rect.right, aBottom);
      b = r.init(rect.left, aBottom + 2, rect.right, rect.bottom);
    } else {
      const space = r.width(rect) - splitRectSize;
      const aRight = rect.left + (minPartitionSize - 1) + rangeInt(0, space);
      a = r.init(rect.left, rect.top, aRight, rect.bottom);
      b = r.init(aRight + 2, rect.top, rect.right, rect.bottom);
    }

    return splitRect(a).concat(splitRect(b));
  }
});
