import { JSX, memo, useCallback } from 'react';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { RectClipPath } from '@visx/clip-path';
import { localPoint } from '@visx/event';
import { GridColumns, GridRows } from '@visx/grid';
import { Group } from '@visx/group';
import { AreaClosed, LinePath } from '@visx/shape';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import Selector from './Selector.js';
import TooltipVerticalLine from './TooltipVerticalLine.js';
import {
  ADDITIONAL_MARKER_OPACITY,
  ADDITIONAL_OPACITY,
  CHART_CLIP_PATH_ID,
  DEFAULT_AXIS_MINIMUM_OFFSET,
  DEFAULT_MARKER_SIZE,
  DEFAULT_STROKE_DASH,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_TICK_LENGTH,
  MARKER_FACTOR,
  Z_INDEX_600,
  curveStyle,
} from './constants.js';
import { getNearbyData, getNumTicks } from './helpers/index.js';
import {
  type LineChartAxisOffsetType,
  type LineChartAxisType,
  type LineChartCoordinateType,
  LineChartCurve,
  type LineChartLineType,
  type LineChartTooltipRendererType,
  type LineChartZoomType,
} from './types.js';
import { useLineChartBase } from './useLineChartBase.js';
import styles from './LineChart.module.scss';
import classNames from 'classnames';

type Props = {
  axisOffset?: LineChartAxisOffsetType;
  height: number;
  lines: LineChartLineType[];
  width: number;
  xAxis: LineChartAxisType;
  yAxis: LineChartAxisType;
  zoom?: LineChartZoomType;
  getTooltipRenderer?: LineChartTooltipRendererType;
};

