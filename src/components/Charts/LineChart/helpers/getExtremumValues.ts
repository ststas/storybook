import { DECIMAL_ROUNDING, GRAPH_SMALLEST_VALUE } from '../constants.js';
import {
  type LineChartAxisDirection,
  type LineChartLineType,
} from '../types.js';

type ExtremumValuesParametersType = {
  lines: LineChartLineType[];
  axisDirection: LineChartAxisDirection;
  defaultMinDomain?: boolean;
  zoomFactor?: number;
};

export function getExtremumValues({
  lines,
  axisDirection,
  defaultMinDomain,
  zoomFactor,
}: ExtremumValuesParametersType): number[] {
  let minValue: number | null = null;
  let maxValue: number | null = null;

  lines.forEach((line) => {
    line.coordinates.forEach((coordinate) => {
      if (minValue !== null && maxValue !== null) {
        minValue = Math.min(Number(coordinate[axisDirection]), minValue);
        maxValue = Math.max(Number(coordinate[axisDirection]), maxValue);
      } else {
        minValue = Number(coordinate[axisDirection]);
        maxValue = Number(coordinate[axisDirection]);
      }
    });
  });

  if (minValue !== null && maxValue !== null) {
    return [
      defaultMinDomain ? GRAPH_SMALLEST_VALUE : minValue,
      zoomFactor
        ? Number((maxValue * zoomFactor).toFixed(DECIMAL_ROUNDING))
        : maxValue,
    ];
  }

  return [GRAPH_SMALLEST_VALUE, GRAPH_SMALLEST_VALUE];
}
