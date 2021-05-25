const Cell = {
  Floor: "floor",
  Wall: "wall",
};
new p5((p) => {
  const INF = 1000000000;
  const W = 27;
  const H = 27;
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  const tileSize = 10;
  const colors = {
    visited: "#1c8b94",
    routes: "#de980f",
    startGoal: "#cd3830",
    wall: "#757161",
  };
  const mapString = `
  ###########################
  #############S#############
  #############_#############
  #############_#############
  #############_#############
  #############_#############
  #G________________________#
  #############_#############
  ###########_____###########
  ##########__#_#__##########
  #########__##_##__#########
  ########__###_###__########
  #######__####_####__#######
  ######__#####_#####__######
  #####__######_######__#####
  ####__#######_#######__####
  ###__########_########__###
  ##__#########_#########__##
  #__##########_##########__#
  #############_#############
  #############_#############
  #############_#############
  #############_#############
  #############_#############
  #############_#############
  #############_#############
  ###########################
  `;
  let map;
  let sx, sy;
  let gx, gy;
  let nexts;
  let dist;
  let prevs;
  let visited;
  let routes;
  let isPlaying;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    parseStringMap();
    nexts = [{ x: sx, y: sy }];
    prevs = [];
    visited = [];
    dist = [];
    for (let y = 0; y < H; y++) {
      dist[y] = new Array(W).fill(INF);
    }
    dist[sy][sx] = 0;
    while (0 < nexts.length) {
      const next = nexts.pop();
      visited.push(next);
      const [cx, cy] = [next.x, next.y];
      if (cx == gx && cy == gy) break;
      for (let i = 0; i < 4; i++) {
        const tx = cx + dx[i];
        const ty = cy + dy[i];
        if (!(0 <= tx && tx < W && 0 <= ty && ty < H)) continue;
        if (getTile(tx, ty) != Cell.Floor) continue;
        if (dist[ty][tx] != INF) continue;
        dist[ty][tx] = dist[cy][cx] + 1;
        nexts.push({ x: tx, y: ty });
        prevs[ty * W + tx] = { x: cx, y: cy };
      }
    }
    routes = [];
    let cx = gx;
    let cy = gy;
    while (true) {
      routes.unshift({ x: cx, y: cy });
      if (cx === sx && cy === sy) {
        break;
      }
      const index = cy * W + cx;
      const prev = prevs[index];
      cx = prev.x;
      cy = prev.y;
    }
    initFill();
    const color = colors.startGoal;
    fill(sx, sy, color);
    fill(gx, gy, color);
    isPlaying = true;
  };
  p.draw = () => {
    if (isPlaying) {
      if (visited.length > 0) {
        const cur = visited.shift();
        const [cx, cy] = [cur.x, cur.y];
        if ((cx == sx && cy == sy) || (cx == gx && cy == gy)) {
          return;
        }
        fill(cx, cy, colors.visited);
      } else if (routes.length > 0) {
        const cur = routes.shift();
        const [cx, cy] = [cur.x, cur.y];
        if ((cx == sx && cy == sy) || (cx == gx && cy == gy)) {
          return;
        }
        fill(cx, cy, colors.routes);
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
            return Cell.Floor;
          case "S":
            sx = i % W;
            sy = Math.floor(i / W);
            return Cell.Floor;
          case "G":
            gx = i % W;
            gy = Math.floor(i / W);
            return Cell.Floor;
          default:
            return Cell.Wall;
        }
      });
  }
  function getTile(x, y) {
    return map[y * W + x];
  }
  function initFill() {
    p.clear();
    p.strokeWeight(1);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const tile = getTile(x, y);
        if (tile === Cell.Wall) {
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
