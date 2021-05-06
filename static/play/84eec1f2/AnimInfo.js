export default class AnimInfo {
  constructor(name, frames, index, delay, looped) {
    this.name = name;
    this.frames = frames;
    this.index = index;
    this.delay = delay;
    this.looped = looped;
  }
}