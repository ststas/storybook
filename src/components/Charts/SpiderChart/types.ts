import { type ReactNode } from 'react';
import { type TickFormatter } from '@visx/axis';
import { type Point } from '@visx/point';
import { type D3Scale, type ScaleInput } from '@visx/scale';
import { type ScaleLinear } from 'd3-scale';

export type SpiderChartScaleLinearType = ScaleLinear<number, number, never>;

export type SpiderChartTickValueType = ScaleInput<
  D3Scale<Date | number, number, number>
>;

export type SpiderChartTickFormatType = TickFormatter<SpiderChartTickValueType>;

export type SpiderChartCoordinatesType = {
  [key: string]: number;
};

export type SpiderChartLineSetType = {
  id: string;
  name: string;
  color: string;
  coordinates: SpiderChartCoordinatesType;
};

export type SpiderChartVariableType = {
  id: string;
  name: string;
};

export type SpiderChartDataType = {
  sets: SpiderChartLineSetType[];
  variables: SpiderChartVariableType[];
};

export type SpiderChartAxisOffsetType = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export type SpiderChartLabelPointType = {
  dx: number;
  dy: number;
  id: string;
  name: string;
  x: number;
  y: number;
};

export type SpiderChartMarkerPointType = {
  id: string;
  index: number;
  x: number;
  y: number;
};

export type SpiderChartBaseHookType = {
  isZeroHidden: boolean;
  labelsPoints: SpiderChartLabelPointType[];
  labelScale: SpiderChartScaleLinearType;
  levels: number;
  levelsArray: number[];
  maxValueOfCoordinates: number;
  minValueOfCoordinates: number;
  points: {
    x: number;
    y: number;
  }[];
  radialScale: SpiderChartScaleLinearType;
  radius: number;
  viewBox: string;
  webs: {
    angle: number;
  }[];
  yScale: SpiderChartScaleLinearType;
  yScaleReversed: SpiderChartScaleLinearType;
  zeroPoint: Point;
};

export type SpiderChartTooltipDataType = {
  color?: string;
  coordinates?: {
    color: string;
    value: number;
    setId?: string;
    setName?: string;
  }[];
  setId?: string;
  setName?: string;
  value?: number;
  variableId?: string;
  variableName?: string;
  x: number;
  y: number;
};

export type SpiderChartTooltipRendererType = (
  args: SpiderChartTooltipDataType[],
) => ReactNode;

export type SpiderChartLineSetDataType = {
  points: SpiderChartMarkerPointExtendedType[];
  pointString: string;
  setId: string;
  color: string;
};

export type SpiderChartMarkerPointExtendedType = SpiderChartMarkerPointType & {
  color: string;
  setId: string;
};

export type SpiderChartLineSetHookType = {
  focusedLabelMarkers: SpiderChartMarkerPointExtendedType[];
  lineSets: SpiderChartLineSetDataType[];
};

export type SpiderChartLinearScaleType = (coordinateValue: number) => number;
