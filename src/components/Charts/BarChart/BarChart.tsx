import { memo } from 'react';
import { ParentSize } from '@visx/responsive';
import BarChartBase from './BarChartBase.js';
import {
  type BarChartAxisOffsetType,
  type BarChartAxisType,
  type BarChartIndicatorType,
  type BarChartTooltipRendererType,
} from './types.js';

type Props = {
  axisOffset?: BarChartAxisOffsetType;
  barAxis?: BarChartAxisType;
  indicators: BarChartIndicatorType[];
  markerAxis?: BarChartAxisType;
  getTooltipRenderer?: BarChartTooltipRendererType;
};

function BarChart({
  axisOffset,
  barAxis,
  indicators,
  markerAxis,
  getTooltipRenderer,
}: Props): JSX.Element {
  return (
    <ParentSize>
      {({ width, height }) => (
        <BarChartBase
          axisOffset={axisOffset}
          barAxis={barAxis}
          getTooltipRenderer={getTooltipRenderer}
          height={height}
          indicators={indicators}
          markerAxis={markerAxis}
          width={width}
        />
      )}
    </ParentSize>
  );
}

export default /*#__PURE__*/ memo(BarChart);
