import { JSX, memo } from 'react';
import { Group } from '@visx/group';
import { MARKER_DEFAULT_SIZE, TWO } from './constants.js';
import {
  type SpiderChartLineSetDataType,
  type SpiderChartMarkerPointExtendedType,
  type SpiderChartTooltipDataType,
  type SpiderChartTooltipRendererType,
} from './types.js';
import styles from './SpiderChart.module.scss';


type Props = {
  focusedLabelMarkers: SpiderChartMarkerPointExtendedType[];
  lineSet: SpiderChartLineSetDataType;
  tooltipData?: SpiderChartTooltipDataType[];
  getTooltipRenderer?: SpiderChartTooltipRendererType;
};

function SpiderChartLineSet({
  focusedLabelMarkers,
  lineSet,
  tooltipData,
  getTooltipRenderer,
}: Props): JSX.Element {
  return (
    <Group key={`spider-group-${lineSet.setId}`}>
      <polygon
        className={styles['polygon']}
        points={lineSet.pointString}
        stroke={lineSet.color}
      />
      {lineSet.points.map((point) => (
        <circle
          key={`spider-point-${lineSet.setId}-${point.id}`}
          cx={point.x}
          cy={point.y}
          fill={point.color}
          r={MARKER_DEFAULT_SIZE}
        />
      ))}
      {getTooltipRenderer &&
        tooltipData &&
        typeof tooltipData[0].value === 'number' && (
          <circle
            className={styles['marker']}
            cx={tooltipData[0].x}
            cy={tooltipData[0].y}
            fill={tooltipData[0].color}
            r={MARKER_DEFAULT_SIZE * TWO}
          />
        )}
      {getTooltipRenderer &&
        focusedLabelMarkers.length > 0 &&
        focusedLabelMarkers.map((marker) => {
          if (marker.setId) {
            return (
              <circle
                key={`spider-point-focused-${lineSet.setId}-${marker.setId}`}
                className={styles['marker']}
                cx={marker.x}
                cy={marker.y}
                fill={marker.color}
                r={MARKER_DEFAULT_SIZE * TWO}
              />
            );
          }

          return null;
        })}
    </Group>
  );
}

export default /*#__PURE__*/ memo(SpiderChartLineSet);
