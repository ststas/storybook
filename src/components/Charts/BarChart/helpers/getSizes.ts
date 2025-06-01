import { type BarChartAxisOffsetType } from '../types.js';

type SizesParametersType = {
  width: number;
  height: number;
  axisMinimumOffset: BarChartAxisOffsetType;
};

export function getSizes({
  width,
  height,
  axisMinimumOffset,
}: SizesParametersType): string {
  const { left, right, top, bottom } = axisMinimumOffset;

  const viewBoxWidth = width * (width / (width - left - right));
  const viewBoxHeight = height * (height / (height - bottom - top));

  const minX = (width - viewBoxWidth) * (left / (left + right));
  const minY = (height - viewBoxHeight) * (top / (bottom + top));

  return `${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`;
}
