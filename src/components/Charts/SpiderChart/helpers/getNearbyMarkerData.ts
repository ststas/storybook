import { type Point } from '@visx/point';
import { MARKER_SUITABLE_DISTANCE_LENGTH, TWO } from '../constants.js';
import {
  type SpiderChartDataType,
  type SpiderChartLabelPointType,
  type SpiderChartMarkerPointType,
  type SpiderChartScaleLinearType,
  type SpiderChartTooltipDataType,
} from '../types.js';
import { getPolygonPoints } from './index.js';

type SpiderChartMarkerType = {
  id: string;
  index: number;
  setId: string;
  x: number;
  y: number;
};

type MarkerNearbyDataParametersType = {
  data: SpiderChartDataType;
  height: number;
  mouseCoordinates: Point;
  width: number;
  yScale: SpiderChartScaleLinearType;
};

type MarkersDistanceParametersType = {
  coordinate: SpiderChartLabelPointType | SpiderChartMarkerPointType;
  height: number;
  mouseCoordinates: Point;
  width: number;
};

function getMarkerDistance({
  coordinate,
  height,
  mouseCoordinates,
  width,
}: MarkersDistanceParametersType): number {
  const mouseCoordinateX = mouseCoordinates.x - width / TWO;
  const mouseCoordinateY = mouseCoordinates.y - height / TWO;

  const xDistance = mouseCoordinateX - coordinate.x;
  const yDistance = mouseCoordinateY - coordinate.y;

  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}

function getMarkerDataSet(
  markerCoordinatesSet: SpiderChartMarkerType[],
  data: SpiderChartDataType,
): SpiderChartTooltipDataType[] {
  const result: SpiderChartTooltipDataType[] = [];

  if (markerCoordinatesSet.length !== 0 || data.sets.length !== 0) {
    for (const marker of markerCoordinatesSet) {
      const dataSet = data.sets.find((set) => set.id === marker.setId);
      const variablesSet = data.variables.find((item) => item.id === marker.id);

      if (!variablesSet || !dataSet) {
        continue;
      }

      const value = dataSet.coordinates[marker.id];

      if (typeof value === 'number') {
        result.push({
          color: dataSet.color,
          setId: marker.setId,
          setName: dataSet.name,
          value: value,
          variableName: variablesSet.name,
          variableId: marker.id,
          x: marker.x,
          y: marker.y,
        });
      }
    }
  }

  return result;
}

export function getNearbyMarkerData({
  data,
  height,
  mouseCoordinates,
  width,
  yScale,
}: MarkerNearbyDataParametersType): SpiderChartTooltipDataType[] {
  const distanceArguments = {
    mouseCoordinates,
    width,
    height,
  };

  const markerCoordinatesSet = data.sets
    .map(
      (set) =>
        getPolygonPoints(set.coordinates, (d) => yScale(d) ?? 0, {
          setId: set.id,
          color: set.color,
        }).points,
    )
    .flat()
    .filter((coordinate) => {
      return (
        getMarkerDistance({ ...distanceArguments, coordinate }) <
        MARKER_SUITABLE_DISTANCE_LENGTH
      );
    })
    .filter((item, _, array) => item.index === array[0].index);

  return getMarkerDataSet(markerCoordinatesSet, data);
}
