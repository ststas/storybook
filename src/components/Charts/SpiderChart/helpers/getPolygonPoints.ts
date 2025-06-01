import { THREE, TWO } from '../constants.js';
import {
  type SpiderChartCoordinatesType,
  type SpiderChartLinearScaleType,
  type SpiderChartMarkerPointExtendedType,
} from '../types.js';

export function getPolygonPoints(
  coordinates: SpiderChartCoordinatesType,
  scale: SpiderChartLinearScaleType,
  setAttributes: { setId: string; color: string },
): {
  points: SpiderChartMarkerPointExtendedType[];
  pointString: string;
  setId: string;
  color: string;
} {
  const { setId, color } = setAttributes;
  const keys = Object.keys(coordinates).map(Number);
  let step = (Math.PI * TWO) / keys.length;
  let offset = keys.length % TWO === 0 ? 0 : step / TWO;

  if (keys.length <= TWO) {
    step = (Math.PI * TWO) / THREE;
    offset = step / TWO;
  }

  const points = keys.map((key, index) => {
    const coordinateValue = coordinates[key];
    const scaledValue = scale(coordinateValue);

    return {
      x: scaledValue * Math.sin(index * step + offset),
      y: scaledValue * Math.cos(index * step + offset),
      id: String(key),
      index,
      setId,
      color,
    };
  });

  const pointString = points.map((point) => `${point.x},${point.y}`).join(' ');

  return { color: color, points, pointString, setId: setId };
}
