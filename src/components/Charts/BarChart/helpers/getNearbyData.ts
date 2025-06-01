import {
  DEFAULT_DIVISOR,
  GRAPH_SMALLEST_VALUE,
  MARKER_DIAMETER,
} from '../constants.js';
import {
  type BarChartBandScaleType,
  type BarChartCoordinateType,
  type BarChartCoordinateValueFunctionType,
  type BarChartIndicatorMarkerRequiredType,
  type BarChartIndicatorType,
  BarChartIndicators,
  type NearbyDataType,
} from '../types.js';

type DistanceParametersType = {
  indicator: BarChartCoordinateType;
  mouseCoordinates: BarChartCoordinateType;
};

type TypeNearbyDataParameters = {
  mouseCoordinates: BarChartCoordinateType;
  indicators: BarChartIndicatorType[];
  width: number;
  xAxisScale: BarChartBandScaleType;
  getXValue: BarChartCoordinateValueFunctionType;
  getYBarValue: BarChartCoordinateValueFunctionType;
  getYMarkerValue: BarChartCoordinateValueFunctionType;
};

function getDistance({
  indicator,
  mouseCoordinates,
}: DistanceParametersType): number {
  const { x: indicatorXCoordinate, y: indicatorYCoordinate } = indicator;

  const xDistance = mouseCoordinates.x - indicatorXCoordinate;
  const yDistance = mouseCoordinates.y - indicatorYCoordinate;

  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}

export function getNearbyData({
  mouseCoordinates,
  indicators,
  width,
  xAxisScale,
  getXValue,
  getYBarValue,
  getYMarkerValue,
}: TypeNearbyDataParameters): NearbyDataType[] {
  const barWidth = xAxisScale.bandwidth();

  const nearbyBars: NearbyDataType[] = indicators
    .map((indicator) => ({
      data: indicator[BarChartIndicators.Bar],
      type: BarChartIndicators.Bar,
      color: indicator.theme.color,
      x: getXValue(indicator.bar) ?? GRAPH_SMALLEST_VALUE,
      y: getYBarValue(indicator.bar) ?? GRAPH_SMALLEST_VALUE,
    }))
    .filter(
      (barCoordinates) =>
        mouseCoordinates.x > barCoordinates.x &&
        mouseCoordinates.x < barCoordinates.x + barWidth &&
        mouseCoordinates.y > barCoordinates.y &&
        mouseCoordinates.y < width,
    );

  const nearbyMarkers: NearbyDataType[] = indicators
    .filter((indicator): indicator is BarChartIndicatorMarkerRequiredType =>
      Boolean(indicator.marker),
    )
    .map((indicator) => ({
      data: indicator[BarChartIndicators.Marker],
      type: BarChartIndicators.Marker,
      color: indicator.theme.color,
      x:
        (getXValue(indicator.marker) ?? GRAPH_SMALLEST_VALUE) +
        barWidth / DEFAULT_DIVISOR,
      y: getYMarkerValue(indicator.marker) ?? GRAPH_SMALLEST_VALUE,
    }))
    .filter(
      (indicator) =>
        getDistance({ indicator, mouseCoordinates }) <
        MARKER_DIAMETER / DEFAULT_DIVISOR,
    );

  const result = [...nearbyBars, ...nearbyMarkers].sort(
    (indicatorA, indicatorB) =>
      getDistance({
        mouseCoordinates,
        indicator: indicatorA,
      }) -
      getDistance({
        mouseCoordinates,
        indicator: indicatorB,
      }),
  );

  return result;
}
