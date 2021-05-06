import * as p5 from "p5";
import AnimInfo from "./AnimInfo";

export default class Anim {
  public x: number;
  public y: number;
  public scale: number;
  public curAnimInfo: AnimInfo;
  public animInfoGroup: AnimInfo[];
  public finished: boolean;
  public time: number;
  public chipWidth: number;
  public chipHeight: number;
  public chipXNum: number;
  public image: p5.Image;

  constructor(x: number, y: number, image: p5.Image, chipWidth: number, chipHeight: number) {
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

  public addAnimation(anim: Anim, name: string, frames: number[], delay: number, looped: boolean): void {
    anim.animInfoGroup.push(new AnimInfo(name, frames, 0, delay, looped));
  }

  public play(anim: Anim, name: string): void {
    anim.animInfoGroup.forEach((animInfo) => {
      if (animInfo.name === name) {
        anim.curAnimInfo = animInfo;
        anim.finished = false;
        anim.time = 0.0;
      }
    });
  }

  public update(anim: Anim, p: p5): void {
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
        } else {
          anim.curAnimInfo.index++;
        }
      }
    }
  }
}
