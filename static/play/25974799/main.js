new p5((p) => {
  function line(x1, y1, x2, y2) {
    const rad0 = p.random(p.TWO_PI);
    const rad1 = p.random(p.TWO_PI);
    const r = 10;
    const r0 = p.random(r);
    const r1 = p.random(r);
    const tx1 = x1 + Math.cos(rad0) * r0;
    const ty1 = y1 + Math.sin(rad0) * r0;
    const tx4 = x2 + Math.cos(rad1) * r1;
    const ty4 = y2 + Math.sin(rad1) * r1;
    const dx = tx4 - tx1;
    const dy = ty4 - ty1;
    const d = p.dist(tx1, ty1, tx4, ty4);
    const rad2 = p.atan2(dy, dx) + p.random(0, 0.1) - 0.05;
    const tx2 = p.lerp(tx1, tx1 + Math.cos(rad2) * d, 0.5);
    const ty2 = p.lerp(ty1, ty1 + Math.sin(rad2) * d, 0.5);
    const tx3 = p.lerp(tx1, tx1 + Math.cos(rad2) * d, 0.75);
    const ty3 = p.lerp(ty1, ty1 + Math.sin(rad2) * d, 0.75);
    p.strokeWeight(p.random(4, 7));
    p.bezier(tx1, ty1, tx2, ty2, tx3, ty3, tx4, ty4);
  }
  function rect(x, y, width, height) {
    line(x, y, x + width, y);
    line(x, y, x, y + height);
    line(x + width, y, x + width, y + height);
    line(x, y + height, x + width, y + height);
  }
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent(
      "canvas-container"
    );
    p.noFill();
    p.stroke("#ff9900");
    reset();
  };
  function reset() {
    p.clear();
    rect(200, 200, 200, 200);
  }
  p.mouseClicked = () => {
    reset();
  };
});
