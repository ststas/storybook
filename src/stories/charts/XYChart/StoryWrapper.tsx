import { JSX, type ReactNode, memo, useCallback, useMemo } from 'react';
import { useZoom } from './useZoom';
import styles from './Wrapper.module.scss';
import { getLineChartNumTicks, LineChart, LineChartAxis, LineChartAxisOffsetType, LineChartAxisType, LineChartLineType, LineChartTickValueType, LineChartZoomDomainType } from '@/components/Charts';
import { useWindowSize } from '@/helpers/useWindowSize';
import { CalendarIcon } from '@/components/Icons/CalendarIcon';

type Props = { lines: LineChartLineType[] };

const AXIS_MINIMUM_OFFSET: LineChartAxisOffsetType = {
  left: 40,
  right: 20,
  top: 7,
  bottom: 16,
};

const MOBILE_AXIS_MINIMUM_OFFSET: LineChartAxisOffsetType = {
  left: 20,
  right: 20,
  top: 7,
  bottom: 16,
};

const GRAPH_MEDIA = 466;

function StoryWrapper({ lines }: Props): JSX.Element {
  const { width } = useWindowSize();

  const axisOffset = useMemo(() => {
    return width < GRAPH_MEDIA
      ? MOBILE_AXIS_MINIMUM_OFFSET
      : AXIS_MINIMUM_OFFSET;
  }, [width]);

  const formatLineChartTickDate = useCallback(
    (value: LineChartTickValueType) => {
      if (value instanceof Date) {
        return value.toLocaleDateString().slice(0, 5);
      }

      throw new Error('value is not instanceof Date');
    },
    [],
  );

  const formatLinearTick = useCallback((value: LineChartTickValueType) => {
    if (typeof value === 'number') {
      const newValue = String(value);

      return newValue;
    }

    throw new Error('Coordinate value type is not number');
  }, []);

  const xAxis: LineChartAxisType = useMemo(
    () => ({
      tickFormat: formatLineChartTickDate,
      axisType: LineChartAxis.Time,
      nice: true,
      getNumTicks: getLineChartNumTicks,
    }),
    [formatLineChartTickDate],
  );

  const yAxis: LineChartAxisType = useMemo(
    () => ({
      tickFormat: formatLinearTick,
      defaultMinDomain: true,
      nice: true,
      getNumTicks: getLineChartNumTicks,
    }),
    [formatLinearTick],
  );

  const { ZoomSection, zoom } = useZoom({
    disabled: false,
    zoom: [] as LineChartZoomDomainType,
  });

  const getTooltipRenderer = useCallback(
    (xValue: number): ReactNode => {
      const tooltipValues: {
        date: number;
        value: string;
        color: string;
        name: string;
        id: string;
      }[] = [];

      lines.forEach((line) => {
        const { color } = line.theme;
        const { name, id } = line;

        const searchedLine = line.coordinates.find(
          (coordinate) => coordinate.x === xValue,
        );

        if (typeof searchedLine !== 'undefined') {
          tooltipValues.push({
            color,
            date: searchedLine.x,
            id,
            name,
            value: String(searchedLine.y),
          });
        }
      });

      const newDate = new Date(xValue).toLocaleDateString();

      return (
        <div className={styles['tooltip-container']}>
          <div className={styles['tooltip-container__header']}>
            <CalendarIcon className={styles['tooltip-container__header-icon']} />
            <span className={styles['tooltip-container__header-date']}>
              {newDate}
            </span>
          </div>
          <div className={styles['tooltip-container__divider']} />
          <ul className={styles['tooltip-container__inner']}>
            {tooltipValues?.map((item) => {
              return (
                <li key={item.id} className={styles['tooltip-container__item']}>
                  <div
                    style={{
                      background: item.color,
                      height: '10px',
                      width: '10px',
                      borderRadius: '50%',
                    }}
                  />
                  <span className={styles['tooltip-container__item-text']}>
                    {item.name}
                  </span>
                  <span className={styles['tooltip-container__item-data']}>
                    {item.value}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    },
    [lines],
  );

  return (
    <div className={styles['container']}>
      <ZoomSection />
      <div className={styles['wrapper']}>
        <LineChart
          axisOffset={axisOffset}
          getTooltipRenderer={getTooltipRenderer}
          lines={lines}
          xAxis={xAxis}
          yAxis={yAxis}
          zoom={zoom}
        />
      </div>
    </div>
  );
}

export default memo(StoryWrapper);