function LineChartBase({
  axisOffset = DEFAULT_AXIS_MINIMUM_OFFSET,
  height,
  lines,
  width,
  xAxis,
  yAxis,
  zoom,
  getTooltipRenderer,
}: Props): JSX.Element {
  const { xRange, yRange, xScale, yScale, getYValue, getXValue } =
    useLineChartBase({
      axisOffset,
      height,
      lines,
      width,
      xAxis,
      yAxis,
      zoom,
    });

  const {
    showTooltip,
    tooltipOpen,
    hideTooltip,
    tooltipData,
    tooltipTop,
    tooltipLeft,
  } = useTooltip<LineChartCoordinateType>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    zIndex: Z_INDEX_600,
  });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGElement, MouseEvent>) => {
      const { target } = event;

      if (target instanceof SVGElement) {
        const mouseCoordinates = localPoint(event);

        if (mouseCoordinates) {
          const nearbyData = getNearbyData({
            axisOffset,
            lines,
            mouseCoordinates,
            xScale,
          });

          if (nearbyData.length > 0) {
            showTooltip({
              tooltipData: nearbyData[0],
              tooltipLeft: xScale(nearbyData[0].x) + axisOffset.left,
              tooltipTop: mouseCoordinates.y,
            });
          }
        }
      }
    },
    [axisOffset, lines, showTooltip, xScale],
  );

  const handleHideTooltip = useCallback(() => hideTooltip(), [hideTooltip]);

  return (
    <div className={styles['container']}>
      <svg ref={containerRef} height={height} width={width}>
        <Group left={axisOffset.left} top={axisOffset.top}>
          <GridColumns
            className={styles['axis']}
            height={yRange.top}
            numTicks={getNumTicks(xRange.right)}
            scale={xScale}
            strokeDasharray={DEFAULT_STROKE_DASH}
            width={xRange.right}
          />
          <GridRows
            className={styles['axis']}
            height={yRange.top}
            numTicks={getNumTicks(yRange.top)}
            scale={yScale}
            width={xRange.right}
          />
          <RectClipPath
            height={yRange.top}
            id={CHART_CLIP_PATH_ID}
            width={xRange.right}
          />
          <AxisBottom
            axisLineClassName={styles['axis']}
            numTicks={xAxis.getNumTicks(xRange.right)}
            scale={xScale}
            tickClassName={styles['axis__tick']}
            tickFormat={xAxis.tickFormat}
            tickLength={xAxis.tickLength ?? DEFAULT_TICK_LENGTH}
            top={yRange.top}
          />
          <AxisLeft
            axisLineClassName={styles['axis']}
            hideZero={xAxis.nice}
            left={xRange.left}
            numTicks={yAxis.getNumTicks(yRange.top)}
            scale={yScale}
            tickClassName={styles['axis__tick']}
            tickFormat={yAxis.tickFormat}
            tickLength={yAxis.tickLength ?? DEFAULT_TICK_LENGTH}
          />
          {lines.map(({ coordinates, theme }) => (
            <Group key={theme.color}>
              {theme.hasMarkers &&
                coordinates.map((coordinate) => (
                  <svg
                    key={`${coordinate.x}-${theme.color}`}
                    clipPath={`url(#${CHART_CLIP_PATH_ID})`}
                  >
                    {getTooltipRenderer && tooltipData?.x === coordinate.x && (
                      <>
                        <circle
                          className={styles['marker']}
                          cx={getXValue(coordinate)}
                          cy={getYValue(coordinate)}
                          r={theme.markerSize ?? DEFAULT_MARKER_SIZE}
                          style={{ fill: theme.color }}
                        />
                        <circle
                          className={classNames(styles['marker'], styles['marker_highlight'])}
                          cx={getXValue(coordinate)}
                          cy={getYValue(coordinate)}
                          opacity={ADDITIONAL_MARKER_OPACITY}
                          r={
                            (theme.markerSize ?? DEFAULT_MARKER_SIZE) *
                            MARKER_FACTOR
                          }
                          style={{ fill: theme.color }}
                        />
                      </>
                    )}
                  </svg>
                ))}
              <LinePath
                className={styles['line-path']}
                clipPath={`url(#${CHART_CLIP_PATH_ID})`}
                curve={
                  theme.curve
                    ? curveStyle[theme.curve]
                    : curveStyle[LineChartCurve.Smooth]
                }
                data={coordinates}
                stroke={theme.color}
                strokeWidth={theme.strokeWidth ?? DEFAULT_STROKE_WIDTH}
                x={getXValue}
                y={getYValue}
              />
              {theme.fill && (
                <AreaClosed
                  clipPath={`url(#${CHART_CLIP_PATH_ID})`}
                  curve={
                    theme.curve
                      ? curveStyle[theme.curve]
                      : curveStyle[LineChartCurve.Smooth]
                  }
                  data={coordinates}
                  fillOpacity={ADDITIONAL_OPACITY}
                  style={{ fill: theme.color }}
                  x={getXValue}
                  y={getYValue}
                  yScale={yScale}
                />
              )}
            </Group>
          ))}
          {getTooltipRenderer && (
            <TooltipVerticalLine
              height={yRange.top}
              tooltipLeft={tooltipLeft && tooltipLeft - axisOffset.left}
              tooltipOpen={tooltipOpen}
            />
          )}
          <rect
            className={styles['rectangle']}
            height={yRange.top}
            width={xRange.right}
            x={0}
            y={0}
            onMouseLeave={handleHideTooltip}
            onMouseMove={handleMouseMove}
          />
          {zoom?.selectorMode && (
            <Selector
              axisOffset={axisOffset}
              height={yRange.top}
              lines={lines}
              width={xRange.right}
              xScale={xScale}
              yScale={yScale}
              zoom={zoom}
            />
          )}
        </Group>
      </svg>
      {getTooltipRenderer && tooltipOpen && tooltipData && (
        <TooltipInPortal key="tooltip" left={tooltipLeft} top={tooltipTop}>
          {getTooltipRenderer(tooltipData.x)}
        </TooltipInPortal>
      )}
    </div>
  );
}

export default /*#__PURE__*/ memo(LineChartBase);
