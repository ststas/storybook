import { useCallback, useMemo } from 'react';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AXIS_X, AXIS_Y } from './constants.js';
import { getExtremumValues } from './helpers/getExtremumValues.js';
import { getSizes } from './helpers/index.js';
import {
  LineChartAxis,
  LineChartAxisDirection,
  type LineChartAxisOffsetType,
  type LineChartAxisType,
  type LineChartBaseHookType,
  type LineChartCoordinateType,
  type LineChartLineType,
  type LineChartLinearScaleType,
  type LineChartZoomType,
} from './types.js';

type Props = {
  axisOffset: LineChartAxisOffsetType;
  height: number;
  lines: LineChartLineType[];
  width: number;
  xAxis: LineChartAxisType;
  yAxis: LineChartAxisType;
  zoom?: LineChartZoomType;
};

export function useLineChartBase({
  axisOffset,
  height,
  lines,
  width,
  xAxis,
  yAxis,
  zoom,
}: Props): LineChartBaseHookType {
  const { xRange, yRange } = useMemo(
    () => getSizes({ width, height, axisMinimumOffset: axisOffset }),
    [width, height, axisOffset],
  );

  const getXDomain = useCallback(() => {
    if (xAxis.domain) {
      return [xAxis.domain.minValue, xAxis.domain.maxValue];
    }

    return getExtremumValues({
      lines,
      axisDirection: LineChartAxisDirection.X,
      defaultMinDomain: xAxis.defaultMinDomain,
      zoomFactor: zoom?.xZoomFactor,
    });
  }, [lines, xAxis.defaultMinDomain, xAxis.domain, zoom?.xZoomFactor]);

  const getYDomain = useCallback(() => {
    if (yAxis.domain) {
      return [yAxis.domain.minValue, yAxis.domain.maxValue];
    }

    return getExtremumValues({
      lines,
      axisDirection: LineChartAxisDirection.Y,
      defaultMinDomain: yAxis.defaultMinDomain,
      zoomFactor: zoom?.yZoomFactor,
    });
  }, [lines, yAxis.defaultMinDomain, yAxis.domain, zoom?.yZoomFactor]);

  const getScale = useCallback(
    ({
      scaleConfig,
      axisType,
    }: {
      scaleConfig: { range: number[]; domain: number[]; nice: boolean };
      axisType?: LineChartAxis;
    }) => {
      switch (axisType) {
        case LineChartAxis.Time:
          return scaleTime<number>(scaleConfig);
        default:
          return scaleLinear<number>(scaleConfig);
      }
    },
    [],
  );

  const xScale: LineChartLinearScaleType = useMemo(() => {
    const scaleConfig = {
      range: [xRange.left, xRange.right],
      domain: zoom?.zoomDomain?.length
        ? [zoom.zoomDomain[AXIS_X].axisStart, zoom.zoomDomain[AXIS_X].axisEnd]
        : getXDomain(),
      nice: xAxis.nice ?? false,
    };

    return getScale({ scaleConfig, axisType: xAxis.axisType });
  }, [
    getScale,
    getXDomain,
    xAxis.axisType,
    xAxis.nice,
    xRange.left,
    xRange.right,
    zoom,
  ]);

  const yScale = useMemo(() => {
    const scaleConfig = {
      range: [yRange.top, yRange.bottom],
      domain: zoom?.zoomDomain?.length
        ? [zoom.zoomDomain[AXIS_Y].axisStart, zoom.zoomDomain[AXIS_Y].axisEnd]
        : getYDomain(),
      nice: yAxis.nice ?? false,
    };

    return getScale({ scaleConfig, axisType: yAxis.axisType });
  }, [
    yRange.top,
    yRange.bottom,
    zoom,
    getYDomain,
    yAxis.nice,
    yAxis.axisType,
    getScale,
  ]);

  const getXValue = useCallback(
    (coordinate: LineChartCoordinateType): number => {
      return xScale(coordinate.x);
    },
    [xScale],
  );

  const getYValue = useCallback(
    (coordinate: LineChartCoordinateType): number => {
      return yScale(coordinate.y);
    },
    [yScale],
  );

  return useMemo(
    () => ({
      xRange,
      yRange,
      xScale,
      yScale,
      getYValue,
      getXValue,
    }),
    [xRange, yRange, xScale, yScale, getYValue, getXValue],
  );
}
