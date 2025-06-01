import { useMemo } from 'react';
import { getPolygonPoints } from './helpers/index.js';
import {
  type SpiderChartDataType,
  type SpiderChartLineSetHookType,
  type SpiderChartLinearScaleType,
  type SpiderChartMarkerPointExtendedType,
  type SpiderChartTooltipDataType,
} from './types.js';

type Props = {
  data: SpiderChartDataType;
  tooltipData: SpiderChartTooltipDataType[] | undefined;
  yScale: SpiderChartLinearScaleType;
};

export function useSpiderChartLineSet({
  data,
  tooltipData,
  yScale,
}: Props): SpiderChartLineSetHookType {
  const lineSets = useMemo(() => {
    return data.sets.map((set) =>
      getPolygonPoints(set.coordinates, yScale, {
        setId: set.id,
        color: set.color,
      }),
    );
  }, [data.sets, yScale]);
  const focusedLabelMarkers = useMemo(() => {
    if (
      typeof tooltipData !== 'undefined' &&
      typeof tooltipData[0].coordinates !== 'undefined'
    ) {
      const markers: SpiderChartMarkerPointExtendedType[] = [];

      lineSets.forEach((item) => {
        const marker = item.points.find(
          (point) => point.id === tooltipData[0].variableId,
        );

        if (marker) {
          markers.push(marker);
        }
      });

      return markers;
    }

    return [] as SpiderChartMarkerPointExtendedType[];
  }, [lineSets, tooltipData]);

  return useMemo(
    () => ({ focusedLabelMarkers, lineSets }),
    [focusedLabelMarkers, lineSets],
  );
}
