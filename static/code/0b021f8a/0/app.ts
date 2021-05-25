import * as p5 from "p5";

type Point = { x: number; y: number };

const Cell = {
  Floor: "floor",
  Wall: "wall",
} as const;
type Cell = typeof Cell[keyof typeof Cell];

new p5((p: p5) => {
  const INF = 1000000000;
  const W = 27;
  const H = 27;
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
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

  let map: Cell[];
  let sx: number, sy: number;
  let gx: number, gy: number;
  let nexts: Point[];
  let prevs: Point[];
  let dist: number[][];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    parseStringMap();

    nexts = [{ x: sx, y: sy }];
    prevs = [];
    dist = [];
    for (let y = 0; y < H; y++) {
      dist[y] = new Array(W).fill(INF);
    }
    dist[sy][sx] = 0;

    while (0 < nexts.length) {
      const next = nexts.pop();
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

    let routes: Point[] = [];
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

    console.log(routes);
  };

  function parseStringMap(): void {
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

  function getTile(x: number, y: number): Cell {
    return map[y * W + x];
  }
});
