const Cell = {
  floor: "floor",
  wall: "wall",
};

new p5((p) => {
  const tileWidth = 55;
  const tileHeight = 18;
  const tileSize = 10;
  const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];
  const colors = {
    visited: "#1c8b94",
    routes: "#de980f",
    startGoal: "#cd3830",
    wall: "#757161",
  };
  const mapString = `
#######################################################
#_____________________________________________________#
#_________________________#___________________________#
#_________________________#___________________________#
#_________________________#___________________________#
#_________________________#___________________________#
#_________________________#___________________________#
#_________________________#______________E____________#
#___________S_____________#___________________________#
#_________________________#___________________________#
#_________________________#___________________________#
#_________________________#___________________________#
#_________________________#___________________________#
#_________________________#___________________________#
#_________________________#___________________________#
#_________________________#___________________________#
#_____________________________________________________#
#######################################################
`;

  let map;
  let start;
  let goal;
  let nexts;
  let visited;
  let prevs;
  let routes;
  let isPlaying;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent("canvas-container");

    parseStringMap();

    visited = [];
    nexts = [{ x: start.x, y: start.y }];
    prevs = [];

    while (0 < nexts.length) {
      const cur = nexts.shift();
      visited.push({ x: cur.x, y: cur.y });
      if (isGoal(cur.x, cur.y)) {
        break;
      }

      const dirs = directions.slice();
      for (const dir of dirs) {
        const tx = cur.x + dir.x;
        const ty = cur.y + dir.y;
        if (isFloor(tx, ty) && !checkVisited(tx, ty) && !checkNexts(tx, ty)) {
          prevs[ty * tileWidth + tx] = { x: cur.x, y: cur.y };
          nexts.push({ x: tx, y: ty });
        }
      }
    }

    routes = [];
    const cur = { x: goal.x, y: goal.y };
    while (true) {
      routes.unshift({ x: cur.x, y: cur.y });
      if (cur.x === start.x && cur.y === start.y) {
        break;
      }
      const index = cur.y * tileWidth + cur.x;
      const prev = prevs[index];
      cur.x = prev.x;
      cur.y = prev.y;
    }

    initFill();
    const color = colors.startGoal;
    fill(start.x, start.y, color);
    fill(goal.x, goal.y, color);
    isPlaying = true;
  };

  p.draw = () => {
    if (isPlaying) {
      if (visited.length > 0) {
        const cur = visited.shift();
        if (isStart(cur.x, cur.y) || isGoal(cur.x, cur.y)) {
          return;
        }
        fill(cur.x, cur.y, colors.visited);
      }
      else if (routes.length > 0) {
        const cur = routes.shift();
        if (isStart(cur.x, cur.y) || isGoal(cur.x, cur.y)) {
          return;
        }
        fill(cur.x, cur.y, colors.routes);
      }
    }
  };

  function parseStringMap() {
    map = mapString
      .replace(/\s/g, "")
      .split("")
      .map((value, i) => {
        switch (value) {
          case "_":
            return Cell.floor;
          case "S":
            start = indexToXY(i);
            return Cell.floor;
          case "E":
            goal = indexToXY(i);
            return Cell.floor;
          default:
            return Cell.wall;
        }
      });
  }

  function indexToXY(index) {
    const x = index % tileWidth;
    const y = Math.floor(index / tileWidth);
    return { x, y };
  }

  function checkNexts(x, y) {
    for (let i = 0; i < nexts.length; i++) {
      const s = nexts[i];
      if (s.x === x && s.y === y) {
        return true;
      }
    }
    return false;
  }

  function checkVisited(x, y) {
    for (let i = 0; i < visited.length; i++) {
      const s = visited[i];
      if (s.x === x && s.y === y) {
        return true;
      }
    }
    return false;
  }

  function isStart(x, y) {
    return x === start.x && y === start.y;
  }

  function isGoal(x, y) {
    return x === goal.x && y === goal.y;
  }

  function isFloor(x, y) {
    if (0 <= x && x < tileWidth && 0 <= y && y < tileHeight) {
      return getTile(x, y) === Cell.floor;
    }
    return false;
  }

  function getTile(x, y) {
    return map[y * tileWidth + x];
  }

  function initFill() {
    p.clear();
    p.strokeWeight(1);
    for (let y = 0; y < tileHeight; y++) {
      for (let x = 0; x < tileWidth; x++) {
        const tile = getTile(x, y);
        if (tile === Cell.wall) {
          fill(x, y, colors.wall);
        }
      }
    }
  }

  function fill(x, y, color) {
    p.fill(color);
    const tx = x * tileSize;
    const ty = y * tileSize;
    p.rect(tx, ty, tileSize, tileSize);
  }
});