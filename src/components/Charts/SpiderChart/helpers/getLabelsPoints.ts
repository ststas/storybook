import { type ScaleLinear } from 'd3-scale';
import {
  LABEL_POSITION_OFFSET,
  THREE,
  THREE_FOURTH,
  TWO,
} from '../constants.js';
import {
  type SpiderChartLabelPointType,
  type SpiderChartVariableType,
} from '../types.js';

type LabelsPointsParametersType = {
  maxValue: number;
  minValue: number;
  radius: number;
  variables: SpiderChartVariableType[];
  yScale: ScaleLinear<number, number, never>;
};

export function getLabelsPoints({
  maxValue,
  minValue,
  radius,
  variables,
  yScale,
}: LabelsPointsParametersType): SpiderChartLabelPointType[] {
  const absMinValue = Math.abs(minValue);
  const absMaxValue = Math.abs(maxValue);
  let dataLength = variables.length;

  if (variables.length <= TWO) {
    dataLength = THREE;
  }

  const step = (Math.PI * TWO) / dataLength;
  const offset = dataLength % TWO === 0 ? 0 : step / TWO;
  const labelPosition = absMinValue >= absMaxValue ? absMinValue : absMaxValue;

  return variables.map((variable, index) => {
    const angle = (index * Math.PI * TWO) / dataLength + offset;

    const x = yScale(labelPosition * LABEL_POSITION_OFFSET) * Math.sin(angle);
    const y = yScale(labelPosition * LABEL_POSITION_OFFSET) * Math.cos(angle);

    const dx = Math.sign(x) * (Math.abs(x) >= THREE_FOURTH * radius ? TWO : 0);
    const dy =
      Math.sign(y) * (Math.abs(y) >= THREE_FOURTH * radius ? 1 / TWO : 0);

    return {
      dx,
      dy,
      id: variable.id,
      name: variable.name,
      x,
      y,
    } as SpiderChartLabelPointType;
  });
}
