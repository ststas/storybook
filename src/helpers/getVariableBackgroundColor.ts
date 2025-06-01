/* eslint-disable @typescript-eslint/no-unused-vars */
import { BASE_COLORS} from "./constants";

function getBaseColor(order: number): number[] {
  const baseIndex = (order - 1) % BASE_COLORS.length;
  return BASE_COLORS[baseIndex];
}

function getRound(order: number): number {
  if (order <= 0) return 0;
  const round = Math.floor((order - 1) / BASE_COLORS.length);
  return round;
}

function adjustColorBrightness([r, g, b]: number[], round: number): [number, number, number] {
  const factor = 1 - round * 0.12;
  return [
    Math.max(0, Math.min(255, Math.round(r * factor))),
    Math.max(0, Math.min(255, Math.round(g * factor))),
    Math.max(0, Math.min(255, Math.round(b * factor))),
  ];
}

export function getVariableBackgroundColor(order: number): string {
  if (order <= 0) return `rgba(0, 0, 0, 1)`;

  const baseColor = getBaseColor(order);
  const round = getRound(order);

  const [r, g, b] = adjustColorBrightness(baseColor, round);
  const alpha = 1;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}