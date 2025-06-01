import {
  AXIS_SCALE_REDUCER,
  AXIS_SCALE_SIZE,
  DEFAULT_TICKS,
} from '../constants.js';

export function getNumTicks(axisScale: number): number {
  if (axisScale <= AXIS_SCALE_SIZE) {
    return Math.ceil(axisScale / AXIS_SCALE_REDUCER);
  }
  return DEFAULT_TICKS;
}
