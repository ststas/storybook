import { TWO } from '../constants.js';

export function getPoints(
  length: number,
  radius: number,
): { x: number; y: number }[] {
  const step = (Math.PI * TWO) / length;
  const offset = length % TWO === 0 ? 0 : step / TWO;

  return Array.from({ length }, (_, i) => ({
    x: radius * Math.sin(i * step - offset),
    y: radius * Math.cos(i * step - offset),
  }));
}
