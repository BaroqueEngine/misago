new p5((p) => {
  const min = 8;
  const length = 2;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent("canvas-container");

    p.noFill();
    p.stroke(200);

    const points = getRandomPoints(100);
    points.forEach((point) => {
      p.circle(point.x, point.y, 4);
    });
  };

  function getRandomPoints(num) {
    const points = [];
    const point = { x: 0, y: 0 };

    for (let i = 0; i < num; i++) {
      point.x += p.random() * length + min;
      point.y += p.random() * length + min;
      points.push({ x: point.x, y: point.y });
    }

    for (let i = 0; i < num; i++) {
      const src = points[i].y;
      const destIndex = p.floor(p.random(num));
      const dest = points[destIndex].y;
      points[i].y = dest;
      points[destIndex].y = src;
    }

    return points;
  }
});