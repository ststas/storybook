export function calculateZoomDomain(
  axisStart: number,
  axisEnd: number,
  zoomFactorScale: number,
): { axisStart: number; axisEnd: number } | null {
  const decreasedEnd = axisEnd - axisEnd * zoomFactorScale;

  if (decreasedEnd - axisStart < zoomFactorScale) {
    return null;
  }

  return {
    axisStart,
    axisEnd: decreasedEnd,
  };
}