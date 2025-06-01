import { JSX, type ReactNode, memo, useCallback } from 'react';
import styles from './Wrapper.module.scss';
import { SpiderChart, SpiderChartDataType, SpiderChartTickValueType, SpiderChartTooltipDataType } from '@/components/Charts';

const AXIS_DEFAULT_OFFSET = { top: 50, left: 60, right: 60, bottom: 50 };

type Props = { data: SpiderChartDataType };

function StoryWrapper({ data }: Props): JSX.Element {
  const formatAxisTick = useCallback((value: SpiderChartTickValueType) => {
    if (typeof value === 'number') {
      const newValue = `${String(value)} %`;

      return newValue;
    }

    throw new Error('Coordinate value type is not number');
  }, []);

  const getTooltipRenderer = useCallback(
    (tooltipData: SpiderChartTooltipDataType[]): ReactNode => {
      if (tooltipData.length > 0) {
        const headerText = tooltipData[0].coordinates
          ? tooltipData[0].variableName
          : tooltipData[0].setName;
        const items = tooltipData[0].coordinates
          ? tooltipData[0].coordinates
          : tooltipData;

        return (
            <div className={styles['tooltip-container']}>
              <div className={styles['tooltip-container__header']}>
                {headerText}
              </div>
              <div className={styles['tooltip-container__divider']} />
              <ul className={styles['tooltip-container__inner']}>
                {items?.map((item) => (
                  <li
                    key={`${item.setName}-${item.value}`}
                    className={styles['tooltip-container__item']}
                  >
                    <div
                      style={{
                        background: item.color,
                        height: '10px',
                        width: '10px',
                        borderRadius: '50%',
                      }}
                    />
                    <span className={styles['tooltip-container__item-text']}>
                      {item.setName}
                    </span>
                    <span className={styles['tooltip-container__item-data']}>
                      {`${item.value} %`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
        );
      }
      return null;
    },
    [],
  );

  return (
    <div className={styles['wrapper']}>
      <SpiderChart
        axisOffset={AXIS_DEFAULT_OFFSET}
        data={data}
        formatTicks={formatAxisTick}
        getTooltipRenderer={getTooltipRenderer}
      />
    </div>
  );
}

export default memo(StoryWrapper);
