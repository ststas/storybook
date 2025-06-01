import { type Meta, type StoryObj } from '@storybook/react';
import StoryWrapper from './StoryWrapper';
import { LineChart, LineChartCurve } from '@/components/Charts';
import { getVariableBackgroundColor } from '@/helpers/getVariableBackgroundColor';
import { ONE_HUNDRED } from './constants';



const meta = {
  title: 'modules/charts/XYChart',
  component: StoryWrapper,
  argTypes: {},
} satisfies Meta<typeof LineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const XYChartMultipleLines: Story = {
  args: {
    lines: [
      {
        id: '001',
        name: 'Test 1',
        coordinates: [
          {
            x: 1715724000000,
            y: 3.33,
          },
          {
            x: 1715810400000,
            y: 3.49,
          },
          {
            x: 1715896800000,
            y: 3.09,
          },
          {
            x: 1715983200000,
            y: 3.18,
          },
          {
            x: 1716069600000,
            y: 3.22,
          },
          {
            x: 1716156000000,
            y: 3.33,
          },
          {
            x: 1716242400000,
            y: 3.12,
          },
          {
            x: 1716328800000,
            y: 2.96,
          },
          {
            x: 1716415200000,
            y: 2.96,
          },
          {
            x: 1716501600000,
            y: 2.96,
          },
        ],
        theme: {
          color: getVariableBackgroundColor(
            Math.floor(Math.random() * ONE_HUNDRED),
          ),
          fill: false,
          hasMarkers: true,
          curve: LineChartCurve.Smooth,
        },
      },
      {
        id: '002',
        name: 'Test 2',
        coordinates: [
          {
            x: 1715724000000,
            y: 2.33,
          },
          {
            x: 1715810400000,
            y: 2.49,
          },
          {
            x: 1715896800000,
            y: 2.09,
          },
          {
            x: 1715983200000,
            y: 2.18,
          },
          {
            x: 1716069600000,
            y: 2.22,
          },
          {
            x: 1716156000000,
            y: 2.33,
          },
          {
            x: 1716242400000,
            y: 2.12,
          },
          {
            x: 1716328800000,
            y: 1.96,
          },
          {
            x: 1716415200000,
            y: 1.96,
          },
          {
            x: 1716501600000,
            y: 1.96,
          },
        ],
        theme: {
          color: getVariableBackgroundColor(
            Math.floor(Math.random() * ONE_HUNDRED),
          ),
          fill: false,
          hasMarkers: true,
          curve: LineChartCurve.Linear,
        },
      },
      {
        id: '003',
        name: 'Test 3',
        coordinates: [
          {
            x: 1715724000000,
            y: 1.33,
          },
          {
            x: 1715810400000,
            y: 1.49,
          },
          {
            x: 1715896800000,
            y: 1.09,
          },
          {
            x: 1715983200000,
            y: 1.18,
          },
          {
            x: 1716069600000,
            y: 1.22,
          },
          {
            x: 1716156000000,
            y: 1.33,
          },
          {
            x: 1716242400000,
            y: 1.12,
          },
          {
            x: 1716328800000,
            y: 0.96,
          },
          {
            x: 1716415200000,
            y: 0.96,
          },
          {
            x: 1716501600000,
            y: 0.96,
          },
        ],
        theme: {
          color: getVariableBackgroundColor(
            Math.floor(Math.random() * ONE_HUNDRED),
          ),
          fill: false,
          hasMarkers: true,
          curve: LineChartCurve.Step,
        },
      },
    ],
  },
};

export const XYChartSingleLine: Story = {
  args: {
    lines: [
      {
        id: '001',
        name: 'Test 1',
        coordinates: [
          {
            x: 1715724000000,
            y: 1.33,
          },
          {
            x: 1715810400000,
            y: 1.49,
          },
          {
            x: 1715896800000,
            y: 1.09,
          },
          {
            x: 1715983200000,
            y: 1.18,
          },
          {
            x: 1716069600000,
            y: 1.22,
          },
          {
            x: 1716156000000,
            y: 1.33,
          },
          {
            x: 1716242400000,
            y: 1.12,
          },
          {
            x: 1716328800000,
            y: 0.96,
          },
          {
            x: 1716415200000,
            y: 0.96,
          },
          {
            x: 1716501600000,
            y: 0.96,
          },
        ],
        theme: {
          color: getVariableBackgroundColor(
            Math.floor(Math.random() * ONE_HUNDRED),
          ),
          fill: true,
          hasMarkers: true,
          curve: LineChartCurve.Smooth,
        },
      },
    ],
  },
};
