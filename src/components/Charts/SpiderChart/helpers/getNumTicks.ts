import {
  AXIS_DEFAULT_TICKS,
  AXIS_SCALE_REDUCER,
  AXIS_SCALE_SIZE,
} from '../constants.js';

export function getNumTicks(axisScale: number): number {
  if (axisScale > AXIS_SCALE_SIZE) {
    return Math.ceil(axisScale / AXIS_SCALE_REDUCER);
  }

  return AXIS_DEFAULT_TICKS;
}
