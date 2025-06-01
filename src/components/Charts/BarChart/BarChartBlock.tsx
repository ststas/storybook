import { memo } from 'react';
import Bar from './Bar.js';
import Marker from './Marker.js';
import { DEFAULT_DIVISOR } from './constants.js';
import {
  type BarChartBandScaleType,
  type BarChartCoordinateValueFunctionType,
  type BarChartIndicatorType,
} from './types.js';

type Props = {
  height: number;
  indicator: BarChartIndicatorType;
  isHovered: boolean;
  xScale: BarChartBandScaleType;
  getXValue: BarChartCoordinateValueFunctionType;
  getYBarValue: BarChartCoordinateValueFunctionType;
  getYMarkerValue: BarChartCoordinateValueFunctionType;
};

function BarChartBlock({
  height,
  indicator,
  isHovered,
  xScale,
  getXValue,
  getYBarValue,
  getYMarkerValue,
}: Props): JSX.Element {
  const barWidth = xScale.bandwidth();
  const barHeight = height - (getYBarValue(indicator.bar) || 0);
  const xValueBar = getXValue(indicator.bar) || 0;
  const yValueBar = height - barHeight;
  const xValueMarker = xValueBar + barWidth / DEFAULT_DIVISOR;

  return (
    <>
      {indicator.marker && (
        <Marker
          indicator={indicator}
          xValue={xValueMarker}
          yValue={getYMarkerValue(indicator.marker) || 0}
        />
      )}
      <Bar
        barHeight={barHeight}
        barWidth={barWidth}
        indicator={indicator}
        isHovered={isHovered}
        xValue={xValueBar}
        yValue={yValueBar}
      />
    </>
  );
}

export default /*#__PURE__*/ memo(BarChartBlock);
