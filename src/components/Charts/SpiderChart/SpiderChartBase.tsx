import { JSX, memo, useCallback } from 'react';
import { AxisLeft } from '@visx/axis';
import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { Line, LineRadial } from '@visx/shape';
import { Text } from '@visx/text';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import SpiderChartLineSet from './SpiderChartLineSet.js';
import {
  AXIS_DEFAULT_OFFSET,
  LABEL_WIDTH,
  TWO,
  Z_INDEX_600,
} from './constants.js';
import { getNearbyData, getNumTicks } from './helpers/index.js';
import {
  type SpiderChartAxisOffsetType,
  type SpiderChartDataType,
  type SpiderChartTickFormatType,
  type SpiderChartTooltipDataType,
  type SpiderChartTooltipRendererType,
} from './types.js';
import { useSpiderChartBase } from './useSpiderChartBase.js';
import { useSpiderChartLineSet } from './useSpiderChartLineSet.js';
import styles from './SpiderChart.module.scss';

type Props = {
  axisOffset?: SpiderChartAxisOffsetType;
  data: SpiderChartDataType;
  height: number;
  width: number;
  formatTicks: SpiderChartTickFormatType;
  getTooltipRenderer?: SpiderChartTooltipRendererType;
};

function SpiderChartBase({
  axisOffset = AXIS_DEFAULT_OFFSET,
  data,
  height,
  width,
  formatTicks,
  getTooltipRenderer,
}: Props): JSX.Element {
  const {
    isZeroHidden,
    labelsPoints,
    labelScale,
    levels,
    levelsArray,
    maxValueOfCoordinates,
    minValueOfCoordinates,
    points,
    radialScale,
    radius,
    viewBox,
    webs,
    yScale,
    yScaleReversed,
    zeroPoint,
  } = useSpiderChartBase({ axisOffset, data, height, width });

  const {
    tooltipOpen,
    tooltipData,
    tooltipTop,
    tooltipLeft,
    hideTooltip,
    showTooltip,
  } = useTooltip<SpiderChartTooltipDataType[]>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    zIndex: Z_INDEX_600,
  });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGElement, MouseEvent>) => {
      const mouseCoordinates = localPoint(event);
      const { target } = event;

      if (mouseCoordinates && target instanceof SVGElement) {
        const nearbyData = getNearbyData({
          target,
          data,
          height,
          labelScale,
          maxValueOfCoordinates,
          minValueOfCoordinates,
          mouseCoordinates,
          radius,
          width,
          yScale,
        });

        if (nearbyData.length > 0) {
          showTooltip({
            tooltipData: nearbyData,
            tooltipLeft: nearbyData[0].x + width / TWO,
            tooltipTop: nearbyData[0].y + height / TWO,
          });
        } else {
          hideTooltip();
        }
      }
    },
    [
      data,
      height,
      labelScale,
      hideTooltip,
      maxValueOfCoordinates,
      minValueOfCoordinates,
      radius,
      showTooltip,
      width,
      yScale,
    ],
  );

  const { focusedLabelMarkers, lineSets } = useSpiderChartLineSet({
    data,
    tooltipData,
    yScale,
  });

  return (
    <svg
      ref={containerRef}
      height={height}
      viewBox={viewBox}
      width={width}
      onMouseMove={handleMouseMove}
    >
      <Group left={width / TWO} top={height / TWO}>
        {levelsArray.map((level, index) => (
          <Group key={`spider-line-group-${level}`}>
            <LineRadial
              angle={(angleData) => radialScale(angleData.angle) ?? 0}
              className={styles['line']}
              data={webs}
              fill="none"
              radius={((index + 1) * radius) / levels}
              strokeLinecap="round"
            />
            <Line className={styles['line']} from={zeroPoint} to={points[index]} />
          </Group>
        ))}
        {getTooltipRenderer && tooltipOpen && tooltipData && (
          <TooltipInPortal key="tooltip" left={tooltipLeft} top={tooltipTop}>
            {getTooltipRenderer(tooltipData)}
          </TooltipInPortal>
        )}
        {lineSets.map((lineSet) => (
          <SpiderChartLineSet
            key={lineSet.setId}
            focusedLabelMarkers={focusedLabelMarkers}
            getTooltipRenderer={getTooltipRenderer}
            lineSet={lineSet}
            tooltipData={tooltipData}
          />
        ))}
        {labelsPoints.map((labelPoint) => (
          <Text
            key={labelPoint.id}
            className={styles['label']}
            dx={`${labelPoint.dx}em`}
            dy={`${labelPoint.dy}em`}
            textAnchor={'middle'}
            verticalAnchor="middle"
            width={LABEL_WIDTH}
            x={labelPoint.x}
            y={labelPoint.y}
          >
            {labelPoint.name}
          </Text>
        ))}
        <AxisLeft
          axisLineClassName={styles['axis']}
          hideZero={isZeroHidden}
          numTicks={getNumTicks(levels)}
          orientation="left"
          scale={yScaleReversed}
          tickClassName={styles['axis__tick']}
          tickFormat={formatTicks}
          tickLength={5}
          top={-radius}
        />
      </Group>
    </svg>
  );
}
export default /*#__PURE__*/ memo(SpiderChartBase);
