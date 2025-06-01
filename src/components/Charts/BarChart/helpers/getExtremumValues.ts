import {
  GRAPH_MAX_VALUE_NO_DATA,
  GRAPH_SMALLEST_VALUE,
  SCALE_FACTOR,
} from '../constants.js';
import { type ExtremumValuesParametersType } from '../types.js';

export function getExtremumValues({
  variables,
  axisParams,
}: ExtremumValuesParametersType): [number, number] {
  let minValue: number | null = null;
  let maxValue: number | null = null;

  variables.forEach((variable) => {
    if (variable !== undefined) {
      if (minValue !== null && maxValue !== null) {
        minValue = Math.min(Number(variable.value), minValue);
        maxValue = Math.max(Number(variable.value), maxValue);
      } else {
        minValue = Number(variable.value);
        maxValue = Number(variable.value);
      }
    }
  });

  if (minValue !== null && maxValue !== null) {
    minValue = axisParams?.defaultMinDomain ? GRAPH_SMALLEST_VALUE : minValue;

    const hasLowMaxValue =
      minValue === maxValue && maxValue === GRAPH_SMALLEST_VALUE;

    const maxValueWithScaleFactor = hasLowMaxValue
      ? GRAPH_MAX_VALUE_NO_DATA
      : maxValue * SCALE_FACTOR;

    return [minValue, maxValueWithScaleFactor];
  }

  return [GRAPH_SMALLEST_VALUE, GRAPH_SMALLEST_VALUE];
}
