import { type Point } from '@visx/point';
import {
  type SpiderChartDataType,
  type SpiderChartScaleLinearType,
  type SpiderChartTooltipDataType,
} from '../types.js';
import { getNearbyLabelData } from './getNearbyLabelData.js';
import { getNearbyMarkerData } from './getNearbyMarkerData.js';

type NearbyDataParametersType = {
  data: SpiderChartDataType;
  height: number;
  labelScale: SpiderChartScaleLinearType;
  maxValueOfCoordinates: number;
  minValueOfCoordinates: number;
  mouseCoordinates: Point;
  radius: number;
  target: SVGElement;
  width: number;
  yScale: SpiderChartScaleLinearType;
};

export function getNearbyData({
  data,
  height,
  labelScale,
  maxValueOfCoordinates,
  minValueOfCoordinates,
  mouseCoordinates,
  radius,
  target,
  width,
  yScale,
}: NearbyDataParametersType): SpiderChartTooltipDataType[] {
  if (target.localName === 'tspan') {
    return getNearbyLabelData({
      data,
      height,
      labelScale,
      maxValue: maxValueOfCoordinates,
      minValue: minValueOfCoordinates,
      mouseCoordinates,
      radius,
      width,
    });
  }

  if (target.localName === 'circle') {
    return getNearbyMarkerData({
      data,
      height,
      mouseCoordinates,
      width,
      yScale,
    });
  }

  return [];
}
