import { JSX, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Brush } from '@visx/brush';
import type { default as BaseBrushType } from '@visx/brush/lib/BaseBrush.js';
import { type Bounds } from '@visx/brush/lib/types.js';
import { Group } from '@visx/group';
import {
  AXIS_X,
  AXIS_Y,
  CONTROLS_X_AXIS_OFFSET,
  CONTROLS_Y_AXIS_OFFSET,
  RESIZE_TRIGGER_AREAS,
} from './constants.js';
import {
  type LineChartAxisOffsetType,
  type LineChartBrushCornerPositionType,
  type LineChartLineType,
  type LineChartLinearScaleType,
  type LineChartZoomDomainType,
  type LineChartZoomType,
} from './types.js';
import styles from './Selector.module.scss';
import classNames from 'classnames';
import { CrossIcon } from '@/components/Icons/CrossIcon.jsx';
import { CheckIcon } from '@/components/Icons/CheckIcon.jsx';

type Props = {
  axisOffset: LineChartAxisOffsetType;
  height: number;
  lines: LineChartLineType[];
  width: number;
  xScale: LineChartLinearScaleType;
  yScale: LineChartLinearScaleType;
  zoom: LineChartZoomType;
};

function Selector({
  axisOffset,
  height,
  lines,
  width,
  xScale,
  yScale,
  zoom,
}: Props): JSX.Element {
  const brushRef = useRef<BaseBrushType>(null);
  const [brushBottomCornerPosition, setBrushBottomCornerPosition] =
    useState<LineChartBrushCornerPositionType>([]);
  const [brushDomain, setBrushDomain] = useState<LineChartZoomDomainType>([]);

  const resetBrushPosition = useCallback(() => {
    setBrushBottomCornerPosition([]);
  }, []);

  const resetBrush = useCallback(() => {
    if (brushRef.current) {
      brushRef.current.reset();
      resetBrushPosition();
    }
  }, [resetBrushPosition]);

  const handleBrushEnd = useCallback((bounds: Bounds | null): void => {
    if (bounds) {
      const { x0, x1, y0, y1 } = bounds;

      setBrushDomain([
        { axisStart: x0, axisEnd: x1 },
        { axisStart: y0, axisEnd: y1 },
      ]);

      if (brushRef.current) {
        const { bottomRight } = brushRef.current?.corners() || undefined;

        if (bottomRight) {
          setBrushBottomCornerPosition([bottomRight.x, bottomRight.y]);
        }
      }
    }
  }, []);

  const handleCancelSelect = useCallback(() => {
    resetBrush();

    if (zoom?.toggleSelectorMode) {
      zoom.toggleSelectorMode();
    }
  }, [resetBrush, zoom]);

  const handleAcceptSelect = useCallback(() => {
    resetBrush();

    if (zoom?.toggleSelectorMode && zoom?.saveZoomDomain) {
      zoom.toggleSelectorMode();
      zoom.saveZoomDomain(brushDomain);
    }
  }, [brushDomain, resetBrush, zoom]);

  useEffect(() => {
    setBrushDomain([]);
    resetBrush();
  }, [lines, resetBrush]);

  return (
    <Group>
      <Brush
        brushDirection="both"
        brushRegion="chart"
        height={height}
        innerRef={brushRef}
        margin={{
          top: axisOffset.top,
          left: axisOffset.left,
          right: axisOffset.right,
          bottom: axisOffset.bottom,
        }}
        resizeTriggerAreas={RESIZE_TRIGGER_AREAS}
        selectedBoxStyle={{
          fill: 'blue',
          fillOpacity: 0.1,
          stroke: 'blue',
          strokeWidth: 2,
          strokeDasharray: 4,
          strokeOpacity: 0.8,
        }}
        width={width}
        xScale={xScale}
        yScale={yScale}
        onBrushEnd={handleBrushEnd}
        onBrushStart={resetBrushPosition}
      />
      {brushBottomCornerPosition.length && (
        <foreignObject
          className={styles['wrapper']}
          x={brushBottomCornerPosition[AXIS_X] - CONTROLS_X_AXIS_OFFSET}
          y={brushBottomCornerPosition[AXIS_Y] + CONTROLS_Y_AXIS_OFFSET}
        >
          <div className={styles['controls']}>
            <button
              className={classNames(styles['controls__button'], styles['controls__button_cancel'])}
              onClick={handleCancelSelect}
            >
              <CrossIcon className={classNames(styles['controls__icon'], styles['controls__icon_cancel'])} />
            </button>
            <button
              className={classNames(styles['controls__button'], styles['controls__button_accept'])}
              onClick={handleAcceptSelect}
            >
              <CheckIcon className={classNames(styles['controls__icon'], styles['controls__icon_accept'])} />
            </button>
          </div>
        </foreignObject>
      )}
    </Group>
  );
}

export default /*#__PURE__*/ memo(Selector);
