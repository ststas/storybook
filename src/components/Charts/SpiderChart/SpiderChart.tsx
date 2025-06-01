import { JSX, memo } from 'react';
import { ParentSize } from '@visx/responsive';
import SpiderChartBase from './SpiderChartBase.js';
import {
  type SpiderChartAxisOffsetType,
  type SpiderChartDataType,
  type SpiderChartTickFormatType,
  type SpiderChartTooltipRendererType,
} from './types.js';

type Props = {
  axisOffset?: SpiderChartAxisOffsetType;
  data: SpiderChartDataType;
  formatTicks: SpiderChartTickFormatType;
  getTooltipRenderer?: SpiderChartTooltipRendererType;
};

function SpiderChart({
  axisOffset,
  data,
  formatTicks,
  getTooltipRenderer,
}: Props): JSX.Element {
  return (
    <ParentSize>
      {({ width, height }) => (
        <SpiderChartBase
          axisOffset={axisOffset}
          data={data}
          formatTicks={formatTicks}
          getTooltipRenderer={getTooltipRenderer}
          height={height}
          width={width}
        />
      )}
    </ParentSize>
  );
}

export default /*#__PURE__*/ memo(SpiderChart);
