import AnimInfo from "./AnimInfo.js";

export default class Anim {
  constructor(x, y, image, chipWidth, chipHeight) {
    this.x = x;
    this.y = y;
    this.scale = 1;
    this.curAnimInfo = undefined;
    this.animInfoGroup = [];
    this.finished = false;
    this.time = 0;
    this.chipWidth = chipWidth;
    this.chipHeight = chipHeight;
    this.chipXNum = Math.floor(image.width / chipWidth);
    this.image = image;
  }

  addAnimation(anim, name, frames, delay, looped) {
    anim.animInfoGroup.push(new AnimInfo(name, frames, 0, delay, looped));
  }

  play(anim, name) {
    anim.animInfoGroup.forEach((animInfo) => {
      if (animInfo.name === name) {
        anim.curAnimInfo = animInfo;
        anim.finished = false;
        anim.time = 0.0;
      }
    });
  }

  update(anim, p) {
    const frame = anim.curAnimInfo.frames[anim.curAnimInfo.index];
    const tx = p.floor(frame % anim.chipXNum);
    const ty = p.floor(frame / anim.chipXNum);
    p.copy(anim.image, tx * anim.chipWidth, ty * anim.chipHeight, anim.chipWidth, anim.chipHeight, anim.x, anim.y, anim.chipWidth * anim.scale, anim.chipHeight * anim.scale);
    if (anim.curAnimInfo && anim.curAnimInfo.delay > 0 && (anim.curAnimInfo.looped || !anim.finished)) {
      anim.time += 1 / 60;
      while (anim.time > anim.curAnimInfo.delay) {
        anim.time -= anim.curAnimInfo.delay;
        if (anim.curAnimInfo.index >= anim.curAnimInfo.frames.length - 1) {
          anim.finished = true;
          if (anim.curAnimInfo.looped) {
            anim.curAnimInfo.index = 0;
          }
        }
        else {
          anim.curAnimInfo.index++;
        }
      }
    }
  }
}