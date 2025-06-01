import { useCallback, useMemo } from 'react';
import { scaleBand, scaleLinear } from '@visx/scale';
import { BAR_PADDING_INNER } from './constants.js';
import { getExtremumValues, getSizes } from './helpers/index.js';
import {
  type BarChartAxisOffsetType,
  type BarChartAxisType,
  type BarChartBaseHookType,
  type BarChartIndicatorType,
  type BarChartIndicatorValueType,
  type BarChartLinearDomainParametersType,
  type BarChartScalesType,
} from './types.js';

type Props = {
  axisOffset: BarChartAxisOffsetType;
  barAxis?: BarChartAxisType;
  height: number;
  indicators: BarChartIndicatorType[];
  markerAxis?: BarChartAxisType;
  width: number;
};

export function useBarChartBase({
  axisOffset,
  barAxis,
  indicators,
  height,
  markerAxis,
  width,
}: Props): BarChartBaseHookType {
  const getLinearDomain = useCallback(
    ({ variables, axisParams }: BarChartLinearDomainParametersType) => {
      return getExtremumValues({ variables, axisParams });
    },
    [],
  );

  const hasMarkers = indicators.some((indicator) => indicator.marker);

  const viewBox = useMemo(
    (): string =>
      getSizes({
        width,
        height,
        axisMinimumOffset: axisOffset,
      }),
    [axisOffset, height, width],
  );

  const xAxisScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, width],
        domain: indicators.map((indicator) => indicator.bar.name),
        paddingInner: BAR_PADDING_INNER,
      }),
    [indicators, width],
  );

  const yAxisScales = useMemo((): BarChartScalesType => {
    const bars: BarChartIndicatorValueType[] = indicators.map(
      (indicator) => indicator.bar,
    );
    const scales: BarChartScalesType = {
      bar: scaleLinear({
        range: [height, 0],
        domain: getLinearDomain({ variables: bars, axisParams: barAxis }),
        nice: true,
      }),
    };

    if (hasMarkers) {
      const markers = indicators.map(
        (indicator) => indicator.marker,
      ) as BarChartIndicatorValueType[];

      return {
        ...scales,
        marker: scaleLinear({
          range: [height, 0],
          domain: getLinearDomain({
            variables: markers,
            axisParams: markerAxis,
          }),
          nice: true,
        }),
      };
    }

    return scales;
  }, [barAxis, getLinearDomain, hasMarkers, height, indicators, markerAxis]);

  const getXValue = useCallback(
    (indicator: BarChartIndicatorValueType) => xAxisScale(indicator.name),
    [xAxisScale],
  );

  const getYBarValue = useCallback(
    (indicator: BarChartIndicatorValueType) => yAxisScales.bar(indicator.value),
    [yAxisScales],
  );

  const getYMarkerValue = useCallback(
    (indicator: BarChartIndicatorValueType) => {
      if (yAxisScales.marker && indicator) {
        return yAxisScales.marker(indicator.value);
      }

      return undefined;
    },
    [yAxisScales],
  );

  const getBottomAxisLabelProps = useCallback(
    () =>
      ({
        width: xAxisScale.bandwidth(),
      }) as const,
    [xAxisScale],
  );

  return useMemo(
    () => ({
      hasMarkers,
      viewBox,
      xAxisScale,
      yAxisScales,
      getBottomAxisLabelProps,
      getXValue,
      getYBarValue,
      getYMarkerValue,
    }),
    [
      hasMarkers,
      viewBox,
      xAxisScale,
      yAxisScales,
      getBottomAxisLabelProps,
      getXValue,
      getYBarValue,
      getYMarkerValue,
    ],
  );
}
