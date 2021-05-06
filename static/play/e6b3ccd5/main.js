const CellType = {
  Floor: "floor",
  Wall: "wall",
};
new p5((p) => {
  const tileWidth = 61;
  const tileHeight = 41;
  const tileSize = 10;
  const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];
  let map;
  let positions;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent("canvas-container");
    map = [];
    for (let y = 0; y < tileHeight; y++) {
      map[y] = [];
      for (let x = 0; x < tileWidth; x++) {
        map[y][x] = CellType.Wall;
      }
    }
    positions = [];
    const sx = p.floor(p.random((tileWidth - 1) / 2 - 1)) * 2 + 1;
    const sy = p.floor(p.random((tileHeight - 1) / 2 - 1)) * 2 + 1;
    map[sy][sx] = CellType.Floor;
    positions.push({ x: sx, y: sy });
    while (0 < positions.length) {
      const next = positions.pop();
      dig(next.x, next.y);
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
  function dig(x, y) {
    const dirs = directions.slice();
    shuffle(dirs);
    for (const dir of dirs) {
      const tx = x + dir.x;
      const ty = y + dir.y;
      const tx2 = x + dir.x * 2;
      const ty2 = y + dir.y * 2;
      if (0 <= tx2 && tx2 < tileWidth && 0 <= ty2 && ty2 < tileHeight && map[ty2][tx2] === CellType.Wall) {
        map[ty][tx] = CellType.Floor;
        map[ty2][tx2] = CellType.Floor;
        positions.push({ x, y });
        positions.push({ x: tx2, y: ty2 });
        return { x: tx2, y: ty2 };
      }
    }
    return null;
  }
  function shuffle(a) {
    for (let i = a.length - 1; 0 < i; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
  }
});
