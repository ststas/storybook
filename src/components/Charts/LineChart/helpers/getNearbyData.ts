import { type Point } from '@visx/point';
import {
  GRAPH_SMALLEST_VALUE,
  SUITABLE_DISTANCE_LENGTH,
} from '../constants.js';
import {
  type LineChartAxisOffsetType,
  type LineChartCoordinateType,
  type LineChartLineType,
  type LineChartLinearScaleType,
} from '../types.js';

type DistanceParametersType = {
  axisOffset: LineChartAxisOffsetType;
  markerCoordinates: LineChartCoordinateType;
  mouseCoordinates: Point;
  xScale: LineChartLinearScaleType;
};

type TypeNearbyDataParameters = {
  axisOffset: LineChartAxisOffsetType;
  lines: LineChartLineType[];
  mouseCoordinates: Point;
  xScale: LineChartLinearScaleType;
};

function getDistance({
  axisOffset,
  markerCoordinates,
  mouseCoordinates,
  xScale,
}: DistanceParametersType): number {
  const markerXCoordinate = xScale(markerCoordinates.x) ?? GRAPH_SMALLEST_VALUE;

  const xDistance = mouseCoordinates.x - axisOffset.left - markerXCoordinate;

  return Math.sqrt(Math.abs(xDistance));
}

export function getNearbyData({
  axisOffset,
  mouseCoordinates,
  lines,
  xScale,
}: TypeNearbyDataParameters): LineChartCoordinateType[] {
  const distanceArguments = {
    axisOffset,
    mouseCoordinates,
    xScale,
  };

  return lines
    .reduce(
      (acc, line) => acc.concat(line.coordinates),
      [] as LineChartCoordinateType[],
    )
    .filter((markerCoordinates) => {
      return (
        getDistance({ ...distanceArguments, markerCoordinates }) <
        SUITABLE_DISTANCE_LENGTH
      );
    })
    .sort((markerCoordinatesA, markerCoordinatesB) => {
      return (
        getDistance({
          ...distanceArguments,
          markerCoordinates: markerCoordinatesA,
        }) -
        getDistance({
          ...distanceArguments,
          markerCoordinates: markerCoordinatesB,
        })
      );
    });
}
