import { type Point } from '@visx/point';
import { LABEL_SUITABLE_DISTANCE_LENGTH } from '../constants.js';
import {
  type SpiderChartDataType,
  type SpiderChartLabelPointType,
  type SpiderChartMarkerPointType,
  type SpiderChartScaleLinearType,
  type SpiderChartTooltipDataType,
} from '../types.js';
import { getLabelsPoints } from './index.js';

type LabelNearbyDataParametersType = {
  data: SpiderChartDataType;
  height: number;
  labelScale: SpiderChartScaleLinearType;
  maxValue: number;
  minValue: number;
  mouseCoordinates: Point;
  radius: number;
  width: number;
};

type LabelsDistanceParametersType = {
  coordinate: SpiderChartLabelPointType | SpiderChartMarkerPointType;
  mouseCoordinates: Point;
  width: number;
  height: number;
};

function getLabelDistance({
  coordinate,
  mouseCoordinates,
}: LabelsDistanceParametersType): number {
  const xDistance = mouseCoordinates.x - coordinate.x;
  const yDistance = mouseCoordinates.y - coordinate.y;

  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}

function getLabelDataSet(
  labelsCoordinatesSet: SpiderChartLabelPointType[],
  data: SpiderChartDataType,
): SpiderChartTooltipDataType[] {
  if (labelsCoordinatesSet.length !== 0 && data.sets.length !== 0) {
    const [label] = labelsCoordinatesSet;

    if (label) {
      return [
        {
          coordinates: data.sets.map((set) => ({
            setName: set.name,
            setId: set.id,
            value: set.coordinates[label.id] ?? null,
            color: set.color,
          })),
          variableName: label.name,
          variableId: label.id,
          x: label.x,
          y: label.y,
        },
      ];
    }
  }

  return [] as SpiderChartTooltipDataType[];
}

export function getNearbyLabelData({
  data,
  height,
  labelScale,
  maxValue,
  minValue,
  mouseCoordinates,
  radius,
  width,
}: LabelNearbyDataParametersType): SpiderChartTooltipDataType[] {
  const distanceArguments = {
    mouseCoordinates,
    width,
    height,
  };

  const labelsCoordinatesSet = getLabelsPoints({
    maxValue,
    minValue,
    radius,
    variables: data.variables,
    yScale: labelScale,
  }).filter((coordinate) => {
    return (
      getLabelDistance({ ...distanceArguments, coordinate }) <
      LABEL_SUITABLE_DISTANCE_LENGTH
    );
  });

  return getLabelDataSet(labelsCoordinatesSet, data);
}
