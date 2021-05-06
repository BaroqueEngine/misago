const CellType = {
  sea: "sea",
  land: "land",
};
new p5((p) => {
  const tileWidth = 128;
  const tileHeight = 64;
  const iterations = 40000;
  const tileSize = 5;
  const fillProbability = 0.4;
  let map;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent("canvas-container");
    initMap();
    for (let i = 0; i < iterations; i++) {
      generateMap();
    }
    p.strokeWeight(1);
    for (let y = 0; y < tileHeight; y++) {
      for (let x = 0; x < tileWidth; x++) {
        if (map[y][x] === CellType.sea) {
          p.fill("#4977bc");
          p.rect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
      }
    }
  };
  function initMap() {
    map = [];
    for (let y = 0; y < tileHeight; y++) {
      map[y] = [];
      for (let x = 0; x < tileWidth; x++) {
        map[y][x] = p.random(1.0) < fillProbability ? CellType.land : CellType.sea;
      }
    }
  }
  function generateMap() {
    const tx = p.floor(p.random(tileWidth));
    const ty = p.floor(p.random(tileHeight));
    map[ty][tx] = 4 < getNeighborSeaCount(tx, ty) ? CellType.sea : CellType.land;
  }
  function getNeighborSeaCount(x, y) {
    let count = 0;
    for (let ty = y - 1; ty <= y + 1; ty++) {
      for (let tx = x - 1; tx <= x + 1; tx++) {
        if (isSea(tx, ty)) {
          count++;
        }
      }
    }
    return count;
  }
  function onBoard(x, y) {
    return 0 <= x && x < tileWidth && 0 <= y && y < tileHeight;
  }
  function isSea(x, y) {
    return onBoard(x, y) && map[y][x] === CellType.sea;
  }
});
