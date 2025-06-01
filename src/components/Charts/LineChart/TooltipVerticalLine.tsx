import { JSX, memo, useMemo } from 'react';
import { Line } from '@visx/shape';
import { FIVE, TEN } from './constants.js';
import styles from './TooltipVerticalLine.module.scss';
import classNames from 'classnames';

type Props = {
  height: number;
  tooltipLeft: number | undefined;
  tooltipOpen: boolean;
};

function TooltipVerticalLine({
  height,
  tooltipLeft,
  tooltipOpen,
}: Props): JSX.Element {
  const coordinateX = useMemo(() => {
    return tooltipLeft ? tooltipLeft : 0;
  }, [tooltipLeft]);

  return (
    <g>
      <Line
        className={classNames(styles['vertical-line'], { [styles['vertical-line_visible']]: tooltipOpen })}
        from={{ x: coordinateX, y: 0 }}
        to={{ x: coordinateX, y: height }}
      />
      <polygon
        className={classNames(styles['triangle'], { [styles['triangle_visible']]: tooltipOpen })}
        points={`${coordinateX},${TEN} ${coordinateX - FIVE},0 ${coordinateX + FIVE},0`}
      />
      <polygon
        className={classNames(styles['triangle'], { [styles['triangle_visible']]: tooltipOpen })}
        points={`${coordinateX},${height - TEN} ${coordinateX - FIVE},${height} ${coordinateX + FIVE},${height}`}
      />
    </g>
  );
}

export default /*#__PURE__*/ memo(TooltipVerticalLine);
