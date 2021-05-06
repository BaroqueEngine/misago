new p5((p) => {
  const colors = {
    none: [0x1a, 0x1a, 0x1a, 0xff],
    wall: [0x4e, 0x4a, 0x4e, 0xff],
    sand: [0xd2, 0x7d, 0x2c, 0xff],
  };
  let canvas;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent("canvas-container");
    p.noSmooth();
    p.frameRate(60);
    canvas = p.createImage(500, 500);
    fill(colors.none);
  };
  p.mouseDragged = () => {
    fillRect(p.mouseX, p.mouseY, 10, 10, colors.wall);
  };
  p.draw = () => {
    canvas.loadPixels();
    const fromX = Math.floor(canvas.width / 3);
    const toX = Math.floor((canvas.width / 3) * 2);
    for (let x = fromX; x <= toX; x++) {
      if (p.random() < 0.1) {
        setPixel(x, 0, colors.sand);
      }
    }
    for (let x = 0; x < canvas.width; x++) {
      for (let y = canvas.height - 1; 0 <= y; y--) {
        fall(x, y);
      }
    }
    canvas.updatePixels();
    p.image(canvas, 0, 0, canvas.width, canvas.height);
  };
  function fill(color) {
    fillRect(0, 0, canvas.width, canvas.height, color);
  }
  function fillRect(x, y, width, height, color) {
    canvas.loadPixels();
    for (let tx = x; tx < x + width; tx++) {
      for (let ty = y; ty < y + height; ty++) {
        setPixel(tx, ty, color);
      }
    }
    canvas.updatePixels();
    p.image(canvas, 0, 0, canvas.width, canvas.height);
  }
  function fall(x, y) {
    const cur = getPixel(x, y);
    if (!colorCompare(cur, colors.sand)) {
      return;
    }
    if (canvas.height - 1 <= y) {
      setPixel(x, y, colors.none);
    } else if (colorCompare(getPixel(x, y + 1), colors.none)) {
      setPixel(x, y + 1, cur);
      setPixel(x, y, colors.none);
    } else {
      const tx = x + p.floor(p.random(3, 4));
      if (colorCompare(getPixel(tx, y), colors.none)) {
        setPixel(x, y, colors.none);
        setPixel(tx, y, colors.sand);
      }
    }
  }
  function colorCompare(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }
  function getPixel(x, y) {
    const i = (y * canvas.width + x) * 4;
    return [canvas.pixels[i], canvas.pixels[i + 1], canvas.pixels[i + 2], canvas.pixels[i + 3]];
  }
  function setPixel(x, y, color) {
    const i = (y * canvas.width + x) * 4;
    canvas.pixels[i + 0] = color[0];
    canvas.pixels[i + 1] = color[1];
    canvas.pixels[i + 2] = color[2];
    canvas.pixels[i + 3] = color[3];
  }
});
