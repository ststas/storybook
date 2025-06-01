import { type ReactNode } from 'react';
import { type AxisScale, type TickFormatter } from '@visx/axis';
import { type D3Scale, type ScaleInput } from '@visx/scale';
import { type ScaleLinear, type ScaleRadial, type ScaleTime } from 'd3-scale';

export enum LineChartAxisDirection {
  X = 'x',
  Y = 'y',
}

export enum LineChartCurve {
  Linear = 'linear',
  Smooth = 'smooth',
  Step = 'step',
}

export enum LineChartAxis {
  Numerical = 'numerical',
  Time = 'time',
}

export type LineChartCoordinateType = {
  [LineChartAxisDirection.X]: number;
  [LineChartAxisDirection.Y]: number;
};

export type LineChartDomainType = {
  minValue: number;
  maxValue: number;
};

export type LineChartLinearScaleType = AxisScale<number>;

export type LineChartTickValueType = ScaleInput<
  D3Scale<Date | number, number, number>
>;

export type LineChartTickFormatType = TickFormatter<LineChartTickValueType>;

export type LineChartAxisType = {
  tickFormat: LineChartTickFormatType;
  defaultMinDomain?: boolean;
  domain?: LineChartDomainType;
  axisType?: LineChartAxis;
  nice?: boolean;
  tickLength?: number;
  getNumTicks: (value: number) => number;
};

export type LineChartThemeType = {
  color: string;
  fill?: boolean;
  hasMarkers?: boolean;
  strokeWidth?: number;
  markerSize?: number;
  curve?: LineChartCurve;
};

export type LineChartAxisDomainType = {
  axisStart: number;
  axisEnd: number;
};

type LineChartAxisDomainXType = LineChartAxisDomainType;
type LineChartAxisDomainYType = LineChartAxisDomainType;

export type LineChartZoomDomainType =
  | []
  | [LineChartAxisDomainXType, LineChartAxisDomainYType];

export type LineChartBrushCornerPositionType = [] | [number, number];

export type LineChartZoomType = {
  selectorMode?: boolean;
  zoomDomain?: LineChartZoomDomainType;
  yZoomFactor?: number;
  xZoomFactor?: number;
  toggleSelectorMode?: () => void;
  saveZoomDomain?: (domain: LineChartZoomDomainType) => void;
};

export type LineChartLineType = {
  coordinates: LineChartCoordinateType[];
  theme: LineChartThemeType;
  id: string;
  name: string;
};

export type LineChartAxisOffsetType = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type LineChartTooltipRendererType = (args: number) => ReactNode;

export type LineChartBaseHookType = {
  xRange: {
    left: number;
    right: number;
  };
  yRange: {
    top: number;
    bottom: number;
  };
  xScale:
    | ScaleLinear<number, number, never>
    | ScaleRadial<number, number, never>
    | ScaleTime<number, number, never>;
  yScale: ScaleLinear<number, number, never> | ScaleTime<number, number, never>;
  getYValue: (coordinate: LineChartCoordinateType) => number;
  getXValue: (coordinate: LineChartCoordinateType) => number;
};
