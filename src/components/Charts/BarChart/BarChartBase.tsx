import { JSX, memo, useCallback } from 'react';
import { AxisBottom, AxisLeft, AxisRight } from '@visx/axis';
import { localPoint } from '@visx/event';
import { GridRows } from '@visx/grid';
import { Group } from '@visx/group';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import BarChartBlock from './BarChartBlock.js';
import {
  AXIS_TICKS_DEFAULT_HEIGHT,
  AXIS_TICKS_DEFAULT_WIDTH,
  AXIS_TICKS_DEFAULT_Y,
  AXIS_TICKS_NUM,
  DEFAULT_AXIS_MINIMUM_OFFSET,
  DEFAULT_DIVISOR,
  DEFAULT_TICK_LENGTH,
  Z_INDEX_600,
} from './constants.js';
import { getNearbyData } from './helpers/index.js';
import {
  type BarChartAxisOffsetType,
  type BarChartAxisType,
  type BarChartIndicatorType,
  BarChartIndicators,
  type BarChartTooltipArgumentsType,
  type BarChartTooltipRendererType,
  TagName,
} from './types.js';
import { useBarChartBase } from './useBarChartBase.js';
import styles from './BarChart.module.scss';

type Props = {
  axisOffset?: BarChartAxisOffsetType;
  barAxis?: BarChartAxisType;
  height: number;
  indicators: BarChartIndicatorType[];
  markerAxis?: BarChartAxisType;
  width: number;
  getTooltipRenderer?: BarChartTooltipRendererType;
};

function BarChartBase({
  axisOffset = DEFAULT_AXIS_MINIMUM_OFFSET,
  barAxis,
  height,
  indicators,
  markerAxis,
  width,
  getTooltipRenderer,
}: Props): JSX.Element {
  const {
    hasMarkers,
    viewBox,
    xAxisScale,
    yAxisScales,
    getBottomAxisLabelProps,
    getXValue,
    getYBarValue,
    getYMarkerValue,
  } = useBarChartBase({
    axisOffset,
    barAxis,
    indicators,
    height,
    markerAxis,
    width,
  });

  const {
    showTooltip,
    tooltipOpen,
    hideTooltip,
    tooltipData,
    tooltipTop,
    tooltipLeft,
  } = useTooltip<BarChartTooltipArgumentsType>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    zIndex: Z_INDEX_600,
  });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGElement, MouseEvent>) => {
      const { nodeName } = event.target as SVGElement;

      if (nodeName === TagName.Rect || nodeName === TagName.Circle) {
        const mouseCoordinates = localPoint(event);

        if (mouseCoordinates) {
          const nearbyData = getNearbyData({
            mouseCoordinates,
            indicators,
            width,
            xAxisScale,
            getXValue,
            getYBarValue,
            getYMarkerValue,
          });

          if (nearbyData.length) {
            showTooltip({
              tooltipData: {
                name: nearbyData[0]?.data.name,
                value: nearbyData[0]?.data.value.toString(),
                color: nearbyData[0]?.color,
                selectedIndicator: nearbyData[0]?.type,
              },
              tooltipLeft: nearbyData[0].x,
              tooltipTop: nearbyData[0].y,
            });
          }
        }
      } else {
        hideTooltip();
      }
    },
    [
      hideTooltip,
      indicators,
      showTooltip,
      width,
      xAxisScale,
      getXValue,
      getYBarValue,
      getYMarkerValue,
    ],
  );

  return (
    <svg
      ref={containerRef}
      height={height}
      viewBox={viewBox}
      width={width}
      onMouseMove={handleMouseMove}
    >
      <GridRows
        className={styles['axis']}
        height={height}
        numTicks={AXIS_TICKS_NUM}
        scale={yAxisScales.bar}
        width={width}
      />
      <AxisBottom
        axisLineClassName={styles['axis']}
        hideTicks
        scale={xAxisScale}
        tickComponent={(item) => (
          <foreignObject
            height={AXIS_TICKS_DEFAULT_HEIGHT}
            width={item.width || AXIS_TICKS_DEFAULT_WIDTH}
            x={item.x - (item.width ? item.width / DEFAULT_DIVISOR : 0)}
            y={AXIS_TICKS_DEFAULT_Y}
          >
            <div className={styles['axis__tick']}>{item.formattedValue}</div>
          </foreignObject>
        )}
        tickLabelProps={getBottomAxisLabelProps}
        top={height}
      />
      <AxisLeft
        axisLineClassName={styles['axis']}
        numTicks={AXIS_TICKS_NUM}
        scale={yAxisScales.bar}
        tickClassName={styles['axis__tick']}
        tickFormat={barAxis?.tickFormat}
        tickLength={barAxis?.tickLength ?? DEFAULT_TICK_LENGTH}
      />
      {hasMarkers && yAxisScales.marker?.length && (
        <AxisRight
          axisLineClassName={styles['axis']}
          hideTicks
          left={width}
          numTicks={AXIS_TICKS_NUM}
          scale={yAxisScales.marker}
          tickClassName={styles['axis__tick']}
          tickFormat={markerAxis?.tickFormat}
        />
      )}
      <Group>
        {indicators.map((indicator) => (
          <Group key={`${indicator.bar.id}-${indicator.theme.color}`}>
            <BarChartBlock
              getXValue={getXValue}
              getYBarValue={getYBarValue}
              getYMarkerValue={getYMarkerValue}
              height={height}
              indicator={indicator}
              isHovered={
                tooltipData?.selectedIndicator === BarChartIndicators.Bar &&
                tooltipData.name === indicator.bar.name
              }
              xScale={xAxisScale}
            />
          </Group>
        ))}
        {getTooltipRenderer && tooltipOpen && tooltipData && (
          <TooltipInPortal key="tooltip" left={tooltipLeft} top={tooltipTop}>
            {getTooltipRenderer(tooltipData)}
          </TooltipInPortal>
        )}
      </Group>
    </svg>
  );
}

export default /*#__PURE__*/ memo(BarChartBase);
