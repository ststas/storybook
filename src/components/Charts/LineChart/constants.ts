/* eslint-disable import/extensions */
import { type CurveFactory } from '.pnpm/@types+d3-shape@1.3.12/node_modules/@types/d3-shape';
import { type ResizeTriggerAreas } from '@visx/brush/lib/types.js';
import { curveLinear, curveMonotoneX, curveStepAfter } from '@visx/curve';
import { LineChartCurve } from './types.js';

export const curveStyle: {
  step: CurveFactory;
  linear: CurveFactory;
  smooth: CurveFactory;
} = {
  [LineChartCurve.Step]: curveStepAfter,
  [LineChartCurve.Linear]: curveLinear,
  [LineChartCurve.Smooth]: curveMonotoneX,
};

export const GRAPH_SMALLEST_VALUE = 0;
export const DECIMAL_ROUNDING = 2;

export const SUITABLE_DISTANCE_LENGTH = 5;

export const DEFAULT_STROKE_WIDTH = 2;
export const DEFAULT_STROKE_DASH = '10';
export const DEFAULT_MARKER_SIZE = 3;
export const MARKER_FACTOR = 2.5;
export const DEFAULT_TICK_LENGTH = 3;
export const DEFAULT_TICKS = 8;
export const AXIS_SCALE_SIZE = 600;
export const AXIS_SCALE_REDUCER = 150;

export const ADDITIONAL_OPACITY = 0.3;
export const ADDITIONAL_MARKER_OPACITY = 0.6;

export const CONTROLS_X_AXIS_OFFSET = 48;
export const CONTROLS_Y_AXIS_OFFSET = 10;

export const AXIS_X = 0;
export const AXIS_Y = 1;

export const DEFAULT_AXIS_MINIMUM_OFFSET = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10,
};

export const RESIZE_TRIGGER_AREAS: ResizeTriggerAreas[] = [
  'left',
  'right',
  'top',
  'bottom',
  'topRight',
  'topLeft',
  'bottomLeft',
  'bottomRight',
];

export const Z_INDEX_600 = 600;
export const FIVE = 5;
export const TEN = 10;

export const CHART_CLIP_PATH_ID = 'chartPath';
