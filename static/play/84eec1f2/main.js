import Anim from "./Anim.js";

new p5((p) => {
  let chip;
  let anim;

  p.preload = () => {
    chip = p.loadImage("0.png");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noSmooth();
    anim = new Anim(100, 100, chip, 30, 15);
    anim.addAnimation(anim, "play", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 1 / 10, true);
    anim.play(anim, "play");
    anim.scale = 6;
  };

  p.draw = () => {
    p.clear();
    anim.update(anim, p);
  };
});