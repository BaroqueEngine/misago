export default class AnimInfo {
  public name: string;
  public frames: number[];
  public index: number;
  public delay: number;
  public looped: boolean;

  constructor(name: string, frames: number[], index: number, delay: number, looped: boolean) {
    this.name = name;
    this.frames = frames;
    this.index = index;
    this.delay = delay;
    this.looped = looped;
  }
}
