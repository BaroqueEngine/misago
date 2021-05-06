new p5((p) => {
  const cellSize = 10;
  const cellWall = "#000000ff";
  const cellNone = "#00000000";
  const dirs = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
  ];
  let board;
  let mapImage;
  let cellWidth;
  let cellHeight;
  p.preload = () => {
    mapImage = p.loadImage("map.png");
  };
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent("canvas-container");
    mapImage.loadPixels();
    cellWidth = mapImage.width;
    cellHeight = mapImage.height;
    board = [];
    for (let i = 0; i < cellWidth * cellHeight; i++) {
      const tx = i % cellWidth;
      const ty = Math.floor(i / cellWidth);
      const pixel = mapImage.get(tx, ty);
      board[i] = p.color(pixel[0], pixel[1], pixel[2], pixel[3]).toString("#rrggbbaa");
    }
  };
  p.draw = () => {
    const temp = board.slice();
    for (let i = 0; i < cellWidth * cellHeight; i++) {
      const x = i % cellWidth;
      const y = Math.floor(i / cellWidth);
      if (isWall(x, y) || isNone(x, y)) {
        continue;
      }
      const dir = dirs[Math.floor(Math.random() * dirs.length)];
      const tx = x + dir.x;
      const ty = y + dir.y;
      if (isWall(tx, ty)) {
        continue;
      }
      const fi = y * cellWidth + x;
      const ti = ty * cellWidth + tx;
      temp[fi] = board[ti];
    }
    board = temp.slice();
    p.clear();
    for (let i = 0; i < cellWidth * cellHeight; i++) {
      const x = i % cellWidth;
      const y = Math.floor(i / cellWidth);
      p.fill(board[i]);
      p.rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  };
  function isWall(x, y) {
    const i = y * cellWidth + x;
    return board[i] === cellWall;
  }
  function isNone(x, y) {
    const i = y * cellWidth + x;
    return board[i] === cellNone;
  }
});
