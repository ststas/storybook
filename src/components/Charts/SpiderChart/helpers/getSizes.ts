import { RADIUS_DIVISOR } from '../constants.js';
import { type SpiderChartAxisOffsetType } from '../types.js';

type SizesParametersType = {
  width: number;
  height: number;
  axisMinimumOffset: SpiderChartAxisOffsetType;
};

type SizesResultType = {
  viewBox: string;
  radius: number;
};

export function getSizes({
  width,
  height,
  axisMinimumOffset,
}: SizesParametersType): SizesResultType {
  const { left, right, top, bottom } = axisMinimumOffset;
  const radius =
    Math.min(width - left - right, height - top - bottom) / RADIUS_DIVISOR;

  return {
    radius,
    viewBox: `${0} ${0} ${width} ${height}`,
  };
}
