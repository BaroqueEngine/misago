export type Rectangle = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export function init(left: number = 0, top: number = 0, right: number = 0, bottom: number = 0) {
  return { left, top, right, bottom };
}

export function width(rect: Rectangle): number {
  return rect.right - rect.left + 1;
}

export function height(rect: Rectangle): number {
  return rect.bottom - rect.top + 1;
}
