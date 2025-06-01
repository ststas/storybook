import { memo } from 'react';
import { DEFAULT_MARKER_WIDTH } from './constants.js';
import { type BarChartIndicatorType } from './types.js';

type Props = {
  indicator: BarChartIndicatorType;
  xValue: number;
  yValue: number;
};

function Marker({ indicator, xValue, yValue }: Props): JSX.Element {
  return (
    <circle
      cx={xValue}
      cy={yValue}
      fill={`${indicator.theme.color}`}
      r={indicator.theme.markerWidth ?? DEFAULT_MARKER_WIDTH}
    />
  );
}

export default /*#__PURE__*/ memo(Marker);
