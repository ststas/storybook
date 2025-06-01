import { memo } from 'react';
import { ParentSize } from '@visx/responsive';
import LineChartBase from './LineChartBase.js';
import {
  type LineChartAxisOffsetType,
  type LineChartAxisType,
  type LineChartLineType,
  type LineChartTooltipRendererType,
  type LineChartZoomType,
} from './types.js';

type Props = {
  axisOffset?: LineChartAxisOffsetType;
  lines: LineChartLineType[];
  xAxis: LineChartAxisType;
  yAxis: LineChartAxisType;
  zoom?: LineChartZoomType;
  getTooltipRenderer?: LineChartTooltipRendererType;
};

function LineChart({
  axisOffset,
  lines,
  xAxis,
  yAxis,
  zoom,
  getTooltipRenderer,
}: Props): JSX.Element {
  return (
    <ParentSize>
      {({ width, height }) => (
        <LineChartBase
          axisOffset={axisOffset}
          getTooltipRenderer={getTooltipRenderer}
          height={height}
          lines={lines}
          width={width}
          xAxis={xAxis}
          yAxis={yAxis}
          zoom={zoom}
        />
      )}
    </ParentSize>
  );
}

export default /*#__PURE__*/ memo(LineChart);
