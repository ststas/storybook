import { useMemo } from 'react';
import { Point } from '@visx/point';
import { scaleLinear } from '@visx/scale';
import { DEGREES_360, THREE, TWO } from './constants.js';
import {
  getAngles,
  getLabelsPoints,
  getPoints,
  getSizes,
} from './helpers/index.js';
import {
  type SpiderChartAxisOffsetType,
  type SpiderChartBaseHookType,
  type SpiderChartDataType,
} from './types.js';

type Props = {
  axisOffset: SpiderChartAxisOffsetType;
  data: SpiderChartDataType;
  height: number;
  width: number;
};

const radialScale = scaleLinear({
  range: [0, Math.PI * TWO],
  domain: [0, DEGREES_360],
});

export function useSpiderChartBase({
  axisOffset,
  data,
  height,
  width,
}: Props): SpiderChartBaseHookType {
  const { radius, viewBox } = useMemo(
    () => getSizes({ axisMinimumOffset: axisOffset, height, width }),
    [width, height, axisOffset],
  );

  const minValueOfCoordinates = useMemo(() => {
    return Math.min(
      ...data.sets.flatMap((set) => Object.values(set.coordinates)),
    );
  }, [data.sets]);

  const maxValueOfCoordinates = useMemo(() => {
    return Math.max(
      ...data.sets.flatMap((set) => Object.values(set.coordinates)),
    );
  }, [data.sets]);

  const levels = useMemo(() => {
    const result = Math.min(
      ...data.sets.map((set) => Object.keys(set.coordinates).length),
    );

    if (result <= TWO) {
      return THREE;
    }

    return result;
  }, [data.sets]);

  const levelsArray = useMemo(() => Array.from(Array(levels).keys()), [levels]);

  const absMinValue = Math.abs(minValueOfCoordinates);
  const absMaxValue = Math.abs(maxValueOfCoordinates);

  const domainStartValue = useMemo(() => {
    if (minValueOfCoordinates === 0) {
      return -maxValueOfCoordinates / (levels - 1);
    }

    if (minValueOfCoordinates > 0) {
      return 0;
    }

    return minValueOfCoordinates;
  }, [levels, maxValueOfCoordinates, minValueOfCoordinates]);

  const domainEndValue = useMemo(() => {
    if (maxValueOfCoordinates <= 0) {
      return 0;
    }

    return absMaxValue;
  }, [absMaxValue, maxValueOfCoordinates]);

  const domainLabelEndValue = useMemo(() => {
    if (absMinValue >= absMaxValue) {
      return absMinValue;
    }

    return absMaxValue;
  }, [absMaxValue, absMinValue]);

  const isZeroHidden = Boolean(
    minValueOfCoordinates <= 0 && maxValueOfCoordinates <= 0,
  );

  const points = useMemo(() => getPoints(levels, radius), [levels, radius]);
  const zeroPoint = useMemo(() => new Point({ x: 0, y: 0 }), []);
  const webs = useMemo(() => getAngles(levels), [levels]);

  const yScale = useMemo(() => {
    const scaleConfig = {
      range: [0, radius],
      domain: [domainStartValue, domainEndValue],
    };

    return scaleLinear(scaleConfig);
  }, [radius, domainStartValue, domainEndValue]);

  const yScaleReversed = useMemo(() => {
    const scaleConfig = {
      range: [0, radius],
      domain: [domainEndValue, domainStartValue],
    };

    return scaleLinear(scaleConfig);
  }, [radius, domainEndValue, domainStartValue]);

  const labelScale = useMemo(() => {
    const scaleConfig = {
      range: [0, radius],
      domain: [domainStartValue, domainLabelEndValue],
    };

    return scaleLinear(scaleConfig);
  }, [radius, domainStartValue, domainLabelEndValue]);

  const labelsPoints = useMemo(
    () =>
      getLabelsPoints({
        maxValue: maxValueOfCoordinates,
        minValue: minValueOfCoordinates,
        radius,
        variables: data.variables,
        yScale: labelScale,
      }),
    [
      data.variables,
      maxValueOfCoordinates,
      minValueOfCoordinates,
      radius,
      labelScale,
    ],
  );

  return useMemo(
    () => ({
      isZeroHidden,
      labelsPoints,
      labelScale,
      levels,
      levelsArray,
      maxValueOfCoordinates,
      minValueOfCoordinates,
      points,
      radialScale,
      radius,
      viewBox,
      webs,
      yScale,
      yScaleReversed,
      zeroPoint,
    }),
    [
      isZeroHidden,
      labelsPoints,
      labelScale,
      levels,
      levelsArray,
      maxValueOfCoordinates,
      minValueOfCoordinates,
      points,
      radius,
      viewBox,
      webs,
      yScale,
      yScaleReversed,
      zeroPoint,
    ],
  );
}
