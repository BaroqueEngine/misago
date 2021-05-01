function getDistance(x0: number, y0: number, x1: number, y1: number, width: number, height: number): number {
  const minX = Math.min(x0, x1);
  const maxX = Math.max(x0, x1);
  const minY = Math.min(y0, y1);
  const maxY = Math.max(y0, y1);

  const dx = Math.min(maxX - minX, minX + width - maxX);
  const dy = Math.min(maxY - minY, minY + height - maxY);

  return Math.sqrt(dx * dx + dy * dy);
}
