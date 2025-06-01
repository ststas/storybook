import { type LineChartAxisOffsetType } from '../types.js';

type TypeSizesParameters = {
  width: number;
  height: number;
  axisMinimumOffset: LineChartAxisOffsetType;
};

type SizesResultType = {
  xRange: { left: number; right: number };
  yRange: { top: number; bottom: number };
};

export function getSizes({
  width,
  height,
  axisMinimumOffset,
}: TypeSizesParameters): SizesResultType {
  const { left, right, top, bottom } = axisMinimumOffset;

  return {
    xRange: {
      left: 0,
      right: Math.abs(width - left - right),
    },
    yRange: {
      top: Math.abs(height - bottom - top),
      bottom: 0,
    },
  };
}
