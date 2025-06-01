import { memo } from 'react';
import { LinearGradient } from '@visx/gradient';
import { Bar as BarComponent } from '@visx/shape';
import { ADDITIONAL_OPACITY, HOVER_OPACITY } from './constants.js';
import { type BarChartIndicatorType } from './types.js';

type Props = {
  barHeight: number;
  barWidth: number;
  indicator: BarChartIndicatorType;
  isHovered: boolean;
  xValue: number;
  yValue: number;
};

function Bar({
  barHeight,
  barWidth,
  indicator,
  isHovered,
  xValue,
  yValue,
}: Props): JSX.Element {
  return (
    <>
      {indicator.theme.hasBorder && (
        <>
          <rect
            fill={`${indicator.theme.color}`}
            height={1}
            width={barWidth}
            x={xValue}
            y={yValue}
          />
          <rect
            fill={`${indicator.theme.color}`}
            height={barHeight}
            width={1}
            x={xValue}
            y={yValue}
          />
          <rect
            fill={`${indicator.theme.color}`}
            height={barHeight}
            width={1}
            x={xValue !== 0 ? xValue + barWidth - 1 : barWidth - 1}
            y={yValue}
          />
        </>
      )}
      <LinearGradient
        from={indicator.theme.color}
        id={String(indicator.bar.id)}
        to={indicator.theme.color}
        toOpacity={ADDITIONAL_OPACITY}
      />
      <BarComponent
        key={indicator.bar.name}
        fill={`url(#${String(indicator.bar.id)})`}
        height={barHeight}
        opacity={isHovered ? HOVER_OPACITY : ADDITIONAL_OPACITY}
        width={barWidth}
        x={xValue}
        y={yValue}
      />
    </>
  );
}

export default /*#__PURE__*/ memo(Bar);
