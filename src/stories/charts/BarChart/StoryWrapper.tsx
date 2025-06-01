import { JSX, type ReactNode, memo, useCallback, useMemo } from 'react';
import styles from './Wrapper.module.scss';
import { BarChart, BarChartAxisType, BarChartIndicators, BarChartIndicatorType, BarChartTickValueType, BarChartTooltipArgumentsType } from '@/components/Charts';
import { CalendarIcon } from '@/components/Icons/CalendarIcon.jsx';
import { ShapeCircleFilledIcon } from '@/components/Icons/ShapeCircleFilledIcon.jsx';
import { ShapeSquareFilledIcon } from '@/components/Icons/ShapeSquareFilledIcon.jsx';

const mockupDate = ['04/05/2024', '04-06/2024'];

type Props = { indicators: BarChartIndicatorType[] };

function StoryWrapper({ indicators }: Props): JSX.Element {
  const formatLinearTick = useCallback((value: BarChartTickValueType) => {
    if (typeof value === 'number') {
      const newValue = String(value);

      return newValue;
    }
    throw new Error('Coordinate value type is not number');
  }, []);

  const barAxis: BarChartAxisType = useMemo(
    () => ({
      defaultMinDomain: true,
      tickFormat: formatLinearTick,
    }),
    [formatLinearTick],
  );

  const markerAxis: BarChartAxisType = useMemo(
    () => ({
      defaultMinDomain: true,
      tickFormat: formatLinearTick,
    }),
    [formatLinearTick],
  );

  const getTooltipRenderer = useCallback(
    ({
      name,
      value,
      color,
      selectedIndicator,
    }: BarChartTooltipArgumentsType): ReactNode => {
      return (
          <div className={styles['tooltip-container']}>
            <div className={styles['tooltip-container__header']}>
              <CalendarIcon className={styles['tooltip-container__header-icon']} />
              <span className={styles['tooltip-container__header-date']}>
                {`${mockupDate[0]} - ${mockupDate[1]}`}
              </span>
            </div>
            <div className={styles['tooltip-container__divider']} />
            <div>
              <div
                className={styles['tooltip-container__item']}
              >
                <span className={styles['tooltip-container__item-text']}>
                  {name}
                </span>
              </div>
              <div className={styles['tooltip-container__item']}>
                {selectedIndicator === BarChartIndicators.Marker ? (
                  <ShapeCircleFilledIcon
                    className={styles['tooltip-container__icon']}
                    style={{ color: color }}
                  />
                ) : (
                  <ShapeSquareFilledIcon
                    className={styles['tooltip-container__icon']}
                    style={{ color: color }}
                  />
                )}
                <span className={styles['tooltip-container__item-data']}>
                  {value}
                </span>
              </div>
            </div>
          </div>
      );
    },
    [],
  );

  return (
    <div className={styles['wrapper']}>
      <BarChart
        barAxis={barAxis}
        getTooltipRenderer={getTooltipRenderer}
        indicators={indicators}
        markerAxis={markerAxis}
      />
    </div>
  );
}

export default memo(StoryWrapper);
