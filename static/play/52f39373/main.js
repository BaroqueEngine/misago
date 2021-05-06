const CellType = {
  alive: "alive",
  dead: "dead",
};
new p5((p) => {
  const color = {
    stroke: "#000",
    fill: "#009ad6",
  };
  const cellWidth = 60;
  const cellHeight = 40;
  const cellSize = 10;
  let board;
  let drawBoard;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent("canvas-container");
    board = [];
    drawBoard = [];
    for (let i = 0; i < cellWidth * cellHeight; i++) {
      board[i] = drawBoard[i] = p.random(0, 100) < 50 ? CellType.alive : CellType.dead;
    }
    p.stroke(color.stroke);
  };
  p.draw = () => {
    for (let i = 0; i < cellWidth * cellHeight; i++) {
      const x = i % cellWidth;
      const y = Math.floor(i / cellWidth);
      let aliveCellNum = 0;
      for (let yy = -1; yy <= 1; yy++) {
        for (let xx = -1; xx <= 1; xx++) {
          if (xx === 0 && yy === 0) {
            continue;
          }
          const tx = x + xx;
          const ty = y + yy;
          if (tx < 0 || cellWidth <= tx || ty < 0 || cellHeight <= ty) {
            continue;
          }
          const ti = ty * cellWidth + tx;
          if (board[ti] === CellType.alive) {
            aliveCellNum++;
          }
        }
      }
      if (board[i] === CellType.dead) {
        if (aliveCellNum === 3) {
          drawBoard[i] = CellType.alive;
        }
      } else {
        if (aliveCellNum === 2 || aliveCellNum === 3) {
          drawBoard[i] = CellType.alive;
        } else {
          drawBoard[i] = CellType.dead;
        }
      }
    }
    p.clear();
    for (let y = 0; y < cellHeight; y++) {
      for (let x = 0; x < cellWidth; x++) {
        const index = y * cellWidth + x;
        p.noFill();
        if (drawBoard[index] === CellType.alive) {
          p.fill(color.fill);
        }
        const tx = x * cellSize;
        const ty = y * cellSize;
        p.rect(tx, ty, cellSize, cellSize);
      }
    }
    board = drawBoard.slice();
  };
});
