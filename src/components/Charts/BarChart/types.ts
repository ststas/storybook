import { type ReactNode } from 'react';
import { type AxisScale, type TickFormatter } from '@visx/axis';
import { type D3Scale, type ScaleInput } from '@visx/scale';
import { type ScaleBand } from 'd3-scale';

export enum Axis {
  X = 'x',
  Y = 'y',
}

export enum BarChartIndicators {
  Bar = 'bar',
  Marker = 'marker',
}

export enum TagName {
  Rect = 'rect',
  Circle = 'circle',
}

export type BarChartIndicatorValueType = {
  name: string;
  id: number;
  value: number;
};

export type BarChartLinearScaleType = AxisScale<number>;
export type BarChartBandScaleType = ScaleBand<string>;

export type BarChartScalesType = {
  bar: BarChartLinearScaleType;
  marker?: BarChartLinearScaleType;
};

export type BarChartCoordinateType = {
  [Axis.X]: number;
  [Axis.Y]: number;
};

export type NearbyDataType = BarChartCoordinateType & {
  data: BarChartIndicatorValueType;
  type: BarChartIndicators;
  color: string;
};

export type BarChartTickValueType = ScaleInput<
  D3Scale<Date | number, number, number>
>;

export type BarChartTickFormatType = TickFormatter<BarChartTickValueType>;

export type BarChartAxisType = {
  tickFormat?: BarChartTickFormatType;
  defaultMinDomain?: boolean;
  nice?: boolean;
  tickLength?: number;
};

export type BarChartThemeType = {
  color: string;
  hasBorder?: boolean;
  markerWidth?: number;
};

export type BarChartIndicatorType = {
  theme: BarChartThemeType;
  bar: BarChartIndicatorValueType;
  marker?: BarChartIndicatorValueType;
};

export type BarChartIndicatorMarkerRequiredType = RequiredByKeys<
  BarChartIndicatorType,
  'marker'
>;

export type BarChartLinearDomainParametersType = {
  variables: BarChartIndicatorValueType[];
  axisParams?: BarChartAxisType;
};

export type BarChartAxisOffsetType = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type BarChartCoordinateValueFunctionType = (
  indicator: BarChartIndicatorValueType,
) => number | undefined;

export type BarChartBaseHookType = {
  hasMarkers: boolean;
  viewBox: string;
  xAxisScale: ScaleBand<string>;
  yAxisScales: BarChartScalesType;
  getBottomAxisLabelProps: () => {
    readonly width: number;
  };
  getXValue: (indicator: BarChartIndicatorValueType) => number | undefined;
  getYBarValue: (indicator: BarChartIndicatorValueType) => number | undefined;
  getYMarkerValue: (
    indicator: BarChartIndicatorValueType,
  ) => number | undefined;
};

export type ExtremumValuesParametersType = {
  variables: BarChartIndicatorValueType[];
  axisParams?: BarChartAxisType;
};

type RequiredByKeys<T, K> = Required<{
  [P in keyof T as P extends K ? P : never]: T[P];
}> & {
  [P in keyof T as P extends K ? never : P]: T[P];
};

export type BarChartTooltipArgumentsType = {
  name?: string;
  value?: string;
  color?: string;
  selectedIndicator?: BarChartIndicators;
};

export type BarChartTooltipRendererType = (
  args: BarChartTooltipArgumentsType,
) => ReactNode;
