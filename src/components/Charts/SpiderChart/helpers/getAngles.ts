import { DEGREES_360, THREE, TWO } from '../constants.js';

export function getAngles(axisAmount: number): { angle: number }[] {
  let step: number = DEGREES_360 / axisAmount;

  if (axisAmount <= TWO) {
    step = DEGREES_360 / THREE;
  }

  return Array.from({ length: axisAmount + 1 }, (_, i) => ({
    angle: i * step,
  }));
}
